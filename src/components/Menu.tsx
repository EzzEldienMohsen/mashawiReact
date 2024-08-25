import React from 'react';
import { MenuCard, SectionTitle, Slider } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { MealData, Meals } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

interface MealsQuery {
  queryKey: string[];
  queryFn: () => Promise<Meals>;
}

const mealsQuery = (language: string, page: string): MealsQuery => {
  return {
    queryKey: ['meals', language, page],
    queryFn: () =>
      autoFetch(`/meals?limit=1&page=${page}`, {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string, page: string) =>
  async (): Promise<Meals> => {
    const data = await queryClient.ensureQueryData(mealsQuery(language, page));
    return data;
  };

const Menu: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: MealData = axiosData.data2.data.data.data;
  const { t } = useTranslation();
  return (
    <div className="flex justify-center w-full bg-[#F5F5F5] items-center flex-col 2xl:gap-y-10 px-8 lg:px-20 2xl:px-20">
      <SectionTitle title={t('menuSectionTitle')} />
      <Slider />
      <MenuCard data={data} />
    </div>
  );
};

export default Menu;
