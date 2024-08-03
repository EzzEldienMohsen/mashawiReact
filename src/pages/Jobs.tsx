import React from 'react'
import {ContactForm, SidePageHero} from '../components';
import img from "../assets/صورة التوظيف.png"
import { useTranslation } from 'react-i18next';
const Jobs:React.FC = () => {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <SidePageHero
        img={img}
        primaryText={t('jobsTitle')}
        secondaryText={t('jobsText')}
        isJob={true}
      />
      <ContactForm title={t('contactFormTitle')} />
    </div>
  );
}

export default Jobs