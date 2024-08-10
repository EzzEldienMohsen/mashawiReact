import React from 'react';
import { NewAddressValues } from '../assets/types';
import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { newAddressInitialValues } from '../assets';
import { FormRow } from '../subComponents';
import add from '../assets/svg/newAddress/address.svg';
import mob from '../assets/svg/newAddress/mobile.svg';
import ph from '../assets/svg/newAddress/phone.svg';

const request = async (data: NewAddressValues) => {
  try {
    const resp = await autoFetch.post('', data);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};

const NewAddress: React.FC = () => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<NewAddressValues>(
    newAddressInitialValues
  );
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
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
    <div className="flex flex-col justify-center items-center gap-y-4 w-full md:w-4/5 lg:w-3/4 px-8 lg:px-20">
      <h1 className="text-black text-lg md:text-xl lg:text-2xl font-abdo font-semibold">
        {t('newAddress')}
      </h1>
      <form
        method="POST"
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-y-2 w-full"
      >
        <FormRow
          name="addressName"
          icon={add}
          label=" "
          type="text"
          value={values.addressName}
          high={false}
          placeHolder={t('addressName')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="addressDetails"
          icon={add}
          label=" "
          type="text"
          value={values.addressDetails}
          high={false}
          placeHolder={t('addressDetails')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="mobileNumber"
          icon={mob}
          label=" "
          type="text"
          value={values.mobileNumber}
          high={false}
          placeHolder={t('mobileNumber')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="phoneNumber"
          icon={ph}
          label=" "
          type="text"
          value={values.phoneNumber}
          high={false}
          placeHolder={t('phoneNumber')}
          handleChange={handleChange}
          full={true}
        />
        <button
          onSubmit={onSubmit}
          className="btn text-white btn-block  hover:bg-newRed hover:text-white text-xl rounded-full bg-newRed my-2"
        >
          {t('save')}
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
