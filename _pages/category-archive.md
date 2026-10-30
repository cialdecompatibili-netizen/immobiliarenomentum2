---
title: "Categorie"
layout: single
permalink: /categorie/
author_profile: false
classes: wide
---

<style>
.cg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.1rem;margin-top:1.2rem}
.cg-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:14px;padding:1.3rem 1.4rem;text-decoration:none !important;color:inherit;transition:box-shadow .15s,transform .15s,border-color .15s}
.cg-card:hover{box-shadow:0 8px 22px rgba(0,0,0,.09);transform:translateY(-2px);border-color:rgba(0,0,0,.25)}
.cg-card h3{margin:0 0 .45rem !important;font-size:1.15rem;line-height:1.3;color:#1a1a2e;text-transform:capitalize}
.cg-card p{margin:0 0 1rem !important;font-size:.9rem;line-height:1.55;color:#666;flex:1}
.cg-card .cg-n{font-size:.78rem;color:#888;margin:0 0 .6rem}
.cg-card span.cg-go{font-weight:700;font-size:.9rem;color:var(--t-accent,#3f6b00)}
</style>

{%- comment -%} Solo card: una per categoria, create da sole da site.categories. Ogni card apre la pagina dinamica /categoria/?cat=NOME (_pages/categoria.md). {%- endcomment -%}
<div class="cg-grid">
{%- assign cats = site.categories | sort %}
{%- for cat in cats %}
{%- assign cat_data = site.data.categorie | where: "nome", cat[0] | first %}
  <a class="cg-card" href="{{ '/categoria/' | relative_url }}?cat={{ cat[0] | uri_escape }}">
    <h3>{{ cat_data.icona }} {{ cat[0] }}</h3>
    <p class="cg-n">{{ cat[1].size }} {% if cat[1].size == 1 %}articolo{% else %}articoli{% endif %}</p>
    <p>{% if cat_data.descrizione and cat_data.descrizione != "" %}{{ cat_data.descrizione | strip_html | truncate: 140 }}{% endif %}</p>
    <span class="cg-go">Scopri &rarr;</span>
  </a>
{%- endfor %}
</div>
