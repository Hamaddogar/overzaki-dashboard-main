/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Chip, Typography, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
// _mock
import { _orders, allOrders } from 'src/_mock';
// utils
import { fTimestamp } from 'src/utils/format-time';
import { useSnackbar } from 'notistack';
import { AppDispatch } from 'src/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
// components
import { BottomActions } from 'src/components/bottom-actions';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useTable, getComparator } from 'src/components/table';
import { cancellOrder, changeOrderStatus, fetchOneOrders, fetchOrderssList } from 'src/redux/store/thunks/defaultOrders';
// types
import { IOrderItem, IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
//
import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import OrderTableToolbar from '../orders-table-toolbar';
import OrderTableFiltersResult from '../orders-table-filters-result';
import DetailsNavBar from '../DetailsNavBar';
import StepsNewOrders from '../Steps-New-Order';



// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const defaultFilters: IOrderTableFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function OrdersListView() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<AppDispatch>();
  // const [data, setData] = useState(allOrders);
  const { list, error, order, setOrders, status } = useSelector((state: any) => state.orders);
  const [data, setData] = useState<any>(list);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrderssList(undefined));
    }
    setData(list)
  }, [status, dispatch, list]);




  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const settings = useSettingsContext();

  const [value, setValue] = useState('All');

  const theme = useTheme();



  const [filters, setFilters] = useState(defaultFilters);


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
      const newData = list.filter((order: any) => order.status === newValue);
      setData(newData);
    }
  };

  const [openDetails, setOpenDetails] = useState({
    open: false,
    item: null, // null || object
  });

  const toggleDrawer = (item: any) => (event: React.SyntheticEvent | React.MouseEvent) => {
    dispatch(fetchOneOrders(item?._id));
    setOpenDetails({ open: true, item });
  };

  const handleDrawerClose = (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpenDetails({ open: false, item: null });
  };

  // new order
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  const toggleDrawerCommon =
    (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'drawer') setOpenCreateOrder((pv) => !pv);
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

      if (state === 'drawer') setOpenCreateOrder(false);
      else if (state === 'analytics') setOpenAnalytics(false);
    };
  const listStuff = data;
  const [listItems, setListItems] = useState<any>([]);
  const [sort, setSort] = useState(false);
  useEffect(() => {
    setListItems(listStuff);
  }, [listStuff]);
  useEffect(() => {
    const sortedList = sort
      ? [...listStuff].sort((a: any, b: any) =>
        b?.name.toLowerCase().localeCompare(a?.name.toLowerCase())
      )
      : listStuff;
    setListItems(sortedList);
  }, [listStuff, sort]);
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListItems(items);
  };
  const [query, setQuery] = useState('');
  const queryItems = listItems.filter((item: any) =>
    item?.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  // ------------------------------------------------------------------

  const handleChangeStatus = (orderID: any, status: any) => {
    if (status !== 'cancelled') {
      dispatch(changeOrderStatus({ ordersId: orderID, data: { status } })).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchOrderssList(undefined));
          enqueueSnackbar('Successfully Updated!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response?.error?.message}`, { variant: 'error' });
        }
      });
    } else {
      dispatch(cancellOrder(orderID)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchOrderssList(undefined));
          enqueueSnackbar('Successfully Cancelled!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response?.error?.message}`, { variant: 'error' });
        }
      });

    }
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid
        container
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        pb={{ xs: 8, sm: 0 }}
      >
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Orders" crums={false} />
        </Grid>

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
                color="primary"
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
                onClick={toggleDrawerCommon('drawer')}
              >
                {' '}
                Create Order{' '}
              </Button>
            </Stack>
          </BottomActions>
        </Grid>

        <Grid item xs={12}>
          <Box mt="20px">
            <OrderTableToolbar
              filters={filters}
              onFilters={handleFilters}
              query={query}
              sort={sort}
              setSort={setSort}
              setQuery={setQuery}
              canReset={canReset}
              onResetFilters={handleResetFilters}
            />

            {query && (
              <OrderTableFiltersResult
                filters={filters}
                onFilters={handleFilters}
                setQuery={setQuery}
                onResetFilters={handleResetFilters}
                results={queryItems.length}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}
          </Box>
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
                            (tab.value === 'Accepted' && 'primary') ||
                            (tab.value === 'Ready' && 'secondary') ||
                            (tab.value === 'Completed' && 'success') ||
                            (tab.value === 'Pending' && 'warning') ||
                            (tab.value === 'Cancelled' && 'error') ||
                            'default'
                          }
                        >
                          {tab.value === 'All' && list.length}
                          {tab.value === 'Completed' &&
                            list.filter((order: any) => order.status === 'Completed').length}
                          {tab.value === 'Pending' &&
                            list.filter((order: any) => order.status === 'Pending').length}
                          {tab.value === 'Cancelled' &&
                            list.filter((order: any) => order.status === 'Cancelled').length}
                          {tab.value === 'refunded' &&
                            list.filter((order: any) => order.status === 'refunded').length}
                          {tab.value === 'Ready' &&
                            list.filter((order: any) => order.status === 'Ready').length}
                          {tab.value === 'Accepted' &&
                            list.filter((order: any) => order.status === 'Accepted').length}
                        </Label>
                      }
                    />
                  ))}
                </TabList>
              </Box>

              {/* <TabPanel value={value} sx={{ px: 0 }}>
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
                          .filter((item: any) =>
                            item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                          )
                          .map((order: any, indx: any) => (
                            <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                              {(provided) => (
                                <Grid
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  key={indx}
                                  sx={{ cursor: 'pointer' }}
                                  item
                                  xs={12}
                                >
                                  <Paper elevation={4} onClick={toggleDrawer(order)}>
                                    <Grid
                                      container
                                      item
                                      alignItems="center"
                                      justifyContent="space-between"
                                      rowGap={3}
                                      sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}
                                    >
                                      <Grid
                                        sx={{ display: 'flex', gap: '6px' }}
                                        alignItems="center"
                                        item
                                        xs={6}
                                        md="auto"
                                      >
                                        <div {...provided.dragHandleProps}>
                                          <Iconify icon="ci:drag-vertical" />
                                        </div>
                                        <div className="flex flex-col">
                                          <Typography
                                            component="p"
                                            variant="subtitle2"
                                            sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                          >
                                            {order.idNo}
                                          </Typography>
                                          <Typography
                                            component="p"
                                            variant="subtitle2"
                                            sx={{
                                              opacity: 0.7,
                                              fontSize: '.8rem',
                                              maxWidth: { xs: '120px', md: '180px' },
                                            }}
                                            noWrap
                                          >
                                            {order.time}
                                          </Typography>
                                        </div>
                                      </Grid>

                                      <Grid item xs={6} md="auto">
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                          }}
                                        >
                                          <Box
                                            component="img"
                                            src={order.flag}
                                            alt=" "
                                            width="22px"
                                          />
                                          <Box display="flex" gap="0px" flexDirection="column">
                                            <Typography
                                              component="p"
                                              variant="subtitle2"
                                              sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                            >
                                              {' '}
                                              {order.name}{' '}
                                            </Typography>
                                            <Typography
                                              component="p"
                                              noWrap
                                              variant="subtitle2"
                                              sx={{
                                                opacity: 0.7,
                                                fontSize: '.8rem',
                                                maxWidth: { xs: '120px', md: '188px' },
                                              }}
                                            >
                                              {order.address}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>

                                      <Grid item xs={6} md="auto">
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                          }}
                                        >
                                          <Box
                                            component="img"
                                            src={order.pay}
                                            alt=" "
                                            width="25px"
                                          />
                                          <Box display="flex" gap="0px" flexDirection="column">
                                            <Typography
                                              component="p"
                                              variant="subtitle2"
                                              sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                            >
                                              {' '}
                                              {order.price} KWD{' '}
                                            </Typography>
                                            <Typography
                                              component="p"
                                              noWrap
                                              variant="subtitle2"
                                              sx={{
                                                opacity: 0.7,
                                                fontSize: '.8rem',
                                                maxWidth: { xs: '120px', md: '188px' },
                                              }}
                                            >
                                              {order.totalItems} items
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>

                                      <Grid item xs={6} md="auto">
                                        <Chip
                                          label={order.status}
                                          size="small"
                                          sx={{ backgroundColor: order.color }}
                                        />
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
              </TabPanel> */}
              <TabPanel value={value} sx={{ px: 0 }}>
                <Grid container spacing={2}>
                  {data.map((order: any, indx: any) => (
                    <Grid key={indx} item xs={12}>
                      <Paper elevation={4} onClick={toggleDrawer(order)}>
                        <Grid
                          container
                          item
                          alignItems="center"
                          justifyContent="space-between"
                          rowGap={3}
                          sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}
                        >
                          <Grid item xs={6} md="auto">
                            <Typography
                              component="p"
                              variant="subtitle2"
                              sx={{ fontSize: '.8rem', fontWeight: 800 }}
                            >
                              # {order?._id}
                            </Typography>
                            <Typography
                              component="p"
                              noWrap
                              variant="subtitle2"
                              sx={{
                                opacity: 0.7,
                                fontSize: '.8rem',
                                maxWidth: { xs: '120px', md: '188px' },
                              }}
                            >
                              {order?.createdAt}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} md="auto">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                            >
                              {/* <Box component="img" src={order.flag} alt=" " width="22px" /> */}
                              <Box display="flex" gap="0px" flexDirection="column">
                                <Typography
                                  component="p"
                                  variant="subtitle2"
                                  sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                >
                                  {' '}
                                  {order?.userId}{' '}
                                </Typography>
                                <Typography
                                  component="p"
                                  noWrap
                                  variant="subtitle2"
                                  sx={{
                                    opacity: 0.7,
                                    fontSize: '.8rem',
                                    maxWidth: { xs: '120px', md: '188px' },
                                  }}
                                >
                                  {order?.addressId}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={6} md="auto">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                            >
                              {/* <Box component="img" src={order.pay} alt=" " width="25px" /> */}
                              <Box display="flex" gap="0px" flexDirection="column">
                                <Typography
                                  component="p"
                                  variant="subtitle2"
                                  sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                >
                                  {' '}
                                  {order?.totalPrice} KWD{' '}
                                </Typography>
                                <Typography
                                  component="p"
                                  noWrap
                                  variant="subtitle2"
                                  sx={{ opacity: 0.7, fontSize: '.8rem', maxWidth: '188px' }}
                                >
                                  {order?.totalCount} items
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={6} md="auto">
                            <Chip
                              label={order?.status}
                              size="small"
                              sx={{ backgroundColor: order.color }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

            </TabContext>

            <DetailsNavBar
              open={openDetails.open}
              onClose={handleDrawerClose}
              // details={openDetails.item}
              details={order}
              title="Order Details"
              actions={
                <Stack alignItems="center" justifyContent="center" spacing="10px">
                  <Button
                    fullWidth
                    variant="soft"
                    color="success"
                    size="large"
                    startIcon={<Iconify icon="subway:tick" />}
                    sx={{ borderRadius: '30px' }}
                    onClick={() => handleChangeStatus(order?._id, 'Accepted')}
                  >
                    Accept Offer
                  </Button>

                  <Button
                    fullWidth
                    variant="soft"
                    color="error"
                    size="large"
                    startIcon={<Iconify icon="entypo:cross" />}
                    sx={{ borderRadius: '30px' }}
                    onClick={() => handleChangeStatus(order?._id, 'cancelled')}
                  >
                    Cancel Order
                  </Button>
                </Stack>
              }
            >
              <Divider flexItem />

              <Stack
                sx={{ width: '100%' }}
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ fontSize: '.8rem', fontWeight: 800 }}
                  >
                    #{order?._id}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem', maxWidth: { xs: '120px', md: '180px' } }}
                    noWrap
                  >
                    {order?.createdAt}
                  </Typography>
                </Box>
                <Chip
                  label={order?.status}
                  size="small"
                  sx={{ backgroundColor: 'rbg(241, 209, 105,.2)' }}
                />
              </Stack>

              {/* infor */}
              <Box
                sx={{ width: '100%', bgcolor: 'background.neutral', borderRadius: '16px', p: 2.5 }}
              >
                <Typography
                  component="p"
                  mb="15px"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 800 }}
                >
                  {' '}
                  {order?.totalCount} Items is added{' '}
                </Typography>

                {order?.items && order?.items.map((item: any, ind: any) => (
                  <Stack
                    key={ind}
                    spacing="20px"
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '14px', color: '#8688A3', fontWeight: 800 }}
                    >
                      {item?.count}x
                    </Typography>
                    <Box component="img" src="/raw/s4.png" sx={{ width: '40px' }} />

                    <Box>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.8rem', fontWeight: 800 }}
                      >
                        {' '}
                        iPhone 13 Pro Max{' '}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {item?.unitPrice} KWD
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>

              {/* payment summary */}
              <Box
                sx={{
                  width: '100%',
                  bgcolor: 'background.neutral',
                  borderRadius: '16px',
                  p: 2.5,
                  display: 'flex',
                  gap: '5px',
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
                    {order?.totalPrice} KWD{' '}
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
                    - {order?.totalPriceAfterDiscount} KWD
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
                    0.000 KWD{' '}
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
                    {order?.totalPriceAfterDiscount} KWD{' '}
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
                    sx={{ fontSize: '.8rem', fontWeight: 900 }}
                  >
                    {order?.paymentMethod}
                  </Typography>
                </Stack>
              </Box>

              {/* print reciept */}
              <Box
                sx={{
                  width: '100%',
                  bgcolor: 'background.neutral',
                  borderRadius: '16px',
                  p: 2.5,
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
                  Print Receipt{' '}
                </Typography>
                <FormControl>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem' }}
                  >
                    Language
                  </Typography>
                  <RadioGroup
                    aria-labelledby="Language-selection"
                    defaultValue="English"
                    name="Language-selection-group"
                  >
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={6}>
                        <FormControlLabel value="English" control={<Radio />} label="English" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel value="Arabic" control={<Radio />} label="Arabic" />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem' }}
                  >
                    Type
                  </Typography>
                  <RadioGroup
                    aria-labelledby="Language-selection"
                    defaultValue="A4"
                    name="Language-selection-group"
                  >
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={6}>
                        <FormControlLabel value="Thermal" control={<Radio />} label="Thermal" />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel value="A4" control={<Radio />} label="A4" />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
                <Button
                  fullWidth
                  variant="soft"
                  size="large"
                  startIcon={<Iconify icon="mdi:printer-outline" />}
                  sx={{
                    borderRadius: '30px',
                    color: alpha(theme.palette.common.black, 0.8),
                    backgroundColor: alpha(theme.palette.grey[400], 0.48),
                    boxShadow: '0px 6px 20px #00000014',
                    '&:hover': {
                      color: theme.palette.common.black,
                      // backgroundColor: theme.palette.grey[900],
                    },
                  }}
                >
                  Print Receipt
                </Button>
              </Box>

              {/* customer info */}
              <Box
                sx={{
                  width: '100%',
                  bgcolor: 'background.neutral',
                  borderRadius: '16px',
                  p: 2.5,
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
                    {/* <Box component="img" src="/raw/flag.png" /> */}
                    <Box component="img" src={order?.userId?.avatar} width="100px" />
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ fontSize: '.9rem', fontWeight: 700 }}
                    >
                      {order?.userId?.firstName} {order?.userId?.lastName}

                    </Typography>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '.85rem' }}
                    >

                      {order?.userId?.email}
                    </Typography>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.7, fontSize: '.85rem' }}
                    >
                      {order?.userId?.phoneNumber}
                    </Typography>
                  </Box>
                </Stack>
                <Divider flexItem sx={{ my: '10px' }} />
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.9rem', fontWeight: 700 }}
                >
                  Delivery Address{' '}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  {' '}
                  Address Type: {order?.addressId?.addressType}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  {' '}
                  {order?.addressId?.buildingName} {order?.addressId?.avenue} {order?.addressId?.PACI}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  {' '}
                  Block: {order?.addressId?.block}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  {' '}
                  Street: {order?.addressId?.street}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.85rem' }}
                >
                  {' '}
                  House: {order?.addressId?.house}
                </Typography>
                <Stack mb="16px" direction="row" alignItems="center" justifyContent="space-between">
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem', display: 'flex', alognItems: 'center' }}
                  >
                    {' '}
                    <Iconify icon="mdi:content-copy" /> Copy Address{' '}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.85rem', display: 'flex', alognItems: 'center' }}
                  >
                    {' '}
                    <Iconify icon="mdi:map-marker-outline" /> Show On Map{' '}
                  </Typography>
                </Stack>
                <Button
                  fullWidth
                  variant="soft"
                  size="large"
                  startIcon={<Iconify icon="mdi:printer-outline" />}
                  sx={{
                    borderRadius: '30px',
                    color: alpha(theme.palette.common.black, 0.8),
                    backgroundColor: alpha(theme.palette.common.white, 0.48),
                    boxShadow: '0px 6px 20px #00000014',
                    '&:hover': {
                      color: theme.palette.common.black,
                      backgroundColor: alpha(theme.palette.common.white, 1),
                    },
                  }}
                >
                  Send via WhatsApp
                </Button>
              </Box>

              {/* Time line */}
              <Box
                sx={{
                  width: '100%',
                  bgcolor: 'background.neutral',
                  borderRadius: '16px',
                  p: 2.5,
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 800 }}
                >
                  {' '}
                  Order Timeline{' '}
                </Typography>
                <Box>
                  <Timeline
                    sx={{
                      padding: 0,
                      margin: 0,
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                    }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector
                          style={{
                            borderStyle: 'dashed',
                            borderColor: '#8688A3',
                            borderWidth: '1px',
                          }}
                        />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography component="p" variant="subtitle2" sx={{ fontSize: '.9rem' }}>
                          {' '}
                          Created by <strong> Ahmed hassan</strong>{' '}
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.7, fontSize: '.8rem' }}
                        >
                          24 Jun 2023, 4:51 PM
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        {/* <TimelineConnector style={{ borderStyle: 'dashed', borderColor: '#8688A3', borderWidth: '1px' }} /> */}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography component="p" variant="subtitle2" sx={{ fontSize: '.9rem' }}>
                          {' '}
                          Created by <strong> Kareem Ali (Admin)</strong>{' '}
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ opacity: 0.7, fontSize: '.8rem' }}
                        >
                          24 Jun 2023, 5:36 PM
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Box>
              </Box>
            </DetailsNavBar>

            {/* create new Order */}
            <DetailsNavBar
              open={openCreateOrder}
              onClose={handleDrawerCloseCommon('drawer')}
              title="Create New Order"
            >
              <Divider flexItem />
              <StepsNewOrders closeDrawer={handleDrawerCloseCommon('drawer')} />
            </DetailsNavBar>

            <ConfirmDialog
              open={openAnalytics}
              onClose={handleDrawerCloseCommon('analytics')}
              noCancel={false}
              maxWidth="sm"
              content={
                <Grid container spacing="20px">
                  <Grid item xs={12} md={12}>
                    <CustomCrumbs
                      heading="Orders Analytics"
                      description="Select time period to see results"
                      crums={false}
                    />
                  </Grid>

                  {[
                    {
                      count: '1,136',
                      color: '134, 136, 163',
                      title: 'Total Orders',
                    },
                    {
                      count: '56',
                      color: '241, 209, 105',
                      title: 'Pending',
                    },
                    {
                      count: '136',
                      color: '203, 194, 255',
                      title: 'Ready',
                    },
                    {
                      count: '56',
                      color: '111, 198, 255',
                      title: 'Completed',
                    },
                    {
                      count: '56',
                      color: '27, 252, 182',
                      title: 'Canceled',
                    },
                    {
                      count: '136',
                      color: '255, 133, 171',
                      title: 'Accepted',
                    },
                  ].map((item, indx) => (
                    <Grid key={indx} item xs={6} md={4}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          flexDirection: 'column',
                          height: '120px',
                          backgroundColor: `rgb(${item.color},.12)`,
                          borderRadius: '16px',
                        }}
                      >
                        <Box
                          sx={{
                            height: '12px',
                            width: '12px',
                            backgroundColor: `rgb(${item.color})`,
                            borderRadius: '12px',
                          }}
                        />
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{ fontSize: '1.2rem', fontWeight: 800 }}
                        >
                          {item.count}
                        </Typography>
                        <Typography
                          component="p"
                          variant="subtitle2"
                          sx={{
                            opacity: 0.6,
                            fontSize: '.7rem',
                            maxWidth: { xs: '120px', md: '180px' },
                          }}
                          noWrap
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              }
            />
          </Box>
        </Grid>
      </Grid>
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
