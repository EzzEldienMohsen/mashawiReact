import React from 'react';
import facebook from '../assets/svg/facebookFooter.svg';
import twitter from '../assets/svg/twitterFooter.svg';
import linkedin from '../assets/svg/linkedinFooter.svg';
import instagram from '../assets/svg/instagramFooter.svg';
import { useTranslation } from 'react-i18next';
const FooterFirstColumn: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center lg:items-start md:w-4/5 lg:w-2/5">
      <p className="pb-2  text-md md:text-xl font-abdo mb-4 py-8 text-center lg:text-start 2xl:text-lg">
        {t('footerMainText')}
      </p>
      <div className="flex justify-center gap-x-6 lg:justify-start  items-center w-full lg:w-2/5 flex-row my-2">
        <a href="https://www.google.com/" target="__blank">
          <img src={twitter} alt="img" className="2xl:w-5 2xl:h-5" />
        </a>
        <a href="https://www.google.com/" target="__blank">
          <img src={facebook} alt="img" className="2xl:w-5 2xl:h-5" />
        </a>
        <a href="https://www.google.com/" target="__blank">
          <img src={instagram} alt="img" className="2xl:w-5 2xl:h-5" />
        </a>
        <a href="https://www.google.com/" target="__blank">
          <img src={linkedin} alt="img" className="2xl:w-5 2xl:h-5" />
        </a>
      </div>
    </div>
  );
};

export default FooterFirstColumn;
