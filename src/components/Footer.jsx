import site from '../siteConfig.js';
import { useLang } from '../i18n/LangContext.jsx';
import { Logo } from './Navbar.jsx';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{t.footer.tagline}</p>
          </div>
          <nav className="footer__nav">
            {t.nav.links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a href="#contact">{t.contact.label}</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© {year} {site.name}. {t.footer.rights}</span>
          <span className="footer__links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href="#">{t.footer.privacy}</a>
            <a href="#top">{t.footer.top}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
