import React from 'react';

import { menuItems } from './../assets/index';
import { Card } from '../subSubComponents';

const MenuCard:React.FC = () => {
  return (
    <div className="my-8 flex flex-col justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-center lg:gap-x-7  lg:flex-wrap w-full">
      {menuItems.map((data) => {
        return <Card data={data} key={data.id} />;
      })}
    </div>
  );
};

export default MenuCard;
