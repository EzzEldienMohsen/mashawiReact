import React from 'react';
import { Footer, Header } from '../components';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './../context/GlobalContext';

const Home = () => {
  const { isLangArabic } = useGlobalContext();
  return (
    <div
      className="bg-[#DDDDDD] font-abdo relative w-full m-0 p-0"
      dir={isLangArabic ? 'rtl' : 'ltr'}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
