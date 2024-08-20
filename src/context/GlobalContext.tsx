import React, { createContext } from 'react';
import i18n from '../i18n';

interface GlobalContextProps {
  isLangArabic: boolean;
  toggleLang: () => void;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  theMap: string;
  setTheMap: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [amount, setAmount] = React.useState<number>(1);
  const [theMap, setTheMap] = React.useState<string>('');
  const [isLangArabic, setIsLangArabic] = React.useState<boolean>(() => {
    const lang = localStorage.getItem('lang');
    return lang !== null ? JSON.parse(lang) : true;
  });

  React.useEffect(() => {
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
    <GlobalContext.Provider
      value={{
        isLangArabic,
        toggleLang,
        amount,
        setAmount,
        theMap,
        setTheMap,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
