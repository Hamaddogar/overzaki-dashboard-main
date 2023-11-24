/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useEffect, useState } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { BottomActions } from 'src/components/bottom-actions';
import { Icon } from '@iconify/react';
import { UploadBox } from 'src/components/upload';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomersList, fetchOneCustomer } from '../../../redux/store/thunks/customers';
import { createCategory, deleteCategory, editCategory, fetchCategorysList, fetchOneCategory, fetchSubCategorysList, setCategory } from '../../../redux/store/thunks/category';
import type { RootState, AppDispatch } from "../../../redux/store/store";



// ----------------------------------------------------------------------

export default function CategoriesView() {

  const dispatch = useDispatch<AppDispatch>();


  const [editCatId, setEditCatId] = useState<any>(null);
  const [removeData, setRemoveData] = useState<any>(null)

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [activeCategory, setActiveCategory] = useState('main');

  const [mySubCat, setMySubCat] = React.useState('Electronic Devices');

  const [categoryDrawer, setCategoryDrawer] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  const loadStatus = useSelector((state: any) => state.category.status);
  const { list, subCatList, loading, error, category } = useSelector((state: any) => state.category);

  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [subCategoriesData, setSubCategoriesData] = useState<any>(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchCategorysList(error)).then((response: any) => {
        dispatch(fetchSubCategorysList(error));
      });
    }
  }, [loadStatus, dispatch, error, list]);

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null)
    }
  }, [confirm])


  useEffect(() => {
    if (category) {
      setCategoriesData(category)
    } else {
      setCategoriesData(null)
    }
  }, [category])




  // -----------------------------------------------------------------------------------------

  const handleCreateCategory = () => {
    const FormValues: any = new FormData();
    console.log(categoriesData);
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (typeof categoriesData.image !== "string") {
      FormValues.append('image', categoriesData.image);
    }

    dispatch(createCategory(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setCategoriesData(null);
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${error}`, { variant: 'error' });
      }
    });
  }
  const handleEditCategory = () => {
    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (typeof categoriesData.image !== "string") {
      FormValues.append('image', categoriesData.image);
    }

    dispatch(editCategory({ categoryId: editCatId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCategorysList(error));
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${error}`, { variant: 'error' });
      }
    });


  }
  const handleRemoveCategory = () => {
    if (removeData && removeData.type === "category") {
      dispatch(deleteCategory(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchCategorysList(error));
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${error}`, { variant: 'error' });
        }
      });
    }
  }


  // --------------------------------------------Sub CategoryData----------------------------------------------
  const handleSubCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.split('.')[1];

    setSubCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData.name,
        [language]: value,
      },
    }));

  }
  const handleSubCategoryImage = (files: any) => {
    if (files.length > 0) {
      setSubCategoriesData({ ...subCategoriesData, image: files[0] });
    }
  }
  const removeSubCatImage = () => {
    setSubCategoriesData((current: any) => {
      const { image, ...rest } = current;
      return rest;
    })
  }


  // ------------------------------------------------------------------------------------------
  const handleCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.split('.')[1];

    setCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData.name,
        [language]: value,
      },
    }));

  }
  const handleCategoryImage = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, image: files[0] });
    }
  }
  const removeImage = () => {
    setCategoriesData((current: any) => {
      const { image, ...rest } = current;
      return rest;
    })
  }



  // ----------------------------------------------------------------------------------------
  const handleChangeCategory = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setActiveCategory(newValue);
  };
  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setSubCategoriesData({ ...subCategoriesData, category: event.target.value as string });
  };
  // common
  const toggleDrawerCommon = (state: string, id: any = null) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "cat") {
      setCategoryDrawer(pv => !pv);
      setEditCatId(id)
      if (id) {
        dispatch(fetchOneCategory(id));
      } else {
        setCategoriesData({});
        dispatch(setCategory({}));
      }
    }
    else if (state === "sub") setSubCategory(pv => !pv)
  };
  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    if (state === "cat") setCategoryDrawer(false)
    else if (state === "sub") setSubCategory(false)
  };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Categories"
            description="Do you want any help or custom request?"
            crums={false} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack
            sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
            direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            <Button onClick={handleChangeCategory('main')}
              fullWidth variant='contained'
              sx={
                activeCategory === "main" ?
                  {
                    borderRadius: '12px',
                    color: '#0F1349',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 6px 20px #00000033',
                    '&:hover': { backgroundColor: '#FFFFFF', }
                  }
                  :
                  {
                    borderRadius: '12px',
                    color: '#8688A3',
                    backgroundColor: 'background.neutral',
                    '&:hover': { backgroundColor: 'background.neutral' }
                  }}
            > Categories </Button>
            <Button onClick={handleChangeCategory('sub')}
              fullWidth variant='contained'
              sx={
                activeCategory === "sub" ? {
                  borderRadius: '12px',
                  color: '#0F1349',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 6px 20px #00000033',
                  '&:hover': { backgroundColor: '#FFFFFF', }
                }
                  :
                  {
                    borderRadius: '12px',
                    color: '#8688A3',
                    backgroundColor: 'background.neutral',
                    '&:hover': { backgroundColor: '#FFFFFF', }
                  }}
            > Subcategories </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider flexItem sx={{ my: '20px' }} />
        </Grid>

        {activeCategory === "main" && <>
          <Grid item xs={12} sm={6}>
            <Typography component='h5' variant="h5">
              You have {list?.length} categories
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
            <BottomActions>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}>
                <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='button' variant='contained' color='primary'
                  onClick={toggleDrawerCommon('cat')}
                >
                  Add New Category </Button>
              </Stack>
            </BottomActions>


          </Grid>

          {list?.length > 0 && (
            <Grid item xs={12} container sx={{ mt: '20px' }} spacing={2}>
              {
                list.map((category: any, indx: number) =>
                  <Grid key={indx} item xs={12}>
                    <Paper elevation={4} sx={{ border: '2px solid #FFFFFF', '&:hover': { border: '2px solid #1BFCB6' } }}>
                      <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 1.5 } }}>

                        <Grid item xs='auto' >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '15px'
                            }}
                          >
                            <Iconify icon="ci:drag-vertical" />
                            {category?.image ? (
                              <Box component='img' src={category.image} alt=" " width='60px' />
                            ) : (
                              <Box component='div' width='60px' height='60px' display={'flex'} alignItems={'center'} justifyContent={"center"} >
                                <Iconify icon="uil:images" width='40px' height='40px' />
                              </Box>
                            )}
                            <Box display='flex' gap='0px' flexDirection='column' >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800 }} > {category.name} </Typography>
                              <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                                {/* {category.tcategpries} subcategories -   {category.tproduct} products */}
                                {0} subcategories -   {0} products
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs='auto' textAlign='right'>
                          <Iconify icon="carbon:delete" onClick={() => {
                            setRemoveData({ type: 'category', id: category._id });
                            confirm.onTrue();
                          }} /> &nbsp; &nbsp; &nbsp;
                          <Iconify icon="bx:edit" onClick={toggleDrawerCommon('cat', category._id)} />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )}
            </Grid>

          )}
        </>}

        {activeCategory === "sub" && <>
          <Grid item xs={12} sm={6}>
            <Typography component='h5' variant="h5">You have 10 subcategories </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
            <BottomActions>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}>
                <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='button' variant='contained' color='primary'
                  onClick={toggleDrawerCommon('sub')}
                >Add New Subcategory </Button>
              </Stack>
            </BottomActions>
          </Grid>


          <Grid item xs={12} container spacing={2}>
            {
              [
                {
                  cat: "Electronic Devices",
                  items: [
                    {
                      name: "Smart Mobiles",
                      img: '/raw/sc1.png',
                      tproduct: 30,
                      tcategpries: 2
                    },
                    {
                      name: "Laptops & Computers",
                      img: '/raw/sc2.png',
                      tproduct: 48,
                      tcategpries: 3
                    },
                  ]
                },
                {
                  cat: "Clothes",
                  items: [
                    {
                      name: "Men",
                      img: '/raw/sc3.png',
                      tproduct: 30,
                      tcategpries: 2
                    }
                  ]
                }
              ].map((subCat, indx) =>
                <React.Fragment key={indx}>
                  <Grid item xs={12} sx={{ mt: '20px' }}>
                    <Typography component='p' variant="subtitle2" sx={{ fontSize: '1rem', fontWeight: 800 }} > {subCat.cat} </Typography>
                    <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                      {subCat.items.length} subcategories
                    </Typography>
                  </Grid>
                  {subCat?.items.map((order, index) => <Grid key={index} item xs={12}>
                    <Paper elevation={4} sx={{ border: '2px solid #FFFFFF', '&:hover': { border: '2px solid #1BFCB6' } }}>
                      <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 1.5 } }}>
                        <Grid item xs='auto' >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '15px'
                            }}
                          >
                            <Iconify icon="ci:drag-vertical" />
                            <Box component='img' src={order.img} alt=" " width='60px' />
                            <Box display='flex' gap='0px' flexDirection='column' >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800 }} > {order.name} </Typography>
                              <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                                {order.tcategpries} subcategories -   {order.tproduct} products
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs='auto' textAlign='right'>
                          <Iconify icon="carbon:delete" onClick={() => {
                            confirm.onTrue();
                          }} /> &nbsp; &nbsp; &nbsp;
                          <Iconify icon="bx:edit" onClick={toggleDrawerCommon('cat')} />
                        </Grid>



                      </Grid>
                    </Paper>
                  </Grid>)}
                </React.Fragment>
              )}
          </Grid >
        </>}
      </Grid >


      {/* add and edit Item */}
      <DetailsNavBar
        open={categoryDrawer}
        onClose={handleDrawerCloseCommon('cat')}
        title={editCatId ? "Edit Category" : "Add New Category"}
        actions={<Stack alignItems='center' justifyContent='center' spacing="10px">
          <Button
            fullWidth
            variant="soft"
            color="success"
            size="large"
            sx={{ borderRadius: '30px' }}
            onClick={editCatId ? handleEditCategory : handleCreateCategory}
          >
            {editCatId ? "Update" : "Save"}
          </Button>
        </Stack>}>
        <Divider flexItem />
        <Box width='100%'>
          <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Name (English)
          </Typography>
          <TextField fullWidth variant='filled' value={categoriesData?.name?.en || ""} onChange={handleCategoryData} name="name.en" />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Name (Arabic)
          </Typography>
          <TextField fullWidth variant='filled' value={categoriesData?.name?.ar || ""} onChange={handleCategoryData} name="name.ar" />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Image
          </Typography>

          <Stack direction='row' spacing='10px'>

            {categoriesData?.image ? (
              <Box width={"100%"} display={"flex"} >
                <Box display={"flex"} m={1} justifyContent={"center"} alignItems={"center"} width={"80px"} height={"80px"}>
                  <Box component='img' borderRadius={"5px"} src={typeof categoriesData.image === 'string' ? categoriesData.image : URL.createObjectURL(categoriesData.image)} alt='' />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Box onClick={removeImage} sx={{ backgroundColor: 'rgb(134, 136, 163,.09)', padding: '10px 11px 7px 11px', borderRadius: '36px', cursor: "pointer" }}>
                      <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                    </Box>

                  </Box>
                  <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                    Maximum size is 5mb
                  </Typography>

                  <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                    You can use these extensions PNG or JPG
                  </Typography>
                </Box>
              </Box>

            ) : (
              <UploadBox
                onDrop={handleCategoryImage}
                maxFiles={1}
                maxSize={5242880}
                accept={{
                  'image/jpeg': [],
                  'image/png': []
                }}
                placeholder={
                  <Stack spacing={0.5} alignItems="center">
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Upload file</Typography>
                  </Stack>
                }
                sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
              />
            )}
          </Stack>
        </Box>
      </DetailsNavBar>


      {/* subcategory Item */}
      <DetailsNavBar
        open={subCategory}
        onClose={handleDrawerCloseCommon('sub')}
        title="Add New Subcategory"
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
            Subcategory Name (English)
          </Typography>
          <TextField fullWidth variant='filled' value={subCategoriesData?.name?.en || ""} onChange={handleSubCategoryData} name="name.en" />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Subcategory Name (Arabic)
          </Typography>
          {/* <TextField fullWidth variant='filled' defaultValue='الهواتف الذكية' name='itemname' /> */}
          <TextField fullWidth variant='filled' value={subCategoriesData?.name?.ar || ""} onChange={handleSubCategoryData} name="name.ar" />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category
          </Typography>
          <FormControl fullWidth>
            <Select
              variant='filled'
              value={subCategoriesData?.category || null}
              onChange={handleChangeMySubCat}
            >
              {console.log("list", list)}
              {list.length > 0 && list.map((item: any, i: any) => <MenuItem key={i} value={item._id}>{item.name || ""}</MenuItem>)}
            </Select>
          </FormControl>

          <Typography my='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Image
          </Typography>
          <Stack direction='row' spacing='10px' alignItems='center'>
            {subCategoriesData?.image ? (

              <Box sx={{
                width: '140px', height: '140px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                flexDirection: 'column', border: '2px dashed rgb(134, 136, 163,.5)', borderRadius: '16px'
              }}>
                <Box component='img' borderRadius={"5px"} src={typeof subCategoriesData.image === 'string' ? subCategoriesData.image : URL.createObjectURL(subCategoriesData.image)} alt='subCategory' />
                <Box onClick={removeSubCatImage} sx={{ backgroundColor: 'rgb(134, 136, 163,.09)', padding: '10px 11px 7px 11px', borderRadius: '36px', cursor: "pointer" }}>
                  <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                </Box>
              </Box>
            ) : (
              <UploadBox
                onDrop={handleSubCategoryImage}
                maxFiles={1}
                maxSize={5242880}
                accept={{
                  'image/jpeg': [],
                  'image/png': []
                }}
                placeholder={
                  <Box sx={{
                    width: '140px', height: '140px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    flexDirection: 'column', border: '2px dashed rgb(134, 136, 163,.5)', borderRadius: '16px'
                  }}>
                    <Iconify icon="uil:upload" style={{ color: '#8688A3' }} />
                    <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
                  </Box>
                }
                sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
              />

            )}
            <Box>
              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                Maximum size is 5mb
              </Typography>

              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                You can use these extensions PNG or JPG
              </Typography>

            </Box>
          </Stack>

        </Box>
      </DetailsNavBar >

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        noCancel={false}
        title="Delete"
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

          onClick={handleRemoveCategory}
          sx={{ borderRadius: '30px' }}
        >
          Delete
        </Button>}

      />
    </Container >
  );
}
