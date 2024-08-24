import React from 'react';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FormRow, FormTitle } from '../subComponents';
import email from '../assets/svg/email.svg';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/GlobalContext';
import * as Yup from 'yup';

const ForgetPasswordForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const [values, setValues] = React.useState<{ email: string }>({ email: '' });
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
  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string().required(t('isRequiredError')).email(t('correctEmail')),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await forgetPasswordSchema.validate(values, { abortEarly: false });
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
      forgetPassword({ reqData: values, language })
    ).unwrap();
    if (response.status === 1) {
      toast.success(response.message);
      navigate('/validate-otp');
    }
  };
  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-transparent justify-center md:justify-center w-full items:center md:items-center  rounded-lg"
      >
        <FormTitle title={t('forgetPasswordText')} />
        <p className="my-2 2xl:my-9 text-center text-md md:text-lg lg:text-xl 2xl:text-lg">
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
        {errors.email && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md my-2">
            {errors.email}
          </p>
        )}
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
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
