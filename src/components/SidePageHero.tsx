import React from 'react';
interface SidePageHeroProps {
  img: string;
  primaryText: string;
  secondaryText: string;
  isJob?: boolean;
}
const SidePageHero: React.FC<SidePageHeroProps> = ({
  img,
  primaryText,
  secondaryText,
  isJob,
}) => {
  return (
    <div
      className={`bg-[#2C2220] flex flex-col justify-center md:flex-row md:justify-between items-center px-8 lg:px-20 ${
        isJob ? 'pt-2' : 'py-4'
      } md:mb-12 lg:mt-16 mb-20`}
    >
      <div className="flex flex-col md:text-start justify-center items-center md:justify-start 2xl:gap-y-8 md:items-start lg:w-2/5">
        <h1 className="mb-4 text-lg md:text-2xl lg:text-4xl 2xl:text-6xl my-1 md:text-start font-bold text-[#CD0B09]">
          {primaryText}
        </h1>
        <p className="text-white text-sm md:text-md 2xl:text-2xl text-center md:text-start lg:text-lg my-1 2xl:leading-[3rem]">
          {secondaryText}
        </p>
      </div>
      <img
        src={img}
        alt="image"
        className={`${
          isJob
            ? 'md:-mt-16 lg:-mt-28'
            : 'mt-2 -mb-24 md:-my-14 lg:-my-20 2xl:-my-36'
        }  w-1/2 md:w-1/4 lg:w-1/3 aspect-square `}
      />
    </div>
  );
};

export default SidePageHero;
