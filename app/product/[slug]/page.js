'use client'
import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { useCart } from '../../components/CartContext'

const products = {
  'elise-90-range-cooker': { slug:'elise-90-range-cooker', brand:'AGA', name:'Elise 90 Range Cooker', price:'$4,890', image:'image-oven', description:'A beautifully capable range cooker designed to become the heart of the kitchen.', details:['90cm width','Five gas burners','Two ovens + grill','Two year warranty'] },
  'haven-lounge-chair': { slug:'haven-lounge-chair', brand:'South Grant Atelier', name:'Haven Lounge Chair', price:'$1,240', image:'image-chair', description:'Deep comfort and quiet character, upholstered in a durable natural weave.', details:['Solid oak frame','Natural linen blend','Hand finished','Made to order'] },
  '50s-style-refrigerator': { slug:'50s-style-refrigerator', brand:'Smeg', name:"50's Style Refrigerator", price:'$2,190', image:'image-fridge', description:'Iconic soft curves and generous everyday storage in a considered finish.', details:['Energy class D','326 litre capacity','MultiFlow cooling','Two year warranty'] },
  'bok-extendable-table': { slug:'bok-extendable-table', brand:'Ethnicraft', name:'Bok Extendable Table', price:'$2,895', image:'image-table', description:'An architectural dining table with a light silhouette and room to grow.', details:['Solid oak','Seats 6–10','Natural oil finish','Designed in Belgium'] },
  'pureline-oven': { slug:'pureline-oven', brand:'Miele', name:'PureLine Oven', price:'$3,490', image:'image-oven', description:'A refined built-in oven with precise control for everyday cooking.', details:['76 litre capacity','Multi-step cooking','Soft-close door','Two year warranty'] },
  'pure-induction-hob': { slug:'pure-induction-hob', brand:'Bora', name:'Pure Induction Hob', price:'$2,790', image:'image-fridge', description:'Quiet induction cooking with a clean surface and intuitive controls.', details:['Four cooking zones','Integrated extractor','Touch control','Two year warranty'] },
  'outline-sofa': { slug:'outline-sofa', brand:'Muuto', name:'Outline Sofa', price:'$3,890', image:'image-chair', description:'A tailored sofa with generous comfort and a calm, architectural profile.', details:['Three-seat design','Durable wool blend','Powder-coated steel legs','Made to order'] },
  'desert-lounge-chair': { slug:'desert-lounge-chair', brand:'Ferm Living', name:'Desert Lounge Chair', price:'$690', image:'image-chair', description:'A relaxed, foldable lounge chair for quiet corners indoors or out.', details:['Powder-coated steel','Recycled textile','Foldable frame','Indoor or outdoor use'] },
}

export default function ProductPage({ params }) {
  const { slug } = use(params)
  const [added,setAdded]=useState(false); const { addItem } = useCart()
  const product = products[slug]
  if (!product) notFound()
  function addToBag() { addItem(product); setAdded(true) }
  return <><SiteHeader /><main className="product-detail"><div className={`detail-image product-image ${product.image}`} role="img" aria-label={product.name}/><div className="detail-copy"><a className="back-link" href="/collections">← Back to shop</a><p className="kicker">{product.brand}</p><h1>{product.name}</h1><p className="detail-price">{product.price}</p><p className="detail-description">{product.description}</p><button className="button button-dark detail-add" onClick={addToBag}>{added ? 'Added to bag ✓' : 'Add to bag'}</button><div className="specs">{product.details.map(detail=><div key={detail}><span>—</span>{detail}</div>)}</div><p className="delivery-note">Complimentary white glove delivery on orders over $2,000.</p></div></main><SiteFooter /></>
}
