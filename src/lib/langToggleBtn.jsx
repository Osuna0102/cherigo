import { useLanguage } from "./languageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="fixed left-3/4 z-50 bg-[#fff6e1] font-[Dynapuff] text-[#eb8194] px-3 py-1 rounded shadow-md"
    >
      {language === 'en' ? '🇯🇵 日本語' : '🇺🇸 English'}
    </button>
  );
};

export default LanguageToggle;
