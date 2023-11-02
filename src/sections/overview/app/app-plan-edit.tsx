// @mui
import { useResponsive } from 'src/hooks/use-responsive';

import { Box, Paper, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme, } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import Linker from '../subscription-plan/link';

// ----------------------------------------------------------------------
export default function AppPlanandEdit() {
  const theme = useTheme();
  const mdDown = useResponsive('down', 'md');
  return (
    <Paper sx={{
      boxShadow: { xs: '0px 0px 20px #00000014', md: 'none' },
      background: { xs: 'rgb(255, 255, 255)', md: 'transparent' },
      borderRadius: 2,
    }}>
      <Grid sx={{ borderRadius: 2 }} container alignItems='center' justifyContent='center' columnSpacing={{ xs: 0, md: 3 }} rowSpacing={{ xs: 0, md: 3 }} >

        <Grid item xs={12} md={6}>
          <Paper sx={{
            borderRadius: 2,
            boxShadow: { xs: 'none', md: '0px 0px 20px #00000014' }
          }}>
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
                borderRadius: mdDown ? theme.spacing(2, 2, 0, 0) : theme.spacing(2, 2, 2, 2),
                position: 'relative',
              }}
              spacing={4}
            >
              <Box component='img' src='/raw/dl.png' sx={{ width: '100%', maxWidth: '140px', maxHeight: '90px' }} />
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

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Linker path={paths.dashboard.general.subscriptionplan} sx={{ width: { xs: '100%', md: 'auto' } }}>
                    <Button variant='contained' sx={{ width: { xs: '100%', md: 'auto' }, padding: '6px 23px', fontSize: '13px', backgroundColor: '#0F1349', '&:hover': { backgroundColor: '#0F1349' }, color: '#FFFFFF', borderRadius: '20px', fontWeight: 300 }} >
                      Upgrade Plan
                    </Button>
                  </Linker>

                  <Button variant='contained' sx={{ width: { xs: '100%', md: 'auto' }, padding: '6px 23px', fontSize: '13px', backgroundColor: '#1AE0AA', '&:hover': { backgroundColor: '#1AE0AA' }, color: '#0F1349', borderRadius: '20px', fontWeight: 300 }} >
                    Renew Plan
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>




        <Grid item xs={12} md={6}>
          <Paper sx={{
            borderRadius: 2,
            boxShadow: { xs: 'none', md: '0px 0px 20px #00000014' }
          }}>
            <Stack
              flexDirection={{ xs: 'column-reverse', md: 'row' }}
              justifyContent={{ xs: 'center', md: 'space-between' }}
              sx={{
                p: theme.spacing(5, 3, 5, 3),
                borderRadius: 2,
                position: 'relative',
              }}
              spacing={4}
            >
              <Stack
                flexGrow={1}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{ textAlign: 'left', width: '100%' }}
                spacing="7px"
              >
                <Typography variant="h4" sx={{ whiteSpace: 'pre-line', }}>
                  Want Custom Edits?
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    maxWidth: 360,
                    mb: { xs: 1 },
                    color: '#8688A3'
                  }}
                >
                  You can renew your subscription.
                </Typography>

                <Box display='flex' flexWrap='wrap' gap='5px' alignItems='center' >
                  <Button variant='contained' startIcon={<Box component='img' src='/raw/OverZaki.svg' />} sx={{
                    background: `transparent linear-gradient(270deg, #1BFCB6 0%, #0DE5FD 100%) 0% 0% no-repeat padding-box`,
                    color: '#0F1349', borderRadius: '20px', fontWeight: 900, padding: '6px 23px', fontSize: '13px',
                    width: { xs: '100%', md: 'auto' }
                  }} >
                    Call Me
                  </Button>
                  <Linker path={paths.dashboard.tasks.root} >
                    <Button endIcon={<Box component='img' src='/raw/arrow-right.svg' />} variant='contained'
                      sx={{
                        padding: '6px 23px', fontSize: '13px', backgroundColor: '#F5F5F8', opacity: 0.8, color: '#0F1349', borderRadius: '20px', fontWeight: 300, '&:hover': { backgroundColor: '#F5F5F8', },
                        width: { xs: '100%', md: 'auto' }
                      }} >
                      You have 2 tasks
                    </Button>
                  </Linker>
                </Box>
              </Stack>
              <Box textAlign={{ xs: 'center', md: 'right' }}>
                <Box component='img' src='/raw/custom.svg' sx={{ maxWidth: '65px', maxHeight: '60px' }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>






      </Grid>
    </Paper>
  );
}
