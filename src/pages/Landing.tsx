import React from 'react';
import {
  AddressSection,
  ContactForm,
  MainHero,
  MainMenu,
  MenuSection,
} from '../components';
import { useTranslation } from 'react-i18next';

const Landing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-center gap-y-24 flex-col items-center  pb-8">
      <MainHero />
      <MainMenu />
      <MenuSection />
      <AddressSection />
      <ContactForm title={t('contactUsRoute')} destination="contact" />
    </div>
  );
};

export default Landing;
