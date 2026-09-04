import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const payload = await request.json()
    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return NextResponse.json({ error: 'At least one item is required.' }, { status: 400 })
    }
    const items = payload.items.map((item) => ({
      itemCode: String(item.itemCode || item.slug || 'GENERIC'),
      qty: Math.max(1, Number(item.qty || 1)),
      unitPrice: Number(item.unitPrice || 0),
      amount: Number(item.amount || item.unitPrice || 0) * Math.max(1, Number(item.qty || 1)),
    }))
    const body = { currencyCodeString: 'USD', orderDate: new Date().toISOString().slice(0, 10), items, charges: [] }
    if (!process.env.VELOCITY_API_KEY) return NextResponse.json({ error: 'Velocity is not configured yet.', sandboxPayload: body }, { status: 503 })
    const response = await fetch('https://api.velocityafrica.net/sales-orders', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.VELOCITY_API_KEY }, body: JSON.stringify(body) })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch { return NextResponse.json({ error: 'Unable to create sales order.' }, { status: 500 }) }
}
