---
layout: single
title: "Quanto vale la tua casa? Valutazione gratuita"
permalink: /vendi/
classes: wide
author_profile: false
description: "Valutazione gratuita della tua casa a Mentana, Monterotondo e Roma nord: stima ragionata, piano di vendita e risposta in 24 ore."
seo_description: "Valutazione gratuita della tua casa a Mentana, Monterotondo e Roma nord: stima ragionata, piano di vendita e risposta in 24 ore."
ref: vendi
---

<style>.page__title{display:none}</style>
<div class="im-top">
<div>
<h1>Quanto vale la tua casa?</h1>
<p>Valutazione gratuita e senza impegno a Mentana, Monterotondo, Fonte Nuova e Roma nord. Ti rispondiamo entro 24 ore con una stima ragionata e un piano di vendita chiaro: prezzo, tempi e promozione.</p>
<p><b>Non devi vendere per chiedere.</b> Se vuoi solo sapere quanto vale, ti diciamo il valore e basta.</p>
</div>
<form class="im-form" id="im-form" novalidate>
<h2>Richiedi la valutazione</h2>
<label for="im-zona">Dove si trova l'immobile?</label>
<input id="im-zona" name="zona" required placeholder="Comune e zona, es. Mentana centro">
<div class="im-2">
<div><label for="im-tipo">Tipologia</label><select id="im-tipo" name="tipo"><option>Appartamento</option><option>Villa o villino</option><option>Attico</option><option>Terreno</option><option>Locale commerciale</option><option>Altro</option></select></div>
<div><label for="im-mq">Metri quadri</label><input id="im-mq" name="mq" inputmode="numeric" placeholder="es. 90"></div>
</div>
<label for="im-nome">Come ti chiami?</label>
<input id="im-nome" name="nome" required autocomplete="name">
<label for="im-tel">Telefono</label>
<input id="im-tel" name="telefono" type="tel" required autocomplete="tel" placeholder="+39 ...">
<div class="im-hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div>
<button type="submit">Voglio la valutazione gratuita</button>
<p id="im-esito" class="im-esito" role="status" aria-live="polite"></p>
<p class="im-nota">Usiamo i tuoi dati solo per rispondere alla richiesta. Nessun obbligo di incarico.</p>
</form>
</div>

<div class="im-box">
<div><b>Stima realistica</b><span>Basata sui prezzi effettivi di compravendita della tua zona, non su quelli sparati dagli annunci.</span></div>
<div><b>Piano di vendita</b><span>Prezzo di partenza, tempi attesi, foto professionali, annunci sui portali e visite solo con acquirenti qualificati.</span></div>
<div><b>Documenti a posto</b><span>Visure, planimetrie, APE e conformità: controlliamo noi prima che diventino un problema al rogito.</span></div>
</div>

<h2>Domande frequenti</h2>
<div class="im-faq">
<details><summary>La valutazione è davvero gratuita?</summary><p>Sì. Non costa nulla e non ti impegna a darci un incarico di vendita.</p></details>
<details><summary>Quanto tempo serve?</summary><p>Per una prima indicazione rispondiamo entro 24 ore. Per la stima definitiva facciamo un sopralluogo.</p></details>
<details><summary>Quanto costa vendere con voi?</summary><p>La provvigione si concorda prima, per iscritto, e si paga solo a vendita conclusa.</p></details>
<details><summary>Posso vendere casa con un mutuo ancora aperto?</summary><p>Sì, e capita spesso. Verifichiamo il residuo e organizziamo la cancellazione dell'ipoteca al rogito.</p></details>
</div>

<script>
(function(){
var WA={{ site.whatsapp | default: "" | jsonify }},EM={{ site.email | default: "" | jsonify }};
var M=["Richiesta valutazione gratuita","Immobile","Zona","Nome","Telefono"];
var f=document.getElementById('im-form'),e=document.getElementById('im-esito');
f.addEventListener('submit',function(ev){
  ev.preventDefault();
  if(f.website.value){return}
  if(!f.checkValidity()){e.textContent="Compila zona, nome e telefono.";return}
  var t=M[0]+'\n'+M[1]+': '+f.tipo.value+(f.mq.value?' ('+f.mq.value+' m2)':'')+'\n'+M[2]+': '+f.zona.value+'\n'+M[3]+': '+f.nome.value+'\n'+M[4]+': '+f.telefono.value;
  if(WA){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener');e.textContent="Si apre WhatsApp: invia il messaggio e ti rispondiamo entro 24 ore.";}
  else if(EM){location.href='mailto:'+EM+'?subject='+encodeURIComponent("Richiesta valutazione")+'&body='+encodeURIComponent(t);}
  else{e.textContent="Il servizio sarà attivo a breve. Riprova più tardi.";}
});
})();
</script>
