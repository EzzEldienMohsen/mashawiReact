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
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import * as Yup from 'yup';

const RegistrationForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [values, setValues] = React.useState<RegisterData>(registerValues);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const registrationSchema = Yup.object().shape({
    f_name: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('firstNameIsTooShort'), function (value) {
        return !value || value.length >= 2;
      }),
    l_name: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('secondNameIsTooShort'), function (value) {
        return !value || value.length >= 2;
      }),
    email: Yup.string().required(t('isRequiredError')).email(t('correctEmail')),
    phone: Yup.string()
      .required(t('isRequiredError'))
      .test('phone-format', t('correctPhoneNumber'), function (value) {
        const egyptUaePhoneRegex =
          /^((\+20|0)?1[0125][0-9]{8}$)|((\+971|0)?5[024568][0-9]{7}$)/;
        return !value || egyptUaePhoneRegex.test(value);
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
      await registrationSchema.validate(values, { abortEarly: false });
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
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    localStorage.setItem('registerData', JSON.stringify(values));

    const isFormValid = await validateForm();
    if (!isFormValid) return;

    const response = await dispatch(
      registerUser({ reqData: values, language })
    ).unwrap();

    if (response.status === 1) {
      navigate('/verify-email', { replace: true });
    }
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
        {errors.f_name && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.f_name}
          </p>
        )}
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
        {errors.l_name && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.l_name}
          </p>
        )}
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
        {errors.email && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.email}
          </p>
        )}
        <FormRow
          name="phone"
          label=" "
          icon={mobile}
          type="tel"
          value={values.phone}
          high={false}
          placeHolder={t('telephonePlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        {errors.phone && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.phone}
          </p>
        )}
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
          placeHolder={t('passwordConfirmInputPlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        {errors.password_confirmation && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-2">
            {errors.password_confirmation}
          </p>
        )}
        <Link
          to="/forget-password"
          className="text-newRed underline underline-offset-2 mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-10"
        >
          {t('forgetPasswordText')}
        </Link>

        {errors.form && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.form}
          </p>
        )}
        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md 2xl:text-xl rounded-3xl bg-newRed my-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('createAccount')
          )}
        </button>
        <Link
          to="/login"
          className="btn text-black btn-block hover:bg-[#D9D9D9] hover:text-black text-md 2xl:text-xl rounded-3xl bg-[#D9D9D9] my-2"
        >
          {t('signInTitle')}
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
