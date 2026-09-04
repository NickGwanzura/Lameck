import { NextResponse } from 'next/server'
import { getDb } from '../../../lib/db'
import fs from 'node:fs/promises'
import path from 'node:path'
const fallback = path.join(process.cwd(), 'data/products.json')
export async function GET(request) {
  const { searchParams } = new URL(request.url); const q = (searchParams.get('q') || '').toLowerCase(); const category = searchParams.get('category'); const db = getDb()
  if (db) { const result = await db.query(`SELECT id,slug,name,brand,category,price::float, currency,inventory,status FROM products WHERE ($1='' OR category=$1) AND ($2='' OR lower(name||' '||coalesce(brand,'')) LIKE '%'||$2||'%') ORDER BY created_at DESC`, [category || '', q]); return NextResponse.json({ products: result.rows, currency: 'USD' }) }
  const products = JSON.parse(await fs.readFile(fallback, 'utf8')).filter((p) => (!category || p.category === category) && (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q))); return NextResponse.json({ products, currency: 'USD' })
}
export async function POST(request) {
  const p = await request.json(); const db = getDb(); if (!db) return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 503 }); const id = p.id || `prod_${Date.now()}`; const result = await db.query(`INSERT INTO products (id,slug,name,brand,category,price,currency,inventory,status) VALUES ($1,$2,$3,$4,$5,$6,'USD',$7,'active') RETURNING *`, [id,p.slug,p.name,p.brand || '',p.category,p.price,p.inventory || 0]); return NextResponse.json(result.rows[0], { status: 201 })
}
