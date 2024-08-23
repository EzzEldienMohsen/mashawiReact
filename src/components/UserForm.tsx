import React from 'react';
import { genderOptions } from '../assets';
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
import CustomSelect from '../subSubComponents/CustomSelect';
// Country library options
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import arLocale from 'i18n-iso-countries/langs/ar.json';
import * as Yup from 'yup';

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

const getCountryOptions = (lang: string) => {
  return Object.entries(countries.getNames(lang)).map(([code, name]) => ({
    value: code,
    label: name,
  }));
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
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const dispatch: AppDispatch = useDispatch();
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

  const userSchema = Yup.object().shape({
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
    birthdate: Yup.string()
      .required(t('isRequiredError'))
      .test('is-valid-birthdate', t('invalidBirthdateError'), function (value) {
        const parsedDate = new Date(value);
        const currentDate = new Date();
        return (
          !value || (!isNaN(parsedDate.getTime()) && parsedDate < currentDate)
        );
      }),
    gender: Yup.string()
      .required(t('isRequiredError'))
      .oneOf(
        genderOptions.map((option) => option.value),
        t('invalidSelect')
      ),
    nationality: Yup.string()
      .required(t('isRequiredError'))
      .oneOf(
        getCountryOptions(language).map((option) => option.value),
        t('invalidSelect')
      ),
    work: Yup.string()
      .required(t('isRequiredError'))
      .test('work-length', t('workIsTooShort'), function (value) {
        return !value || value.length >= 2;
      }),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await userSchema.validate(values, { abortEarly: false });
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
      {errors.f_name && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.f_name}
        </p>
      )}
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
      {errors.l_name && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.l_name}
        </p>
      )}
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
      {errors.phone && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.phone}
        </p>
      )}
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
      {errors.email && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.email}
        </p>
      )}
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
      {errors.birthdate && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.birthdate}
        </p>
      )}
      <CustomSelect
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
      {errors.gender && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.gender}
        </p>
      )}
      <CustomSelect
        name="nationality"
        label=" "
        icon={country}
        type="select"
        value={values.nationality}
        handleChange={handleChange}
        placeHolder={t('countryInput')}
        options={getCountryOptions(language)}
        full={true}
      />
      {errors.nationality && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.nationality}
        </p>
      )}
      {/* <FormRow
        name="nationality"
        label=" "
        icon={country}
        type="text"
        value={values.nationality}
        handleChange={handleChange}
        placeHolder={t('countryInput')}
        full={true}
      /> */}
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
      {errors.work && (
        <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
          {errors.work}
        </p>
      )}
      <button
        disabled={isLoading}
        className="btn btn-block rounded-full text-white w-inherit hover:bg-newRed hover:text-white  bg-newRed my-2 lg:my-4 min-h-[46px] lg:min-h-[56px] h-auto text-sm lg:text-2xl"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-lg text-white"></span>
        ) : (
          t('saveChangesText')
        )}
      </button>
      <Link
        to="/profile/changePassword"
        className="btn btn-block rounded-full text-black w-inherit bg-transparent  my-2 min-h-[46px] lg:min-h-[56px] h-auto text-sm lg:text-2xl"
      >
        {t('changePassword')}
      </Link>
    </form>
  );
};

export default UserForm;
