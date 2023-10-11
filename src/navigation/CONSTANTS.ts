export const ROUTER_PATH = {
  HOME: '/',
  CART: 'cart',
  PRODUCT_LIST: 'products',
  PRODUCT_DETAILS: '/products/details',
  LOGIN: 'login',
  SIGNUP: 'signup',
  PROFILE: 'profile',
  CHECKOUT: 'checkout',
  NOT_FOUND: '*',
} as const;

type RouterPath = typeof ROUTER_PATH;
type RouterPathKeys = keyof RouterPath;

export type T_RouterPathUnion = RouterPath[RouterPathKeys] | string;
