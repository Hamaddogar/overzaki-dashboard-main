'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';
import ReduxProvider from "../../redux/reduxProvider";
import { useEffect, useState } from 'react';
import { SplashScreen } from 'src/components/loading-screen';
import { useRouter } from 'next/navigation';
import { useAuthContext } from 'src/auth/hooks';
import { getBuilderDomain } from 'src/auth/context/jwt/utils';
// import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [builderExist, setBuilderExist] = useState(false);
  const { getBuilders } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domain = getBuilderDomain();
        if (domain) {
          setBuilderExist(domain ? true : false);
        } else {
          const response = await getBuilders();
          setBuilderExist(response);
          if (!response) {
            router.push('/builder');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ReduxProvider>
      <AuthGuard>
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            {builderExist ? (
              <DashboardLayout>
                {children}
              </DashboardLayout>
            ) : null}
          </>
        )}
      </AuthGuard>
    </ReduxProvider >
  );
}
export default Layout;