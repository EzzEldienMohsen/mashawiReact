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

    return data;
  };

const Privacy: React.FC = () => {
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
  return (
    <>
      <Policy title={t('PrivacyPolicyRoute')} data={data} />
    </>
  );
};

export default Privacy;
