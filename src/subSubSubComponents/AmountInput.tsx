import React from 'react';

interface AmountProps {
  amount: number;
  setAmount: (a: number | ((a: number) => number)) => void;
}

const AmountInput: React.FC<AmountProps> = ({ amount, setAmount }) => {
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const incrementAmount = () => {
    setAmount((prevAmount: number) => prevAmount + 1);
  };

  const decrementAmount = () => {
    setAmount((prevAmount: number) => (prevAmount > 1 ? prevAmount - 1 : 1));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={decrementAmount} style={{ marginRight: '8px' }}>
        -
      </button>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmount}
        min="1"
        style={{ width: '50px', textAlign: 'center' }}
      />
      <button onClick={incrementAmount} style={{ marginLeft: '8px' }}>
        +
      </button>
    </div>
  );
};

export default AmountInput;
