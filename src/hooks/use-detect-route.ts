// @mui
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type ReturnType = boolean;


export function useDetectRoute(name: string): ReturnType {
  const pathname = usePathname();
  
  const [isOnRoute, setIsOnRoute] = useState<boolean>(false);
  
  useEffect(() => {
    setIsOnRoute(pathname.includes(name));
  }, [pathname,name]);

  return isOnRoute;
}