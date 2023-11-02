/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Button, Switch, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------
const countries = [
  {
    flag: '/raw/flagUSD.png',
    country: 'United States',
    value: '0%',
    checked: true
  }, {
    flag: '/raw/flagSAR.png',
    country: 'Saudi Arabia',
    value: '15%',
    checked: true
  }, {
    flag: '/raw/flagKWD.png',
    country: 'Kuwait',
    value: '5%',
    checked: true
  }, {
    flag: '/raw/flagEGP.png',
    country: 'Egypt',
    value: '15%',
    checked: false
  },
]

export default function TaxSetting() {

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Tax Settings"
          description='Control tax settings for your branches.'
        />
      </Box>

      <Box mt='20px'>
        <Typography variant="body1" sx={{ fontWeight: 900 }} >
          Merchant VAT
        </Typography>
        <FormControl fullWidth >
          <RadioGroup
            aria-labelledby="Merchant-label"
            defaultValue="yes"
            name="Merchant"
          >
            <Stack direction='row' sx={{ maxWidth: '250px' }} alignItems='center' justifyContent='space-between' >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt='20px'>
        <Typography variant="body1" sx={{ fontWeight: 900 }} >
          Do you want VAT to be included in shipping fees?
        </Typography>
        <FormControl fullWidth >
          <RadioGroup
            aria-labelledby="shipping-label"
            defaultValue="no"
            name="shipping"
          >
            <Stack direction='row' sx={{ maxWidth: '250px' }} alignItems='center' justifyContent='space-between' >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ borderWidth: '1px', my: '30px' }} />

      <Box sx={{ maxWidth: '400px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 900 }} >
              Countries
            </Typography>
            <Typography component='p' variant="caption" color='#8688A3' >
              Enter VAT of each country
            </Typography>
          </Box>
          <Box sx={{ minWidth: '100px' }}>
            <Button fullWidth startIcon={<Iconify icon="mingcute:add-fill" />} sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }} component='h5' variant='contained' color='primary'  >
              Add
            </Button>
          </Box>
        </Stack>

        {
          countries.map((country, indx) => (
            <Box mt='20px' key={indx}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row' alignItems='center' spacing='10px'>
                  <Box component='img' src={country.flag} />
                  <Typography variant="button" sx={{ fontWeight: 900 }} >
                    {country.country}
                  </Typography>
                </Stack>

                <Stack direction='row' alignItems='center' spacing='3px'>
                  <TextField variant='filled' size='small' disabled={!(country.checked)} defaultValue={country.value} sx={styles} />
                  <Switch color='primary' checked={country.checked} />
                </Stack>
              </Stack>
            </Box>
          ))
        }


        <Box sx={{ mt: '20px' }}>
          <Button fullWidth variant='contained' color='primary' size='large'
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349'
            }}>
            Save
          </Button>
        </Box>

      </Box>

    </Container >
  );
}
const styles = { borderRadius: '5px', maxWidth: '80px', '& input': { padding: '7px 7px', fontWeight: 900 }, '& .MuiInputBase-root': { borderRadius: '5px' } }