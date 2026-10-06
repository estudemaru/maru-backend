import test from 'node:test';
import assert from 'node:assert/strict';
import { createAiService, createLocalQuota, createSupabaseQuota } from '../backend/aiService.js';
import { createMaruHandler } from '../supabase/functions/maru-api/index.js';
import { SENTENCES } from '../shared/catalog.js';
import { LESSONS } from '../shared/curriculum.js';
const completed = value => Response.json({ status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(value)}]}] });
test('validates before quota, sends lesson without quiz, and does not store responses',async()=>{
 let calls=0,payload;const ai=createAiService({key:'secret',consumeQuota:async()=>calls++,fetchImpl:async(url,options)=>{payload=JSON.parse(options.body);return completed({answer:'Explicação.'});}});
 await assert.rejects(()=>ai.tutor('user',{lessonId:'missing',question:'test'}),e=>e.status===400);
 await assert.rejects(()=>ai.tutor('user',{lessonId:LESSONS[0].id,question:'x'.repeat(1001)}),e=>e.status===400);
 assert.equal(calls,0);
 assert.equal((await ai.tutor('user',{lessonId:LESSONS[0].id,question:'Como ler?'})).answer,'Explicação.');
 assert.equal(payload.store,false);assert.ok(!('quiz' in JSON.parse(payload.input).lesson));assert.ok(!payload.input.includes('secret'));
});
test('structured phrase result and malformed/refused/incomplete responses',async()=>{
 const ai=createAiService({key:'secret',fetchImpl:async()=>completed({correct:true,message:'Válida.',explanation:'Boa frase.',model:'学生です。',modelReading:'がくせいです。',romaji:'gakusei desu'})});
 assert.equal((await ai.phrase('user',{exerciseId:SENTENCES[0].id,text:'gakusei desu'})).source,'ai');
 for(const body of [{status:'incomplete'},{status:'completed',output:[{content:[{type:'refusal'}]}]},{status:'completed',output:[{content:[{type:'output_text',text:'{}'}]}]}]){
 const broken=createAiService({key:'secret',fetchImpl:async()=>Response.json(body)});
 await assert.rejects(()=>broken.tutor('user',{lessonId:LESSONS[0].id,question:'Como ler?'}),e=>e.status===503);
 }
});
test('local quota resets daily and database quota fails closed',async()=>{
 let now=Date.UTC(2026,9,6);const consume=createLocalQuota({now:()=>now});for(let i=0;i<20;i++)await consume('user');
 await assert.rejects(()=>consume('user'),e=>e.status===429);now+=86400000;await consume('user');
 await assert.rejects(()=>createSupabaseQuota({url:'https://example.test',serviceKey:'key',fetchImpl:async()=>Response.json(false)})('user'),e=>e.status===429);
 await assert.rejects(()=>createSupabaseQuota({url:'https://example.test',serviceKey:'key',fetchImpl:async()=>{throw Error();}})('user'),e=>e.status===503);
});
test('Edge AI requires login and origin, preserving refreshed cookies',async()=>{
 let user=null,called=0;
 const handler=createMaruHandler({auth:{assertSameOrigin(request){if(request.headers.get('origin')!=='https://maru.test')throw Object.assign(Error('Origem inválida'),{status:403});},session:async()=>({user,cookies:['session=renewed']})},ai:{enabled:true,tutor:async()=>{called++;return {answer:'ok'};}}});
 const post=origin=>handler(new Request('https://maru.test/api/ai/tutor',{method:'POST',headers:{origin},body:'{}'}));
 assert.equal((await post('https://evil.test')).status,403);assert.equal((await post('https://maru.test')).status,401);assert.equal(called,0);
 user={id:'verified-id'};const response=await post('https://maru.test');assert.equal(response.status,200);assert.equal(response.headers.get('set-cookie'),'session=renewed');assert.equal(called,1);
 assert.equal(createAiService({key:''}).enabled,false);
});

test('Node AI route uses verified account and refuses anonymous requests',async()=>{
 const { handleApi }=await import('../backend/apiRouter.js');let account=null,seen;
 const auth={account:()=>account,assertSameOrigin(){}};
 const ai={enabled:true,tutor:async id=>{seen=id;return {answer:'ok'};}};
 const request=()=>({method:'POST',headers:{},async *[Symbol.asyncIterator](){yield Buffer.from('{}');}});
 const response=()=>({writeHead(status){this.status=status;},end(body){this.body=JSON.parse(body);}});
 let res=response();await handleApi(request(),res,new URL('https://maru.test/api/ai/tutor'),{}, {},auth,ai);assert.equal(res.status,401);
 account={id:'trusted'};res=response();await handleApi(request(),res,new URL('https://maru.test/api/ai/tutor'),{}, {},auth,ai);assert.equal(res.status,200);assert.equal(seen,'trusted');
});
