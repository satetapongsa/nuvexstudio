import { createContext, useContext, useEffect, useState } from 'react';
import en from './en.js';
import th from './th.js';

const dicts = { en, th };
const STORAGE_KEY = 'nuvex-lang';
const LangContext = createContext(null);

// English is the default; a visitor's own choice is remembered for next time.
function initialLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'th' ? 'th' : 'en';
  } catch {
    return 'en';
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dicts[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
