import React from 'react';
import { Policy } from '../components';
import { privacyPolicy } from '../assets';

import { autoFetch } from '../utils';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DeliveryQueryParams } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';


const paymentQuery = (language:string):DeliveryQueryParams => {
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

export const loader = (queryClient:QueryClient, language:string) => async ():Promise<any> => {
  const data = await queryClient.ensureQueryData(paymentQuery(language));
  return data;
};


const Payment:React.FC = () => {
const {t} = useTranslation()
const {data} = useLoaderData() as any;

  return <Policy title={t("paymentPolicyRoute")} policies={privacyPolicy} />;
};

export default Payment;
