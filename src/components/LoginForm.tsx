import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow, FormTitle } from '../subComponents';
import { Link, useNavigate } from 'react-router-dom';
import emailIcon from '../assets/svg/email.svg';
import { loginUser } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import { LoginData } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const LoginForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const [values, setValues] = React.useState<LoginData>({
    email: '',
    password: '',
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = React.useCallback(
    debounce((name: string, value: string) => {
      if (name === 'email' && !validateEmail(value)) {
        toast.error(t('invalidEmailAddress'));
        return;
      }
    }, 5000),
    []
  );
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    handleValidation(name, value);
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    localStorage.setItem('registerData', JSON.stringify(values));

    try {
      const result = await dispatch(loginUser(values)).unwrap();

      if (result.status === 1) {
        navigate('/profile');
      }
    } catch (error: any) {
      if (error?.status === 403) {
        navigate('/validate-otp');
      } else {
        toast.success(error.message || 'Login failed');
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
        <Link
          to="/forget-password"
          className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm mb-10"
        >
          {t('forgetPasswordText')}
        </Link>
        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md rounded-3xl bg-newRed my-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('signInTitle')
          )}
        </button>
        <Link
          to="/register"
          className="btn text-black btn-block hover:bg-[#D9D9D9] hover:text-black text-md rounded-3xl bg-[#D9D9D9] my-2"
        >
          {t('createAccountText')}
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
