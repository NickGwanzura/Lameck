'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import products from '../../../data/products.json'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { useCart } from '../../components/CartContext'

const categoryNames = { refrigerators: 'Refrigerators', freezers: 'Freezers', tv: 'TV', phones: 'Phones', solar: 'Solar' }

export default function ProductPage({ params }) {
  const { slug } = use(params)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  function addToBag() {
    addItem(product)
    setAdded(true)
  }

  return <><SiteHeader /><main className="product-detail"><div className={`detail-image product-image ${product.image}`} role="img" aria-label={product.name}/><div className="detail-copy"><a className="back-link" href={`/category/${product.category}`}>← Back to {categoryNames[product.category] || 'shop'}</a><p className="kicker">{product.brand}</p><h1>{product.name}</h1><p className="detail-price">${Number(product.price).toLocaleString('en-US')}</p><p className="detail-description">{product.description}</p><button className="button button-dark detail-add" onClick={addToBag}>{added ? 'Added to bag ✓' : 'Add to bag'}</button><div className="specs">{product.details.map((detail) => <div key={detail}><span>—</span>{detail}</div>)}</div><p className="delivery-note">Complimentary home delivery on orders over $2,000.</p></div></main><SiteFooter /></>
}
