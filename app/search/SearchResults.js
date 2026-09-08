'use client'

import { useSearchParams } from 'next/navigation'
import products from '../../data/products.json'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useCart } from '../components/CartContext'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const { addItem } = useCart()
  const results = products.filter((product) => `${product.brand} ${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()))

  return <><SiteHeader /><main><section className="page-hero"><div className="container"><p className="kicker">South Grant / Search</p><h1>{query ? `Results for “${query}”` : 'Search the collection'}</h1><p>{query ? `${results.length} ${results.length === 1 ? 'product' : 'products'} found across all categories.` : 'Find considered products for every room and routine.'}</p></div></section><section className="section section-stone"><div className="container">{results.length ? <div className="product-grid">{results.map((product, index) => <article className="product" key={product.id}><div className={`product-image ${product.image}`}><span className="product-badge">{index % 2 === 0 ? 'New' : 'Featured'}</span></div><a className="product-link" href={`/product/${product.slug}`}><p className="product-brand">{product.brand}</p><h3>{product.name}</h3></a><div className="product-card-row"><p className="price">${Number(product.price).toLocaleString('en-US')}</p><button className="add-btn" onClick={() => addItem(product)}>Quick add&nbsp;↗</button></div></article>)}</div> : <div className="empty-state search-empty"><h2>No products found.</h2><p>Try another search or browse all five categories.</p><a className="button button-dark" href="/collections">Browse categories&nbsp;↗</a></div>}</div></section></main><SiteFooter /></>
}
