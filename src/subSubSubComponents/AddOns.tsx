import React from 'react';
import { useTranslation } from 'react-i18next';
import AddOn from './AddOn';
import { SingleMealData } from '../assets/types';
import { AddOn as AddOnInterface } from '../assets/types';

interface AddOnsProps {
  data: SingleMealData;
  handleAddOnChange: (addOn: AddOnInterface, isChecked: boolean) => void;
}

const AddOns: React.FC<AddOnsProps> = ({ data, handleAddOnChange }) => {
  const { additions } = data;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start items-start gap-y-2 2xl:gap-y-5 w-full md:w-[58%]">
      <h1 className="my-2 font-abdo 2xl:text-3xl">{t('addOnModalTitle')}</h1>
      {additions.map((addOn: AddOnInterface) => (
        <AddOn key={addOn.id} addOn={addOn} onAddOnChange={handleAddOnChange} />
      ))}
    </div>
  );
};

export default AddOns;
