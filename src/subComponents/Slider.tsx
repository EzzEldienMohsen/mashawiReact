import React from 'react';
import { Categories, CategoriesData } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import icon from '../assets/svg/menu/all.svg';
import { useTranslation } from 'react-i18next';
import fallbackImage from '../assets/svg/imageGuard.svg';

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
  const { t } = useTranslation();

  return (
    <div className="carousel carousel-center rounded-box w-5/6 lg:w-3/5 2xl:w-3/5">
      <div className="carousel-item">
        <Link
          to="/meals"
          className={`flex-shrink-0 w-24 h-24 md:w-[120px] md:h-[120px] lg:w-36 lg:h-36 2xl:w-[186px] 2xl:h-[180px] bg-transparent border-[#E4E4E4] flex flex-col items-center justify-center mx-1 border-[1px] p-2 ${
            isLangArabic
              ? 'rounded-tr-3xl rounded-bl-3xl'
              : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        >
          <img
            src={icon}
            alt="icon"
            className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 2xl:w-[60px] 2xl:h-[60px] mb-1 md:mb-[6px] lg:mb-3 2xl:mb-4"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
              e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
            }}
          />
          <span className="text-black font-abdo text-[13px] md:text-lg lg:text-base 2xl:text-xl">
            {t('allDishes')}
          </span>
        </Link>
      </div>
      {data.map((category) => (
        <div className="carousel-item" key={category.id}>
          <Link
            to={`/meals/category/${category.id}`}
            className={`flex-shrink-0 w-24 h-24 md:w-[120px] md:h-[120px] lg:w-36 lg:h-36 2xl:w-[186px] 2xl:h-[180px] bg-transparent border-[#E4E4E4] flex flex-col items-center justify-center mx-1 border-[1px] p-2 ${
              isLangArabic
                ? 'rounded-tr-3xl rounded-bl-3xl'
                : 'rounded-tl-3xl rounded-br-3xl'
            }`}
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 2xl:w-[60px] 2xl:h-[60px] mb-1 md:mb-[6px] lg:mb-3 2xl:mb-4 "
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
              }}
            />
            <span className="text-black font-abdo text-[13px] md:text-lg lg:text-base 2xl:text-xl">
              {category.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Slider;
