import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import logo from '../assets/svg/logo.svg';
import { myProfileLinks } from '../assets';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface SmallDrawerProps {
  drawerId: string;
  closeDrawer: (drawerId: string) => void;
}
const SecondaryDrawerContent: React.FC<SmallDrawerProps> = ({
  drawerId,
  closeDrawer,
}) => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <ul
      className={`h-full p-4 bg-[#564440] w-4/5 gap-y-3 md:gap-y-2 px-7 flex flex-col justify-start items-center ${
        isLangArabic ? 'rounded-l-3xl' : 'rounded-r-3xl'
      } font-abdo  text-[#ffffff] `}
    >
      <Link
        to="/"
        onClick={() => {
          closeDrawer(drawerId);
        }}
      >
        <img
          src={logo}
          alt="logo"
          className="rounded-full w-10 h-10 md:w-24 md:h-24 my-2"
        />
      </Link>
      <ul className="flex flex-col justify-start items-start gap-y-1 w-full border-t-1 border-white pt-1">
        {myProfileLinks.map((li) => {
          return (
            <Link
              key={t(li.text)}
              to={li.to}
              onClick={() => {
                closeDrawer(drawerId);
              }}
            >
              <li className="my-2 text-md md:text-sm hover:text-newRed">
                {t(li.text)}
              </li>
            </Link>
          );
        })}
      </ul>
    </ul>
  );
};

export default SecondaryDrawerContent;
