import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';
import { useTranslation } from 'react-i18next';
import { DrawerAmountInput } from '../subSubSubComponents';
import { CartItem } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import {
  editQuantity,
  editQuantityLocally,
  getCart,
  removeItem,
  removeMeal,
} from '../features/cart/cartSlice';
import { useGlobalContext } from '../context/GlobalContext';
import fallbackImage from '../assets/svg/imageGuard.svg';

const DrawerCartCard: React.FC<{ item: CartItem; cart_id: number }> = ({
  item,
  cart_id,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { isLangArabic, setAmount } = useGlobalContext();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  //  Additional declaration
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const removeItemsFromCart = async (prod: CartItem, cart_id: number) => {
    setIsLoading(true);
    await dispatch(removeMeal({ cart_id, token, language }));
    await dispatch(removeItem(prod));
    await dispatch(getCart({ token, language }));
    setIsLoading(false);
  };
  React.useEffect(() => {
    setAmount(() => item.amount);
  }, [item.amount, setAmount]);

  const editQuantityOfItem = (qty: number) => {
    // First, update the local state and quantity
    setAmount(qty);

    // Dispatch the local and async quantity updates
    dispatch(editQuantityLocally({ cartID: item.id, qty }));
    dispatch(editQuantity({ reqData: { qty }, cart_id, token, language, t }));
  };

  return (
    <div className="flex w-full rounded-xl border-b-[2px] justify-start items-start pt-4 pb-6 px-2 my-2 gap-x-2 2xl:gap-x-6 ">
      <img
        src={item.image}
        alt="alt"
        className="w-1/5 2xl:w-1/4 aspect-square"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
          e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
        }}
      />
      <div className="flex flex-col w-4/5 justify-center items-start gap-y-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-abdo 2xl:text-xl">{item.name}</h1>
          <button
            className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => removeItemsFromCart(item, cart_id)}
          >
            <img src={theClose} alt="alt" className="2xl:w-7 2xl:h-7" />
          </button>
        </div>

        <div className="font-abdo text-sm w-full gap-y-1 flex-col flex justify-center items-start">
          {item.additions.map((addOn) => {
            return (
              <div
                key={addOn.id}
                className="w-full text-[#7E7E7E] flex justify-between items-evenly text-xs "
              >
                <p className="text-xs 2xl:text-md w-1/3 font-abdo">
                  {addOn.values[0].name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-y-4 flex-row justify-between items-center w-full">
          <p className="text-newRed flex flex-row gap-x-1 font-abdo 2xl:text-lg 2xl:gap-x-3">
            <span>{item.price}</span>
            <span>{t('menuItemCurrency')}</span>
          </p>
          <div className="flex justify-between gap-x-5 w-auto">
            <DrawerAmountInput
              editTheQuantity={editQuantityOfItem}
              amount={item.amount}
              setAmount={setAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerCartCard;
