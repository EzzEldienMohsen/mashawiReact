import React from 'react';
import { CardDataForm, Steps } from '../components';
import { cardDataTracker, paymentCardImage } from '../assets/index';
import { useTranslation } from 'react-i18next';

const PaymentDetails: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-y-8 px-8 lg:px-20">
      <Steps tracker={cardDataTracker} />
      <h1 className="text-xl md:text-2xl font-abdo font-semibold">
        {t('paymentTitle')}
      </h1>
      <div className="flex justify-center items-center gap-x-5">
        {paymentCardImage.map((img) => (
          <img key={img.id} alt="payment" src={img.img} />
        ))}
      </div>
      <CardDataForm />
    </div>
  );
};

export default PaymentDetails;
