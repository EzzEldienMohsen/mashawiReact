import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddOn as AddOnInterface } from '../assets/types';

interface AddOnProps {
  addOn: AddOnInterface;
  onAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
  onRemoveAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOn: React.FC<AddOnProps> = ({ addOn, onAddOnChange, onRemoveAddOnChange }) => {
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
    <div className="bg-bgColor flex justify-between flex-row gap-x-2 items-center py-2 my-2 rounded-xl">
      <div className="flex gap-x-2 flex-row justify-start items-center text-start">
        <img src={addOn.img} alt="alt" />
        <h1 className="text-xs">{t(addOn.name)}</h1>
      </div>
      <div className="gap-x-2 text-xs flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleAddOnChange}
          />
          {t(addOn.text1)} (+{addOn.price} {t(addOn.currency)})
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isRemoveChecked}
            onChange={handleRemoveAddOnChange}
          />
          {t(addOn.text2)}
        </label>
      </div>
    </div>
  );
};

export default AddOn;
