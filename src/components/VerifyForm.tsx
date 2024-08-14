import React, { useRef, useState, useEffect } from 'react';
import { initialOTP } from '../assets';
import { useDispatch } from 'react-redux';
import { emailVerification, resendOTP } from '../features/user/userSlice';
import { FormRow, FormTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { InitialOTPInputs } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const [values, setValues] = useState<InitialOTPInputs>(initialOTP);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  const navigate = useNavigate();
  const storedData = localStorage.getItem('registerData');
  const email: string = storedData ? JSON.parse(storedData).email : '';

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle initial focus
  useEffect(() => {
    const startIndex = isLangArabic ? inputRefs.current.length - 1 : 0;
    setCurrentFocus(startIndex);
    inputRefs.current[startIndex]?.focus();
  }, [isLangArabic]);

  // Handle automatic focus shift when values change
  useEffect(() => {
    const filledValues = Object.values(values).map((value) => value !== '');
    const nextEmptyIndex = isLangArabic
      ? filledValues.lastIndexOf(false)
      : filledValues.indexOf(false);

    if (nextEmptyIndex !== -1 && nextEmptyIndex !== currentFocus) {
      setCurrentFocus(nextEmptyIndex);
    }
  }, [values, isLangArabic]);

  // Update focus based on currentFocus
  useEffect(() => {
    if (inputRefs.current[currentFocus]) {
      inputRefs.current[currentFocus]?.focus();
    }
  }, [currentFocus]);

  useEffect(() => {
    if (isActive && seconds > 0) {
      const newTimer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setTimer(newTimer);

      // Cleanup interval on component unmount or when timer is stopped
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    } else if (seconds === 0) {
      setIsActive(false); // Stop the timer when it reaches 0
    }
  }, [isActive, seconds]);

  // Handle Button Click For Timer
  const handleButtonClick = () => {
    if (isActive) {
      setIsActive(false); // Stop the timer
      if (timer !== null) {
        window.clearInterval(timer); // Clear the existing interval
      }
    } else {
      setSeconds(65); // Reset seconds to 60
      setIsActive(true); // Start the timer
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    let tokenArray = Object.values(values);
    if (isLangArabic) {
      tokenArray = tokenArray.reverse();
    }
    const theToken = tokenArray.join('');
    const token = parseInt(theToken);
    const user = { email, token };
    try {
      const result = await dispatch(emailVerification(user)).unwrap();
      if (result.status === 1) {
        navigate('/');
      } else if (result.status === 0) {
        toast.error(result.message);
      }
    } catch (error: any) {
      if (error.status === 403) {
        toast.error(error.message);
        toast.error('Please Insert Email Correctly');
      }
    }
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
        {seconds > 0 ? (
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-center bg-newRed text-white text-sm">
            {seconds}s
          </div>
        ) : (
          <button
            onClick={() => {
              resendTheOTP();
              handleButtonClick();
            }}
            disabled={isResendDisabled}
            className={`text-newRed mt-4 text-xs md:text-sm w-full lg:text-sm mb-10 ${
              isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {t('resendText')}
          </button>
        )}
      </form>
    </div>
  );
};

export default VerifyForm;
