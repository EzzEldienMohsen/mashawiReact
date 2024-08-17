import {
  AboutExcellenceUnit,
  AddressData,
  CardData,
  ContactInitialValues,
  GalleryElement,
  InitialOTPInputs,
  Link,
  MyOrder,
  PrivacyPolicyElement,
  ProfileLink,
  RegisterData,
  Tracker,
} from './types';
import arrow from '../assets/svg/header/arrow.svg';
import { nanoid } from '@reduxjs/toolkit';

// Address Images and icons
import address from './svg/address.svg';
import addMob from './svg/addMob.svg';
import addTel from './svg/addTel.svg';
import addTime from './svg/addTime.svg';

// Links Of Profile
import per from './svg/profile/person.svg';
import or from './svg/profile/orders.svg';
import add from './svg/profile/address.svg';
import wishList from './svg/profile/wishlist.svg';
// CardSection In Payment Page
import google from '../assets/svg/PaymentPage/cardFile/googlePay.svg';
import master from '../assets/svg/PaymentPage/cardFile/masterCard.svg';
import pay from '../assets/svg/PaymentPage/cardFile/pay.svg';
import stripe from '../assets/svg/PaymentPage/cardFile/stripe.svg';
import visa from '../assets/svg/PaymentPage/cardFile/visa.svg';

// OrdersImage
// import orderProfile from './svg/menu/ordersProfile.svg';
export const whyImg =
  'https://s3-alpha-sig.figma.com/img/d552/f25b/5c2e330ed5e99377cbefe80ee7603291?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nGIxE5JdKXbi8pU2dIq9pCbUwr4LG0ZZRGyQn3csFqPvedatuTPmBw3a6l1Mosn53aJIdKdCt8vzg3nTnZrXpxAW7djZoUXtx6IgBO4H99IOWZ0P0UxPQfOxf54TDTLaYzJfBdKjnsKdcOoIJ-z8vMIez1uvZhbKy7Z54lnVQRKVKjpHCi8pg42krvzv9~wUvx6hggDrTEt2UJi4DnHWRPbZBQ5NeOU~0V-FRHVz2U5HKG6s5je~hpcRcL7B5~cA6VNhvjZ90pIZoaQ69mIViEeq0~Uj21mht84uklL5Hme~81uCetB0Uw284qKt5SvWMxd78f~7aDXdAz-3d5fhtQ__';

// about  Images
import img1 from '../assets/svg/about/vision.svg';
import img2 from '../assets/svg/about/mission.svg';
import img3 from '../assets/svg/about/story.svg';
import img4 from '../assets/svg/about/excellence.svg';

// tracker order Images
import tr1 from '../assets/svg/traker/ordered.svg';
import tr2 from '../assets/svg/traker/preparing.svg';
import tr3 from '../assets/svg/traker/delivering.svg';
import tr4 from '../assets/svg/traker/delivered.svg';

// Done Ordr Images
import or1 from '../assets/svg/delivery/proceed.svg';
import or2 from '../assets/svg/delivery/cardData.svg';
import or3 from '../assets/svg/delivery/ordered.svg';
// Proceed Images
import pr1 from '../assets/svg/proceed/proceed.svg';
import pr2 from '../assets/svg/proceed/cardData.svg';
import pr3 from '../assets/svg/proceed/ordered.svg';
// cardData Images
import cr1 from '../assets/svg/PaymentPage/proceed.svg';
import cr2 from '../assets/svg/PaymentPage/CardData.svg';
import cr3 from '../assets/svg/PaymentPage/ordered.svg';
// SingleOrder
import sOr1 from '../assets/svg/singleOrder/ordered.svg';
import sOr2 from '../assets/svg/singleOrder/preparing.svg';
import sOr3 from '../assets/svg/singleOrder/delivering.svg';
import sOr4 from '../assets/svg/singleOrder/delivered.svg';
// Single Order
import meat from './svg/menu/meat.svg';
import { UpdateUserReq } from '../features/user/types';
import { CreateAddressReq } from '../features/address/types';

// Links Starts Here
export const links: Link[] = [
  { text: 'menuRoute', to: '/meals' },
  { text: 'about', to: '/about' },
  { text: 'PrivacyPolicyRoute', to: '/privacy' },
  { text: 'newsRoute', to: '/news' },
  { text: 'jobsRoute', to: '/jobs' },
  { text: 'termsPolicyRoute', to: '/terms' },
  { text: 'eventsRoute', to: '/events' },
  { text: 'branchesRoute', to: '/branches' },
  { text: 'paymentPolicyRoute', to: '/payment' },
  { text: 'galleryRoute', to: '/gallery' },
  { text: 'contactUsRoute', to: '/contact' },
  { text: 'deliveryPolicyRoute', to: '/delivery' },
  { text: 'refundPolicyRoute', to: '/refund' },
  // { text: 'main', to: '/' },
  // { text: 'cartRoute', to: '/cart' },
  // { text: 'wishListRoute', to: '/wishList' },
  // { text: 'loginRoute', to: '/login' },
  // { text: 'myProfileRoute', to: '/profile' },
];

