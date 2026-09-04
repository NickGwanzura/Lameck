import pg from 'pg'
const { Pool } = pg

let pool
export function getDb() {
  if (!process.env.DATABASE_URL) return null
  pool ||= new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }, max: 5 })
  return pool
}
