import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';
import { editQuantity, editQuantityLocally } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../assets/types';
import { DrawerAmountInput } from '../subSubSubComponents';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';

interface CartCardProps {
  item: CartItem;
  removeItemsFromCart: (cart: CartItem, cart_id: number) => void;
  cart_id: number;
  isLoading: boolean;
}

const CartCard: React.FC<CartCardProps> = ({
  item,
  removeItemsFromCart,
  cart_id,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  const dispatch: AppDispatch = useDispatch();

  const [amount, setAmount] = React.useState<number>(item.amount);
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  React.useEffect(() => {
    setAmount(item.amount);
  }, [item.amount]);
  const editQuantityOfItem = (qty: number) => {
    // First, update the local state and quantity
    setAmount(qty);

    // Dispatch the local and async quantity updates
    dispatch(editQuantityLocally({ cartID: item.id, qty }));
    dispatch(editQuantity({ reqData: { qty }, cart_id, token, language, t }));
  };

  return (
    <div className="flex bg-white w-full rounded-2xl relative justify-start items-start pt-4 pb-2 px-2 my-2 gap-x-8 ">
      <button
        className={`absolute top-2 ${isLangArabic ? 'left-2' : 'right-2'} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => removeItemsFromCart(item, cart_id)}
      >
        <img src={theClose} alt="alt" className={` `} />
      </button>
      <img
        src={item.image}
        alt="alt"
        className={`w-1/5 aspect-square ${
          isLangArabic
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        }`}
      />
      <div className="flex flex-col w-4/5 justify-center items-start gap-y-4">
        <h1>{item.name}</h1>
        <p className="text-newRed font-abdo flex flex-row gap-x-1">
          <span>{item.price}</span>
          <span>{t('menuItemCurrency')}</span>
        </p>
        <div className="flex flex-col justify-start items-start gap-y-4 md:flex-row md:justify-between md:items-center w-full">
          <div className="font-abdo text-sm w-full gap-y-1 flex-col md:w-3/5 flex justify-center items-start">
            {item.additions.map((addOn) => (
              <div
                key={addOn.id}
                className="w-full text-[#7E7E7E] flex justify-between items-evenly text-xs "
              >
                <p className="text-xs w-1/3 font-abdo">
                  {addOn.values[0].name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex md:flex-col justify-between gap-x-1 md:items-end md:justify-end gap-y-3 w-auto">
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

export default CartCard;
