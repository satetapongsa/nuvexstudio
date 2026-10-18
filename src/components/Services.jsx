import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead index="01" label={s.label} title={s.title} intro={s.intro} />
        <Reveal as="ol" className="services">
          {s.items.map((item, i) => (
            <li key={i} className="service">
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="service__tags">
                {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
