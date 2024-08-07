import React from 'react';
import { Card } from '../subSubComponents';
import { MealData } from '../assets/types';

const MenuCard: React.FC<{ data: MealData }> = ({ data }) => {
  return (
    <div className="my-8 flex flex-col justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-start lg:gap-x-5  lg:flex-wrap w-full">
      {data.map((data) => {
        return <Card data={data} key={data.id} />;
      })}
    </div>
  );
};

export default MenuCard;
