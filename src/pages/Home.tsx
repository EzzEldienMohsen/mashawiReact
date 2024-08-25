import React from 'react';
import { Footer, Header } from '../components';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './../context/GlobalContext';

const Home: React.FC = () => {
  const { isLangArabic } = useGlobalContext();

  return (
    <div
      className="bg-[#F8F8F8] font-abdo flex flex-col gap-y-10 relative w-full m-0 p-0"
      dir={isLangArabic ? 'rtl' : 'ltr'}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
