import CartButton from './CartButton'

export default function SiteHeader({ active = '' }) {
  return <>
    <div className="announcement">Complimentary white glove delivery on orders over $2,000</div>
    <header className="site-header"><nav className="nav container">
      <a className="brand logo-wrap" href="/" aria-label="South Grant home"><img src="/southgrant-logo.png" alt="South Grant" /></a>
      <ul className="nav-menu">
        <li><a className={active === 'home' ? 'active' : ''} href="/">New arrivals</a></li>
        <li><a className={active === 'appliances' ? 'active' : ''} href="/appliances">Appliances</a></li>
        <li><a className={active === 'furniture' ? 'active' : ''} href="/furniture">Furniture</a></li>
        <li><a className={active === 'collections' ? 'active' : ''} href="/collections">Collections</a></li>
        <li><a className={active === 'inspiration' ? 'active' : ''} href="/inspiration">Inspiration</a></li>
        <li><a className={active === 'about' ? 'active' : ''} href="/about">About</a></li>
      </ul>
      <div className="nav-tools"><button className="icon-btn" aria-label="Search">⌕</button><CartButton /></div>
    </nav></header>
  </>
}
