import React, { Suspense } from 'react';
import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Home,
  Jobs,
  Login,
  NewAccount,
  ValidateOTP,
  ForgetPassword,
  ResetPassword,
  ChangePassword,
  Profile,
  User,
  TrackOrder,
  ProceedPage,
  PaymentDetails,
  VerifyEmail,
  MyAddress,
  NewAddress,
  UpdateAddress,
  OrderDonePage,
  OrderTrack,
} from './pages';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import { AddressResponse, Categories, Meals } from './assets/types';

//  loaders
import { loader as aboutLoader } from './pages/About';
import { loader as paymentLoader } from './pages/Payment';
import { loader as privacyLoader } from './pages/Privacy';
import { loader as deliveryLoader } from './pages/Delivery';
import { loader as refundLoader } from './pages/Refund';
import { loader as termsLoader } from './pages/Terms';
import { loader as categoryLoader } from './subComponents/Slider';
import { loader as mainCategoryLoader } from './subComponents/MainSlider';
import { loader as mealsLoader } from './components/Menu';
import { loader as mainMealsLoader } from './components/MainMenu';
import { loader as menuWithCategoryProductLoader } from './components/MenuWithCategory';
import { loader as galleryLoader } from './pages/Gallery';
import { loader as eventsLoader } from './pages/Events';
import { loader as newsLoader } from './pages/News';
import { loader as singleEventLoader } from './pages/SingleEventPage';
import { loader as singleNewsLoader } from './pages/SingleNewsPage';
import { loader as MainAddressLoader } from './components/MainAddressSection';
import { loader as addressLoader } from './components/AddressSection';

// Combined loaders
// First Menu Loaders
export type MenuLoader = {
  data1: Categories;
  data2: Meals;
};
export type MainLoader = {
  data1: Categories;
  data2: Meals;
  data3: AddressResponse;
};
const mainMenuLoader = (language: string) => async (): Promise<MainLoader> => {
  const data1 = await mainCategoryLoader(queryClient, language)();
  const data2 = await mainMealsLoader(queryClient, language)();
  const data3 = await MainAddressLoader(queryClient, language)();
  return { data1, data2, data3 };
};
const menuLoader =
  (language: string) =>
  async ({ request }: LoaderFunctionArgs): Promise<MenuLoader> => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const data1 = await categoryLoader(queryClient, language)();
    const data2 = await mealsLoader(queryClient, language, page)();
    return { data1, data2 };
  };
const menuWithCategoryLoader =
  (language: string) =>
  async ({ request, params }: LoaderFunctionArgs): Promise<MenuLoader> => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const { cat = '' } = params;
    console.log;
    const data1 = await categoryLoader(queryClient, language)();
    const data2 = await menuWithCategoryProductLoader(
      queryClient,
      language,
      page,
      cat
    )();
    return { data1, data2 };
  };

