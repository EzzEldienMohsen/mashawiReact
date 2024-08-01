import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FormRowProps } from '../assets/types';

const IconFormRow:React.FC<FormRowProps> = ({
  name,
  label,
  type,
  value,
  handleChange,
  placeHolder,
  full,
  icon,
}) => {
  const { isLangArabic } = useGlobalContext();
  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-1/2'
      } items-start relative`}
    >
      <label className="my-1 capitalize" htmlFor={name}>
        {label || name}
      </label>
      <div className="relative w-full flex  items-start">
        <input
          required
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeHolder}
          onChange={handleChange}
          className={`text-start px-14 bg-white border-2 w-full place-items-start rounded-full py-1  md:py-4
            `}
        />
        <img
          src={icon}
          alt="icon"
          className={`absolute ${
            isLangArabic ? 'right-4' : 'left-4'
          } top-1/2 transform -translate-y-1/2`}
        />
      </div>
    </div>
  );
};

export default IconFormRow;
