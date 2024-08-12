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
        className={`absolute ${
          isLangArabic ? 'right-4' : 'left-4'
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
        className={`text-start px-14 bg-white border-2 w-full place-items-start rounded-full py-1  md:py-4
            `}
      />
      <button
        type="button"
        className={`absolute ${
          isLangArabic ? 'left-6' : 'right-6'
        } top-1/2 my-1 transform -translate-y-1/2 text-gray-400`}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordRow;
