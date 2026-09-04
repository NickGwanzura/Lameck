import { NextResponse } from 'next/server'
import { getDb } from '../../../lib/db'
export async function POST() {
  const db = getDb(); if (!db) return NextResponse.json({ error: 'DATABASE_URL is not configured.' }, { status: 503 })
  await db.query(`CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY, slug text UNIQUE NOT NULL, name text NOT NULL, brand text, category text NOT NULL, price numeric NOT NULL, currency text NOT NULL DEFAULT 'USD', inventory integer NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'active', created_at timestamptz NOT NULL DEFAULT now()); CREATE TABLE IF NOT EXISTS orders (id text PRIMARY KEY, status text NOT NULL, currency text NOT NULL DEFAULT 'USD', total numeric NOT NULL, customer jsonb NOT NULL DEFAULT '{}'::jsonb, items jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());`)
  return NextResponse.json({ ok: true, message: 'South Grant database schema is ready.' })
}
