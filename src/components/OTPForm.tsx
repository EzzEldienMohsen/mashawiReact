import React from 'react';
import { initialOTP } from '../assets';
import { useDispatch } from 'react-redux';
import { resendOTP, validateOTP } from '../features/user/userSlice';
import { FormRow, FormTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { InitialOTPInputs } from '../assets/types';
import { AppDispatch } from '../store';

const OTPForm = () => {
  const [values, setValues] = React.useState<InitialOTPInputs>(initialOTP);
  const dispatch:AppDispatch = useDispatch();
  const { t } = useTranslation();
const storedData = localStorage.getItem('registerData');
const email: string = storedData ? JSON.parse(storedData).email : '';  console.log(email);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const token = Object.values(values).join('');
    const user = {
      email,
      token,
    };
    dispatch(validateOTP(user));
  };
  const resendTheOTP = () => {
    dispatch(resendOTP({ email }));
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
        <div className="flex justify-start items-stretch gap-x-2 my-2 w-full ">
          <FormRow
            name="firstNum"
            label=" "
            type="text"
            value={values.firstNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
          <FormRow
            name="secondNum"
            label=" "
            type="text"
            value={values.secondNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
          <FormRow
            name="thirdNum"
            label=" "
            type="text"
            value={values.thirdNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
          <FormRow
            name="fourthNum"
            label=" "
            type="text"
            value={values.fourthNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
          <FormRow
            name="fifthNum"
            label=" "
            type="text"
            value={values.fifthNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
          <FormRow
            name="sixthNum"
            label=" "
            type="text"
            value={values.sixthNum}
            high={false}
            isOTP={true}
            handleChange={handleChange}
          />
        </div>
        <button className="btn text-white btn-block hover:bg-newRed hover:text-white text-md rounded-3xl bg-newRed my-2">
          {t('sendText')}
        </button>
        <button
          onClick={resendTheOTP}
          className="text-newRed mt-4 text-xs md:text-sm w-full lg:text-sm mb-10"
        >
          {t('resendText')}
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
