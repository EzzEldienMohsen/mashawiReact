import React from 'react';
import { useTranslation } from 'react-i18next';
import AddOn from './AddOn';
import { SingleMealData } from '../assets/types';
import { AddOn as AddOnInterface } from '../assets/types';

interface AddOnsProps {
  data: SingleMealData;
  handleAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
  handleRemoveAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOns: React.FC<AddOnsProps> = ({
  data,
  handleAddOnChange,
  handleRemoveAddOnChange,
}) => {
  const { additions } = data;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start items-start w-[55%]">
      <h1 className="my-2">{t('addOnModalTitle')}</h1>
      {additions.map((addOn: AddOnInterface) => (
        <AddOn
          key={addOn.id}
          addOn={addOn}
          onAddOnChange={handleAddOnChange}
          onRemoveAddOnChange={handleRemoveAddOnChange}
        />
      ))}
    </div>
  );
};

export default AddOns;
