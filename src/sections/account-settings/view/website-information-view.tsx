/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, TextField, InputAdornment, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

export default function AccountDetails() {

  const settings = useSettingsContext();

  const [mySubCat, setMySubCat] = React.useState('Online Store');

  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setMySubCat(event.target.value as string);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Website Information"
          description='Enter your website information and details'
        />
      </Box>

      <Box sx={{ maxWidth: '400px' }}>
        <Grid container alignItems='center' rowSpacing="20px" columnSpacing="20px" sx={{ mt: '20px' }}>

          <Grid item xs={12} >
            <Typography variant='h6' mb='20px'>
              Basic Info
            </Typography>
            <Stack direction='row' alignItems='center' spacing='15px'>
              <input type='file' id='uploadfile' name='uploadfile' style={{ display: 'none' }} />
              <label htmlFor='uploadfile' >
                <Badge
                  variant='alway'
                  color='primary'
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Box
                    component='img'
                    src='/raw/shopi.png'
                    sx={{
                      width: '80px',
                      borderRadius: '80px',
                      bgcolor: 'grey.400',
                    }}
                  />
                </Badge>
              </label>
              <Box>
                <Typography component='p' variant='button' color='#8688A3'>Edit Business Logo</Typography>
                <Typography variant='caption' color='#8688A3'>Available extensions PNG, JPG or SVG</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', my: '5px' }} >
              English Name
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='Shoppi' />
          </Grid>

          <Grid item xs={12}>
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Arabic Name (Optional)
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='سووبي' />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Business Type
            </Typography>
            <FormControl fullWidth>
              <Select
                variant='filled'
                value={mySubCat}
                sx={{
                  fontWeight: 900,
                }}
                onChange={handleChangeMySubCat}
              >
                <MenuItem value='Online Store'>Online Store</MenuItem>
                <MenuItem value='Offline Store'>Offline Store</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Social Media Accounts
            </Typography>
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Facebook account
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='facebook.com/shoppi'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="end">
                  <Iconify icon="mdi:facebook" />
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Instagram account
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='instagram.com/shoppi'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="end">
                  <Iconify icon="ri:instagram-line" />
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Youtube account
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='youtube.com/shoppi'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="end">
                  <Iconify icon="mdi:youtube" />
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <Typography component='p' variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
              Twitter account
            </Typography>
            <TextField fullWidth variant='filled' defaultValue='twitter.com/shoppi'
              sx={{
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="end">
                  <Iconify icon="ant-design:twitter-outlined" />
                </InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12}>

            <Button fullWidth size='large' variant='contained' color='primary' sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              mt: '20px'
            }}>
              Save
            </Button>
          </Grid>

        </Grid>
      </Box>

    </Container >
  );
}
