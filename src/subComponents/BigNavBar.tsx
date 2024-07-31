import React from 'react';
import { headerLinks } from '../assets';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { NavBarButtons } from '../subSubComponents';

const BigNavBar: React.FC = () => {
 const {t} = useTranslation()
  return (
    <ul className="hidden lg:flex gap-x-5 font-abdo justify-between items-center flex-row">
      {headerLinks.map((li) => {
        return (
          <Link key={li.text} to={li.to}>
            <li className=" text-sm hover:text-newRed">{t(li.text)}</li>
          </Link>
        );
      })}
     <NavBarButtons/>
    </ul>
  );
}


export default BigNavBar;
