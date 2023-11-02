// @mui
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid, { GridProps } from '@mui/material/Grid/Grid';
import { Box } from '@mui/material';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import { ReactNode } from 'react';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
// theme

// ----------------------------------------------------------------------
interface Props extends GridProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  description?: string;
  icon?: string;
  path?: string;
}


export default function AppHolder({ children, title, subtitle, description, icon, path }: Props) {

  return (
    <Grid container alignItems='center' justifyContent='space-between' rowSpacing='20px'>
      <Grid item xs='auto'>
        <Typography variant="h5" sx={{ whiteSpace: 'pre-line', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {title} {icon && <Box component='img' src={icon} />}
        </Typography>
        <Typography component='span' variant="subtitle2" sx={{ opacity: 0.6 }} >
          {description}
        </Typography>
      </Grid>

      <Grid item xs='auto'>
        {path && subtitle && <Link
          component={RouterLink}
          href={path}
          underline="none"
          color="inherit"
        >
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
            <span>{subtitle}</span> <Box component='img' src='/raw/arrow-more.svg' sx={{ width: '22px', pl: '7px' }} />
          </Typography> </Link>}
        {(subtitle && !path) &&
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
            <span>{subtitle}</span> <Box component='img' src='/raw/arrow-more.svg' sx={{ width: '22px', pl: '7px' }} />
          </Typography>}
      </Grid>

      <Grid item xs={12}>
        <Scrollbar>
          <Stack alignItems='center' spacing='20px' direction='row' pb={3} px={1}>
            {children}
          </Stack>
        </Scrollbar>
      </Grid>
    </Grid>
  );
}
