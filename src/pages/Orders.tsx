import React from 'react';

import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../features/orders/ordersSlice';
import { formatPrice } from '../utils/index';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

const Orders: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const language = isLangArabic ? 'ar' : 'en';
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const { orders, isLoading } = useTypedSelector(
    (state: RootState) => state.orders
  );
  const getTheOrders = async () => {
    await dispatch(getAllOrders({ token, language }));
  };
  React.useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    } else {
      getTheOrders();
    }
  }, [token, language, navigate]);
  const locale = isLangArabic ? 'ar' : 'en';
  dayjs.locale(locale);

  function formatDate(data: { date: string }): string {
    return dayjs(data.date).locale(locale).format('DD MMM YYYY');
  }

  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }

  return (
    <div className="my-4 w-full flex flex-col px-8 lg:px-20 gap-y-6 justify-center items-center">
      {orders.map((order) => {
        return (
          <Link
            to={`/profile/orders/${order.id}`}
            key={order.id}
            className="flex flex-col rounded-2xl justify-center items-start  bg-white px-4 py-6 relative gap-y-4 md:flex-row w-full md:justify-between lg:px-6 lg:gap-x-6"
          >
            <h1 className="underline underline-offset-8 font-bold font-abdo text-black text-lg lg:text-3xl">
              {`${t('orderTitle')} ${order.id}`}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl font-abdo text-[#939393]">
              {formatDate({ date: order.date })}
            </p>
            <p className="text-newRed text-lg lg:text-3xl font-abdo font-medium">
              {formatPrice(order.total)}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Orders;
