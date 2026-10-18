import { useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHead index="06" label={t.faq.label} title={t.faq.title} />
        <Reveal className="faq">
          {t.faq.items.map(([q, a], i) => (
            <div key={i} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span>
                <span className="faq__icon" aria-hidden="true">+</span>
              </button>
              <div className="faq__a"><p>{a}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
