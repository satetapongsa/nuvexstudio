import { useLang } from '../i18n/LangContext.jsx';

const tools = ['React', 'Next.js', 'Vue', 'Node.js', 'WordPress', 'Shopify', 'Laravel', 'Tailwind', 'Figma', 'Firebase'];

export default function TechStack() {
  const { t } = useLang();
  return (
    <div className="stack">
      <div className="container stack__inner">
        <span className="stack__label">{t.stack.label}</span>
        <ul>
          {tools.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </div>
  );
}
