import React from 'react';
import { Tracker } from '../assets/types';
import { useTranslation } from 'react-i18next';

const Steps: React.FC<{ tracker: Tracker[] }> = ({ tracker }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-4xl">
      {tracker.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col justify-center items-center gap-y-2 mb-4 md:mb-0">
            <img
              src={step.img}
              alt="step"
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <p
              className={`text-xs lg:text-sm font-abdo ${
                step.status === 'complete' ? 'text-newRed' : 'text-[#939393]'
              }`}
            >
              {t(step.text)}
            </p>
          </div>
          {index < tracker.length - 1 && (
            <div className=" flex-grow items-center flex">
              <div
                className={`w-full h-1 mx-2 rounded-full  ${
                  tracker[index].status === 'complete'
                    ? 'bg-newRed'
                    : 'bg-[#939393]'
                }`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Steps;
