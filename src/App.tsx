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
  About,
  ContactUs,
  Home,
  Jobs,
  Privacy,
  Login,
  NewAccount,
  Branches,
  Terms,
  Payment,
  Delivery,
  Refund,
  ValidateOTP,
  ForgetPassword,
  ResetPassword,
  ChangePassword,
  Profile,
  User,
  Events,
  News,
  SingleEventPage,
  TrackOrder,
  DeliveredPage,
  ProceedPage,
  ProceedDelivery,
  // Orders,
  // MyAddress,
} from './pages';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import { Categories, Meals } from './assets/types';

//  loaders
import { loader as aboutLoader } from './pages/About';
import { loader as paymentLoader } from './pages/Payment';
import { loader as privacyLoader } from './pages/Privacy';
import { loader as deliveryLoader } from './pages/Delivery';
import { loader as refundLoader } from './pages/Refund';
import { loader as termsLoader } from './pages/Terms';
import { loader as categoryLoader } from './subComponents/Slider';
import { loader as mealsLoader } from './components/Menu';

// Combined loaders
// First Menu Loaders
interface MenuLoader {
  data1: Categories;
  data2: Meals;
}
const menuLoader =
  (language: string) =>
  async ({ request }: LoaderFunctionArgs): Promise<MenuLoader> => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const data1 = await categoryLoader(queryClient, language)();
    const data2 = await mealsLoader(queryClient, language, page)();
    return { data1, data2 };
  };

// Lazy-loaded components
const Landing = React.lazy(() => import('./pages/Landing'));
const MenuList = React.lazy(() => import('./pages/MenuList'));
const Cart = React.lazy(() => import('./pages/Cart'));
const WishList = React.lazy(() => import('./pages/WishList'));
const Gallery = React.lazy(() => import('./pages/Gallery'));

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
            <Suspense fallback={<div>Loading...</div>}>
              <Landing />
            </Suspense>
          ),
          loader: menuLoader(language),
        },
        {
          path: '/about',
          element: <About />,
          loader: aboutLoader(queryClient, language),
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          path: '/events',
          element: <Events />,
        },

        {
          path: '/singleEvent',
          element: <SingleEventPage />,
        },
        {
          path: '/news',
          element: <News />,
        },
        {
          path: '/jobs',
          element: <Jobs />,
        },
        // UnRouted Pages
        {
          path: '/delivered',
          element: <DeliveredPage />,
        },
        {
          path: '/proceed',
          element: <ProceedPage />,
        },
        {
          path: '/proceed-delivery',
          element: <ProceedDelivery />,
        },
        {
          path: '/track',
          element: <TrackOrder />,
        },
        {
          path: '/privacy',
          element: <Privacy />,
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
          element: <Branches />,
        },
        {
          path: '/terms',
          element: <Terms />,
          loader: termsLoader(queryClient, language),
        },
        {
          path: '/payment',
          element: <Payment />,
          loader: paymentLoader(queryClient, language),
        },
        {
          path: '/delivery',
          element: <Delivery />,
          loader: deliveryLoader(queryClient, language),
        },
        {
          path: '/refund',
          element: <Refund />,
          loader: refundLoader(queryClient, language),
        },
        {
          path: '/validate-otp',
          element: <ValidateOTP />,
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
          element: <Profile />,
          children: [
            {
              index: true,
              element: <User />,
            },
            //     {
            //       path: 'orders',
            //       element: <Orders />,
            //     },
            {
              path: 'changePassword',
              element: <ChangePassword />,
            },
            //     {
            //       path: 'address',
            //       element: <MyAddress />,
            //     },
          ],
        },
        {
          path: '/menuList',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MenuList />
            </Suspense>
          ),
          loader: menuLoader(language),
        },
        {
          path: '/cart',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: '/wishList',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <WishList />
            </Suspense>
          ),
        },
        {
          path: '/gallery',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Gallery />
            </Suspense>
          ),
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
