'use client'

import { useState, useEffect } from 'react'

const products = [
  ['AGA', 'Elise 90 Range Cooker', '$4,890', 'image-oven'],
  ['South Grant Atelier', 'Haven Lounge Chair', '$1,240', 'image-chair'],
  ['Smeg', "50's Style Refrigerator", '$2,190', 'image-fridge'],
  ['Ethnicraft', 'Bok Extendable Table', '$2,895', 'image-table'],
]

export default function Home() {
  const [bag, setBag] = useState(0)
  const [filter, setFilter] = useState('All')
  useEffect(() => { document.querySelectorAll('.product').forEach((card) => { card.style.cursor='pointer'; card.onclick=(event)=>{ if(event.target.closest('button')) return; const name=card.querySelector('h3')?.textContent||''; const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''); window.location.href='/product/'+slug } }) }, [])
  const visible = products.filter((p) => filter === 'All' || (filter === 'Appliances' ? ['AGA', 'Smeg'].includes(p[0]) : !['AGA', 'Smeg'].includes(p[0])))
  return <>
    <div className="announcement">Complimentary white glove delivery on orders over $2,000</div>
    <header className="site-header"><nav className="nav container"><a className="brand logo-wrap" href="#home" aria-label="South Grant home"><img src="/southgrant-logo.png" alt="South Grant" /></a><ul className="nav-menu"><li><a className="active" href="#home">New arrivals</a></li><li><a href="/appliances">Appliances</a></li><li><a href="/furniture">Furniture</a></li><li><a href="/collections">Collections</a></li><li><a href="/inspiration">Inspiration</a></li><li><a href="/about">About</a></li></ul><div className="nav-tools"><button className="icon-btn" aria-label="Search">⌕</button><button className="icon-btn" onClick={() => alert(`Your bag has ${bag} item${bag === 1 ? '' : 's'}.`)}>Bag <sup>{bag}</sup></button></div></nav></header>
    <main><section className="hero" id="home"><div className="hero-image"/><div className="hero-copy container"><p className="kicker">The quiet art of living well</p><h1>Objects with<br/><em>presence.</em></h1><p>Enduring appliances and furniture, chosen for the spaces you call home.</p><a className="button button-light" href="#shop">Shop the collection <span>↗</span></a></div></section>
      <section className="service-strip"><div><strong>Curated materials</strong><span>Built to be lived with</span></div><div><strong>White glove delivery</strong><span>From our door to yours</span></div><div><strong>Expert guidance</strong><span>Here when you need us</span></div></section>
      <section className="section" id="collections"><div className="container"><div className="section-title"><div><p className="kicker">Explore</p><h2>Designed for the everyday</h2></div><a href="#shop" className="text-link">View all collections ↗</a></div><div className="collection-grid"><a className="collection collection-kitchen" href="#shop"><span>Kitchen</span><small>Quietly capable</small></a><a className="collection collection-living" href="#shop"><span>Living</span><small>Made for gathering</small></a><a className="collection collection-bedroom" href="#shop"><span>Bedroom</span><small>A softer rhythm</small></a></div></div></section>
      <section className="section section-stone" id="shop"><div className="container"><div className="section-title"><div><p className="kicker">Featured products</p><h2>New arrivals</h2></div><div className="filters">{['All','Appliances','Furniture'].map((f) => <button key={f} className={`filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}</div></div><div className="product-grid">{visible.map(([brand, name, price, image]) => <article className="product" key={name}><div className={`product-image ${image}`}><button className="wishlist" aria-label={`Add ${name} to wishlist`}>♡</button></div><p className="product-brand">{brand}</p><h3>{name}</h3><p className="price">{price}</p><button className="add-btn" onClick={() => setBag(bag + 1)}>Add to bag</button></article>)}</div></div></section>
      <section className="editorial" id="journal"><div className="editorial-image"/><div className="editorial-copy"><p className="kicker">The journal / 01</p><h2>A home with<br/><em>room to breathe.</em></h2><p>Thoughtful objects make space for the moments that matter. Discover our guide to a more considered home.</p><a href="#about" className="text-link">Read the story ↗</a></div></section>
    </main><footer><div className="container footer-top"><a className="brand logo-wrap footer-logo" href="#home"><img src="/southgrant-logo.png" alt="South Grant" /></a><p>Considered living for modern homes.</p><div className="footer-links"><a href="#shop">Shop</a><a href="#journal">Journal</a><a href="#about">Contact</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} South Grant</span><span>Delivery & returns&nbsp;&nbsp; Privacy</span></div></footer>
  </>
}
