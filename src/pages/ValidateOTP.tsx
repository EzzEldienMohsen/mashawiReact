import React from 'react';
import src from '../assets/MenuSectionLanding.png';
import { OTPForm } from '../components';

const ValidateOTP: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:flex-row md:justify-evenly gap-x-8 px-8 lg:px-[220px] py-8">
      <div className=" md:w-1/2 w-full flex flex-col justify-center items-center">
        <OTPForm />
      </div>
      <img src={src} alt="img" className="md:w-2/5 " />
    </div>
  );
};

export default ValidateOTP;
