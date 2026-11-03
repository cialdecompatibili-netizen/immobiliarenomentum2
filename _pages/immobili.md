---
ref: immobili
title: "Immobili"
layout: single
permalink: /immobili/
author_profile: false
classes: wide
description: "Tutti gli immobili in vendita e in affitto: case, ville, terreni, box, cantine, locali commerciali e uffici."
---
{%- comment -%}
GUIDA-SVILUPPO: elenco di TUTTI gli immobili (collection _immobili), filtrabili per categoria. Le categorie stanno in _data/immobili-cat.json (nome, slug, parent = slug della madre, vuoto se e' madre) e si gestiscono da admin > Immobili. Il filtro e' in JS sugli attributi data-cat/data-par delle card; #slug nell'URL preseleziona la categoria.
{%- endcomment -%}
{% assign im_all = site.immobili | sort: "ordine" %}
{% assign im_cats = site.data["immobili-cat"] %}
<style>
.im-filtri{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 .8rem}
.im-filtri button{border:1px solid #cfd4da;background:#fff;color:inherit;border-radius:999px;padding:.4rem .95rem;font:inherit;font-size:14px;cursor:pointer}
.im-filtri button[aria-pressed="true"]{background:#1d2733;color:#fff;border-color:#1d2733}
.im-sub{display:none}.im-sub.on{display:flex}
.im-vuoto{display:none;margin-top:1rem}
</style>
<div class="gc"><div class="gc-wrap">
<div class="im-filtri" id="im-f0"><button type="button" data-f="" aria-pressed="true">Tutti</button>{% for c in im_cats %}{% if c.parent == "" %}<button type="button" data-f="{{ c.slug }}" aria-pressed="false">{{ c.nome }}</button>{% endif %}{% endfor %}</div>
{% for p in im_cats %}{% if p.parent == "" %}{% assign im_has = false %}{% for c in im_cats %}{% if c.parent == p.slug %}{% assign im_has = true %}{% endif %}{% endfor %}{% if im_has %}<div class="im-filtri im-sub" data-sub="{{ p.slug }}"><button type="button" data-f="{{ p.slug }}" aria-pressed="true">Tutti: {{ p.nome }}</button>{% for c in im_cats %}{% if c.parent == p.slug %}<button type="button" data-f="{{ c.slug }}" aria-pressed="false">{{ c.nome }}</button>{% endif %}{% endfor %}</div>{% endif %}{% endif %}{% endfor %}
<div class="gc-plat" id="im-lista">{% for im in im_all %}{% include immobile-card.html i=im %}{% endfor %}</div>
<p class="im-vuoto" id="im-vuoto">Nessun immobile in questa categoria al momento. <a href="{{ '/contatti/' | relative_url }}">Descrivici la ricerca.</a></p>
</div></div>
<script>
(function(){
var cards=[].slice.call(document.querySelectorAll('#im-lista .im-card')),subs=[].slice.call(document.querySelectorAll('.im-sub')),top=document.getElementById('im-f0'),vuoto=document.getElementById('im-vuoto');
var par={};{% for c in im_cats %}par["{{ c.slug }}"]="{{ c.parent }}";{% endfor %}
function set(f){
  var madre=f?(par[f]||f):'';
  [].forEach.call(top.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b.dataset.f===madre));});
  subs.forEach(function(s){var on=s.dataset.sub===madre;s.classList.toggle('on',on);if(on)[].forEach.call(s.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b.dataset.f===f));});});
  var n=0;cards.forEach(function(c){var ok=!f||c.dataset.cat===f||c.dataset.par===f;c.style.display=ok?'':'none';if(ok)n++;});
  vuoto.style.display=n?'none':'block';
  try{history.replaceState(null,'',f?'#'+f:location.pathname);}catch(e){}
}
document.addEventListener('click',function(e){var b=e.target.closest('.im-filtri button');if(b)set(b.dataset.f);});
set((location.hash||'').replace('#','')) ;
})();
</script>