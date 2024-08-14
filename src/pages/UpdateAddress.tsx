import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow } from '../subComponents';
import add from '../assets/svg/newAddress/address.svg';
import mob from '../assets/svg/newAddress/mobile.svg';
import ph from '../assets/svg/newAddress/phone.svg';
import { AddressData } from '../features/address/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddress, updateAddress } from '../features/address/addressSlice';
import { toast } from 'react-toastify';

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const UpdateAddress: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLoading, address } = useTypedSelector(
    (state: RootState) => state.address
  );
  const { isLangArabic } = useGlobalContext();
  const { id } = useParams<{ id: string }>();
  const item = address.find((add) => add.id.toString() === id) || {
    id: 0,
    name: '',
    details: '',
    phone: '',
    landing_phone: '',
    created_at: '',
  };
  const navigate = useNavigate();
  const [values, setValues] = React.useState<AddressData>(item);
  const dispatch: AppDispatch = useDispatch();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validatePhoneNumber = (phoneNumber: string): boolean => {
  //   const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international format
  //   return phoneRegex.test(phoneNumber);
  // };
  const handleValidation = React.useCallback(
    debounce((name: string, value: string) => {
      if (name === 'email' && !validateEmail(value)) {
        toast.error(t('invalidEmailAddress'));
        return;
      }
      // if (name === 'phone' && !validatePhoneNumber(value)) {
      //   toast.error('Invalid phone number');
      //   return;
      // }
    }, 3000),
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
    await dispatch(
      updateAddress({ id: `${item.id}`, reqData: values, token, language })
    );
    await dispatch(getAddress({ token, language }));
    navigate('/profile/address');
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
          name="name"
          icon={add}
          label=" "
          type="text"
          value={values.name}
          high={false}
          placeHolder={t('addressName')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="details"
          icon={add}
          label=" "
          type="text"
          value={values.details}
          high={false}
          placeHolder={t('addressDetails')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="phone"
          icon={mob}
          label=" "
          type="tel"
          value={values.phone}
          high={false}
          placeHolder={t('mobileNumber')}
          handleChange={handleChange}
          full={true}
        />
        <FormRow
          name="landing_phone"
          icon={ph}
          label=" "
          type="tel"
          value={values.landing_phone}
          high={false}
          placeHolder={t('phoneNumber')}
          handleChange={handleChange}
          full={true}
        />
        <button
          disabled={isLoading}
          onSubmit={onSubmit}
          className="btn text-white btn-block  hover:bg-newRed hover:text-white text-xl rounded-full bg-newRed my-2"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-lg text-white"></span>
          ) : (
            t('save')
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateAddress;
