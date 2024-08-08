import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';
import { useTranslation } from 'react-i18next';
import addOrder from '../assets/svg/menu/addOrder.svg';
import { DrawerAmountInput } from '../subSubSubComponents';
import { AddOn, CartItem } from '../assets/types';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { addItem, removeAddOns, removeItem } from '../features/cart/cartSlice';

const DrawerCartCard: React.FC<{ item: CartItem }> = ({ item }) => {
  // State declaration
  const [removeAddOnsList, setRemoveAddOnsList] = React.useState<AddOn[]>([]);
  const [checkedAddOns, setCheckedAddOns] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [amount, setAmount] = React.useState<number>(item.amount || 0);
  //  Additional declaration
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  //    remove item from the cart
  const removeItemsFromCart = (prod: CartItem) => {
    dispatch(removeItem(prod));
  };
  // Changing order Amount
  const cartProduct: CartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    amount: amount,
    additions: [],
  };

  const addItemToCart = () => {
    dispatch(addItem({ product: cartProduct }));
    if (removeAddOnsList.length > 0) {
      dispatch(
        removeAddOns({
          cartID: item.id,
          addOnIDs: removeAddOnsList.map((ao) => ao.id),
        })
      );
    }
  };
  // Handling Add Ons removal
  const handleRemoveAddOnChange = (addOn: AddOn, isChecked: boolean): void => {
    setRemoveAddOnsList((prevRemoveAddOns) =>
      isChecked
        ? [...prevRemoveAddOns, addOn]
        : prevRemoveAddOns.filter((ao) => ao.id !== addOn.id)
    );
  };

  const handleCheckboxChange = (addOn: AddOn) => {
    const isChecked: boolean = !checkedAddOns[addOn.id];
    setCheckedAddOns((prev) => ({ ...prev, [addOn.id]: isChecked }));
    handleRemoveAddOnChange(addOn, isChecked);
  };
  return (
    <div className="flex w-full rounded-xl border-b-[2px]   justify-start items-start pt-4 pb-6 px-2 my-2 gap-x-2 ">
      <img src={item.image} alt="alt" className="w-1/5 aspect-square" />
      <div className="flex flex-col w-4/5 justify-center items-start gap-y-4">
        <div className="w-full flex justify-between items-center">
          <h1>{item.name}</h1>
          <button className="" onClick={() => removeItemsFromCart(item)}>
            <img src={theClose} alt="alt" />
          </button>
        </div>

        <div className="font-abdo text-sm w-full gap-y-1 flex-colflex justify-center items-start">
          {item.additions.map((addOn) => {
            return (
              <div
                key={addOn.id}
                className="w-full text-[#7E7E7E] flex justify-between items-evenly text-xs "
              >
                <p className="text-xs w-1/3">{addOn.name}</p>
                <div className="flex justify-start items-center gap-x-1 w-1/5"></div>
                <div className="flex justify-start items-center gap-x-1 w-1/2">
                  <input
                    type="checkbox"
                    checked={checkedAddOns[addOn.id] || false}
                    onChange={() => handleCheckboxChange(addOn)}
                  />
                  <p className="text-xs"> {addOn.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-y-4 flex-row justify-between items-center w-full">
          <p className="text-newRed flex flex-row gap-x-1">
            <span>{item.price}</span>
            <span>{t('menuItemCurrency')}</span>
          </p>
          <div className="flex  justify-between gap-x-5    w-auto">
            <DrawerAmountInput amount={amount} setAmount={setAmount} />
            <button
              onClick={addItemToCart}
              className="btn bg-newRed text-white flex-row flex justify-between items-center px-2 rounded-full py-[2px]"
            >
              <img src={addOrder} alt="alt" className="w-1/4" />
              <p className="text-xs">{t('addOnsText')}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerCartCard;
