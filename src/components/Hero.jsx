import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';

function Terminal({ lines }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) {
      const reset = setTimeout(() => setShown(0), 3600);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : 650);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal__bar">
        <i /><i /><i />
        <span className="terminal__title">zsh — client-site</span>
      </div>
      <div className="terminal__body">
        {lines.slice(0, shown).map(([type, text], i) => (
          <div key={i} className={`tline tline--${type}`}>{text}</div>
        ))}
        <span className="cursor" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__inner">
          <div>
            <p className="status"><span className="status__dot" />{h.status}</p>
            <h1>
              {h.titleA}
              <span className="accent">{h.titleB}</span>
            </h1>
            <p className="hero__sub">{h.sub}</p>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn--primary">{h.primary} <span className="arrow">→</span></a>
              <a href="#work" className="btn btn--line">{h.secondary}</a>
            </div>
          </div>
          <Terminal key={lang} lines={h.terminal} />
        </div>

        <dl className="facts">
          {h.facts.map(([k, v]) => (
            <div key={k} className="fact">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
