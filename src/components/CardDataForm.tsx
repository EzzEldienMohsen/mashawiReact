import React from 'react';
import { autoFetch } from '../utils';
import { cardInitialValues } from '../assets';
import { CardData } from '../assets/types';
import { useTranslation } from 'react-i18next';
import { FormRow } from '../subComponents';

const request = async (data: CardData) => {
  try {
    const resp = await autoFetch.post('', data);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};
const CardDataForm: React.FC = () => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<CardData>(cardInitialValues);
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
    <form
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col justify-center gap-y-4 items-start w-full"
    >
      <div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:gap-x-5">
        <FormRow
          name="cardNumber"
          label={t('cardNumber')}
          type="text"
          value={values.cardNumber}
          high={false}
          placeHolder={t('cardPlaceHolder')}
          handleChange={handleChange}
          half={true}
        />
        <FormRow
          name="cardHolderName"
          label={t('cardNumber')}
          type="text"
          value={values.cardHolderName}
          high={false}
          placeHolder={t('cardPlaceHolder')}
          handleChange={handleChange}
          half={true}
        />
      </div>
    </form>
  );
};

export default CardDataForm;
