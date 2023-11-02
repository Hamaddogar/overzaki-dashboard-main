/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useState } from 'react';
// @mui
import Switch from '@mui/material/Switch/Switch';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card/Card';
import { Box, Grid, Stack, Chip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
// components
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
//
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

const users = [
  {
    name: 'Mohamed Hassan (You)',
    email: 'Mohamed.hassan@gmail.com',
    joined: '24 October, 2023',
    role: 'Owner',
  }, {
    name: 'Ali Omar',
    email: 'ali.omar99@gmail.com',
    joined: '24 October, 2023',
    role: 'Admin',
  }, {
    name: 'Hazem Islam',
    email: 'hazem.islam@gmail.com',
    joined: '24 October, 2023',
    role: 'Admin',
  },
]

// ----------------------------------------------------------------------

export default function StaffManagment() {

  const settings = useSettingsContext();

  const [data] = useState(users)


  // new order
  const [openCreateStaff, setOpenCreateStaff] = useState(false);
  const [openDelStaff, setOpenDelStaff] = useState(false);

  const toggleDrawerCommon = (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "new") setOpenCreateStaff(pv => !pv)
    else if (state === "delstaff") setOpenDelStaff(pv => !pv)
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    if (state === "new") setOpenCreateStaff(false)
    else if (state === "delstaff") setOpenDelStaff(false)
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }} pb={{ xs: 8, sm: 0 }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs
            heading="Staff Management"
            description={`${data?.length} Staff Members`}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing={{ xs: '10px', sm: '20px' }} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '150px' } }}>
              <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary' onClick={toggleDrawerCommon('new')} > Add New Admin </Button>
            </Stack>
          </BottomActions>
        </Grid>

        <Grid item xs={12}>
          <Stack
            spacing={2}
            alignItems={{ xs: 'flex-end', md: 'center' }}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            sx={{
              p: 2.5,
              pr: { xs: 2.5, md: 1 },
              pl: { xs: 2.5, md: 1 },
            }}
          >

            <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
              <TextField
                placeholder='Search by name or phone number...'
                fullWidth
                variant='filled'
                // value={filters.name}
                // onChange={handleFilterName}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <Box component='img' src='/raw/search.svg' sx={{ width: '15px' }} />
                  </InputAdornment>,
                }}
                sx={{
                  borderRadius: '16px',
                  '& .MuiFilledInput-root': {
                    borderRadius: '16px',
                  },
                  '& .MuiInputAdornment-root': {
                    marginTop: '0px !important',
                    paddingLeft: '10px'
                  },
                  '& input': {
                    color: '#8898AA',
                    paddingLeft: '10px',
                    fontSize: '14px',
                    padding: '15px 20px 15px 0px !important'
                  }
                }}
              />

              <Button variant='contained' sx={{ backgroundColor: 'rgb(15, 19, 73,.04)', borderRadius: '16px', padding: '15px 15px' }} >
                <Box component='img' src='/raw/sort.svg' />
              </Button>

              <Button variant='contained' sx={{ backgroundColor: 'rgb(15, 19, 73,.04)', borderRadius: '16px', padding: '15px 15px' }} >
                <Box component='img' src='/raw/filter.svg' />
              </Button>
            </Stack>

          </Stack>
        </Grid>

        <Grid item xs={12}>
          {data.map((order, indx) =>
            <Card key={indx}
              sx={{
                border: '2px solid transparent ',
                '&:hover': { borderColor: '#1BFCB6' },
                padding: '20px',
                boxShadow: '0px 4px 20px #0F134914',
                borderRadius: '16px',
                marginTop: '16px'
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing='20px' alignItems='center' justifyContent='space-between'>
                <Box>
                  <Typography component='p' variant="h6" sx={{ fontWeight: 900 }} > {order.name} </Typography>
                  <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }}> {order.email} </Typography>
                </Box>

                <Stack alignItems='center' direction='row' spacing={{ xs: '10px', sm: '20px' }} justifyContent={{ xs: 'space-between', sm: 'flex-start' }} >
                  <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >Joined on {order.joined}</Typography>

                  <Chip label={order.role} size='small'
                    sx={{
                      backgroundColor: order.role === 'Owner' ? '#76FDD3' : '#F1D169',
                      color: '#0F1349',
                      borderRadius: '16px'
                    }} />

                  {order.role !== 'Owner' && <Iconify style={{ cursor: 'pointer' }} icon="material-symbols:delete-outline" width={24} onClick={toggleDrawerCommon('delstaff')} />}

                  {order.role !== 'Owner' && <Iconify style={{ cursor: 'pointer' }} icon="bx:edit" width={24} onClick={toggleDrawerCommon('details')} />}

                </Stack>

              </Stack>

            </Card>
          )}
        </Grid>
      </Grid>

      {/* New Admin */}
      <DetailsNavBar
        open={openCreateStaff}
        onClose={handleDrawerCloseCommon('new')}
        title="Add New Admin"
        actions={
          <Button variant='contained' color='primary' fullWidth size='large'
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349'
            }}
          >
            Save
          </Button>
        }
      >
        <Divider flexItem />
        <Box width='100%' display='flex' flexDirection='column' gap='25px'>
          <Typography variant="body1" color="#8688A3" sx={{ my: '5px', fontWeight: 900 }} >
            Admin Personal Info
          </Typography>

          <Box>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Admin Name (English)
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Ali Omar' />
          </Box>
          <Box>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Admin Name (Arabic)
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='علي عمر' />
          </Box>


          <Box>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Email Address
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='ali.omar99@gmail.com' />
          </Box>

          <Box>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Mobile Number
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='96511812311'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                  // paddingLeft: '10px'
                },
                '& input': {
                  paddingLeft: '2px !important'
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Box component='img' src='/raw/flagN.png' sx={{ borderRadius: '20px', width: '24px', height: '20px' }} />
                </InputAdornment>,
              }}
            />
          </Box>

          <Typography variant="body1" color="#8688A3" sx={{ my: '5px', fontWeight: 900 }} >
            Admin Powers
          </Typography>
          <Box>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='button'>Edit Theme & Layout</Typography>
              <Switch />
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='button'>Add/Edit Categories</Typography>
              <Switch defaultChecked />
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='button'>Add/Edit Products</Typography>
              <Switch defaultChecked />
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='button'>Manage Orders</Typography>
              <Switch />
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='button'>Get Notifications</Typography>
              <Switch defaultChecked />
            </Stack>
          </Box>









        </Box>
      </DetailsNavBar>

      <ConfirmDialog
        open={openDelStaff}
        onClose={handleDrawerCloseCommon('delstaff')}
        noCancel={false}
        action={
          <Button fullWidth variant='soft' color='error' onClick={handleDrawerCloseCommon('delstaff')} >
            Delete
          </Button>
        }
        content={
          <Grid container spacing='15px'>
            <Grid item xs={12} md={12} >
              <CustomCrumbs heading="Remove Member" crums={false} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2'>
                Do you want to delete this Member?
              </Typography>
            </Grid>
          </Grid>
        } />
    </Container >
  );
}
