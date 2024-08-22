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
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [seconds, setSeconds] = useState<number>(65);
  const [isActive, setIsActive] = useState<boolean>(true);

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

  // count down
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setIsResendDisabled(() => false);

      // Add any additional actions when the countdown ends
    }

    // Cleanup interval on component unmount or when the timer is stopped
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, seconds]);

  const handleButtonClick = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setSeconds(65);
      setIsActive(true);
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
  const language = isLangArabic ? 'ar' : 'en';

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
      const result = await dispatch(
        emailVerification({ reqData: user, language })
      ).unwrap();
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
    dispatch(resendOTP({ reqData: { email }, language }));
    setIsResendDisabled(true);
    setTimeout(() => setIsResendDisabled(() => false), 60000);
  };

  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-center md:justify-center w-full items-center lg:justify-center lg:items-center rounded-lg"
      >
        <FormTitle title={t('OTPCodeTitle')} />
        <p className="my-2 text-center text-md md:text-lg lg:text-xl 2xl:text-2xl">
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
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md 2xl:text-xl rounded-3xl bg-newRed my-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('sendText')
          )}
        </button>
        {seconds > 0 ? (
          <div className="flex justify-between items-center w-full gap-x-4 mt-4">
            <button
              onClick={() => {
                resendTheOTP();
                handleButtonClick();
              }}
              disabled={isResendDisabled}
              className={`text-newRed 4 text-xs md:text-sm w-full lg:text-sm 2xl:text-xl ${
                isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {t('resendText')}
            </button>
            <div className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-full p-4 2xl:p-8 text-center flex justify-center items-center bg-newRed text-white text-sm 2xl:text-xl">
              <span>{seconds}s</span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              resendTheOTP();
              handleButtonClick();
            }}
            disabled={isResendDisabled}
            className={`text-newRed mt-4 text-xs md:text-sm w-full lg:text-sm 2xl:text-xl mb-10 ${
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
