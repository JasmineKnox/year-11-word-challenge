const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const bank = require('../data.js');
const game = require('../game.js');

// Small DOM harness for screen behaviour, without claiming browser/layout coverage.
class Node {
  constructor(tag) { this.tagName=tag; this.children=[]; this.events={}; this.hidden=false; this.disabled=false; this.value=''; this.checked=false; this.text=''; }
  get textContent() { return this.text + this.children.map(n=>n.textContent).join(''); }
  set textContent(value) { this.text=String(value); this.children=[]; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children=nodes; this.text=''; }
  addEventListener(event,fn) { (this.events[event]??=[]).push(fn); }
  fire(event) { for(const fn of this.events[event]??[]) fn({preventDefault(){}}); }
  focus() { this.focused=true; }
}
function loadScreen(week) {
  const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  const nodes={};
  for(const match of html.matchAll(/<(\w+)[^>]*\bid="([^"]+)"[^>]*>/g)) {
    const node=new Node(match[1]);
    node.hidden=/\bhidden\b/.test(match[0]);
    nodes[match[2]]=node;
  }
  nodes['week-select'].value=String(week);
  function descendants(node) { return node.children.flatMap(n=>[n,...descendants(n)]); }
  const document={
    getElementById(id) { if(!nodes[id]) throw Error('Missing HTML element: '+id); return nodes[id]; },
    createElement(tag) { return new Node(tag); },
    createTextNode(text) { const n=new Node('#text');n.textContent=text;return n; },
    querySelectorAll() { return descendants(nodes.choices).filter(n=>n.tagName==='input'&&n.name==='word'); },
    querySelector() { return this.querySelectorAll().find(n=>n.checked)||null; },
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),{document,WordGame:game,WORD_WEEKS:bank});
  return {nodes,document};
}
for(const week of Object.keys(bank)) {
  test(`week ${week}: screen flow, answers, score, results and replay`,()=>{
    const {nodes,document}=loadScreen(week);
    const pool=Object.entries(bank).filter(([w])=>Number(w)<=Number(week)).flatMap(([,words])=>words);
    const count=Number(week)===2?5:10;
    const total=count*3;
    assert.ok(nodes['week-summary'].textContent.includes(`${count} questions per round`));
    if(Number(week)>2) assert.ok(nodes['week-summary'].textContent.includes('5 current-week words + 5 earlier words'));
    assert.ok(nodes['week-summary'].textContent.includes(`${total} questions in total`));
    nodes.start.fire('click');
    assert.equal(nodes.home.hidden,true);
    assert.equal(nodes.play.hidden,false);
    for(let i=0;i<total;i++) {
      const round=Math.floor(i/count);
      assert.match(nodes['round-title'].textContent,new RegExp(`Round ${round+1}:`));
      assert.match(nodes['question-count'].textContent,new RegExp(`Overall ${i+1} of ${total}`));
      assert.ok(nodes['question-count'].textContent.includes(`Question ${i%count+1} of ${count}`));
      const field=round===1?'sentence':'definition';
      const correct=pool.find(w=>w[field]===nodes.prompt.textContent);
      assert.ok(correct,'Screen must show a prompt from the included weeks');
      assert.equal(nodes.check.disabled,true);
      if(round<2) {
        assert.equal(nodes['spelling-box'].hidden,true);
        const choices=document.querySelectorAll();
        assert.equal(choices.length,5);
        const input=choices.find(n=>n.value===correct.word);
        input.checked=true;input.fire('change');
      } else {
        assert.equal(nodes.choices.hidden,true);
        assert.equal(nodes['spelling-box'].hidden,false);
        assert.equal(nodes.spelling.value,'');
        nodes.spelling.value=' '+correct.word.toUpperCase()+' ';
        nodes.spelling.fire('input');
      }
      assert.equal(nodes.check.disabled,false);
      nodes['answer-form'].fire('submit');
      assert.match(nodes.feedback.textContent,/Correct\./);
      assert.equal(nodes.check.disabled,true);
      assert.equal(nodes.next.hidden,false);
      assert.match(nodes.progress.textContent,new RegExp(`Score ${i+1} / ${total}`));
      // Repeated submission must not add a point.
      nodes['answer-form'].fire('submit');
      assert.match(nodes.progress.textContent,new RegExp(`Score ${i+1} / ${total}`));
      if(i===count-1)assert.equal(nodes.next.textContent,'Start round 2');
      if(i===count*2-1)assert.equal(nodes.next.textContent,'Start round 3');
      if(i===total-1)assert.equal(nodes.next.textContent,'See results');
      nodes.next.fire('click');
    }
    assert.equal(nodes.results.hidden,false);
    assert.equal(nodes.play.hidden,true);
    assert.equal(nodes['total-score'].textContent,`Week ${week}: ${total} / ${total} (100%)`);
    assert.equal(nodes['round-scores'].children.length,3);
    nodes['play-again'].fire('click');
    assert.equal(nodes.results.hidden,true);
    assert.match(nodes.progress.textContent,new RegExp(`Score 0 / ${total}`));
    nodes['change-week'].fire('click');
    assert.equal(nodes.home.hidden,false);
    nodes['week-select'].value=week==='9'?'2':'9';
    nodes['week-select'].fire('change');
    assert.ok(nodes['week-summary'].textContent.includes(nodes['week-select'].value==='9'?'10 questions per round':'5 questions per round'));
    nodes.start.fire('click');
    assert.match(nodes.progress.textContent,new RegExp(`Week ${nodes['week-select'].value}`));
  });
}

test('incorrect spelling appears as text and contributes to the final review',()=>{
  const {nodes,document}=loadScreen(2);
  nodes.start.fire('click');
  for(let i=0;i<15;i++){
    const round=Math.floor(i/5);
    const correct=bank[2].find(w=>w[round===1?'sentence':'definition']===nodes.prompt.textContent);
    if(round<2){const input=document.querySelectorAll().find(n=>n.value===correct.word);input.checked=true;input.fire('change');}
    else{nodes.spelling.value=i===10?'<img src=x onerror=alert(1)>':correct.word;nodes.spelling.fire('input');}
    nodes['answer-form'].fire('submit');
    if(i===10){assert.match(nodes.feedback.textContent,/Not quite/);assert.ok(nodes.feedback.textContent.includes('<img src=x onerror=alert(1)>'));}
    nodes.next.fire('click');
  }
  assert.match(nodes['total-score'].textContent,/14 \/ 15/);
  assert.ok(nodes.review.textContent.includes('<img src=x onerror=alert(1)>'));
  assert.ok(nodes.review.textContent.includes('Review your missed answers'));
});
