import { Link } from "./types";
import arrow from '../assets/svg/header/arrow.svg';







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