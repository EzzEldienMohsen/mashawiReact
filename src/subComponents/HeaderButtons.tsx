import React from 'react';
import del from '../assets/svg/delivery.svg';
import order from '../assets/svg/order.svg';
import { useTranslation } from 'react-i18next';
const HeaderButtons: React.FC<{isTrue?:boolean}> = ({isTrue}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${
        isTrue ? 'flex flex-col md:flex-row gap-y-2 md:gap-y-0' : 'hidden lg:flex'
      } justify-between items-center `}
    >
      <button className="btn  rounded-3xl md:-mx-4 w-36 md:w-40 flex justify-center items-center bg-bgColor hover:bg-bgColor lg:px-6 hover:text-black  hover:border-none ">
        <p className=" mb-1 text-[10px]">{t('delButton')}</p>
        <img src={del} alt="logo" className="w-1/5" />
      </button>
      <button className="btn rounded-3xl md:-mx-4 w-36 md:w-44 border-0 flex justify-center items-center lg:px-3 hover:bg-newRed bg-newRed text-white hover:text-white">
        <p className=" text-[10px]">{t('resButton')}</p>
        <img src={order} alt="logo" className="w-[15%]" />
      </button>
    </div>
  );
}

export default HeaderButtons;
