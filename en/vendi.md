---
layout: single
title: "How much is your home worth? Free valuation"
permalink: /en/sell/
classes: wide
author_profile: false
description: "Free valuation of your home in Mentana, Monterotondo and north Rome: a reasoned estimate, a sales plan and a reply within 24 hours."
seo_description: "Free valuation of your home in Mentana, Monterotondo and north Rome: a reasoned estimate, a sales plan and a reply within 24 hours."
ref: vendi
lang: en
locale: en
tr: tradotto
tr_hash: ikn4ug
---

<style>.page__title{display:none}</style>
<div class="im-top">
<div>
<h1>How much is your home worth?</h1>
<p>Free, no-obligation valuation in Mentana, Monterotondo, Fonte Nuova and north Rome. We reply within 24 hours with a reasoned estimate and a clear sales plan: price, timing and promotion.</p>
<p><b>You do not have to sell to ask.</b> If you only want to know what it is worth, we tell you the value and that is it.</p>
</div>
<form class="im-form" id="im-form" novalidate>
<h2>Request the valuation</h2>
<label for="im-zona">Where is the property?</label>
<input id="im-zona" name="zona" required placeholder="Town and area, e.g. central Mentana">
<div class="im-2">
<div><label for="im-tipo">Type</label><select id="im-tipo" name="tipo"><option>Apartment</option><option>Villa or small house</option><option>Penthouse</option><option>Land</option><option>Commercial unit</option><option>Other</option></select></div>
<div><label for="im-mq">Square metres</label><input id="im-mq" name="mq" inputmode="numeric" placeholder="e.g. 90"></div>
</div>
<label for="im-nome">Your name</label>
<input id="im-nome" name="nome" required autocomplete="name">
<label for="im-tel">Phone</label>
<input id="im-tel" name="telefono" type="tel" required autocomplete="tel" placeholder="+39 ...">
<div class="im-hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div>
<button type="submit">I want the free valuation</button>
<p id="im-esito" class="im-esito" role="status" aria-live="polite"></p>
<p class="im-nota">We use your details only to answer your request. No obligation to give us a sales mandate.</p>
</form>
</div>

<div class="im-box">
<div><b>Realistic estimate</b><span>Based on the actual sale prices in your area, not on inflated listing prices.</span></div>
<div><b>Sales plan</b><span>Starting price, expected timing, professional photos, listings on the portals and viewings only with qualified buyers.</span></div>
<div><b>Documents in order</b><span>Land registry searches, floor plans, energy certificate and compliance: we check them before they become a problem at the deed.</span></div>
</div>

<h2>Frequently asked questions</h2>
<div class="im-faq">
<details><summary>Is the valuation really free?</summary><p>Yes. It costs nothing and does not oblige you to give us a sales mandate.</p></details>
<details><summary>How long does it take?</summary><p>For a first indication we reply within 24 hours. For the final estimate we visit the property.</p></details>
<details><summary>How much does it cost to sell with you?</summary><p>The commission is agreed beforehand, in writing, and is paid only when the sale is completed.</p></details>
<details><summary>Can I sell a home with a mortgage still open?</summary><p>Yes, and it happens often. We check the remaining balance and arrange the cancellation of the mortgage lien at the deed.</p></details>
</div>

<script>
(function(){
var WA={{ site.whatsapp | default: "" | jsonify }},EM={{ site.email | default: "" | jsonify }};
var M=["Free valuation request","Property","Area","Name","Phone"];
var f=document.getElementById('im-form'),e=document.getElementById('im-esito');
f.addEventListener('submit',function(ev){
  ev.preventDefault();
  if(f.website.value){return}
  if(!f.checkValidity()){e.textContent="Please fill in area, name and phone.";return}
  var t=M[0]+'\n'+M[1]+': '+f.tipo.value+(f.mq.value?' ('+f.mq.value+' m2)':'')+'\n'+M[2]+': '+f.zona.value+'\n'+M[3]+': '+f.nome.value+'\n'+M[4]+': '+f.telefono.value;
  if(WA){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener');e.textContent="WhatsApp is opening: send the message and we will reply within 24 hours.";}
  else if(EM){location.href='mailto:'+EM+'?subject='+encodeURIComponent("Valuation request")+'&body='+encodeURIComponent(t);}
  else{e.textContent="The service will be active soon. Please try again later.";}
});
})();
</script>
