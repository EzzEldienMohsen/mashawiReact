import React from 'react';
import { Steps } from '../components';
import { useTranslation } from 'react-i18next';
import { RootState, useTypedSelector } from '../store';
import {
  deliveredSingleOrder,
  deliveringSingleOrder,
  pendingSingleOrder,
  processingBranchSingleOrder,
  processingSingleOrder,
  readyBranchSingleOrder,
  rejectedSingleOrder,
  returnedSingleOrder,
} from '../assets';
import { useNavigate } from 'react-router-dom';
import like from '../assets/svg/delivery/like.svg';
import rejected from '../assets/svg/delivery/rejectedOrder.svg';

const OrderTrack: React.FC = () => {
  const { t } = useTranslation();
  const { singleOrder, isLoading } = useTypedSelector(
    (state: RootState) => state.orders
  );
  const navigate = useNavigate();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  React.useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    }
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  const status = singleOrder.data.status;
  const tracker =
    status === 'pending'
      ? pendingSingleOrder
      : status === 'processing' && singleOrder.data.branch
      ? processingBranchSingleOrder
      : status === 'processing' && singleOrder.data.address
      ? processingSingleOrder
      : status === 'completed' && singleOrder.data.branch
      ? readyBranchSingleOrder
      : status === 'out_for_delivery'
      ? deliveringSingleOrder
      : status === 'delivered'
      ? deliveredSingleOrder
      : status === 'returned'
      ? returnedSingleOrder
      : rejectedSingleOrder;
  const trackText =
    status === 'pending'
      ? 'pendingTrackText'
      : status === 'processing' && singleOrder.data.branch
      ? 'processingTrackText'
      : status === 'processing' && singleOrder.data.address
      ? 'processingTrackText'
      : status === 'completed' && singleOrder.data.branch
      ? 'readyTrackText'
      : status === 'out_for_delivery'
      ? 'deliveringTrackText'
      : status === 'delivered'
      ? 'deliveredTrackText'
      : status === 'returned'
      ? 'returnedTrackText'
      : 'rejectedTrackText';
  if (status === 'completed' || status === 'delivered') {
    return (
      <div className="flex flex-col justify-center items-center w-full my-2">
        <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
          <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
            {t('orderDoneTitle')}
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-20 px-4 md:px-8 lg:px-20">
          <Steps tracker={tracker} />
          <div className="flex flex-col gap-y-3 justify-center items-center text-sm md:text-md lg:text-lg font-abdo py-6 md:py-10 bg-white w-4/5 rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg">
            <img src={like} alt="like" />
            <h1 className="text-black text-center">{t(trackText)}</h1>
          </div>
        </div>
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="flex flex-col justify-center items-center w-full my-2">
        <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
          <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
            {t('orderDoneTitle')}
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-20 px-4 md:px-8 lg:px-20">
          <Steps tracker={tracker} />
          <div className="flex flex-col gap-y-3 justify-center items-center text-sm md:text-md lg:text-lg font-abdo py-6 md:py-10 bg-white w-4/5 rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg">
            <img src={rejected} alt="rejected" />
            <h1 className="text-black text-center">{t(trackText)}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full my-2">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('orderDoneTitle')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-20 px-4 md:px-8 lg:px-20">
        <Steps tracker={tracker} />
        <div className="flex flex-col gap-y-3 justify-center items-center text-sm md:text-md lg:text-lg font-abdo py-6 md:py-10 bg-white w-4/5 rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg">
          <h1 className="text-black text-center">{t(trackText)}</h1>
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;
