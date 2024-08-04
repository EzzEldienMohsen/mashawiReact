import React from 'react';
import { AddressSection, ContactForm, Map, SidePageHero } from '../components';
import img from '../assets/صورة تواصل معنا.png';
import { useTranslation } from 'react-i18next';

const ContactUs:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <SidePageHero
        img={img}
        primaryText={t('contactUsRoute')}
        secondaryText={t('contactPageText')}
      />
      <AddressSection />
      <ContactForm title={t('contactUsRoute')} />
      <Map />
    </div>
  );
};

export default ContactUs;
