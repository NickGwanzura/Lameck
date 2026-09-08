'use client'

import products from '../../data/products.json'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { useCart } from './CartContext'

const categoryCopy = {
  refrigerators: ['Refrigerators', 'Fresh food, beautifully kept.', 'Cooling essentials selected for quiet performance, considered storage, and everyday ease.'],
  freezers: ['Freezers', 'More room for what matters.', 'Dependable cold storage for Zimbabwean homes, from compact chests to generous upright designs.'],
  tv: ['TV', 'A better way to watch.', 'Beautiful screens and smart entertainment systems for evenings in, weekends together, and everything between.'],
  phones: ['Phones', 'Technology, made personal.', 'Flagship phones chosen for clear photography, useful power, and a calm everyday experience.'],
  solar: ['Solar', 'Power that stays with you.', 'Practical solar systems and storage designed for resilient, comfortable living in Zimbabwe.'],
}

const money = (value) => `$${Number(value).toLocaleString('en-US')}`

export default function CollectionPage({ type }) {
  const { addItem } = useCart()
  const [title, tagline, copy] = categoryCopy[type] || categoryCopy.refrigerators
  const catalog = products.filter((product) => product.category === type)

  return <><SiteHeader active="collections" /><main><section className="page-hero"><div className="container"><p className="kicker">South Grant / Shop</p><h1>{title}</h1><p>{copy}</p></div></section><section className="section section-stone"><div className="container"><div className="section-title"><div><p className="kicker">{tagline}</p><h2>Three considered choices</h2></div><span className="result-count">{catalog.length} products&nbsp; · &nbsp;USD</span></div><div className="product-grid">{catalog.map((product, index) => <article className="product" key={product.id}><div className={`product-image ${product.image}`}><span className="product-badge">{index === 0 ? 'Best seller' : 'New'}</span><button className="wishlist" aria-label={`Add ${product.name} to wishlist`}>♡</button></div><a className="product-link" href={`/product/${product.slug}`}><p className="product-brand">{product.brand}</p><h3>{product.name}</h3></a><div className="product-card-row"><p className="price">{money(product.price)}</p><button className="add-btn" onClick={() => addItem(product)}>Quick add&nbsp;↗</button></div></article>)}</div></div></section></main><SiteFooter /></>
}
