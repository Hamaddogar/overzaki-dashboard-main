// sections
// import { UserListView } from 'src/sections/user/view';

import { DomainSettingsCustomControlsView } from "src/sections/domain-settings/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Custom Domain Controls',
};

export default function UserListPage() {
  return <DomainSettingsCustomControlsView />;
}
