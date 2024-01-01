'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
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
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.SENDOTP]: {
    user: AuthUserType;
  };
  [Types.VERIFYOTP]: {
    user: AuthUserType;
  };
  [Types.FORGOTPASSWORD]: {
    user: AuthUserType;
  };
  [Types.NEWPASSWORD]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
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

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const refreshTokenP = sessionStorage.getItem(REFRESH_KEY);

      if (refreshTokenP && isValidToken(refreshTokenP)) {
        setSession(refreshTokenP);

        const response = await axios.get(endpoints.auth.refresh);

        const { accessToken, refreshToken } = response.data.data;

        console.log("response", response);


        setSession(accessToken);
        sessionStorage.setItem(REFRESH_KEY, refreshToken);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: response.data.data,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
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

    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: response.data.data,
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

      setSession(accessToken);
      sessionStorage.setItem(REFRESH_KEY, refreshToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: response.data.data,
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
      const userPermissions = state.user?.permissions || [];
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
    sessionStorage.removeItem(REFRESH_KEY)
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
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
      verifyPermission
    }),
    [login, logout, register, sendOtp, verifyOtp, forgotPassword, newPassword, verifyPermission, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
