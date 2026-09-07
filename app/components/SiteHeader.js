'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CartButton from './CartButton'

export default function SiteHeader({ active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const submitSearch = (event) => {
    event.preventDefault()
    router.push(`/collections${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
    setSearchOpen(false)
  }

  return <>
    <div className="announcement"><span>Complimentary white glove delivery on orders over $2,000</span><a href="/about">Learn more&nbsp;↗</a></div>
    <header className="site-header casora-header"><nav className="nav container">
      <a className="brand logo-wrap" href="/" aria-label="South Grant home"><img src="/southgrant-logo.png" alt="South Grant" /></a>
      <button className={`mobile-menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <ul className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
        <li><a className={active === 'home' ? 'active' : ''} href="/">New arrivals</a></li>
        <li className="nav-menu-dropdown"><button className={menuOpen ? 'active' : ''} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Shop <span>⌄</span></button></li>
        <li><a className={active === 'collections' ? 'active' : ''} href="/collections">Collections</a></li>
        <li><a className={active === 'inspiration' ? 'active' : ''} href="/inspiration">Inspiration</a></li>
        <li><a className={active === 'about' ? 'active' : ''} href="/about">About</a></li>
      </ul>
      <div className="nav-tools"><button className="header-icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}><span aria-hidden="true">⌕</span><small>Search</small></button><a className="header-icon header-wishlist" href="/collections" aria-label="Wishlist"><span aria-hidden="true">♡</span><small>Wishlist</small></a><CartButton /></div>
    </nav>{searchOpen && <form className="header-search" onSubmit={submitSearch}><label htmlFor="site-search">Search South Grant</label><input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search appliances, furniture…" /><button type="submit" aria-label="Submit search">↗</button></form>}{menuOpen && <div className="mega-menu"><div className="container mega-menu-grid"><div><p className="mega-kicker">Shop South Grant</p><h2>Considered pieces for every room.</h2><p>Discover enduring appliances and furniture chosen for modern Zimbabwean homes.</p><a className="text-link" href="/collections">View all collections ↗</a></div><div><p className="mega-kicker">Departments</p><a href="/appliances">Appliances <span>↗</span></a><a href="/furniture">Furniture <span>↗</span></a><a href="/collections">New arrivals <span>↗</span></a><a href="/inspiration">Journal &amp; guides <span>↗</span></a></div><div className="mega-feature"><div className="mega-feature-image" /><div><strong>For the spaces you call home</strong><span>Explore the edit&nbsp;↗</span></div></div></div></div>}</header>
  </>
}
