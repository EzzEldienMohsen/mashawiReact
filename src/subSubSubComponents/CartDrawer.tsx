import React, { useEffect, useRef } from 'react';
import cartImg from '../assets/svg/header/cart.svg';
import CartDrawerContent from './CartDrawerContent';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { clearCart, getCart } from '../features/cart/cartSlice';
import { clearWishList } from '../features/wishList/wishListSlice';

const CartDrawer: React.FC<{ isRed: boolean }> = ({ isRed }) => {
  const { isLangArabic } = useGlobalContext();
  const [hideDrawer, setHideDrawer] = React.useState<boolean>(true);
  const { user, isLoading } = useTypedSelector(
    (state: RootState) => state.user
  );
  const language = isLangArabic ? 'ar' : 'en';
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const drawerRef = useRef<HTMLDivElement>(null);

  const getTheCart = async () => {
    await dispatch(clearCart());
    await dispatch(clearWishList());
    await dispatch(getCart({ token, language }));
  };

  React.useEffect(() => {
    getTheCart();
  }, [token, language]);

  const toggleDrawer = (): void => {
    setHideDrawer(!hideDrawer);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setHideDrawer(true);
    }
  };

  useEffect(() => {
    if (!hideDrawer) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideDrawer]);

  return (
    <div className={`relative`}>
      <div
        className={`rounded-badge 2xl:rounded-full aspect-square flex items-center justify-center w-10 2xl:w-14 bg-white cursor-pointer ${
          isRed ? 'lg:hidden' : 'lg:flex'
        }`}
        onClick={toggleDrawer}
      >
        <img src={cartImg} alt="Cart" className="w-5 2xl:w-6 2xl:h-6 h-5" />
      </div>

      {!hideDrawer && (
        <div
          ref={drawerRef}
          className={`fixed inset-y-0 right-0 w-1/2 2xl:w-1/3 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
            hideDrawer ? 'translate-x-full' : 'translate-x-0'
          } z-30`}
        >
          <div className="drawer-overlay" onClick={toggleDrawer}></div>
          <div className="w-full h-full">
            <CartDrawerContent
              closeDrawer={toggleDrawer}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
