import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormRowProps } from '../assets/types';
import { IconFormRow, PasswordRow } from '../subSubComponents';
import { useGlobalContext } from '../context/GlobalContext';

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
  required,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isLangArabic } = useGlobalContext();
  if (type === 'password') {
    return (
      <PasswordRow
        label={label}
        required={required}
        type={type}
        value={value}
        placeHolder={placeHolder}
        handleChange={handleChange}
        full={full}
        high={high}
        name={name}
      />
    );
  } else if (icon && type !== 'date') {
    return (
      <IconFormRow
        required={required}
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
            value={value || ''}
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
    // Use react-datepicker here with custom styling and icon click handling
    return (
      <div
        className={`flex flex-col justify-start my-1 ${
          full ? 'w-full' : 'w-4/5 md:w-full'
        } items-start`}
      >
        <label className="my-1 capitalize" htmlFor={name}>
          {label || name}
        </label>
        <div className={`w-full !important`}>
          <DatePicker
            wrapperClassName="w-full"
            className={`text-start px-14 bg-white border-2 w-full place-items-start rounded-full py-4 md:py-4 `}
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              handleChange({
                target: {
                  name,
                  value: date ? date.toISOString().split('T')[0] : '',
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            customInput={
              <div className="relative w-full flex items-start">
                <input
                  value={value || ''}
                  onChange={() => {}}
                  className={`w-full`}
                  placeholder="YYYY-MM-DD"
                />
                {icon && (
                  <div
                    className="w-full"
                    onClick={() => {
                      const input = document.querySelector(
                        '.react-datepicker__input-container input'
                      ) as HTMLInputElement | null;
                      if (input) {
                        input.focus();
                      }
                    }}
                  >
                    <img
                      src={icon}
                      alt="calendar icon"
                      className={`absolute ${
                        isLangArabic ? 'right-4' : 'left-4'
                      } top-1/2 transform -translate-y-1/2`}
                    />
                  </div>
                )}
              </div>
            }
          />
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
            value={value || ''}
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
        required={isOTP}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type={type}
        name={name}
        id={name}
        value={value || ''}
        placeholder={placeHolder}
        onChange={handleChange}
        maxLength={isOTP ? 1 : 25000}
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
