import React from 'react';
// import { MenuCard, SectionTitle, Slider } from '../subComponents';
import { useTranslation } from 'react-i18next';
import MenuCard from '../subComponents/MenuCard';

const Menu :React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center flex-col">
      {/* <SectionTitle title={t('menuSectionTitle')} />
      <Slider /> */}
      <MenuCard />
    </div>
  );
};

export default Menu;
