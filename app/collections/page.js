import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata = { title: 'Collections — South Grant' }

const collections = [
  ['Kitchen', 'Quietly capable', 'collection-kitchen', '/appliances'],
  ['Living', 'Made for gathering', 'collection-living', '/furniture'],
  ['Bedroom', 'A softer rhythm', 'collection-bedroom', '/furniture'],
]

export default function Collections() {
  return <><SiteHeader active="collections" /><main className="collections-page"><section className="page-hero"><div className="container"><p className="kicker">South Grant / Explore</p><h1>Collections</h1><p>Curated rooms and considered objects for a more intentional home.</p></div></section><section className="section"><div className="container collection-landing-grid">{collections.map(([name, copy, image, href]) => <a className={`collection-landing-card ${image}`} href={href} key={name}><span>{name}</span><small>{copy}</small><strong>Explore&nbsp;↗</strong></a>)}</div></section><section className="casora-highlight"><div className="highlight-image" /><div className="highlight-copy"><p className="kicker">Shop by room</p><h2>Everything in its place.</h2><p>Start with a room, then find the pieces that make it yours.</p><a className="button button-dark" href="/appliances">Shop appliances&nbsp;↗</a></div></section></main><SiteFooter /></>
}
