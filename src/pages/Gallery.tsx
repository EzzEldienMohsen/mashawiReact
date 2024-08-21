import React from 'react';
import { useTranslation } from 'react-i18next';
import { GalleryResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { GalleryPagination } from '../components';
import { useGlobalContext } from '../context/GlobalContext';

interface GalleryQuery {
  queryKey: string[];
  queryFn: () => Promise<GalleryResponse>;
}

const galleryQuery = (language: string, page: string): GalleryQuery => {
  return {
    queryKey: ['gallery', language, page],
    queryFn: () =>
      autoFetch(`/gallery?limit=1&page=${page}`, {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) =>
  async ({ request }: LoaderFunctionArgs): Promise<GalleryResponse> => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const data = queryClient.ensureQueryData(galleryQuery(language, page));
    return data;
  };

const Gallery: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const axiosData: any = useLoaderData();
  const data: GalleryResponse = axiosData.data;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('galleryText')}
        </h1>
      </div>
      <div className="my-8 flex flex-col justify-center items-center md:flex-row md:justify-between lg:justify-between md:gap-x-6 gap-y-6 md:flex-wrap w-full px-8 lg:px-20">
        {data.data.data.map((data) => {
          return (
            <div
              key={data.id}
              className=" my-2 w-4/5  md:w-[45%] lg:w-[31%] rounded-2xl  flex flex-col justify-center items-center "
            >
              <img
                src={data.path}
                alt="alt"
                className={`w-full aspect-square md:aspect-auto md:h-[348px] 2xl:aspect-square 2xl:h-auto ${
                  isLangArabic
                    ? 'rounded-tr-3xl rounded-bl-3xl'
                    : 'rounded-tl-3xl rounded-br-3xl'
                }`}
              />
            </div>
          );
        })}
      </div>
      <GalleryPagination />
    </div>
  );
};

export default Gallery;
