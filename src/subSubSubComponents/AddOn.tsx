import React, { useState } from 'react';
import { AddOn as AddOnInterface } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import fallbackImage from '../assets/svg/imageGuard.svg';

interface AddOnProps {
  addOn: AddOnInterface;
  onAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOn: React.FC<AddOnProps> = ({ addOn, onAddOnChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isLangArabic } = useGlobalContext();
  const handleAddOnCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
    onAddOnChange(addOn, isChecked);
  };

  const { t } = useTranslation();
  function formatPrice(price: number | string | undefined) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }
  return (
    <div className="bg-bgColor flex justify-start gap-x-4  w-full items-center py-2 px-4 my-1 rounded-lg">
      <div className="flex gap-x-3 w-1/5 2xl:w-1/4 items-center 2xl:gap-x-10">
        <img
          src={addOn.icon}
          alt="alt"
          className="w-12 h-12 2xl:w-20 2xl:h-20 object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
            e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
          }}
        />
        <h1 className="font-semibold text-xs 2xl:text-3xl font-abdo">
          {addOn.name}
        </h1>
      </div>
      <label className="flex gap-x-2 2xl:gap-x-6 items-center justify-start text-thin font-abdo text-xs 2xl:text-3xl w-1/2 relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleAddOnCheckboxChange(e.target.checked)}
          className={`h-4 w-4 2xl:w-8 2xl:h-8 appearance-none border-2 border-black rounded-sm bg-white checked:border-newRed focus:outline-none`}
        />
        <span>{addOn.values[0].name}</span>
        <span>
          {formatPrice(addOn.values[0].price)} {t('menuItemCurrency')}
        </span>

        {/* Custom checkbox with thin red checkmark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute ${
            isLangArabic ? 'left-[93.5%] 2xl:left-[92%]' : 'right-[94.5%%]'
          } top-0 w-4 h-4 2xl:w-8 2xl:h-8 pointer-events-none transform scale-90 text-newRed ${
            isChecked ? 'block' : 'hidden'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </label>
    </div>
  );
};

export default AddOn;
