/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState, useCallback } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Switch, MenuItem } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// _mock
import { _orders, allVouchers } from 'src/_mock';
// utils
import { fTimestamp } from 'src/utils/format-time';
// components
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useTable, getComparator } from 'src/components/table';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { useSnackbar } from 'src/components/snackbar';
// types
import { IOrderItem, IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
//
import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import VouchersToolbar from '../vouchers-toolbar';
import VouchersFiltersResult from '../vouchers-filters-result';
import DetailsNavBar from '../DetailsNavBar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Expired', label: 'Expired' },
];


const defaultFilters: IOrderTableFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};
const stylesActive = { cursor: { xs: 'default', md: "pointer" }, boxShadow: '0px 4px 20px #0F134914', borderRadius: '12px', border: '2px solid transparent', '&:hover': { borderColor: '#1BFCB6' }, tranition: 'all .3s' }
const stylesDisabled = { cursor: { xs: 'default', md: "pointer" }, background: '#F0F0F4', borderRadius: '12px', border: '2px solid transparent', tranition: 'all .3s' }
// ----------------------------------------------------------------------

export default function OrdersListView() {

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const onCopy = (color: string) => {
    if (color) {
      enqueueSnackbar(`Copied! ${color}`);
      copy(color);
    }
  };

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const [data, setData] = useState(allVouchers)

  const [tableData] = useState(_orders);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });


  const canReset =
    !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  const handleFilters = useCallback(
    (name: string, value: IOrderTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );


  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      setData(allVouchers);
    } else {
      const newData = allVouchers.filter(order => newValue === "Active" ? order.status : !(order.status))
      setData(newData);
    }
  };


  // new order
  const [openCreateVoucher, setOpenCreateVoucher] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleDrawerCommon = (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "new") setOpenCreateVoucher(pv => !pv)
    else if (state === "details") setOpenDetails(pv => !pv)
    else if (state === "delete") setOpenDelete(pv => !pv)
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    if (state === "new") setOpenCreateVoucher(false)
    else if (state === "details") setOpenDetails(false)
    else if (state === "delete") setOpenDelete(false)

  };


  const [mySubCat, setMySubCat] = React.useState('All Products');

  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setMySubCat(event.target.value as string);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Vouchers" crums={false} />
        </Grid>

        <Grid item xs={12} md={3}>
          <Stack direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            {/* <Button startIcon={<Box component='img' src='/raw/orderreport.svg' />} fullWidth sx={{ borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }} component='h5' variant='contained' color='primary' onClick={toggleDrawerCommon('analytics')}> Analytics </Button> */}
          </Stack>
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '200px' } }}>
              <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary' onClick={toggleDrawerCommon('new')} > Create New Voucher </Button>
            </Stack>
          </BottomActions>
        </Grid>

        <Grid item xs={12}>
          <Box mt="20px">
            <VouchersToolbar
              filters={filters}
              onFilters={handleFilters}
              //
              canReset={canReset}
              onResetFilters={handleResetFilters}
            />

            {canReset && (
              <VouchersFiltersResult
                filters={filters}
                onFilters={handleFilters}
                //
                onResetFilters={handleResetFilters}
                //
                results={dataFiltered.length}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}
          </Box>
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
                      icon={
                        <Label
                          variant={
                            ((tab.value === 'All' || tab.value === value) && 'filled') || 'soft'
                          }
                          color={
                            (tab.value === 'Active' && 'primary') ||
                            (tab.value === 'Ready' && 'secondary') ||
                            'default'
                          }
                        >
                          {tab.value === 'All' && allVouchers.length}
                          {tab.value === 'Expired' &&
                            allVouchers.filter((order) => !order.status).length}
                          {tab.value === 'Active' &&
                            allVouchers.filter((order) => order.status).length}
                        </Label>
                      }
                    />
                  ))}
                </TabList>
              </Box>

              <TabPanel value={value} sx={{ px: 0, pb: 0 }}>
                <Grid container spacing={2}>
                  {data.map((order, indx) =>
                    <Grid key={indx} item xs={12}>
                      {/* <Paper elevation={4} > */}
                      <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} p={3} minHeight="80px" sx={order.status ? stylesActive : stylesDisabled}
                      >

                        <Grid item xs={6} md='auto'>
                          <Box sx={{ minWidth: { xs: 'auto', md: '140px' } }}>
                            <Typography component='p' color='#8688A3' variant="subtitle2" sx={{ fontSize: '.8rem' }} >{order.title}</Typography>
                            {
                              order.status ?
                                <Typography component='p' color='#0D6EFD' variant="subtitle2" sx={{ mt: '5px', fontWeight: 900, cursor: 'pointer', fontSize: '.8rem', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => onCopy(order.copen)} >{order.copen} <Iconify icon="tabler:copy" />  </Typography>
                                :
                                <Typography component='p' color='#8688A3' variant="subtitle2" sx={{ mt: '5px', fontWeight: 900, fontSize: '.8rem', }} >{order.copen}</Typography>
                            }
                          </Box>
                        </Grid>

                        <Grid item xs={6} md='auto' >
                          <Typography component='p' color='#0F1349' variant="subtitle2" sx={{ fontSize: '.8rem' }} >{order.discount} {order.discountType === "Amount" ? "KWD" : "%"} <span style={{ fontSize: '.7rem' }}>({order.discountType})</span>  </Typography>
                        </Grid>
                        <Grid item xs={6} md='auto' >
                          <Typography component='p' color='#0F1349' variant="subtitle2" sx={{ fontSize: '.8rem' }} >{order.userCount} Uses </Typography>
                        </Grid>

                        <Grid item xs={6} md='auto' >
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                            <Box
                              sx={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '20px',
                                background: 'rgb(134, 136, 163,0.09)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                  background: 'rgb(134, 136, 163,0.2)',
                                }
                              }}
                              onClick={order.status ? toggleDrawerCommon("delete") : () => { }}
                            >
                              <Box component='img' src='/raw/trash-can-solid.svg' width='13px' />
                            </Box>
                            <Box
                              sx={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '20px',
                                background: 'rgb(134, 136, 163,0.09)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                  background: 'rgb(134, 136, 163,0.2)',
                                }
                              }}
                              onClick={toggleDrawerCommon("details")}
                            >
                              <Box component='img' src='/raw/edit-pen.svg' width='13px' />
                            </Box>
                            <Switch checked={order.status} />
                          </Box>
                        </Grid>

                      </Grid>
                      {/* </Paper> */}
                    </Grid>
                  )}
                </Grid>
              </TabPanel>

            </TabContext>

            <DetailsNavBar
              open={openDetails}
              onClose={handleDrawerCloseCommon('details')}
              title="Voucher Details"
              actions={<Button
                fullWidth
                variant="soft"
                color="success"
                size="large"
                sx={{ borderRadius: '30px' }}
              >
                Save
              </Button>}
            >
              <Divider flexItem />
              <Box width='100%'>

                <Typography pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Name (English)
                </Typography>
                <TextField fullWidth variant='filled' defaultValue='Happy Eid' name='NAME' />


                <Typography mt='20px' pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Name (Arabic)
                </Typography>
                <TextField fullWidth variant='filled' defaultValue='عيد سعيد' name='NAME' />



                <Typography mt='20px' pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Code
                </Typography>
                <TextField fullWidth variant='filled' defaultValue="H@PPYEID2023" name='Code' />

                <Stack mt='20px' pb='5px' direction='row' alignItems='center' justifyContent="space-between">
                  <Box>
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                      Voucher Status
                    </Typography>
                    <Typography component='p' variant="subtitle2" sx={{ fontWeight: 900, fontSize: '1rem' }} >
                      Available
                    </Typography>
                  </Box>
                  <Switch defaultChecked />
                </Stack>


                <Grid container mt='20px' columnSpacing="20px" pb='5px' alignItems='flex-end' rowGap='20px' justifyContent='space-between'>
                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Select Discount Type
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      height: "56px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8688A3',
                      fontSize: '.9rem',
                      background: 'rgb(245, 245, 248)',
                      borderRadius: '16px',
                      fontWeight: 800
                    }}>
                      Fixed Amount
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{
                      width: "100%",
                      height: "56px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0F1349',
                      fontSize: '.9rem',
                      background: 'rgb(209, 255, 240)',
                      borderRadius: '16px',
                      fontWeight: 800,
                      border: '2px solid #1AF9B3',
                    }}>
                      Percentage
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Discount Percentage
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue="20%" name='Percentage' />
                  </Grid>


                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Up to
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='10' name='PHONE'
                      sx={{
                        '& .MuiInputAdornment-root': {
                          marginTop: '0px !important',
                        },
                        '& input': {
                          paddingRight: '0px !important'
                        }
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <Stack direction='row' alignItems='center' spacing="5px">
                            <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.6rem' }} >
                              KWD
                            </Typography>
                            <Iconify icon="mingcute:down-fill" width={20} />
                          </Stack>
                        </InputAdornment>,
                      }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Total Uses
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='500' name='PHONE' />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Start Date
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='2023-06-28' name='sd' />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      End Date
                    </Typography>
                    <TextField fullWidth type='date' variant='filled' defaultValue='2023-10-07' name='ed' />
                  </Grid>


                  <Grid item xs={12}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Voucher Coverage
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        variant='filled'
                        value={mySubCat}
                        sx={{
                          fontWeight: 900
                        }}
                        onChange={handleChangeMySubCat}
                      // endAdornment={<div style={{ fontSize: '12px', marginRight: '20px', marginTop: '3px' }}>KWD</div>}
                      >
                        <MenuItem value='All Products'>All Products</MenuItem>
                        <MenuItem value='Laptops'>Laptops</MenuItem>
                        <MenuItem value='Clothes'>Clothes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

              </Box>
            </DetailsNavBar>

            {/* create new Vocher */}
            <DetailsNavBar
              open={openCreateVoucher}
              onClose={handleDrawerCloseCommon('new')}
              title="Create New Order"
              actions={<Button
                fullWidth
                variant="soft"
                color="success"
                size="large"
                sx={{ borderRadius: '30px' }}
              >
                Save
              </Button>}
            >
              <Divider flexItem />
              <Box width='100%'>

                <Typography pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Name (English)
                </Typography>
                <TextField fullWidth variant='filled' defaultValue='Happy Eid' name='NAME' />


                <Typography mt='20px' pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Name (Arabic)
                </Typography>
                <TextField fullWidth variant='filled' defaultValue='عيد سعيد' name='NAME' />



                <Typography mt='20px' pb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Voucher Code
                </Typography>
                <TextField fullWidth variant='filled' defaultValue="H@PPYEID2023" name='Code' />

                <Stack mt='20px' pb='5px' direction='row' alignItems='center' justifyContent="space-between">
                  <Box>
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                      Voucher Status
                    </Typography>
                    <Typography component='p' variant="subtitle2" sx={{ fontWeight: 900, fontSize: '1rem' }} >
                      Available
                    </Typography>
                  </Box>
                  <Switch defaultChecked />
                </Stack>


                <Grid container mt='20px' columnSpacing="20px" pb='5px' alignItems='flex-end' rowGap='20px' justifyContent='space-between'>
                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Select Discount Type
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      height: "56px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0F1349',
                      fontSize: '.9rem',
                      background: 'rgb(209, 255, 240)',
                      borderRadius: '16px',
                      fontWeight: 800,
                      border: '2px solid #1AF9B3',
                    }}>
                      Fixed Amount
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{
                      width: "100%",
                      height: "56px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8688A3',
                      fontSize: '.9rem',
                      background: 'rgb(245, 245, 248)',
                      borderRadius: '16px',
                      fontWeight: 800
                    }}>
                      Percentage
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Discount Amount
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='10' name='PHONE'
                      sx={{
                        '& .MuiInputAdornment-root': {
                          marginTop: '0px !important',
                        },
                        '& input': {
                          paddingRight: '0px !important'
                        }
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <Stack direction='row' alignItems='center' spacing="5px">
                            <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.6rem' }} >
                              KWD
                            </Typography>
                            <Iconify icon="mingcute:down-fill" width={20} />
                          </Stack>
                        </InputAdornment>,
                      }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Total Uses
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='500' name='PHONE' />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Start Date
                    </Typography>
                    <TextField fullWidth variant='filled' defaultValue='2023-06-28' name='sd' />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      End Date
                    </Typography>
                    <TextField fullWidth type='date' variant='filled' defaultValue='2023-10-07' name='ed' />
                  </Grid>


                  <Grid item xs={12}>
                    <Typography component='p' mb='5px' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                      Voucher Coverage
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        variant='filled'
                        value={mySubCat}
                        sx={{
                          fontWeight: 900
                        }}
                        onChange={handleChangeMySubCat}
                      // endAdornment={<div style={{ fontSize: '12px', marginRight: '20px', marginTop: '3px' }}>KWD</div>}
                      >
                        <MenuItem value='All Products'>All Products</MenuItem>
                        <MenuItem value='Laptops'>Laptops</MenuItem>
                        <MenuItem value='Clothes'>Clothes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>


                </Grid>


                {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Mobile Number
                </Typography>

                <TextField fullWidth variant='filled' defaultValue='965128743291' name='PHONE'
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
                        <Iconify icon="mingcute:down-fill" width={43} />
                        <Box component='img' src='/raw/flagN.png' />
                        <Divider orientation="vertical" variant='middle' flexItem />
                      </Stack>
                    </InputAdornment>,
                  }}
                /> */}


                {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Email Address (Optional)
                </Typography>
                <TextField fullWidth variant='filled' type='email' defaultValue='ahmed.omar@gmail.com' name='email' />


                <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                  Delivery Address
                </Typography>

                <Box sx={{ borderRadius: '12px', padding: '24px', background: 'rgb(245, 245, 248)' }}>
                  <Stack direction='row' alignItems='center' spacing='10px'>
                    <Iconify icon="ion:location" width={45} style={{ color: '#8688A3' }} />
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                      Ali Sabah Al-Salem - Block 5A - Street 8 House 4 - Floor 2
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: '22px' }} />
                  <Stack direction='row' alignItems='center' spacing='10px'>
                    <Iconify icon="mingcute:add-fill" width={30} style={{ color: '#8688A3' }} />
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                      Add Delivery Location
                    </Typography>
                  </Stack>

                </Box> */}


              </Box>
            </DetailsNavBar>


            <ConfirmDialog
              open={openDelete}
              onClose={handleDrawerCloseCommon('delete')}
              noCancel={false}
              maxWidth='sm'
              action={<Button
                fullWidth
                color="error"
                variant='soft'
                size="large"
                sx={{ borderRadius: '30px' }}
              >
                Delete
              </Button>}
              content={
                <Grid container spacing='20px'>
                  <Grid item xs={12} md={12} >
                    <Typography component='h5' variant="h5" > Wana delete it ?</Typography>
                  </Grid>
                  <Grid item xs={12} md={12} >
                    <Typography component='p' variant="subtitle2" > Delete this Voucher ?</Typography>
                  </Grid>
                </Grid>
              }
            />

          </Box>
        </Grid>
      </Grid>
    </Container >
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IOrderItem[];
  comparator: (a: any, b: any) => number;
  filters: IOrderTableFilters;
  dateError: boolean;
}) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          fTimestamp(order.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(order.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
