import test from "node:test";
import assert from "node:assert/strict";
import { createProgressRepository } from "../supabase/functions/maru-api/progress.js";

function fakePostgrest() {
  const records = new Map();
  const calls = [];
  async function fetchImpl(input, options) {
    const url = new URL(input);
    const id = url.searchParams.get("owner_id")?.slice(3);
    const body = options.body ? JSON.parse(options.body) : null;
    calls.push({ method: options.method, id, headers: options.headers });
    assert.equal(options.headers.apikey, "server-secret");
    if (options.method === "GET") {
      const row = records.get(id);
      return Response.json(row ? [structuredClone(row)] : []);
    }
    if (options.method === "POST") {
      if (records.has(body.owner_id)) return Response.json([]);
      records.set(body.owner_id, structuredClone(body));
      return Response.json([body]);
    }
    if (options.method === "PATCH") {
      const row = records.get(id);
      if (!row || row.version !== Number(url.searchParams.get("version").slice(3))) return Response.json([]);
      const next = { ...row, ...body };
      records.set(id, next);
      return Response.json([next]);
    }
    return Response.json({ error: "unexpected request" }, { status: 500 });
  }
  return { fetchImpl, records, calls };
}

test("Supabase repository keeps each owner separate and merges snapshots", async () => {
  const remote = fakePostgrest();
  const progress = createProgressRepository({ url: "https://example.supabase.co", serviceKey: "server-secret", fetchImpl: remote.fetchImpl });
  const first = await progress.write("browser-a", { lessons: { welcome: { completedAt: 10 } }, xp: { total: 30 } });
  assert.equal(first.xp.total, 30);
  const second = await progress.write("browser-a", { lessons: { sounds: { completedAt: 20 } }, xp: { total: 60 } });
  assert.equal(second.xp.total, 60);
  assert.deepEqual(Object.keys(second.lessons).sort(), ["sounds", "welcome"]);
  assert.equal((await progress.read("browser-b")).xp.total, 0);
  assert.ok(remote.calls.some(call => call.method === "PATCH"));
});

test("Supabase repository keeps the first daily challenge result from each device", async () => {
  const remote = fakePostgrest();
  const progress = createProgressRepository({ url: "https://example.supabase.co", serviceKey: "server-secret", fetchImpl: remote.fetchImpl });
  await progress.write("browser-a", { updatedAt: 10, daily: { "2026-09-29": { word: "word-cat", score: 1, completedAt: 100 } } });
  const merged = await progress.write("browser-a", { updatedAt: 20, daily: { "2026-09-29": { word: "word-cat", score: 3, completedAt: 200 }, "2026-09-30": { word: "word-dog", score: 2, completedAt: 300 } } });
  assert.deepEqual(merged.daily["2026-09-29"], { word: "word-cat", score: 1, completedAt: 100 });
  assert.equal((await progress.read("browser-a")).daily["2026-09-30"].score, 2);
});

test("Supabase repository keeps unit checkpoints and translates a diagnosis saved before the units", async () => {
  const remote = fakePostgrest();
  const progress = createProgressRepository({ url: "https://example.supabase.co", serviceKey: "server-secret", fetchImpl: remote.fetchImpl });
  // Uma linha gravada antes das unidades: etapa antiga e nenhum checkpoint.
  await progress.write("browser-a", { lessons: { welcome: { completedAt: 10 } }, placement: { acceptedModule: "everyday", updatedAt: 5 } });
  assert.equal((await progress.read("browser-a")).placement.acceptedModule, "numbers");
  const saved = await progress.write("browser-a", { updatedAt: 20, checkpoints: { meet: { passedAt: 15, best: 92, attempts: 2, updatedAt: 15 } } });
  assert.deepEqual(saved.checkpoints.meet, { passedAt: 15, best: 92, attempts: 2, updatedAt: 15 });
  // Um aparelho com o app antigo não conhece checkpoints e não pode apagá-los.
  const older = await progress.write("browser-a", { updatedAt: 30, lessons: { sounds: { completedAt: 25 } } });
  assert.equal(older.checkpoints.meet.passedAt, 15);
  assert.deepEqual(Object.keys(older.lessons).sort(), ["sounds", "welcome"]);
});

test("Supabase repository retries a conflicting version", async () => {
  const remote = fakePostgrest();
  const progress = createProgressRepository({ url: "https://example.supabase.co", serviceKey: "server-secret", fetchImpl: remote.fetchImpl });
  await progress.write("browser-a", { xp: { total: 10 } });
  let conflicted = false;
  const original = remote.fetchImpl;
  const retrying = createProgressRepository({
    url: "https://example.supabase.co", serviceKey: "server-secret",
    fetchImpl: async (input, options) => {
      if (!conflicted && options.method === "PATCH") {
        conflicted = true;
        remote.records.get("browser-a").version++;
        remote.records.get("browser-a").snapshot = { xp: { total: 35 } };
      }
      return original(input, options);
    }
  });
  const merged = await retrying.write("browser-a", { xp: { total: 20 } });
  assert.equal(merged.xp.total, 35);
  assert.equal((await progress.read("browser-a")).xp.total, 35);
});

test("modern Supabase secret key stays in apikey rather than Authorization", async () => {
  const key = "sb_secret_example";
  const progress = createProgressRepository({
    url: "https://example.supabase.co", serviceKey: key,
    fetchImpl: async (_input, options) => {
      assert.equal(options.headers.apikey, key);
      assert.equal(options.headers.Authorization, undefined);
      return Response.json([]);
    }
  });
  assert.equal((await progress.read("browser-a")).xp.total, 0);
});
