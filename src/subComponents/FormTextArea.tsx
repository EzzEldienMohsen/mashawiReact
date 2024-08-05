import React from 'react';
import { FormRowProps } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';

const FormTextArea: React.FC<FormRowProps> = ({
  name,
  label,
  type,
  value,
  handleChange,
  placeHolder,
  high,
  full,
  icon,
  isOTP,
  options,
}) => {
  const {isLangArabic} = useGlobalContext()
  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-1/2'
      } items-start relative`}
    >
      <label className="my-1 capitalize font-abdo font-semibold text-lg md:text-xl" htmlFor={name}>
        {label || name}
      </label>
      <div className="relative w-full flex  items-start">
        <textarea
          required
          name={name}
          id={name}
          value={value}
          placeholder={placeHolder}
          onChange={handleChange}
          maxLength={isOTP ? 1 : 100}
          style={{ backgroundColor: 'white' }}
          className={`${icon?"px-16" : "px-2" } text-sm md:text-auto bg-white font-abdo !important  !important ${
            isOTP
              ? 'text-center w-12 lg:w-16 rounded-2xl'
              : 'rounded-3xl text-start h-[150px] lg:h-[250px] w-full'
          }  ${high ? 'py-6 md:py-6' : 'py-2'}`}
        />
        {icon?<img
          src={icon}
          alt="icon"
          className={`absolute ${
            isLangArabic ? 'right-4' : 'left-4'
          } top-0 mt-[30px] md:mt-[26px] transform -translate-y-0 `}
        />:null}
      </div>
    </div>
  );
};

export default FormTextArea;
