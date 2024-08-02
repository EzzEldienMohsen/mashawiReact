import React from 'react';

import { menuItems } from './../assets/index';
import { Card } from '../subSubComponents';

const MenuCard:React.FC = () => {
  return (
    <div className="my-8 flex flex-col justify-center items-center px-4 md:flex-row md:justify-evenly lg:justify-between md:flex-wrap w-full">
      {menuItems.map((data) => {
        return <Card data={data} key={data.id} />;
      })}
    </div>
  );
};

export default MenuCard;
