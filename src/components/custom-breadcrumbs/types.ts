// @mui
import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  heading?: string;
  moreLink?: string[];
  activeLast?: any;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
}
export interface CustomCrumbsProps extends BreadcrumbsProps {
  heading?: string;
  description?: string;
}
