import React from 'react';
import { FooterFirstColumn } from '../subComponents';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/header/whiteLogo.svg';
import { useTranslation } from 'react-i18next';
import { links } from '../assets';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-newRed text-white flex w-full flex-col justify-center lg:px-24 py-10 items-center lg:items-start ">
      <Link to="/">
        <img src={logo} alt="logo" className="2xl:w-20" />
      </Link>
      <div className="flex flex-col lg:flex-row w-full flex-wrap lg:justify-between   md:items-center ">
        <FooterFirstColumn />
        <ul className=" hidden lg:grid  lg:grid-cols-3  list-disc list-inside md:w-3/5 lg:w-[55%] mt-1">
          {links.map((li) => {
            return (
              <Link key={li.text} to={li.to}>
                <li className="my-1 ml-2 md:ml-1 text-xs font-abdo font-extralight md:text-xs lg:text-lg">
                  {t(li.text)}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 flex justify-center text-center  items-center w-full 2xl:text-lg py-4">
        {t('rights')}
      </div>
    </div>
  );
};

export default Footer;
