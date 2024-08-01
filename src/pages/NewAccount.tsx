import React from 'react';
import src from '../assets/MenuSectionLanding.png';
import { LoginLinks, RegistrationForm } from '../components';
const NewAccount:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-evenly px-4 lg:px-8 py-8">
      <div className="md:w-2/5 p-5 w-full flex flex-col justify-center items-center">
        <RegistrationForm />
        <LoginLinks />
      </div>
      <img src={src} alt="img" className=" md:w-[350px] lg:w-2/5 p-4" />
    </div>
  );
};

export default NewAccount;
