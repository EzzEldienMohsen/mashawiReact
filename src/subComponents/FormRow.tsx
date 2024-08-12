import React from 'react';
import { FormRowProps } from '../assets/types';
import { IconFormRow, PasswordRow } from '../subSubComponents';

const FormRow: React.FC<FormRowProps> = ({
  inputRef,
  handleKeyDown,
  name,
  label,
  type,
  value,
  handleChange,
  placeHolder,
  high,
  full,
  half,
  icon,
  isOTP,
  options,
}) => {
  if (type === 'password') {
    return (
      <PasswordRow
        label={label}
        type={type}
        value={value}
        placeHolder={placeHolder}
        handleChange={handleChange}
        full={full}
        high={high}
        name={name}
      />
    );
  } else if (icon) {
    return (
      <IconFormRow
        label={label}
        type={type}
        value={value}
        placeHolder={placeHolder}
        handleChange={handleChange}
        full={full}
        high={high}
        name={name}
        icon={icon}
      />
    );
  } else if (type === 'select' && options) {
    return (
      <div
        className={`flex flex-col justify-start my-1 ${
          full ? 'w-full' : 'w-4/5 md:w-full'
        } items-start`}
      >
        <label className="my-1 capitalize" htmlFor={name}>
          {label || name}
        </label>
        <div className="relative w-full">
          <select
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className="appearance-none px-4 bg-white border-2 rounded-full py-2 w-full text-start"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {icon && (
            <div className="absolute right-3 top-2.5 pointer-events-none">
              <img src={icon} alt="icon" />
            </div>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  } else if (type === 'date') {
    return (
      <div
        className={`flex flex-col justify-start my-1 ${
          full ? 'w-full' : 'w-4/5 md:w-full'
        } items-start`}
      >
        <label className="my-1 capitalize" htmlFor={name}>
          {label || name}
        </label>
        <div className="relative w-full">
          <input
            required
            type={type}
            name={name}
            id={name}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            className="px-4 bg-white border-2 rounded-full py-2 w-full text-start"
          />
          {icon && (
            <div className="absolute right-3 top-2.5 pointer-events-none">
              <img src={icon} alt="icon" />
            </div>
          )}
        </div>
      </div>
    );
  } else if (type === 'textarea') {
    return (
      <div
        className={`flex flex-col justify-start my-1 ${
          full ? 'w-full' : 'w-4/5 md:w-full'
        } items-start`}
      >
        <label className="my-1 capitalize" htmlFor={name}>
          {label || name}
        </label>
        <div className="relative w-full">
          <textarea
            required
            name={name}
            id={name}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            className="text-start pr-4 pl-4 bg-white border-2 w-full rounded-full py-4 resize-none h-32"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-full'
      } ${half ? 'w-full md:w-[42%]' : 'w-full'} items-start`}
    >
      <label className="my-1 capitalize" htmlFor={name}>
        {label || name}
      </label>
      <input
        required
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeHolder}
        onChange={handleChange}
        maxLength={isOTP ? 1 : 100}
        style={{ backgroundColor: 'white' }}
        className={`px-4 bg-white place !important border-2 !important ${
          isOTP
            ? 'text-center w-12 lg:w-16 aspect-square rounded-2xl'
            : 'rounded-full text-start w-[100%]'
        }  ${high ? 'py-6 md:py-6' : 'py-2'}`}
      />
    </div>
  );
};

export default FormRow;
