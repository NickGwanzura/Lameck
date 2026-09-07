'use client'
import { useState, useEffect } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { useCart } from './CartContext'

const catalog = {
  appliances: [['AGA','Elise 90 Range Cooker','$4,890','image-oven'],['Smeg',"50's Style Refrigerator",'$2,190','image-fridge'],['Miele','PureLine Oven','$3,490','image-oven'],['Bora','Pure Induction Hob','$2,790','image-fridge']],
  furniture: [['South Grant Atelier','Haven Lounge Chair','$1,240','image-chair'],['Ethnicraft','Bok Extendable Table','$2,895','image-table'],['Muuto','Outline Sofa','$3,890','image-chair'],['Ferm Living','Desert Lounge Chair','$690','image-chair']]
}

export default function CollectionPage({ type }) {
  const { addItem } = useCart()
  const title = type === 'appliances' ? 'Appliances' : 'Furniture'
  useEffect(() => { document.querySelectorAll('.product').forEach((card) => { card.style.cursor='pointer'; card.onclick=(event)=>{ if(event.target.closest('button')) return; const name=card.querySelector('h3')?.textContent||''; const slug=name.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g,'-').replace(/-$/,''); window.location.href='/product/'+slug } }) }, [])
  return <><SiteHeader active={type} /><main><section className="page-hero"><div className="container"><p className="kicker">South Grant / Shop</p><h1>{title}</h1><p>{type === 'appliances' ? 'Quietly capable appliances, selected for lasting performance and considered design.' : 'Pieces with presence, made for the way you gather, rest, and live.'}</p></div></section><section className="section section-stone"><div className="container"><div className="section-title"><div><p className="kicker">The Casora edit</p><h2>{type === 'appliances' ? 'Featured appliances' : 'Featured furniture'}</h2></div><span className="result-count">{catalog[type].length} pieces&nbsp; · &nbsp;USD</span></div><div className="product-grid">{catalog[type].map(([brand,name,price,image], index)=><article className="product" key={name}><div className={`product-image ${image}`}><span className="product-badge">{index === 0 ? 'Best seller' : 'New'}</span><button className="wishlist" aria-label={`Add ${name} to wishlist`}>♡</button></div><p className="product-brand">{brand}</p><h3>{name}</h3><div className="product-card-row"><p className="price">{price}</p><button className="add-btn" onClick={()=>addItem({ slug: name.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), name, brand, price, image })}>Quick add&nbsp;↗</button></div></article>)}</div></div></section></main><SiteFooter /></>
}
