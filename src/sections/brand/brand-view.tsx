/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Paper, Alert } from '@mui/material';
// import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { BottomActions } from 'src/components/bottom-actions';
import { UploadBox } from 'src/components/upload';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomersList, fetchOneCustomer } from '../../../redux/store/thunks/customers';
import NavigatorBar from 'src/components/NavigatorBar';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  editCategory,
  editSubCategory,
  fetchCategorysList,
  fetchOneCategory,
  fetchOneSubCategory,
  fetchSubCategorysList,
  setCategory,
  setSubCategory,
} from '../../redux/store/thunks/category';
import type { AppDispatch } from '../../redux/store/store';
import { createBrand, deleteBrand, editBrand, fetchAllBrands, fetchOneBrand, setBrand } from 'src/redux/store/thunks/brand';

// ----------------------------------------------------------------------

export default function CategoriesView() {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = 5;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [categoriesLength, setCategoriesLength] = useState<number>(0);
  const [editCatId, setEditCatId] = useState<any>(null);
  const [editSubCatId, setEditSubCatId] = useState<any>(null);
  const [removeData, setRemoveData] = useState<any>(null);

  const { verifyPermission } = useAuthContext();

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [activeCategory, setActiveCategory] = useState('main');

  const [categoryDrawer, setCategoryDrawer] = useState(false);

  const [subCategoryDrawer, setSubCategoryDrawer] = useState(false);

  const loadStatus = useSelector((state: any) => state.category.status);
  const { list, error, brand } = useSelector(
    (state: any) => state.brands
  );

  // const { list, error, category, subCategory } = useSelector((state: any) => state.category);
  // const subCatList = [];
  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [subCategoriesData, setSubCategoriesData] = useState<any>(null);
  // const [listItems, updateListItems] = useState(listS);

  const [errorMsg, setErrorMsg] = useState<any>('');

  const { enqueueSnackbar } = useSnackbar();

  const CategorySchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
  });

  // Sub Category
  const SubCategorySchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    category: Yup.string().required('Category is required'),
  });

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const subCatMethods = useForm({
    resolver: yupResolver(SubCategorySchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editCatId) {
        await handleEditCategory();
      } else {
        // const formData = new FormData()
        // formData.append('name[en]', data.name.en)
        // formData.append('name[ar]', data.name.ar)
        // formData.append('image', categoriesData?.image)
        // await dispatch(createBrand(data)).then((response: any) => {
        //   if (response.meta.requestStatus === 'fulfilled') {
        //     setCategoriesData(null);
        //     dispatch(fetchAllBrands()).then((res) => setBrands(res?.payload?.data?.data));
        //     setCategoryDrawer(false);
        //     enqueueSnackbar('Successfully Created!', { variant: 'success' });
        //   } else {
        //     enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        //   }
        // });
        await handleCreateCategory()
      }
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  useEffect(() => {
    if (brand && Object.entries(brand).length > 0) {
      setCategoriesData(brand);
      if (brand?.name) {
        Object.entries(brand).forEach(([fieldName, nestedData]: any) => {
          if (fieldName === 'name') {
            Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
              const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
              methods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
            });
          }
        });
      }
    } else {
      setCategoriesData(null);
      reset();
    }
  }, [brand, reset]);


  // -----------------------------------------------------------------------------------------

  const handleCreateCategory = async () => {
    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }

    await dispatch(createBrand(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setCategoriesData(null);
        dispatch(fetchAllBrands()).then((res) => setBrands(res?.payload?.data?.data));
        setCategoryDrawer(false);
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleEditCategory = () => {
    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      if (key !== "localized") {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }

    dispatch(editBrand({ brandId: editCatId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setCategoriesData(null);
        dispatch(fetchAllBrands()).then((res) => setBrands(res?.payload?.data?.data));
        setCategoryDrawer(false);
        // dispatch(fetchCategorysList({ pageNumber, pageSize }));
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleRemoveBrand = () => {
    dispatch(deleteBrand(removeData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchAllBrands()).then((res) => setBrands(res?.payload?.data?.data));
        enqueueSnackbar('Successfully Deleted!', { variant: 'success' });

        confirm.onFalse();
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  // ---------------------------------------------Sub Categories--------------------------------------------

  // --------------------------------------------Sub CategoryData----------------------------------------------

  // ------------------------------------------------------------------------------------------
  const handleBrandData = (e: any) => {
    const { name, value } = e.target;
    const language = name.includes('.') ? name.split('.')[1] : undefined;

    setCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        ...(language === 'en' || language === 'ar' ? { [language]: value } : {}),
      },
    }));
  };

  // ----------------------------------------------------------------------------------------

  // common
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
      (event: React.SyntheticEvent | React.MouseEvent) => {
        if (state === 'cat') {
          setCategoryDrawer((pv) => !pv);
          setEditCatId(id);
          if (id) {
            dispatch(fetchOneBrand(id));
          } else {
            setCategoriesData({});
            dispatch(setBrand({}));
          }
        }
      };
  const handleDrawerCloseCommon =
    (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      if (state === 'cat') setCategoryDrawer(false);
      else if (state === 'sub') setSubCategoryDrawer(false);
    };

  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
        setCategoriesLength(response.payload.data.count);
        setListItems(response.payload.data.data);
        // dispatch(fetchSubCategorysList(error));
      });
    }
  }, [loadStatus, dispatch, pageNumber]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListItems(items);
  };

  // ----------------------------- permissions -----------------------------

  const [allowAction, setAllowAction] = useState<{ edit: boolean; remove: boolean }>({
    edit: false,
    remove: false,
  });
  const getPermission = async (moduleName: string, permissionName: string): Promise<void> => {
    try {
      const data = { permission: permissionName };
      const responseData = await verifyPermission?.(data);

      if (moduleName === 'edit') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, edit: responseData }));
      } else if (moduleName === 'remove') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, remove: responseData }));
      }
    } catch (error) {
      console.error(`Error while checking ${moduleName} permission:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPermission('edit', 'UPDATE_BRAND_BY_ID');
      await getPermission('remove', 'DELETE_BRAND_BY_ID');
    };
    fetchData();
  }, []);

  //brands
  const [brands, setBrands] = useState<any>();
  useEffect(() => {
    dispatch(fetchAllBrands()).then((res) => setBrands(res?.payload?.data?.data));
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoleBasedGuard returnBoolean hasContent permission="GET_CATEGORYS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Brands" crums={false} />
          </Grid>

          <Grid item xs={12}>
            <Divider flexItem sx={{ my: '20px' }} />
          </Grid>

          {activeCategory === 'main' && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography component="h5" variant="h5">
                  You have {brands?.length} brands
                </Typography>
              </Grid>
              <RoleBasedGuard permission="CREATE_BRAND">
                <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
                  <BottomActions>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                      spacing="10px"
                      sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}
                    >
                      <Button
                        startIcon="+"
                        fullWidth
                        sx={{ borderRadius: '30px', color: '#0F1349' }}
                        component="button"
                        variant="contained"
                        color="primary"
                        onClick={toggleDrawerCommon('cat')}
                      >
                        Add New Brand{' '}
                      </Button>
                    </Stack>
                  </BottomActions>
                </Grid>
              </RoleBasedGuard>
              <Box sx={{ minHeight: '60vh', width: '100%' }}>
                {brands?.length > 0 && (
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <Grid
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          item
                          xs={12}
                          container
                          sx={{ mt: '20px' }}
                          spacing={2}
                        >
                          {
                            // Start
                            brands.map((category: any, indx: number) => (
                              <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                                {(provided) => (
                                  <Grid
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                    item
                                    xs={12}
                                  >
                                    <Paper
                                      elevation={4}
                                      sx={{
                                        border: '2px solid #FFFFFF',
                                        '&:hover': { border: '2px solid #1BFCB6' },
                                      }}
                                    >
                                      <Grid
                                        container
                                        item
                                        alignItems="center"
                                        justifyContent="space-between"
                                        rowGap={3}
                                        sx={{ px: 3, py: { xs: 1.5 } }}
                                      >
                                        <Grid item xs="auto">
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '15px',
                                            }}
                                          >
                                            <div {...provided.dragHandleProps}>
                                              <Iconify icon="ci:drag-vertical" />
                                            </div>
                                            {category?.image ? (
                                              <Box
                                                component="img"
                                                src={category.image}
                                                alt=" "
                                                width="60px"
                                                height={'60px'}
                                              />
                                            ) : (
                                              <Box
                                                component="div"
                                                width="60px"
                                                height="60px"
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                              >
                                                <Iconify
                                                  icon="uil:images"
                                                  width="40px"
                                                  height="40px"
                                                />
                                              </Box>
                                            )}

                                            <Box display="flex" gap="0px" flexDirection="column">
                                              <Typography
                                                component="p"
                                                variant="subtitle2"
                                                sx={{ fontSize: '.9rem', fontWeight: 800 }}
                                              >
                                                {' '}
                                                {category?.name?.en || category?.name}{' '}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Grid>

                                        <Grid item xs="auto" textAlign="right">
                                          {allowAction.remove && (
                                            <Iconify
                                              icon="carbon:delete"
                                              onClick={() => {
                                                setRemoveData(category?._id);
                                                confirm.onTrue();
                                              }}
                                            />
                                          )}{' '}
                                          &nbsp; &nbsp; &nbsp;
                                          {allowAction.edit && (
                                            <Iconify
                                              icon="bx:edit"
                                              onClick={toggleDrawerCommon('cat', category._id)}
                                            />
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Grid>
                                )}
                              </Draggable>
                            ))
                          }
                          {provided.placeholder}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </Box>
              <Stack
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {Math.ceil(brands?.length / pageSize) !== 1 && (
                  <NavigatorBar
                    setPageNumber={setPageNumber}
                    pageSize={pageSize}
                    itemsLength={brands?.length}
                  />
                )}
              </Stack>
            </>
          )}
        </Grid>

        {/* add and edit Item */}
        <DetailsNavBar
          open={categoryDrawer}
          onClose={handleDrawerCloseCommon('cat')}
          title={editCatId ? 'Edit Brand' : 'Add New Brand'}
          actions={
            <Stack alignItems="center" justifyContent="center" spacing="10px">
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                sx={{ borderRadius: '30px' }}
                loading={isSubmitting}
                onClick={() => methods.handleSubmit(onSubmit as any)()}
              >
                {editCatId ? 'Update' : 'Save'}
              </LoadingButton>
            </Stack>
          }
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Divider flexItem />
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Box width="100%">
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Brand Name (English)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.en || ''}
                settingStateValue={handleBrandData}
                name="name.en"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Brand Name (Arabic)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.ar || ''}
                settingStateValue={handleBrandData}
                name="name.ar"
              />


              {categoriesData?.image ? <Box>
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
                    mt:'20px'
                  }}
                >
                  <Box
                    component="img"
                    src={
                      typeof categoriesData?.image === 'string'
                        ? categoriesData?.image
                        : URL.createObjectURL(categoriesData?.image as any)
                    }
                    alt=""
                    sx={{ maxHeight: '95px' }}
                  />
                  <Box
                    onClick={() => {
                      setCategoriesData((prev: any) => {
                        return {
                          ...prev,
                          image: null
                        }
                      })
                    }}
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
              </Box> : <UploadBox
                sx={{
                  width: '100px!important',
                  height: '100px!important',
                  textAlign: 'center',
                  padding: '20px',
                  mt:'20px'
                }}
                onDrop={(file) => {
                  setCategoriesData((prev: any) => {
                    return {
                      ...prev,
                      image: file[0]
                    }
                  })
                }}
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
              />}
            </Box>
          </FormProvider>
        </DetailsNavBar>

        {/* subcategory Item */}

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          noCancel={false}
          title="Delete"
          content={<>Are you sure want to delete items?</>}
          action={
            <Button
              fullWidth
              color="error"
              variant="soft"
              size="large"
              onClick={handleRemoveBrand}
              sx={{ borderRadius: '30px' }}
            >
              Delete
            </Button>
          }
        />
      </RoleBasedGuard>
    </Container>
  );
}
