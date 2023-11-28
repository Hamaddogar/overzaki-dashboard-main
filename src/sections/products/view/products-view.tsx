/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useEffect, useState } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { Box, Grid, Stack, Typography, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useSnackbar } from 'notistack';
// _mock
// import { allProducts } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
//
import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';

import { fetchCategorysList, fetchSubCategorysList } from 'src/redux/store/thunks/category';

import DetailsNavBar from '../DetailsNavBar';
import ProductTableToolbar from '../product-table-toolbar';



// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Products' },
  { value: 'Mobiles', label: 'Mobiles' },
  { value: 'Laptops', label: 'Laptops' },
  { value: 'Watches', label: 'Watches' },
];


// ----------------------------------------------------------------------

export default function OrdersListView() {

  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const categoryState = useSelector((state: any) => state.category);
  const loadStatus = useSelector((state: any) => state.products.status);
  const { list, loading, error, product } = useSelector((state: any) => state.products);


  const [productData, setProductData] = useState<any>(null);


  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const confirm = useBoolean();

  const [data, setData] = useState(list)


  useEffect(() => {
    if (loadStatus === 'idle') {
      // dispatch(fetchCustomersList(error)).then((response: any) => {
      //   console.log(list);
      //   // setData(list)
      // });
    }
  }, [loadStatus, dispatch, error, list]);



  useEffect(() => {
    if (categoryState.status === 'idle') {
      dispatch(fetchCategorysList(categoryState.error)).then((response: any) => {
        dispatch(fetchSubCategorysList(categoryState.error));
      });
    }
  }, [categoryState, dispatch]);


  useEffect(() => {
    if (productData && productData.categoryId) {
      setProductData({ ...productData, subCategory: null })
    }
  }, [productData])












  const handleProductData = (e: any) => {
    const { name, value } = e.target;
    setProductData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleNestedProductData = (e: any) => {
    const { name, value } = e.target;
    const [parentKey, nestedKey] = name.split('.');

    setProductData((prevData: any) => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [nestedKey]: value,
      },
    }));
  }





  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      setData(list);
    } else {
      const newData = list.filter((order: any) => order?.category === newValue)
      setData(newData);
    }
  };

  interface DropDownState {
    category: any;
    subCategory: any;
    price: any;
    color: any;
    available: any;
    qty: any;
  }

  const [dropDown, setDropDown] = useState<DropDownState>({
    category: 'Mobiles & Tablets',
    subCategory: 'Mobiles',
    price: '165.000',
    color: 'blue',
    available: 'All Branches',
    qty: 'Unlimited',
  })

  const handleChangeDropDown = (changeTo?: string | undefined | null) => (event: SelectChangeEvent) => {
    if (changeTo === "cat") setDropDown(pv => ({ ...pv, category: event.target.value as string }))
    else if (changeTo === "subcat") setDropDown(pv => ({ ...pv, subCategory: event.target.value as string }))
    else if (changeTo === "price") setDropDown(pv => ({ ...pv, price: event.target.value as string }))
    else if (changeTo === "color") setDropDown(pv => ({ ...pv, color: event.target.value as string }))
    else if (changeTo === "available") setDropDown(pv => ({ ...pv, available: event.target.value as string }))
    else if (changeTo === "qty") setDropDown(pv => ({ ...pv, qty: event.target.value as string }))

    // setMySubCat(event.target.value as string);
  };

  const [openDetails, setOpenDetails] = useState(false);

  // common
  const toggleDrawerCommon = (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "new") setOpenDetails(pv => !pv)
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }
    if (state === "new") setOpenDetails(false)
  };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Products" crums={false} />
        </Grid>

        <Grid item xs={12} md={5}>
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='20px' sx={{ width: '100%', maxWidth: { xs: '100%', md: '250px' } }}>
              <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='button' variant='contained' color='primary'
                onClick={toggleDrawerCommon('new')}
              >
                Add New Product
              </Button>
            </Stack>
          </BottomActions>
        </Grid>

        <Grid item xs={12}>
          <Box mt="20px">
            <ProductTableToolbar />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  variant="scrollable"
                  scrollButtons={false}
                  onChange={handleChangeTab}
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
                            (tab.value === 'Mobiles' && 'primary') ||
                            (tab.value === 'Laptops' && 'secondary') ||
                            (tab.value === 'Watches' && 'warning') ||
                            'default'
                          }
                        >
                          {tab.value === 'All' && list.length}
                          {tab.value === 'Watches' &&
                            list.filter((order: any) => order.category === 'Watches').length}
                          {tab.value === 'Laptops' &&
                            list.filter((order: any) => order.category === 'Laptops').length}
                          {tab.value === 'Mobiles' &&
                            list.filter((order: any) => order.category === 'Mobiles').length}
                        </Label>
                      }
                    />
                  ))}
                </TabList>
              </Box>

              <TabPanel value='All' sx={{ px: 0, }}>
                <Grid container spacing={2}>
                  {data.map((product: any, indx: any) =>
                    <Grid key={indx} item xs={12}>
                      <Paper elevation={4}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <Box component='img' src={product.img} alt=" " width='60px' />
                              <Box display='flex' gap='0px' flexDirection='column' >
                                <Typography component='p' noWrap variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800, maxWidth: { xs: '100%', md: '188px' } }} > {product.name} </Typography>
                                <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '100%', md: '188px' } }} >{product.category}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: { xs: 'flex-start', md: 'flex-end' }
                              }}
                            >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 800 }} > {product.price} KWD </Typography>
                              &nbsp; &nbsp;
                              <Iconify icon="carbon:delete" onClick={() => {
                                confirm.onTrue();
                              }} style={{ cursor: 'pointer' }} /> &nbsp; &nbsp;
                              <Iconify icon="bx:edit" onClick={toggleDrawerCommon('new')} style={{ cursor: 'pointer' }} />
                            </Box>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value='Watches' sx={{ px: 0, }}>
                <Grid container spacing={2}>
                  {data.map((product: any, indx: any) =>
                    <Grid key={indx} item xs={12}>
                      <Paper elevation={4}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <Box component='img' src={product.img} alt=" " width='60px' />
                              <Box display='flex' gap='0px' flexDirection='column' >
                                <Typography component='p' noWrap variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800, maxWidth: { xs: '100%', md: '188px' } }} > {product.name} </Typography>
                                <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '100%', md: '188px' } }} >{product.mainCat}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: { xs: 'flex-start', md: 'flex-end' }
                              }}
                            >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 800 }} > {product.price} KWD </Typography>
                              &nbsp; &nbsp;
                              <Iconify icon="carbon:delete" onClick={() => {
                                confirm.onTrue();
                              }} style={{ cursor: 'pointer' }} /> &nbsp; &nbsp;
                              <Iconify icon="bx:edit" onClick={toggleDrawerCommon('new')} style={{ cursor: 'pointer' }} />
                            </Box>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}
                </Grid>

              </TabPanel>
              <TabPanel value='Laptops' sx={{ px: 0, }}>
                <Grid container spacing={2}>
                  {data.map((product: any, indx: any) =>
                    <Grid key={indx} item xs={12}>
                      <Paper elevation={4}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <Box component='img' src={product.img} alt=" " width='60px' />
                              <Box display='flex' gap='0px' flexDirection='column' >
                                <Typography component='p' noWrap variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800, maxWidth: { xs: '100%', md: '188px' } }} > {product.name} </Typography>
                                <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '100%', md: '188px' } }} >{product.mainCat}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: { xs: 'flex-start', md: 'flex-end' }
                              }}
                            >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 800 }} > {product.price} KWD </Typography>
                              &nbsp; &nbsp;
                              <Iconify icon="carbon:delete" onClick={() => {
                                confirm.onTrue();
                              }} style={{ cursor: 'pointer' }} /> &nbsp; &nbsp;
                              <Iconify icon="bx:edit" onClick={toggleDrawerCommon('new')} style={{ cursor: 'pointer' }} />
                            </Box>
                          </Grid>

                        </Grid>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value='Mobiles' sx={{ px: 0, }}>
                <Grid container spacing={2}>
                  {data.map((product: any, indx: any) =>
                    <Grid key={indx} item xs={12}>
                      <Paper elevation={4}>
                        <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <Box component='img' src={product.img} alt=" " width='60px' />
                              <Box display='flex' gap='0px' flexDirection='column' >
                                <Typography component='p' noWrap variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800, maxWidth: { xs: '100%', md: '188px' } }} > {product.name} </Typography>
                                <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '100%', md: '188px' } }} >{product.mainCat}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6} >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: { xs: 'flex-start', md: 'flex-end' }
                              }}
                            >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.8rem', fontWeight: 800 }} > {product.price} KWD </Typography>
                              &nbsp; &nbsp;
                              <Iconify icon="carbon:delete" onClick={() => {
                                confirm.onTrue();
                              }} style={{ cursor: 'pointer' }} /> &nbsp; &nbsp;
                              <Iconify icon="bx:edit" onClick={toggleDrawerCommon('new')} style={{ cursor: 'pointer' }} />
                            </Box>
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


      <DetailsNavBar
        open={openDetails}
        onClose={handleDrawerCloseCommon('new')}
        title="Add New Product"
        actions={<Stack alignItems='center' justifyContent='center' spacing="10px">
          <Button
            fullWidth
            variant="soft"
            color="success"
            size="large"
            sx={{ borderRadius: '30px' }}
          >
            Save
          </Button>
        </Stack>}
      >

        <Divider flexItem />

        <Box width='100%'>
          <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Product Name (English)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='iPhone 13 Pro Max' onChange={handleNestedProductData} value={productData?.name.en || ""} name='name.en' />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Product Name (Arabic)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue="ايفون 13 برو ماكس" onChange={handleNestedProductData} value={productData?.name.ar || ""} name='name.ar' />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Upload Product Images
          </Typography>

          <Box mt='10px' sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Box sx={{
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexDirection: 'column', border: '1px dashed rgb(134, 136, 163,.5)', borderRadius: '16px',
              padding: '20px'
            }}>
              <Box component='img' src='/raw/s1.png' alt='' sx={{ width: '90%' }} />
            </Box>
            <Box sx={{
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexDirection: 'column', border: '1px dashed rgb(134, 136, 163,.5)', borderRadius: '16px',
              padding: '20px'
            }}>
              <Box component='img' src='/raw/s1.png' alt='' sx={{ width: '90%' }} />
            </Box>
            <Box sx={{
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexDirection: 'column', border: '1px dashed rgb(134, 136, 163,.5)', borderRadius: '16px'
            }}>
              <Iconify icon="system-uicons:picture" style={{ color: '#8688A3' }} />
            </Box>
          </Box>

          {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Upload Product Video
          </Typography>
          <Box mt='10px' sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Box sx={{
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexDirection: 'column', border: '1px dashed rgb(134, 136, 163,.5)', borderRadius: '16px'
            }}>
              <Iconify icon="octicon:video-16" style={{ color: '#8688A3' }} />
            </Box>
          </Box> */}

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              value={productData?.category || ""}
              onChange={handleProductData}
              name='categoryId'
            >
              {categoryState.list.map((cat: any, index: any) => (
                <MenuItem key={index} value={cat._id}>{cat.name.en || cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Sub-Category
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              // value={dropDown.subCategory}
              // onChange={handleChangeDropDown('subcat')}
              value={productData?.subCategory || ""}
              onChange={handleProductData}
              name='subCategory'
            >
              {productData?.categoryId && categoryState.subCatList.filter((item: any) => item.category === productData.categoryId).map((item: any) => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Price
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.price}
              onChange={handleChangeDropDown('price')}
            >
              <MenuItem value='165.000'>165.000</MenuItem>
              <MenuItem value='200.000'>200.000</MenuItem>
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Description (English)
          </Typography>

          <TextField
            variant='filled'
            multiline
            fullWidth
            rows={5}
            sx={{ fontWeight: 900, fontSize: '26px' }}
            defaultValue="It is a long established fact that a read will be distracted by the readable content of a page."
          />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Description (Arabic)
          </Typography>

          <TextField
            variant='filled'
            multiline
            fullWidth
            rows={5}
            dir="rtl"
            sx={{ fontWeight: 900, fontSize: '26px' }}
            defaultValue="هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض الكلمات العشوائية"
          />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Available
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.available}
              onChange={handleChangeDropDown('available')}
            >
              <MenuItem value='All Branches'>All Branches</MenuItem>
              <MenuItem value='Main Branch'>Main Branch</MenuItem>
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Quantity (in stock)
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.qty}
              onChange={handleChangeDropDown('qty')}
            >
              <MenuItem value='Unlimited'>Unlimited</MenuItem>
              <MenuItem value='200'>200</MenuItem>
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Product Status
          </Typography>

          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
            borderRadius: '16px', padding: '7px 14px', backgroundColor: '#F5F6F8'
          }} >
            <Typography component='p' variant="subtitle2" sx={{ fontWeight: 900, fontSize: '.9rem' }} >
              Published
            </Typography>
            <Switch size="medium" defaultChecked />
          </Stack>


          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Barcode (Optional)
          </Typography>

          <TextField fullWidth variant='filled' defaultValue='481155444762' name='branchCode'
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <Box component='img' src='/raw/barcode.svg' alt='' sx={{}} />
              </InputAdornment>,
            }}
          />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Color (Optional)
          </Typography>

          <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.color}
              onChange={handleChangeDropDown('color')}
            >
              <MenuItem value='blue'>
                <Stack direction='row' spacing='20px' alignItems='center'>
                  <Box sx={{ width: '23px', height: '23px', borderRadius: '23px', background: 'blue' }} />
                  <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                    Blue
                  </Typography>
                </Stack>
              </MenuItem>

              <MenuItem value='green'>
                <Stack direction='row' spacing='20px' alignItems='center'>
                  <Box sx={{ width: '23px', height: '23px', borderRadius: '23px', background: 'green' }} />
                  <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                    Green
                  </Typography>
                </Stack>
              </MenuItem>

            </Select>
          </FormControl>
        </Box>
      </DetailsNavBar>


      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        noCancel={false}
        content={
          <>
            Are you sure want to delete items?
          </>
        }
        action={<Button
          fullWidth
          color="error"
          variant='soft'
          size="large"
          onClick={() => confirm.onFalse()}
          sx={{ borderRadius: '30px' }}
        >
          Delete
        </Button>}
      />
    </Container >
  );
}
