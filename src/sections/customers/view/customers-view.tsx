/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
// import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  Box,
  Grid,
  Stack,
  Chip,
  Typography,
  Paper,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
// _mock
import { _orders } from 'src/_mock';
// utils
import { fTimestamp } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';
// components
// import NavigatorBar from 'src/components/NavigatorBar';
import { UploadAvatar } from 'src/components/upload';
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useTable, getComparator } from 'src/components/table';
// types
import { IOrderItem, IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
//
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';

import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import CustomersTableToolbar from '../customers-toolbar';
import CustomersTableFiltersResult from '../customers-filters-result';
import DetailsNavBar from '../DetailsNavBar';
import CountrySelect from './CountryField';
import NavigatorBar from '../../../components/NavigatorBar';
import {
  createCustomer,
  deleteCustomer,
  editCustomer,
  fetchCustomersList,
  fetchOneCustomer,
  setCustomers,
} from '../../../redux/store/thunks/customers';


// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'New', label: 'New' },
  { value: 'Loyal', label: 'Loyal' },
  { value: 'Not Active', label: 'Not Active' },
  { value: 'Super', label: 'Super' },
];

const defaultFilters: IOrderTableFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function OrdersListView() {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = 5;
  const { enqueueSnackbar } = useSnackbar();
  const loadStatus = useSelector((state: any) => state.customers.status);
  const { list, error, customer } = useSelector((state: any) => state.customers);
  const [pageNumber, setPageNumber] = useState(1);

  const [editId, setEditId] = useState(null);
  const [removeData, setRemoveData] = useState<any>(null);
  const confirm = useBoolean();

  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const [data, setData] = useState(list);

  const [tableData] = useState(_orders);

  const [filters, setFilters] = useState(defaultFilters);

  const [customerData, setCustomerData] = useState<any>(null);

  const [errorMsg, setErrorMsg] = useState('');
  // Pagination
  const [customersLength, setCustomersLength] = useState<number>();

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string().required('Field is required'),
    lastName: Yup.string().required('Field is required'),
    phoneNumber: Yup.string().required('Field is required'),
    email: Yup.string().required('Field is required').email('Email must be a valid email address'),
    location: Yup.string().required('Field is required'),
    gender: Yup.string().required('gender is required'),
    country: Yup.mixed<any>().nullable().required('Country is required'),
    password: !editId
      ? Yup.string().min(8, 'Code must be at least 8 characters').required('Password is required')
      : Yup.string().nullable(),
    preferedLanguage: Yup.string().required('Field is required'),
  });

  const methods = useForm({
    resolver: yupResolver(CustomerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editId) {
        await editCustomerFun();
      } else {
        await createCustomerFun();
      }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchCustomersList({ pageNumber, pageSize })).then((response: any) => {
        setData(response.payload.data);
        setCustomersLength(response.payload.count);
        // setData(list)
      });
    }
  }, [loadStatus, dispatch, error, list, pageNumber]);
  useEffect(() => {
    dispatch(fetchCustomersList({ pageNumber, pageSize })).then((response: any) => {
      setCustomersLength(response.payload.count);
      setData(response.payload.data);
    });
  }, [dispatch, pageNumber]);

  useEffect(() => {
    setData(list || []);
    dispatch(setCustomers(list || []));
  }, [dispatch, list]);

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  // Edit customer
  useEffect(() => {
    if (customer) {
      if (customer) {
        const updatedData = {
          avatar: customer.avatar,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          gender: customer.gender,
          country: customer.country,
          location: customer.location && customer.location.length > 0 ? customer.location[0] : null,
          preferedLanguage:
            customer.preferedLanguage && customer.preferedLanguage.length > 0
              ? customer.preferedLanguage[0]
              : null,
        };

        setCustomerData(updatedData);

        // Use setValue to update each field separately
        Object.entries(updatedData).forEach(([fieldName, value]: any) => {
          methods.setValue(fieldName, value);
        });
      }
    } else {
      setCustomerData(null);
      reset();
    }
  }, [customer, methods, reset]);

  const password = useBoolean();

  // ----------------------------------------------------------------------------------------------------

  const handleCustomerData = (e: any) => {
    setCustomerData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDropAvatar = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setCustomerData({ ...customerData, avatar: newFile });
      }
    },
    [customerData]
  );

  const createCustomerFun = () => {
    if (customerData) {
      const FormValues: any = new FormData();
      Object?.keys(customerData).forEach((key) => {
        if (key === 'avatar' && typeof customerData.avatar !== 'string') {
          FormValues.append('avatar', customerData.avatar);
        } else if (key === 'location' || key === 'preferedLanguage') {
          FormValues.append(`${key}[0]`, customerData[key]);
        } else if (key !== 'location' && key !== 'avatar' && key !== 'preferedLanguage') {
          FormValues.append(key, customerData[key]);
        }
      });
      FormValues.append('deviceToken', 'only for android and ios app.');

      dispatch(createCustomer(FormValues)).then((response: any) => {
        console.log(response);

        if (response.meta.requestStatus === 'fulfilled') {
          setCustomerData(null);
          dispatch(fetchCustomersList({ pageNumber, pageSize })).then((response: any) =>
            setCustomersLength(response.payload.count)
          );
          enqueueSnackbar('Successfully Created!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };

  const editCustomerFun = () => {
    const FormValues: any = new FormData();
    Object?.keys(customerData).forEach((key) => {
      if (
        key === 'avatar' &&
        (typeof customerData[key] !== 'string' || !customerData[key].startsWith('https://'))
      ) {
        FormValues.append('avatar', customerData.avatar);
      } else if (key === 'location' || key === 'preferedLanguage') {
        FormValues.append(`${key}[0]`, customerData[key]);
      } else if (key !== 'location' && key !== 'avatar' && key !== 'preferedLanguage') {
        FormValues.append(key, customerData[key]);
      }
    });
    dispatch(editCustomer({ customerId: editId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCustomersList({ pageNumber, pageSize }));
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  const removeCustomerFun = () => {
    if (removeData && removeData.type === 'customer') {
      dispatch(deleteCustomer(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchCustomersList({ pageNumber, pageSize })).then((response: any) =>
            setCustomersLength(response.payload.count)
          );
          enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
          confirm.onFalse();
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
        }
      });
    }
  };

  // ----------------------------------------------------------------------------------------------------

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const canReset =
    !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  const handleFilters = useCallback(
    (name: string, value: IOrderTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'All') {
      setData(list);
    } else {
      const newData = list.filter((item: any) => item?.type === newValue);
      setData(newData);
    }
  };

  // new order
  const [openDetails, setOpenDetails] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  const toggleDrawerCommon =
    (state: string, id: any = null) =>
      (event: React.SyntheticEvent | React.MouseEvent) => {
        if (state === 'createOrEdit') {
          setOpenCreateCustomer((pv) => !pv);
          setEditId(id);
          if (id) {
            dispatch(fetchOneCustomer(id));
          } else {
            setCustomerData({});
            dispatch(setCustomers(null));
          }
        } else if (state === 'details') setOpenDetails((pv) => !pv);
        else if (state === 'analytics') setOpenAnalytics((pv) => !pv);
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

      if (state === 'createOrEdit') setOpenCreateCustomer(false);
      else if (state === 'details') setOpenDetails(false);
      else if (state === 'analytics') setOpenAnalytics(false);
    };
  const [query, setQuery] = useState('');
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
  const queriedResults = listItems?.filter(
    (item: any) =>
      item?.phoneNumber?.includes(query) ||
      item?._id.toLowerCase().includes(query.toLocaleLowerCase()) ||
      `${item?.firstName.toLocaleLowerCase()} ${item?.lastName.toLocaleLowerCase()}`.includes(
        query.toLocaleLowerCase()
      )
  );

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
      await getPermission('edit', 'UPDATE_CUSTOMER_BY_ID');
      await getPermission('remove', 'DELETE_CUSTOMER_BY_ID');
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoleBasedGuard hasContent permission="GET_CUSTOMERS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          pb={{ xs: 8, sm: 0 }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Customers" crums={false} />
          </Grid>
          <RoleBasedGuard permission="CREATE_CUSTOMER">
            <Grid item xs={12} md={5}>
              <BottomActions>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  spacing={{ xs: '10px', sm: '20px' }}
                  sx={{ width: '100%' }}
                >
                  <Button
                    startIcon={<Box component="img" src="/raw/orderreport.svg" />}
                    fullWidth
                    sx={{ borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }}
                    component="h5"
                    variant="contained"
                    onClick={toggleDrawerCommon('analytics')}
                  >
                    {' '}
                    Analytics{' '}
                  </Button>
                  <Button
                    startIcon="+"
                    fullWidth
                    sx={{ borderRadius: '30px', color: '#0F1349' }}
                    component="h5"
                    variant="contained"
                    color="primary"
                    onClick={toggleDrawerCommon('createOrEdit')}
                  >
                    {' '}
                    Add Customer{' '}
                  </Button>
                </Stack>
              </BottomActions>
            </Grid>
          </RoleBasedGuard>

          <Grid item xs={12}>
            <Box mt="20px">
              <CustomersTableToolbar
                query={query}
                setQuery={setQuery}
                filters={filters}
                onFilters={handleFilters}
                canReset={canReset}
                onResetFilters={handleResetFilters}
              />

              {query && (
                <CustomersTableFiltersResult
                  filters={filters}
                  onFilters={handleFilters}
                  setQuery={setQuery}
                  onResetFilters={handleResetFilters}
                  results={queriedResults.length}
                  sx={{ p: 2.5, pt: 0 }}
                />
              )}
            </Box>
          </Grid>

          <Grid sx={{ width: '100%' }} item xs={12}>
            <Box sx={{ width: '100%' }}>
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
                    {STATUS_OPTIONS.map((tab, i) => (
                      <Tab
                        key={i}
                        iconPosition="end"
                        value={tab.value}
                        label={tab.label}
                        icon={
                          <Label
                            variant={
                              ((tab.value === 'All' || tab.value === value) && 'filled') || 'soft'
                            }
                            color={
                              (tab.value === 'New' && 'info') ||
                              (tab.value === 'Loyal' && 'secondary') ||
                              (tab.value === 'Not Active' && 'error') ||
                              (tab.value === 'Super' && 'warning') ||
                              'default'
                            }
                          >
                            {tab.value === 'All' && customersLength}
                            {tab.value === 'New' &&
                              list?.length > 0 &&
                              list.filter((item: any) => item.type === 'New').length}
                            {tab.value === 'Loyal' &&
                              list?.length > 0 &&
                              list.filter((item: any) => item.type === 'Loyal').length}
                            {tab.value === 'Not Active' &&
                              list?.length > 0 &&
                              list.filter((item: any) => item.type === 'Not Active').length}
                            {tab.value === 'Super' &&
                              list?.length > 0 &&
                              list.filter((item: any) => item.type === 'Super').length}
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
                          {listItems
                            ?.filter(
                              (item: any) =>
                                item.phoneNumber.includes(query) ||
                                item._id.toLowerCase().includes(query.toLocaleLowerCase()) ||
                                `${item.firstName.toLocaleLowerCase()} ${item.lastName.toLocaleLowerCase()}`.includes(
                                  query.toLocaleLowerCase()
                                )
                            )
                            .map((itemObj: any, indx: any) => (
                              <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                                {(provided: any) => (
                                  <Grid
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                    key={indx}
                                    item
                                    xs={12}
                                  >
                                    <Paper
                                      elevation={4}
                                      sx={{
                                        cursor: 'pointer',
                                        border: '2px solid #FFFFFF',
                                        '&:hover': { borderColor: '#1BFCB6' },
                                      }}
                                    >
                                      <Grid
                                        container
                                        item
                                        alignItems="center"
                                        justifyContent="space-between"
                                        rowGap={3}
                                        sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '80px' }}
                                      >
                                        <Grid item xs={6} md="auto">
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
                                              src={itemObj?.avatar}
                                              alt=" "
                                              width="22px"
                                            />
                                            <Box display="flex" gap="0px" flexDirection="column">
                                              <Typography
                                                component="p"
                                                variant="subtitle2"
                                                sx={{ fontSize: '.9rem', fontWeight: 900 }}
                                              >
                                                {' '}
                                                {itemObj.firstName}{' '}
                                              </Typography>
                                              <Typography
                                                component="p"
                                                variant="subtitle2"
                                                sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                              >
                                                {' '}
                                                {itemObj.phoneNumber}{' '}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Grid>

                                        <Grid item xs={6} md="auto">
                                          <Typography
                                            component="p"
                                            variant="subtitle2"
                                            sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                          >
                                            Orders
                                          </Typography>
                                          <Typography
                                            component="p"
                                            variant="subtitle2"
                                            sx={{ fontSize: '.9rem', fontWeight: 900 }}
                                          >
                                            {itemObj.countOrders} Orders
                                          </Typography>
                                        </Grid>

                                        <Grid item xs={6} md="auto">
                                          <Typography
                                            component="p"
                                            noWrap
                                            variant="subtitle2"
                                            sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                          >
                                            {' '}
                                            Total{' '}
                                          </Typography>
                                          <Typography
                                            component="p"
                                            variant="subtitle2"
                                            sx={{ fontSize: '.9rem', fontWeight: 900 }}
                                          >
                                            {' '}
                                            {itemObj.totalCostOrder} KWD{' '}
                                          </Typography>
                                        </Grid>

                                        <Grid item xs={6} md="auto">
                                          <Chip
                                            label={itemObj.type}
                                            size="small"
                                            color={
                                              (itemObj.type === 'New' && 'info') ||
                                              (itemObj.type === 'Loyal' && 'secondary') ||
                                              (itemObj.type === 'Not Active' && 'error') ||
                                              (itemObj.type === 'Super' && 'warning') ||
                                              'default'
                                            }
                                          />
                                        </Grid>

                                        <Grid item xs="auto" textAlign="right">
                                          {allowAction.remove && (
                                            <Iconify
                                              icon="carbon:delete"
                                              sx={{ height: '60px' }}
                                              onClick={() => {
                                                setRemoveData({
                                                  type: 'customer',
                                                  id: itemObj._id,
                                                });
                                                confirm.onTrue();
                                              }}
                                            />
                                          )}{' '}
                                          &nbsp; &nbsp; &nbsp;
                                          {allowAction.remove && (
                                            <Iconify
                                              icon="bx:edit"
                                              sx={{ height: '60px' }}
                                              onClick={toggleDrawerCommon(
                                                'createOrEdit',
                                                itemObj._id
                                              )}
                                            />
                                          )}
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
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {customersLength && Math.ceil(customersLength / pageSize) !== 1 && (
                    <NavigatorBar
                      pageSize={pageSize}
                      setPageNumber={setPageNumber}
                      itemsLength={customersLength}
                    />
                  )}
                </Box>
              </TabContext>

              {/* customer details */}
              <DetailsNavBar
                open={openDetails}
                onClose={handleDrawerCloseCommon('details')}
                title="Customer Details"
              >
                <Divider flexItem />
                <Box width="100%" display="flex" flexDirection="column" gap="25px">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/CustomerAvatar.svg" alt=" " width="55px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '1.1rem', fontWeight: 900 }}
                      >
                        {' '}
                        Mohamed Hassan{' '}
                        <Chip
                          label="New"
                          size="small"
                          color="primary"
                          sx={{
                            color: '#0F164A',
                            fontSize: '11px',
                            borderRadius: '16px',
                            height: 'auto',
                            padding: '2px 5px 0px 5px',
                          }}
                        />
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        mohamed.hassan@gmail.com{' '}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider flexItem />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/earth.svg" alt=" " width="25px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        Country{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 900 }}
                      >
                        {' '}
                        Kuwait{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/mobile_num.svg" alt=" " width="25px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        Mobile Number{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 900 }}
                      >
                        {' '}
                        +965231217845{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/pin-address.svg" alt=" " width="25px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        Address{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 900 }}
                      >
                        {' '}
                        Ahmadi - Ali Sabah Al-Salem - Street 4{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/calendar-days.svg" alt=" " width="25px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        User since{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 900 }}
                      >
                        {' '}
                        24 October, 2023{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Box component="img" src="/raw/bolt-solid-status.svg" alt=" " width="25px" />
                    <Box display="flex" gap="0px" flexDirection="column">
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {' '}
                        Status{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 900 }}
                      >
                        {' '}
                        Active{' '}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '.8rem' }}
                    >
                      {' '}
                      Total Orders{' '}
                    </Typography>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ fontSize: '.8rem', fontWeight: 900 }}
                    >
                      {' '}
                      174.500 KWD (3 orders){' '}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      padding: '10px',
                      boxShadow: '0px 4px 20px #0F134914',
                      borderRadius: '12px',
                      background: '#FFFFFF',
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.7, fontSize: '.8rem' }}
                        >
                          {' '}
                          #425453697{' '}
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.7, fontSize: '.8rem' }}
                        >
                          {' '}
                          22/03/2022, 3:54 PM{' '}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip label="Successful" size="small" color="success" />
                      </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap="5px">
                        <Box component="img" src="/raw/flag.png" alt="" />
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ fontSize: '.8rem', fontWeight: 900 }}
                        >
                          {' '}
                          Mohamed Hassan{' '}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.7, fontSize: '.8rem' }}
                        >
                          {' '}
                          2 items{' '}
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ fontSize: '.8rem', fontWeight: 900 }}
                        >
                          {' '}
                          120 KWD{' '}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </DetailsNavBar>

              {/* new customer */}
              <DetailsNavBar
                open={openCreateCustomer}
                onClose={handleDrawerCloseCommon('createOrEdit')}
                title={editId ? 'Edit Customer' : 'Add New Customer'}
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
                    <UploadAvatar
                      file={
                        customerData?.avatar && typeof customerData?.avatar === 'string'
                          ? customerData.avatar
                          : customerData?.avatar
                            ? Object.assign(customerData.avatar, {
                              preview: URL.createObjectURL(customerData.avatar),
                            })
                            : null
                      }
                      onDrop={handleDropAvatar}
                    />

                    <Typography
                      pb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      First Name
                    </Typography>
                    {/* <TextField fullWidth variant='filled' onChange={handleCustomerData} value={customerData?.firstName || ""} name='firstName' /> */}
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      settingStateValue={handleCustomerData}
                      value={customerData?.firstName || ''}
                      name="firstName"
                    />
                    <Typography
                      mt="20px"
                      pb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Last Name
                    </Typography>
                    {/* <TextField fullWidth variant='filled' onChange={handleCustomerData} value={customerData?.lastName || ""} name='lastName' /> */}
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      settingStateValue={handleCustomerData}
                      value={customerData?.lastName || ''}
                      name="lastName"
                    />

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Mobile Number
                    </Typography>

                    {/* <TextField fullWidth variant='filled' onChange={handleCustomerData} value={customerData?.phoneNumber || ""} name='phoneNumber' */}
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      settingStateValue={handleCustomerData}
                      value={customerData?.phoneNumber || ''}
                      name="phoneNumber"
                    // sx={{
                    //   '& .MuiInputAdornment-root': {
                    //     marginTop: '0px !important',
                    //     // paddingLeft: '10px'
                    //   },
                    //   '& input': {
                    //     paddingLeft: '2px !important'
                    //   }
                    // }}
                    // InputProps={{
                    //   startAdornment: <InputAdornment position="start">
                    //     <Stack direction='row' alignItems='center' spacing="8px">
                    //       <Iconify icon="mingcute:down-fill" width={43} />
                    //       <Box component='img' src='/raw/flagN.png' />
                    //       <Divider orientation="vertical" variant='middle' flexItem />
                    //     </Stack>
                    //   </InputAdornment>,
                    // }}
                    />

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Email Address
                    </Typography>
                    {/* <TextField fullWidth variant='filled' type='email' onChange={handleCustomerData} value={customerData?.email || ""} name='email' /> */}
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      type="email"
                      settingStateValue={handleCustomerData}
                      value={customerData?.email || ''}
                      name="email"
                    />

                    {!editId && (
                      <>
                        <Typography
                          mt="20px"
                          mb="5px"
                          component="p"
                          noWrap
                          variant="subtitle2"
                          sx={{
                            opacity: 0.7,
                            fontSize: '.9rem',
                            maxWidth: { xs: '120px', md: '218px' },
                          }}
                        >
                          Password
                        </Typography>

                        <RHFTextField
                          fullWidth
                          variant="filled"
                          name="password"
                          type={password.value ? 'text' : 'password'}
                          settingStateValue={handleCustomerData}
                          value={customerData?.password || ''}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={password.onToggle} edge="end">
                                  <Iconify
                                    icon={
                                      password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                                    }
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Country
                    </Typography>
                    <CountrySelect
                      name="country"
                      value={customerData?.country || ''}
                      onChange={(event: any, value: any) =>
                        setCustomerData({ ...customerData, country: value?.code || '' })
                      }
                    />

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Gender
                    </Typography>
                    {/* <Select
                    fullWidth
                    variant='filled'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    value={customerData?.gender || ""}
                    onChange={handleCustomerData}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select> */}
                    <RHFSelect
                      fullWidth
                      variant="filled"
                      id="demo-simple-select"
                      name="gender"
                      value={customerData?.gender || ''}
                      settingStateValue={handleCustomerData}
                    // labelId="demo-simple-select-label"
                    >
                      <MenuItem value="MALE">Male</MenuItem>
                      <MenuItem value="FEMALE">Female</MenuItem>
                    </RHFSelect>

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Prefered Language
                    </Typography>
                    <RHFSelect
                      fullWidth
                      variant="filled"
                      id="demo-simple-select"
                      name="preferedLanguage"
                      value={customerData?.preferedLanguage || ''}
                      settingStateValue={handleCustomerData}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="ar">Arabic</MenuItem>
                    </RHFSelect>

                    <Typography
                      mt="20px"
                      mb="5px"
                      component="p"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        opacity: 0.7,
                        fontSize: '.9rem',
                        maxWidth: { xs: '120px', md: '218px' },
                      }}
                    >
                      Address
                    </Typography>
                    {/* <TextField fullWidth variant='filled' type='text' onChange={handleCustomerData} value={customerData?.location || ""} name='location' /> */}
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      type="text"
                      settingStateValue={handleCustomerData}
                      value={customerData?.location || ''}
                      name="location"
                    />

                    {/* <Box sx={{ borderRadius: '12px', padding: '24px', background: 'rgb(245, 245, 248)' }}>
                  <Stack direction='row' alignItems='center' spacing='10px'>
                    <Iconify icon="ion:location" width={45} style={{ color: '#8688A3' }} />
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                      Ali Sabah Al-Salem - Block 5A - Street 8 House 4 - Floor 2
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: '22px' }} />
                  <Stack direction='row' alignItems='center' spacing='10px'>
                    <Iconify icon="mingcute:add-fill" width={30} style={{ color: '#8688A3' }} />
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', fontWeight: 900 }} >
                      Add Delivery Location
                    </Typography>
                  </Stack>
                </Box> */}
                  </Box>

                  {/* <LoadingButton
                  fullWidth
                  variant="soft"
                  type="submit"
                  color="success"
                  size="large"
                  sx={{ borderRadius: '30px' }}
                  loading={isSubmitting}
                >
                  {editId ? "Update" : "Save"}
                </LoadingButton> */}
                </FormProvider>
              </DetailsNavBar>

              <ConfirmDialog
                open={openAnalytics}
                onClose={handleDrawerCloseCommon('analytics')}
                noCancel={false}
                maxWidth="md"
                content={
                  <Grid container spacing="15px">
                    <Grid item xs={12} md={12}>
                      <CustomCrumbs
                        heading="Customers Analytics"
                        description="Know more about your customers"
                        crums={false}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          minHeight: '160px',
                          backgroundColor: `rgb(245, 245, 248)`,
                          borderRadius: '16px',
                          padding: '32px',
                          backgroundImage: 'url(/raw/added.svg)',
                          backgroundPosition: 'right bottom',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <Typography
                          component="h6"
                          variant="subtitle2"
                          sx={{ fontSize: '.9rem', fontWeight: 800 }}
                        >
                          Total Customers
                        </Typography>
                        <Typography component="h4" variant="h2">
                          1,136
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Since published on 12/06/2023
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          minHeight: '160px',
                          backgroundColor: `rgb(245, 245, 248)`,
                          borderRadius: '16px',
                          padding: '32px',
                          backgroundImage: 'url(/raw/addedd.svg)',
                          backgroundPosition: 'right bottom',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <Typography
                          component="h6"
                          variant="subtitle2"
                          sx={{ fontSize: '.9rem', fontWeight: 800 }}
                        >
                          Added Customers
                        </Typography>
                        <Typography component="h4" variant="h2">
                          28
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Accounts are created by admins
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: '160px',
                          backgroundColor: `rgb(252, 246, 225)`,
                          borderRadius: '16px',
                          padding: '32px',
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <Box component="img" src="/raw/face-with-sunglasses.png" alt="" />
                          <Typography
                            component="h6"
                            variant="subtitle2"
                            sx={{ fontSize: '1rem', fontWeight: 800 }}
                          >
                            136
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ fontSize: '.7rem', fontWeight: 900 }}
                          >
                            {' '}
                            Super (37%){' '}
                          </Typography>
                        </Box>

                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Ordered many times recently
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: '160px',
                          backgroundColor: `rgb(245, 243, 255)`,
                          borderRadius: '16px',
                          padding: '32px',
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <Box component="img" src="/raw/star-struck.png" alt="" />
                          <Typography
                            component="h6"
                            variant="subtitle2"
                            sx={{ fontSize: '1rem', fontWeight: 800 }}
                          >
                            56
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ fontSize: '.7rem', fontWeight: 900 }}
                          >
                            {' '}
                            Loyal (44%){' '}
                          </Typography>
                        </Box>

                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Ordered many times in the last 3 months
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: '160px',
                          backgroundColor: `rgb(255, 231, 238)`,
                          borderRadius: '16px',
                          padding: '32px',
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <Box component="img" src="/raw/sleeping-face.png" alt="" />
                          <Typography
                            component="h6"
                            variant="subtitle2"
                            sx={{ fontSize: '1rem', fontWeight: 800 }}
                          >
                            136
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ fontSize: '.7rem', fontWeight: 900 }}
                          >
                            {' '}
                            Not Active (23%){' '}
                          </Typography>
                        </Box>

                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Orders very few times a long time ago
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: '160px',
                          backgroundColor: `rgb(209, 254, 240)`,
                          borderRadius: '16px',
                          padding: '32px',
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <Box component="img" src="/raw/nerd-face.png" alt="" />
                          <Typography
                            component="h6"
                            variant="subtitle2"
                            sx={{ fontSize: '1rem', fontWeight: 800 }}
                          >
                            56
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ fontSize: '.7rem', fontWeight: 900 }}
                          >
                            {' '}
                            New (9%){' '}
                          </Typography>
                        </Box>

                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.6, fontSize: '.7rem' }}
                        >
                          Just joined and made their first order
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                }
              />
            </Box>
          </Grid>
        </Grid>
        {/* remove Customer */}
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
              onClick={removeCustomerFun}
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
