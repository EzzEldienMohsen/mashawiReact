import React from 'react';
import src from '../assets/MenuSectionLanding.png';
import { LoginLinks, RegistrationForm } from '../components';
const NewAccount:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:flex-row md:justify-evenly px-4 lg:px-8 py-8">
      <div className=" md:w-2/5 lg:w-1/2 p-5 w-full flex flex-col justify-center items-center">
        <RegistrationForm />
        <LoginLinks />
      </div>
      <img src={src} alt="img" className="md:w-2/5 lg:w-1/2" />
    </div>
  );
};

export default NewAccount;
