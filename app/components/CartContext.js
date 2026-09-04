'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'southgrant-cart'

function normaliseItem(item) {
  const parsedPrice = typeof item.price === 'string' ? item.price.replace(/[^0-9.-]/g, '') : item.price
  return {
    id: item.id || item.slug,
    slug: item.slug,
    name: item.name,
    brand: item.brand || '',
    price: Number(parsedPrice) || 0,
    image: item.image || '',
    quantity: Math.max(1, Number(item.quantity) || 1),
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved).map(normaliseItem))
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally { setHydrated(true) }
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem(item) {
      const next = normaliseItem(item)
      setItems((current) => {
        const found = current.find((entry) => entry.id === next.id)
        return found
          ? current.map((entry) => entry.id === next.id ? { ...entry, quantity: entry.quantity + next.quantity } : entry)
          : [...current, next]
      })
    },
    updateQuantity(id, quantity) {
      const nextQuantity = Number(quantity)
      setItems((current) => nextQuantity > 0
        ? current.map((entry) => entry.id === id ? { ...entry, quantity: nextQuantity } : entry)
        : current.filter((entry) => entry.id !== id))
    },
    removeItem(id) {
      setItems((current) => current.filter((entry) => entry.id !== id))
    },
    clearCart() {
      setItems([])
    },
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
