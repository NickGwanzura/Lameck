'use client'

import products from '../../data/products.json'
import ProductCard from './ProductCard'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

const categoryCopy = {
  refrigerators: ['Refrigerators', 'Fresh food, beautifully kept.', 'Cooling essentials selected for quiet performance, considered storage, and everyday ease.'],
  freezers: ['Freezers', 'More room for what matters.', 'Dependable cold storage for Zimbabwean homes, from compact chests to generous upright designs.'],
  tv: ['TV', 'A better way to watch.', 'Beautiful screens and smart entertainment systems for evenings in, weekends together, and everything between.'],
  phones: ['Phones', 'Technology, made personal.', 'Flagship phones chosen for clear photography, useful power, and a calm everyday experience.'],
  solar: ['Solar', 'Power that stays with you.', 'Practical solar systems and storage designed for resilient, comfortable living in Zimbabwe.'],
}

export default function CollectionPage({ type }) {
  const [title, tagline, copy] = categoryCopy[type] || categoryCopy.refrigerators
  const catalog = products.filter((product) => product.category === type)

  return <>
    <SiteHeader active="collections" />
    <main id="main-content">
      <section className="page-hero"><div className="container"><p className="kicker">South Grant / Shop</p><h1>{title}</h1><p>{copy}</p></div></section>
      <section className="section section-stone"><div className="container"><div className="section-title"><div><p className="kicker">{tagline}</p><h2>Three considered choices</h2></div><span className="result-count">{catalog.length} products&nbsp; · &nbsp;USD</span></div><div className="product-grid">{catalog.map((product, index) => <ProductCard product={product} badge={index === 0 ? 'Best seller' : 'New'} key={product.id} />)}</div></div></section>
    </main>
    <SiteFooter />
  </>
}
