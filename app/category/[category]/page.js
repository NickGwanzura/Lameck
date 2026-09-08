import CollectionPage from '../../components/CollectionPage'
import { notFound } from 'next/navigation'

const categories = ['refrigerators', 'freezers', 'tv', 'phones', 'solar']

export async function generateStaticParams() {
  return ['refrigerators', 'freezers', 'tv', 'phones', 'solar'].map((category) => ({ category }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  return { title: `${category === 'tv' ? 'TV' : category[0].toUpperCase() + category.slice(1)} — South Grant` }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  if (!categories.includes(category)) notFound()
  return <CollectionPage type={category} />
}
