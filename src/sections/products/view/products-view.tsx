/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { Box, Grid, Stack, Typography, Paper, Alert, Checkbox } from '@mui/material';
import NavigatorBar from 'src/components/NavigatorBar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useSnackbar } from 'notistack';
// _mock
// import { allProducts } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { UploadBox } from 'src/components/upload';
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
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
//
import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
// import NavigatorBar from 'src/components/NavigatorBar';
import { fetchCategorysList, fetchSubCategorysList } from 'src/redux/store/thunks/category';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';

import Link from 'next/link';
import DetailsNavBar from '../DetailsNavBar';
import ProductTableToolbar from '../product-table-toolbar';

// ----------------------------------------------------------------------

export default function OrdersListView() {
  const pageSize = 5;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const categoryState = useSelector((state: any) => state.category);
  const { verifyPermission } = useAuthContext();
  // const loadStatus = useSelector((state: any) => state.products.status);
  const { list, error, product, variant } = useSelector((state: any) => state.products);
  const [productData, setProductData] = useState<any>(null);
  const [editProductId, setEditProductId] = useState<any>(null);
  const [removeData, setRemoveData] = useState<any>(null);

  const settings = useSettingsContext();

  const [value, setValue] = useState<any>('All');
  const confirm = useBoolean();
  const [data, setData] = useState([]);
  const [productsLength, setProductsLength] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState('');

  const ProductSchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),

    categoryId: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Sub Category is required'),

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

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);
      if (editProductId) {
        await editProductFun();
      } else {
        await createProductFun();
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  useEffect(() => {
    if (product && Object.entries(product).length > 0) {
      const newProduct = {
        name: {
          en: product.name.en,
          ar: product.name.ar,
        },
        categoryId: product.categoryId,
        subCategory: product.subCategory,
        price: product.price,
        images: product.images,
        description: {
          en: product.description.en,
          ar: product.description.ar,
        },
        quantity: product.quantity,
        publish_app: product.publish_app,
      };
      setProductData(newProduct);
      // Use setValue to update each field separately
      Object.entries(newProduct).forEach(([fieldName, nestedData]: any) => {
        if (fieldName === 'name' || fieldName === 'description') {
          Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
            const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
            methods.setValue(
              fullFieldName as 'name.en' | 'name.ar' | 'description.en' | 'description.ar',
              value
            );
          });
        } else {
          methods.setValue(fieldName, nestedData);
        }
      });
    } else {
      setProductData(null);
      reset();
    }
  }, [product, reset, methods]);

  useEffect(() => {
    if (categoryState.status === 'idle') {
      dispatch(fetchCategorysList({})).then((response: any) => {
        // console.log("response", response);
        dispatch(fetchSubCategorysList(categoryState.error));
      });
    }
  }, [categoryState, dispatch]);

  useEffect(() => {
    setProductData((prevData: any) => ({
      ...prevData,
      subCategory: product?.subCategory || null,
    }));
  }, [productData?.categoryId, product]);

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

  const createProductFun = () => {
    const formData = convertStateToFormData(productData);
    dispatch(createProduct(formData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setProductData(null);
        dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
          setProductsLength(response.payload.data.count);
          setData(response.payload.data.data);
        });
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const editProductFun = () => {
    const formData = convertStateToFormData(productData);
    dispatch(editProduct({ productId: editProductId, data: formData })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setProductData(null);
        dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
          setProductsLength(response.payload.data.count);
          setData(response.payload.data.data);
        });
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  const removeProductFun = () => {
    if (removeData) {
      dispatch(deleteProduct(removeData)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
            setProductsLength(response.payload.data.count);
            setData(response.payload.data.data);
          });
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };

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
    });

    return formData;
  };

  const [tempVariantId, setTempVariantId] = useState<any>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      setData(list);
    } else {
      const newData = list.filter((order: any) => order?.categoryId === newValue);
      setData(newData);
    }
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [openVariant, setOpenVariant] = useState(false);

  // common
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
        } else if (state === 'variants') {
          variantMethods.reset();
          setOpenVariant((pv) => !pv);
          dispatch(fetchOneVariant(id));
          setTempVariantId(id);
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
      if (state === 'new') setOpenDetails(false);
      if (state === 'variants') {
        setOpenVariant(false);
        setTempVariantId(null);
      }
    };
  // -------------------------------------------------- Variants ---------------------

  const [variantData, setVariantData] = useState<any>(null);
  const [editVariantId, setEditVariantId] = useState(null);

  const VaiantSchema = Yup.object().shape({
    groupName: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    selectionType: Yup.string().required('Field is required'),
    minimum: Yup.number().test({
      name: 'minimum',
      message: 'Field is required',
      test: (value: any, context: any) => {
        // console.log("value", value);
        if (context.parent?.selectionType === 'multiple' && !value) {
          return false;
        }
        return true;
      },
    }),
    maximum: Yup.number().test({
      name: 'maximum',
      message: 'Field is required',
      test: (value: any, context: any) => {
        // console.log("selectionType", context.parent?.selectionType);
        if (context.parent?.selectionType === 'multiple' && !value) {
          return false;
        }
        return true;
      },
    }),
  });

  const variantMethods = useForm({
    resolver: yupResolver(VaiantSchema),
  });

  const onVariantSubmit = variantMethods.handleSubmit(async (data) => {
    try {
      // console.log("tempVariantId", tempVariantId);
      // console.log("editVariantId", editVariantId);
      if (editVariantId) {
        await editVariantFun();
      } else {
        await createVariantFun();
      }
    } catch (error) {
      console.error(error);
      variantMethods.reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  useEffect(() => {
    if (variant && variant.length > 0) {
      variantMethods.reset();

      setEditVariantId(tempVariantId);
      const firstVariant = variant[0];
      const newData = {
        groupName: {
          en: firstVariant.groupName.en,
          ar: firstVariant.groupName.ar,
        },
        allowMoreQuantity: firstVariant.allowMoreQuantity,
        maximum: firstVariant?.maximum || 0,
        minimum: firstVariant?.minimum || 0,
        selectionType: firstVariant.selectionType,
      };
      setVariantData(newData);
      Object.entries(newData).forEach(([fieldName, nestedData]: any) => {
        if (fieldName === 'groupName') {
          Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
            const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
            variantMethods.setValue(fullFieldName as 'groupName.en' | 'groupName.ar', value);
          });
        } else {
          variantMethods.setValue(fieldName, nestedData);
        }
      });
    } else {
      variantMethods.reset();
      setVariantData(null);
      setEditVariantId(null);
    }
  }, [variant, variantMethods, tempVariantId]);

  const handleNestedVariantData = (e: any) => {
    const { name, value } = e.target;
    const [parentKey, nestedKey] = name.split('.');
    const obj = {
      ...variantData,
      groupName: {
        ...(variantData?.groupName || {}),
        [nestedKey]: value,
      },
    };
    setVariantData(obj);
  };
  const handleVariantData = (e: any) => {
    const { name, value } = e.target;
    setVariantData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleVariantCheckBox = (e: any, value: any) => {
    const { name, checked } = e.target;
    // console.log(name, checked);
    setVariantData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------
  const createVariantFun = () => {
    if (variantData && Object.entries(variantData).length > 0) {
      // console.log("variantData", tempVariantId);
      dispatch(createVariant({ productId: tempVariantId, data: variantData })).then(
        (response: any) => {
          if (response.meta.requestStatus === 'fulfilled') {
            variantMethods.reset();
            setVariantData(null);
            setEditVariantId(null);
            handleDrawerCloseCommon('variants');

            dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
              setProductsLength(response.payload.data.count);
              setData(response.payload.data.data);
            });
            enqueueSnackbar('Successfully Created!', { variant: 'success' });
          } else {
            enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
          }
        }
      );
    }
  };

  const editVariantFun = () => {
    if (variantData && Object.entries(variantData).length > 0) {
      dispatch(editVariant({ variantId: tempVariantId, data: variantData })).then(
        (response: any) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
              setProductsLength(response.payload.data.count);
              setData(response.payload.data.data);
            });

            enqueueSnackbar('Successfully Updated!', { variant: 'success' });
          } else {
            enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
          }
        }
      );
    }
  };

  // const removeProductFun = () => {
  //   if (removeData) {
  //     dispatch(deleteProduct(removeData)).then((response: any) => {
  //       if (response.meta.requestStatus === 'fulfilled') {
  //         dispatch(fetchProductsList(error));
  //         enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
  //         confirm.onFalse();
  //       } else {
  //         enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
  //       }
  //     });
  //   }
  // }
  useEffect(() => {
    dispatch(fetchProductsWithParams({ pageNumber, pageSize })).then((response) => {
      setProductsLength(response.payload.data.count);
      setData(response.payload.data.data);
    });
  }, [dispatch, pageNumber]);
  const listStuff = data;
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    setListItems(listStuff);
  }, [listStuff]);
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListItems(items);
  };
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(false);
  useEffect(() => {
    const sortedList = sort
      ? [...listStuff].sort((a: any, b: any) =>
        b.name.en.toLowerCase().localeCompare(a.name.en.toLowerCase())
      )
      : listStuff;
    setListItems(sortedList);
  }, [listStuff, sort]);
  const imagesItrations = Array.from({ length: 3 }, (_, index) => index);
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
      await getPermission('edit', 'UPDATE_PRODUCT_BY_ID');
      await getPermission('remove', 'DELETE_PRODUCT_BY_ID');
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoleBasedGuard hasContent permission="GET_PRODUCTS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Products" crums={false} />
          </Grid>
          <RoleBasedGuard permission="CREATE_PRODUCT">
            <Grid item xs={12} md={5}>
              <BottomActions>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  spacing="20px"
                  sx={{ width: '100%', maxWidth: { xs: '100%', md: '250px' } }}
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

          <Grid item xs={12}>
            <Box mt="20px">
              <ProductTableToolbar
                sort={sort}
                setSort={setSort}
                query={query}
                setQuery={setQuery}
              />
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
                      boxShadow: (theme) =>
                        `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    <Tab
                      iconPosition="end"
                      value="All"
                      label="All Products"
                      icon={
                        <Label
                          variant={(value === 'All' && 'filled') || 'outlined'}
                          color="primary"
                        >
                          {productsLength}
                        </Label>
                      }
                    />
                    {categoryState.list.map((categoryObj: any) => (
                      <Tab
                        key={categoryObj._id}
                        iconPosition="end"
                        value={categoryObj._id}
                        label={categoryObj?.name?.en || ''}
                        icon={
                          <Label
                            variant={(categoryObj._id === value && 'filled') || 'outlined'}
                            color="primary"
                          >
                            {
                              list.filter((product: any) => product.categoryId === categoryObj._id)
                                .length
                            }
                          </Label>
                        }
                      />
                    ))}
                  </TabList>
                </Box>

                <TabPanel value={value} sx={{ px: 0, minHeight: '50vh' }}>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <Grid
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          container
                          spacing={2}
                        >
                          {/* DND START */}
                          {listItems
                            .filter((item: any) =>
                              item.name.en.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                            )
                            .map((product: any, indx: any) => (
                              <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                                {(provided) => (
                                  <Grid
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                    item
                                    xs={12}
                                  >
                                    <Paper elevation={4}>
                                      <Grid
                                        container
                                        item
                                        alignItems="center"
                                        justifyContent="space-between"
                                        rowGap={3}
                                        sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}
                                      >
                                        <Grid item xs={12} md={6}>
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '8px',
                                            }}
                                          >
                                            <div {...provided.dragHandleProps}>
                                              <Iconify icon="ci:drag-vertical" />
                                            </div>
                                            <Box
                                              component="img"
                                              src={product.images[0]}
                                              alt=" "
                                              width="60px"
                                            />
                                            <Box display="flex" gap="0px" flexDirection="column">
                                              <Typography
                                                component="p"
                                                noWrap
                                                variant="subtitle2"
                                                sx={{
                                                  fontSize: '.9rem',
                                                  fontWeight: 800,
                                                  maxWidth: { xs: '100%', md: '188px' },
                                                }}
                                              >
                                                {' '}
                                                {product?.name?.en}{' '}
                                              </Typography>
                                              <Typography
                                                component="p"
                                                noWrap
                                                variant="subtitle2"
                                                sx={{
                                                  opacity: 0.7,
                                                  fontSize: '.9rem',
                                                  maxWidth: { xs: '100%', md: '188px' },
                                                }}
                                              >
                                                {product.category}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '8px',
                                              justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                            }}
                                          >
                                            <Typography
                                              component="p"
                                              variant="subtitle2"
                                              sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                            >
                                              {' '}
                                              {product.price} KWD{' '}
                                            </Typography>
                                            &nbsp; &nbsp;
                                            {/* <Iconify
                                          icon="mdi:pen-plus"
                                          onClick={toggleDrawerCommon('variants', product._id)}
                                          style={{ cursor: 'pointer' }}
                                        />{' '} */}
                                            <Link href={`/dashboard/products/${product._id}`}>
                                              <Iconify
                                                icon="mdi:pen-plus"
                                                style={{ cursor: 'pointer' }}
                                              />{' '}
                                            </Link>
                                            &nbsp; &nbsp;
                                            {allowAction.remove && (
                                              <Iconify
                                                icon="carbon:delete"
                                                onClick={() => {
                                                  setRemoveData(product._id);
                                                  confirm.onTrue();
                                                }}
                                                style={{ cursor: 'pointer' }}
                                              />
                                            )}{' '}
                                            &nbsp; &nbsp;
                                            {allowAction.edit && (
                                              <Iconify
                                                icon="bx:edit"
                                                onClick={toggleDrawerCommon('new', product._id)}
                                                style={{ cursor: 'pointer' }}
                                              />
                                            )}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </Grid>
                                )}
                              </Draggable>
                            ))}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                </TabPanel>
                {Math.ceil(productsLength / pageSize) !== 1 && (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <NavigatorBar
                      pageSize={pageSize}
                      itemsLength={productsLength}
                      setPageNumber={setPageNumber}
                    />
                  </Box>
                )}
              </TabContext>
            </Box>
          </Grid>
        </Grid>

        <DetailsNavBar
          open={openDetails}
          onClose={handleDrawerCloseCommon('new')}
          title={editProductId ? 'Edit Product' : 'Add New Product'}
          actions={
            <Stack alignItems="center" justifyContent="center" spacing="10px">
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                // onClick={editProductId ? editProductFun : createProductFun}
                loading={isSubmitting}
                onClick={() => methods.handleSubmit(onSubmit as any)()}
                sx={{ borderRadius: '30px' }}
              >
                {editProductId ? 'Update' : 'Save'}
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
                  backgroundColor: '#F5F6F8',
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
          </FormProvider>
        </DetailsNavBar>

        <DetailsNavBar
          open={openVariant}
          onClose={handleDrawerCloseCommon('variants')}
          title={editVariantId ? 'Edit Variant' : 'Add New Variant'}
          actions={
            <Stack alignItems="center" justifyContent="center" spacing="10px">
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                loading={variantMethods.formState.isSubmitting}
                onClick={() => variantMethods.handleSubmit(onVariantSubmit as any)()}
                sx={{ borderRadius: '30px' }}
              >
                {editVariantId ? 'Update' : 'Save'}
              </LoadingButton>
            </Stack>
          }
        >
          <FormProvider methods={variantMethods} onSubmit={onVariantSubmit}>
            <Divider flexItem />
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Box width="100%">
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Group Name (English)
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                settingStateValue={handleNestedVariantData}
                value={variantData?.groupName?.en || ''}
                name="groupName.en"
              />

              <Typography
                mt="20px"
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Group Name (Arabic)
              </Typography>

              <RHFTextField
                fullWidth
                variant="filled"
                settingStateValue={handleNestedVariantData}
                value={variantData?.groupName?.ar || ''}
                name="groupName.ar"
              />

              <Typography
                mt="20px"
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Selection Type
              </Typography>

              <RHFSelect
                fullWidth
                variant="filled"
                name="selectionType"
                id="demo-simple-select2"
                value={variantData?.selectionType || ''}
                settingStateValue={handleVariantData}
              >
                <MenuItem value="multiple">Multiple</MenuItem>
                <MenuItem value="single">Single</MenuItem>
              </RHFSelect>

              {variantData?.selectionType === 'multiple' && (
                <>
                  <Typography
                    mt="20px"
                    mb="5px"
                    component="p"
                    noWrap
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                  >
                    Minimum
                  </Typography>
                  <RHFTextField
                    fullWidth
                    type="number"
                    variant="filled"
                    settingStateValue={handleVariantData}
                    value={variantData?.minimum || ''}
                    name="minimum"
                  />

                  <Typography
                    mt="20px"
                    mb="5px"
                    component="p"
                    noWrap
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem' }}
                  >
                    Maximum
                  </Typography>
                  <RHFTextField
                    type="number"
                    fullWidth
                    variant="filled"
                    settingStateValue={handleVariantData}
                    value={variantData?.maximum || ''}
                    name="maximum"
                  />
                </>
              )}

              <Stack
                mt="20px"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  borderRadius: '16px',
                  padding: '7px 14px',
                  backgroundColor: '#F5F6F8',
                }}
              >
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontWeight: 900, fontSize: '.9rem' }}
                >
                  Allow More Quantity
                </Typography>
                <Checkbox
                  size="medium"
                  name="allowMoreQuantity"
                  checked={variantData?.allowMoreQuantity || false}
                  // onChange={(e: any) => setVariantData({ ...variantData, allowMoreQuantity: e.target.checked })}
                  onChange={handleVariantCheckBox}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                {/* <Switch size="medium"
                checked={!!variantData?.allowMoreQuantity}
                // onChange={(e: any) => setVariantData({ ...variantData, allowMoreQuantity: e.target.checked })}
                onChange={(e) => {
                  console.log('Previous variantData:', variantData);
                  setVariantData((prevData: any) => ({ ...prevData, allowMoreQuantity: !!e.target.checked }));
                  console.log('Updated variantData:', variantData);
                }}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              /> */}
              </Stack>
            </Box>
          </FormProvider>
        </DetailsNavBar>

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          noCancel={false}
          content={<>Are you sure want to delete items?</>}
          action={
            <Button
              fullWidth
              color="error"
              variant="soft"
              size="large"
              onClick={removeProductFun}
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
