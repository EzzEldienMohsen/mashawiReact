import React from 'react';
import { MainSlider, MenuCard, SectionTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';
import { MealData, Meals } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

interface MealsQuery {
  queryKey: string[];
  queryFn: () => Promise<Meals>;
}

const mealsQuery = (language: string, id?: string): MealsQuery => {
  if (id) {
    console.log(id);
    return {
      queryKey: ['meals', language, id],
      queryFn: () =>
        autoFetch(`/meals/category/${id}?limit=4`, {
          headers: {
            lang: language,
          },
        }),
    };
  } else {
    return {
      queryKey: ['meals', language],
      queryFn: () =>
        autoFetch(`/meals?limit=4`, {
          headers: {
            lang: language,
          },
        }),
    };
  }
};
export const loader =
  (queryClient: QueryClient, language: string, id?: string) =>
  async (): Promise<Meals> => {
    console.log(id);
    const data = await queryClient.ensureQueryData(mealsQuery(language, id));
    return data;
  };

const MainMenu: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: MealData = axiosData.data2.data.data.data;
  const { t } = useTranslation();

  if (!data) {
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  return (
    <div className="flex py-4 lg:py-16 justify-center w-full bg-[#F5F5F5] items-center 2xl:gap-y-10 flex-col px-8 lg:px-[220px]">
      <SectionTitle title={t('menuSectionTitle')} />
      <MainSlider />
      <MenuCard data={data} />
    </div>
  );
};

export default MainMenu;
