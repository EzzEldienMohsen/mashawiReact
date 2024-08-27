import React from 'react';
import { ContactForm, SidePageHero } from '../components';
import img from '../assets/صورة التوظيف.png';
import { useTranslation } from 'react-i18next';
const Jobs: React.FC = () => {
  const { t } = useTranslation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <SidePageHero
        img={img}
        primaryText={t('jobsTitle')}
        secondaryText={t('jobsText')}
        isJob={true}
      />
      <ContactForm
        title={t('contactFormTitle')}
        destination="job"
        isJob={true}
      />
    </div>
  );
};

export default Jobs;
