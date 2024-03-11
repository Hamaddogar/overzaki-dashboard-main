import React, { useEffect, useState } from 'react';
// @mui
import { createOrders, fetchOrderssList } from 'src/redux/store/thunks/defaultOrders';
import { useSnackbar } from 'notistack';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Select, Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, InputAdornment, TextField, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from 'src/redux/store/store';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchCustomersList } from 'src/redux/store/thunks/customers';
import { fetchCustomersList } from '../../redux/store/thunks/customers';
import { fetchProductsList } from '../../redux/store/thunks/products';
import { fetchLocationsList } from '../../redux/store/thunks/location';
import { fetchDeliveryZonesForBranch } from '../../redux/store/thunks/deliveryZone';


// ----------------------------------------------------------------------
// interface DropDownState {
//   order_status: (EventTarget & (Element | HTMLElement)) | null;
//   payment_method: (EventTarget & (Element | HTMLElement)) | null;
//   analytics: (EventTarget & (Element | HTMLElement)) | null;
// }
const steps = ['Select Customer', 'Select Products', 'Confirm Order'];
const defaultOrderData = {
  status: 'Pending',
  paymentMethod: 'Cash On Delivery',
  subTotal: 0,
  discount: 0,
  vat: 0,
  delivery_fee: 0,
}

