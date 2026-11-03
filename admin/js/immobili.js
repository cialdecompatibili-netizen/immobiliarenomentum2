// GUIDA-SVILUPPO: caricato da admin/index.html con <script src> dopo collezioni.js (incrementa ?v= dopo ogni modifica).
// QUI: pannello "Immobili" = collection _immobili (un .md per immobile) + categorie gerarchiche in _data/immobili-cat.json
// (campi nome, slug, parent = slug della madre, "" se e' madre). Usa le globali di index.html: tok, ghGet, ghPut, dec, showMsg, startDeployPolling, REPO.
// Sito: _pages/immobili.md (elenco con filtri), _includes/immobili-home.html (home: solo preferito:true), _layouts/immobile.html.
(function(){
const $=id=>document.getElementById(id);
const h=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const esc=s=>String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');
const slug=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
const DIR='_immobili', CATF='_data/immobili-cat.json';
let cats=[], catSha=null, curPath=null;

function build(){
  return `<div class="page" id="page-immobili">
  <div class="page-title">\uD83C\uDFE0 Immobili</div>
  <div id="im-lista-view">
    <div style="margin-bottom:16px"><button class="btn btn-primary" onclick="imNuovo()">+ Nuovo immobile</button> <button class="btn btn-secondary" onclick="imCatView()">Categorie</button></div>
    <div class="card"><div class="card-title">Immobili pubblicati</div><div id="im-lista"><em style="color:#646970;font-size:13px">Caricamento...</em></div></div>
  </div>
  <div id="im-cat-view" style="display:none">
    <div style="margin-bottom:16px"><button class="btn btn-secondary" onclick="imTorna()">&larr; Torna agli immobili</button></div>
    <div class="card"><div class="card-title">Categorie immobili</div>
      <div id="im-cat-lista"></div>
      <div class="grid2" style="margin-top:14px">
        <div class="field"><label>Nuova categoria</label><input type="text" id="im-cat-nome" placeholder="Es. Terreno edificabile"></div>
        <div class="field"><label>Categoria madre</label><select id="im-cat-par"></select></div>
      </div>
      <div class="btn-group"><button class="btn btn-primary" onclick="imCatAggiungi()">Aggiungi categoria</button></div>
      <div class="msg" id="im-cat-msg"></div>
    </div>
  </div>
  <div id="im-editor-view" style="display:none">
    <div style="margin-bottom:16px"><button class="btn btn-secondary" onclick="imTorna()">&larr; Torna agli immobili</button></div>
    <div class="card"><div class="card-title" id="im-titolo-ed">Nuovo immobile</div>
      <div class="field"><label>Titolo *</label><input type="text" id="im-title"></div>
      <div class="grid2">
        <div class="field"><label>Categoria</label><select id="im-categoria"></select></div>
        <div class="field"><label>Contratto</label><select id="im-contratto"><option value="vendita">In vendita</option><option value="affitto">In affitto</option></select></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Zona</label><input type="text" id="im-zona" placeholder="Mentana, zona Mezzaluna"></div>
        <div class="field"><label>Prezzo (testo libero)</label><input type="text" id="im-prezzo" placeholder="250.000 \u20AC"></div>
      </div>
      <div class="field"><label>Foto <span class="hint" style="display:inline">percorso, es. /assets/foto/agenzia/casa-giardino.jpg</span></label><input type="text" id="im-foto"></div>
      <div class="field"><label>Dati in evidenza <span class="hint" style="display:inline">separati da | (es. 3 piani|9 camere|6 bagni)</span></label><input type="text" id="im-dati"></div>
      <div class="grid2">
        <div class="field"><label>Preferito (in home)</label><select id="im-pref"><option value="false">No</option><option value="true">S\u00EC</option></select></div>
        <div class="field"><label>Ordine (1 = primo)</label><input type="number" id="im-ord" placeholder="1"></div>
      </div>
      <div class="field"><label>Descrizione breve (SEO)</label><input type="text" id="im-desc"></div>
      <div class="field"><label>Testo completo (Markdown)</label><textarea class="sm" id="im-corpo" style="min-height:220px"></textarea></div>
      <div class="btn-group"><button class="btn btn-primary" onclick="imSalva()">Salva immobile</button></div>
      <div class="msg" id="im-msg"></div>
    </div>
  </div>
</div>`;
}

function init(){
  const main=document.querySelector('main.main'); if(!main)return;
  const lab=[...document.querySelectorAll('.nav-label')].find(e=>e.textContent.trim()==='Impostazioni');
  main.insertAdjacentHTML('beforeend',build());
  if(lab)lab.insertAdjacentHTML('beforebegin','<div class="nav-label">Immobili</div><button class="nav-item" onclick="imShow(this)"><span class="icon">\uD83C\uDFE0</span>Immobili</button>');
}

async function caricaCat(){
  try{const r=await ghGet(CATF); if(r.ok){const d=await r.json(); catSha=d.sha; cats=JSON.parse(dec(d.content));}}catch(e){}
  if(!Array.isArray(cats))cats=[];
}
function optCat(sel,conVuoto,val){
  const top=cats.filter(c=>!c.parent); let o=conVuoto?'<option value="">(nessuna: e\' una madre)</option>':'';
  top.forEach(p=>{
    o+=`<option value="${h(p.slug)}">${h(p.nome)}</option>`;
    cats.filter(c=>c.parent===p.slug).forEach(c=>{o+=`<option value="${h(c.slug)}">&nbsp;&nbsp;&#8627; ${h(c.nome)}</option>`;});
  });
  sel.innerHTML=o; if(val!=null)sel.value=val;
}
function vista(v){['lista','cat','editor'].forEach(x=>$(`im-${x}-view`).style.display=x===v?'block':'none'); window.scrollTo({top:0,behavior:'smooth'});}

window.imShow=function(btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  $('page-immobili').classList.add('active'); btn.classList.add('active'); imTorna();
};
window.imTorna=async function(){vista('lista'); await caricaCat(); imCarica();};
window.imCarica=async function(){
  const el=$('im-lista');
  if(!tok()){el.innerHTML='<em style="color:#646970;font-size:13px">Token mancante.</em>';return;}
  let res; try{res=await ghGet(DIR);}catch(e){el.innerHTML='<em>Errore di rete.</em>';return;}
  if(!res.ok){el.innerHTML='<em style="color:#646970;font-size:13px">Nessun immobile ancora.</em>';return;}
  const files=(await res.json()).filter(f=>f.name.endsWith('.md'));
  const rows=await Promise.all(files.map(async f=>{
    try{
      const d=await (await ghGet(f.path)).json(), raw=dec(d.content).replace(/\r\n/g,'\n');
      const fm=(raw.match(/^---\n([\s\S]+?)\n---/)||[])[1]||'';
      const g=n=>{const x=fm.match(new RegExp('^'+n+':[ \\t]*"?(.*?)"?[ \\t]*$','m'));return x?x[1].replace(/\\"/g,'"'):'';};
      return {f,title:g('title')||f.name,cat:g('categoria'),contr:g('contratto'),pref:g('preferito')==='true',ord:parseInt(g('ordine'))||99};
    }catch(e){return {f,title:f.name,cat:'',contr:'',pref:false,ord:99};}
  }));
  rows.sort((a,b)=>a.ord-b.ord||a.title.localeCompare(b.title));
  const nome=s=>{const c=cats.find(x=>x.slug===s);return c?c.nome:s;};
  el.innerHTML=`<table class="wp-list"><thead><tr><th>Titolo</th><th>Categoria</th><th>Contratto</th><th>Preferito</th></tr></thead><tbody>`+
  rows.map(x=>`<tr><td><a class="wp-t" onclick="imModifica('${x.f.path}')">${h(x.title)}</a>
    <div class="wp-ra"><a onclick="imModifica('${x.f.path}')">Modifica</a> | <a class="del" onclick="imElimina('${x.f.path}','${x.f.sha}')">Elimina</a></div></td>
    <td>${h(nome(x.cat))}</td><td>${x.contr==='affitto'?'Affitto':'Vendita'}</td><td class="wp-n">${x.pref?'S\u00EC':'No'}</td></tr>`).join('')+
  `</tbody></table><div class="hint" style="margin-top:8px">${rows.length} immobili</div>`;
};
function svuota(){
  ['title','zona','prezzo','foto','dati','ord','desc','corpo'].forEach(f=>$('im-'+f).value='');
  $('im-contratto').value='vendita'; $('im-pref').value='false'; optCat($('im-categoria'),false);
}
window.imNuovo=async function(){await caricaCat(); svuota(); curPath=null; $('im-titolo-ed').textContent='Nuovo immobile'; showMsg('im-msg','',''); vista('editor');};
window.imModifica=async function(path){
  await caricaCat(); const r=await ghGet(path); if(!r.ok)return;
  const raw=dec((await r.json()).content).replace(/\r\n/g,'\n'), fm=raw.match(/^---\n([\s\S]+?)\n---\n?([\s\S]*)$/); if(!fm)return;
  const m={}; fm[1].split('\n').forEach(l=>{const x=l.match(/^(\w+):\s*"?(.*?)"?\s*$/); if(x)m[x[1]]=x[2].replace(/\\"/g,'"');});
  svuota(); optCat($('im-categoria'),false,m.categoria||'');
  $('im-title').value=m.title||''; $('im-contratto').value=m.contratto==='affitto'?'affitto':'vendita'; $('im-zona').value=m.zona||'';
  $('im-prezzo').value=m.prezzo||''; $('im-foto').value=m.foto||''; $('im-dati').value=m.dati||''; $('im-pref').value=m.preferito==='true'?'true':'false';
  $('im-ord').value=m.ordine||''; $('im-desc').value=m.description||''; $('im-corpo').value=fm[2].trim();
  curPath=path; $('im-titolo-ed').textContent='Modifica immobile'; showMsg('im-msg','',''); vista('editor');
};
window.imSalva=async function(){
  if(!tok())return showMsg('im-msg','Token mancante.','err');
  const t=$('im-title').value.trim(); if(!t)return showMsg('im-msg','Titolo obbligatorio.','err');
  const v=id=>$('im-'+id).value.trim(), path=curPath||`${DIR}/${slug(t)}.md`;
  const md=['---','layout: immobile','author_profile: false','classes: wide',`title: "${esc(t)}"`,`categoria: "${esc($('im-categoria').value)}"`,`contratto: "${$('im-contratto').value}"`,
    `zona: "${esc(v('zona'))}"`,`prezzo: "${esc(v('prezzo'))}"`,`foto: "${esc(v('foto'))}"`,`dati: "${esc(v('dati'))}"`,`preferito: ${$('im-pref').value}`,`ordine: ${parseInt(v('ord'))||99}`,
    `description: "${esc(v('desc'))}"`,'---','',v('corpo'),''].join('\n');
  let sha; if(curPath){const r=await ghGet(path); if(r.ok)sha=(await r.json()).sha;}
  showMsg('im-msg','Salvataggio...','');
  const res=await ghPut(path,'Immobile: '+t,md,sha);
  if(res.ok){showMsg('im-msg','Immobile salvato!','ok'); startDeployPolling(); curPath=path;}
  else{const j=await res.json(); showMsg('im-msg',j.message,'err');}
};
window.imElimina=async function(path,sha){
  if(!confirm('Eliminare?')||!tok())return;
  const res=await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`,{method:'DELETE',headers:{'Authorization':`token ${tok()}`,'Content-Type':'application/json'},body:JSON.stringify({message:'Elimina immobile',sha})});
  if(res.ok){startDeployPolling(); imCarica();}
};

// --- categorie ---
function disegnaCat(){
  const top=cats.filter(c=>!c.parent); let o='';
  const riga=(c,sub)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;${sub?'padding-left:24px;':''}border-bottom:1px solid #eee"><span>${sub?'&#8627; ':''}<b>${h(c.nome)}</b> <span class="hint" style="display:inline">${h(c.slug)}</span></span><a class="del" style="cursor:pointer" onclick="imCatElimina('${h(c.slug)}')">Elimina</a></div>`;
  top.forEach(p=>{o+=riga(p,false); cats.filter(c=>c.parent===p.slug).forEach(c=>{o+=riga(c,true);});});
  $('im-cat-lista').innerHTML=o||'<em style="color:#646970;font-size:13px">Nessuna categoria.</em>';
  optCat($('im-cat-par'),true,'');
}
window.imCatView=async function(){await caricaCat(); disegnaCat(); showMsg('im-cat-msg','',''); vista('cat');};
async function salvaCat(msg){
  const res=await ghPut(CATF,'Aggiorna categorie immobili',JSON.stringify(cats,null,2),catSha||undefined);
  if(res.ok){const j=await res.json(); catSha=j.content.sha; showMsg('im-cat-msg',msg,'ok'); startDeployPolling(); disegnaCat();}
  else{const j=await res.json(); showMsg('im-cat-msg',j.message,'err');}
}
window.imCatAggiungi=async function(){
  const n=$('im-cat-nome').value.trim(); if(!n)return showMsg('im-cat-msg','Scrivi il nome.','err');
  const s=slug(n); if(cats.some(c=>c.slug===s))return showMsg('im-cat-msg','Esiste gia\'.','err');
  cats.push({nome:n,slug:s,parent:$('im-cat-par').value}); $('im-cat-nome').value=''; await salvaCat('Categoria aggiunta.');
};
window.imCatElimina=async function(s){
  if(!confirm('Eliminare la categoria? Le sottocategorie diventano madri.'))return;
  cats=cats.filter(c=>c.slug!==s).map(c=>c.parent===s?{...c,parent:''}:c); await salvaCat('Categoria eliminata.');
};
init();
})();
