import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RoleBasedGuard } from 'src/auth/guard';
import { BottomActions } from 'src/components/bottom-actions';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { AppDispatch } from 'src/redux/store/store';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  createProduct,
  createVariant,
  deleteProduct,
  editProduct,
  editVariant,
  fetchOneProduct,
  fetchOneVariant,
  fetchProductsList,
  fetchProductsWithParams,
  setProduct,
} from 'src/redux/store/thunks/products';
import DetailsNavBar from 'src/sections/products/DetailsNavBar';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
const AddProductDealer = () => {
  const [productData, setProductData] = useState<any>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [editProductId, setEditProductId] = useState<any>(null);
  const [productDataSections, setProductDataSections] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
    (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'new') {
        setOpenDetails((pv) => !pv);
        setEditProductId(id);
        if (id) {
          dispatch(fetchOneProduct(id));
        } else {
          setProductData({});
          dispatch(setProduct({}));
        }
      }
    };
  const convertStateToFormData = (state: any) => {
    const formData = new FormData();

    // Iterate over the properties of the state
    Object.entries(state).forEach(([key, value]: any) => {
      // this is only for the products and sending single image.
      // && key !== 'images'
      if (value) {
        if (typeof value === 'object' && !Array.isArray(value) && key !== 'images') {
          Object.entries(value).forEach(([nestedKey, nestedValue]: any) => {
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          });
        } else if (Array.isArray(value)) {
          if (key === 'images') {
            const newImages = value.filter((file) => typeof file !== 'string');
            newImages.forEach((file: any, index: any) => {
              formData.append(`${key}`, file);
            });
          } else {
            // If the value is an array, assume it's a file input
            value.forEach((file: any, index: any) => {
              formData.append(`${key}[${index}]`, file);
            });
          }
        } else {
          // For other types of values
          formData.append(key, value);
        }
      }
    });

    return formData;
  };
  const categoryState = useSelector((state: any) => state.category);
  const handleAddImage = (files: any) => {
    if (files.length > 0) {
      setProductData((prevData: any) => ({
        ...prevData,
        images: prevData.images ? [...prevData.images, files[0]] : [files[0]],
        // images: files[0]
      }));
    }
  };
  const handleRemoveImage = (index: any) => {
    setProductData((current: any) => {
      const { images, ...rest } = current;
      const updatedImages = images.filter((_: any, i: any) => i !== index);
      return {
        ...rest,
        images: updatedImages,
      };
    });
  };
  const handleProductData = (e: any) => {
    const { name, value } = e.target;
    setProductData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
  };
  const imagesItrations = Array.from({ length: 3 }, (_, index) => index);
  const activeTab = {
    color: '#0F1349',
    background: 'rgb(209, 255, 240)',
    border: '2px solid #1AF9B3',
  };
  const nonActiveTab = {
    color: '#8688A3',
    background: 'rgb(245, 245, 248)',
  };
  const ProductSchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),

    categoryId: Yup.string().required('Category is required'),
    // subCategory: Yup.string().required('Sub Category is required'),

    price: Yup.number().required('Field is required'),
    description: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    quantity: Yup.number().required('Field is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
  });

  const brandState = useSelector((state: any) => state.brands);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleDrawerCloseCommon =
    (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      if (state === 'new') {
        setOpenDetails(false);
        setProductDataSections(0);
      }
    };
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      console.log('data', data);
      setProductData({ ...productData, discount_type: data?.discount_type || 'percentage' });

      await createProductFun();
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
    handleDrawerCloseCommon('new');
  });
  const createProductFun = () => {
    const formData = convertStateToFormData(productData);
    dispatch(createProduct(formData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleNextInputs = async () => {
    const isValid = await methods.trigger(['name.en', 'name.ar', 'categoryId']);
    if (isValid) {
      setProductDataSections((prev) => prev + 1);
    }
  };

  const renderDetails = () => {
    switch (productDataSections) {
      case 0:
        return (
          <>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Product Name (English)
            </Typography>
            {/* defaultValue='iPhone 13 Pro Max' */}
            {/* <TextField fullWidth variant='filled' onChange={handleNestedProductData} value={productData?.name?.en || ""} name='name.en' /> */}
            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleNestedProductData}
              value={productData?.name?.en || ''}
              name="name.en"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Product Name (Arabic)
            </Typography>
            {/* defaultValue="ايفون 13 برو ماكس" */}
            {/* <TextField fullWidth variant='filled' onChange={handleNestedProductData} value={productData?.name?.ar || ""} name='name.ar' /> */}
            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleNestedProductData}
              value={productData?.name?.ar || ''}
              name="name.ar"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Upload Product Images
            </Typography>

            <Box mt="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {imagesItrations.map((itration: any, ind: any) => {
                return (
                  <Box key={ind}>
                    {/* {productData?.images ? ( */}
                    {productData?.images?.length > 0 && productData?.images[itration] ? (
                      <Box
                        sx={{
                          width: '100px',
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          flexDirection: 'column',
                          border: '1px dashed rgb(134, 136, 163,.5)',
                          borderRadius: '16px',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            typeof productData?.images[itration] === 'string'
                              ? productData?.images[itration]
                              : URL.createObjectURL(productData?.images[itration])
                          }
                          // src={typeof productData?.images === 'string' ? productData?.images : URL.createObjectURL(productData?.images)}
                          alt=""
                          sx={{ maxHeight: '95px' }}
                        />
                        <Box
                          onClick={() => handleRemoveImage(itration)}
                          sx={{
                            backgroundColor: 'rgb(134, 136, 163,.09)',
                            padding: '10px 11px 7px 11px',
                            borderRadius: '36px',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                          }}
                        >
                          <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                        </Box>
                      </Box>
                    ) : (
                      <UploadBox
                        sx={{
                          width: '100px!important',
                          height: '100px!important',
                          textAlign: 'center',
                          padding: '20px',
                        }}
                        onDrop={handleAddImage}
                        maxFiles={1}
                        maxSize={5242880}
                        accept={{
                          'image/jpeg': [],
                          'image/png': [],
                        }}
                        placeholder={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '10px',
                              flexDirection: 'column',
                            }}
                          >
                            <Iconify icon="system-uicons:picture" style={{ color: '#8688A3' }} />
                            <span style={{ color: '#8688A3', fontSize: '.6rem' }}>
                              Upload Image
                            </span>
                          </Box>
                        }
                      />
                    )}
                  </Box>
                );
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

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Category
            </Typography>

            {/* <FormControl fullWidth>
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
                </FormControl> */}
            <RHFSelect
              fullWidth
              variant="filled"
              name="categoryId"
              id="demo-simple-select2"
              value={productData?.categoryId || null}
              settingStateValue={handleProductData}
            >
              {categoryState.list.map((cat: any, index: any) => (
                <MenuItem key={index} value={cat._id}>
                  {cat?.name?.en || cat?.name || ''}
                </MenuItem>
              ))}
            </RHFSelect>

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Sub-Category
            </Typography>

            {/* <FormControl fullWidth>
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
                </FormControl> */}
            <RHFSelect
              fullWidth
              variant="filled"
              id="demo-simple-select"
              name="subCategory"
              value={productData?.subCategory || null}
              settingStateValue={handleProductData}
            >
              {productData?.categoryId &&
                categoryState.subCatList
                  .filter((item: any) => item.category === productData.categoryId)
                  .map((item: any, ind: any) => (
                    <MenuItem key={ind} value={item._id}>
                      {item?.name?.en || item?.name || ''}
                    </MenuItem>
                  ))}
            </RHFSelect>

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Brand
            </Typography>
            {/* <RHFTextField
                    fullWidth
                    variant="filled"
                    settingStateValue={handleProductData}
                    value={productData?.brand || ''}
                    name="brand"
                  /> */}
            {/* {console.log(brandState)} */}
            <RHFSelect
              fullWidth
              variant="filled"
              name="brand"
              id="demo-simple-brand"
              value={productData?.brand || null}
              settingStateValue={handleProductData}
            >
              {brandState?.list &&
                brandState.list?.map((brandObj: any) => (
                  <MenuItem key={brandObj._id} value={brandObj._id}>
                    {brandObj.name.localized}
                  </MenuItem>
                ))}
            </RHFSelect>
          </>
        );
      case 1:
        return (
          <>
            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Price
            </Typography>

            {/* <TextField fullWidth variant='filled' onChange={handleProductData} value={productData?.price || ""} name='price' /> */}
            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleProductData}
              value={productData?.price || ''}
              name="price"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Discount
            </Typography>
            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleProductData}
              value={productData?.discount || ''}
              name="discount"
            />

            <Grid
              container
              mt="20px"
              columnSpacing="20px"
              pb="5px"
              alignItems="flex-end"
              rowGap="20px"
              justifyContent="space-between"
            >
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: '100%',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.9rem',
                    borderRadius: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    ...(productData?.discount_type === 'amount' ? activeTab : nonActiveTab),
                  }}
                  onClick={() => setProductData({ ...productData, discount_type: 'amount' })}
                >
                  Fixed Amount
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: '100%',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.9rem',
                    borderRadius: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    ...(productData?.discount_type === 'amount' ? nonActiveTab : activeTab),
                  }}
                  onClick={() => setProductData({ ...productData, discount_type: 'percentage' })}
                >
                  Percentage
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="p"
                  mb="5px"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  Start Date
                </Typography>
                <RHFTextField
                  fullWidth
                  type="date"
                  variant="filled"
                  name="discount_start"
                  value={productData?.discount_start || ''}
                  settingStateValue={handleProductData}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="p"
                  mb="5px"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  End Date
                </Typography>
                <RHFTextField
                  fullWidth
                  type="date"
                  variant="filled"
                  name="discount_end"
                  value={productData?.discount_end || ''}
                  settingStateValue={handleProductData}
                />
              </Grid>
            </Grid>

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

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem' }}
            >
              Description (English)
            </Typography>

            {/* <TextField
                  variant='filled'
                  multiline
                  fullWidth
                  rows={5}
                  sx={{ fontWeight: 900, fontSize: '26px' }}
                  value={productData?.description?.en || ""}
                  onChange={handleNestedProductData}
                  name='description.en'
                /> */}
            <RHFTextField
              variant="filled"
              multiline
              fullWidth
              rows={5}
              sx={{ fontWeight: 900, fontSize: '26px' }}
              value={productData?.description?.en || ''}
              settingStateValue={handleNestedProductData}
              name="description.en"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem' }}
            >
              Description (Arabic)
            </Typography>

            {/* <TextField
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
                /> */}
            <RHFTextField
              variant="filled"
              multiline
              fullWidth
              rows={5}
              dir="rtl"
              sx={{ fontWeight: 900, fontSize: '26px' }}
              value={productData?.description?.ar || ''}
              settingStateValue={handleNestedProductData}
              name="description.ar"
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

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem' }}
            >
              Quantity (in stock)
            </Typography>
            {/* <TextField type='number' fullWidth variant='filled' onChange={handleProductData} value={productData?.quantity || ""} name='quantity' /> */}
            <RHFTextField
              type="number"
              fullWidth
              variant="filled"
              settingStateValue={handleProductData}
              value={productData?.quantity || ''}
              name="quantity"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Max Quantity
            </Typography>
            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleProductData}
              value={productData?.max_quantity || ''}
              name="max_quantity"
            />

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem' }}
            >
              Product Status
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderRadius: '16px',
                padding: '7px 14px',
                // backgroundColor: '#F5F6F8',
              }}
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontWeight: 900, fontSize: '.9rem' }}
              >
                Published
              </Typography>
              <Switch
                size="medium"
                checked={productData?.publish_app || false}
                onChange={(e: any) =>
                  setProductData({ ...productData, publish_app: e.target.checked })
                }
              />
            </Stack>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack>
        <RoleBasedGuard permission="CREATE_PRODUCT">
          <Grid item xs={12} md={5}>
            <BottomActions>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent={{ xs: 'center', sm: 'center' }}
                spacing="20px"
                sx={{ width: '100%' }}
              >
                <Button
                  startIcon="+"
                  fullWidth
                  sx={{ borderRadius: '30px', color: '#0F1349' }}
                  component="button"
                  variant="contained"
                  color="primary"
                  onClick={toggleDrawerCommon('new')}
                >
                  Add New Product
                </Button>
              </Stack>
            </BottomActions>
          </Grid>
        </RoleBasedGuard>
      </Stack>
      <DetailsNavBar
        open={openDetails}
        onClose={handleDrawerCloseCommon('new')}
        title={editProductId ? 'Edit Product' : 'Add New Product'}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            {productDataSections === 0 ? (
              // Render only the "Next" button for the first section
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                loading={isSubmitting}
                onClick={handleNextInputs}
                sx={{ borderRadius: '30px' }}
              >
                Next
              </LoadingButton>
            ) : (
              // Render "Submit/Update" and "Back" buttons for other sections
              <>
                <LoadingButton
                  fullWidth
                  variant="soft"
                  color="success"
                  size="large"
                  loading={isSubmitting}
                  onClick={methods.handleSubmit(onSubmit as any)}
                  sx={{ borderRadius: '30px' }}
                >
                  {editProductId ? 'Update' : 'Save'}
                </LoadingButton>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => setProductDataSections(0)} // Adjust this function as needed to go back to the first section
                  sx={{ borderRadius: '30px', marginLeft: '10px' }}
                >
                  Back
                </Button>
              </>
            )}
          </Stack>
        }
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Divider flexItem />
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <Box width="100%">
            {/* section 1 */}
            {renderDetails()}
          </Box>
        </FormProvider>
      </DetailsNavBar>
    </>
  );
};

export default AddProductDealer;