export const headerLinks: Link[] = [
  { text: 'main', to: '/' },
  { text: 'about', to: '/about' },
  { text: 'branchesRoute', to: '/branches' },
  { text: 'menuRoute', to: '/meals' },
  { text: 'contactUsRoute', to: '/contact' },
];

export const navBarLinks: Link[] = [
  { text: 'main', to: '/' },
  { text: 'myProfileRoute', to: '/profile', img: arrow },
  { text: 'cartRoute', to: '/cart' },
  { text: 'about', to: '/about' },
  { text: 'branchesRoute', to: '/branches', img: arrow },
  { text: 'menuRoute', to: '/meals' },
  { text: 'contactUsRoute', to: '/contact' },
  { text: 'newsRoute', to: '/' },
  { text: 'galleryRoute', to: '/gallery' },
  { text: 'PrivacyPolicyRoute', to: '/privacy', img: arrow },
  { text: 'lang', to: '', img: arrow },
];
export const myProfileLinks: Link[] = [
  { text: 'wishListRoute', to: '/wishList' },
  { text: 'profileRoute', to: '/profile' },
  { text: 'myOrdersRoute', to: '/profile/orders' },
  { text: 'myAddressRoute', to: '/profile/address' },
];

export const privacyLinks: Link[] = [
  { text: 'PrivacyPolicyRoute', to: '/privacy' },
  { text: 'termsPolicyRoute', to: '/terms' },
  { text: 'paymentPolicyRoute', to: '/payment' },
  { text: 'deliveryPolicyRoute', to: '/delivery' },
  { text: 'refundPolicyRoute', to: '/refund' },
];
// Links Ends Here

// Form Values Starts Here

export const registerValues: RegisterData = {
  f_name: '',
  l_name: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export const initialOTP: InitialOTPInputs = {
  firstNum: '',
  secondNum: '',
  thirdNum: '',
  fourthNum: '',
  fifthNum: '',
  sixthNum: '',
};

export const contactInitialValues: ContactInitialValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

// HomePage Data

export const theAddress: AddressData[] = [
  {
    id: nanoid(),
    icon: address,
    mainAddress: 'theAddressMainTitle',
    sideAddress: 'theAddressSecondTitle',
    mobIcon: addMob,
    mobNumber: '011546250809',
    phIcon: addTel,
    phNumber: '546250809',
    timeIcon: addTime,
    time: '11:00 am - 03:00 am ',
  },

  {
    id: nanoid(),
    icon: address,
    mainAddress: 'theAddressMainTitle',
    sideAddress: 'theAddressSecondTitle',
    mobIcon: addMob,
    mobNumber: '011546250809',
    phIcon: addTel,
    phNumber: '546250809',
    timeIcon: addTime,
    time: '11:00 am - 03:00 am ',
  },

  {
    id: nanoid(),
    icon: address,
    mainAddress: 'theAddressMainTitle',
    sideAddress: 'theAddressSecondTitle',
    mobIcon: addMob,
    mobNumber: '011546250809',
    phIcon: addTel,
    phNumber: '546250809',
    timeIcon: addTime,
    time: '11:00 am - 03:00 am ',
  },

  {
    id: nanoid(),
    icon: address,
    mainAddress: 'theAddressMainTitle',
    sideAddress: 'theAddressSecondTitle',
    mobIcon: addMob,
    mobNumber: '011546250809',
    phIcon: addTel,
    phNumber: '546250809',
    timeIcon: addTime,
    time: '11:00 am - 03:00 am ',
  },
];

//  privacy policy fake data
export const privacyPolicy: PrivacyPolicyElement[] = [
  {
    id: nanoid(),
    text: 'policyFirstLorem',
  },
  {
    id: nanoid(),
    text: 'policySecondLorem',
  },
  {
    id: nanoid(),
    text: 'policyThirdLorem',
  },
  {
    id: nanoid(),
    text: 'policyFirstLorem',
  },
  {
    id: nanoid(),
    text: 'policySecondLorem',
  },
  {
    id: nanoid(),
    text: 'policyThirdLorem',
  },
];

// // Profile Data

export const initialProfileValues: UpdateUserReq = {
  f_name: '',
  l_name: '',
  phone: '',
  email: '',
  birthdate: '',
  gender: '',
  nationality: '',
  work: '',
};

export const profileLinks: ProfileLink[] = [
  {
    id: nanoid(),
    img: per,
    text: 'profileRoute',
    to: '/profile',
  },
  {
    id: nanoid(),
    text: 'wishListRoute',
    to: '/wishList',
    img: wishList,
  },
  {
    id: nanoid(),
    img: or,
    text: 'myOrdersRoute',
    to: '/profile/orders',
  },
  {
    id: nanoid(),
    img: add,
    text: 'myAddressRoute',
    to: '/profile/address',
  },
];

export const genderOptions: { value: string; label: string }[] = [
  { value: 'male', label: 'maleLabel' },
  { value: 'female', label: 'femaleLabel' },
  { value: 'other', label: 'otherLabel' },
  // Add more options as needed
];

export const addressOptions: { value: string; label: string }[] = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'mexico', label: 'Mexico' },
  // Add more countries as needed
];

