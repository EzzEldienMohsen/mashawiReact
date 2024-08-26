import React, { useState } from 'react';
import { AddOn as AddOnInterface } from '../assets/types';
import { useTranslation } from 'react-i18next';
import fallbackImage from '../assets/svg/imageGuard.svg';

interface AddOnProps {
  addOn: AddOnInterface;
  onAddOnChange: (
    addOn: AddOnInterface,
    selectedValues: { id: number; name: string; price: string }[]
  ) => void;
}

const AddOn: React.FC<AddOnProps> = ({ addOn, onAddOnChange }) => {
  const [selectedValues, setSelectedValues] = useState<
    { id: number; name: string; price: string }[]
  >([]);
  const { t } = useTranslation();

  const handleAddOnCheckboxChange = (
    value: { id: number; name: string; price?: string },
    isChecked: boolean
  ) => {
    const newValue = {
      ...value,
      price: value.price ?? '0.00', // Provide a default value if price is undefined
    };

    setSelectedValues((prevSelected) =>
      isChecked
        ? [...prevSelected, newValue]
        : prevSelected.filter((v) => v.id !== value.id)
    );
  };

  React.useEffect(() => {
    onAddOnChange(addOn, selectedValues);
  }, [selectedValues]);
  function formatPrice(price: string | undefined): string {
    if (price === undefined) {
      return '0.00'; // or any default value you'd like
    }
    const numericPrice = parseFloat(price);
    return numericPrice.toFixed(2);
  }
  return (
    <div className="bg-bgColor flex flex-col w-full items-start gap-y-3 py-2 lg:py-4 px-2 md:px-4 my-1 rounded-lg">
      <div className="flex gap-x-4 md:gap-x-3 w-full items-center  2xl:gap-x-4">
        <img
          src={addOn.icon}
          alt="alt"
          className="w-5 h-5 lg:w-10 lg:h-10 object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
            e.currentTarget.classList.add('h-full', 'object-cover');
          }}
        />
        <h1 className="font-semibold text-[10px] md:text-sm lg:text-xl font-abdo">
          {addOn.name}
        </h1>
      </div>
      {addOn.values.map((value) => (
        <div key={value.id} className="flex items-center gap-x-2 mt-2">
          <label className="flex gap-x-2 lg:gap-x-4 items-center justify-start text-thin font-abdo text-[10px] md:text-sm lg:text-xl 2xl:text-3xl relative">
            <input
              type="checkbox"
              checked={selectedValues.some((v) => v.id === value.id)}
              onChange={(e) =>
                handleAddOnCheckboxChange(value, e.target.checked)
              }
              className="h-4 w-4 lg:h-6 lg:w-6 2xl:w-8 2xl:h-8 appearance-none border-2 border-black rounded-sm bg-white checked:border-newRed focus:outline-none"
            />
            {/* Custom checkbox with thin red checkmark */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 2xl:w-8 2xl:h-8 pointer-events-none text-newRed ${
                selectedValues.some((v) => v.id === value.id)
                  ? 'block'
                  : 'hidden'
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
            {value.name}
          </span>
          {parseInt(value.price || '0') > 0 && (
            <span className="font-semibold text-[10px] md:text-sm lg:text-xl font-abdo">
              {formatPrice(value.price)} {t('menuItemCurrency')}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddOn;
