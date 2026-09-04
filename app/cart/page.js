'use client'

import { useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { useCart } from '../components/CartContext'

const money = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: 'Harare' })
  const [state, setState] = useState({ status: 'idle', message: '', order: null })
  const delivery = { Harare: 25, Bulawayo: 35, 'Other Zimbabwe': 50 }[customer.city] || 50
  const vat = Number(((subtotal + delivery) * 0.155).toFixed(2))
  const total = subtotal + delivery + vat

  async function submitOrder(event) {
    event.preventDefault()
    if (!items.length) return
    setState({ status: 'loading', message: 'Placing your order…', order: null })
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        items: items.map((item) => ({ productId: item.id, slug: item.slug, qty: item.quantity })), customer,
      }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'We could not place that order.')
      setState({ status: 'success', message: 'Order received', order: data })
      clearCart()
    } catch (error) {
      setState({ status: 'error', message: error.message, order: null })
    }
  }

  if (state.status === 'success') return <><SiteHeader /><main className="cart-page"><div className="cart-success"><p className="kicker">South Grant / Order confirmed</p><h1>Thank you for your order.</h1><p>We have received order <strong>{state.order.id}</strong> and will be in touch shortly with delivery details.</p><a className="button button-dark" href="/">Continue shopping ↗</a></div></main><SiteFooter /></>

  return <><SiteHeader /><main className="cart-page"><div className="container"><div className="page-hero cart-hero"><p className="kicker">South Grant / Your bag</p><h1>Your bag</h1><p>{items.length ? `${items.reduce((sum, item) => sum + item.quantity, 0)} item${items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? '' : 's'} ready for checkout.` : 'Your bag is currently empty.'}</p></div>{items.length ? <div className="cart-layout"><section className="cart-items" aria-label="Cart items">{items.map((item) => <article className="cart-item" key={item.id}><div className={`cart-item-image product-image ${item.image}`} /><div className="cart-item-copy"><p className="product-brand">{item.brand}</p><h2>{item.name}</h2><p>{money(item.price)}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button><button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button></div></div><strong>{money(item.price * item.quantity)}</strong></article>)}</section><form className="checkout-card" onSubmit={submitOrder}><p className="kicker">Checkout</p><h2>Delivery details</h2><label>Name<input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></label><label>Email<input required type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></label><label>Phone<input required value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></label><label>Address<input required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></label><label>City<select value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })}><option>Harare</option><option>Bulawayo</option><option>Other Zimbabwe</option></select></label><div className="order-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{money(delivery)}</strong></div><div><span>VAT (15.5%)</span><strong>{money(vat)}</strong></div><div className="order-total"><span>Total · USD</span><strong>{money(total)}</strong></div></div><button className="button button-dark" type="submit" disabled={state.status === 'loading'}>{state.status === 'loading' ? 'Placing order…' : 'Place order'}</button>{state.status === 'error' && <p className="checkout-error" role="alert">{state.message}</p>}</form></div> : <a className="button button-dark" href="/collections">Browse the collection ↗</a>}</div></main><SiteFooter /></>
}
