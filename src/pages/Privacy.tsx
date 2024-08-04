import React from 'react';
import { Policy } from '../components';
import { autoFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeliveryQueryParams, StaticRequestData } from '../assets/types';
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

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<StaticRequestData> => {
    const data = await queryClient.ensureQueryData(privacyQuery(language));
    return data as StaticRequestData;
  };

const Privacy: React.FC = () => {
  const { data } = useLoaderData() as StaticRequestData;
  const { t } = useTranslation();
  console.log(data);
  return (
    <>
      <Policy title={t('PrivacyPolicyRoute')} data={data} />
    </>
  );
};

export default Privacy;
