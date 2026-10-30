import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {createClock}=await import('data:text/javascript;base64,'+Buffer.from(readFileSync(new URL('../prototype/js/clock.js',import.meta.url),'utf8')).toString('base64'));
const original=Date.now;let now=1000;Date.now=()=>now;globalThis.window={setInterval:()=>1,clearInterval(){}};
try {const c=createClock({demoStart:'2026-10-03T07:50:00',acceleration:60});c.start();now+=1000;c.stop();const paused=c.snapshot().demo;now+=60000;assert.equal(c.snapshot().demo,paused);c.start();assert.equal(c.snapshot().demo,paused);now+=1000;assert.equal(new Date(c.snapshot().demo)-new Date(paused),60000);c.stop();c.stop();const frozen=c.snapshot().demo;now+=10000;assert.equal(c.snapshot().demo,frozen);console.log('Clock freeze, resume without catch-up and duplicate stop passed');}finally{Date.now=original;}
