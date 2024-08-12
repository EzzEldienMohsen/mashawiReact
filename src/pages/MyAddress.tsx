import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import addressIcon from '../assets/svg/address.svg';
import addMob from '../assets/svg/addMob.svg';
import addTel from '../assets/svg/addTel.svg';
import theClose from '../assets/svg/closeBtn.svg';
import { useDispatch } from 'react-redux';
import { deleteAddress, getAddress } from '../features/address/addressSlice';

const MyAddress: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { isLoading, address } = useTypedSelector(
    (state: RootState) => state.address
  );
  const { t } = useTranslation();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const language = isLangArabic ? 'ar' : 'en';
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveAddress = async (id: number) => {
    await dispatch(deleteAddress({ id: `${id}`, token, language }));
    await dispatch(getAddress({ token, language }));
  };
  if (address.length === 0) {
    navigate('/profile/new-address');
  }

  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  return (
    <div className="flex mt-2 flex-col relative px-8 lg:px-20 justify-center pt-24 items-center  md:flex md:flex-row md:justify-start md:items-start md:flex-wrap md:gap-x-2 w-full ">
      <Link
        to="/profile/new-address"
        className={`btn w-3/5 md:w-1/5 absolute top-0 ${
          isLangArabic ? 'left-20' : 'right-20'
        } bg-newRed text-white rounded-full my-1`}
      >
        {t('newAddress')}
      </Link>
      {address.map((ad) => {
        return (
          <div
            key={ad.id}
            className="rounded-2xl aspect-auto relative flex flex-col justify-evenly items-center bg-white py-2 gap-y-4 shadow-md w-5/6 my-2 lg:w-1/4 md:w-auto"
          >
            <button
              className={`absolute top-2 ${
                isLangArabic ? 'left-2' : 'right-2'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleRemoveAddress(ad.id)}
            >
              <img src={theClose} alt="alt" className={` `} />
            </button>
            <img
              src={addressIcon}
              alt="alt"
              className="bg-[#F4F4F4] p-2 rounded-full"
            />
            <h1 className="text-black font-bold text-xl my-1 md:text-xl lg:text-lg">
              {ad.name}
            </h1>
            <p className="text-start text-sm md:text-md lg:text-sm mb-2 text-gray-600 px-1">
              {ad.details}
            </p>
            <div className="flex flex-row text-start items-center justify-between px-1 text-md md:text-xs lg:text-sm">
              <div className="flex flex-row gap-x-1 text-start items-center justify-between ">
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm ">
                  <img src={addMob} alt="alt" />{' '}
                  <p className="text-sm lg:text-xs">{ad.phone}</p>
                </div>
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm mr-2">
                  <img src={addTel} alt="alt" />{' '}
                  <p className=" text-sm lg:text-xs">{ad.landing_phone}</p>
                </div>
              </div>
            </div>
            <Link
              to={`/profile/update-address/${ad.id}`}
              className="btn w-3/5 bg-newRed text-white rounded-full my-1"
            >
              {t('editAddressText')}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MyAddress;
