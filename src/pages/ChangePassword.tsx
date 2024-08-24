import React, { FormEvent, useState } from 'react';
import { FormRow } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { ChangePasswordData } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { changePassword } from '../features/user/userSlice';
import { useGlobalContext } from '../context/GlobalContext';
import * as Yup from 'yup';

const ChangePassword: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

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
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const changePasswordSchema = Yup.object().shape({
    old_password: Yup.string()
      .required(t('isRequiredError'))
      .test('password-length', t('correctPassword'), function (value) {
        return !value || value.length >= 9;
      }),
    password: Yup.string()
      .required(t('isRequiredError'))
      .test('password-length', t('correctPassword'), function (value) {
        return !value || value.length >= 9;
      }),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], t('correctConfirm'))
      .required(t('isRequiredError'))
      .test('password-confirm-length', t('correctPassword'), function (value) {
        return !value || value.length >= 9;
      }),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await changePasswordSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isFormValid = await validateForm();
    if (!isFormValid) return;

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
      {errors.old_password && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.old_password}
        </p>
      )}
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
      {errors.password && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.password}
        </p>
      )}
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
      {errors.password_confirmation && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-2">
          {errors.password_confirmation}
        </p>
      )}
      <button
        disabled={isLoading}
        className="btn btn-block rounded-full text-black w-inherit  bg-transparent my-4 min-h-[46px] lg:min-h-[56px] h-auto text-sm lg:text-2xl"
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
