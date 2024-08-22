import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../features/user/userSlice';
import { FormRow, FormTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { ResetPasswordData } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ResetPasswordForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const { t } = useTranslation();
  const [values, setValues] = React.useState<ResetPasswordData>({
    password: '',
    password_confirmation: '',
    token: '',
  });
  const { user } = useTypedSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const theToken = user.token;
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value, token: theToken });
  };
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const resetPasswordSchema = Yup.object().shape({
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
      await resetPasswordSchema.validate(values, { abortEarly: false });
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
    const isFormValid = await validateForm();
    if (!isFormValid) return;
    const response = await dispatch(
      resetPassword({ reqData: values, language })
    ).unwrap();
    if (response.status === 1) {
      toast.success(response.message);
      navigate('/login');
    }
  };
  return (
    <div className="flex justify-evenly w-full items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col  bg-transparent justify-start md:justify-center w-full items-center rounded-lg"
      >
        <FormTitle title={t('newPasswordTitle')} />
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
          high={false}
          value={values.password_confirmation}
          placeHolder={t('passwordConfirmInputPlaceHolder')}
          handleChange={handleChange}
          full={true}
        />
        {errors.password_confirmation && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md mb-2">
            {errors.password_confirmation}
          </p>
        )}
        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md 2xl:text-2xl py-4 rounded-full bg-newRed my-4 flex justify-center items-center 2xl:min-h-[45px] 2xl:h-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('confirmText')
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
