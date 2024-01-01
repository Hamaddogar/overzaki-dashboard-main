import { StackProps } from '@mui/material/Stack';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export type NavConfigProps = {
  hiddenLabel?: boolean;
  itemGap?: number;
  iconSize?: number;
  itemRadius?: number;
  itemPadding?: string;
  currentRole?: string;
  itemSubHeight?: number;
  itemRootHeight?: number;
  currentRoles?: string[];
  currentPermissions?: string[];
};

export type NavItemProps = ListItemButtonProps & {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active: boolean;
  externalLink?: boolean;
};

export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  permissions?: string[];
  children?: any;
};

export type NavSectionProps = StackProps & {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
  config?: NavConfigProps;
};
