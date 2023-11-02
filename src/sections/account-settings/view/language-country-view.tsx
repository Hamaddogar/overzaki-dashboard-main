/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Switch from '@mui/material/Switch/Switch';
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Button, Divider } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------
const curriencies = [
  {
    flag: '/raw/flagUSD.png',
    country: 'United States',
    notation: 'USD',
    checked: true
  }, {
    flag: '/raw/flagSAR.png',
    country: 'Saudi Arabia',
    notation: 'SAR',
    checked: true
  }, {
    flag: '/raw/flagKWD.png',
    country: 'Kuwait',
    notation: 'KWD',
    checked: true
  }, {
    flag: '/raw/flagEGP.png',
    country: 'Egypt',
    notation: 'EGP',
    checked: false
  },
]

export default function LanguageCountry() {

  const settings = useSettingsContext();

  // const handleToggleSwitch = (e)


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Languages & Countries"
        />
      </Box>

      <Box sx={{ maxWidth: '600px' }}>
        <Box>
          <Typography variant='h6'>
            Default Language
          </Typography>
          <Typography variant='caption' color='#8688A3'>
            Select the default language of your website.
          </Typography>
        </Box>


        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          mt:'25px'
        }}>
          <Button sx={{ background: 'rgb(27, 252, 182,.1)', color: '#0F1349', border: '2px solid #1BFCB6', borderRadius: '16px', width: '150px', height: '105px' }} >
            <Typography variant='button' >
              <span>العربية</span> <br />
              <span>أ ب ت</span>
            </Typography>
          </Button>


          <Button sx={{ background: 'rgb(134, 136, 163,.1)', color: '#0F1349', border: '2px solid #F0F0F4', borderRadius: '16px', width: '150px', height: '105px' }} >
            <Typography variant='button' >
              <span>English</span> <br />
              <span>ABC</span>
            </Typography>
          </Button>

          <Button sx={{ background: 'rgb(134, 136, 163,.1)', color: '#0F1349', border: '2px solid #F0F0F4', borderRadius: '16px', width: '150px', height: '105px' }} >
            <Typography variant='button' >
              <span>French</span> <br />
              <span>ÀBÇ</span>
            </Typography>
          </Button>


        </Box>

      </Box>


      <Divider sx={{ borderWidth: '1px', my: '30px' }} />
      <Box sx={{ maxWidth: '600px' }}>

        <Stack direction='row' alignItems='center' justifyContent='space-between' >
          <Box>
            <Typography variant='h6'>
              Currencies
            </Typography>
            <Typography variant='caption' color='#8688A3'>
              Select the available currencies.
            </Typography>
          </Box>

          <Button
            startIcon={<Iconify icon="mingcute:add-fill" />}
            variant='contained' color='primary' sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349'
            }}>
            Add
          </Button>
        </Stack>

        <Box sx={{ mt: '20px' }}>
          {
            curriencies.map((currency, indx) => (<Stack key={indx} direction='row' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing='10px' mt='15px'>
                <Box component='img' src={currency.flag} />
                <Typography variant='button'>{currency.country}</Typography>
                <Typography variant='button' color='#8688A3'>({currency.notation})</Typography>
              </Stack>
              <Switch checked={currency.checked} />
            </Stack>))
          }
        </Box>

      </Box>

    </Container >
  );
}
