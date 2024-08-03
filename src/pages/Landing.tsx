import React from 'react'
import { AddressSection, ContactForm, Menu, MenuSection } from '../components';
import { useTranslation } from 'react-i18next';

const Landing : React.FC = () => {
  const {t} = useTranslation()
  return (
    <div className="w-full flex justify-center gap-y-24 flex-col items-center px-4 lg:px-20 py-8">
      <Menu />
      <MenuSection />
      <AddressSection />
      <ContactForm title={t('contactUsRoute')} />
    </div>
  );
}

export default Landing