'use client'

import { useState } from 'react'

export default function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return <footer className="casora-footer">
    <div className="footer-newsletter container">
      <div className="footer-newsletter-copy"><p className="kicker">South Grant journal</p><h2>A more considered home, in your inbox.</h2><p>New arrivals, practical buying guides, and thoughtful offers—sent occasionally.</p></div>
      <form onSubmit={subscribe}>{subscribed ? <p className="footer-subscription-success" role="status">You’re on the list. Thank you.</p> : <><label htmlFor="footer-email">Email address</label><div className="footer-email-row"><input id="footer-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /><button className="footer-submit" type="submit">Subscribe <span aria-hidden="true">↗</span></button></div><p className="footer-form-note">No noise. Unsubscribe at any time.</p></>}</form>
    </div>
    <div className="footer-directory">
      <div className="container footer-grid">
        <div className="footer-brand-column"><a className="brand logo-wrap footer-logo" href="/" aria-label="South Grant home"><img src="/southgrant-logo.png" alt="South Grant" /></a><p className="footer-note">Premium technology and home essentials, selected for life in Zimbabwe.</p><span className="footer-location">Harare · Zimbabwe</span></div>
        <nav aria-label="Shop"><p className="footer-heading">Shop</p><a href="/category/refrigerators">Refrigerators</a><a href="/category/freezers">Freezers</a><a href="/category/tv">TV</a><a href="/category/phones">Phones</a><a href="/category/solar">Solar</a></nav>
        <nav aria-label="Support"><p className="footer-heading">Support</p><a href="/about">About South Grant</a><a href="/inspiration">Inspiration</a><a href="/cart">Delivery &amp; returns</a><a href="/admin/login">Admin portal</a></nav>
        <div><p className="footer-heading">Store details</p><p>Prices shown in USD</p><p>15.5% VAT included</p><p>Delivery across Zimbabwe</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} South Grant</span><div><a href="/about">Privacy</a><a href="/cart">Delivery &amp; returns</a></div></div>
    </div>
  </footer>
}
