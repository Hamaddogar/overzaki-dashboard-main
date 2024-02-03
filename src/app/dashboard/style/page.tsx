'use client';
import Button from '@mui/material/Button';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, ClickAwayListener, Grid, MenuItem, Typography } from '@mui/material';
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
  useAddNewStyleMutation,
  useDeleteStyleMutation,
  useGetAllStylesQuery,
  useGetStyleByIdQuery,
  useUpdateStyleMutation,
} from 'src/redux/store/services/api';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useRouter } from 'next/navigation';
import { isValidJSON } from 'src/utils/functions';
import StyleCard from 'src/sections/style/view/styleCard';
import { types } from 'src/sections/style/catigouries/style-types';
import Iconify from 'src/components/iconify/iconify';
import { UploadBox } from 'src/components/upload';
import {
  createStyle,
  createStyleCategory,
  deleteStyleCategory,
  editStyle,
  editStyleCategory,
  fetchStyleCategoryList,
  fetchStyleList,
  getStyleCategoryById,
} from 'src/redux/store/thunks/style';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

const page = () => {
  const [editCategoryId, setEditCategoryId] = useState();
  const [optionModal, setOptionModal] = useState(false);
  const [allStylesData, setAllStylesData] = useState();
  const dispatch = useDispatch();
  const [styleCategoryData, setStyleCategoryData] = useState({ name: '' });
  const [selectedType, setSelectedType] = useState<any>('');
  const [stylesCategories, setStylesCategories] = useState<any>([]);
  const [styleCategoryDrawer, setStyleCategoryDrawer] = useState(false);
  const [addStyle] = useAddNewStyleMutation();
  const { data: allStyles } = useGetAllStylesQuery(selectedType);
  const [openDetails, setOpenDetails] = useState(false);
  const [styleData, setstyleData] = useState<any>(null);
  const ProductSchema = Yup.object().shape({
    title: Yup.string().required(),
    type: Yup.string().required(),
    json: Yup.string()
      .test('is-json', 'json must be a valid JSON string', (value) => isValidJSON(value))
      .required(),
  });
  const CategorySchema = Yup.object().shape({
    name: Yup.string().required(),
  });
  const methods = useForm({
    resolver: yupResolver(ProductSchema),
  });

  const categoryMethods = useForm({
    resolver: yupResolver(CategorySchema),
  });
  const [styleDrawer, setStyleDrawer] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleTheme = (e: any) => {
    const { name, value } = e.target;
    setstyleData({
      ...styleData,
      [name]: value,
    });
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setstyleData(null);
  };

  const toggleDrawerCommon = (id: any) => {
    setStyleDrawer(true);
    if (id) {
      setEditId(id);
    }
  };
  const { data } = useGetStyleByIdQuery(editId);
  useEffect(() => {
    if (data) {
      setstyleData(data?.data);
    }
  }, [editId, data]);
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const [updateStyle, { isSuccess }] = useUpdateStyleMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (editId) {
      try {
        let style = new FormData();
        style.append('title', data.title);
        style.append('type', data.type);
        style.append('json', data.json);
        await updateStyle({ id: editId, ...data }).unwrap();
      } catch (error) {
        reset();
      }
    } else {
      try {
        const newData = new FormData();
        newData.append('title', data.title);
        newData.append('category', data.category);
        newData.append('json', data.json);
        newData.append('image', styleData?.image);
        await dispatch(createStyle(newData)).then((response: any) => {
          if (response.meta.requestStatus === 'fulfilled') {
            // setStyleCategoryData({ name: '' });
            enqueueSnackbar('Successfully Created!', { variant: 'success' });
            // dispatch(fetchStyleCategoryList()).then((res) =>
            //   setStylesCategories(res?.payload?.data)
            // );
            handleDrawerClose();
          } else {
            enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
          }
        });
      } catch (error) {
        reset();
      }
    }
    setStyleDrawer(false);
    setstyleData(null);
  });

  const handleAddImage = (files: any) => {
    setstyleData({
      ...styleData,
      image: files[0],
    });
  };
  const handleRemoveImage = () => {
    setstyleData({
      ...styleData,
      image: null,
    });
  };

  // const data = useGetIconByIdQuery(editId);
  // console.log(data?.data?.data);

  const handleDrawerClose = () => {
    setStyleDrawer(false);
    setstyleData(null);
  };
  const handleCategoryData = (e: any) => {
    const { name, value } = e.target;
    setStyleCategoryData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCategoryDrawerClose = () => {
    setStyleCategoryDrawer(false);
  };
  const handleCreateCategory = (data: any) => {
    dispatch(createStyleCategory(data)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setStyleCategoryData({ name: '' });
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
        dispatch(fetchStyleCategoryList()).then((res) => setStylesCategories(res?.payload?.data));
        handleCategoryDrawerClose();
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  useEffect(() => {
    dispatch(fetchStyleCategoryList()).then((res) => setStylesCategories(res?.payload?.data));
  }, []);
  const handleCategoryDelete = (id: any) => {
    dispatch(deleteStyleCategory(id)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchStyleCategoryList()).then((response: any) =>
          setStylesCategories(response?.payload?.data)
        );
        enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleEdit = (id: any) => {
    setOptionModal(false);
    setStyleCategoryDrawer(true);
    setEditCategoryId(id);
    dispatch(getStyleCategoryById(id)).then((res) =>
      setStyleCategoryData({ name: res?.payload.name })
    );
  };
  const handleEditPost = () => {
    let style = new FormData();
    style.append('title', styleCategoryData.title);
    style.append('type', styleCategoryData.type);
    style.append('json', styleCategoryData.json);
    style.append('image', styleCategoryData.image);

    dispatch(editStyleCategory({ id: editCategoryId, data: style })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchStyleCategoryList()).then((response: any) =>
          setStylesCategories(response?.payload?.data)
        );
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  // Creating Icon
  const handleCreateStyle = () => {
    try {
      const formData = new FormData();

      // Append each field to FormData
      formData.append('category', styleData.category);
      formData.append('title', styleData.title);
      formData.append('json', styleData.json);

      // Append the image file
      formData.append('image', styleData.image);

      dispatch(createStyle(formData)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          enqueueSnackbar('Successfully Created!', { variant: 'success' });
          dispatch(fetchStyleList()).then((resp) => setAllStylesData(resp?.payload?.data));
          handleDrawerClose();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    } catch (error) {
      reset();
    }
  };
  const handleStyleEdit = () => {
    const dataToPush = {
      category: styleData?.category,
      // image: styleData?.image,
      title: styleData?.title,
      json: styleData?.json,
    };
    dispatch(editStyle({ id: editId, data: dataToPush })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
        dispatch(fetchStyleList()).then((resp) => setAllStylesData(resp?.payload?.data));
        handleDrawerClose();
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  useEffect(() => {
    dispatch(fetchStyleList()).then((resp) => setAllStylesData(resp?.payload?.data));
  }, []);

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
            <CustomCrumbs heading="Styles" crums={false} />
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                  onClick={() => setStyleDrawer(true)}
                >
                  Add New Style
                </Button>
              </Stack>
            </BottomActions>
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
                  onClick={() => setStyleCategoryDrawer(true)}
                >
                  Add New Category
                </Button>
              </Stack>
            </BottomActions>
          </Grid>
        </Box>
      </RoleBasedGuard>
      <Grid container spacing={2} sx={{ padding: '16px' }} gap={2}>
        <LoadingButton
          variant="soft"
          onClick={() => setSelectedType('')}
          color={null === selectedType ? 'success' : 'inherit'}
        >
          All
        </LoadingButton>

        {stylesCategories.map((type: string, index: any) => (
          <LoadingButton
            key={index}
            variant="soft"
            onClick={() => setSelectedType(type?.id)}
            color={type === selectedType ? 'success' : 'inherit'}
          >
            {type?.name?.toUpperCase()}
            <Stack sx={{ position: 'relative', zIndex: 999, backgroundColor: '' }}>
              <MoreVertOutlinedIcon onClick={() => setOptionModal(type?.id)} />
              {optionModal === type?.id && (
                <ClickAwayListener onClickAway={() => setOptionModal(null)}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 30,
                      backgroundColor: 'red',
                      borderRadius: '12px',
                      padding: '8px',
                    }}
                  >
                    <Typography
                      onClick={() => handleCategoryDelete(type?.id)}
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Delete
                    </Typography>
                    <Typography
                      component="p"
                      noWrap
                      onClick={() => handleEdit(type?.id)}
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
                </ClickAwayListener>
              )}
            </Stack>
          </LoadingButton>
        ))}
      </Grid>
      <DetailsNavBar
        open={styleDrawer}
        onClose={handleDrawerClose}
        title={'Add New style'}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="soft"
              color="success"
              size="large"
              // onClick={editProductId ? editProductFun : createProductFun}
              loading={isSubmitting}
              onClick={editId ? () => handleStyleEdit() : () => handleCreateStyle()}
              sx={{ borderRadius: '30px' }}
            >
              {editId ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        }
      >
        <FormProvider methods={methods} onSubmit={editId ? handleStyleEdit : handleCreateStyle}>
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
                {styleData?.image ? (
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
                        typeof styleData?.image === 'string'
                          ? styleData?.image
                          : URL.createObjectURL(styleData?.image)
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
              value={styleData?.title || ''}
            />
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Category
            </Typography>

            <RHFSelect
              fullWidth
              variant="filled"
              name="category"
              id="demo-simple-select2"
              value={styleData?.category || types[0]}
              settingStateValue={handleTheme}
            >
              {stylesCategories?.map((type: string, index: any) => (
                <MenuItem key={index} value={type?.id}>
                  {type?.name}
                </MenuItem>
              ))}
            </RHFSelect>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Json
            </Typography>

            <RHFTextField
              variant="filled"
              multiline
              fullWidth
              rows={5}
              sx={{ fontWeight: 900, fontSize: '26px' }}
              settingStateValue={handleTheme}
              name="json"
              value={styleData?.json || ''}
            />
          </Box>
        </FormProvider>
      </DetailsNavBar>
      <DetailsNavBar
        open={styleCategoryDrawer}
        onClose={handleCategoryDrawerClose}
        title={'Add Icon Category'}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="soft"
              color="success"
              size="large"
              loading={isSubmitting}
              onClick={
                editCategoryId
                  ? () => handleEditPost()
                  : () => handleCreateCategory(styleCategoryData)
              }
              sx={{ borderRadius: '30px' }}
            >
              {editCategoryId ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        }
      >
        <FormProvider methods={categoryMethods}>
          <Box width="100%">
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Name
            </Typography>

            <RHFTextField
              fullWidth
              variant="filled"
              settingStateValue={handleCategoryData}
              name="name"
              value={styleCategoryData?.name || ''}
            />
          </Box>
        </FormProvider>
      </DetailsNavBar>
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        {allStylesData
          ?.filter((item) => item.category['_id'].includes(selectedType))
          ?.map((el: any) => (
            <StyleCard
              toggleDrawerCommon={toggleDrawerCommon}
              id={el._id}
              title={el.title}
              key={el._id}
              type={el?.category?.name}
              image={el.image}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default page;
