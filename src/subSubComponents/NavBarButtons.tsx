import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { CartDrawer, UserDropDown } from '../subSubSubComponents';
import { RootState, useTypedSelector } from '../store';
import { Link } from 'react-router-dom';
import userImg from '../assets/svg/header/user.svg';

const NavBarButtons: React.FC = () => {
  const { toggleLang, isLangArabic } = useGlobalContext();
  const { isSidebarOpen } = useTypedSelector((state: RootState) => state.user);
  const [localSidebarOpen, setLocalSidebarOpen] =
    React.useState<boolean>(isSidebarOpen);

  React.useEffect(() => {
    setLocalSidebarOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="gap-x-2 flex justify-between items-center">
      <CartDrawer />

      <button
        onClick={toggleLang}
        className="rounded-badge font-abdo aspect-square flex items-center justify-center w-10 bg-white"
      >
        {isLangArabic ? 'EN' : 'AR'}
      </button>
      {localSidebarOpen ? (
        <UserDropDown />
      ) : (
        <Link
          to="/login"
          className="rounded-badge aspect-square flex items-center justify-center w-10 bg-white my-2"
        >
          <img src={userImg} alt="" className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export default NavBarButtons;
