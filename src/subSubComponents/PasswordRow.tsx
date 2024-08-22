import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import passwordIcon from '../assets/svg/Password.svg';
import { useGlobalContext } from '../context/GlobalContext';
import { FormRowProps } from '../assets/types';
const PasswordRow: React.FC<FormRowProps> = ({
  name,
  label,
  value,
  handleChange,
  placeHolder,
  full,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
      <img
        src={passwordIcon}
        alt="icon"
        className={`absolute 2xl:w-6 2xl:h-6 ${
          isLangArabic ? 'right-4 2xl:right-8' : 'left-4 2xl:left-8'
        } top-1/2 transform -translate-y-1/2`}
      />

      <input
        required
        type={showPassword ? 'text' : 'password'}
        name={name}
        id={name}
        value={value || ''}
        placeholder={placeHolder}
        onChange={handleChange}
        className={`text-start px-14  2xl:px-16 bg-white border-2 w-full place-items-start rounded-full py-1  md:py-4 2xl:py-5 2xl:placeholder:text-[18px] 2xl:text-[18px]
            `}
      />
      <button
        type="button"
        className={`absolute 2xl:w-6 2xl:h-6 ${
          isLangArabic ? 'left-6 2xl:left-10' : 'right-6 2xl:right-10'
        } top-1/2 my-1 transform -translate-y-1/2 text-gray-400`}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordRow;
