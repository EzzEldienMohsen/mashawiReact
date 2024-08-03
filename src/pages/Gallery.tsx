import React from 'react';
import { gallery } from '../assets';
import { useTranslation } from 'react-i18next';
const Gallery:React.FC = () => {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('galleryText')}
        </h1>
      </div>
      <div className="my-8 flex flex-col justify-center items-center md:flex-row md:justify-between lg:justify-between md:gap-x-6 gap-y-6 md:flex-wrap w-full px-8 lg:px-20">
        {gallery.map((data) => {
          return (
            <div
              key={data.id}
              className=" my-2 w-4/5  md:w-[45%] lg:w-[31%] rounded-2xl  flex flex-col justify-center items-center "
            >
              <img src={data.img} alt="alt" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
