/* eslint-disable arrow-body-style */
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
import { UploadBox } from 'src/components/upload';
import { createProduct, fetchOneProduct, fetchProductsList, setProduct } from 'src/redux/store/thunks/products';
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


  const [productData, setProductData] = useState<any>({});
  const [editProductId, setEditProductId] = useState(null);


  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const confirm = useBoolean();

  const [data, setData] = useState(list)


  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchProductsList(error)).then((response: any) => {
        console.log("list", list);
        // setData(list)
      });
    }
  }, [loadStatus, dispatch, error, list]);

  useEffect(() => {
    if (product) {
      setProductData(product)
    } else {
      setProductData(null)
    }
  }, [product])



  useEffect(() => {
    if (categoryState.status === 'idle') {
      dispatch(fetchCategorysList(categoryState.error)).then((response: any) => {
        console.log("response", response);
        dispatch(fetchSubCategorysList(categoryState.error));
      });
    }
  }, [categoryState, dispatch]);


  useEffect(() => {
    setProductData((prevData: any) => ({
      ...prevData,
      subCategory: null,
    }));
  }, [productData?.categoryId]);












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

  const handleAddImage = (files: any) => {
    if (files.length > 0) {
      setProductData((prevData: any) => (
        {
          ...prevData,
          // images: prevData.images ? [...prevData.images, files[0]] : [files[0]]
          images: files[0]
        }
      ));
    }
  }
  const handleRemoveImage = (index: any) => {
    setProductData((current: any) => {
      const { images, ...rest } = current;
      // const updatedImages = images.filter((_: any, i: any) => i !== index);
      return {
        ...rest,
      };
    })
  }


  const createProductFun = () => {
    const formData = convertStateToFormData(productData);
    dispatch(createProduct(formData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setProductData(null);
        dispatch(fetchProductsList(error));
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  }





















  const convertStateToFormData = (state: any) => {
    const formData = new FormData();

    // Iterate over the properties of the state
    Object.entries(state).forEach(([key, value]: any) => {
      // this is only for the products and sending single image.
      // && key !== 'images'  
      if (typeof value === 'object' && !Array.isArray(value) && key !== 'images') {
        Object.entries(value).forEach(([nestedKey, nestedValue]: any) => {
          formData.append(`${key}[${nestedKey}]`, nestedValue);
        });
      } else if (Array.isArray(value)) {
        // If the value is an array, assume it's a file input
        value.forEach((file: any, index: any) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        // For other types of values
        formData.append(key, value);
      }
    });

    return formData;
  };







  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      setData(list);
    } else {
      const newData = list.filter((order: any) => order?.categoryId === newValue)
      setData(newData);
    }
  };

  const [openDetails, setOpenDetails] = useState(false);

  // common
  const toggleDrawerCommon = (state: string, id: any = null) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "new") {
      setOpenDetails(pv => !pv)
      setEditProductId(id);
      if (id) {
        dispatch(fetchOneProduct(id));
      } else {
        setProductData({});
        dispatch(setProduct({}));
      }
    }
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }
    if (state === "new") setOpenDetails(false)
  };

  const imagesItrations = Array.from({ length: 1 }, (_, index) => index);

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
                  <Tab
                    iconPosition="end"
                    value="All"
                    label="All Products"
                    icon={
                      <Label
                        variant={
                          ((value === 'All') && 'filled') || 'outlined'
                        }
                        color='success'
                      >
                        {value === 'All' && list.length}
                      </Label>
                    }
                  />
                  {categoryState.list.map((categoryObj: any) => (
                    <Tab
                      key={categoryObj._id}
                      iconPosition="end"
                      value={categoryObj._id}
                      label={categoryObj.name}
                      icon={
                        <Label
                          variant={
                            ((categoryObj._id === value) && 'filled') || 'outlined'
                          }
                          color='primary'
                        >
                          {list.filter((product: any) => product.categoryId === categoryObj._id).length}
                        </Label>
                      }
                    />
                  ))}
                </TabList>
              </Box>

              <TabPanel value={value} sx={{ px: 0, }}>
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
                              <Box component='img' src={product.images[0]} alt=" " width='60px' />
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
              {/* <TabPanel value='Watches' sx={{ px: 0, }}>
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

              </TabPanel> */}

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
            onClick={createProductFun}
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
          {/* defaultValue='iPhone 13 Pro Max' */}
          <TextField fullWidth variant='filled' onChange={handleNestedProductData} value={productData?.name?.en || ""} name='name.en' />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Product Name (Arabic)
          </Typography>
          {/* defaultValue="ايفون 13 برو ماكس" */}
          <TextField fullWidth variant='filled' onChange={handleNestedProductData} value={productData?.name?.ar || ""} name='name.ar' />

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Upload Product Images
          </Typography>


          <Box mt='10px' sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {imagesItrations.map((itration: any, ind: any) => {
              return (
                <Box key={ind}>
                  {/* {productData?.images?.length > 0 && productData?.images[itration] ? ( */}
                  {productData?.images ? (
                    <Box sx={{
                      width: '100px', height: '100px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      flexDirection: 'column', border: '1px dashed rgb(134, 136, 163,.5)', borderRadius: '16px',
                      position: 'relative', overflow: "hidden"
                    }}>
                      <Box component='img'
                        // src={typeof productData?.images[itration] === 'string' ? productData?.images[itration] : URL.createObjectURL(productData?.images[itration])}
                        src={typeof productData?.images === 'string' ? productData?.images : URL.createObjectURL(productData?.images)}
                        alt=''
                        sx={{ maxHeight: "95px" }} />
                      <Box onClick={() => handleRemoveImage(ind)} sx={{ backgroundColor: 'rgb(134, 136, 163,.09)', padding: '10px 11px 7px 11px', borderRadius: '36px', cursor: "pointer", position: 'absolute', top: 0, right: 0 }}>
                        <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                      </Box>
                    </Box>
                  ) : (
                    <UploadBox
                      sx={{ width: '100px!important', height: '100px!important', textAlign: 'center', padding: '20px' }}
                      onDrop={handleAddImage}
                      maxFiles={1}
                      maxSize={5242880}
                      accept={{
                        'image/jpeg': [],
                        'image/png': []
                      }}
                      placeholder={
                        <Box sx={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          flexDirection: 'column',
                        }}>
                          <Iconify icon="system-uicons:picture" style={{ color: '#8688A3' }} />
                          <span style={{ color: '#8688A3', fontSize: '.6rem' }}>Upload Image</span>
                        </Box>
                      }
                    />
                  )}
                </Box>

              )
            })}

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
              value={productData?.categoryId || ""}
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
              value={productData?.subCategory || ""}
              onChange={handleProductData}
              name='subCategory'
            >
              {productData?.categoryId && categoryState.subCatList.filter((item: any) => item.category === productData.categoryId).map((item: any, ind: any) => (
                <MenuItem key={ind} value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Price
          </Typography>

          <TextField fullWidth variant='filled' onChange={handleProductData} value={productData?.price || ""} name='price' />

          {/* <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.price}
              onChange={handleChangeDropDown('price')}
            >
              <MenuItem value='165.000'>165.000</MenuItem>
              <MenuItem value='200.000'>200.000</MenuItem>
            </Select>
          </FormControl> */}

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Description (English)
          </Typography>

          <TextField
            variant='filled'
            multiline
            fullWidth
            rows={5}
            sx={{ fontWeight: 900, fontSize: '26px' }}
            // defaultValue="It is a long established fact that a read will be distracted by the readable content of a page."
            value={productData?.description?.en || ""}
            onChange={handleNestedProductData}
            name='description.en'
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
            // defaultValue="هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض الكلمات العشوائية"
            value={productData?.description?.ar || ""}
            onChange={handleNestedProductData}
            name='description.ar'
          />

          {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
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
          </FormControl> */}

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Quantity (in stock)
          </Typography>
          <TextField type='number' fullWidth variant='filled' onChange={handleProductData} value={productData?.quantity || ""} name='quantity' />


          {/* <FormControl fullWidth>
            <Select
              variant='filled'
              value={dropDown.qty}
              onChange={handleChangeDropDown('qty')}
            >
              <MenuItem value='Unlimited'>Unlimited</MenuItem>
              <MenuItem value='200'>200</MenuItem>
            </Select>
          </FormControl> */}

          <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Product Status
          </Typography>

          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
            borderRadius: '16px', padding: '7px 14px', backgroundColor: '#F5F6F8'
          }} >
            <Typography component='p' variant="subtitle2" sx={{ fontWeight: 900, fontSize: '.9rem' }} >
              Published
            </Typography>
            <Switch size="medium"
              value={productData?.publish_app || false}
              onChange={(e: any) => setProductData({ ...productData, publish_app: e.target.checked })}
            />
          </Stack>


          {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
            Barcode (Optional)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='481155444762' name='branchCode'
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <Box component='img' src='/raw/barcode.svg' alt='' sx={{}} />
              </InputAdornment>,
            }}
          /> */}

          {/* <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
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
          </FormControl> */}
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
