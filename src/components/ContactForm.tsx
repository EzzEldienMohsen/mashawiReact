import React from 'react';
import { contactInitialValues } from '../assets';
import { autoFetch } from '../utils';
import { FormRow, FormTextArea } from '../subComponents';
import name from '../assets/svg/person.svg';
import mail from '../assets/svg/email.svg';
import phone from '../assets/svg/mobile.svg';
import subject from '../assets/svg/subject.svg';
import message from '../assets/svg/message.svg';
import { useTranslation } from 'react-i18next';
import { ApiResponse, ContactInitialValues } from '../assets/types';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/GlobalContext';
import * as Yup from 'yup';

const request = async (
  data: ContactInitialValues,
  destination: string,
  language: string
): Promise<ApiResponse> => {
  try {
    const resp = await autoFetch.post(`/${destination}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        lang: language,
      },
    });
    toast.success(resp.data.message);
    return resp;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return error;
  }
};

const ContactForm: React.FC<{ title: string; destination: string }> = ({
  title,
  destination,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const { t } = useTranslation();
  const [values, setValues] =
    React.useState<ContactInitialValues>(contactInitialValues);

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
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const sendFromSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('nameIsTooShort'), function (value) {
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
    subject: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('subjectIsTooShort'), function (value) {
        return !value || value.length >= 4;
      }),
    message: Yup.string()
      .required(t('isRequiredError'))
      .test('name-length', t('messageIsTooShort'), function (value) {
        return !value || value.length >= 16;
      }),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await sendFromSchema.validate(values, { abortEarly: false });
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
    setIsLoading(true);
    const isFormValid = await validateForm();
    if (!isFormValid) {
      setIsLoading(false);
      return;
    }

    const response = await request(values, destination, language);
    if (response.status === 200) {
      setIsLoading(false);
      setValues(contactInitialValues);
    }
  };

  return (
    <div className="w-full relative flex flex-col justify-center items-center my-6 px-8 lg:px-20">
      <div className="absolute bottom-0 h-full w-full lg:w-4/5 2xl:w-full p-3 bg-svg-background bg-contain 2xl:bg-auto 2xl:fill  bg-no-repeat bg-bottom"></div>
      <div className="w-full md:w-4/5 lg:w-1/2 2xl:w-2/5 p-3  py-[68px] flex justify-center items-center bg-[#f4f4f4] flex-col z-10">
        <h1 className="text-black mb-6 font-bold text-xl md:text-2xl 2xl:text-4xl tracking-wide">
          {title}
        </h1>
        <form
          method="post"
          onSubmit={onSubmit}
          className="flex flex-col w-full gap-y-2 md:gap-y-3 lg:gap-y-5  justify-start md:justify-evenly items-center lg:border-0 lg:shadow-none px-3 py-2 rounded-2xl shadow-2xl"
        >
          <FormRow
            name="name"
            icon={name}
            label=" "
            type="text"
            value={values.name}
            high={false}
            placeHolder={t('contactNameInputPlaceHolder')}
            handleChange={handleChange}
            full={true}
          />
          {errors.name && (
            <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
              {errors.name}
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
            name="phone"
            icon={phone}
            label=" "
            type="tel"
            high={false}
            value={values.phone}
            placeHolder={t('mobileInputPlaceHolder')}
            handleChange={handleChange}
            full={true}
          />
          {errors.phone && (
            <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
              {errors.phone}
            </p>
          )}
          <FormRow
            name="subject"
            icon={subject}
            label=" "
            type="text"
            high={false}
            value={values.subject}
            placeHolder={t('subjectInputPlaceHolder')}
            handleChange={handleChange}
            full={true}
          />
          {errors.subject && (
            <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
              {errors.subject}
            </p>
          )}
          <FormTextArea
            name="message"
            icon={message}
            label=" "
            type="textarea"
            high={true}
            value={values.message}
            placeHolder={t('textAreaInputPlaceHolder')}
            handleChange={handleChange}
            full={true}
            isBorder={true}
          />
          {errors.message && (
            <p className="text-newRed mr-3 w-full text-start text-xs md:text-sm lg:text-sm 2xl:text-md">
              {errors.message}
            </p>
          )}
          <button
            disabled={isLoading}
            className="btn text-white  btn-block md:w-1/2 hover:bg-newRed hover:text-white text-lg 2xl:text-2xl 2xl:py-2 min-h-[46px] 2xl:min-h-[58px] :h-auto rounded-full bg-newRed my-2"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-lg text-white"></span>
            ) : (
              t('sendText')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
