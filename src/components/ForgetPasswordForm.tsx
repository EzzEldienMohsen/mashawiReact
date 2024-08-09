import React from 'react';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FormRow, FormTitle } from '../subComponents';
import email from '../assets/svg/email.svg';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';

const ForgetPasswordForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const [values, setValues] = React.useState<{ email: string }>({ email: '' });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
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
    localStorage.setItem('registerData', JSON.stringify(values));
    dispatch(forgetPassword(values));
    navigate('/validate-otp');
  };
  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-center md:justify-center w-full items:center md:items-start rounded-lg"
      >
        <FormTitle title={t('forgetPasswordText')} />
        <p className="my-2 text-center text-md md:text-lg lg:text-xl">
          {t('forgetPasswordPageText')}
        </p>
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
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
