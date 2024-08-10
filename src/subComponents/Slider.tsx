import React from 'react';
import { Categories, CategoriesData } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

interface CategoriesQuery {
  queryKey: string[];
  queryFn: () => Promise<Categories>;
}

const categoryQuery = (language: string): CategoriesQuery => {
  return {
    queryKey: ['category', language],
    queryFn: () =>
      autoFetch('/categories?limit=20', {
        headers: {
          lang: language,
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
  const { isLangArabic } = useGlobalContext();
  const axiosData: any = useLoaderData();
  const data: CategoriesData = axiosData.data1.data.data.data;

  return (
    <div className="carousel carousel-center rounded-box w-3/4">
      {data.map((category) => (
        <div className="carousel-item" key={category.id}>
          <Link
            to={`/meals/category/${category.id}`}
            className={`flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-transparent border-[#E4E4E4] flex flex-col items-center justify-center mx-1 border-[1px] p-2 ${
              isLangArabic
                ? 'rounded-tr-3xl rounded-bl-3xl'
                : 'rounded-tl-3xl rounded-br-3xl'
            }`}
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 mb-1 md:mb-2"
            />
            <span className="text-black text-[10px] md:text-sm lg:text-base">
              {category.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Slider;
