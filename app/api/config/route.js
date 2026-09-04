import { NextResponse } from 'next/server'
import config from '../../../data/store-config.json'
export async function GET() { return NextResponse.json(config) }
