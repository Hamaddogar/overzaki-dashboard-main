'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { clearCookie, getBuilderDomain, getCookie, isValidToken, setBuilderDomain, setCookie, setSession, setSocketURL } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '../../types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  SENDOTP = 'SENDOTP',
  VERIFYOTP = 'VERIFYOTP',
  FORGOTPASSWORD = 'FORGOTPASSWORD',
  NEWPASSWORD = 'NEWPASSWORD',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.SENDOTP]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.VERIFYOTP]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.FORGOTPASSWORD]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.NEWPASSWORD]: {
    user: AuthUserType;
    socketURL?: any;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  socketURL: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
      socketURL: action.payload.socketURL
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      socketURL: action.payload.socketURL
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
      socketURL: action.payload.socketURL
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
      socketURL: null
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

type Props = {
  children: React.ReactNode;
};

const getSocketURL = (tokenKey: any) => {
  const socketBaseURL = process.env.NEXT_PUBLIC_SOCKET_URL;
  const newSocketURL = socketBaseURL + tokenKey;
  setSocketURL(newSocketURL);
  return newSocketURL;
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const refreshTokenP = getCookie('refreshToken');

      if (refreshTokenP && isValidToken(refreshTokenP)) {
        setSession(refreshTokenP);

        const response = await axios.get(endpoints.auth.refresh);

        const { accessToken, refreshToken } = response.data.data;


        const newSocketURL = getSocketURL(accessToken);

        setSession(accessToken);
        setCookie(REFRESH_KEY, refreshToken, 7)

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: response.data.data,
            socketURL: newSocketURL,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
            socketURL: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          socketURL: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      deviceName: "Device Name",
      deviceToken: "Device Token",
      email,
      password,
    };

    const response = await axios.post(endpoints.auth.login, data);

    const { accessToken, refreshToken } = response.data.data;
    console.log(accessToken);
    console.log(response.data.data);

    const newSocketURL = getSocketURL(accessToken);

    setCookie(REFRESH_KEY, refreshToken, 7)
    setSession(accessToken);
    setBuilderDomain(null);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: response.data.data,
        socketURL: newSocketURL,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        deviceName: "unique device name",
        deviceToken: "firebase token",
        firstName,
        lastName,
        country: "PK",
        phoneNumber: "+963999999991",
        email,
        password,
        preferedLanguage: ["en", "ar"],
        birthday: "19999-5-01",
        gender: "MALE"
      };

      const response = await axios.post(endpoints.auth.register, data);

      const { accessToken, refreshToken } = response.data.data;

      const newSocketURL = getSocketURL(accessToken);
      setSession(accessToken);
      setCookie(REFRESH_KEY, refreshToken, 7)
      setBuilderDomain(null);
      dispatch({
        type: Types.REGISTER,
        payload: {
          user: response.data.data,
          socketURL: newSocketURL,
        },
      });
    },
    []
  );
  // VERIFY PERMISSIONS
  const verifyPermission = useCallback(
    (data: any) => {
      const { permission, roles } = data
      const userRoles = state.user?.roles || [];
      const userPermissions = state.user?.permissions?.permissions || [];
      const hasCommonRole = userRoles.some((role: string) => roles && roles.includes(role));
      const hasCommonPermission = permission && userPermissions.includes(permission);
      if ((roles && !hasCommonRole) || (permission && !hasCommonPermission)) {
        return false;
      }
      return true;
    },
    [state]
  );
  // SENDOTP
  const sendOtp = useCallback(
    async (email: string) => {
      const data = {
        email
      };
      const response = await axios.post(endpoints.auth.sendotp, data);
      return { ...response.data };
    },
    []
  );
  // VERIFYOTP
  const verifyOtp = useCallback(
    async (email: string, otp: number) => {
      const data = {
        email,
        otp
      };
      const response = await axios.post(endpoints.auth.verifyotp, data);
      return { ...response.data };
    },
    []
  );
  // forgotPassword
  const forgotPassword = useCallback(
    async (email: string) => {
      const data = {
        email
      };
      const response = await axios.post(endpoints.auth.forgotPassword, data);
      return { ...response.data };
    },
    []
  );
  // newPassword
  const newPassword = useCallback(
    async (email: string, code: string, password: string) => {
      const data = {
        email,
        otp: Number(code),
        newPassword: password,
        deviceName: "anyDeviceKey"
      };
      const response = await axios.put(endpoints.auth.forgotPasswordVerity, data);
      const { success } = response.data;
      if (success) {
        initialize();
      }
      return { ...response.data };
    },
    [initialize]
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.get(endpoints.auth.loutout);
    setSession(null);
    clearCookie(REFRESH_KEY)
    setBuilderDomain(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);



  // Get Builder
  const getBuilders = useCallback(async () => {
    const alreadyExistDomain = getBuilderDomain();
    if (alreadyExistDomain) {
      return true;
    } else {
      const response = await axios.get(endpoints.builder.get);
      const { data } = response.data;
      if (data?.length > 0) {
        let builderDomain = data[0].domain
        setBuilderDomain(builderDomain);
        return true;
      } else {
        setBuilderDomain(null);
        return false;
      }
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      socketURL: state.socketURL,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      sendOtp,
      verifyOtp,
      forgotPassword,
      newPassword,
      verifyPermission,
      getBuilders,
    }),
    [login, logout, register, sendOtp, verifyOtp, forgotPassword, newPassword, verifyPermission, state.user, status, getBuilders]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
