import React from 'react'
import { Policy } from '../components';
import { privacyPolicy } from '../assets';
import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DeliveryQueryParams } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const termsQuery = (language:string):DeliveryQueryParams => {
  return {
    queryKey: ['terms', language],
    queryFn: () =>
      autoFetch(`/website/terms`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader = (queryClient:QueryClient, language:string) => async ():Promise<any> => {
  const data = await queryClient.ensureQueryData(termsQuery(language));
  return data;
};

const Terms:React.FC = () => {
  const {data} = useLoaderData() as any;
  console.log(data)
  const {t} =useTranslation()
  return <Policy title={t('termsPageTitle')} policies={privacyPolicy} />;
}

export default Terms