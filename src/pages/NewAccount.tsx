import React from 'react';
import src from '../assets/MenuSectionLanding.png';
import { RegistrationForm } from '../components';
const NewAccount: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:flex-row md:justify-evenly gap-x-8 px-8 lg:px-[220px] py-8">
      <div className=" md:w-1/2 w-full flex flex-col justify-center items-center">
        <RegistrationForm />
        {/* <LoginLinks /> */}
      </div>
      <img src={src} alt="img" className="md:w-2/5 l" />
    </div>
  );
};

export default NewAccount;
