import React from 'react';
import cartImg from '../assets/svg/header/cart.svg';
import CartDrawerContent from './CartDrawerContent';

const CartDrawer: React.FC = () => {
  const closeDrawer = (): void => {
    const drawerCheckbox = document.getElementById(
      'cart-drawer'
    ) as HTMLInputElement;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer w-10">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Drawer button */}
        <label htmlFor="cart-drawer" className="">
          <div className="rounded-badge aspect-square flex items-center justify-center w-10 bg-white">
            <img src={cartImg} alt="Cart" className="w-5 h-5" />
          </div>
        </label>
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>
        <div className="drawer-content w-1/2 h-full">
          <CartDrawerContent closeDrawer={closeDrawer} />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
