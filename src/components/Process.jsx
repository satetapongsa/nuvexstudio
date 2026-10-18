import { useLang } from '../i18n/LangContext.jsx';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function Process() {
  const { t } = useLang();
  const p = t.process;

  return (
    <section id="process" className="section">
      <div className="container">
        <SectionHead index="03" label={p.label} title={p.title} intro={p.intro} />
        <ol className="process">
          {p.steps.map((s, i) => (
            <Reveal as="li" key={i} className="step" delay={i * 80}>
              <span className="step__when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
