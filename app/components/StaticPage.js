import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function StaticPage({ eyebrow, title, copy }) {
  return <><SiteHeader /><main className="simple-page"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{copy}</p><a className="button button-dark" href="/">Return home ↗</a></main><SiteFooter /></>
}
