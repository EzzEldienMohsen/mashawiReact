import React from 'react';
import addOrder from '../assets/svg/menu/addOrder.svg';
import theClose from '../assets/svg/closeBtn.svg';
import { addItem, removeAddOns } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AddOn, CartItem } from '../assets/types';
import { AmountInput } from '../subSubSubComponents';
import { AppDispatch } from '../store';

interface CartCardProps {
  item: CartItem;
  removeItemsFromCart: (cart: CartItem) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, removeItemsFromCart }) => {
  const { t } = useTranslation();
  const [removeAddOnsList, setRemoveAddOnsList] = React.useState<AddOn[]>([]);
  const [checkedAddOns, setCheckedAddOns] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [amount, setAmount] = React.useState<number>(item.amount || 0);
  const dispatch: AppDispatch = useDispatch();
  const cartProduct: CartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    currency: item.currency,
    img: item.img,
    amount: amount,
    addOns: [],
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

  const handleRemoveAddOnChange = (addOn: AddOn, isChecked: boolean): void => {
    setRemoveAddOnsList((prevRemoveAddOns) =>
      isChecked
        ? [...prevRemoveAddOns, addOn]
        : prevRemoveAddOns.filter((ao) => ao.id !== addOn.id)
    );
  };

  const handleCheckboxChange = (addOn: AddOn) => {
    const isChecked:boolean = !checkedAddOns[addOn.id];
    setCheckedAddOns((prev) => ({ ...prev, [addOn.id]: isChecked }));
    handleRemoveAddOnChange(addOn, isChecked);
  };

  return (
    <div className="flex bg-white w-full relative justify-start items-start pt-4 pb-2 px-2 my-2 gap-x-8 ">
      <button
        className="absolute top-2 left-2"
        onClick={() => removeItemsFromCart(item)}
      >
        <img src={theClose} alt="alt" />
      </button>
      <img src={item.img} alt="alt" className="w-1/5 aspect-square" />
      <div className="flex flex-col w-4/5 justify-center items-start gap-y-4">
        <h1>{t(item.name)}</h1>
        <p className="text-newRed flex flex-row gap-x-1">
          <span>{item.price}</span>
          <span>{t(item.currency)}</span>
        </p>
        <div className="flex flex-col justify-start items-start gap-y-4 md:flex-row md:justify-between md:items-center w-full">
          <div className="font-abdo text-sm w-full gap-y-1 flex-col md:w-3/5 flex justify-center items-start">
            {item.addOns.map((addOn) => {
              return (
                <div
                  key={addOn.id}
                  className="w-full text-[#7E7E7E] flex justify-between items-evenly text-xs "
                >
                  <p className="text-xs w-1/3">{t(addOn.name)}</p>
                  <div className="flex justify-start items-center gap-x-1 w-1/5">
                    <p className="text-xs">{addOn.price}</p>
                    <p className="text-xs">{t(addOn.currency)}</p>
                  </div>
                  <div className="flex justify-start items-center gap-x-1 w-1/2">
                    <input
                      type="checkbox"
                      checked={checkedAddOns[addOn.id] || false}
                      onChange={() => handleCheckboxChange(addOn)}
                    />
                    <p className="text-xs"> {t(addOn.text2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex md:flex-col justify-between gap-x-1    md:items-end md:justify-end gap-y-3 w-auto">
            <AmountInput amount={amount} setAmount={setAmount} />
            <button
              onClick={addItemToCart}
              className="btn bg-newRed text-white flex-row flex justify-between gap-x-[30px] items-center px-4 rounded-full py-2"
            >
              <img src={addOrder} alt="alt" />
              {t('addOnsText')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
