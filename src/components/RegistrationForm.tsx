import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormRow, FormTitle } from '../subComponents';
import { registerValues } from '../assets';
import person from '../assets/svg/person.svg';
import mobile from '../assets/svg/mobile.svg';
import email from '../assets/svg/email.svg';
import { registerUser } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import { RegisterData } from '../assets/types';
import { AppDispatch } from '../store';

const RegistrationForm:React.FC = () => {
  const [values, setValues] = React.useState<RegisterData>(registerValues);
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) :void => {
  const name = e.target.name;
  const value = e.target.value;
  setValues((prevValues) => ({ ...prevValues, [name]: value }));
};

const onSubmit = (e: React.FormEvent) :void => {
  e.preventDefault();
  localStorage.setItem('registerData', JSON.stringify(values));
  dispatch(registerUser(values));
  navigate('/validate-otp');
};
  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-center md:justify-center w-full items:center md:items-start rounded-lg"
      >
        <FormTitle title={t('createAccountText')} />
        <FormRow
          name="f_name"
          label=" "
          icon={person}
          type="text"
          value={values.f_name}
          high={false}
          placeHolder={t('firstNamePlaceHoder')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="l_name"
          label=" "
          icon={person}
          type="text"
          value={values.l_name}
          high={false}
          placeHolder={t('lastNamePlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="email"
          icon={email}
          label=" "
          type="text"
          value={values.email}
          high={false}
          placeHolder={t('emailInputPlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="phone"
          label=" "
          icon={mobile}
          type="text"
          value={values.phone}
          high={false}
          placeHolder={t('telephonePlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="password"
          label=" "
          type="password"
          high={false}
          value={values.password}
          placeHolder={t('passwordInputPlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="password_confirmation"
          label=" "
          type="password"
          value={values.password_confirmation}
          high={false}
          placeHolder={t('passwordConfirmInputPlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        <Link
          to="/forget-password"
          className="text-newRed text-start px-2 text-xs md:text-sm lg:text-sm mb-10"
        >
          {t('forgetPasswordText')}
        </Link>
        <button className="btn text-white btn-block hover:bg-newRed hover:text-white text-md rounded-3xl bg-newRed my-2">
          {t('createAccount')}
        </button>
        <Link
          to="/login"
          className="btn text-black btn-block hover:bg-[#D9D9D9] hover:text-black text-md rounded-3xl bg-[#D9D9D9] my-2"
        >
          {t('signInTitle')}
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
