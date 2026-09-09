'use client'

import { useState } from 'react'
import { useCart } from './CartContext'

const money = (value) => `$${Number(value).toLocaleString('en-US')}`

export default function ProductCard({ product, badge = 'New', showWishlist = true }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [saved, setSaved] = useState(false)

  function addToBag() {
    addItem(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return <article className="product">
    <div className={`product-image ${product.image}`}>
      {badge && <span className="product-badge">{badge}</span>}
      <a className="product-image-hit" href={`/product/${product.slug}`} aria-label={`View ${product.name}`} />
      {showWishlist && <button className={`wishlist ${saved ? 'is-saved' : ''}`} type="button" aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} ${saved ? 'from' : 'to'} wishlist`} aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? '♥' : '♡'}</button>}
    </div>
    <div className="product-info">
      <a className="product-link" href={`/product/${product.slug}`}>
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>
      </a>
      <div className="product-card-row">
        <div><p className="price">{money(product.price)}</p><span className="product-tax-note">USD · VAT included</span></div>
        <button className={`add-btn ${added ? 'is-added' : ''}`} type="button" onClick={addToBag}>{added ? 'Added' : 'Add to bag'}<span aria-hidden="true">{added ? '✓' : '+'}</span></button>
      </div>
    </div>
  </article>
}