export const myOrders: MyOrder[] = [
  {
    id: nanoid(),
    title: 'orderTitle',
    currency: 'menuItemCurrency',
    price: '22',
    date: '22-5-2024',
  },
  {
    id: nanoid(),
    title: 'orderTitle',
    currency: 'menuItemCurrency',
    price: '22',
    date: '22-5-2024',
  },
  {
    id: nanoid(),
    title: 'orderTitle',
    currency: 'menuItemCurrency',
    price: '22',
    date: '22-5-2024',
  },
  {
    id: nanoid(),
    title: 'orderTitle',
    currency: 'menuItemCurrency',
    price: '22',
    date: '22-5-2024',
  },
];

// About Page data

export const excellence: AboutExcellenceUnit[] = [
  {
    id: nanoid(),
    src: img1,
    title: 'excellenceTitle1',
    text: 'excellenceText1',
  },
  {
    id: nanoid(),
    src: img2,
    title: 'excellenceTitle2',
    text: 'excellenceText2',
  },
  {
    id: nanoid(),
    src: img3,
    title: 'excellenceTitle3',
    text: 'excellenceText3',
  },
  {
    id: nanoid(),
    src: img4,
    title: 'excellenceTitle4',
    text: 'ExcellenceText4',
  },
];

// Steps Orders
export const tracker: Tracker[] = [
  {
    id: nanoid(),
    img: tr1,
    text: 'orderOrdered',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: tr2,
    text: 'orderPreparing',
    status: 'upcoming',
  },
  {
    id: nanoid(),
    img: tr3,
    text: 'orderDelivering',
    status: 'upcoming',
  },
  {
    id: nanoid(),
    img: tr4,
    text: 'orderDelivered',
    status: 'upcoming',
  },
];
export const completed: Tracker[] = [
  {
    id: nanoid(),
    img: or1,
    text: 'deliveredProcess',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: or2,
    text: 'deliveryCard',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: or3,
    text: 'deliveryDone',
    status: 'complete',
  },
];
export const proceed: Tracker[] = [
  {
    id: nanoid(),
    img: pr1,
    text: 'deliveredProcess',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: pr2,
    text: 'deliveryCard',
    status: 'upcoming',
  },
  {
    id: nanoid(),
    img: pr3,
    text: 'deliveryDone',
    status: 'upcoming',
  },
];
export const cardDataTracker: Tracker[] = [
  {
    id: nanoid(),
    img: cr1,
    text: 'deliveredProcess',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: cr2,
    text: 'deliveryCard',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: cr3,
    text: 'deliveryDone',
    status: 'upcoming',
  },
];

export const paymentCardImage: GalleryElement[] = [
  { id: nanoid(), img: google },
  { id: nanoid(), img: master },
  { id: nanoid(), img: pay },
  { id: nanoid(), img: stripe },
  { id: nanoid(), img: visa },
];
export const cardInitialValues: CardData = {
  cardNumber: '',
  cardHolderName: '',
  cardDate: '',
  CVV: '',
};

export const newAddressInitialValues: CreateAddressReq = {
  name: '',
  details: '',
  phone: '',
  landing_phone: null,
};

export const singleOrder: Tracker[] = [
  {
    id: nanoid(),
    img: sOr1,
    text: 'orderedStepText',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: sOr2,
    text: 'preparingStepText',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: sOr3,
    text: 'deliveringStepText',
    status: 'complete',
  },
  {
    id: nanoid(),
    img: sOr4,
    text: 'deliveredStepText',
    status: 'complete',
  },
];
export const singleOrderElements: {
  id: string;
  img: string;
  name: string;
  addOn: string;
  price: string;
}[] = [
  {
    id: nanoid(),
    img: meat,
    name: 'menuItemName',
    addOn: 'menuAddOnCheese',
    price: 'orderPrice',
  },
  {
    id: nanoid(),
    img: meat,
    name: 'menuItemName',
    addOn: 'menuAddOnCheese',
    price: 'orderPrice',
  },
  {
    id: nanoid(),
    img: meat,
    name: 'menuItemName',
    addOn: 'menuAddOnCheese',
    price: 'orderPrice',
  },
  {
    id: nanoid(),
    img: meat,
    name: 'menuItemName',
    addOn: 'menuAddOnCheese',
    price: 'orderPrice',
  },
  {
    id: nanoid(),
    img: meat,
    name: 'menuItemName',
    addOn: 'menuAddOnCheese',
    price: 'orderPrice',
  },
];
