import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';

import { myOrders } from '../assets';
import { useTranslation } from 'react-i18next';

const Orders:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="my-4 w-full flex flex-col px-8 lg:px-20 justify-center items-center">
      {myOrders.map((order) => {
        return (
          <div
            key={order.id}
            className="flex flex-col rounded-2xl justify-center items-center my-4 bg-white px-4 py-2 relative gap-y-4 lg:flex-row w-4/5 lg:justify-start lg:px-2 lg:gap-x-6"
          >
            <button className="absolute top-2 left-2">
              <img src={theClose} alt="alt" />
            </button>
            <img src={order.img} alt="alt" />
            <div className="flex flex-col justify-center gap-y-6 items-center lg:justify-start">
              <div className="flex flex-col justify-center gap-y-4 items-center lg:flex-row lg:gap-x-5 lg:justify-between">
                <p className="text-newRed">{t(order.title)}</p>
                <p className="text-newRed">{t(order.price)}</p>
                <p>{order.date}</p>
              </div>
              <p className="text-center">{order.address}</p>
              <button className="btn py-2  my-2 px-4 rounded-full bg-newRed text-white ">
                إعادة الطلب مرة اخرى
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
