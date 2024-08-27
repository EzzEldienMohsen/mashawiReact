import React from 'react';
import { FooterFirstColumn } from '../subComponents';
import { Link, useLoaderData } from 'react-router-dom';
import logo from '../assets/svg/header/whiteLogo.svg';
import { useTranslation } from 'react-i18next';
import { links } from '../assets';
import { MenuResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
interface MenuQuery {
  queryKey: string[];
  queryFn: () => Promise<MenuResponse>;
}

const menuQuery = (language: string): MenuQuery => {
  return {
    queryKey: ['food-menu', language],
    queryFn: () =>
      autoFetch('food-menu', {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<MenuResponse> => {
    const data = await queryClient.ensureQueryData(menuQuery(language));
    return data;
  };

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const axiosData: any = useLoaderData();
  const data: MenuResponse = axiosData.data2.data;

  if (!data) {
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  return (
    <div className="bg-newRed text-white flex w-full flex-col justify-center lg:px-24 py-10 items-center lg:items-start ">
      <Link to="/">
        <img src={logo} alt="logo" className="2xl:w-20" />
      </Link>
      <div className="flex flex-col lg:flex-row w-full flex-wrap lg:justify-between   md:items-center ">
        <FooterFirstColumn />
        <ul className="hidden lg:grid lg:grid-cols-3 list-disc list-inside md:w-3/5 lg:w-[55%] mt-1">
          {links.map((li) => {
            const commonClassName =
              'my-1 ml-2 md:ml-1 text-xs font-abdo font-extralight md:text-xs lg:text-lg';

            if (li.text === 'downloadMenu') {
              return (
                <li key={li.text} className={commonClassName}>
                  <a
                    href={data.data.menu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    {t(li.text)}
                  </a>
                </li>
              );
            } else {
              return (
                <Link key={li.text} to={li.to}>
                  <li className={commonClassName}>{t(li.text)}</li>
                </Link>
              );
            }
          })}
        </ul>
      </div>
      <div className="mt-4 flex justify-center text-center  items-center w-full 2xl:text-lg py-4">
        {t('rights')}
      </div>
    </div>
  );
};

export default Footer;
