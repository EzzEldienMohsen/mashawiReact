import React from 'react';
import { Policy } from '../components';
import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DeliveryQueryParams, StaticRequestData } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const paymentQuery = (language: string): DeliveryQueryParams => {
  return {
    queryKey: ['payment', language],
    queryFn: () =>
      autoFetch(`/website/payment-policy`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<StaticRequestData> => {
    const data = await queryClient.ensureQueryData(paymentQuery(language));
    return data;
  };

const Payment: React.FC = () => {
  const { t } = useTranslation();
  const axiosData: any = useLoaderData();
  const data: StaticRequestData = axiosData.data;
  console.log(data);
  return <Policy title={t('paymentPolicyRoute')} data={data} />;
};

export default Payment;
