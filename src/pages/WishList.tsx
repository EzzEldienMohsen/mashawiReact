import React from 'react';
import { useDispatch } from 'react-redux';
import { clearWishList, getWishList } from '../features/wishList/wishListSlice';
import { Card } from '../subSubComponents';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
const WishList: React.FC = () => {
  const { t } = useTranslation();
  const { wishListItems: items } = useTypedSelector(
    (state: RootState) => state.wishList
  );
  console.log(items);
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLangArabic } = useGlobalContext();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  const dispatch: AppDispatch = useDispatch();
  const getTheWithList = () => {
    dispatch(getWishList({ token, language }));
  };
  React.useEffect(getTheWithList, []);
  const clearWish = () => dispatch(clearWishList());
  if (items.length === 0) {
    return (
      <div className=" w-full px-8 lg:px-20">
        <div className="flex justify-center items-center bg-white text-center my-8 py-5 rounded-2xl shadow-md ">
          <h1 className="text-black font-abdo font-light">
            {t('emptyWishList')}
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full my-4  py-8">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('wishListRoute')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-4 px-8 lg:px-20">
        <div className="my-8 flex flex-col justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-start lg:gap-x-5  lg:flex-wrap w-full">
          {items.map((data, index) => {
            return <Card data={data.cartItem} key={data.cartItem.id + index} />;
          })}
        </div>
        <button
          className="bg-newRed text-white btn btn-block rounded-full "
          onClick={clearWish}
        >
          {t('clearWishList')}
        </button>
      </div>
    </div>
  );
};

export default WishList;
