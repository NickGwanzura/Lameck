'use client'

import { useState } from 'react'
import products from '../data/products.json'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ProductCard from './components/ProductCard'

const categories = [
  ['Refrigerators', 'Fresh food, beautifully kept', 'category-refrigerators', '/category/refrigerators'],
  ['Freezers', 'More room for what matters', 'category-freezers', '/category/freezers'],
  ['TV', 'A better way to watch', 'category-tv', '/category/tv'],
  ['Phones', 'Technology, made personal', 'category-phones', '/category/phones'],
  ['Solar', 'Power that stays with you', 'category-solar', '/category/solar'],
]

const featured = products.slice(0, 5)
export default function Home() {
  const [filter, setFilter] = useState('All')
  const visible = featured.filter((product) => filter === 'All' || product.category === filter)

  return <><SiteHeader active="home" /><main className="apple-home">
    <section className="apple-hero" id="home">
      <div className="apple-hero-copy container"><p className="kicker">South Grant</p><h1>Essentials for a better home.</h1><p>Thoughtful technology, dependable energy, and everyday pieces selected for life in Zimbabwe.</p><div className="apple-hero-actions"><a className="button button-dark" href="/collections">Shop the collection&nbsp;↗</a><a className="apple-text-link" href="#shop">Explore featured products&nbsp;→</a></div></div>
      <div className="apple-hero-image" role="img" aria-label="Modern South Grant home interior" />
    </section>
    <section className="apple-benefits" aria-label="South Grant services"><div className="container apple-benefits-grid"><div><strong>Home delivery</strong><span>Across Zimbabwe</span></div><div><strong>USD pricing</strong><span>15.5% VAT included</span></div><div><strong>Warranty support</strong><span>Help after every purchase</span></div><div><strong>Human guidance</strong><span>Call or WhatsApp our team</span></div></div></section>
    <section className="apple-section apple-category-section" id="collections"><div className="container"><div className="apple-section-heading"><div><p className="kicker">Shop South Grant</p><h2>Find what fits your space.</h2></div><a className="apple-text-link" href="/collections">View all categories&nbsp;→</a></div><div className="apple-category-grid">{categories.map(([name, copy, image, href]) => <a className={`apple-category-card ${image}`} href={href} key={name}><span>{name}</span><small>{copy}</small><strong>Shop now&nbsp;↗</strong></a>)}</div></div></section>
    <section className="apple-feature" aria-label="South Grant Energy"><div className="apple-feature-image" /><div className="apple-feature-copy"><p className="kicker">South Grant Energy</p><h2>Power that stays with you.</h2><p>Solar systems and home batteries designed for comfortable, resilient living through every season.</p><a className="button button-dark" href="/category/solar">Explore solar&nbsp;↗</a></div></section>
    <section className="apple-section apple-products-section" id="shop"><div className="container"><div className="apple-section-heading"><div><p className="kicker">Featured products</p><h2>Made for everyday life.</h2></div><div className="filters">{['All', ...categories.map(([name]) => name)].map((name) => { const value = name === 'TV' ? 'tv' : name === 'All' ? 'All' : name.toLowerCase(); return <button key={name} className={`filter ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>{name}</button> })}</div></div><div className="product-grid">{visible.map((product, index) => <ProductCard product={product} badge={index % 2 === 0 ? 'New' : 'Featured'} key={product.id} />)}</div></div></section>
    <section className="apple-bottom-cta"><p className="kicker">South Grant / Zimbabwe</p><h2>Good things, considered carefully.</h2><p>From the kitchen to the living room, find the pieces that make home feel more like yours.</p><a className="apple-text-link" href="/collections">Browse the full collection&nbsp;→</a></section>
  </main><SiteFooter /></>
}
