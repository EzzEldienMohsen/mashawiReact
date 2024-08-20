import React, { useState } from 'react';
import { AddOn as AddOnInterface } from '../assets/types';
import defaultAddOn from '../assets/svg/defaultAddOn.svg';
import { useGlobalContext } from '../context/GlobalContext';

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

  function formatPrice(price: number | string | undefined) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }

  return (
    <div className="bg-bgColor flex justify-start gap-x-4 w-full items-center py-2 px-4 my-1 rounded-lg">
      <div className="flex gap-x-3 w-1/5 items-center">
        <img
          src={addOn.icon || defaultAddOn}
          alt="alt"
          className="w-12 h-12 object-cover rounded-full"
        />
        <h1 className="font-semibold text-xs font-abdo">{addOn.name}</h1>
      </div>
      <label className="flex gap-x-2 items-center justify-start text-thin font-abdo text-xs w-1/2 relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleAddOnCheckboxChange(e.target.checked)}
          className={`h-4 w-4 appearance-none border-2 border-black rounded-sm bg-white checked:border-newRed focus:outline-none`}
        />
        <span>{addOn.values[0].name}</span>
        <span>{formatPrice(addOn.values[0].price)}</span>

        {/* Custom checkbox with thin red checkmark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute ${
            isLangArabic ? 'left-[94.5%]' : 'right-[94.5%%]'
          } top-0 w-4 h-4 pointer-events-none transform scale-90 text-newRed ${
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
