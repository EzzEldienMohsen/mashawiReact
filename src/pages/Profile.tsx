import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user/userSlice';

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLangArabic } = useGlobalContext();

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const language = isLangArabic ? 'ar' : 'en';
  const token = user?.token; // Ensure token is retrieved from user object

  const getTheProfile = async () => {
    setIsLoading(true);
    await dispatch(getUser({ token, language }));

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home page if no token
    } else {
      getTheProfile(); // Fetch user profile data if token exists
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
    <div className="flex flex-col justify-center items-center w-full my-4 ">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-3xl lg:text-5xl text-start font-bold text-newRed">
          {pathname === '/profile'
            ? t('myProfileRoute')
            : pathname === '/profile/address'
            ? t('myAddressRoute')
            : pathname === '/profile/orders'
            ? t('myOrdersRoute')
            : pathname === '/profile/new-address'
            ? t('newAddress')
            : pathname === '/profile/changePassword'
            ? t('changePassword')
            : pathname === `/profile/update-address/${id}`
            ? t('editAddressText')
            : pathname === `/profile/orders/${id}`
            ? `${t('orderTitle')} ${id}`
            : t('tempTitle')}
        </h1>
      </div>
      <div className="my-8 px-8 lg:px-[220px] flex flex-row justify-evenly items-center w-full"></div>
      <div className="flex flex-col justify-center items-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
