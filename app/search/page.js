import { Suspense } from 'react'
import SearchResults from './SearchResults'

export const metadata = { title: 'Search — South Grant' }

export default function SearchPage() {
  return <Suspense fallback={<main className="simple-page"><p className="kicker">South Grant / Search</p><h1>Search the collection</h1></main>}><SearchResults /></Suspense>
}
