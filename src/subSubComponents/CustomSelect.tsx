import React, { ChangeEvent } from 'react';
import { Option } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

interface CustomSelectProps {
  name: string;
  type: string;
  half?: boolean;
  isBorder?: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: string | null;
  icon?: string;
  high?: boolean;
  full?: boolean;
  placeHolder?: string;
  label?: string;
  isOTP?: boolean;
  options?: Option[];
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  handleChange,
  options,
  label,
  placeHolder,
  full = true,
  icon,
  high = false,
}) => {
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-full'
      } items-start`}
    >
      <label className="my-1 capitalize" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-full">
        <select
          name={name}
          id={name}
          value={value || ''}
          onChange={handleChange}
          className={`px-14 bg-white place border-2 rounded-full text-start w-[100%] ${
            high ? 'py-6 md:py-6' : 'py-2'
          }`}
        >
          <option value="">{placeHolder}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </select>
        {icon && (
          <img
            src={icon}
            alt="dropdown icon"
            className={`absolute ${
              isLangArabic ? 'right-4' : 'left-4'
            } top-1/2 transform -translate-y-1/2`}
          />
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
