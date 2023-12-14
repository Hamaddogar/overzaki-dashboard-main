/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/default-param-last */

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { TimePicker } from 'material-ui-time-picker';
// import TimeInput from 'material-ui-time-picker'

// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/system/Unstable_Grid/Grid';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { Stack, Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// routes
// import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import Linker from 'src/sections/overview/subscription-plan/link';
import { paths } from 'src/routes/paths';
import { TimePicker } from '@mui/x-date-pickers';
import { MAPBOX_API } from 'src/config-global';
import * as Yup from 'yup';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import CountrySelect from 'src/sections/customers/view/CountryField';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useSnackbar } from 'notistack';
import { createLocation, createWorkingHours, fetchLocationsList } from 'src/redux/store/thunks/location';
import { createDeliveryZone } from 'src/redux/store/thunks/deliveryZone';



const MapDraggableMarkers = dynamic(
  () => import('../../_examples/extra/map-view/draggable-markers')
);
const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};
const baseSettings = {
  mapboxAccessToken: MAPBOX_API,
  minZoom: 1,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 250,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));



// ----------------------------------------------------------------------

export default function AccountView() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: any) => state.locations);
  const { enqueueSnackbar } = useSnackbar();
  const [openDetails, setOpenDetails] = useState(false);
  const [openTime, setOpenTime] = useState({ open: false });

  const settings = useSettingsContext();
  const [activeSection, setActiveSection] = React.useState('Location Info');
  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const [timerDialogData, setTimerDialogData] = useState<any>({
    index: null,
    prevData: null,
    property: null,
  });



  const [branchData, setBranchData] = useState<any>(null)
  // const [locationV, setLocationV] = useState<any>({
  //   latitude: 31.53208528429136,
  //   longitude: 74.34418413749019
  // });
  const [locationV, setLocationV] = useState<any>({
    latitude: 0,
    longitude: 0
  });




  useEffect(() => {
    markCurrentLocation();
  }, []);


  const markCurrentLocation = () => {
    getLocation()
      .then((location: any) => {
        setLocationV({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }


  const getLocation = () => new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (err: any) => {
          reject(err.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  });



  // --------------------------------------------------------
  const [workingHours, setWorkingHours] = useState<any>([
    {
      day: 'Saturday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Sunday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Monday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Tuesday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Wednesday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Thursday',
      status: false,
      start: '',
      end: '',
    },
    {
      day: 'Friday',
      status: false,
      start: '',
      end: '',
    },
  ]);
  const updateWorkingHours = (index: any = null, newData: any) => {
    setWorkingHours((prev: any) =>
      prev.map((obj: any, indx: any) => (indx === index ? newData : obj))
    );
  };


  // --------------------------------------------------------
  const [deliveryZoneData, setDeliveryZoneData] = useState<any>(null);
  const [deliveryZoneList, setdeliveryZoneList] = useState<any>([]);
  const [deliveryEditId, setDeliveryEditId] = useState<any>(null)


  // ----------------------------------------------------------------------------------
  // const validateWorkingHours = (workingHoursArray: any) => {
  //   const errors: any = [];
  //   workingHoursArray.forEach((workingHour: any, index: any) => {
  //     if (workingHour.status) {
  //       if (!workingHour.start) {
  //         errors[index] = { ...errors[index], start: 'Start time is required when status is true' };
  //       }
  //       if (!workingHour.end) {
  //         errors[index] = { ...errors[index], end: 'End time is required when status is true' };
  //       }
  //     }
  //   });

  //   return errors;
  // };

  const detailsSchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    address: Yup.object().shape({
      en: Yup.string().required('Field is required'),
      ar: Yup.string().required('Field is required'),
    }),
    country: Yup.mixed<any>().nullable().required('Country is required'),
    currency: Yup.string().required('Currency is required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    // location: Yup.string().required('Field is required'),
  });
  const methods = useForm({
    resolver: yupResolver(detailsSchema),
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit(async (submitData: any) => {

    if (!customValidations()) {
      return false;
    }

    // setting up data
    const FormValues = {
      ...branchData,
      allowPickUpOrders: branchData?.allowPickUpOrders || false,
      allowDeliveryOrders: branchData?.allowDeliveryOrders || false,
      longitude: locationV?.longitude,
      latitude: locationV?.latitude,
      status: true,
      busy: false,
      scheduleStatus: true,
      scheduleDayNO: 2,
    }

    const WorkingHoursFormData = workingHours.filter((dayObj: any) => dayObj.status === true).map((dayObj: any) => ({
      day: dayObj.day,
      from: new Date(dayObj.start).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      to: new Date(dayObj.end).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    }))
    // console.log(WorkingHoursFormData);
    const DeliveryZones = deliveryZoneList.map((dzObj: any) => ({
      government: dzObj.government,
      zoneName: dzObj.zoneName,
      deliveryFees: dzObj.deliveryFees,
      minOrder: dzObj.minOrder,
      deliveryTime: dzObj.deliveryTime,

    }));
    // console.log(DeliveryZones);


    // create branch
    dispatch(createLocation(FormValues)).then((response: any) => {
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        setBranchData(null);
        methods.reset();
        const branchId = response.payload._id;
        createWorkingHoursFun(branchId, WorkingHoursFormData);
        createDeliveryZoneFun(branchId, DeliveryZones)
        dispatch(fetchLocationsList(error));
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
        router.push(paths.dashboard.deliveryPickup.root);
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });


  });

  // create working hours
  const createWorkingHoursFun = (branchId: any, WorkingHoursFormData: any) => {
    WorkingHoursFormData.map((WH_obj: any) => {
      dispatch(createWorkingHours({ id: branchId, data: WH_obj })).then((response: any) => {
        console.log(response);
      });
    })
  }
  // create Delivery Zone 
  const createDeliveryZoneFun = (branchId: any, DeliveryZones: any) => {
    DeliveryZones.map((DZ_obj: any) => {
      dispatch(createDeliveryZone({ id: branchId, data: DZ_obj })).then((response: any) => {
        console.log(response);
      });
    })
  }



  const handleNestedBranchData = (e: any, targetEl: any) => {
    const { name, value } = e.target;
    const [parentKey, nestedKey] = name.split('.');
    const obj = {
      ...branchData,
      [targetEl]: {
        ...(branchData?.[targetEl] || {}),
        [nestedKey]: value,
      },
    };
    setBranchData(obj);
  };
  const handleBranchData = (e: any) => {
    const { name, value } = e.target;
    setBranchData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ---------------------------------------------------------------- Delivery Zone -----------------------


  const deliveryZoneSchema = Yup.object().shape({
    government: Yup.string().required('Field is required'),
    zoneName: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    deliveryFees: Yup.number().required('Field is required'),
    minOrder: Yup.number().required('Field is required'),
    deliveryTime: Yup.number().required('Field is required'),
    country: Yup.mixed<any>().nullable().required('Country is required'),

  });
  const DZMethods = useForm({
    resolver: yupResolver(deliveryZoneSchema),
  });

  const onDZSubmitFun = DZMethods.handleSubmit(async (submitData: any) => {

    if (deliveryEditId) {
      setdeliveryZoneList((prev: any) => prev.map((itemData: any) => {
        if (itemData._id === deliveryEditId) {
          return {
            ...submitData,
            _id: deliveryEditId,
            isPublished: submitData?.isPublished || false
          }
        }
        return itemData;
      }));
    } else {
      const newDeliveryZone = {
        ...submitData,
        _id: Math.random(),
        isPublished: submitData?.isPublished || false
      }
      setdeliveryZoneList([...deliveryZoneList, newDeliveryZone]);

    }
    DZMethods.reset();
    setOpenDetails(false);
  });

  const handleDeliveryZoneData = (e: any) => {
    const { name, value } = e.target;
    setDeliveryZoneData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedDeliveryZoneData = (e: any) => {
    const { name, value } = e.target;
    const language = name.split('.')[1];

    setDeliveryZoneData((prevData: any) => ({
      ...prevData,
      zoneName: {
        ...prevData?.zoneName,
        [language]: value,
      },
    }));
  };

  const handleEditDZ = (locationObj: any) => {
    setDeliveryZoneData(locationObj);
    setOpenDetails(true);
    setDeliveryEditId(locationObj._id);

    console.log("locationObj", locationObj);

    Object.entries(locationObj).forEach(([fieldName, value]: any) => {
      // if (fieldName === 'zoneName'){
      // }
      DZMethods.setValue(fieldName, value);
    });
  };

  const handleRemoveDZ = (removeId: any) => {
    setdeliveryZoneList((prev: any) => prev.filter((itemObj: any) => itemObj._id !== removeId));
  }

  // Custom Validations
  const customValidations = () => {
    // Working Hours
    const inValidHours = workingHours.filter((dayObj: any) => {
      if (dayObj.status === true) {
        if (dayObj.start === "" || dayObj.end === "") {
          return true;
        }
        return false
      }
      return false
    });

    if (inValidHours.length > 0) {
      enqueueSnackbar(`Error! Please Select Valid Working Hours`, { variant: 'error' });
      return false;
    }
    return true;
  }


  // ----------------------------------------------------------------------------------
  const handleChangeSection =
    (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      setActiveSection(newValue);
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
    };

  const closeTimerDialog = () => {
    setTimerDialogOpen(false);
    setTimerDialogData({ index: null, prevData: null, property: null });
  };

  return (
    <Box>
      <Box
        sx={{
          boxShadow: '0px 3px 20px #00000014',
          p: '20px',
          m: { xs: '0px', md: '-10px -15px 0px -15px' },
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid xs={12} sm={12} md={3}>
            <CustomCrumbs heading="Add New Location" crums={false} />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Stack
              sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              spacing="20px"
            >
              <Button
                onClick={handleChangeSection('Location Info')}
                fullWidth
                variant="contained"
                sx={
                  activeSection === 'Location Info'
                    ? {
                      borderRadius: '12px',
                      color: '#0F1349',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 6px 20px #00000033',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                    : {
                      borderRadius: '12px',
                      color: '#8688A3',
                      backgroundColor: 'background.neutral',
                      '&:hover': { backgroundColor: 'background.neutral' },
                    }
                }
              >
                {' '}
                Location Info{' '}
              </Button>

              {/* Delivery Zones */}
              <Button
                onClick={handleChangeSection('Delivery Zones')}
                fullWidth
                variant="contained"
                sx={
                  activeSection === 'Delivery Zones'
                    ? {
                      borderRadius: '12px',
                      color: '#0F1349',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 6px 20px #00000033',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                    : {
                      borderRadius: '12px',
                      color: '#8688A3',
                      backgroundColor: 'background.neutral',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                }
              >
                {' '}
                Delivery Zones{' '}
              </Button>
            </Stack>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <BottomActions>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                spacing={{ xs: '10px', sm: '15px' }}
                sx={{ width: '100%' }}
              >
                <Linker path={paths.dashboard.deliveryPickup.root} width="100%">
                  <Button
                    fullWidth
                    sx={{ borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }}
                    component="h5"
                    variant="contained"
                  >
                    {' '}
                    Cancel{' '}
                  </Button>
                </Linker>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{ borderRadius: '30px', color: '#0F1349' }}
                  loading={isSubmitting}
                  onClick={() => methods.handleSubmit(onSubmit as any)()}
                >
                  Save
                </LoadingButton>
              </Stack>
            </BottomActions>
          </Grid>
        </Grid>
      </Box>

      {/* body */}
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mt: '30px' }}>
        {activeSection === 'Location Info' && (
          <Box>
            <FormProvider methods={methods} onSubmit={onSubmit} >
              <Box sx={{ maxWidth: '700px', width: '100%' }}>
                <Typography variant="h5" component="h5" mb="30px">
                  Details
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  rowSpacing="20px"
                  columnSpacing="20px"
                  sx={{ mt: '20px' }}
                >
                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Branch Name (English)
                    </Typography>
                    <RHFTextField fullWidth
                      variant="filled"
                      value={branchData?.name?.en || ""}
                      settingStateValue={(e: any) => handleNestedBranchData(e, "name")}
                      name="name.en"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Branch Name (Arabic)
                    </Typography>
                    <RHFTextField fullWidth variant="filled" value={branchData?.name?.ar || ""} settingStateValue={(e: any) => handleNestedBranchData(e, "name")} name="name.ar" />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Country
                    </Typography>
                    <CountrySelect
                      name="country"
                      variant="filled"
                      value={branchData?.country || ''}
                      onChange={(event: any, value: any) =>
                        setBranchData({ ...branchData, country: value?.code || '' })
                      }
                    />
                    {/* <RHFTextField
                      fullWidth
                      variant="filled"
                      name="country"
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
                            <Stack direction="row" alignItems="center" spacing="8px">
                              <Iconify icon="mingcute:down-fill" width={43} />
                              <Box component="img" src="/raw/flagN.png" />
                              <Divider orientation="vertical" variant='middle' flexItem />
                            </Stack>
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Currency
                    </Typography>
                    <FormControl fullWidth>
                      <RHFSelect
                        fullWidth
                        variant="filled"
                        id="demo-simple-select"
                        name="currency"
                        value={branchData?.currency || ""}
                        settingStateValue={handleBranchData}
                      // labelId="demo-simple-select-label"
                      >
                        <MenuItem value="KWD">KWD</MenuItem>
                      </RHFSelect>
                      {/* <Select
                        variant="filled"
                        // value={currency}
                        name="currency"
                        value={branchData?.currency || ""}
                        onChange={handleBranchData}
                      // onChange={handleChangeDropDown('currency')}
                      >
                        <MenuItem value="">Default Currency</MenuItem>
                        <MenuItem value="KWD">KWD</MenuItem>
                      </Select> */}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Mobile Number
                    </Typography>
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      value={branchData?.phoneNumber || ""}
                      settingStateValue={handleBranchData}
                      name="phoneNumber"
                    // sx={{
                    //   '& .MuiInputAdornment-root': {
                    //     marginTop: '0px !important',
                    //     // paddingLeft: '10px'
                    //   },
                    //   '& input': {
                    //     paddingLeft: '2px !important',
                    //   },
                    // }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <Stack direction="row" alignItems="center" spacing="8px">
                    //         <Iconify icon="mingcute:down-fill" width={43} />
                    //         <Box component="img" src="/raw/flagN.png" />
                    //         <Divider orientation="vertical" variant="middle" flexItem />
                    //       </Stack>
                    //     </InputAdornment>
                    //   ),
                    // }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ my: '50px' }}>
                <Divider sx={{ borderWidth: '1px' }} />
              </Box>

              <Box sx={{ maxWidth: '700px', width: '100%' }}>
                <Typography variant="h5" component="h5" mb="30px">
                  Location Information
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="#8688A3">
                      Location On Map
                    </Typography>
                    <Typography variant="caption" component="p" color="#8688A3">
                      Selected Location:<b> {locationV?.longitude || ""} -  {locationV?.latitude || ""}</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      startIcon={<Iconify icon="fluent:location-12-filled" />}
                      onClick={markCurrentLocation}
                      sx={{
                        borderRadius: '30px',
                        color: '#0F1349',
                        boxShadow: '0px 6px 20px #1BFCB633',
                      }}
                      component="h5"
                      variant="contained"
                      color="primary"
                    >
                      Pin Current Location
                    </Button>
                  </Box>
                </Stack>
                <Grid
                  container
                  alignItems="center"
                  rowSpacing="20px"
                  columnSpacing="20px"
                  sx={{ mt: '20px' }}
                >
                  <Grid xs={12}>
                    {/* <Box sx={{ minHeight: '150px', backgroundColor: '#CFCFCF', borderRadius: '16px' }} /> */}
                    <Box sx={{ minHeight: '150px', borderRadius: '16px' }}>
                      <StyledMapContainer>
                        <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light}
                          defaultMarker={locationV}
                          onMarkerChange={(event: any) => {
                            setLocationV({ longitude: event.lngLat.lng, latitude: event.lngLat.lat })
                          }} />
                      </StyledMapContainer>
                    </Box>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormControl fullWidth>
                      <Typography
                        component="p"
                        noWrap
                        variant="caption"
                        color="#8688A3"
                        sx={{ ml: '5px', mb: '5px' }}
                      >
                        Address (English)
                      </Typography>
                      <RHFTextField fullWidth variant="filled" value={branchData?.address?.en || ""} settingStateValue={(e: any) => handleNestedBranchData(e, "address")} name="address.en" />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography
                      component="p"
                      noWrap
                      variant="caption"
                      color="#8688A3"
                      sx={{ ml: '5px', mb: '5px' }}
                    >
                      Address (Arabic)
                    </Typography>
                    <RHFTextField fullWidth variant="filled" value={branchData?.address?.ar || ""} settingStateValue={(e: any) => handleNestedBranchData(e, "address")} name="address.ar" />
                  </Grid>
                </Grid>
              </Box>

            </FormProvider>

            <Box sx={{ my: '20px' }}>
              <Divider sx={{ borderWidth: '1px' }} />
            </Box>

            <Box sx={{ maxWidth: '700px', width: '100%' }}>
              {/* Delivery & Pick Up */}
              <Typography variant="h5" component="h5" mb="30px">
                Delivery & Pick Up
              </Typography>
              <Grid
                container
                alignItems="center"
                rowSpacing="5px"
                columnSpacing="5px"
                sx={{ mt: '20px' }}
              >
                <Grid xs={12}>
                  <FormControlLabel
                    // control={<Switch color="primary" size="medium" defaultChecked />}
                    control={<Switch color="primary" size="medium" name='allowPickUpOrders' checked={branchData?.allowPickUpOrders || false}
                      onChange={(e: any) => {
                        setBranchData({ ...branchData, allowPickUpOrders: e.target.checked })
                      }} />}
                    label="Allow Pick Up Orders"
                    labelPlacement="end"
                    sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
                  />
                </Grid>
                <Grid xs={12}>
                  <FormControlLabel
                    control={<Switch color="primary" size="medium" name='allowDeliveryOrders' checked={branchData?.allowDeliveryOrders || false}
                      onChange={(e: any) => {
                        setBranchData({ ...branchData, allowDeliveryOrders: e.target.checked })
                      }} />}
                    label="Allow Delivery Orders"
                    labelPlacement="end"
                    sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
                  />
                </Grid>

                {/* <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    name="tax"
                    sx={{
                      '& .MuiInputAdornment-root': {
                        marginTop: '0px !important',
                        // paddingLeft: '10px'
                      },
                      // '& input': {
                      //   paddingLeft: '2px !important'
                      // }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="caption" sx={{ fontWeight: 900 }}>
                            5 &nbsp; KWD
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Delivery Fees"
                  />
                </Grid> */}
              </Grid>
            </Box>

            <Box sx={{ my: '20px' }}>
              <Divider sx={{ borderWidth: '1px' }} />
            </Box>

            <Box sx={{ maxWidth: '700px', width: '100%' }}>
              {/* Delivery & Pick Up */}
              <Typography variant="h5" component="h5">
                Working Hours
              </Typography>
              <Typography variant="caption" mb="30px">
                Customize your actual working hours for each day.
              </Typography>
              <Grid
                container
                alignItems="center"
                rowSpacing="25px"
                columnSpacing="5px"
                sx={{ mt: '20px' }}
              >
                {workingHours.map((dataObj: any, index: any) => (
                  <Grid xs={12} key={index}>
                    <FormControlLabel
                      label={
                        <Typography
                          sx={{ fontWeight: 900, color: dataObj.status ? 'auto' : '#8688A3' }}
                        >
                          {`${String(dataObj?.day).toUpperCase()}`}{' '}
                          <Typography component="sup" style={{ fontWeight: 400, fontSize: '11px' }}>
                            {dataObj.status ? '(Available)' : '(Not Available)'}
                          </Typography>
                        </Typography>
                      }
                      control={
                        <Checkbox
                          // name={dataObj?.day}
                          size="medium"
                          onChange={() =>
                            updateWorkingHours(index, { ...dataObj, status: !dataObj.status })
                          }
                          checked={!!dataObj.status}
                        />
                      }
                    />
                    {dataObj.status && (
                      <Box>
                        <Stack direction="row" alignItems="center" spacing="20px">
                          <Stack direction="row" justifyContent="space-between" spacing="10px">
                            <Typography component="p" variant="subtitle2" color="#8688A3">
                              {' '}
                              From{' '}
                            </Typography>
                            <Typography
                              component="p"
                              variant="subtitle2"
                              sx={{ display: 'flex', alignItems: 'center', fontWeight: 900 }}
                              onClick={() => {
                                setTimerDialogData({
                                  index,
                                  prevData: dataObj,
                                  property: 'start',
                                } as any);
                                setTimerDialogOpen(true);
                              }}
                            >
                              {dataObj?.start ? dataObj?.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'hh:mm A'}{' '}
                              <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />{' '}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between" spacing="10px">
                            <Typography component="p" variant="subtitle2" color="#8688A3">
                              {' '}
                              To{' '}
                            </Typography>
                            <Typography
                              component="p"
                              variant="subtitle2"
                              sx={{ display: 'flex', alignItems: 'center', fontWeight: 900 }}
                              onClick={() => {
                                setTimerDialogData({
                                  index,
                                  prevData: dataObj,
                                  property: 'end',
                                } as any);
                                setTimerDialogOpen(true);
                              }}
                            >
                              {' '}
                              {dataObj?.end ? dataObj?.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'hh:mm A'}{' '}
                              <Iconify icon="material-symbols:keyboard-arrow-down-rounded" />{' '}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="error">
                            {/* {errors?.workingHours?.[index]?.start && (
                              <span>{errors.workingHours[index]?.start?.message}</span>
                            )}
                            {errors?.workingHours?.[index]?.end && (
                              <span>{errors.workingHours[index]?.end?.message}</span>
                            )} */}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {activeSection === 'Delivery Zones' && (
          <Box>
            <Box sx={{ maxWidth: '700px', width: '100%' }}>
              <Typography variant="h5" component="h5" mb="30px">
                Delivery Zones
              </Typography>

              <Grid
                container
                alignItems="center"
                rowSpacing="20px"
                columnSpacing="20px"
                sx={{ mt: '20px' }}
              >
                <Grid xs={12}>
                  {/* <Box
                    sx={{ minHeight: '150px', backgroundColor: '#CFCFCF', borderRadius: '16px' }}
                  /> */}
                  <Box sx={{ minHeight: '140px', borderRadius: '16px', pointerEvents: 'none' }}>
                    <StyledMapContainer>
                      <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light}
                        defaultMarker={locationV}
                        draggable={false}
                        onMarkerChange={(event: any) => {
                          setLocationV({ longitude: event.lngLat.lng, latitude: event.lngLat.lat })
                        }} />
                    </StyledMapContainer>
                  </Box>
                </Grid>

                <Grid xs={12}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                      {deliveryZoneList.length} Delivery Zones
                    </Typography>
                    <Box sx={{ minWidth: '100px' }}>
                      <Button
                        fullWidth
                        onClick={() => {
                          setOpenDetails(true);
                          setDeliveryZoneData(null);
                          setDeliveryEditId(null);
                          DZMethods.reset();
                        }}
                        startIcon={<Iconify icon="mingcute:add-fill" />}
                        sx={{
                          borderRadius: '30px',
                          color: '#0F1349',
                          boxShadow: '0px 6px 20px #1BFCB633',
                        }}
                        component="h5"
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </Box>
                  </Stack>
                </Grid>

                {deliveryZoneList.map((locationObj: any, indx: any) => (
                  <Grid xs={12} key={indx} >
                    <Box
                      component={Card}
                      sx={{
                        p: '23px',
                        boxShadow: '0px 4px 20px #0F134914',
                        borderRadius: '16px',
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography
                          variant="h6"
                          sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <Iconify icon="carbon:location-filled" />
                          <span>{locationObj?.zoneName?.en}</span>
                        </Typography>

                        <Stack direction="row" alignItems="center" columnGap="15px">
                          <Box
                            onClick={() => {
                              handleEditDZ(locationObj)
                            }}
                            sx={{
                              height: '36px',
                              width: '36px',
                              borderRadius: '20px',
                              backgroundColor: 'rgb(134, 136, 163,.09)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify icon="ic:round-edit" />
                          </Box>
                          <Box
                            onClick={() => handleRemoveDZ(locationObj._id)}
                            sx={{
                              height: '36px',
                              width: '36px',
                              borderRadius: '20px',
                              backgroundColor: 'rgb(134, 136, 163,.09)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify icon="uiw:delete" />
                          </Box>
                          {/* <Switch color="primary" checked={locationObj.active} /> */}
                        </Stack>
                      </Stack>
                      <Stack
                        mt="10px"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="body2" color="#8688A3" sx={{ fontWeight: 500 }}>
                          {' '}
                          Delivery Fees{' '}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {' '}
                          {locationObj.deliveryFees} KWD{' '}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="#8688A3" sx={{ fontWeight: 500 }}>
                          {' '}
                          Minimum Order{' '}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {' '}
                          {locationObj.minOrder} KWD{' '}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="#8688A3" sx={{ fontWeight: 500 }}>
                          {' '}
                          Delivery Time{' '}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {' '}
                          {locationObj.deliveryTime} mins{' '}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
      </Container>

      <DetailsNavBar
        open={openDetails}
        onClose={handleDrawerCloseCommon('new')}
        title={deliveryEditId !== null ? "Edit Delivery Zone" : "Add Delivery Zone"}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="soft"
              color="success"
              size="large"
              sx={{ borderRadius: '30px' }}
              loading={DZMethods.formState.isSubmitting}
              onClick={() => DZMethods.handleSubmit(onDZSubmitFun as any)()}
            >
              {deliveryEditId ? 'Update' : 'Save'}
            </LoadingButton>
          </Stack>
        }
      >
        <FormProvider methods={DZMethods} onSubmit={onDZSubmitFun}>
          <Divider flexItem />
          <Box width="100%">
            <Typography
              mt="5px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Your Selected Location
            </Typography>
            <Box sx={{ minHeight: '140px', borderRadius: '16px', pointerEvents: 'none' }}>
              <StyledMapContainer>
                <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light}
                  defaultMarker={locationV}
                  draggable={false}
                  onMarkerChange={(event: any) => {
                    setLocationV({ longitude: event.lngLat.lng, latitude: event.lngLat.lat })
                  }} />
              </StyledMapContainer>
            </Box>


            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Government
            </Typography>

            <FormControl fullWidth>
              <RHFTextField fullWidth variant="filled" value={deliveryZoneData?.government || ""} settingStateValue={(e: any) => handleDeliveryZoneData(e)} name="government" />
            </FormControl>


            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Zone Name (English)
            </Typography>

            <FormControl fullWidth>
              <RHFTextField fullWidth variant="filled" value={deliveryZoneData?.zoneName?.en || ""} settingStateValue={(e: any) => handleNestedDeliveryZoneData(e)} name="zoneName.en" />
            </FormControl>
            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Zone Name (Arabic)
            </Typography>

            <FormControl fullWidth>
              <RHFTextField fullWidth variant="filled" value={deliveryZoneData?.zoneName?.ar || ""} settingStateValue={(e: any) => handleNestedDeliveryZoneData(e)} name="zoneName.ar" />
            </FormControl>

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Country
            </Typography>
            <CountrySelect
              name="country"
              variant="filled"
              value={deliveryZoneData?.country || ''}
              onChange={(event: any, value: any) => {

                setDeliveryZoneData({ ...deliveryZoneData, country: value.code || '' })

              }
              }
            />
            {/* <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Zone Name
            </Typography>
            <FormControl fullWidth>
              <RHFTextField fullWidth variant="filled" value={deliveryZoneData?.zoneName || ""} settingStateValue={(e: any) => handleDeliveryZoneData(e)} name="zoneName" />
            </FormControl> */}

            <Grid container alignItems="center" justifyContent="space-between" spacing="10px">
              <Grid xs={12} sm={6}>
                <Typography
                  mt="20px"
                  mb="5px"
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem' }}
                >
                  Delivery Fees
                </Typography>
                <RHFTextField fullWidth
                  variant="filled"
                  value={deliveryZoneData?.deliveryFees || ""}
                  settingStateValue={(e: any) => handleDeliveryZoneData(e)}
                  name="deliveryFees"
                  sx={{
                    '& .MuiInputAdornment-root': {
                      marginTop: '0px !important',
                    },
                    '& input': {
                      paddingRight: '2px !important',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Stack direction="row" alignItems="center" spacing="8px">
                          <Divider orientation="vertical" variant="middle" flexItem />
                          <Typography>KWD</Typography>
                        </Stack>
                      </InputAdornment>
                    ),
                  }} />
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography
                  mt="20px"
                  mb="5px"
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem' }}
                >
                  Min Order
                </Typography>
                <RHFTextField fullWidth
                  variant="filled"
                  value={deliveryZoneData?.minOrder || ""}
                  settingStateValue={(e: any) => handleDeliveryZoneData(e)}
                  name="minOrder"
                />
              </Grid>
            </Grid>

            <Typography
              mt="20px"
              mb="5px"
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Delivery Time
            </Typography>

            <FormControl fullWidth>
              <RHFTextField fullWidth
                variant="filled"
                value={deliveryZoneData?.deliveryTime || ""}
                settingStateValue={(e: any) => handleDeliveryZoneData(e)}
                name="deliveryTime"
                sx={{
                  '& .MuiInputAdornment-root': {
                    marginTop: '0px !important',
                  },
                  '& input': {
                    paddingRight: '2px !important',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Stack direction="row" alignItems="center" spacing="8px">
                        <Divider orientation="vertical" variant="middle" flexItem />
                        {/* <Typography>Minutes</Typography> */}

                        <Select
                          variant="standard"
                          name="deliveryTimeUnit"
                          value={deliveryZoneData?.deliveryTimeUnit || "Minutes"}
                          onChange={(e: any) => handleDeliveryZoneData(e)}
                          sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            "&::before": {
                              display: "none",
                            }
                          }}
                        >
                          <MenuItem value="Minutes">Minutes</MenuItem>
                          <MenuItem value="Hours">Hours</MenuItem>
                        </Select>

                      </Stack>
                    </InputAdornment>
                  ),
                }} />
            </FormControl>

            <FormControlLabel

              control={<Switch color="primary" size="medium" name='isPublished' checked={deliveryZoneData?.isPublished || false}
                onChange={(e: any) => {
                  setDeliveryZoneData({ ...deliveryZoneData, isPublished: e.target.checked })
                }} />}
              label="Published"
              labelPlacement="end"
              sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
            />

          </Box>
        </FormProvider>
      </DetailsNavBar>

      {timerDialogOpen && (
        <ShowTimerDialog
          index={timerDialogData.index}
          prevData={timerDialogData.prevData}
          property={timerDialogData.property}
          updateWorkingHours={updateWorkingHours}
          closeDialog={closeTimerDialog}
        />
      )}
    </Box>
  );
}
const ShowTimerDialog = ({ index, prevData, property, updateWorkingHours, closeDialog }: any) => {
  const [selectedTime, setSelectedTime] = useState<any>(prevData || '');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const errorObj = {
      start: "",
      end: ""
    };
    if (selectedTime) {
      if (!selectedTime.start || selectedTime.start === "") {
        errorObj.start = "Start Time is Required!";
      }
      if (!selectedTime.end || selectedTime.end === "") {
        errorObj.end = "End Time is Required!";
      }
      setError(errorObj)
    }
  }, [selectedTime])


  const submitData = () => {
    if (error.start === "" && error.end === "") {
      updateWorkingHours(index, { ...prevData, ...selectedTime });
      closeDialog();
    }
  }


  return (
    <Dialog maxWidth="xs" open>
      <DialogTitle>Select Time</DialogTitle>
      <DialogContent>
        <Typography
          mb="5px"
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Start Time
        </Typography>
        <TimePicker defaultValue={selectedTime?.start} onChange={(e) => setSelectedTime({ ...selectedTime, start: e })} />
        <Typography
          component="p"
          noWrap
          variant="caption"
          color="#fb4921"
          sx={{ fontSize: '.7rem' }}
        >
          {error?.start}
        </Typography>

        <Typography
          mt="20px"
          mb="5px"
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          End Time
        </Typography>
        <TimePicker defaultValue={selectedTime?.end} onChange={(e) => setSelectedTime({ ...selectedTime, end: e })} />
        <Typography
          component="p"
          noWrap
          variant="caption"
          color="#fb4921"
          sx={{ fontSize: '.7rem' }}
        >
          {error?.end}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={submitData}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
