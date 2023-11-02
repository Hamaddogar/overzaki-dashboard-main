"use client"

import { useTheme, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Paper, PaperProps } from '@mui/material';
import { paths } from 'src/routes/paths';
import Linker from '../subscription-plan/link';

// ----------------------------------------------------------------------
interface Props extends PaperProps {
  elevation?: number
}

export default function AppPlan({ elevation = 7 }: Props) {
  const theme = useTheme();

  return (
    <Paper elevation={elevation} sx={{
      backgroundColor: '#1BFCB6',
      minHeight: { xs: '400px', sm: 'auto' },
      boxShadow: '0px 0px 20px #00000014',
    }} >
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        sx={{
          backgroundColor: "#1BFCB6",
          p: {
            xs: theme.spacing(5, 3, 5, 3),
            md: theme.spacing(5, 0, 5, 3),
          },
          color: 'primary.darker',
          borderRadius: 2,
          position: 'relative',
        }}
        spacing={4}
      >
        <Box component='img' src='/raw/dl.png' sx={{ width: '100%', maxWidth: '160px', maxHeight: '90px' }} />
        <Stack
          flexGrow={1}
          justifyContent="center"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
          spacing="7px"
        >
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line', }}>
            Pro Plan
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              maxWidth: 360,
              mb: { xs: 1 },
              color: ' #282B5C'
            }}
          >
            You can renew your subscription.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px', textAlign: { xs: 'center', md: 'left' } }}>
            <Linker path={paths.dashboard.general.subscriptionplan}>
              <Button variant='contained' sx={{ padding: '6px 23px',fontSize:'13px', backgroundColor: '#0F1349', '&:hover': { backgroundColor: '#0F1349' }, color: '#FFFFFF', borderRadius: '20px', fontWeight: 300 }} >
                Upgrade Plan
              </Button>
            </Linker>

            <Button variant='contained' sx={{ padding: '6px 23px',fontSize:'13px', backgroundColor: '#1AE0AA', '&:hover': { backgroundColor: '#1AE0AA' }, color: '#0F1349', borderRadius: '20px', fontWeight: 300 }} >
              Renew Plan
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
