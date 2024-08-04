import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from './../context/GlobalContext';
import { privacyLinks } from '../assets';
import { Link } from 'react-router-dom';
import { Link as TheLink } from '../assets/types';

const SecondaryDropDown: React.FC<{ li: TheLink }> = ({ li }) => {
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  return (
    <div
      className={`dropdown-top  dropdown-right dropdown w-full `}
    >
      <div tabIndex={0} role="button" className="w-full flex justify-between">
        <li className="my-2 text-md md:text-sm hover:text-newRed">
          {t(li.text)}
        </li>
        <img
          src={li.img}
          alt="img"
          className={isLangArabic ? '' : 'transform scale-x-[-1]'}
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content w-4/5 mx-4 menu bg-[#564440]  flex flex-col justify-center items-start gap-y-1  font-abdo  text-[#ffffff]   rounded-box z-[1]  p-2 shadow"
      >
        {privacyLinks.map((li) => {
          return (
            <Link key={t(li.text)} to={li.to}>
              <li className="my-2 text-xs hover:text-newRed">
                {t(li.text)}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SecondaryDropDown;
