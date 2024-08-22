import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { CartDrawer, UserDropDown } from '../subSubSubComponents';
import { RootState, useTypedSelector } from '../store';
import { Link } from 'react-router-dom';
import userImg from '../assets/svg/header/user.svg';

const NavBarButtons: React.FC = () => {
  const { toggleLang, isLangArabic } = useGlobalContext();

  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;

  return (
    <div className="gap-x-3 hidden lg:flex justify-between items-center w-[10%] ">
      <CartDrawer />

      <button
        onClick={toggleLang}
        className=" font-abdo aspect-square rounded-badge 2xl:rounded-full flex items-center justify-center w-10 2xl:w-14 2xl:text-xl bg-white"
      >
        {isLangArabic ? 'EN' : 'AR'}
      </button>
      {token ? (
        <UserDropDown />
      ) : (
        <Link
          to="/login"
          className="rounded-badge 2xl:rounded-full aspect-square flex items-center justify-center w-10 2xl:w-14 bg-white my-2"
        >
          <img src={userImg} alt="" className="w-5 h-5 2xl:w-6 2xl:h-6" />
        </Link>
      )}
    </div>
  );
};

export default NavBarButtons;
