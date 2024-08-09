import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';
import { BigNavBar, HeaderButtons, SmallNavBar } from '../subComponents';
import icon from '../assets/svg/headerLogo.svg';
import { useGlobalContext } from '../context/GlobalContext';
const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { isLangArabic } = useGlobalContext();
  const closeDrawer = (): void => {
    const drawerCheckbox = document.getElementById(
      'small-nav-drawer'
    ) as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div
      className={`flex w-full z-20 flex-row ${
        pathname === '/' ? 'absolute top-0 left-0' : ''
      } justify-between items-center px-8 lg:px-20 py-2 bg-transparent`}
    >
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="rounded-full w-10 h-10 md:w-16 md:h-16 my-2"
        />
      </Link>
      <HeaderButtons />
      <BigNavBar />
      {/* Drawer Implementation */}
      <div className="drawer w-[32px]  lg:hidden">
        <input
          id="small-nav-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          {/* Drawer button */}
          <label htmlFor="small-nav-drawer" className="">
            <img
              src={icon}
              alt="menu"
              className={isLangArabic ? '' : 'transform scale-x-[-1]'}
            />
          </label>
        </div>
        <div className="drawer-side z-30">
          <label htmlFor="small-nav-drawer" className="drawer-overlay"></label>
          <SmallNavBar closeDrawer={closeDrawer} />
        </div>
      </div>
    </div>
  );
};

export default Header;
