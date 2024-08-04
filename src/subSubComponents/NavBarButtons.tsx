import React from 'react';
import userImg from '../assets/svg/header/user.svg';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { CartDrawer, UserDropDown } from '../subSubSubComponents';

const NavBarButtons: React.FC = () => {
  const { toggleLang, isLangArabic } = useGlobalContext();

  return (
    <div className="gap-x-2 flex justify-between items-center">
      <CartDrawer />

      <button
        onClick={toggleLang}
        className=" rounded-badge font-abdo aspect-square flex items-center justify-center  w-10 bg-white"
      >
        {isLangArabic ? 'EN' : 'AR'}
      </button>
      <UserDropDown/>
    </div>
  );
}

export default NavBarButtons;
