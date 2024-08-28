import React from 'react';
import { Menu, Pagination, SidePageHero } from '../components';
import img from '../assets/صورة قائمة الطعام.png';
import { useTranslation } from 'react-i18next';
const MenuList: React.FC = () => {
  const { t } = useTranslation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      <SidePageHero
        img={img}
        primaryText={t('mealTitle')}
        secondaryText={t('menuPageText')}
      />
      <Menu />
      <Pagination />
    </div>
  );
};

export default MenuList;
