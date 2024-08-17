import React from 'react';
import { useTranslation } from 'react-i18next';
import { newAddressInitialValues } from '../assets';
import { FormRow, FormTextArea } from '../subComponents';
import add from '../assets/svg/newAddress/address.svg';
import mob from '../assets/svg/newAddress/mobile.svg';
import { CreateAddressReq } from '../features/address/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useDispatch } from 'react-redux';
import { createAddress, getAddress } from '../features/address/addressSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const AddAddressModal: React.FC = () => {
  const { t } = useTranslation();
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Close Modal
  const closeModal = () => dialogRef.current?.close();

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };
  const navigate = useNavigate();
  // Handling Form Logic
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLoading } = useTypedSelector((state: RootState) => state.address);
  const { isLangArabic } = useGlobalContext();
  const [values, setValues] = React.useState<CreateAddressReq>({
    ...newAddressInitialValues,
    phone: user.user.phone,
  });

  const dispatch: AppDispatch = useDispatch();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = React.useCallback(
    debounce((name: string, value: string) => {
      if (name === 'email' && !validateEmail(value)) {
        toast.error(t('invalidEmailAddress'));
        return;
      }
    }, 3000),
    []
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    handleValidation(name, value);
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault(); // Prevent default form submission
    console.log(values);
    try {
      await dispatch(
        createAddress({ reqData: values, token, language })
      ).unwrap();
      await dispatch(getAddress({ token, language })).unwrap();
      dialogRef.current?.close();
      navigate('/proceed');
    } catch (error) {
      console.error('Failed to create address:', error);
      toast.error(t('submissionFailed'));
    }
  };

  return (
    <div>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="bg-newRed w-full md:w-full lg:w-auto text-white py-2 px-6 rounded-2xl mt-4 font-semibold"
      >
        {t('newAdd')}
      </button>

      {/* Modal dialog without nested form */}
      <dialog
        ref={dialogRef}
        id="addressModal"
        className="modal overflow-y-auto w-full flex justify-center items-center"
        onClick={handleClickOutside}
      >
        <div
          className="flex flex-col justify-center items-center gap-y-4 w-full md:w-4/5 lg:w-3/4 p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <FormRow
            name="name"
            icon={add}
            label=" "
            type="text"
            value={values.name}
            high={false}
            placeHolder={t('addressName')}
            handleChange={handleChange}
            full={true}
          />
          <FormTextArea
            name="details"
            icon={add}
            label=" "
            type="text"
            value={values.details}
            high={false}
            placeHolder={t('addressDetails')}
            handleChange={handleChange}
            full={true}
          />
          <FormRow
            name="phone"
            icon={mob}
            label=" "
            type="tel"
            value={values.phone}
            high={false}
            placeHolder={t('mobileNumber')}
            handleChange={handleChange}
            full={true}
          />

          <button
            disabled={isLoading}
            onClick={onSubmit}
            className="btn text-white btn-block hover:bg-newRed hover:text-white text-xl rounded-full bg-newRed my-2"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              t('save')
            )}
          </button>

          <button type="button" onClick={closeModal} className="mt-2">
            {t('close')}
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default AddAddressModal;
