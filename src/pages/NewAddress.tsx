import React from 'react';
import { useTranslation } from 'react-i18next';
import { newAddressInitialValues } from '../assets';
import { FormRow, FormTextArea } from '../subComponents';
import add from '../assets/svg/newAddress/address.svg';
import mob from '../assets/svg/newAddress/mobile.svg';
import { CreateAddressReq } from '../features/address/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useDispatch } from 'react-redux';
import { createAddress } from '../features/address/addressSlice';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const NewAddress: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLoading } = useTypedSelector((state: RootState) => state.address);
  const { isLangArabic } = useGlobalContext();
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [values, setValues] = React.useState<CreateAddressReq>({
    ...newAddressInitialValues,
    phone: user.user.phone,
  });
  const dispatch: AppDispatch = useDispatch();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

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

  const newAddressSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('addressNameIsTooShort'), function (value) {
        return !value || value.length >= 2;
      }),
    details: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('addressDetailsIsTooShort'), function (value) {
        return !value || value.length >= 2;
      }),
    phone: Yup.string()
      .required(t('isRequiredError'))
      .test('phone-format', t('correctPhoneNumber'), function (value) {
        const egyptUaePhoneRegex =
          /^((\+20|0)?1[0125][0-9]{8}$)|((\+971|0)?5[024568][0-9]{7}$)/;
        return !value || egyptUaePhoneRegex.test(value);
      }),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await newAddressSchema.validate(values, { abortEarly: false });
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
    await dispatch(createAddress({ reqData: values, token, language }));
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
        {errors.name && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.name}
          </p>
        )}
        <FormTextArea
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
        {errors.details && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.details}
          </p>
        )}
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
        {errors.phone && (
          <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
            {errors.phone}
          </p>
        )}
        <button
          disabled={isLoading}
          onSubmit={onSubmit}
          className="btn text-white btn-block  hover:bg-newRed hover:text-white  rounded-full bg-newRed my-2 min-h-[46px] lg:min-h-[56px] h-auto text-sm lg:text-2xl"
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

export default NewAddress;
