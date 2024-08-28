import React from 'react';
import { AboutExcellence, AboutWhy, SidePageHero } from '../components';
import img from '../assets/about us photo.png';
import { autoFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StaticRequestData } from '../assets/types';
import { QueryClient } from '@tanstack/react-query';

// const aboutQuery = (language: string): DeliveryQueryParams => {
//   return {
//     queryKey: ['about', language],
//     queryFn: () =>
//       autoFetch(`/website/about`, {
//         headers: {
//           lang: language,
//         },
//       }),
//   };
// };

// export const loader =
//   (queryClient: QueryClient, language: string) =>
//   async (): Promise<StaticRequestData> => {
//     const data = await queryClient.ensureQueryData(aboutQuery(language));
//     return data;
//   };

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<StaticRequestData> => {
    return await queryClient.ensureQueryData({
      queryKey: ['about', language],
      queryFn: () =>
        autoFetch('/website/about', { headers: { lang: language } }),
    });
  };

const About: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: StaticRequestData = axiosData.data;
  console.log(data);
  const { t } = useTranslation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full 2xl:gap-y-[75px]">
      <SidePageHero
        img={img}
        primaryText={t('aboutPageTitle')}
        secondaryText={t('aboutPageText')}
      />
      <AboutExcellence />
      <AboutWhy data={data.data} />
    </div>
  );
};

export default About;
