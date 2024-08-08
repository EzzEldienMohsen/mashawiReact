import React from 'react';
import { Menu, Pagination, SidePageHero } from '../components';
import img from '../assets/صورة قائمة الطعام.png';
import { useTranslation } from 'react-i18next';
const MenuList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center ">
      <SidePageHero
        img={img}
        primaryText={t('menuRoute')}
        secondaryText={t('menuPageText')}
      />
      <Menu />
      <Pagination />
    </div>
  );
};

export default MenuList;
