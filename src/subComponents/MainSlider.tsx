import React from 'react';
import { MealData } from '../assets/types';
import { Categories, CategoriesData } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
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

interface MainSliderProps {
  mainData: MealData;
  setMainData: React.Dispatch<React.SetStateAction<MealData>>;
}
const MainSlider: React.FC<MainSliderProps> = ({ mainData, setMainData }) => {
  const { isLangArabic } = useGlobalContext();
  const axiosData: any = useLoaderData();
  const { t } = useTranslation();
  const data: CategoriesData = axiosData.data1.data.data.data;

  return (
    <div className="carousel carousel-center rounded-box w-3/4">
      <div className="carousel-item">
        <button
          onClick={() => {
            setMainData(() => mainData);
          }}
          className={`flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 2xl:w-56 2xl:h-56 bg-transparent border-[#E4E4E4] flex flex-col items-center justify-center mx-1 border-[1px] p-2 ${
            isLangArabic
              ? 'rounded-tr-3xl rounded-bl-3xl'
              : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        >
          <img
            src={icon}
            alt="icon"
            className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 2xl:w-28 2xl:h-28 mb-1 md:mb-2"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
              e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
            }}
          />
          <span className="text-black text-[10px] md:text-sm lg:text-base 2xl:text-2xl">
            {t('allDishes')}
          </span>
        </button>
      </div>
      {data.map((category) => (
        <div className="carousel-item" key={category.id}>
          <button
            onClick={() => {
              const reqData = mainData.filter((meal) =>
                meal.categories?.some((cat) => cat.id === category.id)
              );

              setMainData(() => reqData);
            }}
            className={`flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 2xl:w-56 2xl:h-56 bg-transparent border-[#E4E4E4] flex flex-col items-center justify-center mx-1 border-[1px] p-2 ${
              isLangArabic
                ? 'rounded-tr-3xl rounded-bl-3xl'
                : 'rounded-tl-3xl rounded-br-3xl'
            }`}
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 mb-1 md:mb-2 2xl:w-28 2xl:h-28"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.className += ' object-contain'; // Ensures the fallback image respects the object-fit style
              }}
            />
            <span className="text-black text-[10px] md:text-sm lg:text-base 2xl:text-2xl">
              {category.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainSlider;
