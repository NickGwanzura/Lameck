'use client'

import { useEffect, useState } from 'react'

const navItems = [
  ['products', 'Products & inventory'],
  ['orders', 'Orders'],
]

export default function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('products')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!document.cookie.includes('sg_admin=demo')) {
      window.location.href = '/admin/login'
      return
    }

    Promise.all([
      fetch('/api/products').then((response) => response.json()),
      fetch('/api/orders').then((response) => response.json()),
    ]).then(([productData, orderData]) => {
      setProducts(productData.products || [])
      setOrders(orderData.orders || [])
    }).finally(() => setLoading(false))
  }, [])

  function logout() {
    document.cookie = 'sg_admin=; Max-Age=0; Path=/; SameSite=Lax'
    window.location.href = '/admin/login'
  }

  const activeLabel = tab === 'products' ? 'Products & inventory' : 'Orders'

  return <main className="admin-shell">
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <a className="admin-sidebar-brand" href="/" aria-label="South Grant storefront"><img src="/southgrant-logo.png" alt="South Grant" /></a>
      <div className="admin-sidebar-title"><span>Store control</span><strong>South Grant</strong></div>
      <nav className="admin-sidebar-nav" aria-label="Store control sections">
        {navItems.map(([id, label]) => <button key={id} className={tab === id ? 'active' : ''} type="button" aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}><span className={`admin-nav-icon admin-nav-icon-${id}`} aria-hidden="true">{id === 'products' ? '▦' : '◷'}</span><span>{label}</span><small>{id === 'products' ? products.length : orders.length}</small></button>)}
      </nav>
      <div className="admin-sidebar-footer"><a href="/" className="admin-sidebar-link">View storefront <span aria-hidden="true">↗</span></a><button type="button" className="admin-sidebar-link" onClick={logout}>Sign out <span aria-hidden="true">↗</span></button></div>
    </aside>
    <section className="admin-main">
      <header className="admin-topbar"><div><p className="kicker">South Grant / Admin</p><h1>{activeLabel}</h1><p className="admin-subtitle">Manage the catalog, stock levels, and customer orders.</p></div><div className="admin-topbar-actions"><span className="admin-status"><i /> Demo store live</span><a className="admin-mobile-storefront" href="/">Storefront&nbsp;↗</a></div></header>
      <div className="admin-metrics"><div><span>Catalog</span><strong>{loading ? '—' : products.length}</strong><small>Products listed</small></div><div><span>Orders</span><strong>{loading ? '—' : orders.length}</strong><small>All order statuses</small></div><div><span>Currency</span><strong>USD</strong><small>15.5% VAT included</small></div></div>
      {tab === 'products' ? <section className="admin-panel" aria-labelledby="products-heading"><div className="admin-panel-heading"><div><p className="kicker">Live catalog</p><h2 id="products-heading">Products &amp; inventory</h2></div><span className="admin-panel-count">{products.length} items</span></div><div className="admin-table-wrap"><div className="admin-row admin-head"><span>Product</span><span>Category</span><span>Price</span><span>Inventory</span><span>Status</span></div>{products.map((product) => <div className="admin-row" key={product.id}><span><strong>{product.name}</strong><small>{product.brand}</small></span><span>{product.category}</span><span>${Number(product.price).toLocaleString()}</span><span>{product.inventory}</span><span className="status-pill">{product.status}</span></div>)}</div></section> : <section className="admin-panel" aria-labelledby="orders-heading"><div className="admin-panel-heading"><div><p className="kicker">Customer activity</p><h2 id="orders-heading">Orders</h2></div><span className="admin-panel-count">{orders.length} orders</span></div><div className="admin-table-wrap"><div className="admin-row admin-head"><span>Order</span><span>Customer</span><span>Total</span><span>Status</span></div>{orders.length ? orders.map((order) => <div className="admin-row admin-order-row" key={order.id}><span><strong>{order.id}</strong><small>{new Date(order.createdAt).toLocaleDateString()}</small></span><span>{order.customer?.email || 'Guest'}</span><span>${Number(order.total).toLocaleString()}</span><span className="status-pill">{order.status}</span></div>) : <p className="empty-state">No orders yet.</p>}</div></section>}
    </section>
  </main>
}
