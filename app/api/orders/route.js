import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
const productsFile = path.join(process.cwd(), 'data/products.json'); const ordersFile = path.join(process.cwd(), 'data/orders.json')
export async function GET() { return NextResponse.json({ orders: JSON.parse(await fs.readFile(ordersFile, 'utf8')) }) }
export async function POST(request) {
  const input = await request.json(); if (!Array.isArray(input.items) || !input.items.length) return NextResponse.json({ error: 'Order requires items.' }, { status: 400 })
  const products = JSON.parse(await fs.readFile(productsFile, 'utf8')); const lines = input.items.map((item) => { const p = products.find((x) => x.id === item.productId); const qty = Math.max(1, Number(item.qty || 1)); if (!p || p.inventory < qty) throw new Error(`Unavailable product: ${item.productId}`); return { productId: p.id, name: p.name, qty, unitPrice: p.price, amount: p.price * qty } })
  const orders = JSON.parse(await fs.readFile(ordersFile, 'utf8')); const order = { id: `order_${Date.now()}`, status: 'pending_payment', currency: 'USD', items: lines, total: lines.reduce((sum, l) => sum + l.amount, 0), customer: input.customer || {}, createdAt: new Date().toISOString() }; orders.push(order); await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2)); return NextResponse.json(order, { status: 201 })
}
