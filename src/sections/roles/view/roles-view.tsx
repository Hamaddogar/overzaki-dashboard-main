/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState, useCallback, useEffect } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, {
  RHFMultiSelect,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Switch,
  MenuItem,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
// _mock
// import { _orders, allRoles } from 'src/_mock';
// utils
import { fTimestamp } from 'src/utils/format-time';
// components
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useTable, getComparator } from 'src/components/table';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { useSnackbar } from 'src/components/snackbar';
// types
import { IOrderItem, IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
//
import {
  createRole,
  deleteRole,
  editRole,
  fetchOneRole,
  fetchPermissionsByGroupList,
  fetchRolesList,
  setRole,
} from 'src/redux/store/thunks/roles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useBoolean } from 'src/hooks/use-boolean';
import { fetchProductsList } from 'src/redux/store/thunks/products';

import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
// import RolesToolbar from '../roles-toolbar';
// import RolesFiltersResult from '../roles-filters-result';
import DetailsNavBar from '../DetailsNavBar';

// .....
// ----------------------------------------------------------------------
const activeTab = {
  color: '#0F1349',
  background: 'rgb(209, 255, 240)',
  border: '2px solid #1AF9B3',
};
const nonActiveTab = {
  color: '#8688A3',
  background: 'rgb(245, 245, 248)',
};

const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  // { value: 'Active', label: 'Active' },
  // { value: 'Expired', label: 'Expired' },
];

const defaultFilters: IOrderTableFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};
const stylesActive = {
  cursor: { xs: 'default', md: 'pointer' },
  boxShadow: '0px 4px 20px #0F134914',
  borderRadius: '12px',
  border: '2px solid transparent',
  '&:hover': { borderColor: '#1BFCB6' },
  tranition: 'all .3s',
};
const stylesDisabled = {
  cursor: { xs: 'default', md: 'pointer' },
  background: '#F0F0F4',
  borderRadius: '12px',
  border: '2px solid transparent',
  tranition: 'all .3s',
};
// ----------------------------------------------------------------------

