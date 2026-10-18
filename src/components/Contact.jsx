import { useState } from 'react';
import site from '../siteConfig.js';
import { useLang } from '../i18n/LangContext.jsx';
import Reveal from './Reveal.jsx';

const empty = { name: '', company: '', phone: '', email: '', service: 0, budget: 4, message: '' };

// Set VITE_FORM_ENDPOINT in .env (e.g. a Formspree URL) to deliver submissions.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

function Chips({ options, value, onChange, label }) {
  return (
    <div className="chips" role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button
          type="button"
          key={i}
          role="radio"
          aria-checked={value === i}
          onClick={() => onChange(i)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const f = c.fields;
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const payload = { ...form, service: c.services[form.service], budget: c.budgets[form.budget], lang };
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(res.statusText);
      } else {
        await new Promise((r) => setTimeout(r, 700));
        console.info('Contact form (no VITE_FORM_ENDPOINT set):', payload);
      }
      setStatus('success');
      setForm(empty);
    } catch {
      setStatus('error');
    }
  };

  const details = [
    [c.details.phone, site.phone, site.phoneHref],
    [c.details.email, site.email, `mailto:${site.email}`],
    [c.details.line, site.line, site.lineUrl],
    [c.details.address, lang === 'th' ? site.addressTh : site.address],
    [c.details.hours, lang === 'th' ? site.hoursTh : site.hours],
  ];

  const req = <em className="field__req">{f.required}</em>;

  return (
    <section id="contact" className="section">
      <div className="container contact">
        <Reveal className="contact__intro">
          <div className="shead__label"><b>07</b> / {c.label}</div>
          <h2>{c.title}</h2>
          <p>{c.intro}</p>
          <ul className="contact__list">
            {details.map(([k, v, href]) => (
              <li key={k}>
                <span>{k}</span>
                {href ? <a href={href}>{v}</a> : <strong>{v}</strong>}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <form className="form" onSubmit={submit}>
            {status === 'success' ? (
              <div className="form__success" role="status">
                <span className="form__check">✓</span>
                <h3>{c.successTitle}</h3>
                <p>{c.successText}</p>
                <button type="button" className="btn btn--line" onClick={() => setStatus('idle')}>{c.again}</button>
              </div>
            ) : (
              <>
                <div className="form__grid">
                  <label className="field">
                    <span>{f.name} {req}</span>
                    <input name="name" required value={form.name} onChange={update} placeholder={c.placeholders.name} autoComplete="name" />
                  </label>
                  <label className="field">
                    <span>{f.company} <em>{f.optional}</em></span>
                    <input name="company" value={form.company} onChange={update} placeholder={c.placeholders.company} autoComplete="organization" />
                  </label>
                  <label className="field">
                    <span>{f.phone} {req}</span>
                    <input name="phone" type="tel" required pattern="[0-9+\-\s]{9,15}" value={form.phone} onChange={update} placeholder={c.placeholders.phone} autoComplete="tel" />
                  </label>
                  <label className="field">
                    <span>{f.email} {req}</span>
                    <input name="email" type="email" required value={form.email} onChange={update} placeholder={c.placeholders.email} autoComplete="email" />
                  </label>
                  <div className="field field--full">
                    <span>{f.service}</span>
                    <Chips label={f.service} options={c.services} value={form.service} onChange={(i) => setForm({ ...form, service: i })} />
                  </div>
                  <div className="field field--full">
                    <span>{f.budget}</span>
                    <Chips label={f.budget} options={c.budgets} value={form.budget} onChange={(i) => setForm({ ...form, budget: i })} />
                  </div>
                  <label className="field field--full">
                    <span>{f.message} {req}</span>
                    <textarea name="message" required rows="5" value={form.message} onChange={update} placeholder={c.placeholders.message} />
                  </label>
                </div>
                {status === 'error' && <p className="form__error">{c.error} {site.phone}</p>}
                <button className="btn btn--primary btn--block" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? c.sending : <>{c.submit} <span className="arrow">→</span></>}
                </button>
                <p className="form__note">{c.note}</p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
