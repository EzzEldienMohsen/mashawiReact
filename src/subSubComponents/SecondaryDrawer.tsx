import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from '../assets/types';
import { SecondaryDrawerContent } from '../subSubSubComponents';

interface SecondDrawerInterface {
  li: Link;
  drawerId: string;
  closeDrawer: (drawerId: string) => void;
}

const SecondaryDrawer: React.FC<SecondDrawerInterface> = ({
  li,
  drawerId,
  closeDrawer,
}) => {
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  return (
    <div className="drawer w-full">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Drawer button */}
        <label
          htmlFor={drawerId}
          className="flex justify-between w-full cursor-pointer"
        >
          <li className="my-2 text-md md:text-sm hover:text-newRed">
            {t(li.text)}
          </li>
          <img
            src={li.img}
            alt="img"
            className={isLangArabic ? '' : 'transform scale-x-[-1]'}
          />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor={drawerId} className="drawer-overlay"></label>
        <SecondaryDrawerContent drawerId={drawerId} closeDrawer={closeDrawer} />
      </div>
    </div>
  );
};

export default SecondaryDrawer;
