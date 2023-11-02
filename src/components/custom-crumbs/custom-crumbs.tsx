"use client"

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
//
// eslint-disable-next-line import/no-cycle
import { useBreadcrumbs } from 'src/app/dashboard/components/useBreadcrumbs';
import { BreadcrumbItem, CustomCrumbsProps } from './types';
import LinkItem from './link-item';
// ----------------------------------------------------------------------

export default function CustomCrumbs({ heading, description, crums = true, sx, ...other }: CustomCrumbsProps) {
  const breadcrumbs = useBreadcrumbs();
  const lastLink = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Box sx={{ ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* BREADCRUMBS */}
          {crums && <Breadcrumbs separator={<Box component="img" src='/raw/chevron.svg' />} {...other}>
            {breadcrumbs.map((breadcrumb: BreadcrumbItem, index: number) => (
              <LinkItem
                key={index}
                link={breadcrumb}
                activeLast={lastLink.name}
              />
            ))}
          </Breadcrumbs>}
          {/* HEADING */}
          {heading && (
            <Typography mt={1.3} variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}
          {/* DESCRIPTION */}
          {description && (
            <Typography variant="subtitle2" sx={{ opacity: .6 }} gutterBottom>
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

