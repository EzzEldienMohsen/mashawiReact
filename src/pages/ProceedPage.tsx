import React from 'react'
import { ProceedPageForm, Steps } from '../components';
import { useTranslation } from 'react-i18next';
import { proceed } from '../assets';

const ProceedPage:React.FC = () => {
    const {t} = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center w-full my-2">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('deliveredTitle')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-20 px-4 md:px-8 lg:px-20">
        <Steps tracker={proceed} />
        <ProceedPageForm/>
      </div>
    </div>
  );
}

export default ProceedPage