import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { CartDrawer, UserDropDown } from '../subSubSubComponents';
import { RootState, useTypedSelector } from '../store';
import { Link } from 'react-router-dom';
import loginIcon from '../assets/svg/loginNavIcon.svg';

const NavBarButtons: React.FC = () => {
  const { toggleLang, isLangArabic } = useGlobalContext();

  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;

  return (
    <div className="gap-x-3 hidden lg:flex justify-between items-center lg:w-[13%] 2xl:w-[13%] ">
      <CartDrawer />

      <button
        onClick={toggleLang}
        className="rounded-badge text-lg text-black font-tajawal 2xl:rounded-full aspect-square flex items-center justify-center w-10 2xl:w-14 bg-white cursor-pointer"
      >
        {isLangArabic ? 'EN' : 'AR'}
      </button>
      {token ? (
        <UserDropDown />
      ) : (
        <Link
          to="/login"
          className="rounded-badge 2xl:rounded-full aspect-square flex items-center justify-center w-10 2xl:w-14 bg-white cursor-pointer"
        >
          <img src={loginIcon} alt="" className="w-5 h-5 2xl:w-6 2xl:h-6" />
        </Link>
      )}
    </div>
  );
};

export default NavBarButtons;
