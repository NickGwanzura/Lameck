'use client'

import { useState } from 'react'

const DEMO_EMAIL = 'admin@southgrant.co.zw'
const DEMO_PASSWORD = '1'
const LEGACY_PASSWORD = 'SouthGrantDemo2026!'

export default function AdminLogin() {
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim().toLowerCase()
    const password = String(form.get('password') || '')

    if (email === DEMO_EMAIL && (password === DEMO_PASSWORD || password === LEGACY_PASSWORD)) {
      document.cookie = 'sg_admin=demo; Max-Age=86400; Path=/; SameSite=Lax'
      window.location.assign('/admin')
      return
    }

    setError('Use the demo email and password shown above.')
  }

  return <main className="simple-page admin-login-page">
    <p className="kicker">South Grant / Admin</p>
    <h1>Sign in</h1>
    <p>Use the demo credentials below to open store control.</p>
    <div className="demo-credentials"><span>Email</span><strong>{DEMO_EMAIL}</strong><span>Password</span><strong>{DEMO_PASSWORD}</strong></div>
    <form className="contact-form" onSubmit={submit}>
      <label htmlFor="admin-email">Email</label><input id="admin-email" name="email" type="email" autoComplete="username" required />
      <label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required />
      <button className="button button-dark" type="submit">Sign in</button>
      {error && <p className="form-status error" role="alert">{error}</p>}
    </form>
  </main>
}
