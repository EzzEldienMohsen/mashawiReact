import React from 'react';
import { Steps } from '../components';
import { singleOrder as theSingleOrder, singleOrderElements } from '../assets';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { getSingleOrder } from '../features/orders/ordersSlice';

const SingleOrder: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const { singleOrder, isLoading } = useTypedSelector(
    (state: RootState) => state.orders
  );

  console.log(singleOrder);

  const navigate = useNavigate();
  const getTheOrder = async () => {
    await dispatch(getSingleOrder({ id, token, language }));
  };
  React.useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    } else {
      getTheOrder();
    }
  }, [token, language, navigate]);

  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-full px-8 lg:px-20  py-8">
      <Steps tracker={theSingleOrder} />
      {/* Card */}
      <div className="my-16 w-full flex flex-col justify-center items-center px-8 lg:px-20">
        {singleOrderElements.map((or) => {
          return (
            <div
              key={or.id}
              className="flex bg-white w-full rounded-2xl  justify-start items-start pt-4 pb-2 px-2 my-2 gap-x-4 "
            >
              <img
                src={or.img}
                alt="alt"
                className={`w-1/3 md:w-1/5 aspect-square ${
                  isLangArabic
                    ? 'rounded-tr-3xl rounded-bl-3xl'
                    : 'rounded-tl-3xl rounded-br-3xl'
                }`}
              />
              <div className="flex flex-col justify-stretch items-start gap-y-3 lg:gap-y-7">
                <h1 className="text-sm font-abdo lg:text-xl">{t(or.name)}</h1>
                <p className="text-xs font-abdo w-1/3 text-[#7E7E7E] lg:text-md">
                  {t(or.addOn)}
                </p>
                <p className="text-newRed font-abdo text-sm lg:text-lg">
                  {t(or.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Address */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center gap-y-4">
        <h1 className="font-abdo tex-black">{t('fakeAddress')}</h1>
        <div className="w-full flex justify-evenly items-center">
          <p className="text-black font-abdo">{t('totalOrderText')}</p>
          <p className="text-black font-abdo">{t('orderPrice')}</p>
        </div>
        <button className=" btn btn-block md:w-3/5 my-2 flex justify-center shadow-xl bg-newRed text-white items-center rounded-full">
          {t('paymentAndOrderText')}
        </button>
      </div>
    </div>
  );
};

export default SingleOrder;
