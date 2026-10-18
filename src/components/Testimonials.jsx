import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function Testimonials() {
  const { t } = useLang();
  const c = t.clients;

  return (
    <section className="section">
      <div className="container">
        <SectionHead index="05" label={c.label} title={c.title} />
        <div className="quotes">
          {c.items.map((q, i) => (
            <Reveal as="figure" key={i} className="quote" delay={i * 80}>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <strong>{q.name}</strong>
                <span>{q.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
