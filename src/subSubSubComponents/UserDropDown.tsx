import React from 'react';
import userImg from '../assets/svg/header/user.svg';
import { profileLinks } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logOutImg from '../assets/svg/profile/logOut.svg';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { logOut, logoutUser } from '../features/user/userSlice';
import { clearAddress } from '../features/address/addressSlice';
const UserDropDown: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theLogOut = async () => {
    await dispatch(logOut({ token: user.token, language }));
    await dispatch(clearAddress());
    await dispatch(logoutUser());
    window.location.reload();
    navigate('/');
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        aria-label="menu"
        role="button"
        className="rounded-badge 2xl:rounded-full aspect-square flex items-center justify-center w-10 2xl:w-14 bg-white cursor-pointer"
      >
        <img src={userImg} alt="" className="w-5 h-5 2xl:w-6 2xl:h-6" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white rounded-box gap-y-2 last:pt-2 z-[1] w-52 2xl:w-72 p-2 shadow"
      >
        {profileLinks.map((li) => {
          return (
            <Link
              key={li.id}
              to={li.to}
              className="flex justify-start items-center gap-x-4 2xl:gap-x-8"
            >
              <img src={li.img} alt="img" className="2xl:w-7" />
              <p className="2xl:text-xl">{t(li.text)}</p>
            </Link>
          );
        })}
        <button
          onClick={theLogOut}
          className="flex justify-start items-center gap-x-4 2xl:gap-x-8"
        >
          <img
            src={logOutImg}
            alt="img"
            className={`2xl:w-7 ${
              isLangArabic ? '' : 'transform scale-x-[-1]'
            }`}
          />
          <p className="2xl:text-xl">{t('signOut')}</p>
        </button>
      </ul>
    </div>
  );
};

export default UserDropDown;
