import React, { useState } from 'react';
import { AddOn as AddOnInterface } from '../assets/types';
import { useTranslation } from 'react-i18next';
import fallbackImage from '../assets/svg/imageGuard.svg';

interface AddOnProps {
  addOn: AddOnInterface;
  onAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOn: React.FC<AddOnProps> = ({ addOn, onAddOnChange }) => {
  const [isChecked, setIsChecked] = useState(false);
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
    <div className="bg-bgColor flex justify-between md:justify-start gap-x-4 w-full items-center py-2 lg:py-4 px-2 md:px-4 my-1 rounded-lg">
      <div className="flex gap-x-4 md:gap-x-3 w-1/5 2xl:w-1/4 items-center 2xl:gap-x-4">
        <img
          src={addOn.icon}
          alt="alt"
          className="w-5 h-5 lg:w-10 lg:h-10 object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
            e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
          }}
        />
        <h1 className="font-semibold text-[10px] md:text-sm lg:text-xl w-1/5 font-abdo">
          {addOn.name}
        </h1>
      </div>
      <label className="flex gap-x-2 lg:gap-x-4 2xl:gap-x-4 items-center justify-start text-thin font-abdo text-[10px] md:text-sm lg:text-xl 2xl:text-3xl relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleAddOnCheckboxChange(e.target.checked)}
          className={`h-4 w-4 lg:h-6 lg:w-6 2xl:w-8 2xl:h-8 appearance-none border-2 border-black rounded-sm bg-white checked:border-newRed focus:outline-none`}
        />

        {/* Custom checkbox with thin red checkmark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 2xl:w-8 2xl:h-8 pointer-events-none text-newRed ${
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
      <span className="font-semibold text-[10px] md:text-sm lg:text-xl font-abdo">
        {addOn.values[0].name}
      </span>
      <span className="font-semibold text-[10px] md:text-sm lg:text-xl font-abdo">
        {formatPrice(addOn.values[0].price)} {t('menuItemCurrency')}
      </span>
    </div>
  );
};

export default AddOn;
