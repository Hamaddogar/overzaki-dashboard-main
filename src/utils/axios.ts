import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getBuilderDomain } from 'src/auth/context/jwt/utils';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  // headers: {
  //   'x-tenant-id': 'stuffystallion2635.overzaki.info',
  // },
});

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
    list: '/products',
    details: '/product/details',
    search: '/product/search',
    varient: '/varient',
    rows: '/rows',
  },
  builder: {
    list: '/builder',
    save: '/design/save',
    logo: '/design/logo_image',
    headerImage: '/design/header_image',
    get: '/builder?type=website',
    search: '/builder/search',
  },
  customer: {
    list: '/customers',
    search: '/customers/search',
  },
  paymentMethod: {
    list: '/payment-methods',
    search: '/payment-methods/search',
  },
  brand: {
    list: '/brand/all',
    search: '/brand',
  },
  analytic: {
    chart: '/analytics/chart_data?type=monthly&filter=last-month&withpervious=0&withperviousYear=1',
    global: '/analytics/global-analytics?filter=last-week',
    order: '/analytics/order-analytics?filter=last-week',
    bestSellingItems: '/analytics/best-selling-items?filter=last-month',
    bestSellingCategories: '/analytics/best-selling-categories?filter=last-week',
    bestSellingBranches: '/analytics/best-selling-branches?filter=last-month',
    summary: '',
    customers: '',
    vouchers: '',
  },
  deliveryPickup: {
    branches: '/delivery-pickup/branches',
    workingHours: '/delivery-pickup/working-hours',
    deliveryZones: '/delivery-pickup/delivery-zones',
  },
  location: {
    list: '/location',
    search: '/location/search',
  },
  orders: {
    myOrders: '/orders/my_order',
    viaAdmin: '/orders/via_admin',
    cancel: '/orders/cancel',
    status: '/orders/status',
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
  icon: {
    create: '/icon-category',
    app: '/app-icon',
  },
  style: {
    create: '/style-category',
    app: '/app-style',
  },
  voucher: {
    list: '/vouchers',
    search: '/voucher/search',
  },
  role: {
    list: '/roles',
    search: '/roles/search',
  },
  permission: {
    list: '/permissions',
    search: '/permissions/search',
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
    list: '/invoiceSettings',
    search: '/invoiceSettings',
  },
  staffManagement: {
    list: '/staffManagement',
    search: '/staffManagement',
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
    list: '/notificationsSettings/',
    search: '/notificationsSettings/',
  },
  integrations: {
    list: '/taxSettings/',
    search: '/taxSettings/',
  },
};

export const defaultConfig = () => {
  const tanentId = getBuilderDomain() || '';
  let headersObj: any = {
    'Content-Type': 'application/json',
  };
  if (tanentId) {
    headersObj = {
      ...headersObj,
      'x-tenant-id': tanentId,
    };
  }
  return {
    headers: headersObj,
  };
};

export interface IRequest {}
