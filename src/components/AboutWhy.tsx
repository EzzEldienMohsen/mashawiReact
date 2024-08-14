import React from 'react';

import whyImg from '../assets/Image.png';

const AboutWhy: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center w-full lg:bg-white lg:justify-between">
      <img
        src={whyImg}
        alt="alt"
        className="w-full lg:w-1/2 md:h-1/4 lg:h-auto"
      />
      <div className="font-abdo flex flex-col justify-center items-center gap-y-6 px-8 lg:px-20 py-4 w-full lg:w-1/2">
        <p
          className="font-semibold text-black text-sm md:text-md lg:text-lg"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    </div>
  );
};

export default AboutWhy;
