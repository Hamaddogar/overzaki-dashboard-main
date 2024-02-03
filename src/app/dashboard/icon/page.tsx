'use client';
import Button from '@mui/material/Button';
import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { RoleBasedGuard } from 'src/auth/guard';
import { BottomActions } from 'src/components/bottom-actions';
import Container from '@mui/material/Container';
import DetailsNavBar from 'src/sections/products/DetailsNavBar';
import { LoadingButton } from '@mui/lab';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  useAddNewIconMutation,
  useGetAllIconsQuery,
  useGetIconByIdQuery,
  useUpdateIconMutation,
} from 'src/redux/store/services/api';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import IconCard from 'src/sections/icons/view/IconCard';
import Iconify from 'src/components/iconify/iconify';
import { UploadBox } from 'src/components/upload';
import { types } from 'src/sections/icons/catigories/Icon-types';

const page = () => {
  const [selectedType, setSelectedType] = useState<any>(null);
  const [addIcon] = useAddNewIconMutation();
  const { data: allIcons } = useGetAllIconsQuery(selectedType);
  const [openDetails, setOpenDetails] = useState(false);
  const [iconData, seticonData] = useState<any>(null);
  const ProductSchema = Yup.object().shape({
    title: Yup.string().required(),
    type: Yup.string().required(),
    // url: Yup.string().required(),
  });
  const methods = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleTheme = (e: any) => {
    const { name, value } = e.target;
    seticonData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
    seticonData(null);
  };


  const [updateIcon, { isSuccess }] = useUpdateIconMutation();
  const onSubmit = handleSubmit(async (data) => {
    if (editId) {
      try {
        await updateIcon({ id: editId, ...data }).unwrap();
      } catch (error) {
        reset();
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('type', data.type);
        // formData.append('url', data.url);
        formData.append('image', iconData.image);
        await addIcon(formData).unwrap();
      } catch (error) {
        reset();
      }
    }
    setIconDrawer(false);
    seticonData(null);
  });
  const handleAddImage = (files: any) => {
    seticonData({
      ...iconData,
      image: files[0],
    });
  };
  const handleRemoveImage = () => {
    seticonData({
      ...iconData,
      image: null,
    });
  };

  const [iconDrawer, setIconDrawer] = useState(false);
  const [editId, setEditId] = useState(null);
  // const data = useGetIconByIdQuery(editId);
  // console.log(data?.data?.data);

  const toggleDrawerCommon = (id: any) => {
    setIconDrawer(true);
    if (id) {
      setEditId(id);
    }
  };
  const { data } = useGetIconByIdQuery(editId);
  useEffect(() => {
    if (data) {
      seticonData(data?.data);
    }
  }, [editId, data]);

  const handleDrawerClose = () => {
    setIconDrawer(false);
    seticonData(null);
  };

  return (
    <Container>
      <RoleBasedGuard permission="CREATE_PRODUCT">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Adjust as needed for layout
            mt: 2, // Margin top for spacing
            gap: 5,
            alignItems: 'center',
          }}
        >
          <Grid xs={12} md="auto">
            <CustomCrumbs heading="Icons" crums={false} />
          </Grid>
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
                onClick={() => setIconDrawer(true)}
              >
                Add New Icon
              </Button>
            </Stack>
          </BottomActions>
        </Box>
      </RoleBasedGuard>
      <Grid container spacing={2} sx={{ padding: '16px' }} gap={2}>
        <LoadingButton
          variant="soft"
          onClick={() => setSelectedType(null)}
          color={null === selectedType ? 'success' : 'inherit'}
        >
          All
        </LoadingButton>
        {types.map((type: string, index: any) => (
          <LoadingButton
            key={index}
            variant="soft"
            onClick={() => setSelectedType(type)}
            color={type === selectedType ? 'success' : 'inherit'}
          >
            {type.toUpperCase()}
          </LoadingButton>
        ))}
      </Grid>
      <DetailsNavBar
        open={iconDrawer}
        onClose={handleDrawerClose}
        title={'Add New theme'}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="soft"
              color="success"
              size="large"
              loading={isSubmitting}
              onClick={() => methods.handleSubmit(onSubmit as any)()}
              sx={{ borderRadius: '30px' }}
            >
              {editId ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        }
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box width="100%">
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              image
            </Typography>

            <Box mt="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Box>
                {iconData?.image ? (
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
                        typeof iconData?.image === 'string'
                          ? iconData?.image
                          : URL.createObjectURL(iconData?.image)
                      }
                      alt=""
                      sx={{ maxHeight: '95px' }}
                    />
                    <Box
                      onClick={() => handleRemoveImage()}
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
                        <span style={{ color: '#8688A3', fontSize: '.6rem' }}>Upload Image</span>
                      </Box>
                    }
                  />
                )}
              </Box>
            </Box>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              title
            </Typography>

            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleTheme}
              name="title"
              value={iconData?.title || ''}
            />
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              type
            </Typography>

            <RHFSelect
              fullWidth
              variant="filled"
              name="type"
              id="demo-simple-select2"
              value={iconData?.type || types[0]}
              settingStateValue={handleTheme}
            >
              {types.map((type: string, index: any) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </RHFSelect>
            {/* <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            URL
                        </Typography>

                        <RHFTextField
                            variant="filled"
                            fullWidth
                            settingStateValue={handleTheme}
                            name="url"
                            value={iconData?.url || ''}
                            type='url'
                        /> */}
          </Box>
        </FormProvider>
      </DetailsNavBar>
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        {allIcons?.data?.data?.map((el: any) => (
          <IconCard
            setIconData={seticonData}
            // setEditId={setEditId}
            toggleDrawerCommon={toggleDrawerCommon}
            key={el._id}
            id={el._id}
            image={el.image}
            title={el.title}
            type={el.type}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default page;
