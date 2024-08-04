import React from 'react';
import { useTranslation } from 'react-i18next';
import { PrivacyPolicyElement } from '../assets/types';
interface PolicyProps {
    title:string;
    policies:PrivacyPolicyElement[]
}
const Policy:React.FC<PolicyProps> = ({ title, policies }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-[#2C2220] flex flex-col text-start  justify-start items-center py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {title}
        </h1>
      </div>
      <ul className="list-disc text-start w-full px-8 lg:px-20   mb-6">
        {policies.map((po) => {
          return (
            <li
              key={po.id}
              className="my-4 text-sm md:text-md lg:text-md font-normal text-start"
            >
              {t(po.text)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Policy;
