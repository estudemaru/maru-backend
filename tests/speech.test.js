import assert from "node:assert/strict";
import test from "node:test";
import { createSpeechService } from "../backend/speechService.js";

const valid = { success:true,mp3StreamingUrl:"https://audio2.tts.quest/v1/data/abc123/audio.mp3s" };
test("speech requests the taught reading, deduplicates and caches only remote URLs",async()=>{
  const calls=[];
  const service=createSpeechService({key:"test-key",fetchImpl:async url=>{calls.push(new URL(url));return Response.json(valid);}});
  const [a,b]=await Promise.all([service.prepare("水"),service.prepare("水。")]);
  assert.deepEqual(a,b);
  assert.equal(calls.length,1);
  assert.equal(calls[0].searchParams.get("text"),"みず");
  assert.equal(calls[0].searchParams.get("speaker"),"30");
  assert.equal(a.url,valid.mp3StreamingUrl);
  assert.equal(a.attribution,"VOICEVOX:No.7");
  assert.ok(!JSON.stringify(a).includes("test-key"));
  await service.prepare("水");assert.equal(calls.length,1);
  await assert.rejects(service.prepare("a private message not in the curriculum"),error=>error.status===400);
  assert.equal(calls.length,1);
});
test("speech respects provider cooldown, recovers and expires remote links",async()=>{
  let clock=1000,calls=0;
  const service=createSpeechService({now:()=>clock,fetchImpl:async()=>{calls++;return calls===1?Response.json({retryAfter:10},{status:429}):Response.json(valid);}});
  await assert.rejects(service.prepare("こんにちは"),error=>error.status===429&&error.retryAfter===10);
  await assert.rejects(service.prepare("水"),error=>error.status===429);
  assert.equal(calls,1);
  clock+=11000;await service.prepare("こんにちは");assert.equal(calls,2);
  clock+=11*60000;await service.prepare("こんにちは");assert.equal(calls,3);
});
test("speech rejects invalid provider URLs and reports connection failures",async()=>{
  for(const url of ["https://example.com/audio.mp3","https://audio1.tts.quest.evil.test/v1/data/abc/audio.mp3s","http://audio1.tts.quest/v1/data/abc/audio.mp3s"]){
    const service=createSpeechService({fetchImpl:async()=>Response.json({...valid,mp3StreamingUrl:url})});
    await assert.rejects(service.prepare("こんにちは"),error=>error.status===503);
  }
  const failed=createSpeechService({fetchImpl:async()=>{throw new Error("timeout");}});
  await assert.rejects(failed.prepare("こんにちは"),error=>error.status===503);
});
