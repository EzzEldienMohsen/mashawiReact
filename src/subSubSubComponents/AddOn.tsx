import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddOn as AddOnInterface } from '../assets/types';

interface AddOnProps {
  addOn: AddOnInterface;
  onAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
  onRemoveAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOn: React.FC<AddOnProps> = ({
  addOn,
  onAddOnChange,
  onRemoveAddOnChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRemoveChecked, setIsRemoveChecked] = useState(false);
  const { t } = useTranslation();

  const handleAddOnChange = () => {
    setIsChecked(!isChecked);
    onAddOnChange(addOn, !isChecked);
  };

  const handleRemoveAddOnChange = () => {
    setIsRemoveChecked(!isRemoveChecked);
    onRemoveAddOnChange(addOn, !isRemoveChecked);
  };

  return (
    <div className="bg-bgColor flex justify-between w-full items-center py-2 px-4 my-1 rounded-lg shadow-md">
      <div className="flex gap-x-3 w-1/3 items-center">
        <img
          src={addOn.img}
          alt="alt"
          className="w-12 h-12 object-cover rounded-full"
        />
        <h1 className=" font-semibold text-xs font-abdo">{t(addOn.name)}</h1>
      </div>
      <div className="flex gap-x-2 items-center justify-start text-thin font-abdo text-xs w-1/4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleAddOnChange}
            className="h-4 w-4"
          />
          <span>
            {t(addOn.text1)} (+{addOn.price} {t(addOn.currency)})
          </span>
        </label>
      </div>
      <div className="flex gap-x-4 items-center justify-start text-thin font-abdo text-xs w-1/4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isRemoveChecked}
            onChange={handleRemoveAddOnChange}
            className="h-4 w-4"
          />
          <span>{t(addOn.text2)}</span>
        </label>
      </div>
    </div>
  );
};

export default AddOn;
