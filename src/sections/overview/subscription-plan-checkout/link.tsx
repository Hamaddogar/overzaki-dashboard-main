"use client"

import { ReactNode } from 'react';
import { RouterLink } from 'src/routes/components';
import { Link, LinkProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends LinkProps {
  path?: string;
  children?: ReactNode
}

export default function Linker({ path, children, ...other }: Props) {
  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      color="inherit"
      {...other}
    > {children} </Link>
  );
}