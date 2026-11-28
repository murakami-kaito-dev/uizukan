(function(){
  var d=document, root=d.documentElement;
  var BASE=d.body.dataset.base||'';
  /* --- テーマ（system / light / dark を巡回） --- */
  function applyTheme(){var t=localStorage.getItem('uz_theme')||'system';root.dataset.theme=t==='system'?'':t;
    var b=d.getElementById('theme');if(b){b.title='テーマ: '+({system:'自動',light:'ライト',dark:'ダーク'})[t];}}
  applyTheme();
  var tb=d.getElementById('theme');
  if(tb)tb.addEventListener('click',function(){var o=['system','light','dark'];var t=localStorage.getItem('uz_theme')||'system';localStorage.setItem('uz_theme',o[(o.indexOf(t)+1)%3]);applyTheme();});
  /* --- 現在地 --- */
  var here=location.pathname.replace(BASE,'').replace(/\/$/,'')||'/';
  /* --- 計測（Google Analytics）。タグ（gtag）が無いページ・環境では何もしない。打った言葉は送らない --- */
  function ev(n,p){try{if(window.gtag)window.gtag('event',n,p||{});}catch(e){}}
  d.addEventListener('click',function(e){var t=e.target.closest?e.target.closest('a,button'):null;if(!t)return;
    if(t.matches('[data-panel] .tabs button'))return ev('tab_select',{tab:t.dataset.tab,locked:t.querySelector('.ic')?1:0,page:here});
    if(t.matches('.seg button[data-lang]'))return ev('prompt_lang',{lang:t.dataset.lang,page:here});
    if(t.matches('[data-panel] .copybtn')){var s=t.closest('[data-panel]').querySelector('.tabs button[aria-selected="true"]');return ev('copy',{what:s?s.dataset.tab:'',page:here});}
    if(t.matches('[data-copy]'))return ev('copy',{what:t.dataset.copy.replace('#',''),page:here});
    if(t.id==='theme')return ev('theme_change');
    if(t.matches('[data-labels]'))return ev('labels_toggle',{on:t.textContent.indexOf('隠す')>=0?0:1,page:here});
    if(t.matches('.pill[data-target]'))return ev('browse_tab',{tab:t.dataset.target});
    if(t.matches('[data-example],[data-hint]'))return ev('search_hint_tap',{hint:t.dataset.example||t.dataset.hint});
    if(t.matches('[data-kind]'))return ev('search_kind',{kind:t.dataset.kind||'all'});
    var h=t.getAttribute('href')||'';if(!h)return;
    if(/\/pro\/$/.test(h))return ev('pro_cta',{page:here,locked:t.closest('.locked')?1:0});
    if(h.indexOf('docs.google.com/forms')>=0)return ev('waitlist_click',{page:here});
    if(h.indexOf('apps.apple.com')>=0)return ev('app_store_click',{page:here});
    if(/\.zip$/.test(h))return ev('skill_download',{page:here});
    if(/\/(llms\.txt|llms-full\.txt|catalog\.json)$/.test(h))return ev('ai_file_open',{file:h.split('/').pop(),page:here});
  },true);
  d.addEventListener('submit',function(e){var a=(e.target.getAttribute&&e.target.getAttribute('action'))||'';
    if(/\/checkout$/.test(a))ev('begin_checkout');
    if(/\/skill$/.test(a))ev('pro_skill_download');},true);
  d.querySelectorAll('.nav a,.menu-list a').forEach(function(a){var p=a.getAttribute('data-path');if(p&&(here===p||here.indexOf(p+'/')===0))a.setAttribute('aria-current','page');});
  /* --- 狭い幅のメニュー --- */
  d.querySelectorAll('.menu > button').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var m=b.parentNode;m.hasAttribute('open')?m.removeAttribute('open'):m.setAttribute('open','');});});
  d.addEventListener('click',function(){d.querySelectorAll('.menu[open]').forEach(function(m){m.removeAttribute('open');});});
  /* --- トップ：ピルで切替、検索でその場絞り込み --- */
  var browse=d.querySelector('[data-browse]');
  if(browse){
    var pills=browse.querySelectorAll('.pill[data-target]');
    function show(t){pills.forEach(function(p){p.setAttribute('aria-pressed',String(p.dataset.target===t));});
      d.querySelectorAll('[data-section]').forEach(function(s){s.classList.toggle('hidden',s.dataset.section!==t);});filter();}
    pills.forEach(function(p){p.addEventListener('click',function(){show(p.dataset.target);});});
    var q=d.getElementById('q'),clear=d.getElementById('q-clear'),cnt=d.getElementById('q-count');
    function filter(){if(!q)return;var v=q.value.trim().toLowerCase();var n=0;
      d.querySelectorAll('[data-section]:not(.hidden) .card').forEach(function(c){var hit=!v||(c.dataset.q||'').indexOf(v)>=0;c.classList.toggle('hidden',!hit);if(hit)n++;});
      d.querySelectorAll('[data-section]:not(.hidden) .empty').forEach(function(e){e.classList.toggle('hidden',n>0);});
      if(clear)clear.classList.toggle('hidden',!v);if(cnt){cnt.textContent=v?('「'+q.value.trim()+'」で絞り込み中'):'';cnt.classList.toggle('hidden',!v);}}
    if(q){q.addEventListener('input',filter);q.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();d.getElementById('browse').scrollIntoView({behavior:'smooth'});}});}
    if(clear)clear.addEventListener('click',function(){q.value='';filter();});
    d.querySelectorAll('[data-example]').forEach(function(b){b.addEventListener('click',function(){q.value=b.dataset.example;filter();d.getElementById('browse').scrollIntoView({behavior:'smooth'});});});
    var go=d.getElementById('q-go');if(go)go.addEventListener('click',function(){d.getElementById('browse').scrollIntoView({behavior:'smooth'});});
  }
  /* --- 詳細：タブ・言語・コピー・デモ --- */
  d.querySelectorAll('[data-panel]').forEach(function(panel){
    var tabs=panel.querySelectorAll('.tabs button'),bodies=panel.querySelectorAll('[data-tab-body]');
    var lang='ja';
    function render(){var sel=panel.querySelector('.tabs button[aria-selected="true"]').dataset.tab;
      bodies.forEach(function(b){b.classList.toggle('hidden',b.dataset.tabBody!==sel);});
      var seg=panel.querySelector('.seg');if(seg)seg.classList.toggle('hidden',sel!=='prompt');
      var note=panel.querySelector('[data-tab-body="prompt"] .note');if(note)note.textContent=note.dataset[lang];
      var notes=panel.querySelector('[data-notes]');if(notes)notes.textContent=notes.dataset[sel]||'';
      var cp=panel.querySelector('.copybtn');if(cp)cp.classList.toggle('hidden',!!panel.querySelector('[data-tab-body="'+sel+'"] .locked'));}
    tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){x.setAttribute('aria-selected','false');});t.setAttribute('aria-selected','true');render();});});
    panel.querySelectorAll('.seg button').forEach(function(b){b.addEventListener('click',function(){lang=b.dataset.lang;panel.querySelectorAll('.seg button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});render();});});
    var cp=panel.querySelector('.copybtn');if(cp)cp.addEventListener('click',function(){var sel=panel.querySelector('.tabs button[aria-selected="true"]').dataset.tab;var n=panel.querySelector('[data-tab-body="'+sel+'"] .note');if(!n)return;
      navigator.clipboard.writeText(n.textContent).then(function(){var l=cp.querySelector('span');var o=l.textContent;l.textContent='コピーしました';cp.disabled=true;setTimeout(function(){l.textContent=o;cp.disabled=false;},1500);});});
    render();
  });
  d.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var t=d.querySelector(b.dataset.copy);if(!t)return;navigator.clipboard.writeText(t.textContent).then(function(){var l=b.querySelector('span')||b;var o=l.textContent;l.textContent='コピーしました';setTimeout(function(){l.textContent=o;},1500);});});});
  /* --- 検索ページ --- */
  var sq=d.getElementById('sq');
  if(sq){var kind='';var res=d.getElementById('sres'),hint=d.getElementById('shint'),none=d.getElementById('snone'),count=d.getElementById('scount');
    function run(){var v=sq.value.trim().toLowerCase();var n=0;res.querySelectorAll('.srow').forEach(function(r){var hit=!!v&&(r.dataset.q||'').indexOf(v)>=0&&(!kind||r.dataset.kind===kind);r.classList.toggle('hidden',!hit);if(hit)n++;});
      hint.classList.toggle('hidden',!!v);none.classList.toggle('hidden',!v||n>0);count.textContent=v?(n+' 件'):'';}
    sq.addEventListener('input',run);d.querySelectorAll('[data-kind]').forEach(function(b){b.addEventListener('click',function(){kind=b.dataset.kind;d.querySelectorAll('[data-kind]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});run();});});
    d.querySelectorAll('[data-hint]').forEach(function(b){b.addEventListener('click',function(){sq.value=b.dataset.hint;run();});});
    var u=new URL(location.href);if(u.searchParams.get('q')){sq.value=u.searchParams.get('q');}run();sq.focus();}
  /* --- プロンプトビルダー（手順は誰でも。出来上がりは Pro） --- */
  var bf=d.getElementById('builder');
  if(bf){function sum(){var c=bf.querySelector('select').selectedOptions[0];var acts=bf.querySelectorAll('input[type=checkbox]:checked').length;var ctx=bf.querySelector('textarea').value.trim();
      var parts=[];if(c&&c.value)parts.push(c.textContent.trim());if(acts)parts.push('アクション '+acts+' 件');if(ctx)parts.push('補足あり');
      var t=d.getElementById('b-teaser'),h=d.getElementById('b-title');if(parts.length){t.textContent=parts.join(' ＋ ')+' を 1 つの指示文に';h.textContent='選んだ内容でプロンプトを作る';}else{t.textContent=t.dataset.empty||'';h.textContent='まとめたプロンプトを見る';}}
    bf.addEventListener('input',sum);bf.addEventListener('change',sum);sum();}
})();
