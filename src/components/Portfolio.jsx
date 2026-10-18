import { useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import projects from '../projects.js';
import SectionHead from './SectionHead.jsx';

const filterKeys = ['all', 'site', 'app', 'ai'];

export default function Portfolio() {
  const { t } = useLang();
  const w = t.work;
  const [active, setActive] = useState('all');
  const list = active === 'all' ? projects : projects.filter((p) => p.cat === active);

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
            <article key={`${active}-${p.id}`} className="work">
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="work__preview" aria-label={`${p.title} — ${w.demo}`}>
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" width="960" height="600" />
              </a>
              <div className="work__info">
                <div className="work__meta">
                  <span>{w.filters[p.cat]}</span>
                  <span>{p.year}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{w.items[p.id]}</p>
                <div className="work__tags">
                  {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div className="work__links">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">{w.demo} ↗</a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">{w.code} ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
