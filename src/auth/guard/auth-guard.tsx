'use client'
import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { usePathname, useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import { useGetBuilderDetailsQuery } from 'src/redux/store/services/api';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const selectedDomain = useSelector((state:RootState)=> state.selectedDomain.data)
  const getBuilderDomainDetailsRes = useGetBuilderDetailsQuery(selectedDomain?._id)
  const path = usePathname()
  const router = useRouter();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(getBuilderDomainDetailsRes?.data?.data?.planSubscription?.remainingDays === 0) {
      router.push(paths.dashboard.upgradePlans)
    }
  }, [path , getBuilderDomainDetailsRes])
  

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
