/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, TextField, InputAdornment, Button } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

export default function AccountDetails() {

  const settings = useSettingsContext();


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Account Settings"
          description='Update your account info'
        />
      </Box>

      <Box sx={{ maxWidth: '500px' }}>
        <Grid container alignItems='center' rowSpacing="20px" columnSpacing="20px" sx={{ mt: '20px' }}>
          <Grid item xs={12} md={6}>
            <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              First Name
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Ahmedh' />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Last Name
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Omar' />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Email Address
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='ahmed.omar@gmail.com' />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Country
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Kuwait' name='Country'
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
                  <Stack direction='row' alignItems='center' spacing="8px">
                    <Box component='img' src='/raw/flagN.png' />
                  </Stack>
                </InputAdornment>,
                endAdornment: <InputAdornment position="end">
                  <Stack direction='row' alignItems='center' spacing="8px">
                    <Iconify icon="mingcute:down-fill" />
                  </Stack>
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Password
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Password' name='Password' type='Password'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                  // paddingLeft: '10px'
                }
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <Typography variant='body2' color='#8688A3' sx={{ cursor: 'pointer' }} >Change</Typography>
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12}>

            <Button fullWidth size='large' variant='contained' color='primary' sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px'
            }}>
              Save
            </Button>
          </Grid>

        </Grid>
      </Box>

    </Container >
  );
}
