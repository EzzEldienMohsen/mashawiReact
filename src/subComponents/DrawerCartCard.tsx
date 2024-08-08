import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';
import { useTranslation } from 'react-i18next';
import { DrawerAmountInput } from '../subSubSubComponents';
import { CartItem } from '../assets/types';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { editQuantityLocally, removeItem } from '../features/cart/cartSlice';

const DrawerCartCard: React.FC<{ item: CartItem }> = ({ item }) => {
  const [amount, setAmount] = React.useState<number>(item.amount || 0);
  //  Additional declaration
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  //    remove item from the cart
  const removeItemsFromCart = (prod: CartItem) => {
    dispatch(removeItem(prod));
  };
  // Changing order Amount

  const editQuantityOfItem = (qty: number) => {
    dispatch(editQuantityLocally({ cartID: item.id, qty }));
  };
  // Handling Add Ons removal

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
            <DrawerAmountInput
              editTheQuantity={editQuantityOfItem}
              amount={amount}
              setAmount={setAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerCartCard;
