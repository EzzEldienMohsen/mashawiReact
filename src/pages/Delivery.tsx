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
  const axiosData: any = useLoaderData();
  const data: StaticRequestData = axiosData.data;
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    if (!data) {
      return (
        <div className="flex w-full py-8 justify-center items-center">
          <span className="loading loading-spinner loading-lg text-newRed"></span>
        </div>
      );
    }
  return <Policy title={t('deliveryPolicyRoute')} data={data} />;
};

export default Delivery;
