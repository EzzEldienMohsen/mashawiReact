import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddAddressModal, FormTextArea, ProceedTotals } from '../subComponents';
import { IconFormRow } from '../subSubComponents';
import src from '../assets/svg/proceed/discount.svg';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import CustomSelect from '../subSubComponents/CustomSelect';
import { AddressResponse } from '../assets/types';
import { useDispatch } from 'react-redux';
import { useGlobalContext } from '../context/GlobalContext';
import { getAddress } from '../features/address/addressSlice';
import { CheckoutReq } from '../features/orders/types';
import { applyCoupon, checkout } from '../features/orders/ordersSlice';

const initialValues: CheckoutReq = {
  payment_method: '',
  address_id: null,
  branch_id: null,
  notes: '',
  coupon_code: '',
};

const ProceedPageForm: React.FC = () => {
  // Getting Addresses
  const axiosData: any = useLoaderData();
  const data: AddressResponse = axiosData.data;
  const unSortedItems = data.data;
  const sortedItems = unSortedItems.sort((a, b) => a.order - b.order);
  const dispatch: AppDispatch = useDispatch();
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const navigate = useNavigate();
  const fetchAddress = React.useCallback(() => {
    if (token && language) {
      dispatch(getAddress({ token, language }));
    }
  }, [token, language, dispatch]);

  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);
  const { address, isLoading } = useTypedSelector(
    (state: RootState) => state.address
  );
  // MAnaging values
  const [values, setValues] = React.useState<CheckoutReq>(initialValues);
  const { t } = useTranslation();
  const [branch, setBranch] = React.useState<string>('branch');
  const addressOptions = React.useMemo(
    () =>
      address.map((branch) => ({
        label: branch.name,
        value: branch.id,
      })),
    [address]
  );
  const [theBranchesOptions, setTheBranchesOptions] =
    React.useState<{ label: string; value: number }[]>(addressOptions);

  const branchesOptions = React.useMemo(
    () =>
      sortedItems.map((branch) => ({
        label: branch.name,
        value: branch.id,
      })),
    [sortedItems]
  );

  React.useEffect(() => {
    if (branch === 'home') {
      setTheBranchesOptions(addressOptions);
    } else if (branch === 'branch') {
      setTheBranchesOptions(branchesOptions);
    }
  }, [branch, addressOptions, branchesOptions]);
  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);

    if (selectedBranch === 'home') {
      setTheBranchesOptions(addressOptions);
    } else if (selectedBranch === 'branch') {
      setTheBranchesOptions(branchesOptions);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      payment_method: e.target.value,
    }));
  };
  // Submitting values and loading
  const { isLoading: ordersLoading } = useTypedSelector(
    (state: RootState) => state.orders
  );
  const submitTheCoupon = () => {
    dispatch(
      applyCoupon({ reqData: { code: values.coupon_code }, token, language })
    );
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const response = await dispatch(
      checkout({ reqData: values, token, language })
    ).unwrap();
    if (response.status === 1) {
      navigate('/order-done');
    }
    setValues(initialValues);
  };
  // Loading Return
  if (isLoading) {
    return (
      <div className="flex w-full py-8 justify-center h-96 items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center px-4 md:px-8 lg:px-20">
      <form
        onSubmit={onSubmit}
        method="POST"
        className="flex flex-col justify-start items-start gap-y-6 w-full"
      >
        {/* Address Controller */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('branchController')}
          </h1>
          <label className="flex items-center gap-x-4 mb-2">
            <input
              type="radio"
              name="branch"
              value="branch"
              checked={branch === 'branch'}
              onChange={handleBranchChange}
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-transparent"
            />
            <p className="text-lg font-abdo">{t('branch')}</p>
          </label>
          <label className="flex items-center gap-x-4">
            <input
              type="radio"
              name="branch"
              value="home"
              checked={branch === 'home'}
              onChange={handleBranchChange}
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-transparent"
            />
            <p className="text-lg font-abdo">{t('home')}</p>
          </label>
        </div>
        {/* Address Field */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('address')}
          </h1>
          <div className="flex flex-col gap-y-4 md:gap-x-2 md:flex-row md:justify-between w-full lg:w-full">
            <CustomSelect
              name={branch === 'home' ? 'address_id' : 'branch_id'}
              handleChange={handleChange}
              value={branch === 'home' ? values.address_id : values.branch_id}
              label=" "
              options={theBranchesOptions}
              type="text"
              placeHolder={t('selectAddress')}
            />
            <AddAddressModal />
          </div>
        </div>
        {/* Text Area */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <FormTextArea
            type="textarea"
            name="notes"
            label={t('notes')}
            handleChange={handleChange}
            placeHolder={t('formInstructions')}
            high={true}
            full={true}
            value={values.notes}
          />
        </div>
        {/* Radio Buttons */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('paymentMethod')}
          </h1>
          <label className="flex items-center gap-x-4 mb-2">
            <input
              type="radio"
              name="payment_method"
              value="cash"
              checked={values.payment_method === 'cash'}
              onChange={handleRadioChange}
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-transparent"
            />
            <p className="text-lg font-abdo">{t('cash')}</p>
          </label>
          <label className="flex items-center gap-x-4">
            <input
              type="radio"
              name="payment_method"
              value="card"
              checked={values.payment_method === 'card'}
              onChange={handleRadioChange}
              className="h-5 w-5 rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-transparent"
            />
            <p className="text-lg font-abdo">{t('onlinePayment')}</p>
          </label>
        </div>
        {/* Coupon */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <h1 className="text-black font-abdo text-xl font-semibold mb-4">
            {t('discount')}
          </h1>
          <div className="flex flex-col gap-y-4 md:gap-x-2 md:flex-row md:justify-between w-full lg:w-3/5">
            <IconFormRow
              name="coupon_code"
              handleChange={handleChange}
              icon={src}
              value={values.coupon_code}
              label=" "
              type="text"
              placeHolder={t('coupon')}
            />
            <div className="flex justify-between items-center gap-x-2 w-full md:w-1/2">
              <button
                type="button"
                disabled={ordersLoading}
                onClick={submitTheCoupon}
                className="bg-newRed w-full md:w-1/2 lg:w-auto text-white py-2 px-6 rounded-2xl mt-4 font-semibold"
              >
                {ordersLoading ? (
                  <span className="loading loading-spinner loading-lg text-white"></span>
                ) : (
                  t('usage')
                )}
              </button>
              <Link
                to="/menu"
                className="bg-bgColor w-full md:w-1/2 lg:w-3/5 text-black py-2 px-6 rounded-2xl mt-4 font-semibold text-center"
              >
                {t('cancellation')}
              </Link>
            </div>
          </div>
        </div>
        {/* Total */}
        <div className="w-full flex flex-col justify-start items-start bg-white rounded-2xl p-4 shadow-md">
          <ProceedTotals onSubmit={onSubmit} />
        </div>
      </form>
    </div>
  );
};

export default ProceedPageForm;
