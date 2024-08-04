import {
  AboutExcellenceUnit,
  AddressData,
  CartItem,
  ContactInitialValues,
  GalleryElement,
  InitialOTPInputs,
  InitialProfileValues,
  Link,
  MyOrder,
  PrivacyPolicyElement,
  ProfileLink,
  RegisterData,
} from './types';
import arrow from '../assets/svg/header/arrow.svg';
import { nanoid } from '@reduxjs/toolkit';

// menu images
import chicken from './svg/menu/chicken.svg';
import meat from './svg/menu/meat.svg';
import chicken2 from './svg/menu/chicken2.svg';
import meat2 from './svg/menu/meat2.svg';
import steak from './svg/menu/steak.svg';
import bread from './svg/menu/bread.svg';
import soup from './svg/menu/soup.svg';

import cheese from './svg/menu/addOns/cheese.svg';
import sauce from './svg/menu/addOns/sauce.svg';
import pickles from './svg/menu/addOns/pickles.svg';
import salad from './svg/menu/addOns/salad.svg';
import fries from './svg/menu/addOns/fries.svg';
// Menu Slider Images

import burger from '../assets/svg/burger.svg';
import drinks from '../assets/svg/drinks.svg';
import shawarma from '../assets/svg/shawarma.svg';
import pizza from '../assets/svg/pizza.svg';
import chickenSlider from '../assets/svg/chicken.svg';
import barbique from '../assets/svg/barbique.svg';

// Address Images and icons
import address from './svg/address.svg';
import addMob from './svg/addMob.svg';
import addTel from './svg/addTel.svg';
import addTime from './svg/addTime.svg';

// Gallery Images

import im1 from './svg/gallery/firstImage.svg';
import im2 from './svg/gallery/secondImage.svg';
import im3 from './svg/gallery/thirdImage.svg';
import im4 from './svg/gallery/fourthImage.svg';
import im5 from './svg/gallery/fifthImage.svg';
import im6 from './svg/gallery/sixthImage.svg';
import im7 from './svg/gallery/seventhImage.svg';
import im8 from './svg/gallery/eighthImage.svg';
import im9 from './svg/gallery/ninethImage.svg';
import im10 from './svg/gallery/tenthImage.svg';
import im11 from './svg/gallery/eleventhImage.svg';
import im12 from './svg/gallery/twilvthImage.svg';

// Links Of Profile
import per from './svg/profile/person.svg';
import or from './svg/profile/orders.svg';
import add from './svg/profile/address.svg';
import wishList from './svg/profile/wishlist.svg';

// OrdersImage
import orderProfile from './svg/menu/ordersProfile.svg';
export const whyImg =
  'https://s3-alpha-sig.figma.com/img/d552/f25b/5c2e330ed5e99377cbefe80ee7603291?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nGIxE5JdKXbi8pU2dIq9pCbUwr4LG0ZZRGyQn3csFqPvedatuTPmBw3a6l1Mosn53aJIdKdCt8vzg3nTnZrXpxAW7djZoUXtx6IgBO4H99IOWZ0P0UxPQfOxf54TDTLaYzJfBdKjnsKdcOoIJ-z8vMIez1uvZhbKy7Z54lnVQRKVKjpHCi8pg42krvzv9~wUvx6hggDrTEt2UJi4DnHWRPbZBQ5NeOU~0V-FRHVz2U5HKG6s5je~hpcRcL7B5~cA6VNhvjZ90pIZoaQ69mIViEeq0~Uj21mht84uklL5Hme~81uCetB0Uw284qKt5SvWMxd78f~7aDXdAz-3d5fhtQ__';

// about Excellence Images
import img1 from "../assets/svg/about/vision.svg" 
import img2 from "../assets/svg/about/mission.svg" 
import img3 from "../assets/svg/about/story.svg" 
import img4 from "../assets/svg/about/excellence.svg" 


// Links Starts Here
export const links: Link[] = [
  { text: 'main', to: '/' },
  { text: 'about', to: '/about' },
  { text: 'newsRoute', to: '/' },
  { text: 'jobsRoute', to: '/jobs' },
  { text: 'cartRoute', to: '/cart' },
  { text: 'wishListRoute', to: '/wishList' },
  { text: 'menuRoute', to: '/menuList' },
  { text: 'branchesRoute', to: '/branches' },
  { text: 'PrivacyPolicyRoute', to: '/privacy' },
  { text: 'termsPolicyRoute', to: '/terms' },
  { text: 'paymentPolicyRoute', to: '/payment' },
  { text: 'deliveryPolicyRoute', to: '/delivery' },
  { text: 'refundPolicyRoute', to: '/refund' },
  { text: 'contactUsRoute', to: '/contact' },
  { text: 'loginRoute', to: '/login' },
  { text: 'galleryRoute', to: '/gallery' },
  { text: 'myProfileRoute', to: '/profile' },
];

