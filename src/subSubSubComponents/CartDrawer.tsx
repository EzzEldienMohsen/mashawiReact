import React from 'react';
import cartImg from '../assets/svg/header/cart.svg';
import CartDrawerContent from './CartDrawerContent';

const CartDrawer: React.FC = () => {
  return (
    <div className="lg:drawer w-10  hidden">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Drawer button */}
        <label htmlFor="cart-drawer" className="">
          <button className="rounded-badge aspect-square flex lg:hidden items-center justify-center  w-10 bg-white">
            <img src={cartImg} alt="" className="w-5 h-5" />
          </button>
        </label>
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>
        <CartDrawerContent />
      </div>
    </div>
  );
};

export default CartDrawer;
