import React from 'react';
import { Policy } from '../components';
import { privacyPolicy } from '../assets';
import { autoFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeliveryQueryParams } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const privacyQuery = (language: string): DeliveryQueryParams => {
  return {
    queryKey: ['privacy', language],
    queryFn: () =>
      autoFetch(`/website/privacy-policy`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader = (queryClient:QueryClient, language:string) => async ():Promise<any> => {
  const data = await queryClient.ensureQueryData(privacyQuery(language));
  return data;
};

const Privacy:React.FC = () => {
  const { data } = useLoaderData() as any;
  const { t } = useTranslation();
  return (
    <>
      <Policy title={t('PrivacyPolicyRoute')} policies={privacyPolicy} />
    </>
  );
};

export default Privacy;
