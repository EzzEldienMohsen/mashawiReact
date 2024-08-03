import React from 'react';
import { AddressSection, SidePageHero } from '../components';
import img from '../assets/صورة فروعنا.png';
import { useTranslation } from 'react-i18next';
const Branches:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full ">
      <SidePageHero
        img={img}
        primaryText={t('branchesPageTitle')}
        secondaryText={t('branchesPageText')}
      />
      <AddressSection />
    </div>
  );
};

export default Branches;
