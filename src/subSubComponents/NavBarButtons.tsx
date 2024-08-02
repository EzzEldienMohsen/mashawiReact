import React from 'react';
import cartImg from '../assets/svg/header/cart.svg';
import userImg from '../assets/svg/header/user.svg';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { CartDrawer } from '../subSubSubComponents';

const NavBarButtons: React.FC = () => {
  const { toggleLang, isLangArabic } = useGlobalContext();

  return (
    <div className="gap-x-2 flex justify-between items-center">
      <Link
        to="/cart"
        className="rounded-badge aspect-square hidden lg:flex items-center justify-center  w-10 bg-white"
      >
        <img src={cartImg} alt="" className="w-5 h-5" />
      </Link>
      <CartDrawer/>
      <button
        onClick={toggleLang}
        className=" rounded-badge font-abdo aspect-square flex items-center justify-center  w-10 bg-white"
      >
        {isLangArabic ? 'EN' : 'AR'}
      </button>
      <Link
        to="/profile"
        className=" rounded-badge aspect-square flex items-center justify-center  w-10 bg-white"
      >
        <img src={userImg} alt="" className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default NavBarButtons;
