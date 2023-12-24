/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useEffect, useState } from 'react';
// @mui
import Switch from '@mui/material/Switch/Switch';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card/Card';
import { Box, Grid, Stack, Chip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
// components
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
//
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify/iconify';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'react-redux';
import {
  createStaffManagement,
  deleteStaffManagement,
  editStaffManagement,
  fetchOneStaffManagement,
  fetchStaffManagementsList,
  fetchStaffManagementsWithParams,
} from 'src/redux/store/thunks/staffManagement';
import { AppDispatch } from 'src/redux/store/store';
import { enqueueSnackbar } from 'notistack';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useAuthContext } from 'src/auth/hooks';
import NavigatorBar from 'src/components/NavigatorBar';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function StaffManagment() {
  const { user } = useAuthContext();
  const [authUser, setAuthUser] = useState<any>();
  const [staffLength, setStaffLength] = useState<number>(0);
  useEffect(() => {
    if (user) {
      setAuthUser(user);
    }
  }, [user]);
  console.log(authUser);

  const settings = useSettingsContext();
  const dispatch = useDispatch<any>();
  // const [data] = useState(users);
  const [usersData, setUsersData] = useState([]);
  const [editId, setEditId] = useState('');
  const [newUsersData, setNewUsersData] = useState<any>();
  // new order
  const [openCreateStaff, setOpenCreateStaff] = useState(false);
  const [openDelStaff, setOpenDelStaff] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [toDelId, setToDelId] = useState('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 5;
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
      (event: React.SyntheticEvent | React.MouseEvent) => {
        if (state === 'new') {
          setOpenCreateStaff((pv) => !pv);
          setEditId(id);
          if (id) {
            dispatch(fetchOneStaffManagement(id)).then((response: any) => {
              const { user, adminName } = response.payload;
              const { gender, email, location, phoneNumber, preferedLanguage, roles } = user;
              delete adminName.localized;
              const userObj = {
                adminName,
                gender,
                email,
                location,
                phoneNumber,
                preferedLanguage,
                roles,
              };
              setUserData(userObj);
            });
          }
        } else if (state === 'delstaff') setOpenDelStaff((pv) => !pv);
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

      if (state === 'new') {
        setOpenCreateStaff(false);
        setEditId('');
        setUserData({});
      } else if (state === 'delstaff') setOpenDelStaff(false);
    };
  // Yup
  const StaffAdminSchema = Yup.object().shape({
    engName: Yup.string().required('First name is required'),
    arabicName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().required(),
    password: Yup.string().required('Password is required'),
  });
  const methods = useForm({
    resolver: yupResolver(StaffAdminSchema),
  });
  const { handleSubmit } = methods;

  const createAdmin = () => {
    const toPushData = {
      ...userData,
      roles: ['ACCOUNTENT_ADMIN'],
      country: 'SY',
      gender: 'MALE',
      location: ['banias, tartus, syria'],
      preferedLanguage: ['en'],
    };

    if (toPushData) {
      dispatch(createStaffManagement(toPushData)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          enqueueSnackbar('Successfully Created!', { variant: 'success' });
          dispatch(fetchStaffManagementsWithParams({ pageNumber, pageSize })).then(
            (itemData: any) => setNewUsersData(itemData.payload)
          );
          setUserData({});
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };
  const editAdmin = () => {
    const { roles, gender, country, email, phoneNumber, preferedLanguage, location } = userData;
    const { adminName } = userData;
    delete adminName.localized;

    const dataToPush = {
      roles,
      gender,
      country,
      email,
      phoneNumber,
      preferedLanguage,
      location,
      adminName,
    };

    dispatch(editStaffManagement({ staffManagementId: editId, data: dataToPush })).then(
      (response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchStaffManagementsWithParams({ pageNumber, pageSize })).then(
            (response: any) => setNewUsersData(response.payload)
          );
          enqueueSnackbar('Successfully Updated!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      }
    );
  };
  const onSubmit = handleSubmit((data: any) => {
    createAdmin();
  });
  // For Count
  useEffect(() => {
    dispatch(fetchStaffManagementsList()).then((response: any) => {
      setStaffLength(response.payload.length);
    });
  }, [dispatch, newUsersData]);
  // For Actual Fetching

  useEffect(() => {
    dispatch(fetchStaffManagementsWithParams({ pageNumber, pageSize })).then((response: any) => {
      setNewUsersData(response.payload);
    });
  }, [dispatch, pageNumber]);

  const formatDate = (createdAt: any) => {
    const dateObject = new Date(createdAt);
    const opts: any = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', opts);
  };
  const handleDelete = (idToDelete: string) => {
    if (idToDelete) {
      dispatch(deleteStaffManagement(idToDelete)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchStaffManagementsList()).then((response: any) =>
            setNewUsersData(response?.payload)
          );
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          setOpenDelStaff(false);
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };
  // Handling Edit
  const handleFormChange = (e: any, toChange: any) => {
    const { name, value } = e.target;
    if (toChange === 'ar') {
      setUserData((prev: any) => ({
        ...prev,
        adminName: {
          ...prev.adminName,
          [toChange]: e.target.value,
        },
      }));
    } else if (toChange === 'en') {
      setUserData((prev: any) => ({
        ...prev,
        adminName: {
          ...prev.adminName,
          [toChange]: e.target.value,
        },
      }));
    } else if (toChange === 'phoneNumber') {
      setUserData((prev: any) => ({
        ...prev,
        [toChange]: e.target.value,
      }));
    } else if (toChange === 'email') {
      setUserData((prev: any) => ({
        ...prev,
        [toChange]: e.target.value,
      }));
    } else if (toChange === 'password') {
      setUserData((prev: any) => ({
        ...prev,
        [toChange]: e.target.value,
      }));
    }
  };
  const [query, setQuery] = useState('');
  // Drag and Drop
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(newUsersData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNewUsersData(items);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid
        container
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        pb={{ xs: 8, sm: 0 }}
      >
        <Grid item xs={12} md="auto">
          <CustomCrumbs
            heading="Staff Management"
            description={`${staffLength
              ? staffLength === 1
                ? `${staffLength} Staff Member`
                : `${staffLength} Staff Members`
              : `${0} Staff Members`
              }`}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <BottomActions>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
              spacing={{ xs: '10px', sm: '20px' }}
              sx={{ width: '100%', maxWidth: { xs: '100%', sm: '150px' } }}
            >
              <Button
                startIcon="+"
                fullWidth
                sx={{ borderRadius: '30px', color: '#0F1349' }}
                component="h5"
                variant="contained"
                color="primary"
                onClick={toggleDrawerCommon('new')}
              >
                {' '}
                Add New Admin{' '}
              </Button>
            </Stack>
          </BottomActions>
        </Grid>

        <Grid item xs={12}>
          <Stack
            spacing={2}
            alignItems={{ xs: 'flex-end', md: 'center' }}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            sx={{
              p: 2.5,
              pr: { xs: 2.5, md: 1 },
              pl: { xs: 2.5, md: 1 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
              <TextField
                placeholder="Search by name or phone number..."
                fullWidth
                variant="filled"
                onChange={(e: any) => setQuery(e.target.value)}
                // value={filters.name}
                // onChange={handleFilterName}
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

              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgb(15, 19, 73,.04)',
                  borderRadius: '16px',
                  padding: '15px 15px',
                }}
              >
                <Box component="img" src="/raw/sort.svg" />
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgb(15, 19, 73,.04)',
                  borderRadius: '16px',
                  padding: '15px 15px',
                }}
              >
                <Box component="img" src="/raw/filter.svg" />
              </Button>
            </Stack>
          </Stack>
        </Grid>
        {/* Business Owner Card */}
        {authUser && (
          <Card
            sx={{
              border: '2px solid transparent ',
              '&:hover': { borderColor: '#1BFCB6' },
              padding: '20px',
              width: '100%',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '16px',
              marginTop: '16px',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing="20px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div>
                  <Typography component="p" variant="h6" sx={{ fontWeight: 900 }}>
                    {authUser && `${authUser.firstName} ${authUser.lastName}`}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    {' '}
                    {authUser && authUser.email}{' '}
                  </Typography>
                </div>
              </Box>

              <Stack
                alignItems="center"
                direction="row"
                spacing={{ xs: '10px', sm: '20px' }}
                justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
              >
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  Joined on {formatDate(authUser && authUser.createdAt)}
                </Typography>

                <Chip
                  label={authUser && authUser.roles.includes('BUSINESS_OWNER') ? 'Owner' : ''}
                  size="small"
                  sx={{
                    backgroundColor:
                      authUser && authUser.roles.includes('BUSINESS_OWNER') ? '#76FDD3' : '#F1D169',
                    color: '#0F1349',
                    borderRadius: '16px',
                  }}
                />

                {/* {order.role !== 'Owner' && (
                  <Iconify
                      style={{ cursor: 'pointer' }}
                      icon="bx:edit"
                      width={24}
                      onClick={toggleDrawerCommon('details')}
                    />
                  )}  */}
              </Stack>
            </Stack>
          </Card>
        )}
        {/* Cards of acc admins */}
        <Box sx={{ minHeight: '43vh', width: '100%' }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <Grid {...provided.droppableProps} ref={provided.innerRef} item xs={12}>
                  {newUsersData &&
                    newUsersData
                      .filter(
                        (item: any) =>
                          item.adminName.en
                            .toLocaleLowerCase()
                            .includes(query.toLocaleLowerCase()) ||
                          item.adminName.ar.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                      )
                      .map((user: any, indx: number) => (
                        <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                          {(provided) => (
                            <Card
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              key={indx}
                              sx={{
                                border: '2px solid transparent ',
                                '&:hover': { borderColor: '#1BFCB6' },
                                padding: '20px',
                                boxShadow: '0px 4px 20px #0F134914',
                                borderRadius: '16px',
                                marginTop: '16px',
                              }}
                            >
                              <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing="20px"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div {...provided.dragHandleProps}>
                                    <Iconify icon="ci:drag-vertical" />
                                  </div>
                                  <div>
                                    <Typography component="p" variant="h6" sx={{ fontWeight: 900 }}>
                                      {user?.adminName?.en}
                                    </Typography>
                                    <Typography
                                      component="p"
                                      variant="subtitle2"
                                      sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                    >
                                      {' '}
                                      {user?.user?.email}{' '}
                                    </Typography>
                                  </div>
                                </Box>

                                <Stack
                                  alignItems="center"
                                  direction="row"
                                  spacing={{ xs: '10px', sm: '20px' }}
                                  justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
                                >
                                  <Typography
                                    component="p"
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                  >
                                    Joined on {formatDate(user?.createdAt)}
                                  </Typography>

                                  <Chip
                                    label={
                                      user?.user?.roles?.includes('ACCOUNTENT_ADMIN')
                                        ? 'Admin'
                                        : 'Owner'
                                    }
                                    size="small"
                                    sx={{
                                      backgroundColor: user?.user?.roles.includes(
                                        'ACCOUNTENT_ADMIN'
                                      )
                                        ? '#F1D169'
                                        : '#76FDD3',
                                      color: '#0F1349',
                                      borderRadius: '16px',
                                    }}
                                  />
                                  <Iconify
                                    onClick={() => [
                                      setOpenDelStaff((prev) => !prev),
                                      setToDelId(user?.user?._id),
                                    ]}
                                    style={{ cursor: 'pointer' }}
                                    icon="carbon:delete"
                                    width={24}
                                  />
                                  <Box
                                    sx={{
                                      width: '36px',
                                      height: '36px',
                                      borderRadius: '20px',
                                      background: 'rgb(134, 136, 163,0.09)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      '&:hover': {
                                        background: 'rgb(134, 136, 163,0.2)',
                                      },
                                    }}
                                    onClick={toggleDrawerCommon('new', user?.user?._id)}
                                  >
                                    <Box component="img" src="/raw/edit-pen.svg" width="13px" />
                                  </Box>
                                  {/* {order.role !== 'Owner' && (
                  <Iconify
                      style={{ cursor: 'pointer' }}
                      icon="bx:edit"
                      width={24}
                      onClick={toggleDrawerCommon('details')}
                    />
                  )}  */}
                                </Stack>
                              </Stack>
                              <ConfirmDialog
                                open={openDelStaff}
                                onClose={handleDrawerCloseCommon('delstaff')}
                                noCancel={false}
                                action={
                                  <Button
                                    fullWidth
                                    variant="soft"
                                    color="error"
                                    onClick={() => handleDelete(toDelId)}
                                  >
                                    Delete
                                  </Button>
                                }
                                content={
                                  <Grid container spacing="15px">
                                    <Grid item xs={12} md={12}>
                                      <CustomCrumbs heading="Remove Member" crums={false} />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Typography variant="body2">
                                        Do you want to delete this Member?
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                }
                              />
                            </Card>
                          )}
                        </Draggable>
                      ))}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <Box
          sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {Math.ceil(staffLength / pageSize) !== 1 && (
            <NavigatorBar
              pageSize={pageSize}
              setPageNumber={setPageNumber}
              itemsLength={staffLength}
            />
          )}
        </Box>
      </Grid>

      {/* New Admin */}
      <DetailsNavBar
        open={openCreateStaff}
        onClose={handleDrawerCloseCommon('new')}
        title={editId ? 'Edit Admin' : 'Add New Admin'}
        actions={
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={editId ? () => editAdmin() : () => methods.handleSubmit(onSubmit as any)()}
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349',
            }}
          >
            {editId ? 'Update' : 'Create New Admin'}
          </Button>
        }
      >
        <FormProvider onSubmit={onSubmit} methods={methods}>
          <Divider flexItem />
          <Box width="100%" display="flex" flexDirection="column" gap="25px">
            <Typography variant="body1" color="#8688A3" sx={{ my: '5px', fontWeight: 900 }}>
              Admin Personal Info
            </Typography>

            <Box>
              <Typography
                component="p"
                variant="caption"
                color="#8688A3"
                sx={{ ml: '5px', mb: '5px' }}
              >
                Full Name (English)
              </Typography>
              <RHFTextField
                settingStateValue={(e: any) => handleFormChange(e, 'en')}
                fullWidth
                value={userData ? userData.adminName?.en : ''}
                name="engName"
                variant="filled"
              />
            </Box>
            <Box>
              <Typography
                component="p"
                variant="caption"
                color="#8688A3"
                sx={{ ml: '5px', mb: '5px' }}
              >
                Full Name (Arabic)
              </Typography>
              <RHFTextField
                settingStateValue={(e: any) => handleFormChange(e, 'ar')}
                fullWidth
                value={userData ? userData.adminName?.ar : ''}
                name="arabicName"
                variant="filled"
              />
            </Box>
            {/* <Box>
              <Typography
                component="p"
                variant="caption"
                color="#8688A3"
                sx={{ ml: '5px', mb: '5px' }}
              >
                Admin Name (Arabic)
              </Typography>
              <TextField fullWidth variant="filled" defaultValue="علي عمر" />
            </Box> */}

            <Box>
              <Typography
                component="p"
                variant="caption"
                color="#8688A3"
                sx={{ ml: '5px', mb: '5px' }}
              >
                Email Address
              </Typography>
              <RHFTextField
                settingStateValue={(e: any) => handleFormChange(e, 'email')}
                value={userData ? userData?.email : ''}
                fullWidth
                name="email"
                variant="filled"
              />
            </Box>

            <Box>
              <Typography
                component="p"
                variant="caption"
                color="#8688A3"
                sx={{ ml: '5px', mb: '5px' }}
              >
                Mobile Number
              </Typography>
              <RHFTextField
                settingStateValue={(e: any) => handleFormChange(e, 'phoneNumber')}
                fullWidth
                variant="filled"
                name="phoneNumber"
                value={userData ? userData.phoneNumber : ''}
                sx={{
                  '& .MuiInputAdornment-root': {
                    marginTop: '0px !important',
                    // paddingLeft: '10px'
                  },
                  '& input': {
                    paddingLeft: '2px !important',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component="img"
                        src="/raw/flagN.png"
                        sx={{ borderRadius: '20px', width: '24px', height: '20px' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {!editId && (
              <Box>
                <Typography
                  component="p"
                  variant="caption"
                  color="#8688A3"
                  sx={{ ml: '5px', mb: '5px' }}
                >
                  Password
                </Typography>
                <RHFTextField
                  settingStateValue={(e: any) => handleFormChange(e, 'password')}
                  fullWidth
                  value={userData.password || ''}
                  name="password"
                  variant="filled"
                />
              </Box>
            )}

            <Typography variant="body1" color="#8688A3" sx={{ my: '5px', fontWeight: 900 }}>
              Admin Powers
            </Typography>
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="button">Edit Theme & Layout</Typography>
                <Switch />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="button">Add/Edit Categories</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="button">Add/Edit Products</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="button">Manage Orders</Typography>
                <Switch />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="button">Get Notifications</Typography>
                <Switch defaultChecked />
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </DetailsNavBar>
    </Container>
  );
}
