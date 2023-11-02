/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Typography, Paper, Stack, Switch, MenuItem, FormControl, } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
// import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
import Linker from '../../subscription-plan/link';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'Payment Gateways', label: 'Payment Gateways' },
  { value: 'Installment Services', label: 'Installment Services' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Cash On Delivery', label: 'Cash On Delivery' },
];

// ----------------------------------------------------------------------

export default function OrdersListView() {

  const settings = useSettingsContext();

  const [value, setValue] = useState('Payment Gateways');

  const [mySubCat, setMySubCat] = React.useState('5.000');

  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setMySubCat(event.target.value as string);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Payment Methods" crums={false} />
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

              <TabPanel value="Payment Gateways" sx={{ px: 0, }}>
                <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                  Activate any of the payment options linked to enable your customers to pay
                </Typography>

                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/pg1.png',
                      title: 'Tap Gateway',
                      support: [
                        '/raw/kf.png',
                        '/raw/if.png',
                        '/raw/af.png',
                        '/raw/mf.png',
                        '/raw/vf.png',
                      ]
                    }, {
                      logo: '/raw/pg2.png',
                      title: 'HyperPay Gateway',
                      support: [
                        '/raw/if.png',
                        '/raw/af.png',
                        '/raw/mf.png',
                        '/raw/lf.png',
                      ]
                    }, {
                      logo: '/raw/pg3.png',
                      title: 'PayFort Gateway',
                      support: [
                        '/raw/mf.png',
                        '/raw/vf.png',
                        '/raw/lf.png',
                      ]
                    }, {
                      logo: '/raw/pg4.png',
                      title: 'PayTabs Gateway',
                      support: [
                        '/raw/kf.png',
                        '/raw/if.png',
                        '/raw/af.png',
                        '/raw/mf.png',
                        '/raw/vf.png',
                        '/raw/sf.png',
                      ]
                    }, {
                      logo: '/raw/pg5.png',
                      title: 'Moyasar Gateway',
                      support: [
                        '/raw/mf.png',
                        '/raw/vf.png',
                        '/raw/lf.png',
                      ]
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' columnGap="20px" rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '57px' }}>
                            <Box component='img' src={product.logo} alt=" " />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }} >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 800 }} > Support: </Typography>
                              {product.support.map((flag, indx) => <Box key={indx} component='img' src={flag} alt=" " width='23px' />)}
                            </Box>
                          </Grid>
                          <Grid item xs='auto'>
                            <Button sx={{
                              backgroundColor: 'rgb(27, 252, 182)',
                              '&:hover': { backgroundColor: 'rgb(27, 252, 182)' },
                              color: '#0F1349', fontSize: '13px', borderRadius: '16px',
                              padding: "6px 17px", boxShadow: '0px 6px 20px #1BFCB633'
                            }}>
                              {indx === 0 ? "Edit Setup" : 'Upgrade to Activate'}
                            </Button>
                          </Grid>
                          <Grid item xs="auto">
                            <Linker path="https://www.google.com/" target='_blank'
                              style={{ textDecoration: 'underline', fontSize: '13px', color: "#8688A3" }}
                            >view Website</Linker>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

              <TabPanel value="Installment Services" sx={{ px: 0, }}>
                <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                  Activate any of the payment options linked to enable your customers to pay
                </Typography>

                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/is1.png',
                      title: 'Tabby',
                      des: "Split purchases into 4 interest-free payments while you get paid in full-upfront.",
                    }, {
                      logo: '/raw/is2.png',
                      title: 'Tamara',
                      des: "Pay later in 3 installments or in one payment within 30 days from the date of shipment."
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' columnGap="20px" rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '53px' }}>
                            <Box component='img' src={product.logo} alt=" " />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', opacity: .8 }} > {product.des} </Typography>
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
                          <Grid item xs="auto">
                            <Linker path="https://www.google.com/" target='_blank'
                              style={{ textDecoration: 'underline', fontSize: '13px', color: "#8688A3" }}
                            >view Website</Linker>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

              <TabPanel value="Bank Transfer" sx={{ px: 0, }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography mb='20px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                    Enable bank transfer method for your payments.
                  </Typography>

                  <Button sx={{
                    backgroundColor: 'rgb(27, 252, 182)',
                    '&:hover': { backgroundColor: 'rgb(27, 252, 182)' },
                    color: '#0F1349', fontSize: '13px', borderRadius: '16px',
                    padding: "6px 17px", boxShadow: '0px 6px 20px #1BFCB633'
                  }}
                    startIcon={<Iconify icon="mingcute:add-fill" />}
                  >
                    Add Bank Account
                  </Button>
                </Stack>

                <Grid container spacing={2}>
                  {[
                    {
                      logo: '/raw/bt1.png',
                      title: 'Bank Account',
                      IBAN: "KW313544465578985113113122",
                      status: 'Accepted'
                    }
                  ].map((product, indx) =>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ borderRadius: '16px' }}>
                        <Grid container item alignItems='center' columnGap="20px" rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                          <Grid item xs={12} sx={{ minHeight: '53px' }}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Box component='img' src={product.logo} alt=" " />
                              <Switch size='medium' color='primary' defaultChecked />
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', opacity: .6 }} >IBAN: {product.IBAN} </Typography>
                          </Grid>
                          <Grid item xs='auto'>
                            <Stack direction='row' alignItems='center' spacing='10px'>
                              <Box sx={{
                                height: '10px',
                                width: '10px',
                                borderRadius: '10px',
                                backgroundColor: 'rgb(26, 247, 178)'
                              }} />
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', opacity: 1 }} > {product.status} </Typography>

                            </Stack>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}

                </Grid>
              </TabPanel>

              <TabPanel value="Cash On Delivery" sx={{ px: 0, }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ borderRadius: '16px' }}>
                      <Grid container item alignItems='center' columnGap="20px" rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', borderRadius: '16px' }}>
                        <Grid item xs={12} sx={{ minHeight: '53px' }}>
                          <Stack direction='row' alignItems='center' spacing='10px'>
                            <Switch color='primary' defaultChecked />
                            <Box>
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 900, opacity: .8 }} > Cash On Delivery Method </Typography>
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', opacity: .6 }} > All customers to pay cash on delivery. </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography component='p' variant="subtitle2" sx={{ pl: '5px', fontSize: '.8rem', opacity: .7 }} > Cash On Delivery Cost </Typography>
                          <FormControl fullWidth>
                            <Select
                              variant='filled'
                              value={mySubCat}
                              sx={{
                                fontWeight: 900
                              }}
                              onChange={handleChangeMySubCat}
                              endAdornment={<div style={{ fontSize: '12px', marginRight: '20px', marginTop: '3px' }}>KWD</div>}
                            >
                              <MenuItem value='5.000'>5.000</MenuItem>
                              <MenuItem value='10.000'>10.000</MenuItem>
                              <MenuItem value='15.000'>15.000</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

            </TabContext>
          </Box>
        </Grid>
      </Grid>

    </Container >
  );
}
