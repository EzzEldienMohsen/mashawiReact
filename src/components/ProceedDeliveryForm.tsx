import React from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import { FormRow, FormTextArea, ProceedTotals } from '../subComponents';
import { IconFormRow } from '../subSubComponents';
import src from '../assets/svg/proceed/discount.svg';
import { Link } from 'react-router-dom';
import { addressOptions } from '../assets';

interface ProceedPageProps {
  text: string;
  discount: string;
  payment: string;
  address: string;
}

const initialValues: ProceedPageProps = {
  text: '',
  discount: '',
  payment: '',
  address: '',
};

const ProceedDeliveryForm: React.FC = () => {
  const [values, setValues] = React.useState<ProceedPageProps>(initialValues);
  const [checked, setChecked] = React.useState<string | null>(null);

  // const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    if (checked === 'checkbox1') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        payment: 'cash',
      }));
    } else if (checked === 'checkbox2') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        payment: 'online',
      }));
    }
  };

  const handleCheckboxChange = (checkbox: string) => {
    setChecked(checked === checkbox ? null : checkbox);
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    localStorage.setItem('registerData', JSON.stringify(values));
  };

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-8 lg:px-20">
      <form
        onSubmit={onSubmit}
        method="POST"
        className="flex flex-col justify-start items-start gap-y-6 w-full"
      >
        {/* Text Area */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <FormTextArea
            type="textarea"
            name="text"
            label={t('notes')}
            handleChange={handleChange}
            placeHolder={t('formInstructions')}
            high={true}
            full={true}
            value={values.text}
          />
        </div>

        {/* Address */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('add')}
          </h1>
          <div className="flex flex-col gap-y-4 md:gap-x-2 md:flex-row md:justify-between w-full lg:w-3/5">
            <FormRow
              name="address"
              label=" "
              type="select"
              value={values.address}
              handleChange={handleChange}
              placeHolder={t('genderInput')}
              options={addressOptions}
             full={true}
            />
            <button
              type="submit"
              className="bg-newRed w-full md:w-1/2 lg:w-3/5 text-white lg:text-xs py-2 px-6 rounded-2xl mt-4 font-semibold"
            >
              {t('newAdd')}
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('paymentMethod')}
          </h1>
          <label className="flex items-center gap-x-4 mb-2">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 appearance-none checked:bg-black checked:border-transparent"
              checked={checked === 'checkbox1'}
              onChange={() => handleCheckboxChange('checkbox1')}
            />
            <p className="text-lg font-abdo">{t('checkboxText1')}</p>
          </label>
          <label className="flex items-center gap-x-4">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 appearance-none checked:bg-black checked:border-transparent"
              checked={checked === 'checkbox2'}
              onChange={() => handleCheckboxChange('checkbox2')}
            />
            <p className="text-lg font-abdo">{t('checkboxText2')}</p>
          </label>
        </div>

        {/* Coupon */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('discount')}
          </h1>
          <div className="flex flex-col gap-y-4 md:gap-x-2 md:flex-row md:justify-between w-full lg:w-3/5">
            <IconFormRow
              name="discount"
              handleChange={handleChange}
              icon={src}
              value={values.discount}
              label=" "
              type="text"
              placeHolder={t('coupon')}
            />
            <div className="flex justify-between items-center gap-x-2 w-full md:w-1/2">
              <button
                type="submit"
                className="bg-newRed w-full md:w-1/2 lg:w-auto text-white py-2 px-6 rounded-2xl mt-4 font-semibold"
              >
                {t('usage')}
              </button>
              <Link
                to="/menu"
                className="bg-bgColor w-full md:w-1/2 lg:w-auto text-black py-2 px-6 rounded-2xl mt-4 font-semibold text-center"
              >
                {t('cancellation')}
              </Link>
            </div>
          </div>
        </div>

        {/* Cart Totals */}
        <ProceedTotals />
      </form>
    </div>
  );
};

export default ProceedDeliveryForm;
