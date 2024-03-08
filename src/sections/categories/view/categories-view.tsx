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
} from '../../../redux/store/thunks/category';
import type { AppDispatch } from '../../../redux/store/store';
import { MuiColorInput } from 'mui-color-input';

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
  const { list, subCatList, error, category, subCategory } = useSelector(
    (state: any) => state.category
  );
  const listStuff = useSelector((state: any) => state?.category?.list);
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
        await handleCreateCategory();
      }
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  const onSubmitSubCat = subCatMethods.handleSubmit(async (data) => {
    try {
      if (editSubCatId) {
        await handleEditSubCategory();
      } else {
        await handleCreateSubCategory();
      }
    } catch (err) {
      console.error(err);
      subCatMethods.reset();
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
    if (category && Object.entries(category).length > 0) {
      setCategoriesData(category);
      if (category?.name) {
        Object.entries(category).forEach(([fieldName, nestedData]: any) => {
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
  }, [category, reset]);

  useEffect(() => {
    if (subCategory && Object.entries(subCategory).length > 0) {
      const newSubCategoryObj = {
        name: {},
        category: '',
        image: '',
        icon: '',
      };
      Object.entries(subCategory).forEach(([fieldName, nestedData]: any) => {
        if (fieldName === 'name') {
          Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
            const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
            if (nestedFieldName === 'en' || nestedFieldName === 'ar') {
              newSubCategoryObj.name = {
                ...newSubCategoryObj?.name,
                [nestedFieldName]: value,
              };
              subCatMethods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
            }
          });
        } else if (fieldName === 'category') {
          subCatMethods.setValue(fieldName, nestedData._id);
          newSubCategoryObj.category = nestedData._id;
        } else if (fieldName === 'image') {
          newSubCategoryObj.image = nestedData;
        } else if (fieldName === 'icon') {
          newSubCategoryObj.icon = nestedData;
        }
      });

      setSubCategoriesData(newSubCategoryObj);
    } else {
      setSubCategoriesData(null);
      subCatMethods.reset();
    }
  }, [subCategory]);

  // -----------------------------------------------------------------------------------------

  const handleCreateCategory = () => {
    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }
    if (typeof categoriesData.icon !== 'string') {
      FormValues.append('icon', categoriesData.icon);
    }
    if (typeof categoriesData?.bgColor !== 'string') {
      FormValues.append('bgColor', categoriesData?.bgColor);
    }

    dispatch(createCategory(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
          setCategoriesLength(response.payload.data.count);
          setListItems(response.payload.data.data);
          // dispatch(fetchSubCategorysList(error));
        });
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
      if (key !== 'localized') {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }
    if (typeof categoriesData.icon !== 'string') {
      FormValues.append('icon', categoriesData.icon);
    }

    if (typeof categoriesData?.bgColor !== 'string') {
      FormValues.append('bgColor', categoriesData?.bgColor);
    }

    dispatch(editCategory({ categoryId: editCatId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        // dispatch(fetchCategorysList({ pageNumber, pageSize }));
        dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
          setCategoriesLength(response.payload.data.count);
          setListItems(response.payload.data.data);
          // dispatch(fetchSubCategorysList(error));
        });
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleRemoveCategory = () => {
    if (removeData && removeData.type === 'category') {
      dispatch(deleteCategory(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchCategorysList({ pageNumber, pageSize }));

          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    } else if (removeData && removeData.type === 'subcategory') {
      dispatch(deleteSubCategory(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchSubCategorysList(error));
          // dispatch(fetchSubCategorysList(error)).then((res) =>
          //   setSubCategoriesData(res?.payload?.data?.data)
          // );
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };
  // ---------------------------------------------Sub Categories--------------------------------------------

  const handleCreateSubCategory = () => {
    const FormValues: any = new FormData();
    Object.keys(subCategoriesData.name).forEach((key) => {
      const value = subCategoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (typeof subCategoriesData.image !== 'string') {
      FormValues.append('image', subCategoriesData.image);
    }
    if (typeof subCategoriesData.icon !== 'string') {
      FormValues.append('icon', subCategoriesData.icon);
    }
    if (subCategoriesData?.category) {
      FormValues.append('category', subCategoriesData.category);
    }

    if (subCategoriesData?.bgColor) {
      FormValues.append('bgColor', subCategoriesData.bgColor);
    }
    dispatch(createSubCategory(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setSubCategoriesData(null);
        dispatch(fetchSubCategorysList(error));
        // dispatch(fetchSubCategorysList(error)).then((res) =>
        //   setSubCategoriesData(res?.payload?.data?.data)
        // );
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleEditSubCategory = () => {
    const FormValues: any = new FormData();
    Object.keys(subCategoriesData.name).forEach((key) => {
      const value = subCategoriesData.name[key];
      if (key !== 'localized') {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (typeof subCategoriesData.image !== 'string') {
      FormValues.append('image', subCategoriesData.image);
    }
    if (typeof subCategoriesData.icon !== 'string') {
      FormValues.append('icon', subCategoriesData.icon);
    }
    if (subCategoriesData?.category) {
      FormValues.append('category', subCategoriesData.category);
    }
    if (subCategoriesData?.bgColor) {
      FormValues.append('bgColor', subCategoriesData.bgColor);
    }
    dispatch(editSubCategory({ subcategoryId: editSubCatId, data: FormValues })).then(
      (response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          // dispatch(fetchSubCategorysList(error)).then((res) =>
          //   setSubCategoriesData(res?.payload?.data?.data)
          // );
          dispatch(fetchSubCategorysList(error));
          enqueueSnackbar('Successfully Updated!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      }
    );
  };

  // --------------------------------------------Sub CategoryData----------------------------------------------
  const handleSubCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.split('.')[1];

    setSubCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        [language]: value,
      },
    }));
  };

  const handleSubCategoryImage = (files: any) => {
    if (files.length > 0) {
      setSubCategoriesData({ ...subCategoriesData, image: files[0] });
    }
  };
  const removeSubCatImage = () => {
    setSubCategoriesData((current: any) => {
      const { image, ...rest } = current;
      return rest;
    });
  };
  const removeSubCatLogo = () => {
    setSubCategoriesData((current: any) => {
      const { icon, ...rest } = current;
      return rest;
    });
  };

  // ------------------------------------------------------------------------------------------
  const handleCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.includes('.') ? name.split('.')[1] : undefined;

    setCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        ...(language === 'en' || language === 'ar' ? { [language]: value } : {}),
      },
      ...(name === 'bgColor' ? { [name]: value } : {}),
    }));
  };

  const handleCategoryImage = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, image: files[0] });
    }
  };
  const handleCategoryLogo = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, icon: files[0] });
    }
  };
  const handleSubCategoryLogo = (files: any) => {
    if (files.length > 0) {
      setSubCategoriesData({ ...subCategoriesData, icon: files[0] });
    }
  };
  const removeImage = () => {
    setCategoriesData((current: any) => {
      const { image, ...rest } = current;
      return rest;
    });
  };
  const removeLogo = () => {
    setCategoriesData((current: any) => {
      const { icon, ...rest } = current;
      return rest;
    });
  };

  // ----------------------------------------------------------------------------------------
  const handleChangeCategory =
    (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      setActiveCategory(newValue);
    };
  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setSubCategoriesData({ ...subCategoriesData, category: event.target.value as string });
  };
  // common
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
    (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'cat') {
        setCategoryDrawer((pv) => !pv);
        setEditCatId(id);
        if (id) {
          dispatch(fetchOneCategory(id));
        } else {
          setCategoriesData({});
          dispatch(setCategory({}));
        }
      } else if (state === 'sub') {
        setSubCategoryDrawer((pv) => !pv);
        setEditSubCatId(id);
        if (id) {
          dispatch(fetchOneSubCategory(id));
        } else {
          setSubCategoriesData({});
          dispatch(setSubCategory({}));
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
        dispatch(fetchSubCategorysList(error));
      });
    }
  }, [loadStatus, dispatch, pageNumber]);
  // useEffect(() => {
  //   if (loadStatus === 'idle') {
  //     dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
  //       setCategoriesLength(response.payload.data.count);
  //       setListItems(response.payload.data.data);
  //       // dispatch(fetchSubCategorysList(error));
  //     });
  //   }
  // }, []);

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
      await getPermission('edit', 'UPDATE_CATEGORY_BY_ID');
      await getPermission('remove', 'DELETE_CATEGORY_BY_ID');
    };
    fetchData();
  }, []);
  useEffect(() => {
    // dispatch(fetchSubCategorysList(error)).then((res) => setSubCategoriesData(res?.payload?.data?.data));
    dispatch(fetchSubCategorysList(error));
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
            <CustomCrumbs
              heading="Categories"
              description="Do you want any help or custom request?"
              crums={false}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack
              sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              spacing="20px"
            >
              <Button
                onClick={handleChangeCategory('main')}
                fullWidth
                variant="contained"
                sx={
                  activeCategory === 'main'
                    ? {
                        borderRadius: '12px',
                        color: '#0F1349',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 6px 20px #00000033',
                        '&:hover': { backgroundColor: '#FFFFFF' },
                      }
                    : {
                        borderRadius: '12px',
                        color: '#8688A3',
                        backgroundColor: 'background.neutral',
                        '&:hover': { backgroundColor: 'background.neutral' },
                      }
                }
              >
                {' '}
                Categories{' '}
              </Button>
              <Button
                onClick={handleChangeCategory('sub')}
                fullWidth
                variant="contained"
                sx={
                  activeCategory === 'sub'
                    ? {
                        borderRadius: '12px',
                        color: '#0F1349',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 6px 20px #00000033',
                        '&:hover': { backgroundColor: '#FFFFFF' },
                      }
                    : {
                        borderRadius: '12px',
                        color: '#8688A3',
                        backgroundColor: 'background.neutral',
                        '&:hover': { backgroundColor: '#FFFFFF' },
                      }
                }
              >
                {' '}
                Subcategories{' '}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider flexItem sx={{ my: '20px' }} />
          </Grid>

          {activeCategory === 'main' && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography component="h5" variant="h5">
                  You have {categoriesLength} categories
                </Typography>
              </Grid>
              <RoleBasedGuard permission="CREATE_CATEGORY">
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
                        Add New Category{' '}
                      </Button>
                    </Stack>
                  </BottomActions>
                </Grid>
              </RoleBasedGuard>
              <Box sx={{ minHeight: '60vh', width: '100%' }}>
                {listItems?.length > 0 && (
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
                            listItems.map((category: any, indx: number) => (
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
                                                {category?.name?.en || category.name}{' '}
                                              </Typography>
                                              <Typography
                                                component="p"
                                                noWrap
                                                variant="subtitle2"
                                                sx={{
                                                  opacity: 0.7,
                                                  fontSize: '.9rem',
                                                  maxWidth: { xs: '120px', md: '218px' },
                                                }}
                                              >
                                                {/* {category.tcategpries} subcategories -   {category.tproduct} products */}
                                                {0} subcategories - {0} products
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Grid>

                                        <Grid item xs="auto" textAlign="right">
                                          {allowAction.remove && (
                                            <Iconify
                                              icon="carbon:delete"
                                              onClick={() => {
                                                setRemoveData({
                                                  type: 'category',
                                                  id: category._id,
                                                });
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
                {Math.ceil(categoriesLength / pageSize) !== 1 && (
                  <NavigatorBar
                    setPageNumber={setPageNumber}
                    pageSize={pageSize}
                    itemsLength={categoriesLength}
                  />
                )}
              </Stack>
            </>
          )}

          {activeCategory === 'sub' && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography component="h5" variant="h5">
                  You have {subCatList.length} subcategories{' '}
                </Typography>
              </Grid>

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
                      onClick={toggleDrawerCommon('sub')}
                    >
                      Add New Subcategory{' '}
                    </Button>
                  </Stack>
                </BottomActions>
              </Grid>
              {/* {subCategoriesData && subCategoriesData?.map((subCatObject: any, index: any) => (
                <Grid key={index} sx={{ mt: '20px' }} item xs={12}>
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
                          <Iconify icon="ci:drag-vertical" />
                          <Box component="img" src={subCatObject?.image} alt=" " width="60px" />
                          <Box display="flex" gap="0px" flexDirection="column">
                            <Typography
                              component="p"
                              variant="subtitle2"
                              sx={{ fontSize: '.9rem', fontWeight: 800 }}
                            >
                              {' '}
                              {subCatObject?.name?.en || subCatObject?.name}{' '}
                            </Typography>
                            <Typography
                              component="p"
                              noWrap
                              variant="subtitle2"
                              sx={{
                                opacity: 0.7,
                                fontSize: '.9rem',
                                maxWidth: { xs: '120px', md: '218px' },
                              }}
                            >
                              {0} subcategories - {0} products
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs="auto" textAlign="right">
                        <Iconify
                          icon="carbon:delete"
                          onClick={() => {
                            setRemoveData({ type: 'subcategory', id: subCatObject._id });
                            confirm.onTrue();
                          }}
                        />{' '}
                        &nbsp; &nbsp; &nbsp;
                        <Iconify
                          icon="bx:edit"
                          onClick={toggleDrawerCommon('sub', subCatObject._id)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))} */}
              {list?.length > 0 && (
                <Grid item xs={12} container spacing={2}>
                  {list?.map((cat: any, indx: any) => {
                    const subCat = subCatList?.filter((item: any) => item?.category === cat?._id);
                    return (
                      <React.Fragment key={indx}>
                        <Grid item xs={12} sx={{ mt: '20px' }}>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ fontSize: '1rem', fontWeight: 800 }}
                          >
                            {' '}
                            {cat?.name?.en || cat?.name || ''}{' '}
                          </Typography>
                          <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{
                              opacity: 0.7,
                              fontSize: '.9rem',
                              maxWidth: { xs: '120px', md: '218px' },
                            }}
                          >
                            {subCat.length} subcategories
                          </Typography>
                        </Grid>
                        {subCat.map((subCatObject: any, index: any) => (
                          <Grid key={index} item xs={12}>
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
                                    <Iconify icon="ci:drag-vertical" />
                                    <Box
                                      component="img"
                                      src={subCatObject.image}
                                      alt=" "
                                      width="60px"
                                    />
                                    <Box display="flex" gap="0px" flexDirection="column">
                                      <Typography
                                        component="p"
                                        variant="subtitle2"
                                        sx={{ fontSize: '.9rem', fontWeight: 800 }}
                                      >
                                        {' '}
                                        {subCatObject?.name?.en || subCatObject?.name}{' '}
                                      </Typography>
                                      <Typography
                                        component="p"
                                        noWrap
                                        variant="subtitle2"
                                        sx={{
                                          opacity: 0.7,
                                          fontSize: '.9rem',
                                          maxWidth: { xs: '120px', md: '218px' },
                                        }}
                                      >
                                        {0} subcategories - {0} products
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs="auto" textAlign="right">
                                  <Iconify
                                    icon="carbon:delete"
                                    onClick={() => {
                                      setRemoveData({ type: 'subcategory', id: subCatObject._id });
                                      confirm.onTrue();
                                    }}
                                  />{' '}
                                  &nbsp; &nbsp; &nbsp;
                                  <Iconify
                                    icon="bx:edit"
                                    onClick={toggleDrawerCommon('sub', subCatObject._id)}
                                  />
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </Grid>
              )}
            </>
          )}
        </Grid>

        {/* add and edit Item */}
        <DetailsNavBar
          open={categoryDrawer}
          onClose={handleDrawerCloseCommon('cat')}
          title={editCatId ? 'Edit Category' : 'Add New Category'}
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
                Category Name (English)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.en || ''}
                settingStateValue={handleCategoryData}
                name="name.en"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Category Name (Arabic)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.ar || ''}
                settingStateValue={handleCategoryData}
                name="name.ar"
              />
              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Background Color (optional)
              </Typography>
              {/* <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.bgColor || ''}
                settingStateValue={handleCategoryData}
                name="bgColor"
              /> */}
              <MuiColorInput
                sx={{
                  width: '100%',
                  margin: 'auto',
                  '& .css-1rn6l8w-MuiInputAdornment-root.MuiInputAdornment-positionStart.css-1rn6l8w-MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
                    { margin: 0 },
                }}
                variant="filled"
                value={categoriesData?.bgColor || ''}
                // fullWidth
                // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, color: event }) : null}
                onChange={(event) => setCategoriesData({ ...categoriesData, bgColor: event })}
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Logo
              </Typography>
              <Stack direction="row" spacing="10px">
                {categoriesData?.icon ? (
                  <Box width={'100%'} display={'flex'}>
                    <Box
                      display={'flex'}
                      m={1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      width={'80px'}
                      height={'80px'}
                    >
                      <Box
                        component="img"
                        borderRadius={'5px'}
                        src={
                          typeof categoriesData.icon === 'string'
                            ? categoriesData.icon
                            : URL.createObjectURL(categoriesData.icon)
                        }
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box
                          onClick={removeLogo}
                          sx={{
                            backgroundColor: 'rgb(134, 136, 163,.09)',
                            padding: '10px 11px 7px 11px',
                            borderRadius: '36px',
                            cursor: 'pointer',
                          }}
                        >
                          <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                        </Box>
                      </Box>
                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                      >
                        Maximum size is 5mb
                      </Typography>

                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        You can use these extensions PNG or JPG
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleCategoryLogo}
                    maxFiles={1}
                    maxSize={5242880}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                    }}
                    placeholder={
                      <Stack spacing={0.5} alignItems="center">
                        <Iconify icon="eva:cloud-upload-fill" width={40} />
                        <Typography variant="body2">Upload Logo</Typography>
                      </Stack>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>

              <Stack direction="row" spacing="10px">
                {categoriesData?.image ? (
                  <Box width={'100%'} display={'flex'}>
                    <Box
                      display={'flex'}
                      m={1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      width={'80px'}
                      height={'80px'}
                    >
                      <Box
                        component="img"
                        borderRadius={'5px'}
                        src={
                          typeof categoriesData.image === 'string'
                            ? categoriesData.image
                            : URL.createObjectURL(categoriesData.image)
                        }
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box
                          onClick={removeImage}
                          sx={{
                            backgroundColor: 'rgb(134, 136, 163,.09)',
                            padding: '10px 11px 7px 11px',
                            borderRadius: '36px',
                            cursor: 'pointer',
                          }}
                        >
                          <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                        </Box>
                      </Box>
                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                      >
                        Maximum size is 5mb
                      </Typography>

                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
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
                      'image/png': [],
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
          </FormProvider>
        </DetailsNavBar>

        {/* subcategory Item */}
        <DetailsNavBar
          open={subCategoryDrawer}
          onClose={handleDrawerCloseCommon('sub')}
          title={editSubCatId ? 'Edit Subcategory' : 'Add New Subcategory'}
          actions={
            <Stack alignItems="center" justifyContent="center" spacing="10px">
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                // onClick={editSubCatId ? handleEditSubCategory : handleCreateSubCategory}
                loading={subCatMethods.formState.isSubmitting}
                onClick={() => subCatMethods.handleSubmit(onSubmitSubCat as any)()}
                sx={{ borderRadius: '30px' }}
              >
                {editSubCatId ? 'Update' : 'Save'}
              </LoadingButton>
            </Stack>
          }
        >
          <FormProvider methods={subCatMethods} onSubmit={onSubmitSubCat}>
            <Divider flexItem />
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Box width="100%">
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Subcategory Name (English)
              </Typography>
              {/* <TextField fullWidth variant='filled' value={subCategoriesData?.name?.en || ""} onChange={handleSubCategoryData} name="name.en" /> */}
              <RHFTextField
                fullWidth
                variant="filled"
                value={subCategoriesData?.name?.en || ''}
                settingStateValue={handleSubCategoryData}
                name="name.en"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Subcategory Name (Arabic)
              </Typography>
              {/* <TextField fullWidth variant='filled' defaultValue='الهواتف الذكية' name='itemname' /> */}
              <RHFTextField
                fullWidth
                variant="filled"
                value={subCategoriesData?.name?.ar || ''}
                settingStateValue={handleSubCategoryData}
                name="name.ar"
              />

              <Typography
                mt="20px"
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
                name='category'
                value={subCategoriesData?.category || null}
                onChange={handleChangeMySubCat}
              >
                {list.length > 0 && list.map((item: any, i: any) => <MenuItem key={i} value={item._id}>{item.name || ""}</MenuItem>)}
              </Select>
            </FormControl> */}
              <RHFSelect
                fullWidth
                variant="filled"
                name="category"
                value={subCategoriesData?.category || ''}
                settingStateValue={handleChangeMySubCat}
              >
                {list.length > 0 &&
                  list.map((item: any, i: any) => (
                    <MenuItem key={i} value={item._id}>
                      {item?.name?.en || item?.name || ''}
                    </MenuItem>
                  ))}
              </RHFSelect>
              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Background Color (optional)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.bgColor || ''}
                settingStateValue={handleCategoryData}
                name="bgColor"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Logo
              </Typography>
              <Stack direction="row" spacing="10px">
                {subCategoriesData?.icon ? (
                  <Box
                    sx={{
                      width: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      flexDirection: 'column',
                      position: 'relative',
                      border: '2px dashed rgb(134, 136, 163,.5)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      borderRadius={'5px'}
                      src={
                        typeof subCategoriesData.icon === 'string'
                          ? subCategoriesData.icon
                          : URL.createObjectURL(subCategoriesData.icon)
                      }
                      alt="subCategory"
                    />
                    <Box
                      onClick={removeSubCatLogo}
                      sx={{
                        backgroundColor: 'rgb(134, 136, 163,.09)',
                        padding: '10px 11px 7px 11px',
                        borderRadius: '36px',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                      }}
                    >
                      <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleSubCategoryLogo}
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
                        <Iconify icon="uil:upload" style={{ color: '#8688A3' }} />
                        <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
                      </Box>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>

              <Typography
                my="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Category Image
              </Typography>
              <Stack direction="row" spacing="10px" alignItems="center">
                {subCategoriesData?.image ? (
                  <Box
                    sx={{
                      width: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      flexDirection: 'column',
                      position: 'relative',
                      border: '2px dashed rgb(134, 136, 163,.5)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      borderRadius={'5px'}
                      src={
                        typeof subCategoriesData.image === 'string'
                          ? subCategoriesData.image
                          : URL.createObjectURL(subCategoriesData.image)
                      }
                      alt="subCategory"
                    />
                    <Box
                      onClick={removeSubCatImage}
                      sx={{
                        backgroundColor: 'rgb(134, 136, 163,.09)',
                        padding: '10px 11px 7px 11px',
                        borderRadius: '36px',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                      }}
                    >
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
                        <Iconify icon="uil:upload" style={{ color: '#8688A3' }} />
                        <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
                      </Box>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>
            </Box>
          </FormProvider>
        </DetailsNavBar>

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
              onClick={handleRemoveCategory}
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
