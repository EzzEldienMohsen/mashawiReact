import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import i18n from '../i18n';

interface GlobalContextProps {
  isLangArabic: boolean;
  toggleLang: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLangArabic, setIsLangArabic] = useState<boolean>(() => {
    const lang = localStorage.getItem('lang');
    return lang !== null ? JSON.parse(lang) : true;
  });

  useEffect(() => {
    const lang = isLangArabic ? 'ar' : 'en';
    i18n.changeLanguage(lang);
    document.documentElement.dir = isLangArabic ? 'rtl' : 'ltr';
  }, [isLangArabic]);

  const toggleLang = () => {
    setIsLangArabic((prev) => {
      const newLang = !prev;
      localStorage.setItem('lang', JSON.stringify(newLang));
      return newLang;
    });
  };

  return (
    <GlobalContext.Provider value={{ isLangArabic, toggleLang }}>
      {children}
    </GlobalContext.Provider>
  );
};
