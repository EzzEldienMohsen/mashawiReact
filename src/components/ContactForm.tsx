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
import { ContactInitialValues } from '../assets/types';

const request = async (data: ContactInitialValues) => {
  try {
    const resp = await autoFetch.post('', data);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
};

const ContactForm: React.FC<{ title: string }> = ({ title }) => {
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
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(values);
    request(values);
  };

  return (
    <div className="w-full relative flex flex-col  justify-center  items-center my-6 px-8 lg:px-20">
      {/* SVG background at the bottom */}
      <div className="absolute bottom-0 h-full  w-4/5 p-3 bg-svg-background bg-contain bg-no-repeat bg-bottom"></div>
      <div className="w-1/2 p-3 flex justify-center items-center bg-[#F4F4F4]  flex-col z-10 ">
        <h1 className="text-black mb-6 font-bold text-xl md:text-2xl tracking-wide">
          {title}
        </h1>
        <form
          method="post"
          onSubmit={onSubmit}
          className="flex flex-col w-full gap-y-2 md:gap-y-3 lg:gap-y-4 justify-start  md:justify-evenly items-center lg:border-0 lg:shadow-none px-3 py-2 rounded-2xl shadow-2xl"
        >
          <FormRow
            name="name"
            icon={name}
            label=" "
            type="text"
            value={values.name}
            high={false}
            placeHolder={t('nameInputPlaceHolder')}
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
            name="mobile"
            icon={phone}
            label=" "
            type="text"
            high={false}
            value={values.mobile}
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
          <button className="btn text-white btn-block md:w-1/2 hover:bg-newRed hover:text-white text-xl rounded-full bg-newRed my-2">
            {t('sendText')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
