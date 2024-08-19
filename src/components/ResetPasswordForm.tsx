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

const ResetPasswordForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state: RootState) => state.user);

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
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (values.password === values.password_confirmation) {
      const response = await dispatch(
        resetPassword({ reqData: values, language })
      ).unwrap();
      if (response.status === 1) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('passwordCheck');
      }
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

        <button
          className="btn text-white btn-block hover:bg-newRed hover:text-white text-md rounded-3xl bg-newRed my-4"
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