export const headerLinks: Link[] = [
  { text: 'main', to: '/' },
  { text: 'about', to: '/about' },
  { text: 'branchesRoute', to: '/branches' },
  { text: 'menuRoute', to: '/menuList' },
  { text: 'contactUsRoute', to: '/contact' },
];

export const navBarLinks: Link[] = [
  { text: 'main', to: '/' },
  { text: 'myProfileRoute', to: '/profile', img: arrow },
  { text: 'cartRoute', to: '/cart' },
  { text: 'about', to: '/about' },
  { text: 'branchesRoute', to: '/branches', img: arrow },
  { text: 'menuRoute', to: '/menuList' },
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
  mobile: '',
  subject: '',
  text: '',
};

// Menu Items starts here
export const menuItems: CartItem[] = [
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: chicken,
    addOns: [
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
        isChecked: true,
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: meat,
    addOns: [
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
        isChecked: true,
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: chicken2,
    addOns: [
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
        isChecked: true,
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: meat2,
    addOns: [
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
        isChecked: true,
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: steak,
    addOns: [
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
        isChecked: true,
      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
        isChecked: true,
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: bread,
    addOns: [
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: soup,
    addOns: [
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
      },
    ],
  },
  {
    id: nanoid(),
    name: 'menuItemName',
    price: 22,
    currency: 'menuItemCurrency',
    amount: 1,
    img: chicken,
    addOns: [
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
      },
      {
        id: nanoid(),
        isChecked: false,
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
      },
    ],
  },
];
// Menu Slider
export const menuCategories: { icon: string; label: string }[] = [
  { icon: burger, label: 'burgerText' },
  { icon: drinks, label: 'drinkText' },
  { icon: shawarma, label: 'shawText' },
  { icon: pizza, label: 'pizza' },
  { icon: chickenSlider, label: 'chicken' },
  { icon: barbique, label: 'barb' },
];

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

// Gallery
export const gallery: GalleryElement[] = [
  { id: nanoid(), img: im1 },
  { id: nanoid(), img: im2 },
  { id: nanoid(), img: im3 },
  { id: nanoid(), img: im4 },
  { id: nanoid(), img: im5 },
  { id: nanoid(), img: im6 },
  { id: nanoid(), img: im7 },
  { id: nanoid(), img: im8 },
  { id: nanoid(), img: im9 },
  { id: nanoid(), img: im10 },
  { id: nanoid(), img: im11 },
  { id: nanoid(), img: im12 },
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

// Profile Data

export const initialProfileValues: InitialProfileValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: '',
  country: '',
  profession: '',
};

export const profileLinks:ProfileLink[] = [
  {
    id: nanoid(),
    img: per,
    text: 'profileRoute',
    to: '/profile',
  },
   { 
      id:nanoid(),
      text: 'wishListRoute',
      to: '/wishList' ,
      img:wishList
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
  { value: 'ذكر', label: 'ذكر' },
  { value: 'انثى', label: 'انثى' },
  { value: 'اخر', label: 'اخر' },
  // Add more options as needed
];

export const countryOptions: { value: string; label: string }[] = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'mexico', label: 'Mexico' },
  // Add more countries as needed
];

export const myOrders:MyOrder[] = [
  {
    id: nanoid(),
    img: orderProfile,
    title: 'orderTitle',
    price: 'orderPrice',
    date: '22-5-2024',
    address: 'orderAddress',
  },
  {
    id: nanoid(),
    img: orderProfile,
    title: 'orderTitle',
    price: 'orderPrice',
    date: '22-5-2024',
    address: 'orderAddress',
  },
  {
    id: nanoid(),
    img: orderProfile,
    title: 'orderTitle',
    price: 'orderPrice',
    date: '22-5-2024',
    address: 'orderAddress',
  },
  {
    id: nanoid(),
    img: orderProfile,
    title: 'orderTitle',
    price: 'orderPrice',
    date: '22-5-2024',
    address: 'orderAddress',
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