import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata = { title: 'Collections — South Grant' }

const collections = [
  ['Refrigerators', 'Fresh food, beautifully kept', 'category-refrigerators', '/category/refrigerators'],
  ['Freezers', 'More room for what matters', 'category-freezers', '/category/freezers'],
  ['TV', 'A better way to watch', 'category-tv', '/category/tv'],
  ['Phones', 'Technology, made personal', 'category-phones', '/category/phones'],
  ['Solar', 'Power that stays with you', 'category-solar', '/category/solar'],
]

export default function Collections() {
  return <><SiteHeader active="collections" /><main className="collections-page"><section className="page-hero"><div className="container"><p className="kicker">South Grant / Shop</p><h1>Product categories</h1><p>Everyday technology, home essentials, and resilient energy solutions for Zimbabwean homes.</p></div></section><section className="section"><div className="container collection-landing-grid">{collections.map(([name, copy, image, href]) => <a className={`collection-landing-card ${image}`} href={href} key={name}><span>{name}</span><small>{copy}</small><strong>Shop 3 products&nbsp;↗</strong></a>)}</div></section><section className="casora-highlight"><div className="highlight-image" /><div className="highlight-copy"><p className="kicker">South Grant / Category edit</p><h2>Useful things, considered carefully.</h2><p>Explore three selected products in every category, all priced in USD with delivery across Zimbabwe.</p><a className="button button-dark" href="/category/refrigerators">Start with refrigerators&nbsp;↗</a></div></section></main><SiteFooter /></>
}
