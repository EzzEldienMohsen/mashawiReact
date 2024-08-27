import React, { useState, useEffect } from 'react';
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
    dispatch(getAddress({ token, language }));
  };

  const getTheAddress = () => {
    dispatch(getAddress({ token, language }));
  };

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    } else {
      getTheAddress();
    }
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }

  return (
    <div className="flex mt-2 flex-col relative px-8 lg:px-20 justify-center pt-24 items-center md:flex md:flex-row md:justify-start md:items-start md:flex-wrap md:gap-x-2 w-full">
      <Link
        to="/profile/new-address"
        className={`btn w-3/4 md:w-2/5 lg:w-1/4 2xl:w-auto m px-6 absolute min-h-[46px] lg:min-h-[58px] h-auto text-lg lg:text-2xl top-0 ${
          isLangArabic ? 'left-13 md:left-20' : 'right-20'
        } bg-newRed text-white rounded-full my-1`}
      >
        {t('newAddress')}
      </Link>
      {address.map((ad) => (
        <AddressItem
          key={ad.id}
          ad={ad}
          isLangArabic={isLangArabic}
          handleRemoveAddress={handleRemoveAddress}
          t={t}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

interface AddressItemProps {
  ad: {
    id: number;
    name: string;
    details: string;
    phone: string;
    landing_phone: string | null;
    created_at: string;
  };
  isLangArabic: boolean;
  handleRemoveAddress: (id: number) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const AddressItem: React.FC<AddressItemProps> = ({
  ad,
  isLangArabic,
  handleRemoveAddress,
  t,
  isLoading,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div
      key={ad.id}
      className="rounded-2xl aspect-auto relative flex flex-col justify-evenly items-center bg-white py-6 gap-y-4 lg:gap-y-5 shadow-md px-2 w-[90%] my-2 lg:w-[30%] 2xl:w-[23%] md:w-[45%]"
    >
      <button
        className={`absolute top-2 ${isLangArabic ? 'left-2' : 'right-2'} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => handleRemoveAddress(ad.id)}
      >
        <img src={theClose} alt="alt" className={` `} />
      </button>
      <img src={addressIcon} alt="alt" />
      <h1
        className={`text-black font-bold text-lg my-1 md:text-xl lg:text-2xl ${
          isTruncated ? 'truncate' : ''
        }`}
        style={{
          maxWidth: '150px',
          whiteSpace: isTruncated ? 'nowrap' : 'normal',
        }}
        onClick={toggleTruncate}
      >
        {ad.name}
      </h1>
      <p
        className={`text-sm lg:text-[14.9px] text-center mb-2 text-black px-1 ${
          isTruncated ? 'truncate' : ''
        }`}
        style={{
          maxWidth: '150px',
          whiteSpace: isTruncated ? 'nowrap' : 'normal',
        }}
        onClick={toggleTruncate}
      >
        {ad.details}
      </p>
      <div className="flex flex-row gap-x-1 text-start items-center justify-between">
        <div className="flex flex-row gap-x-1 justify-between">
          <img src={addMob} alt="alt" />{' '}
          <p className="text-sm 2xl:text-lg">{ad.phone}</p>
        </div>
        {ad.landing_phone && (
          <div className="flex flex-row gap-x-1 justify-between mr-2">
            <img src={addTel} alt="alt" />{' '}
            <p className="text-sm 2xl:text-lg">{ad.landing_phone}</p>
          </div>
        )}
      </div>
      <Link
        to={`/profile/update-address/${ad.id}`}
        className="btn w-3/5 bg-newRed text-white rounded-full text-lg min-h-[46px] h-auto px-[4px] my-1"
      >
        {t('editAddressText')}
      </Link>
    </div>
  );
};

export default MyAddress;
