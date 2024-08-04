import React from 'react';
import userImg from '../assets/svg/header/user.svg';
import { profileLinks } from '../assets';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserDropDown: React.FC = () => {
  const {t} = useTranslation()
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
      </ul>
    </div>
  );
};

export default UserDropDown;
