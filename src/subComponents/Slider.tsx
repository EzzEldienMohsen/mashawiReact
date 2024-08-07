import React from 'react';
import { Categories, CategoriesData } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
interface CategoriesQuery {
  queryKey: string[];
  queryFn: () => Promise<Categories>;
}

const categoryQuery = (language: string): CategoriesQuery => {
  return {
    queryKey: ['category', language],
    queryFn: () =>
      autoFetch('/categories', {
        headers: {
          lang: language,
          limit: 20,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<Categories> => {
    const data = await queryClient.ensureQueryData(categoryQuery(language));
    return data;
  };

const Slider: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: CategoriesData = axiosData.data.data.data;
  console.log(data);
  return (
    <div className="carousel rounded-box flex overflow-x-auto space-x-4 py-4">
      {data.map((category) => (
        <Link
          to=""
          key={category.id}
          className="carousel-item flex-shrink-0 w-14 h-14 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-transparent rounded-2xl shadow-md flex flex-col items-center justify-center mx-1"
        >
          <img
            src={category.icon}
            alt={category.name}
            className="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-1 md:mb-2"
          />
          <span className="text-newRed text-[10px] md:text-sm lg:text-base">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Slider;
