import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { AppDispatch } from 'src/redux/store/store';
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import * as Yup from 'yup';
import { createCategory, fetchOneCategory, setCategory } from 'src/redux/store/thunks/category';
import { RoleBasedGuard } from 'src/auth/guard';
import { BottomActions } from 'src/components/bottom-actions';
const AddCategoryDealer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>('');
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
    };
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
  const CategorySchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
  });
  const methods = useForm({
    resolver: yupResolver(CategorySchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
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
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleCategoryLogo = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, icon: files[0] });
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      await handleCreateCategory();
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });
  const removeLogo = () => {
    setCategoriesData((current: any) => {
      const { icon, ...rest } = current;
      return rest;
    });
  };
  const removeImage = () => {
    setCategoriesData((current: any) => {
      const { image, ...rest } = current;
      return rest;
    });
  };
  const handleCategoryImage = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, image: files[0] });
    }
  };
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
    (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'cat') {
        setCategoryDrawer((pv) => !pv);

        if (id) {
          dispatch(fetchOneCategory(id));
        } else {
          setCategoriesData({});
          dispatch(setCategory({}));
        }
      }
    };
  return (
    <>
      <Stack>
        <RoleBasedGuard permission="CREATE_CATEGORY">
          <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
            <BottomActions>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                spacing="10px"
                sx={{ width: '100%' }}
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
      </Stack>{' '}
      <DetailsNavBar
        open={categoryDrawer}
        onClose={handleDrawerCloseCommon('cat')}
        title={'Add New Category'}
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
              {'Save'}
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
    </>
  );
};

export default AddCategoryDealer;
