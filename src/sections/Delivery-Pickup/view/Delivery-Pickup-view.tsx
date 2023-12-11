'use client';

// @mui
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import Grid from '@mui/system/Unstable_Grid/Grid';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import Linker from 'src/sections/overview/subscription-plan/link';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useEffect } from 'react';
import { deleteLocation, fetchLocationsList } from 'src/redux/store/thunks/location';

//


// ----------------------------------------------------------------------

export default function AccountView() {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();
  const loadStatus = useSelector((state: any) => state.locations.status);
  const { list, error } = useSelector(
    (state: any) => state.locations
  );


  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchLocationsList(error));
    }
  }, [loadStatus, dispatch, error]);


  const removeBranch = (id: any) => {
    dispatch(deleteLocation(id)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchLocationsList(error));
        enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    })
  }

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
                > Add New Location </Button>
              </Linker>
            </Stack>
          </BottomActions>
        </Grid>
      </Grid>


      <Grid container alignItems='center' sx={{ mt: '31px' }} spacing="20px">
        {list.map((location: any, index: any) => <Grid key={index} xs={12} md={4}>
          <Box sx={{ p: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px #0F134914' }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap="5px">
              <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', fontSize: '.9rem !important', gap: '5px' }}>
                <Iconify icon="fluent:location-12-filled" />
                <span> {location?.name?.en || ""} </span>
              </Typography>

              <Stack direction="row" alignItems="center" columnGap="15px">
                <Link href={`/dashboard/delivery-pickup/${location._id}`} style={{ color: "white" }} >
                  <Box
                    sx={{
                      height: '24px',
                      width: '24px',
                      borderRadius: '20px',
                      backgroundColor: 'rgb(134, 136, 163,.09)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify width={15} height={15} icon="ic:round-edit" />
                  </Box>
                </Link>
                <Box
                  onClick={() => removeBranch(location._id)}
                  sx={{
                    height: '24px',
                    width: '24px',
                    borderRadius: '20px',
                    backgroundColor: 'rgb(134, 136, 163,.09)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify width={15} height={15} icon="uiw:delete" />
                </Box>
              </Stack>
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between' columnGap="5px">
              <Stack direction='column' alignItems='flex-start' columnGap='15px'>
                <Typography mt='20px' component='p' color='#8688A3' variant='caption'>
                  {location?.address?.en || ""}
                </Typography><Typography component='p' color='#8688A3' variant='caption'>
                  {location?.phoneNumber || ""}
                </Typography>
              </Stack>

              <Stack direction='row' alignItems='flex-end' columnGap='15px'>
                <Box component='img' src='/raw/pickup.svg' sx={{ color: 'red', '& svg': { fill: 'green' } }} />
                <Box component='img' src='/raw/delivery.svg' />
              </Stack>
            </Stack>
          </Box>
        </Grid>
        )}

      </Grid>
    </Container >
  );
}
