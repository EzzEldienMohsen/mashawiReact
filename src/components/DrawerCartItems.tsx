import React from 'react'
import {  RootState, useTypedSelector } from '../store';
import { DrawerCartCard } from '../subComponents';

const DrawerCartItems:React.FC = () => {
  
      const { cartItems } = useTypedSelector(
        (state: RootState) => state.theMashawiCart
      );
       

  return (
    <div className='flex flex-col justify-center items-center gap-y-3'>
        {cartItems.map((item)=>{
            return (
              <DrawerCartCard item={item} />
            );
        })}
    </div>
  )
}

export default DrawerCartItems