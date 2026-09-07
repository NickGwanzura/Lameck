'use client'

import { useSearchParams } from 'next/navigation'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useCart } from '../components/CartContext'

const products = [
  ['AGA', 'Elise 90 Range Cooker', '$4,890', 'image-oven', 'appliances'],
  ['Smeg', "50's Style Refrigerator", '$2,190', 'image-fridge', 'appliances'],
  ['Miele', 'PureLine Oven', '$3,490', 'image-oven', 'appliances'],
  ['Bora', 'Pure Induction Hob', '$2,790', 'image-fridge', 'appliances'],
  ['South Grant Atelier', 'Haven Lounge Chair', '$1,240', 'image-chair', 'furniture'],
  ['Ethnicraft', 'Bok Extendable Table', '$2,895', 'image-table', 'furniture'],
  ['Muuto', 'Outline Sofa', '$3,890', 'image-chair', 'furniture'],
  ['Ferm Living', 'Desert Lounge Chair', '$690', 'image-chair', 'furniture'],
]

const slugFor = (name) => name.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const { addItem } = useCart()
  const results = products.filter(([brand, name, , , category]) => `${brand} ${name} ${category}`.toLowerCase().includes(query.toLowerCase()))

  return <><SiteHeader /><main><section className="page-hero"><div className="container"><p className="kicker">South Grant / Search</p><h1>{query ? `Results for “${query}”` : 'Search the collection'}</h1><p>{query ? `${results.length} ${results.length === 1 ? 'piece' : 'pieces'} found across appliances and furniture.` : 'Find considered appliances and furniture for every room.'}</p></div></section><section className="section section-stone"><div className="container">{results.length ? <div className="product-grid">{results.map(([brand, name, price, image], index) => <article className="product" key={name}><a className="product-link" href={`/product/${slugFor(name)}`}><div className={`product-image ${image}`}><span className="product-badge">{index % 2 === 0 ? 'New' : 'Featured'}</span></div><p className="product-brand">{brand}</p><h3>{name}</h3></a><div className="product-card-row"><p className="price">{price}</p><button className="add-btn" onClick={() => addItem({ slug: slugFor(name), name, brand, price, image })}>Quick add&nbsp;↗</button></div></article>)}</div> : <div className="empty-state search-empty"><h2>No pieces found.</h2><p>Try another search or browse the full collection.</p><a className="button button-dark" href="/collections">Browse collections&nbsp;↗</a></div>}</div></section></main><SiteFooter /></>
}