// Lazy-loaded components
const Landing = React.lazy(() => import('./pages/Landing'));
const MenuList = React.lazy(() => import('./pages/MenuList'));
const Cart = React.lazy(() => import('./pages/Cart'));
const WishList = React.lazy(() => import('./pages/WishList'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const About = React.lazy(() => import('./pages/About'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const Branches = React.lazy(() => import('./pages/Branches'));
const Orders = React.lazy(() => import('./pages/Orders'));
const SingleOrder = React.lazy(() => import('./pages/SingleOrder'));
const MenuCategory = React.lazy(() => import('./pages/MenuCategory'));
const Events = React.lazy(() => import('./pages/Events'));
const SingleEventPage = React.lazy(() => import('./pages/SingleEventPage'));
const SingleNewsPage = React.lazy(() => import('./pages/SingleNewsPage'));
const News = React.lazy(() => import('./pages/News'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Delivery = React.lazy(() => import('./pages/Delivery'));
const Refund = React.lazy(() => import('./pages/Refund'));

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
  },
};

const queryClient = new QueryClient({ defaultOptions });

const AppRouter: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Landing />
            </Suspense>
          ),
          loader: mainMenuLoader(language),
        },
        {
          path: '/about',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <About />
            </Suspense>
          ),
          loader: aboutLoader(queryClient, language),
        },
        {
          path: '/contact',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <ContactUs />
            </Suspense>
          ),
          loader: addressLoader(queryClient, language),
        },
        {
          path: '/events',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Events />
            </Suspense>
          ),
          loader: eventsLoader(queryClient, language),
        },

        {
          path: '/singleEvent/:id',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <SingleEventPage />
            </Suspense>
          ),
          loader: singleEventLoader(queryClient, language),
        },
        {
          path: '/singleNews/:id',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <SingleNewsPage />
            </Suspense>
          ),
          loader: singleNewsLoader(queryClient, language),
        },
        {
          path: '/news',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <News />
            </Suspense>
          ),
          loader: newsLoader(queryClient, language),
        },
        {
          path: '/jobs',
          element: <Jobs />,
        },
        // UnRouted Pages
        {
          path: '/order-done',
          element: <OrderDonePage />,
        },
        {
          path: '/proceed',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <ProceedPage />
            </Suspense>
          ),
          loader: addressLoader(queryClient, language),
        },
        {
          path: '/track-order',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <OrderTrack />
            </Suspense>
          ),
        },
        // {
        //   path: '/proceed-delivery',
        //   element: <ProceedDelivery />,
        // },
        {
          path: '/card-data',
          element: <PaymentDetails />,
        },
        {
          path: '/track',
          element: <TrackOrder />,
        },
        {
          path: '/privacy',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Privacy />
            </Suspense>
          ),
          loader: privacyLoader(queryClient, language),
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <NewAccount />,
        },
        {
          path: '/branches',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Branches />
            </Suspense>
          ),
          loader: addressLoader(queryClient, language),
        },

        {
          path: '/terms',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Terms />
            </Suspense>
          ),
          loader: termsLoader(queryClient, language),
        },
        {
          path: '/payment',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Payment />
            </Suspense>
          ),
          loader: paymentLoader(queryClient, language),
        },
        {
          path: '/delivery',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Delivery />
            </Suspense>
          ),
          loader: deliveryLoader(queryClient, language),
        },
        {
          path: '/refund',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Refund />
            </Suspense>
          ),
          loader: refundLoader(queryClient, language),
        },
        {
          path: '/validate-otp',
          element: <ValidateOTP />,
        },
        {
          path: '/verify-email',
          element: <VerifyEmail />,
        },
        {
          path: '/forget-password',
          element: <ForgetPassword />,
        },
        {
          path: '/reset-password',
          element: <ResetPassword />,
        },
        {
          path: 'profile',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Profile />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: <User />,
            },
            {
              path: 'orders',
              element: (
                <Suspense
                  fallback={
                    <div className="flex w-full py-8 justify-center items-center">
                      <span className="loading loading-spinner loading-lg text-newRed"></span>
                    </div>
                  }
                >
                  <Orders />
                </Suspense>
              ),
            },
            {
              path: 'orders/:id',
              element: (
                <Suspense
                  fallback={
                    <div className="flex w-full py-8 justify-center items-center">
                      <span className="loading loading-spinner loading-lg text-newRed"></span>
                    </div>
                  }
                >
                  <SingleOrder />
                </Suspense>
              ),
            },
            {
              path: 'changePassword',
              element: <ChangePassword />,
            },
            {
              path: 'address',
              element: <MyAddress />,
            },
            {
              path: 'new-address',
              element: <NewAddress />,
            },
            {
              path: 'update-address/:id',
              element: <UpdateAddress />,
            },
          ],
        },
        {
          path: '/meals',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <MenuList />
            </Suspense>
          ),
          loader: menuLoader(language),
        },
        {
          path: '/meals/category/:cat',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <MenuCategory />
            </Suspense>
          ),
          loader: menuWithCategoryLoader(language),
        },
        {
          path: '/cart',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Cart />
            </Suspense>
          ),
        },
        {
          path: '/wishList',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <WishList />
            </Suspense>
          ),
        },
        {
          path: '/gallery',
          element: (
            <Suspense
              fallback={
                <div className="flex w-full py-8 justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-newRed"></span>
                </div>
              }
            >
              <Gallery />
            </Suspense>
          ),
          loader: galleryLoader(queryClient, language),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
