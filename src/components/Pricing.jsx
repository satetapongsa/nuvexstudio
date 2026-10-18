import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHead index="04" label={p.label} title={p.title} intro={p.intro} />
        <Reveal className="pricing">
          {p.plans.map((plan) => (
            <article key={plan.name} className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
              <div className="plan__head">
                <h3>{plan.name}</h3>
                {plan.featured && <span className="plan__flag">{p.flag}</span>}
              </div>
              <p className="plan__desc">{plan.desc}</p>
              <div className="plan__price">
                {plan.price ? <><small>{p.from}</small>{plan.price}</> : <><small>&nbsp;</small>{p.custom}</>}
              </div>
              <a href="#contact" className={`btn ${plan.featured ? 'btn--primary' : 'btn--line'} btn--block`}>
                {plan.price ? p.choose : p.quote}
              </a>
              <ul>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </Reveal>
        <p className="pricing__note">{p.note}</p>
      </div>
    </section>
  );
}
