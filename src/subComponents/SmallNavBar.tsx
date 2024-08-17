import React from 'react';
import icon from '../assets/svg/header/logout.svg';
import loginIcon from '../assets/svg/loginIcon.svg';
import { navBarLinks } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import logo from '../assets/svg/logo.svg';
import HeaderButtons from './HeaderButtons';
import { SecondaryDrawer, SecondaryDropDown } from '../subSubComponents';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { logOut, logoutUser } from '../features/user/userSlice';
import { clearAddress } from '../features/address/addressSlice';
interface CloseDrawer {
  closeDrawer: () => void;
}
const SmallNavBar: React.FC<CloseDrawer> = ({ closeDrawer }) => {
  const { isLangArabic, toggleLang } = useGlobalContext();
  const { t } = useTranslation();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const theLogOut = async () => {
    await dispatch(logOut(user.token));
    await dispatch(clearAddress());
    await dispatch(logoutUser());
    window.location.reload();
    navigate('/');
  };
  const closeSmallDrawer = (drawerId: string): void => {
    const drawerCheckbox = document.getElementById(
      drawerId
    ) as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <ul
      className={`min-h-full gap-y-5 md:gap-y-2 px-7 flex flex-col justify-start items-center ${
        isLangArabic ? 'rounded-l-3xl ' : 'rounded-r-3xl '
      } font-abdo w-60 z-20 text-[#ffffff] md:w-80 p-4 bg-[#564440] `}
    >
      <Link to="/">
        <img
          onClick={closeDrawer}
          src={logo}
          alt="logo"
          className="rounded-full w-16 h-16 md:w-24 md:h-24 my-2"
        />
      </Link>
      <HeaderButtons isTrue={true} />
      <ul className="flex flex-col justify-start items-start pb-2 gap-y-1 w-full mt-1 border-b-2 white">
        {navBarLinks.map((li, index) => {
          if (index === 1) {
            return token ? (
              <SecondaryDrawer
                li={li}
                key={t(li.text)}
                closeDrawer={closeSmallDrawer}
                drawerId={`drawer_id=${index}`}
              />
            ) : (
              // Your else case here, e.g., a fallback component or null
              <Link
                onClick={closeDrawer}
                key={t(li.text)}
                to="/login"
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
          } else if (index === 9) {
            return <SecondaryDropDown li={li} key={t(li.text)} />;
          } else if (index === navBarLinks.length - 1) {
            return (
              <button
                key={t(li.text)}
                className="w-full mb-2 flex justify-between items-center"
                onClick={() => {
                  toggleLang();
                  closeDrawer();
                }}
              >
                <li className=" text-md md:text-sm hover:text-newRed">
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
                onClick={closeDrawer}
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
              <Link onClick={closeDrawer} key={t(li.text)} to={li.to}>
                <li className="my-2 text-md md:text-sm hover:text-newRed">
                  {t(li.text)}
                </li>
              </Link>
            );
          }
        })}
      </ul>
      {token ? (
        <button
          onClick={() => {
            closeDrawer();
            theLogOut();
          }}
          className="flex justify-start w-full items-center gap-x-4 font-abdo text-white py-2"
        >
          <img
            src={icon}
            alt="alt"
            className={isLangArabic ? '' : 'transform scale-x-[-1]'}
          />
          <p className="text-md md:text-sm hover:text-newRed">{t('signOut')}</p>
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => {
            closeDrawer();
          }}
          className="flex justify-start w-full items-center gap-x-4 font-abdo text-white py-2"
        >
          <img
            src={loginIcon}
            alt="alt"
            className={isLangArabic ? '' : 'transform scale-x-[-1]'}
          />
          <p className="text-md md:text-sm hover:text-newRed">
            {t('signInTitle')}
          </p>
        </Link>
      )}
    </ul>
  );
};

export default SmallNavBar;
