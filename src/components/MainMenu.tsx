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

const mealsQuery = (language: string): MealsQuery => {
  return {
    queryKey: ['meals', language],
    queryFn: () =>
      autoFetch(`/meals?limit=12`, {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) => async (): Promise<Meals> => {
    const data = await queryClient.ensureQueryData(mealsQuery(language));
    return data;
  };

const MainMenu: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: MealData = axiosData.data2.data.data.data;
  const { t } = useTranslation();
  const [mainData, setMainData] = React.useState<MealData>(data);
  return (
    <div className="flex py-4 lg:py-16 justify-center w-full bg-[#F5F5F5] items-center 2xl:gap-y-10 flex-col px-8 lg:px-20">
      <SectionTitle title={t('menuSectionTitle')} />
      <MainSlider mainData={data} setMainData={setMainData} />
      <MenuCard data={mainData} />
    </div>
  );
};

export default MainMenu;
