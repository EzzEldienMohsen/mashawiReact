import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center w-full my-4 ">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('myProfileRoute')}
        </h1>
      </div>
      <div className="my-8  px-8 lg:px-20  flex flex-row justify-evenly items-center w-full"></div>
      <div className="flex flex-col justify-center items-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
