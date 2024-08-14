import React, { FormEvent, useState } from 'react';
import { FormRow } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { ChangePasswordData } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { changePassword } from '../features/user/userSlice';
import { useGlobalContext } from '../context/GlobalContext';

const ChangePassword: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const [values, setValues] = useState<ChangePasswordData>({
    old_password: '',
    password: '',
    password_confirmation: '',
  });
  const { isLangArabic } = useGlobalContext();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const language = isLangArabic ? 'ar' : 'en';
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changePassword({ reqData: values, token, language }));
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="flex flex-col w-full lg:w-1/2 justify-start md:justify-evenly items-center lg:justify-center lg:border-0  px-8 lg:px-20 py-2 rounded-2xl  my-4"
    >
      <FormRow
        name="old_password"
        label=" "
        type="password"
        value={values.old_password}
        high={false}
        placeHolder={t('oldPasswordInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />

      <FormRow
        name="password"
        label=" "
        type="password"
        value={values.password}
        high={false}
        placeHolder={t('newPasswordInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />
      <FormRow
        name="password_confirmation"
        label=" "
        type="password"
        value={values.password_confirmation}
        high={false}
        placeHolder={t('newPasswordConfirmationInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />

      <button
        disabled={isLoading}
        className="btn btn-block rounded-full text-black w-inherit text-xl bg-transparent my-4"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-lg text-white"></span>
        ) : (
          t('confirmText')
        )}
      </button>
    </form>
  );
};

export default ChangePassword;
