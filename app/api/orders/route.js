import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getDb } from '../../../lib/db'
import config from '../../../data/store-config.json'
const productsFile = path.join(process.cwd(), 'data/products.json'); const ordersFile = path.join(process.cwd(), 'data/orders.json')
export async function GET() { const db=getDb(); if(db){const r=await db.query('SELECT id,status,currency,total,customer,items,created_at AS "createdAt" FROM orders ORDER BY created_at DESC'); return NextResponse.json({orders:r.rows})}; return NextResponse.json({ orders: JSON.parse(await fs.readFile(ordersFile, 'utf8')) }) }
export async function POST(request) {
  const input = await request.json(); if (!Array.isArray(input.items) || !input.items.length) return NextResponse.json({ error: 'Order requires items.' }, { status: 400 })
  const products = JSON.parse(await fs.readFile(productsFile, 'utf8')); const lines = input.items.map((item) => { const p = products.find((x) => x.id === item.productId); const qty = Math.max(1, Number(item.qty || 1)); if (!p || p.inventory < qty) throw new Error(`Unavailable product: ${item.productId}`); return { productId: p.id, name: p.name, qty, unitPrice: p.price, amount: p.price * qty } })
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0); const delivery = Number(config.delivery[input.customer?.city] || config.delivery['Other Zimbabwe']); const vat = Number(((subtotal + delivery) * config.vatRate).toFixed(2)); const order = { id: `order_${Date.now()}`, status: 'pending_payment', currency: 'USD', items: lines, subtotal, delivery, vat, vatRate: config.vatRate, total: subtotal + delivery + vat, customer: input.customer || {}, createdAt: new Date().toISOString() }; const db=getDb(); if(db){await db.query('INSERT INTO orders (id,status,currency,total,customer,items) VALUES ($1,$2,$3,$4,$5,$6)',[order.id,order.status,order.currency,order.total,JSON.stringify(order.customer),JSON.stringify(order.items)]); return NextResponse.json(order,{status:201})}; const orders = JSON.parse(await fs.readFile(ordersFile, 'utf8')); orders.push(order); await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2)); return NextResponse.json(order, { status: 201 })
}
