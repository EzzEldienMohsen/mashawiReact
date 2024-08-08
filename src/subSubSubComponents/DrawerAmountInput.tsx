import React from 'react';
import plus from '../assets/svg/menu/input/plus.svg';
import minus from '../assets/svg/menu/input/minus.svg';
interface AmountProps {
  amount: number;
  setAmount: (a: number | ((a: number) => number)) => void;
  editTheQuantity: (qty: number) => void;
}
const DrawerAmountInput: React.FC<AmountProps> = ({
  amount,
  setAmount,
  editTheQuantity,
}) => {
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value, 10));
  };

  const incrementAmount = () => {
    setAmount((prevAmount: number) => {
      const newAmount = prevAmount + 1;
      editTheQuantity(newAmount);
      return newAmount;
    });
  };

  const decrementAmount = () => {
    setAmount((prevAmount: number) => {
      const newAmount = prevAmount > 1 ? prevAmount - 1 : 1;
      editTheQuantity(newAmount);
      return newAmount;
    });
  };

  return (
    <div className="w-full flex justify-between items-center p-2 rounded-3xl bg-[#DDDDDD] gap-x-2">
      <button
        disabled={amount === 1}
        onClick={decrementAmount}
        className="w-8 aspect-square rounded-full text-black bg-white flex justify-center items-center"
      >
        <img src={minus} alt="-" />
      </button>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmount}
        min="0"
        className="bg-[#DDDDDD] text-center appearance-none"
        style={{
          width: '50px',
          textAlign: 'center',
          appearance: 'none',
          MozAppearance: 'textfield',
          WebkitAppearance: 'none',
        }}
      />
      <button
        onClick={incrementAmount}
        className="w-8 aspect-square rounded-full text-black bg-white flex justify-center items-center"
      >
        <img src={plus} alt="+" />
      </button>
    </div>
  );
};

export default DrawerAmountInput;
