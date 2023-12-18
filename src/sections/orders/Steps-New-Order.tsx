import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Checkbox, Divider, FormControlLabel, InputAdornment, TextField } from '@mui/material';
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
import * as Yup from 'yup';

// ----------------------------------------------------------------------
interface DropDownState {
  order_status: (EventTarget & (Element | HTMLElement)) | null;
  payment_method: (EventTarget & (Element | HTMLElement)) | null;
  order_value: any; // Replace 'any' with the appropriate type
  payment_value: any; // Replace 'any' with the appropriate type
  analytics: (EventTarget & (Element | HTMLElement)) | null;
}
const steps = ['Select Customer', 'Select Products', 'Confirm Order'];

export default function StepsNewOrders({ closeDrawer }: any) {
  const [dropDown, setDropDown] = React.useState<DropDownState>({
    order_status: null,
    payment_method: null,
    order_value: 'Pending',
    payment_value: 'Master',
    analytics: null,
  });

  const handleOpenDropDown = React.useCallback(
    (openTo: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
      console.log('event.currentTarget', event.currentTarget);

      if (openTo === 'order') setDropDown((pv) => ({ ...pv, order_status: event.currentTarget }));
      else if (openTo === 'payment')
        setDropDown((pv) => ({ ...pv, payment_method: event.currentTarget }));
      else if (openTo === 'analytics')
        setDropDown((pv) => ({ ...pv, analytics: event.currentTarget }));
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
        if (closeTo === 'order')
          setDropDown((pv) => ({
            ...pv,
            order_status: null,
            order_value: value ?? pv.order_value,
          }));
        else if (closeTo === 'payment')
          setDropDown((pv) => ({
            ...pv,
            payment_method: null,
            payment_value: value ?? pv.payment_value,
          }));
        else if (closeTo === 'analytics') {
          handleReset();
          setDropDown({
            order_status: null,
            payment_method: null,
            order_value: null,
            payment_value: null,
            analytics: null,
          });
          closeDrawer(event);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    [closeDrawer]
  );

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleReset = () => setActiveStep(0);
  const DetailSchema = Yup.object().shape({
    number: Yup.number().required('Number is required'),
    // search: Yup.string().required('Search is required'),
  });
  const DetailSchema2 = Yup.object().shape({
    search: Yup.string().required('Search is required'),
    // search: Yup.string().required('Search is required'),
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
    if (data && data.number) {
      handleNext();
    }
  });
  const onSubmit2 = handSub(async (data) => {
    if (data && data.search) {
      handleNext();
    }
  });

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
              placeholder="128743291"
              fullWidth
              variant="filled"
              type="number"
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
                      <Iconify icon="mingcute:down-fill" width={43} />
                      <Box component="img" src="/raw/flagN.png" />
                      <Divider orientation="vertical" variant="middle" flexItem />
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
              Or Select from current customers{' '}
            </Typography>

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
                sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
              >
                Mohamed Hassan
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                +9652312127845
              </Typography>
            </Paper>

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
                sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
              >
                محمود عبدالكريم
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                +9652312127845
              </Typography>
            </Paper>

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
                sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
              >
                Maher Alkahwndi
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                +9652312127845
              </Typography>
            </Paper>
            {activeStep !== steps.length && (
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
                    onClick={onSubmit}
                  >
                    Next
                  </Button>
                )}
              </Box>
            )}
          </FormProvider>
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <FormProvider onSubmit={handSub(onSubmit2 as any)} methods={methods2}>
            <RHFTextField
              name="search"
              placeholder="Search by order ID, phone or customer..."
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="img" src="/raw/search.svg" sx={{ width: '15px' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: '16px',
                '& .MuiFilledInput-root': {
                  borderRadius: '16px',
                },
                '& .MuiInputAdornment-root': {
                  marginTop: '0px !important',
                  paddingLeft: '10px',
                },
                '& input': {
                  color: '#8898AA',
                  paddingLeft: '10px',
                  fontSize: '14px',
                  padding: '15px 20px 15px 0px !important',
                },
              }}
            />
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ mt: '12px', opacity: 0.7, fontSize: '.8rem' }}
            >
              {' '}
              Or Select from current customers{' '}
            </Typography>

            <Paper
              sx={{
                mt: '12px',
                padding: '13px 20px',
                boxShadow: '0px 4px 20px #0F134914',
                borderRadius: '13px',
              }}
            >
              <Stack direction="row" spacing="20px">
                <Box>
                  <Box component="img" src="/raw/s1.png" alt="" />
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
                  >
                    iPhone 13 Pro Max
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    142 KWD
                  </Typography>
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
                    >
                      +
                    </Button>
                    <strong> 1 </strong>
                    <Button
                      variant="soft"
                      size="small"
                      sx={{
                        minWidth: '30px',
                        borderRadius: '20px',
                        backgroundColor: '#E1E1E8',
                        fontSize: '22px',
                      }}
                    >
                      -
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            <Paper
              sx={{
                mt: '12px',
                padding: '13px 20px',
                boxShadow: '0px 4px 20px #0F134914',
                borderRadius: '13px',
              }}
            >
              <Stack direction="row" spacing="20px">
                <Box>
                  <Box component="img" src="/raw/s2.png" alt="" width="100%" />
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800 }}
                  >
                    Black Smart Watch GXT
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    39 KWD
                  </Typography>
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
                    >
                      +
                    </Button>
                    <strong> 2 </strong>
                    <Button
                      variant="soft"
                      size="small"
                      sx={{
                        minWidth: '30px',
                        borderRadius: '20px',
                        backgroundColor: '#E1E1E8',
                        fontSize: '22px',
                      }}
                    >
                      -
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
            {/* Button */}
            {activeStep !== steps.length && (
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
                    onClick={onSubmit2}
                  >
                    Next
                  </Button>
                )}
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
              2 Items is added{' '}
            </Typography>

            <Stack direction="row" alignItems="center" spacing="20px">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.5, fontSize: '.9rem' }}
              >
                {' '}
                1x{' '}
              </Typography>

              <Box>
                <Box component="img" src="/raw/s1.png" alt="" sx={{ maxWidth: '40px' }} />
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800, maxWidth: '200px' }}
                  noWrap
                >
                  iPhone 13 Pro Max
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  142 KWD
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing="20px" sx={{ mt: '20px' }}>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.5, fontSize: '.9rem' }}
              >
                {' '}
                2x{' '}
              </Typography>

              <Box>
                <Box component="img" src="/raw/s2.png" alt="" sx={{ maxWidth: '40px' }} />
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 800, maxWidth: '200px' }}
                  noWrap
                >
                  Black Smart Watch GXT{' '}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  142 KWD
                </Typography>
              </Box>
            </Stack>
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
                210.500 KWD{' '}
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
                - 8.000 KWD
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
                0.000 KWD{' '}
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
                5.000 KWD{' '}
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
                84.55 KWD{' '}
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
                {dropDown.payment_value}{' '}
                <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />
              </Typography>
            </Stack>
          </Paper>

          {/* customer info */}
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
                <Box component="img" src="/raw/flag.png" />
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.9rem', fontWeight: 700 }}
                >
                  {' '}
                  Mohamed Hassan{' '}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  mohamed.hassan@gmail.com
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  +9652312127845
                </Typography>
              </Box>
            </Stack>
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

            <FormControlLabel
              label="Bnied Al-Gari - Ali Sabah - Street 2 House No 420"
              control={<Checkbox size="medium" defaultChecked />}
            />
            <FormControlLabel
              label="Bnied Al-Gari - Ali Sabah - Street 2 House No 420"
              control={<Checkbox size="medium" />}
            />
            <Stack direction="row" spacing="10px" sx={{ my: '10px' }}>
              <Iconify icon="mingcute:add-fill" />
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', opacity: 0.7 }}
              >
                {' '}
                Delivery Address{' '}
              </Typography>
            </Stack>
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
                {dropDown.order_value}{' '}
                <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />{' '}
              </Typography>
            </Stack>
          </Paper>
          {/* Sect 3 Ended */}
          {activeStep !== steps.length && (
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
                  onClick={onSubmit2}
                >
                  Next
                </Button>
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
            selected={dropDown.order_value === item}
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
        {['Master', 'VISA', 'KENT'].map((item) => (
          <MenuItem
            key={item}
            selected={dropDown.payment_value === item}
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
    </>
  );
}
