'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function CartButton() {
  const { itemCount } = useCart()
  return <Link className="icon-btn" href="/cart" aria-label={`Shopping bag, ${itemCount} items`}>
    Bag <sup>{itemCount}</sup>
  </Link>
}
