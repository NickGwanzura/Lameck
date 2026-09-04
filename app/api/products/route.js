import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.join(process.cwd(), 'data/products.json')
export async function GET(request) {
  const { searchParams } = new URL(request.url); const q = (searchParams.get('q') || '').toLowerCase(); const category = searchParams.get('category')
  const products = JSON.parse(await fs.readFile(file, 'utf8')).filter((p) => (!category || p.category === category) && (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q)))
  return NextResponse.json({ products, currency: 'USD' })
}
export async function POST(request) {
  const product = await request.json(); const products = JSON.parse(await fs.readFile(file, 'utf8')); const created = { id: `prod_${Date.now()}`, currency: 'USD', status: 'active', inventory: 0, ...product }; products.push(created); await fs.writeFile(file, JSON.stringify(products, null, 2)); return NextResponse.json(created, { status: 201 })
}
