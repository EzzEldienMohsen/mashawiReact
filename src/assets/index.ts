import { CartItem, InitialOTPInputs, Link, RegisterData } from "./types";
import arrow from '../assets/svg/header/arrow.svg';
import { nanoid } from "@reduxjs/toolkit";

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





// Links Starts Here
export const links:Link[] = [
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

export const headerLinks:Link[] = [
  { text: 'main', to: '/' },
  { text: 'about', to: '/about' },
  { text: 'branchesRoute', to: '/branches' },
  { text: 'menuRoute', to: '/menuList' },
  { text: 'contactUsRoute', to: '/contact' },
];


export const navBarLinks:Link[] = [
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
  { text: 'lang',to:"", img: arrow },
];
export const myProfileLinks:Link[] = [
  { text: 'wishListRoute', to: '/wishList' },
  { text: "myOrdersRoute", to: '/profile/orders' },
  { text:  "myAddressRoute", to: '/profile/address' },

];

export const privacyLinks:Link[] = [
    { text: 'PrivacyPolicyRoute', to: '/privacy' },
  { text: 'termsPolicyRoute', to: '/terms' },
  { text: "paymentPolicyRoute", to: '/payment' },
  { text: 'deliveryPolicyRoute', to: '/delivery' },
  { text: 'refundPolicyRoute', to: '/refund' },
]
// Links Ends Here

// Form Values Starts Here

export const registerValues:RegisterData = {
  f_name: '',
  l_name: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export const initialOTP:InitialOTPInputs = {
  firstNum: '',
  secondNum: '',
  thirdNum: '',
  fourthNum: '',
  fifthNum: '',
  sixthNum: '',
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
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
                isChecked:true

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
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnPickles',
        img: pickles,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithPickles',
        text2: 'menuAddOnWithOutPickles',
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnFries',
        img: fries,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithFries',
        text2: 'menuAddOnWithOut',
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnSalad',
        img: salad,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithSalad',
        text2: 'menuAddOnWithOutSalad',
                isChecked:true

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
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnCheese',
        img: cheese,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithCheese',
        text2: 'MenuAddOnWithOutCheese',
                isChecked:true

      },
      {
        id: nanoid(),
        name: 'menuAddOnDibs',
        img: sauce,
        price: 3,
        currency: 'menuItemCurrency',
        text1: 'menuAddOnWithDibs',
        text2: 'menuAddOnWithOutDibs',
                isChecked:true

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