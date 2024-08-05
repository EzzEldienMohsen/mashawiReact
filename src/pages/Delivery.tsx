import React from 'react';
import { Policy } from '../components';
import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { DeliveryQueryParams, StaticRequestData } from '../assets/types';



const deliveryQuery = (language: string): DeliveryQueryParams => {
  return {
    queryKey: ['delivery', language],
    queryFn: () =>
      autoFetch(`/website/shipping-policy`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<StaticRequestData> => {
    const data = await queryClient.ensureQueryData(deliveryQuery(language));
    return data;
  };

const Delivery: React.FC = () => {
  const { t } = useTranslation();
  const data = useLoaderData() as StaticRequestData;
  console.log(data)
  return <Policy title={t('deliveryPolicyRoute')} data={data} />;
};

export default Delivery;
