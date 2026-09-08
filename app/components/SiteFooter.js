'use client'

import { useState } from 'react'

export default function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return <footer className="casora-footer"><div className="footer-newsletter container"><div><p className="kicker">The South Grant</p><h2>Thoughtful pieces, delivered to your inbox.</h2><p>New products, room guides, and considered offers. No noise.</p></div><form onSubmit={subscribe}>{subscribed ? <p className="footer-subscription-success" role="status">You’re on the list. Thank you.</p> : <><label htmlFor="footer-email">Email address</label><div className="footer-email-row"><input id="footer-email" name="email" type="email" required placeholder="you@example.com" /><button className="button button-dark" type="submit">Subscribe&nbsp;↗</button></div></>}</form></div><div className="container footer-grid"><div><a className="brand logo-wrap footer-logo" href="/"><img src="/southgrant-logo.png" alt="South Grant" /></a><p className="footer-note">Considered technology and home essentials for Zimbabwe.</p></div><div><p className="footer-heading">Shop</p><a href="/category/refrigerators">Refrigerators</a><a href="/category/freezers">Freezers</a><a href="/category/tv">TV</a><a href="/category/phones">Phones</a><a href="/category/solar">Solar</a></div><div><p className="footer-heading">Support</p><a href="/about">About South Grant</a><a href="/inspiration">Inspiration</a><a href="/cart">Delivery &amp; returns</a></div><div><p className="footer-heading">Contact</p><p>Harare, Zimbabwe</p><p>USD pricing · 15.5% VAT</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} South Grant</span><span>Delivery &amp; returns&nbsp;&nbsp; Privacy</span></div></footer>
}
