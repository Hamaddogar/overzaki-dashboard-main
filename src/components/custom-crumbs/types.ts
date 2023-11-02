// @mui
import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomCrumbsProps extends BreadcrumbsProps {
  heading?: string;
  description?: string;
  crums?: Boolean
}

export interface BreadcrumbItem extends BreadcrumbsProps {
  name: string;
  href: string;
};