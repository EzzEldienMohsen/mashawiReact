import React from 'react';
import plus from '../assets/svg/menu/input/plus.svg';
import minus from '../assets/svg/menu/input/minus.svg';
interface AmountProps {
  amount: number;
  setAmount: (a: number | ((a: number) => number)) => void;
}

const AmountInput: React.FC<AmountProps> = ({ amount, setAmount }) => {
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value, 10));
  };

  const incrementAmount = () => {
    setAmount((prevAmount: number) => prevAmount + 1);
  };

  const decrementAmount = () => {
    setAmount((prevAmount: number) => (prevAmount > 1 ? prevAmount - 1 : 1));
  };

  React.useEffect(() => {}, [amount]);
  return (
    <div className="w-1/2 flex justify-between items-center p-[3px] rounded-3xl bg-[#F5F5F5] gap-x-1">
      <button
        onClick={incrementAmount}
        className="w-6 aspect-square rounded-full text-black bg-white flex justify-center items-center"
      >
        <img src={plus} alt="+" className="w-1/2" />
      </button>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmount}
        min="1"
        className="bg-[#F5F5F5] text-center appearance-none"
        style={{
          width: '30px',
          textAlign: 'center',
          appearance: 'none',
          MozAppearance: 'textfield',
          WebkitAppearance: 'none',
        }}
      />
      <button
        onClick={decrementAmount}
        className="w-6 aspect-square rounded-full text-black bg-white flex justify-center items-center"
      >
        <img src={minus} alt="-" className="w-1/2" />
      </button>
    </div>
  );
};

export default AmountInput;
