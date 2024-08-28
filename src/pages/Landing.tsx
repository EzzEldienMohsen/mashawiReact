import React from 'react';
import {
  ContactForm,
  MainAddressSection,
  MainHero,
  MainMenu,
  MenuSection,
} from '../components';
import { useTranslation } from 'react-i18next';

const Landing: React.FC = () => {
  const { t } = useTranslation();
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="w-full flex justify-center gap-y-24 flex-col items-center  pb-8">
      <MainHero />
      <MainMenu />
      <MenuSection />
      <MainAddressSection />
      <ContactForm
        title={t('contactUsRoute')}
        destination="contact"
        isJob={false}
      />
    </div>
  );
};

export default Landing;
