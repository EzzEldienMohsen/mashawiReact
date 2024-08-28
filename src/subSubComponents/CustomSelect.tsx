import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Option } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

interface CustomSelectProps {
  name: string;
  type: string;
  half?: boolean;
  isBorder?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | null | number;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the label of the selected option as the search term when the component mounts or value changes
    const selectedOption = options?.find((option) => option.value === value);
    setSearchTerm(
      selectedOption
        ? name === 'gender'
          ? t(selectedOption.label)
          : selectedOption.label
        : ''
    );
  }, [value, options, name, t]);

  // Filter the options based on the search term and apply translation conditionally
  const filteredOptions = options?.filter((option) =>
    (name === 'gender' ? t(option.label) : option.label)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue: string | number) => {
    const selectedOption = options?.find(
      (option) => option.value === selectedValue
    );
    setSearchTerm(
      selectedOption
        ? name === 'gender'
          ? t(selectedOption.label)
          : selectedOption.label
        : ''
    ); // Set the search term to the selected option's label
    setIsOpen(false);

    handleChange({
      target: {
        name, // Provide the name of the input field (in case it's needed)
        value: selectedValue, // The selected value from the dropdown
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col justify-start my-1 ${
        full ? 'w-full' : 'w-4/5 md:w-full'
      } items-start`}
      ref={dropdownRef}
    >
      {label && (
        <label className="my-1 capitalize" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type="text"
          name={name}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
          className={`px-14 2xl:px-16 stroke-[#DDDDDD] bg-white border-2 w-full place-items-start rounded-full py-4 md:py-4 2xl:py-5 2xl:placeholder:text-[18px] 2xl:text-[18px] ${
            high ? 'py-6 md:py-6' : 'py-4'
          }`}
          placeholder={placeHolder || 'Select...'}
        />
        {icon && (
          <img
            src={icon}
            alt="dropdown icon"
            className={`absolute 2xl:w-6 2xl:h-6 ${
              isLangArabic ? 'right-4 2xl:right-8' : 'left-4 2xl:left-8'
            } top-1/2 transform -translate-y-1/2`}
          />
        )}

        {isOpen && filteredOptions && (
          <div className="absolute mt-2 w-full bg-white max-h-[120px] overflow-y-auto border border-gray-300 rounded-xl shadow-lg z-10">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {name === 'gender' ? t(option.label) : option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
