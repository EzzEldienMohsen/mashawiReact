import React from 'react';
import { Footer, Header } from '../components';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './../context/GlobalContext';
import { RootState, useTypedSelector } from '../store';

const Home: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  React.useEffect(() => {}, [token]);
  return (
    <div
      className="bg-[#f5f5f5] font-abdo flex flex-col gap-y-10 relative w-full m-0 p-0"
      dir={isLangArabic ? 'rtl' : 'ltr'}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