export default function StepsNewOrders({ closeDrawer }: any) {
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const customersState = useSelector((state: any) => state.customers);
  const productState = useSelector((state: any) => state.products);
  const locationsState = useSelector((state: any) => state.locations);


  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [customersList, setCustomersList] = useState<any>(customersState?.list);
  const [orderData, setOrderData] = useState<any>(defaultOrderData);
  const [deliveryZoneList, setDeliveryZoneList] = useState<any>([]);

  useEffect(() => {
    let subTotal = 0;
    selectedProducts.forEach((product: any) => {
      subTotal += (Number(product.price) * product.count)
    });

    if (subTotal !== orderData?.subTotal) {
      setOrderData({ ...orderData, subTotal });
    }
  }, [orderData, selectedProducts])



  useEffect(() => {
    if (customersState?.status === 'idle') {
      const { error } = customersState;
      dispatch(fetchCustomersList(error));
    }
    setCustomersList(customersState?.list || [])

  }, [customersState, dispatch]);

  useEffect(() => {
    if (productState?.status === 'idle') {
      const { error } = productState;
      dispatch(fetchProductsList(error));
    }
  }, [productState, dispatch]);

  useEffect(() => {
    if (locationsState?.status === 'idle') {
      dispatch(fetchLocationsList(locationsState?.error));
    }

  }, [locationsState, dispatch]);


  useEffect(() => {
    if (orderData?.branchId && orderData?.branchId !== "") {
      dispatch(fetchDeliveryZonesForBranch(orderData?.branchId)).then((dzRes: any) => {
        if (dzRes.meta.requestStatus === 'fulfilled') {
          setDeliveryZoneList(dzRes.payload.data);
        }
      });
    }
  }, [dispatch, orderData])





  const [dropDown, setDropDown] = React.useState<any>({
    order_status: null,
    payment_method: null,
    analytics: null,
  });

  const handleOpenDropDown = React.useCallback(
    (openTo: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
      console.log('event.currentTarget', event.currentTarget);

      if (openTo === 'order') setDropDown((pv: any) => ({ ...pv, order_status: event.currentTarget }));
      else if (openTo === 'payment')
        setDropDown((pv: any) => ({ ...pv, payment_method: event.currentTarget }));
      else if (openTo === 'analytics')
        setDropDown((pv: any) => ({ ...pv, analytics: event.currentTarget }));
    },
    []
  );

  const handleCloseDropDown = React.useCallback(
    (closeTo: string, value: string | null = null) =>
      (event: React.MouseEvent<HTMLElement> | React.SyntheticEvent | React.KeyboardEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        if (closeTo === 'order') {
          setDropDown((pv: any) => ({
            ...pv,
            order_status: null,
          }));
          setOrderData({ ...orderData, status: value });
        }
        else if (closeTo === 'payment') {
          setDropDown((pv: any) => ({
            ...pv,
            payment_method: null,
          }));
          setOrderData({ ...orderData, paymentMethod: value });
        }
        else if (closeTo === 'analytics') {
          handleReset();
          setDropDown({
            order_status: null,
            payment_method: null,
            analytics: null,
          });
          closeDrawer(event);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    [closeDrawer, orderData]
  );

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleReset = () => setActiveStep(0);
  const DetailSchema = Yup.object().shape({
  });
  const DetailSchema2 = Yup.object().shape({
  });
  const methods = useForm({
    resolver: yupResolver(DetailSchema),
  });
  const methods2 = useForm({
    resolver: yupResolver(DetailSchema2),
  });
  const { handleSubmit } = methods;
  const { handleSubmit: handSub } = methods2;
  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    handleNext();
  });
  const onSubmit2 = handSub(async (data) => {
    handleNext();
  });

  // -------------------------------------------------------------

  const handleSearchCustomer = (e: any) => {
    const inputV = e?.target?.value;
    const newList = customersState.list.filter((customer: any) => {
      const customerPhoneNumber = customer?.phoneNumber?.toString().toLowerCase();
      const searchTerm = inputV.toLowerCase();
      return customerPhoneNumber.includes(searchTerm);
    });

    setCustomersList(newList);
  }

  const handleSelectedProduct = (e: any, product: any) => {
    const isExist = selectedProducts.find((item: any) => item?._id === product?._id);
    if (!isExist) {
      setSelectedProducts([...selectedProducts, { ...product, count: 1 }])
    }
  }

  const handleCount = (action: any, id: any) => {
    setSelectedProducts((prev: any) => prev.map((item: any) => {
      if (item?._id === id) {
        return {
          ...item,
          count: action === 'plus' ? (item.count + 1) : (item.count - 1)
        }
      }
      return item;
    }))
  }

  const handleRemoveProduct = (id: any) => {
    setSelectedProducts((prev: any) => prev.filter((item: any) => item?._id !== id))
  }

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
  };

  // ---------------------------------------------------------------------

  const handleOrderSubmit = () => {
    console.log(orderData);
    console.log(selectedProducts);

    if (orderData?.customer && selectedProducts.length > 0 && orderData?.address) {
      const submitData = {
        items: selectedProducts.map((product: any) => ({
          productId: product?._id,
          varientId: product?.selectedVariant,
          varientRowId: product?.selectedRow,
          count: product?.count
        })),
        userId: orderData?.customer?._id,
        status: orderData.status,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        branchId: orderData?.branchId,
        deliveryZoneId: orderData?.deliveryZoneId,
      }

      dispatch(createOrders(submitData)).then((response: any) => {
        console.log(response);
        if (response.meta.requestStatus === 'fulfilled') {
          setOrderData(defaultOrderData);
          setSelectedProducts([]);
          setActiveStep(0);
          dispatch(fetchOrderssList(undefined));
          handleCloseDropDown('analytics')
          enqueueSnackbar('Successfully Created!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });

    }

  }

  const handleSelectVariant = (variant_id: any, product_id: any) => {

    const selectedArray = selectedProducts.map((prev_product: any) => {
      if (prev_product?._id === product_id) {
        return {
          ...prev_product,
          selectedVariant: variant_id,
          selectedRow: ""
        }
      }
      return prev_product;
    });

    setSelectedProducts(selectedArray)
  }
  const handleSelectRow = (event: SelectChangeEvent, product_id: any) => {
    const row_id: any = event.target.value;
    const selectedArray = selectedProducts.map((prev_product: any) => {
      if (prev_product?._id === product_id) {
        return {
          ...prev_product,
          selectedRow: row_id,
        }
      }
      return prev_product;
    })

    setSelectedProducts(selectedArray)
  }

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length && (
        <Box>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex', width: '100%' }}>
            <Button fullWidth onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 0 && (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <FormProvider onSubmit={handleSubmit(onSubmit as any)} methods={methods}>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ mb: '12px', opacity: 0.7, fontSize: '.8rem' }}
            >
              Enter customer number
            </Typography>
            <RHFTextField
              name="number"
              placeholder="Search by Phone number"
              fullWidth
              variant="filled"
              type="text"
              onChange={(e) => handleSearchCustomer(e)}
              sx={{
                borderRadius: '16px',
                '& .MuiFilledInput-root': {
                  borderRadius: '16px',
                },
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                  // paddingLeft: '10px'
                },
                '& input': {
                  color: '#8898AA',
                  paddingLeft: '10px',
                  fontSize: '14px',
                  padding: '15px 20px 15px 2px !important',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Stack direction="row" alignItems="center" spacing="8px">
                      <Iconify icon="ic:baseline-search" width={23} />
                      <Divider orientation="vertical" variant="middle" sx={{ m: 0 }} flexItem />
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ mt: '12px', opacity: 0.7, fontSize: '.8rem' }}
            >
              {' '}
              {orderData?.customer ? "1 Customer is Selected" : "Or Select from current customers"}
              {' '}
            </Typography>

            {customersList?.map((customer: any, index: any) => (
              <Paper
                key={index}
                sx={{
                  mt: '12px',
                  padding: '13px 20px',
                  boxShadow: '0px 4px 20px #0F134914',
                  borderRadius: '13px',
                  borderColor: orderData?.customer?._id === customer?._id ? '#1BFBB6' : 'transparent'
                }}
                color="primary"
                variant="outlined"
                onClick={() => { setOrderData({ ...orderData, customer }) }}
              >
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
                >
                  {`${customer?.firstName} ${customer?.lastName}`}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  {customer?.phoneNumber}
                </Typography>
              </Paper>
            ))}

            {activeStep !== steps.length && (
              <Box sx={{ display: 'flex', gap: '10px', width: '100%', mt: 3 }}>
                {/* {activeStep === steps.length - 1 ? (
                  <Button
                    size="large"
                    sx={{
                      borderRadius: '30px',
                      boxShadow: '0px 6px 20px #1BFCB633',
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDropDown('analytics')}
                  >
                    Confirm & Create
                  </Button>
                ) : (
                )} */}
                <Button
                  size="large"
                  sx={{
                    borderRadius: '30px',
                    boxShadow: '0px 6px 20px #1BFCB633',
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                >
                  Next
                </Button>
              </Box>
            )}
          </FormProvider>
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <FormProvider onSubmit={handSub(onSubmit2 as any)} methods={methods2}>

            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              onChange={handleSelectedProduct}
              options={productState?.list.map((option: any) => option)}
              getOptionLabel={(option: any) => option?.name?.en}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  placeholder="Select Products"
                  sx={{ '& .MuiFilledInput-root': { py: 1 } }}
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
              renderOption={(props: any, option: any) => (
                <li {...props} key={option?._id}>
                  {`${option?.name?.en}`}
                </li>
              )}
            />


            <Typography
              component="p"
              variant="subtitle2"
              sx={{ mt: '12px', opacity: 0.7, fontSize: '.8rem' }}
            >
              {selectedProducts?.length > 0 ? "Selected Products" : "No Product Selected"}
            </Typography>

            {selectedProducts.map((product: any, index: any) => (
              <Paper
                key={index}
                sx={{
                  mt: '12px',
                  padding: '13px 20px',
                  boxShadow: '0px 4px 20px #0F134914',
                  borderRadius: '13px',
                }}
              >
                <Stack direction="row" spacing="20px">
                  <Box>
                    <Box component="img" width='80px' src={product?.images[0]} alt="img" />
                  </Box>
                  <Box width="100%" >
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
                      >
                        {product?.name?.en}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ minWidth: '30px', borderRadius: '20px', fontSize: '22px' }}
                        onClick={() => handleRemoveProduct(product?._id)}
                      >
                        <Iconify icon="gridicons:cross" width={14} />
                      </Button>
                    </Box>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '.8rem' }}
                    >
                      {product?.price} KWD
                    </Typography>

                    <Stack
                      sx={{ mt: '10px' }}
                      direction="column"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing="10px"
                    >

                      <FormControl fullWidth >
                        <InputLabel id="variants">Variant</InputLabel>
                        <Select
                          labelId="variants"
                          variant='filled'
                          name='selectedVariant'
                          label='Variant'
                          value={product?.selectedVariant || ""}
                          onChange={(event: SelectChangeEvent) => handleSelectVariant(event.target.value, product?._id)}
                        >
                          {product?.varients?.map((variant: any, i: any) => (
                            <MenuItem key={i} value={variant?._id}>{variant?.groupName?.localized || variant?.groupName?.en || ""}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {product?.selectedVariant && (
                        <FormControl fullWidth >
                          <InputLabel id="rows">Row</InputLabel>
                          <Select
                            labelId="Row"
                            variant='filled'
                            name='selectedRow'
                            value={product?.selectedRow || ""}
                            onChange={(event: SelectChangeEvent) => handleSelectRow(event, product?._id)}
                          >
                            {product?.varients?.find((variant: any) => variant?._id === product?.selectedVariant)?.rows?.map((row: any, indx: any) => (
                              <MenuItem key={indx} value={row?._id}>{row?.name?.localized || row?.name?.en || ""}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}




                    </Stack>


                    <Stack
                      sx={{ mt: '10px' }}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing="20px"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ minWidth: '30px', borderRadius: '20px', fontSize: '22px' }}
                        disabled={product.quantity === product.count}
                        onClick={() => handleCount('plus', product._id)}
                      >
                        +
                      </Button>
                      <strong> {product.count} </strong>
                      <Button
                        variant="soft"
                        size="small"
                        sx={{
                          minWidth: '30px',
                          borderRadius: '20px',
                          backgroundColor: '#E1E1E8',
                          fontSize: '22px',
                        }}
                        disabled={product.count === 1}
                        onClick={() => handleCount('minus', product._id)}
                      >
                        -
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

            ))}

            {/* Button */}
            {activeStep !== steps.length && (
              <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
                {/* {activeStep === steps.length - 1 ? (
                  <Button
                    size="large"
                    sx={{
                      borderRadius: '30px',
                      boxShadow: '0px 6px 20px #1BFCB633',
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDropDown('analytics')}
                  >
                    Confirm & Create
                  </Button>
                ) : (
                )} */}
                <Button
                  size="large"
                  sx={{
                    borderRadius: '30px',
                    boxShadow: '0px 6px 20px #1BFCB633',
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onSubmit2}
                >
                  Next
                </Button>
              </Box>
            )}
          </FormProvider>
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ width: '100%' }}>
          <Paper
            sx={{
              mt: '12px',
              padding: '13px 20px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '13px',
            }}
          >
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ mb: '12px', opacity: 0.7, fontSize: '.8rem' }}
            >
              {' '}
              {selectedProducts?.length} Items is added{' '}
            </Typography>

            {selectedProducts.map((product: any, ind: any) => (
              <Stack key={ind} direction="row" alignItems="center" spacing="20px">
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.5, fontSize: '.9rem' }}
                >
                  {' '}
                  {product?.count}x{' '}
                </Typography>

                <Box>
                  <Box component="img" src={product?.images[0]} alt="" sx={{ maxWidth: '40px' }} />
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800, maxWidth: '200px' }}
                    noWrap
                  >
                    {product?.name?.en}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    {product?.price} KWD
                  </Typography>
                </Box>
              </Stack>

            ))}
          </Paper>

          {/* payment summary */}
          <Paper
            sx={{
              mt: '12px',
              padding: '13px 20px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Typography
              component="p"
              mb="15px"
              variant="subtitle2"
              sx={{ fontSize: '.8rem', fontWeight: 800 }}
            >
              {' '}
              Payment Summary{' '}
            </Typography>

            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                Subtotal
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 700 }}
              >
                {' '}
                {orderData?.subTotal} KWD{' '}
              </Typography>
            </Stack>

            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                color="error"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                Discount
              </Typography>
              <Typography
                component="p"
                color="error"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 700 }}
              >
                {' '}
                {orderData?.discount} KWD
              </Typography>
            </Stack>

            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                VAT (0%)
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 700 }}
              >
                {' '}
                {orderData?.vat} KWD{' '}
              </Typography>
            </Stack>

            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                Delivery Fees
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 700 }}
              >
                {' '}
                {orderData?.delivery_fee} KWD{' '}
              </Typography>
            </Stack>

            <Divider flexItem />
            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                Total
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 900 }}
              >
                {' '}
                {orderData?.subTotal} KWD{' '}
              </Typography>
            </Stack>

            <Stack
              spacing="10px"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.85rem' }}
              >
                Payment Method
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 900, display: 'flex', alignItems: 'center' }}
                onClick={handleOpenDropDown('payment')}
              >
                {' '}
                {orderData?.paymentMethod}{' '}
                <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />
              </Typography>
            </Stack>
          </Paper>

          {/* customer info */}
          {orderData.customer && (
            <Paper
              sx={{
                width: '100%',
                mt: '12px',
                padding: '13px 20px',
                boxShadow: '0px 4px 20px #0F134914',
                borderRadius: '13px',
                display: 'flex',
                gap: '10px',
                flexDirection: 'column',
              }}
            >
              <Typography
                component="p"
                mb="15px"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 800 }}
              >
                {' '}
                Customer Info{' '}
              </Typography>
              <Stack direction="row" spacing="10px">
                <Box>
                  <Box component="img" width="80px" src={orderData?.customer?.avatar} />
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ fontSize: '.9rem', fontWeight: 700 }}
                  >
                    {orderData?.customer?.firstName} {orderData?.customer?.lastName}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem' }}
                  >
                    {orderData?.customer?.email}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem' }}
                  >
                    {orderData?.customer?.phoneNumber}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          <Paper
            sx={{
              width: '100%',
              mt: '12px',
              padding: '13px 20px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '13px',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}
          >
            <Typography
              component="p"
              mb="15px"
              variant="subtitle2"
              sx={{ fontSize: '.8rem', fontWeight: 800 }}
            >
              Branch
            </Typography>
            <FormControl fullWidth >
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                labelId="Branch"
                variant='filled'
                name='branchId'
                value={orderData?.branchId || ""}
                onChange={(event: SelectChangeEvent) => setOrderData({ ...orderData, branchId: event.target.value, deliveryZoneId: "" })}
              >
                {locationsState?.list?.map((delivery: any, indx: any) => (
                  <MenuItem key={indx} value={delivery?._id}>{delivery?.name?.localized || delivery?.name?.en || ""}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              component="p"
              mb="15px"
              variant="subtitle2"
              sx={{ fontSize: '.8rem', fontWeight: 800 }}
            >
              Delivery Zone
            </Typography>
            <FormControl fullWidth >
              <InputLabel id="zone">Delivery Zone</InputLabel>
              <Select
                labelId="Delivery Zone"
                variant='filled'
                name='deliveryZoneId'
                value={orderData?.deliveryZoneId || ""}
                onChange={(event: SelectChangeEvent) => setOrderData({ ...orderData, deliveryZoneId: event.target.value })}
              >
                {deliveryZoneList?.map((zone: any, indx: any) => (
                  <MenuItem key={indx} value={zone?._id}>{zone?.zoneName?.localized || zone?.zoneName?.en || ""}</MenuItem>
                ))}
              </Select>
            </FormControl>


          </Paper>
          <Paper
            sx={{
              width: '100%',
              mt: '12px',
              padding: '13px 20px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '13px',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}
          >
            <Typography
              component="p"
              mb="15px"
              variant="subtitle2"
              sx={{ fontSize: '.8rem', fontWeight: 800 }}
            >
              {' '}
              Delivery Address{' '}
            </Typography>

            {orderData?.address ? (
              <FormControlLabel
                label={`${orderData?.address.addressType} ${orderData?.address.block}  ${orderData?.address.street} ${orderData?.address.house}`}
                control={
                  <Checkbox size="medium" defaultChecked onClick={() => { setAddressDialogOpen(true) }} />
                }
              />
            ) : (
              <Stack direction="row" spacing="10px" sx={{ my: '10px' }}>
                <Iconify icon="mingcute:add-fill" />
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', opacity: 0.7 }}
                  onClick={() => { setAddressDialogOpen(true) }}
                >
                  {' '}
                  Delivery Address{' '}
                </Typography>
              </Stack>
            )}

          </Paper>

          <Paper
            sx={{
              width: '100%',
              mt: '12px',
              padding: '13px 20px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '13px',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}
          >
            <Typography
              component="p"
              mb="15px"
              variant="subtitle2"
              sx={{ fontSize: '.8rem', fontWeight: 800 }}
            >
              {' '}
              Select Order Status{' '}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing="10px"
              sx={{ my: '10px' }}
            >
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', opacity: 0.7 }}
              >
                {' '}
                Delivery Address{' '}
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', display: 'flex', alignItems: 'center', fontWeight: 900 }}
                onClick={handleOpenDropDown('order')}
              >
                {' '}
                {orderData?.status}{' '}
                <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />{' '}
              </Typography>
            </Stack>
          </Paper>
          {/* Sect 3 Ended */}
          {activeStep !== steps.length && (
            <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
              {activeStep === steps.length - 1 && (
                <Button
                  size="large"
                  sx={{
                    borderRadius: '30px',
                    boxShadow: '0px 6px 20px #1BFCB633',
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleOrderSubmit}
                >
                  Confirm & Create
                </Button>
                // ) : (
                //   <Button
                //     size="large"
                //     sx={{
                //       borderRadius: '30px',
                //       boxShadow: '0px 6px 20px #1BFCB633',
                //     }}
                //     fullWidth
                //     variant="contained"
                //     color="primary"
                //     onClick={onSubmit2}
                //   >
                //     Next
                //   </Button>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* {activeStep !== steps.length && (
        <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
          {activeStep === steps.length - 1 ? (
            <Button
              size="large"
              sx={{
                borderRadius: '30px',
                boxShadow: '0px 6px 20px #1BFCB633',
              }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleOpenDropDown('analytics')}
            >
              Confirm & Create
            </Button>
          ) : (
            <Button
              size="large"
              sx={{
                borderRadius: '30px',
                boxShadow: '0px 6px 20px #1BFCB633',
              }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      )} */}

      <Menu
        id="order-status"
        anchorEl={dropDown.order_status}
        onClose={handleCloseDropDown('order')}
        open={Boolean(dropDown.order_status)}
      >
        {['Pending', 'Accepted', 'Rejected', 'Completed'].map((item) => (
          <MenuItem
            key={item}
            selected={orderData?.status === item}
            sx={{ marginBottom: '20px' }}
            onClick={handleCloseDropDown('order', item)}
          >
            {item} Status
          </MenuItem>
        ))}
      </Menu>

      <Menu
        id="payment"
        anchorEl={dropDown.payment_method}
        onClose={handleCloseDropDown('payment')}
        open={Boolean(dropDown.payment_method)}
      >
        {['Bank Transfer', 'Installment Services', 'Cash On Delivery', 'Payment Gateway'].map((item) => (
          <MenuItem
            key={item}
            // selected={dropDown.payment_value === item}
            selected={orderData.paymentMethod === item}
            sx={{ marginBottom: '20px' }}
            onClick={handleCloseDropDown('payment', item)}
          >
            {item} Card
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        noCancel={false}
        open={Boolean(dropDown.analytics)}
        onClose={handleCloseDropDown('analytics')}
        content={
          <Grid container textAlign="center">
            <Grid xs={12}>
              <Iconify
                icon="teenyicons:tick-circle-solid"
                style={{
                  width: '120px',
                  height: '120px',
                  color: '#1BFCB6',
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Typography component="h4" variant="h5">
                Successful Order{' '}
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, maxWidth: '350px', margin: 'auto' }}
              >
                Order is created Successfully! You can now track the order from the orders list
              </Typography>
            </Grid>
          </Grid>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleCloseDropDown('analytics')}
            sx={{ borderRadius: '30px' }}
          >
            Contiune
          </Button>
        }
      />

      {addressDialogOpen && (
        <ShowAddressDialog
          closeDialog={closeAddressDialog}
          adressValues={orderData?.address || {}}
          setAddressValues={(dataObj: any) => setOrderData({ ...orderData, address: dataObj })}
        />
      )}
    </>
  );
}

const ShowAddressDialog = ({ closeDialog, adressValues, setAddressValues }: any) => {
  const addressSchema = Yup.object().shape({
    addressType: Yup.string().required('Field is required'),
    block: Yup.string().required('Field is required'),
    street: Yup.string().required('Field is required'),
    house: Yup.string().required('Field is required'),
    avenue: Yup.string().required('Field is required'),
    PACI: Yup.string().required('Field is required'),
    additional: Yup.string().required('Field is required'),
    floor: Yup.string().required('Field is required'),
    apartment: Yup.string().required('Field is required'),
    buildingName: Yup.string().required('Field is required'),
    office: Yup.string().required('Field is required'),
  });

  const methods = useForm({
    resolver: yupResolver(addressSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (adressValues && Object.entries(adressValues).length > 0) {
      Object.entries(adressValues).forEach(([fieldName, nestedData]: any) => {
        methods.setValue(fieldName, nestedData);
      });
    } else {
      reset();
    }
  }, [adressValues, methods, reset])




  const onSubmit = handleSubmit(async (data) => {
    setAddressValues(data);
    closeDialog();
  });





  return (
    <Dialog maxWidth="md" open>
      <DialogTitle>Delivery Address</DialogTitle>
      <DialogContent sx={{ maxHeight: "100%" }} >
        <FormProvider onSubmit={handleSubmit(onSubmit as any)} methods={methods}>
          <Grid container spacing={2}>

            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Address Type
              </Typography>
              {/* <RHFTextField
                variant="filled"
                name="addressType"
                value={undefined}
                placeholder="Address Type"
              /> */}
              <FormControl fullWidth >
                <Select
                  variant='filled'
                  name='addressType'
                  value={undefined}
                  onChange={(event: SelectChangeEvent) => methods.setValue('addressType', event.target.value)}
                >
                  <MenuItem value="Home" >Home</MenuItem>
                  <MenuItem value="Apartment" >Apartment</MenuItem>
                  <MenuItem value="Office" >Office</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Block
              </Typography>
              <RHFTextField
                variant="filled"
                name="block"
                value={undefined}
                placeholder="Block"
              />
            </Grid>

            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Street
              </Typography>
              <RHFTextField
                variant="filled"
                name="street"
                value={undefined}
                placeholder="street"
              />
            </Grid>
            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                House
              </Typography>
              <RHFTextField
                variant="filled"
                name="house"
                value={undefined}
                placeholder="house"
              />
            </Grid>
            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Avenue
              </Typography>
              <RHFTextField
                variant="filled"
                name="avenue"
                value={undefined}
                placeholder="avenue"
              />
            </Grid>
            <Grid xs={6}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                PACI
              </Typography>
              <RHFTextField
                variant="filled"
                name="PACI"
                value={undefined}
                placeholder="PACI"
              />
            </Grid>
            <Grid xs={12}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Additional
              </Typography>

              <RHFTextField
                variant="filled"
                name="additional"
                value={undefined}
                placeholder="additional"
              />
            </Grid>
            <Grid xs={3}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Floor
              </Typography>
              <RHFTextField
                variant="filled"
                name="floor"
                value={undefined}
                placeholder="floor"
              />
            </Grid>
            <Grid xs={3}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Apartment
              </Typography>
              <RHFTextField
                variant="filled"
                name="apartment"
                value={undefined}
                placeholder="apartment"
              />

            </Grid>
            <Grid xs={3}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Building Name
              </Typography>

              <RHFTextField
                variant="filled"
                name="buildingName"
                value={undefined}
                placeholder="buildingName"
              />
            </Grid>
            <Grid xs={3}>
              <Typography
                mb="5px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Office
              </Typography>
              <RHFTextField
                variant="filled"
                name="office"
                value={undefined}
                placeholder="office"
              />
            </Grid>
          </Grid>

        </FormProvider>
        {/* <Typography
          component="p"
          noWrap
          variant="caption"
          color="#fb4921"
          sx={{ fontSize: '.7rem' }}
        >
          {error?.end}
        </Typography> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <LoadingButton
          variant="soft"
          color="primary"
          loading={isSubmitting}
          onClick={() => methods.handleSubmit(onSubmit as any)()}
          sx={{ borderRadius: '30px' }}
        >
          Ok
        </LoadingButton>
      </DialogActions>
    </Dialog >
  );
};
