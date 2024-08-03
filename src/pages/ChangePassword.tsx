import React, {  FormEvent, useState } from 'react';
import { FormRow } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { ChangePasswordData } from '../assets/types';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { changePassword } from '../features/user/userSlice';



const ChangePassword: React.FC = () => {
  const [values, setValues] = useState<ChangePasswordData>({
    old_password: '',
    password: '',
    password_confirmation: '',
  });
  const { t } = useTranslation();
const dispatch :AppDispatch = useDispatch()
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
    console.log(values);
    dispatch(changePassword(values))
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="flex flex-col w-full lg:w-1/2 justify-start md:justify-evenly items-center lg:justify-center lg:border-0 lg:shadow-none px-4 lg:px-20 py-2 rounded-2xl shadow-2xl my-4"
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

      <button className="btn btn-block rounded-full text-black w-inherit text-xl bg-transparent my-4">
        {t('changePassword')}
      </button>
    </form>
  );
};

export default ChangePassword;
