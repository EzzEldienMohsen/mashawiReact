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
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theLogOut = async () => {
    await dispatch(logOut(user.token));
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
        className="rounded-badge aspect-square flex items-center justify-center  w-10 bg-white my-2"
      >
        <img src={userImg} alt="" className="w-5 h-5" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white rounded-box gap-y-2 last:pt-2 z-[1] w-52 p-2 shadow"
      >
        {profileLinks.map((li) => {
          return (
            <Link
              key={li.id}
              to={li.to}
              className="flex justify-start items-center gap-x-4"
            >
              <img src={li.img} alt="img" />
              <p>{t(li.text)}</p>
            </Link>
          );
        })}
        <button
          onClick={theLogOut}
          className="flex justify-start items-center gap-x-4"
        >
          <img
            src={logOutImg}
            alt="img"
            className={`${isLangArabic ? '' : 'transform scale-x-[-1]'}`}
          />
          <p>{t('signOut')}</p>
        </button>
      </ul>
    </div>
  );
};

export default UserDropDown;
