import Reveal from './Reveal.jsx';

export default function SectionHead({ index, label, title, intro }) {
  return (
    <Reveal className="shead">
      <div className="shead__label">
        <b>{index}</b> / {label}
      </div>
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </Reveal>
  );
}
