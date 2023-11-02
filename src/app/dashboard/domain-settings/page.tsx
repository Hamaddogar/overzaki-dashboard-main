// sections
// import { UserProfileView } from 'src/sections/user/view';

import { DomainSettingsView } from "src/sections/domain-settings/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Domain Settings',
};

export default function DomainSettingsViewPage() {
  return <DomainSettingsView />;
}
