import React from 'react';
import { useTranslation } from 'react-i18next';
import AddOn from './AddOn';
import { CartItem } from '../assets/types';
import { AddOn as AddOnInterface } from '../assets/types';
interface AddOnsProps{
    data:CartItem;
    handleAddOnChange:(addOn:AddOnInterface,isChecked:boolean)=> void
}
const AddOns : React.FC<AddOnsProps> = ({ data, handleAddOnChange }) => {
  const { addOns, id } = data;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="my-2">{t('addOnModalTitle')}</h1>
      {addOns.map((addOn: AddOnInterface) => (
        <AddOn key={addOn.id} addOn={addOn} onAddOnChange={handleAddOnChange} />
      ))}
    </div>
  );
};

export default AddOns;
