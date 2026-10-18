import { useEffect, useState } from 'react';
import site from '../siteConfig.js';
import { useLang } from '../i18n/LangContext.jsx';

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={site.name}>
      <span className="logo__mark" aria-hidden="true" />
      <span>{site.short}<span className="logo__sub">/studio</span></span>
    </a>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="group" aria-label="Language">
      {['en', 'th'].map((l) => (
        <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <Logo />
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {t.nav.links.map(([href, label]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a href="#contact" className="btn btn--primary nav__mobile-cta" onClick={close}>
            {t.nav.cta}
          </a>
        </nav>
        <div className="nav__right">
          <LangSwitch />
          <a href="#contact" className="btn btn--primary btn--sm nav__cta">{t.nav.cta}</a>
          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
