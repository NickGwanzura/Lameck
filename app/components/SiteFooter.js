export default function SiteFooter() {
  return <footer><div className="container footer-top"><a className="brand logo-wrap footer-logo" href="/"><img src="/southgrant-logo.png" alt="South Grant" /></a><p>Considered living for modern homes.</p><div className="footer-links"><a href="/collections">Shop</a><a href="/inspiration">Journal</a><a href="/about">Contact</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} South Grant</span><span>Delivery &amp; returns&nbsp;&nbsp; Privacy</span></div></footer>
}
