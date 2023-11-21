import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

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
  layout: '/api/layout',
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    refresh: '/api/auth/refresh',
    login: '/api/auth/login',
    register: '/api/auth/signup',
    sendotp: '/api/code/verify_account_otp',
    verifyotp: '/api/code/verify_account',
    forgotPassword: '/api/code/forgot_password_otp',
    forgotPasswordVerity: '/api/auth/forgot_password',
    loutout: '/api/auth/logout',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
