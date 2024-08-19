import React, { useState, useCallback } from 'react';
import { contactInitialValues } from '../assets';
import { autoFetch } from '../utils';
import { FormRow, FormTextArea } from '../subComponents';
import name from '../assets/svg/person.svg';
import mail from '../assets/svg/email.svg';
import phone from '../assets/svg/mobile.svg';
import subject from '../assets/svg/subject.svg';
import message from '../assets/svg/message.svg';
import { useTranslation } from 'react-i18next';
import { ContactInitialValues } from '../assets/types';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/GlobalContext';

const request = async (
  data: ContactInitialValues,
  destination: string,
  language: string
) => {
  try {
    const resp = await autoFetch.post(`/${destination}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        lang: language,
      },
    });
    toast.success(resp.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const ContactForm: React.FC<{ title: string; destination: string }> = ({
  title,
  destination,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validatePhoneNumber = (phoneNumber: string): boolean => {
  //   const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international format
  //   return phoneRegex.test(phoneNumber);
  // };

  const { t } = useTranslation();
  const [values, setValues] =
    useState<ContactInitialValues>(contactInitialValues);

  const handleValidation = useCallback(
    debounce((name: string, value: string) => {
      if (name === 'email' && !validateEmail(value)) {
        toast.error(t('invalidEmailAddress'));
        return;
      }
    }, 2000),
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
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    await request(values, destination, language);
    setIsLoading(false);
    setValues(contactInitialValues);
  };

  return (
    <div className="w-full relative flex flex-col justify-center items-center my-6 px-8 lg:px-20">
      <div className="absolute bottom-0 h-full w-4/5 p-3 bg-svg-background bg-contain bg-no-repeat bg-bottom"></div>
      <div className="w-full lg:w-1/2 p-3 flex justify-center items-center bg-[#f4f4f4] flex-col z-10">
        <h1 className="text-black mb-6 font-bold text-xl md:text-2xl tracking-wide">
          {title}
        </h1>
        <form
          method="post"
          onSubmit={onSubmit}
          className="flex flex-col w-full gap-y-2 md:gap-y-3 lg:gap-y-4 justify-start md:justify-evenly items-center lg:border-0 lg:shadow-none px-3 py-2 rounded-2xl shadow-2xl"
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
          <button
            disabled={isLoading}
            className="btn text-white btn-block md:w-1/2 hover:bg-newRed hover:text-white text-xl rounded-full bg-newRed my-2"
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
