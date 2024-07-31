import React from 'react';
import icon from '../assets/svg/header/logout.svg';
import { navBarLinks } from '../assets';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import logo from '../assets/svg/logo.svg';
import HeaderButtons from './HeaderButtons';
import { SecondaryDrawer, SecondaryDropDown } from '../subSubComponents';

const SmallNavBar:React.FC = () => {
  const { isLangArabic, toggleLang } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <ul
      className={` gap-y-3 md:gap-y-2 px-7 flex flex-col justify-start items-center ${
        isLangArabic ? 'rounded-l-3xl ' : 'rounded-r-3xl '
      } font-abdo w-60 z-20 text-[#ffffff] md:w-80 p-4 bg-[#564440] `}
    >
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="rounded-full w-10 h-10 md:w-24 md:h-24 my-2"
        />
      </Link>
      <HeaderButtons isTrue={true} />
      <ul className="flex flex-col justify-start items-start pb-2 gap-y-1 w-full mt-1 border-b-2 white">
        {navBarLinks.map((li, index) => {
          if (index === 1) {
            return (
              <SecondaryDrawer
                li={li}
                key={t(li.text)}
                drawerId={`drawer_id=${index}`}
              />
            );
          } else if (index === 9) {
            return <SecondaryDropDown li={li} key={t(li.text)} />;
          } else if (index === navBarLinks.length - 1) {
            return (
              <button
                key={t(li.text)}
                className="w-full flex justify-between"
                onClick={toggleLang}
              >
                <li className="my-2 text-md md:text-sm hover:text-newRed">
                  {t(li.text)}
                </li>
                <img
                  src={li.img}
                  alt="img"
                  className={isLangArabic ? '' : 'transform scale-x-[-1]'}
                />
              </button>
            );
          } else if (li.img) {
            return (
              <Link
                key={t(li.text)}
                to={li.to}
                className="w-full flex justify-between"
              >
                <li className="my-2 text-md md:text-sm hover:text-newRed">
                  {t(li.text)}
                </li>
                <img
                  src={li.img}
                  alt="img"
                  className={isLangArabic ? '' : 'transform scale-x-[-1]'}
                />
              </Link>
            );
          } else {
            return (
              <Link key={t(li.text)} to={li.to}>
                <li className="my-2 text-md md:text-sm hover:text-newRed">
                  {t(li.text)}
                </li>
              </Link>
            );
          }
        })}
      </ul>
      <button className="flex justify-start w-full items-center gap-x-4 font-abdo text-white py-2">
        <img
          src={icon}
          alt="alt"
          className={isLangArabic ? '' : 'transform scale-x-[-1]'}
        />
        <p className="text-md md:text-sm hover:text-newRed">{t('signOut')}</p>
      </button>
    </ul>
  );
};

export default SmallNavBar;
