// routes
import { paths } from 'src/routes/paths';
// utils
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    console.log('Token expired');

    clearCookie('accessToken');

    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------
export function setCookie(key: string, value: string, expDays: number) {
  const d = new Date();
  d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000); // Convert expiration days to milliseconds
  let expires = 'expires=' + d.toUTCString();
  document.cookie = key + '=' + value + ';' + expires + ';path=/';
}

export function getCookie(key: string) {
  let name = key + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function clearCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Assuming setCookie and clearCookie are defined as shown in previous examples

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    // Set accessToken in a cookie instead of session storage
    setCookie('accessToken', accessToken, 7); // Expiry set to 3 days, adjust as needed

    // Set the default authorization header for Axios
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp); // Ensure this function is adapted to new context or handled appropriately
  } else {
    // Clear accessToken cookie instead of removing from session storage
    clearCookie('accessToken');

    // Remove the default authorization header from Axios
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export const setSocketURL = (URL: string | null) => {
  if (URL) {
    setCookie('socketURL', URL, 7);
  } else {
    clearCookie('socketURL');
  }
};

export const setBuilderDomain = (domainURL: string | null) => {
  if (domainURL) {
    setCookie('builder', domainURL, 7);
  } else {
    clearCookie('builder');
  }
};
export const getBuilderDomain = () => {
  return getCookie('builder');
};
