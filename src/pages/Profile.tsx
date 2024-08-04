import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Profile:React.FC = () => {
  const { t } = useTranslation();


  return (
    <div className="flex flex-col justify-center items-center w-full my-4 ">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('myProfileRoute')}
        </h1>
      </div>
      <div className="my-8  px-4 lg:px-20  flex flex-row justify-evenly items-center w-full">
      
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center w-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;
