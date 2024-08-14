import React from 'react';
import { Policy } from '../components';
import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DeliveryQueryParams, StaticRequestData } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

const termsQuery = (language: string): DeliveryQueryParams => {
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

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<StaticRequestData> => {
    const data = await queryClient.ensureQueryData(termsQuery(language));
    return data as StaticRequestData;
  };

const Terms: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: StaticRequestData = axiosData.data;
  const { t } = useTranslation();
  return <Policy title={t('termsPageTitle')} data={data} />;
};

export default Terms;
