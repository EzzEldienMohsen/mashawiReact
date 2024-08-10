import React, { useRef, useState } from 'react';
import { initialOTP } from '../assets';
import { useDispatch } from 'react-redux';
import { resendOTP, validateOTP } from '../features/user/userSlice';
import { FormRow, FormTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { InitialOTPInputs } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const [values, setValues] = useState<InitialOTPInputs>(initialOTP);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  const navigate = useNavigate();
  const storedData = localStorage.getItem('registerData');
  const email: string = storedData ? JSON.parse(storedData).email : '';

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    const index = Number(name.charAt(name.length - 1)) - 1;

    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      return newValues;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index =
      Number(e.currentTarget.name.charAt(e.currentTarget.name.length - 1)) - 1;

    if (e.key === 'Backspace' && !values[e.currentTarget.name]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    let tokenArray = Object.values(values);
    if (isLangArabic) {
      tokenArray = tokenArray.reverse();
    }
    const token = tokenArray.join('');
    const user = { email, token };
    console.log(user);
    dispatch(validateOTP(user));
    navigate('/reset-password');
  };

  const resendTheOTP = () => {
    dispatch(resendOTP({ email }));
    setIsResendDisabled(true);
    setTimeout(() => setIsResendDisabled(false), 60000);
  };

  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-center md:justify-center w-full items-center lg:justify-center lg:items-center rounded-lg"
      >
        <FormTitle title={t('OTPCodeTitle')} />
        <p className="my-2 text-center text-md md:text-lg lg:text-xl">
          {t('OTPCodeText')}
        </p>
        <div className="flex justify-start items-stretch gap-x-2 my-2 w-full">
          {[
            'firstNum',
            'secondNum',
            'thirdNum',
            'fourthNum',
            'fifthNum',
            'sixthNum',
          ].map((name, index) => (
            <FormRow
              key={name}
              name={name}
              label=" "
              type="text"
              value={values[name as keyof InitialOTPInputs]}
              high={false}
              isOTP={true}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              inputRef={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md rounded-3xl bg-newRed my-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('sendText')
          )}
        </button>
        <button
          onClick={resendTheOTP}
          disabled={isResendDisabled}
          className={`text-newRed mt-4 text-xs md:text-sm w-full lg:text-sm mb-10 ${
            isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {t('resendText')}
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
