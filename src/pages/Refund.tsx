import React from 'react';
import { Policy } from '../components';
import { privacyPolicy } from '../assets';
import { autoFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeliveryQueryParams } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const refundQuery = (language:string):DeliveryQueryParams => {
  return {
    queryKey: ['refund', language],
    queryFn: () =>
      autoFetch(`/website/return-policy`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader = (queryClient:QueryClient, language:string) => async () :Promise<any> => {
  const data = await queryClient.ensureQueryData(refundQuery(language));
  return data;
};

const Refund:React.FC = () => {
  const { data } = useLoaderData() as any;
  console.log(data);
  const { t } = useTranslation();
  return <Policy title={t('refundPageTitle')} policies={privacyPolicy} />;
};

export default Refund;