export default function RolesView() {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const productsState = useSelector((state: any) => state.products);
  const loadStatus = useSelector((state: any) => state.roles.status);
  const { list, error, role } = useSelector((state: any) => state.roles);
  const [editId, setEditId] = useState(null);
  const [removeData, setRemoveData] = useState<any>(null);
  const confirm = useBoolean();

  const [roleName, setRoleName] = useState<any>('');
  const [rolePermissions, setRolePermissions] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [discountTypeToggle, setDiscountTypeToggle] = useState('FIXED_AMOUNT');
  const { copy } = useCopyToClipboard();
  const onCopy = (color: string) => {
    if (color) {
      enqueueSnackbar(`Copied! ${color}`);
      copy(color);
    }
  };

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const [data, setData] = useState([]);

  // const [tableData] = useState(_orders);

  const [filters, setFilters] = useState(defaultFilters);
  const [roleStatus, setRoleStatus] = useState(true);

  const [defaultPermissionOption, setDefaultPermissionOption] = useState<any>([]);

  // ----------------------------------------------------------------------------------

  useEffect(() => {
    if (defaultPermissionOption.length === 0) {
      dispatch(fetchPermissionsByGroupList(error)).then((response: any) => {
        if (response?.meta?.requestStatus === 'fulfilled') {
          setDefaultPermissionOption(response.payload);
        } else {
          setDefaultPermissionOption([]);
        }
      });
    }
  }, [defaultPermissionOption, dispatch, error]);

  // ----------------------------------------------------------------------------------

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Field is required'),
  });

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editId) {
        await editRoleFun();
      } else {
        await createRoleFun();
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  useEffect(() => {
    dispatch(fetchRolesList(error)).then((response: any) => {
      setData(response.payload.data);
    });
  }, [loadStatus, dispatch, error, list]);

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  // Edit customer
  useEffect(() => {
    if (role) {
      if (role && Object.entries(role).length > 0) {
        console.log('Edit Role ');
        console.log(role);
        setRoleName(role?.name);
        setRolePermissions(role?.permissions);
        methods.setValue('name', role?.name);
      }
    } else {
      setRoleName(null);
      setRolePermissions([]);
      reset();
    }
  }, [role, methods, reset]);

  const createRoleFun = () => {
    const FormData = {
      name: roleName || '',
      permissions: rolePermissions,
    };
    dispatch(createRole(FormData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setRoleName(null);
        setRolePermissions([]);
        dispatch(fetchRolesList(error)).then((response: any) => {
          setData(response.payload.data);
        });
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  const editRoleFun = () => {
    const FormData = {
      name: roleName || '',
      permissions: rolePermissions,
    };
    dispatch(editRole({ roleId: editId, data: FormData })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchRolesList(error)).then((response: any) => {
          setData(response.payload.data);
        });
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  const removeRoleFun = () => {
    if (removeData) {
      dispatch(deleteRole(removeData)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchRolesList(error)).then((response: any) => {
            setData(response.payload.data);
          });
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };

  // ----------------------------------------------------------------------------------

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      dispatch(fetchRolesList(error)).then((response: any) => {
        setData(response.payload.data);
      });
    } else {
      const newData = list.filter((order: any) =>
        newValue === 'Active' ? order.status : !order.status
      );
      setData(newData);
    }
  };

  // new order
  const [openCreateRole, setOpenCreateRole] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleDrawerCommon =
    (state: string, id: any = null) =>
    (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'new') {
        setOpenCreateRole((pv) => !pv);
        setEditId(id);
        if (id) {
          dispatch(fetchOneRole(id));
        } else {
          // setRoleData({});
          dispatch(setRole({}));
        }
      } else if (state === 'delete') {
        setOpenDelete((pv) => !pv);
      } else if (state === 'details') setOpenDetails((pv) => !pv);
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

      if (state === 'new') setOpenCreateRole(false);
      else if (state === 'details') setOpenDetails(false);
      else if (state === 'delete') setOpenDelete(false);
    };
  const listStuff = data;
  const [listItems, setListItems] = useState<any>([]);
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

  // -----
  const { verifyPermission } = useAuthContext();
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
      await getPermission('edit', 'UPDATE_ROLE_BY_ID');
      await getPermission('remove', 'DELETE_ROLE_BY_ID');
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoleBasedGuard hasContent permission="GET_ROLES">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Roles" crums={false} />
          </Grid>

          <Grid item xs={12} md={3}>
            <RoleBasedGuard permission="CREATE_ROLE">
              <BottomActions>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  spacing="10px"
                  sx={{ width: '100%', maxWidth: { xs: '100%', sm: '200px' } }}
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
                    Create New Role{' '}
                  </Button>
                </Stack>
              </BottomActions>
            </RoleBasedGuard>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons={false}
                    sx={{
                      px: 2.5,
                      boxShadow: (theme) =>
                        `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    {STATUS_OPTIONS.map((tab) => (
                      <Tab
                        key={tab.value}
                        iconPosition="end"
                        value={tab.value}
                        label={tab.label}
                        icon={
                          <Label
                            variant={
                              ((tab.value === 'All' || tab.value === value) && 'filled') || 'soft'
                            }
                            color={
                              (tab.value === 'Active' && 'primary') ||
                              (tab.value === 'Ready' && 'secondary') ||
                              'default'
                            }
                          >
                            {tab.value === 'All' && data && data.length}
                            {tab.value === 'Expired' &&
                              data &&
                              data?.filter((order: any) => !order?.status).length}
                            {tab.value === 'Active' &&
                              data &&
                              data?.filter((order: any) => order?.status).length}
                          </Label>
                        }
                      />
                    ))}
                  </TabList>
                </Box>

                <TabPanel value={value} sx={{ px: 0, pb: 0 }}>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <Grid
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          container
                          spacing={2}
                        >
                          {data?.map((role: any, indx: any) => (
                            <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                              {(provided) => (
                                <Grid
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  key={indx}
                                  item
                                  xs={12}
                                >
                                  {/* <Paper elevation={4} > */}
                                  <Grid
                                    container
                                    item
                                    alignItems="center"
                                    justifyContent="space-between"
                                    rowGap={3}
                                    p={3}
                                    minHeight="80px"
                                    sx={stylesActive}
                                  >
                                    <Grid
                                      item
                                      sx={{ display: 'flex', alignItems: 'center' }}
                                      xs={6}
                                      md="auto"
                                    >
                                      <div {...provided.dragHandleProps}>
                                        <Iconify icon="ci:drag-vertical" />
                                      </div>
                                      <Box sx={{ minWidth: { xs: 'auto', md: '140px' } }}>
                                        <Typography
                                          component="p"
                                          color="#8688A3"
                                          variant="subtitle2"
                                          sx={{ fontSize: '.8rem' }}
                                        >
                                          {role?.name || ''}
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={6} md="auto">
                                      <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: '13px' }}
                                      >
                                        {allowAction.remove && (
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
                                            // onClick={toggleDrawerCommon("delete", role._id)}
                                            onClick={() => {
                                              setRemoveData(role._id);
                                              confirm.onTrue();
                                            }}
                                          >
                                            <Box
                                              component="img"
                                              src="/raw/trash-can-solid.svg"
                                              width="13px"
                                            />
                                          </Box>
                                        )}
                                        {allowAction.edit && (
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
                                            onClick={toggleDrawerCommon('new', role._id)}
                                          >
                                            <Box
                                              component="img"
                                              src="/raw/edit-pen.svg"
                                              width="13px"
                                            />
                                          </Box>
                                        )}
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  {/* </Paper> */}
                                </Grid>
                              )}
                            </Draggable>
                          ))}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                </TabPanel>
              </TabContext>

              {/* create new Vocher */}
              <DetailsNavBar
                open={openCreateRole}
                onClose={handleDrawerCloseCommon('new')}
                title={editId ? 'Edit Role' : 'Add New Role'}
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
                      {editId ? 'Update' : 'Save'}
                    </LoadingButton>
                  </Stack>
                }
              >
                <FormProvider methods={methods} onSubmit={onSubmit}>
                  <Divider flexItem />
                  {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                  <Box width="100%">
                    <Typography
                      pb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '.9rem' }}
                    >
                      Role Name (English)
                    </Typography>

                    <RHFTextField
                      fullWidth
                      variant="filled"
                      settingStateValue={(e: any) => setRoleName(e.target.value)}
                      value={roleName || ''}
                      name="name"
                    />

                    {defaultPermissionOption.map((permissionsObj: any, index: any) => (
                      <Stack
                        key={index}
                        mt="20px"
                        pb="5px"
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                      >
                        <Typography component="p" variant="subtitle1">
                          {permissionsObj?.subject}
                        </Typography>
                        <Divider />
                        {permissionsObj?.permissions?.map((permissionObj: any, ind: any) => (
                          <Stack
                            key={ind}
                            width="100%"
                            mt="20px"
                            pb="5px"
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Typography
                                component="p"
                                variant="subtitle2"
                                sx={{ opacity: 0.7, fontSize: '.9rem' }}
                              >
                                {permissionObj?.function}
                              </Typography>
                            </Box>
                            <RHFSwitch
                              label=""
                              checked={rolePermissions?.includes(permissionObj?.action) || false}
                              onChange={(e: any) => {
                                if (e.target.checked) {
                                  const rolePermissionsArray = [
                                    ...rolePermissions,
                                    permissionObj?.action,
                                  ];
                                  setRolePermissions(rolePermissionsArray);
                                } else {
                                  const rolePermissionsArray = rolePermissions.filter(
                                    (item: any) => item !== permissionObj?.action
                                  );
                                  setRolePermissions(rolePermissionsArray);
                                }
                              }}
                              name="status"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </Stack>
                        ))}
                      </Stack>
                    ))}
                  </Box>
                </FormProvider>
              </DetailsNavBar>

              <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                noCancel={false}
                maxWidth="sm"
                action={
                  <Button
                    fullWidth
                    color="error"
                    variant="soft"
                    size="large"
                    onClick={removeRoleFun}
                    sx={{ borderRadius: '30px' }}
                  >
                    Delete
                  </Button>
                }
                content={
                  <Grid container spacing="20px">
                    <Grid item xs={12} md={12}>
                      <Typography component="h5" variant="h5">
                        {' '}
                        Wana delete it ?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography component="p" variant="subtitle2">
                        {' '}
                        Delete this Role ?
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </RoleBasedGuard>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IOrderItem[];
  comparator: (a: any, b: any) => number;
  filters: IOrderTableFilters;
  dateError: boolean;
}) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          fTimestamp(order.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(order.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
