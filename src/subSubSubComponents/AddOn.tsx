import React, { useState } from 'react';
import { AddOn as AddOnInterface } from '../assets/types';

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

  return (
    <div className="bg-bgColor flex justify-between w-full items-center py-2 px-4 my-1 rounded-lg shadow-md">
      <div className="flex gap-x-3 w-1/3 items-center">
        <img
          src={addOn.icon}
          alt="alt"
          className="w-12 h-12 object-cover rounded-full"
        />
        <h1 className="font-semibold text-xs font-abdo">{addOn.name}</h1>
      </div>
      <label className="flex gap-x-4 items-center justify-start text-thin font-abdo text-xs w-1/2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleAddOnCheckboxChange(e.target.checked)}
          className="h-4 w-4"
        />
        <span>{addOn.values[0].name}</span>
      </label>
    </div>
  );
};

export default AddOn;
