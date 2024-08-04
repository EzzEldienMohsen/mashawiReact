import React from 'react';
import { AboutExcellence,  SidePageHero } from '../components';
import img from '../assets/about us photo.png';
import { autoFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeliveryQueryParams } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const aboutQuery = (language:string) :DeliveryQueryParams => {
  return {
    queryKey: ['about', language],
    queryFn: () =>
      autoFetch(`/website/about`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader = (queryClient:QueryClient, language:string) => async ():Promise<any> => {
  const data = await queryClient.ensureQueryData(aboutQuery(language));
  return data;
};

const About:React.FC = () => {
  const { data } = useLoaderData() as any;
  const { t } = useTranslation();
  console.log(data);
  return (
    <div className="w-full ">
      <SidePageHero
        img={img}
        primaryText={t('aboutPageTitle')}
        secondaryText={t('aboutPageText')}
      />
      <AboutExcellence />
      {/* <AboutWhy /> */}
    </div>
  );
};

export default About;
