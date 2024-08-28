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
const mealsCategoryQuery = (
  language: string,
  page: string,
  cat: string
): MealsQuery => {
  return {
    queryKey: ['meals', language, page, cat],
    queryFn: () =>
      autoFetch(
        `https://mshawy.trendline.marketing/api/v1/meals/category/${cat}?limit=20&page=${page}`,
        {
          headers: {
            lang: language,
          },
        }
      ),
  };
};

export const loader =
  (queryClient: QueryClient, language: string, page: string, cat: string) =>
  async (): Promise<Meals> => {
    const data = await queryClient.ensureQueryData(
      mealsCategoryQuery(language, page, cat)
    );
    return data;
  };
const MenuWithCategory: React.FC = () => {
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
    <div className="flex justify-center w-full items-center 2xl:gap-y-10 flex-col px-8 lg:px-[220px]">
      <SectionTitle title={t('menuSectionTitle')} />
      <Slider />
      <MenuCard data={data} />
    </div>
  );
};

export default MenuWithCategory;
