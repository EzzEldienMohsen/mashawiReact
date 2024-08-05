import React from 'react'
import google from "../assets/svg/googleLogin.svg"
import facebook from "../assets/svg/facebookLogin.svg"
import apple from "../assets/svg/appleLogin.svg"
import { useTranslation } from 'react-i18next';

const LoginLinks:React.FC = () => {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center my-4 w-full">
      <h1 className="text-black mb-2 font-semi-bold text-md md:text-lg tracking-wide">
        {t('signInLinksText')}
      </h1>
      <div className="flex justify-evenly items-center py-3 gap-3 w-full">
        <img src={apple} alt="icon" />
        <img src={facebook} alt="icon" />
        <img src={google} alt="icon" />
      </div>
    </div>
  );
}

export default LoginLinks