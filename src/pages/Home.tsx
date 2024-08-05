import React from 'react';
import { Footer, Header } from '../components';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './../context/GlobalContext';
import { AnimatePresence, motion } from 'framer-motion';

const Home:React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#DDDDDD] font-abdo flex flex-col gap-y-10 relative w-full m-0 p-0"
        dir={isLangArabic ? 'rtl' : 'ltr'}
      >
        <Header />
        <Outlet />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
