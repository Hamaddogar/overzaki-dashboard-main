/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Typography, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'Shipping & Delivery', label: 'Shipping & Delivery' },
  { value: 'Accounting & Finance', label: 'Accounting & Finance' },
  { value: 'Marketing', label: 'Marketing' },
];

// ----------------------------------------------------------------------

export default function MyTasksBookFile() {

  const settings = useSettingsContext();

  const [value, setValue] = useState('Shipping & Delivery');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Integrations" crums={false} />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            placeholder='Search...'
            fullWidth
            variant='filled'
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Box component='img' src='/raw/search.svg' sx={{ width: '15px' }} />
              </InputAdornment>,
            }}
            sx={{
              '& .MuiInputAdornment-root': {
                marginTop: '0px !important',
                paddingLeft: '10px'
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChangeTab}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{
                    px: 2.5,
                    boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                  }}
                >
                  {STATUS_OPTIONS.map((tab) => (
                    <Tab
                      key={tab.value}
                      iconPosition="end"
                      value={tab.value}
                      label={tab.label}
                    />
                  ))}
                </TabList>
              </Box>

              <TabPanel value="Shipping & Delivery" sx={{ px: 0, pb: 0 }}>
                <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                  Improve your website preformation with web integration tools.
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/i1.png',
                      title: 'Aramex',
                      des: "Aramex provides solutions for e-stores by delivering their shipments to any place ",
                      price: 'Free'
                    }, {
                      logo: '/raw/i2.png',
                      title: 'DHL Express',
                      des: "A logistics company covers more than 220 countries across the world, and provid",
                      price: '20 KWD/year'
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '53px' }}>
                            <Box component='img' src={product.logo} alt=" " />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ mb: '20px', fontSize: '.8rem', opacity: .8 }} > {product.des} </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', opacity: .7 }} > {product.price} </Typography>
                          </Grid>
                          <Grid item xs='auto'>
                            <Button sx={{
                              backgroundColor: 'rgb(27, 252, 182)',
                              '&:hover': { backgroundColor: 'rgb(27, 252, 182)' },
                              color: '#0F1349', fontSize: '13px', borderRadius: '16px',
                              padding: "6px 17px", boxShadow: '0px 6px 20px #1BFCB633'
                            }}>
                              Activate
                            </Button>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

              <TabPanel value="Accounting & Finance" sx={{ px: 0, pb: 0 }}>
                <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                  Improve your website preformation with web integration tools.
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/i1.png',
                      title: 'Aramex',
                      des: "Aramex provides solutions for e-stores by delivering their shipments to any place ",
                      price: 'Free'
                    }, {
                      logo: '/raw/i2.png',
                      title: 'DHL Express',
                      des: "A logistics company covers more than 220 countries across the world, and provid",
                      price: '20 KWD/year'
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '53px' }}>
                            <Box component='img' src={product.logo} alt=" " />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ mb: '20px', fontSize: '.8rem', opacity: .8 }} > {product.des} </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', opacity: .7 }} > {product.price} </Typography>
                          </Grid>
                          <Grid item xs='auto'>
                            <Button sx={{
                              backgroundColor: 'rgb(27, 252, 182)',
                              '&:hover': { backgroundColor: 'rgb(27, 252, 182)' },
                              color: '#0F1349', fontSize: '13px', borderRadius: '16px',
                              padding: "6px 17px", boxShadow: '0px 6px 20px #1BFCB633'
                            }}>
                              Activate
                            </Button>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

              <TabPanel value="Marketing" sx={{ px: 0, pb: 0 }}>
                <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                  Improve your website preformation with web integration tools.
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/i1.png',
                      title: 'Aramex',
                      des: "Aramex provides solutions for e-stores by delivering their shipments to any place ",
                      price: 'Free'
                    }, {
                      logo: '/raw/i2.png',
                      title: 'DHL Express',
                      des: "A logistics company covers more than 220 countries across the world, and provid",
                      price: '20 KWD/year'
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '53px' }}>
                            <Box component='img' src={product.logo} alt=" " />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ mb: '20px', fontSize: '.8rem', opacity: .8 }} > {product.des} </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', opacity: .7 }} > {product.price} </Typography>
                          </Grid>
                          <Grid item xs='auto'>
                            <Button sx={{
                              backgroundColor: 'rgb(27, 252, 182)',
                              '&:hover': { backgroundColor: 'rgb(27, 252, 182)' },
                              color: '#0F1349', fontSize: '13px', borderRadius: '16px',
                              padding: "6px 17px", boxShadow: '0px 6px 20px #1BFCB633'
                            }}>
                              Activate
                            </Button>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

            </TabContext>
          </Box>
        </Grid>
      </Grid>

    </Container >
  );
}
