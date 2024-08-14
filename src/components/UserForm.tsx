import React from 'react';
import { countryOptions, genderOptions } from '../assets';
import person from '../assets/svg/person.svg';
import mobile from '../assets/svg/mobile.svg';
import mail from '../assets/svg/email.svg';
import date from '../assets/svg/date.svg';
import gender from '../assets/svg/gender.svg';
import country from '../assets/svg/country.svg';
import profession from '../assets/svg/Profession.svg';
import { FormRow } from '../subComponents';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UpdateUserReq } from '../features/user/types';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const UserForm: React.FC = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useTypedSelector(
    (state: RootState) => state.user
  );
  let profileValues: UpdateUserReq = {
    f_name: user.user.f_name,
    l_name: user.user.l_name,
    email: user.user.email,
    phone: user.user.phone,
    gender: user.user?.gender || '',
    work: user.user?.work || '',
    nationality: user.user?.nationality || '',
    birthdate: user.user?.birthdate || '',
  };
  const [values, setValues] = React.useState<UpdateUserReq>(profileValues);
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const token = user.token;
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
    }, 3000),
    []
  );
  const dispatch: AppDispatch = useDispatch();
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
    await dispatch(updateUser({ reqData: values, token, language }));
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="flex flex-col w-full lg:w-1/2 justify-start md:justify-evenly items-center lg:justify-center lg:shadow-none px-6 py-2 rounded-2xl shadow-2xl"
    >
      <FormRow
        name="f_name"
        icon={person}
        label=" "
        type="text"
        value={values.f_name}
        high={false}
        placeHolder={t('nameInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />
      <FormRow
        name="l_name"
        icon={person}
        label=" "
        type="text"
        value={values.l_name}
        high={false}
        placeHolder={t('nameInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />
      <FormRow
        name="phone"
        icon={mobile}
        label=" "
        type="text"
        value={values.phone}
        high={false}
        placeHolder={t('mobileInputPlaceHolder')}
        full={true}
        handleChange={handleChange}
      />
      <FormRow
        name="email"
        icon={mail}
        label=" "
        type="text"
        high={false}
        value={values.email}
        placeHolder={t('emailInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />
      <FormRow
        name="birthdate"
        label=" "
        icon={date}
        type="date"
        value={values.birthdate}
        handleChange={handleChange}
        placeHolder={t('birthDateInput')}
        full={true}
      />
      <FormRow
        name="gender"
        label=" "
        icon={gender}
        type="select"
        value={values.gender}
        handleChange={handleChange}
        placeHolder={t('genderInput')}
        options={genderOptions}
        full={true}
      />
      <FormRow
        name="nationality"
        label=" "
        icon={country}
        type="select"
        value={values.nationality}
        handleChange={handleChange}
        placeHolder={t('countryInput')}
        options={countryOptions}
        full={true}
      />
      <FormRow
        name="work"
        icon={profession}
        label=" "
        type="text"
        value={values.work}
        high={false}
        placeHolder={t('positionInput')}
        handleChange={handleChange}
        full={true}
      />
      <button
        disabled={isLoading}
        className="btn btn-block rounded-full text-white w-inherit hover:bg-newRed hover:text-white text-xl bg-newRed my-2"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-lg text-white"></span>
        ) : (
          t('saveChangesText')
        )}
      </button>
      <Link
        to="/profile/changePassword"
        className="btn btn-block rounded-full text-black w-inherit  text-xl bg-transparent  my-2"
      >
        {t('changePassword')}
      </Link>
    </form>
  );
};

export default UserForm;
