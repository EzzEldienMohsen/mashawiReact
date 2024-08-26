import React from 'react';
import { Card } from '../subSubComponents';
import { MealData } from '../assets/types';
import { useTranslation } from 'react-i18next';

const MenuCard: React.FC<{ data: MealData }> = ({ data }) => {
  const { t } = useTranslation();
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center bg-white text-center w-full my-8 py-5 rounded-2xl shadow-md ">
        <h1 className="text-black font-abdo 2xl:text-xl font-light">
          {t('emptyCat')}
        </h1>
      </div>
    );
  }
  return (
    <div className="my-8 flex flex-col justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-start lg:gap-x-5 2xl:gap-x-10  lg:flex-wrap w-full">
      {data.map((data) => {
        return <Card data={data} key={data.id} />;
      })}
    </div>
  );
};

export default MenuCard;
