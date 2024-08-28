import React from 'react';
import { FormRowProps } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';

const FormTextArea: React.FC<FormRowProps> = ({
  name,
  label,
  value,
  handleChange,
  placeHolder,
  high,
  full,
  icon,
  isOTP,
  isBorder,
}) => {
  const { isLangArabic } = useGlobalContext();
  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-1/2'
      } items-start relative`}
    >
      <label
        className="my-1 capitalize font-abdo font-semibold text-lg md:text-xl"
        htmlFor={name}
      >
        {label || name}
      </label>
      <div className="relative w-full flex  items-start">
        <textarea
          name={name}
          id={name}
          value={value || ''}
          placeholder={placeHolder}
          onChange={handleChange}
          maxLength={isOTP ? 1 : 25000}
          style={{ backgroundColor: 'white' }}
          className={`${
            icon ? 'px-14 2xl:px-16 ' : 'px-2'
          } px-14 2xl:px-16 stroke-[#DDDDDD] bg-white border-2 w-full place-items-start rounded-3xl py-4 md:py-4 2xl:py-5 2xl:placeholder:text-lg 2xl:text-lg ${
            isOTP
              ? 'text-center w-12 lg:w-16 rounded-2xl'
              : 'rounded-3xl text-start  md:max-h-[150px] md:min-h-[100px]  w-full'
          }  ${high ? 'py-6 md:py-6 2xl:py-6' : 'py-2 2xl:py-6'} ${
            isBorder ? 'border-2' : ''
          }`}
        />
        {icon ? (
          <img
            src={icon}
            alt="icon"
            className={`absolute 2xl:w-6 2xl:h-6  ${
              isLangArabic ? 'right-4 2xl:right-8' : 'left-4 2xl:left-8'
            } top-0 mt-[30px] md:mt-[26px] transform -translate-y-0 `}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FormTextArea;
