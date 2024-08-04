import React from 'react';
import { MenuCard, SectionTitle, Slider } from '../subComponents';
import { useTranslation } from 'react-i18next';

const Menu :React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center flex-col px-8 lg:px-20">
      <SectionTitle title={t('menuSectionTitle')} />
      <Slider />
      <MenuCard />
    </div>
  );
};

export default Menu;
