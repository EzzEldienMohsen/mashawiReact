import React from 'react';
import { useDispatch } from 'react-redux';
import { FormRow, FormTitle } from '../subComponents';
import { Link, useNavigate } from 'react-router-dom';
import emailIcon from '../assets/svg/email.svg';
import { loginUser } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import { LoginData } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const [values, setValues] = React.useState<LoginData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
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
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const loginSchema = Yup.object().shape({
    email: Yup.string().required(t('isRequiredError')).email(t('correctEmail')),
    password: Yup.string()
      .required(t('isRequiredError'))
      .test('min-length', t('correctPassword'), function (value) {
        return !value || value.length >= 9;
      }),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate(values, { abortEarly: false });
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
    try {
      const result = await dispatch(
        loginUser({ reqData: values, language })
      ).unwrap();
      if (result.status === 1) {
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.message.message || 'An unexpected error occurred.';
      const errorStatus = error?.status;

      if (errorStatus === 403) {
        toast.success(errorMessage);
        navigate('/verify-email');
      } else {
        toast.error(errorMessage);
        setErrors({ form: errorMessage });
      }
    }
  };

  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-start md:justify-center w-full items-center rounded-lg"
      >
        <FormTitle title={t('signInTitle')} />
        <FormRow
          name="email"
          icon={emailIcon}
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
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-2">
            {errors.password}
          </p>
        )}
        <Link
          to="/forget-password"
          className="text-newRed underLine underLine-offset-8 mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-10"
        >
          {t('forgetPasswordText')}
        </Link>

        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md 2xl:text-xl rounded-3xl bg-newRed my-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            <span>{t('signInTitle')}</span>
          )}
        </button>
        <Link
          to="/register"
          className="btn text-black btn-block hover:bg-[#D9D9D9] hover:text-black text-md 2xl:text-xl rounded-3xl bg-[#D9D9D9] my-4"
        >
          <span>{t('createAccountText')}</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
