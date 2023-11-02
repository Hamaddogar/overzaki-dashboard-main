'use client';

// @mui
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import Grid from '@mui/system/Unstable_Grid/Grid';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import Linker from 'src/sections/overview/subscription-plan/link';
//


// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid xs={12} sm={6}>
          <CustomCrumbs
            heading='Delivery & Pickup'
            description='Add and control your business locations'
            crums={false}
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}>
              <Linker path={paths.dashboard.deliveryPickup.new} width='100%'>
                <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }} component='button' variant='contained' color='primary'
                // onClick={toggleDrawerCommon('cat')}
                > Add New Location </Button>
              </Linker>
            </Stack>
          </BottomActions>
        </Grid>
      </Grid>


      <Grid container alignItems='center' sx={{ mt: '31px' }} spacing="20px">
        <Grid xs={12} md={4}>
          <Box sx={{ p: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px #0F134914' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap="5px">
              <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', fontSize: '.9rem !important', gap: '5px' }}>
                <Iconify icon="fluent:location-12-filled" />
                <span> Main Branch </span>
              </Typography>

              <Stack direction='row' alignItems='center' columnGap='15px'>
                <Box component='img' src='/raw/pickup.svg' sx={{ color: 'red', '& svg': { fill: 'green' } }} />
                <Box component='img' src='/raw/delivery.svg' />
              </Stack>
            </Stack>

            <Typography mt='20px' component='p' color='#8688A3' variant='caption'>
              Kuwait, Al Nuzha Block 1, 502 street
            </Typography><Typography component='p' color='#8688A3' variant='caption'>
              +965128743291
            </Typography>
          </Box>
        </Grid>



        <Grid xs={12} md={4}>
          <Box sx={{ p: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px #0F134914' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap="5px">
              <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', fontSize: '.9rem !important', gap: '5px' }}>
                <Iconify icon="fluent:location-12-filled" />
                <span> Kuwait Mall Branch </span>
              </Typography>

              <Stack direction='row' alignItems='center' columnGap='15px'>
                {/* <Box component='img' src='/raw/pickup.svg' sx={{ color: 'red', '& svg': { fill: 'green' } }} /> */}
                <Box component='img' src='/raw/delivery.svg' />
              </Stack>
            </Stack>

            <Typography mt='20px' component='p' color='#8688A3' variant='caption'>
              Kuwait, Al Nuzha, Kuwait Mall, Floor 2
            </Typography><Typography component='p' color='#8688A3' variant='caption'>
              +965128743291
            </Typography>
          </Box>
        </Grid>

        <Grid xs={12} md={4}>
          <Box sx={{ p: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px #0F134914' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap="5px">
              <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', fontSize: '.9rem !important', gap: '5px' }}>
                <Iconify icon="fluent:location-12-filled" />
                <span> Kuwait Mall Branch </span>
              </Typography>

              <Stack direction='row' alignItems='center' columnGap='15px'>
                {/* <Box component='img' src='/raw/pickup.svg' sx={{ color: 'red', '& svg': { fill: 'green' } }} /> */}
                <Box component='img' src='/raw/delivery.svg' />
              </Stack>
            </Stack>

            <Typography mt='20px' component='p' color='#8688A3' variant='caption'>
              Kuwait, Al Nuzha Block 1, 502 street
            </Typography><Typography component='p' color='#8688A3' variant='caption'>
              +965128743291
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
