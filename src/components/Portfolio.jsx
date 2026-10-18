import { useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';

const filterKeys = ['all', 'corp', 'shop', 'app'];

// Simple wireframe thumbnail; the layout varies by project category.
function Thumb({ cat }) {
  return (
    <div className={`thumb thumb--${cat}`} aria-hidden="true">
      <div className="thumb__bar"><i /><i /><i /></div>
      <div className="thumb__body">
        <span className="thumb__h" />
        <span className="thumb__p" />
        <div className="thumb__grid"><span /><span /><span /><span /></div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLang();
  const w = t.work;
  const [active, setActive] = useState('all');
  const list = active === 'all' ? w.items : w.items.filter((p) => p.cat === active);

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead index="02" label={w.label} title={w.title} intro={w.intro} />
        <div className="filters" role="group">
          {filterKeys.map((k) => (
            <button key={k} aria-pressed={active === k} onClick={() => setActive(k)}>
              {w.filters[k]}
            </button>
          ))}
        </div>
        <div className="works">
          {list.map((p) => (
            <article key={`${active}-${p.title}`} className="work">
              <div className="work__preview"><Thumb cat={p.cat} /></div>
              <div className="work__info">
                <div className="work__meta">
                  <span>{w.filters[p.cat]}</span>
                  <span>{p.year}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="work__tags">
                  {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
