import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../store';
import theClose from '../assets/svg/closeBtn.svg';
import { DrawerCartItems, DrawerCartTotals } from '../components';
interface CartDrawer{
  closeDrawer:()=>void
}
const CartDrawerContent: React.FC<CartDrawer> = ({closeDrawer}) => {
  const dispatch: AppDispatch = useDispatch();
  const clearTheCart = () => dispatch(clearCart());
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col justify-start relative  overflow-y-auto pb-48  items-center px-3 pt-3 bg-[#F8F8F8] h-full">
      {/* title and clear cart logic */}
      <div className="w-full flex justify-start items-center gap-x-6">
        <button className="mt-3" onClick={() => clearTheCart()}>
          <img src={theClose} alt="alt" />
        </button>
        <h1 className="text-newRed text-3xl font-abdo font-bold">
          {t('cartTitle')}
        </h1>
      </div>
      {/* cartItems */}
      <DrawerCartItems />
      {/* Cart Total */}
      <DrawerCartTotals closeDrawer={closeDrawer} />
    </div>
  );
};

export default CartDrawerContent;
