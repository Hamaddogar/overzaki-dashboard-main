// sections
import { SplashScreen } from 'src/components/loading-screen';
import { AddNewTheme } from 'src/sections/design/view/addTheme';
import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: App',
};

export default function OverviewAppPage() {
  // return <AddNewTheme />;
  // return <SplashScreen />;
  return <OverviewAppView />;
}
