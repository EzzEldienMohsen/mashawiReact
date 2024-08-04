import React from 'react';
import { countryOptions, genderOptions, initialProfileValues } from '../assets';
import person from '../assets/svg/person.svg';
import mobile from '../assets/svg/mobile.svg';
import mail from '../assets/svg/email.svg';
import date from '../assets/svg/date.svg';
import gender from '../assets/svg/gender.svg';
import country from '../assets/svg/country.svg';
import profession from '../assets/svg/Profession.svg';
import { FormRow } from '../subComponents';
import { autoFetch } from '../utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InitialProfileValues } from '../assets/types';

const request = async (data:InitialProfileValues) => {
  try {
    const resp = await autoFetch.post('', data);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};

const UserForm:React.FC = () => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<InitialProfileValues>(initialProfileValues);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) :void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(values);
    request(values);
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="flex flex-col w-full lg:w-1/2 justify-start md:justify-evenly items-center lg:justify-center lg:shadow-none px-6 py-2 rounded-2xl shadow-2xl"
    >
      <FormRow
        name="firstName"
        icon={person}
        label=" "
        type="text"
        value={values.firstName}
        high={false}
        placeHolder={t('nameInputPlaceHolder')}
        handleChange={handleChange}
        full={true}
      />
      <FormRow
        name="lastName"
        icon={person}
        label=" "
        type="text"
        value={values.lastName}
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
        name="birthDate"
        label=" "
        icon={date}
        type="date"
        value={values.birthDate}
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
        name="country"
        label=" "
        icon={country}
        type="select"
        value={values.country}
        handleChange={handleChange}
        placeHolder={t('countryInput')}
        options={countryOptions}
        full={true}
      />
      <FormRow
        name="profession"
        icon={profession}
        label=" "
        type="text"
        value={values.profession}
        high={false}
        placeHolder={t('positionInput')}
        handleChange={handleChange}
        full={true}
      />
      <button className="btn btn-block rounded-full text-white w-inherit hover:bg-newRed hover:text-white text-xl bg-newRed my-2">
        {t('saveChangesText')}
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
