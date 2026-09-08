'use client'

import { useState } from 'react'
import products from '../data/products.json'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import { useCart } from './components/CartContext'

const categories = [
  ['Refrigerators', 'Fresh food, beautifully kept', 'category-refrigerators', '/category/refrigerators'],
  ['Freezers', 'More room for what matters', 'category-freezers', '/category/freezers'],
  ['TV', 'A better way to watch', 'category-tv', '/category/tv'],
  ['Phones', 'Technology, made personal', 'category-phones', '/category/phones'],
  ['Solar', 'Power that stays with you', 'category-solar', '/category/solar'],
]

const featured = products.slice(0, 5)
const money = (value) => `$${Number(value).toLocaleString('en-US')}`

export default function Home() {
  const { addItem } = useCart()
  const [filter, setFilter] = useState('All')
  const visible = featured.filter((product) => filter === 'All' || product.category === filter)

  return <><SiteHeader active="home" /><main><section className="hero" id="home"><div className="hero-image"/><div className="hero-copy container"><p className="kicker">The quiet art of living well</p><h1>Technology with<br/><em>presence.</em></h1><p>Refrigeration, entertainment, phones, and solar power chosen for the spaces you call home.</p><a className="button button-light" href="#shop">Shop the categories <span>↗</span></a></div></section>
    <section className="service-strip casora-benefits"><div><span className="benefit-icon">✦</span><strong>Curated products</strong><span>Selected for daily life</span></div><div><span className="benefit-icon">⌁</span><strong>White glove delivery</strong><span>From our door to yours</span></div><div><span className="benefit-icon">◇</span><strong>Warranty support</strong><span>Quality you can trust</span></div><div><span className="benefit-icon">↗</span><strong>Zimbabwe delivery</strong><span>Harare and nationwide</span></div></section>
    <section className="section" id="collections"><div className="container"><div className="section-title"><div><p className="kicker">Explore</p><h2>Shop by category</h2></div><a href="/collections" className="text-link">View all categories ↗</a></div><div className="collection-grid">{categories.slice(0, 3).map(([name, copy, image, href]) => <a className={`collection ${image}`} href={href} key={name}><span>{name}</span><small>{copy}</small></a>)}</div></div></section>
    <section className="casora-highlight"><div className="highlight-image" /><div className="highlight-copy"><p className="kicker">South Grant / Essentials</p><h2>Useful things, considered carefully.</h2><p>From a cool kitchen to dependable home power, discover products designed to make everyday life feel more intentional.</p><a className="button button-dark" href="/collections">Explore all categories&nbsp;↗</a></div></section>
    <section className="section section-stone" id="shop"><div className="container"><div className="section-title"><div><p className="kicker">Featured products</p><h2>New arrivals</h2></div><div className="filters">{['All', ...categories.map(([name]) => name)].map((name) => { const value = name === 'TV' ? 'tv' : name === 'All' ? 'All' : name.toLowerCase(); return <button key={name} className={`filter ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>{name}</button> })}</div></div><div className="product-grid">{visible.map((product, index) => <article className="product" key={product.id}><div className={`product-image ${product.image}`}><span className="product-badge">{index % 2 === 0 ? 'New' : 'Featured'}</span><button className="wishlist" aria-label={`Add ${product.name} to wishlist`}>♡</button></div><a className="product-link" href={`/product/${product.slug}`}><p className="product-brand">{product.brand}</p><h3>{product.name}</h3></a><div className="product-card-row"><p className="price">{money(product.price)}</p><button className="add-btn" onClick={() => addItem(product)}>Quick add&nbsp;↗</button></div></article>)}</div></div></section>
    <section className="editorial" id="journal"><div className="editorial-image"/><div className="editorial-copy"><p className="kicker">The journal / 01</p><h2>A home with<br/><em>room to breathe.</em></h2><p>Thoughtful technology makes space for the moments that matter. Discover our guide to a more considered home.</p><a href="/inspiration" className="text-link">Read the story ↗</a></div></section>
  </main><SiteFooter /></>
}
