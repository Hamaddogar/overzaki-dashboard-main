import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('Error Response:', error);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export async function getRequest(url: string, options: AxiosRequestConfig = {}) {
  const res = await axiosInstance.get(url, options);
  return res.data;
}
export async function getRequestWithParams(
  url: string,
  body: IRequest,
  options: AxiosRequestConfig = {}
) {
  const res = await axiosInstance.get(url, options);
  return res.data;
}
export async function postRequest(url: string, body: IRequest, options: AxiosRequestConfig = {}) {
  const res = await axiosInstance.post(url, body, options);
  return res.data;
}

export async function putRequest(url: string, body: IRequest, options: AxiosRequestConfig = {}) {
  const res = await axiosInstance.put(url, body, options);
  return res.data;
}

export async function deleteRequest(url: string, options: AxiosRequestConfig = {}) {
  const res = await axiosInstance.delete(url, options);
  return res.data;
}

// ----------------------------------------------------------------------
interface PostFetcherArgs {
  url: string;
  body: object;
}

export const postFetcher = async ({ url, body }: PostFetcherArgs): Promise<any> => {
  const response: AxiosResponse | undefined = await axios.post(url, body).catch((error) => {
    // Handle the error here, e.g., by logging or rethrowing
    throw error; // Rethrow the error for proper error handling in the component
  });

  if (response) {
    return response.data;
  }
  throw new Error('Failed to fetch data'); // Or another appropriate error message
};
// ----------------------------------------------------------------------

export const endpoints = {
  layout: '/layout',
  chat: '/chat',
  kanban: '/kanban',
  calendar: '/calendar',
  auth: {
    me: '/auth/me',
    refresh: '/auth/refresh',
    login: '/auth/login',
    register: '/auth/signup',
    sendotp: '/code/verify_account_otp',
    verifyotp: '/code/verify_account',
    forgotPassword: '/code/forgot_password_otp',
    forgotPasswordVerity: '/auth/forgot_password',
    loutout: '/auth/logout',
  },
  mail: {
    list: '/mail/list',
    details: '/mail/details',
    labels: '/mail/labels',
  },
  post: {
    list: '/post/list',
    details: '/post/details',
    latest: '/post/latest',
    search: '/post/search',
  },
  product: {
    list: '/product/list',
    details: '/product/details',
    search: '/product/search',
  },
  customer: {
    list: '/customers',
    search: '/customers/search',
  },
  analytic: {
    customers: '/analytics/customers',
    summary: '/analytics/summary',
    vouchers: '/analytics/vouchers',
  },
  location: {
    list: '/location',
    search: '/location/search',
  },
  orders: {
    list: '/orders',
    search: '/orders/search',
  },
  category: {
    create: '/categories',
    _list: '/categories',
    list: '/categories/all',
    search: '/category/search',
  },
  subCategory: {
    create: '/sub-categories',
    _list: '/sub-categories',
    list: '/sub-categories/all',
  },
  voucher: {
    list: '/vouchers',
    search: '/voucher/search',
  },
  deliveryZone: {
    list: '/voucher',
    search: '/voucher/search',
  },
  notification: {
    user: '/notification/user',
    users: '/notification/users',
    group: '/notification/group',
    myNotification: '/notification/my-notification',
  },
  taxSettings: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  accountDetails: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  billingsAndPlans: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  invoiceSettings: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  staffManagement: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  integrationSubscription: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  webSiteInformation: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  notificationsSettings: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
  integrations: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
};

export const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
    // 'x-tenant-id': 'tenant-1',
  },
};

export interface IRequest {}
