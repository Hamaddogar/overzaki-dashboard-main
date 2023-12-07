/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/default-param-last */

'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
// import { TimePicker } from 'material-ui-time-picker';
// import TimeInput from 'material-ui-time-picker'

// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Button, TextField, Typography, FormControlLabel, Switch, Card, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { Stack, Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';



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



const MapDraggableMarkers = dynamic(() => import('../../_examples/extra/map-view/draggable-markers'));
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


//
const data = [
  {
    name: 'Adailiya',
    active: true,
    deliveryFee: 5,
    minOrders: 20,
    deliveryTime: 60,
  }, {
    name: 'Bnied Al-Gar',
    active: false,
    deliveryFee: 5,
    minOrders: 20,
    deliveryTime: 45,
  }, {
    name: 'Faiha',
    active: true,
    deliveryFee: 5,
    minOrders: 30,
    deliveryTime: 120,
  },
]
// ----------------------------------------------------------------------

interface DropDownState {
  government: any;
  zone: any;
  dfee: any;
  mo: any;
  dt: any;
}

// ----------------------------------------------------------------------

export default function AccountView() {

  const [openTime, setOpenTime] = useState({ open: false });



  const settings = useSettingsContext();
  const [activeSection, setActiveSection] = React.useState('Location Info');
  const [currency, setCurrency] = React.useState("Default Currency");

  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const [timerDialogData, setTimerDialogData] = useState<any>({ index: null, prevData: null, property: null });


  const [workingHours, setWorkingHours] = useState<any>([
    {
      day: "saturday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "sunday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "monday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "tuesday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "wednesday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "thursday",
      status: false,
      start: "",
      end: ""
    },
    {
      day: "friday",
      status: false,
      start: "",
      end: ""
    },
  ]);


  const updateWorkingHours = (index: any = null, newData: any) => {
    console.log("index", index);
    console.log("newData", newData);

    setWorkingHours((prev: any) => (
      prev.map((obj: any, indx: any) => indx === index ? newData : obj)
    ));
  }




















  // ----------------------------------------------------------------------------------
  const handleChangeSection = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setActiveSection(newValue);
  };

  const [openDetails, setOpenDetails] = React.useState(false);
  const [dropDown, setDropDown] = React.useState<DropDownState>({
    government: 'Ahmadi Governorate',
    zone: 'Faiha',
    dfee: '5 KWD',
    mo: '20 KWD',
    dt: '60 mins',
  })

  const handleChangeDropDown = (changeTo?: string | undefined | null) => (event: SelectChangeEvent) => {
    if (changeTo === "currancy") setCurrency(event.target.value as string);

    else if (changeTo === "gov") setDropDown(pv => ({ ...pv, government: event.target.value as string }))
    else if (changeTo === "dfee") setDropDown(pv => ({ ...pv, dfee: event.target.value as string }))
    else if (changeTo === "mo") setDropDown(pv => ({ ...pv, mo: event.target.value as string }))
    else if (changeTo === "dt") setDropDown(pv => ({ ...pv, dt: event.target.value as string }))
    else if (changeTo === "zone") setDropDown(pv => ({ ...pv, zone: event.target.value as string }))
  };

  // common
  const toggleDrawerCommon = (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "new") setOpenDetails(pv => !pv)
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }
    if (state === "new") setOpenDetails(false)
  };


  const openModal = (index: any, prevData: any, property: any) => {
    if (index && prevData) {
      setTimerDialogData({ index, prevData, property });
      setTimerDialogOpen(true);
      // console.log("funcation called");
      // return <ShowTimerDialog index={index} prevData={prevData} property={property} updateWorkingHours={updateWorkingHours} />
    }
  }
  const closeTimerDialog = () => {
    setTimerDialogOpen(false);
    setTimerDialogData({ index: null, prevData: null, property: null })
  };


  return (<Box>
    <Box sx={{ boxShadow: '0px 3px 20px #00000014', p: "20px", m: { xs: '0px', md: '-10px -15px 0px -15px' } }}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid xs={12} sm={12} md={3}>
          <CustomCrumbs
            heading='Add New Location'
            crums={false}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Stack
            sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
            direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            <Button onClick={handleChangeSection('Location Info')}
              fullWidth variant='contained'
              sx={
                activeSection === "Location Info" ?
                  {
                    borderRadius: '12px',
                    color: '#0F1349',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 6px 20px #00000033',
                    '&:hover': { backgroundColor: '#FFFFFF', }
                  }
                  :
                  {
                    borderRadius: '12px',
                    color: '#8688A3',
                    backgroundColor: 'background.neutral',
                    '&:hover': { backgroundColor: 'background.neutral' }
                  }}
            > Location Info </Button>

            {/* Delivery Zones */}
            <Button onClick={handleChangeSection('Delivery Zones')}
              fullWidth variant='contained'
              sx={
                activeSection === "Delivery Zones" ? {
                  borderRadius: '12px',
                  color: '#0F1349',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 6px 20px #00000033',
                  '&:hover': { backgroundColor: '#FFFFFF', }
                }
                  :
                  {
                    borderRadius: '12px',
                    color: '#8688A3',
                    backgroundColor: 'background.neutral',
                    '&:hover': { backgroundColor: '#FFFFFF', }
                  }}
            > Delivery Zones </Button>
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing={{ xs: '10px', sm: '15px' }} sx={{ width: '100%', }}>
              <Linker path={paths.dashboard.deliveryPickup.root} width='100%'>
                <Button fullWidth sx={{ borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }} component='h5' variant='contained'  > Cancel </Button>
              </Linker>
              <Linker path={paths.dashboard.deliveryPickup.root} width='100%'>
                <Button fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary'  > Save </Button>
              </Linker>
            </Stack>
          </BottomActions>
        </Grid>
      </Grid>
    </Box>

    {/* body */}
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mt: '30px' }}>
      {activeSection === "Location Info" && <Box>
        <Box sx={{ maxWidth: '700px', width: '100%' }}>
          <Typography variant='h5' component='h5' mb='30px'>
            Details
          </Typography>
          <Grid container alignItems='center' rowSpacing="20px" columnSpacing="20px" sx={{ mt: '20px' }}>
            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Branch Name (English)
              </Typography>
              <TextField fullWidth variant='filled' defaultValue='Main Branch' name='Main Branch' />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Branch Name (Arabic)
              </Typography>
              <TextField fullWidth variant='filled' defaultValue='الفرع الرئيسي' name='Main Branch' />
            </Grid>

            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Country
              </Typography>
              <TextField fullWidth variant='filled' defaultValue='965128743291' name='PHONE'
                sx={{
                  '& .MuiInputAdornment-root': {
                    marginTop: '0px !important',
                    // paddingLeft: '10px'
                  },
                  '& input': {
                    paddingLeft: '2px !important'
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <Stack direction='row' alignItems='center' spacing="8px">
                      {/* <Iconify icon="mingcute:down-fill" width={43} /> */}
                      <Box component='img' src='/raw/flagN.png' />
                      {/* <Divider orientation="vertical" variant='middle' flexItem /> */}
                    </Stack>
                  </InputAdornment>,
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Currency
              </Typography>
              <FormControl fullWidth>
                <Select
                  variant='filled'
                  value={currency}
                  onChange={handleChangeDropDown('currency')}
                >
                  <MenuItem value='Default Currency'>Default Currency</MenuItem>
                  <MenuItem value='KWD'>KWD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Mobile Number
              </Typography>
              <TextField fullWidth variant='filled' defaultValue='965128743291' name='PHONE'
                sx={{
                  '& .MuiInputAdornment-root': {
                    marginTop: '0px !important',
                    // paddingLeft: '10px'
                  },
                  '& input': {
                    paddingLeft: '2px !important'
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <Stack direction='row' alignItems='center' spacing="8px">
                      <Iconify icon="mingcute:down-fill" width={43} />
                      <Box component='img' src='/raw/flagN.png' />
                      <Divider orientation="vertical" variant='middle' flexItem />
                    </Stack>
                  </InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: '50px' }}>
          <Divider sx={{ borderWidth: '1px' }} />
        </Box>

        <Box sx={{ maxWidth: '700px', width: '100%' }}>
          <Typography variant='h5' component='h5' mb='30px'>
            Location Information
          </Typography>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography variant='body2' color="#8688A3">
                Location On Map
              </Typography>
              <Typography variant='caption' component='p' color="#8688A3">
                Google Maps
              </Typography>
            </Box>
            <Box>
              <Button startIcon={<Iconify icon="fluent:location-12-filled" />} sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }} component='h5' variant='contained' color='primary'  >
                Pin Location
              </Button>
            </Box>
          </Stack>
          <Grid container alignItems='center' rowSpacing="20px" columnSpacing="20px" sx={{ mt: '20px' }}>
            <Grid xs={12}>
              {/* <Box sx={{ minHeight: '150px', backgroundColor: '#CFCFCF', borderRadius: '16px' }} /> */}
              <Box sx={{ minHeight: '150px', borderRadius: '16px' }} >
                <StyledMapContainer>
                  <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light} />
                </StyledMapContainer>
              </Box>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Address (English)
              </Typography>
              <TextField fullWidth variant='filled' defaultValue='Kuwait, Al Nuzha, 502 street' name='Main Branch' />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography component='p' noWrap variant="caption" color="#8688A3" sx={{ ml: '5px', mb: '5px' }} >
                Address (Arabic)
              </Typography>
              <TextField fullWidth variant='filled' defaultValue="الكويت, النزهة, 502 شارع" name='Main Branch' />
            </Grid>

          </Grid>
        </Box>

        <Box sx={{ my: '20px' }}>
          <Divider sx={{ borderWidth: '1px' }} />
        </Box>

        <Box sx={{ maxWidth: '700px', width: '100%' }}>
          {/* Delivery & Pick Up */}
          <Typography variant='h5' component='h5' mb='30px'>
            Delivery & Pick Up
          </Typography>
          <Grid container alignItems='center' rowSpacing="5px" columnSpacing="5px" sx={{ mt: '20px' }}>
            <Grid xs={12}>
              <FormControlLabel
                control={<Switch color='primary' size='medium' defaultChecked />}
                label="Allow Pick Up Orders"
                labelPlacement="end"
                sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
              />
            </Grid>
            <Grid xs={12}>
              <FormControlLabel
                control={<Switch color='primary' size='medium' />}
                label="Allow Delivery Orders"
                labelPlacement="end"
                sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField fullWidth variant='filled' name='tax'
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
                  endAdornment: <InputAdornment position="end">
                    <Typography variant='caption' sx={{ fontWeight: 900 }} >
                      5 &nbsp; KWD
                    </Typography>
                  </InputAdornment>,
                }}
                placeholder='Delivery Fees'
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: '20px' }}>
          <Divider sx={{ borderWidth: '1px' }} />
        </Box>

        <Box sx={{ maxWidth: '700px', width: '100%' }}>
          {/* Delivery & Pick Up */}
          <Typography variant='h5' component='h5' >
            Working Hours
          </Typography>
          <Typography variant='caption' mb='30px'>
            Customize your actual working hours for each day.
          </Typography>
          <Grid container alignItems='center' rowSpacing="25px" columnSpacing="5px" sx={{ mt: '20px' }}>

            {workingHours.map((dataObj: any, index: any) => (
              <Grid xs={12} key={index} >
                <FormControlLabel
                  label={<Typography sx={{ fontWeight: 900, color: dataObj.status ? 'auto' : '#8688A3' }}>
                    {`${String(dataObj?.day).toUpperCase()}`} <Typography component="sup" style={{ fontWeight: 400, fontSize: '11px' }} >{dataObj.status ? "(Available)" : "(Not Available)"}</Typography>
                  </Typography>}
                  control={<Checkbox size='medium' onChange={() => updateWorkingHours(index, { ...dataObj, status: !dataObj.status })} checked={!!dataObj.status} />} />
                {dataObj.status && (
                  <Box>
                    <Stack direction='row' alignItems='center' spacing='20px' >
                      <Stack direction='row' justifyContent='space-between' spacing='10px' >
                        <Typography component='p' variant="subtitle2" color='#8688A3'> From </Typography>
                        <Typography component='p' variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', fontWeight: 900 }}
                          onClick={() => {
                            setTimerDialogData({ index, prevData: dataObj, property: 'start' } as any);
                            setTimerDialogOpen(true);
                          }}
                        >
                          {dataObj.start || "hh:mm A"} <Iconify icon="material-symbols:keyboard-arrow-down-rounded" /> </Typography>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between' spacing='10px' >
                        <Typography component='p' variant="subtitle2" color='#8688A3'> To </Typography>
                        <Typography component='p' variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', fontWeight: 900 }}
                          onClick={() => {
                            setTimerDialogData({ index, prevData: dataObj, property: 'end' } as any);
                            setTimerDialogOpen(true);
                          }}
                        > {dataObj.end || "hh:mm A"}  <Iconify icon="material-symbols:keyboard-arrow-down-rounded" /> </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                )}
              </Grid>
            ))}


          </Grid>
        </Box>
      </Box>}
      {
        activeSection === "Delivery Zones" && <Box>
          <Box sx={{ maxWidth: '700px', width: '100%' }}>
            <Typography variant='h5' component='h5' mb='30px'>
              Delivery Zones
            </Typography>

            <Grid container alignItems='center' rowSpacing="20px" columnSpacing="20px" sx={{ mt: '20px' }}>
              <Grid xs={12}>
                <Box sx={{ minHeight: '150px', backgroundColor: '#CFCFCF', borderRadius: '16px' }} />
              </Grid>

              <Grid xs={12}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h6' sx={{ fontSize: '1rem' }} >
                    3 Delivery Zones
                  </Typography>
                  <Box sx={{ minWidth: '100px' }}>
                    <Button fullWidth onClick={toggleDrawerCommon('new')} startIcon={<Iconify icon="mingcute:add-fill" />} sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }} component='h5' variant='contained' color='primary'  >
                      Add
                    </Button>
                  </Box>
                </Stack>
              </Grid>

              {
                data.map((location, indx) => (<Grid xs={12}>
                  <Box
                    component={Card}
                    key={indx}
                    sx={{
                      p: '23px',
                      boxShadow: '0px 4px 20px #0F134914',
                      borderRadius: '16px'
                    }}
                  >
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Iconify icon="carbon:location-filled" />
                        <span>{location.name}</span>
                      </Typography>

                      <Stack direction='row' alignItems='center' columnGap='15px'>
                        <Box sx={{
                          height: '36px',
                          width: '36px',
                          borderRadius: '20px',
                          backgroundColor: 'rgb(134, 136, 163,.09)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Iconify icon="ic:round-edit" />
                        </Box>
                        <Box sx={{
                          height: '36px',
                          width: '36px',
                          borderRadius: '20px',
                          backgroundColor: 'rgb(134, 136, 163,.09)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Iconify icon="uiw:delete" />
                        </Box>
                        <Switch color='primary' checked={location.active} />
                      </Stack>
                    </Stack>
                    <Stack mt='10px' direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='body2' color='#8688A3' sx={{ fontWeight: 500 }}>  Delivery Fees  </Typography>
                      <Typography variant='body2' sx={{ fontWeight: 700 }}>  {location.deliveryFee} KWD  </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='body2' color='#8688A3' sx={{ fontWeight: 500 }}>  Minimum Order  </Typography>
                      <Typography variant='body2' sx={{ fontWeight: 700 }}>  {location.minOrders} KWD  </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='body2' color='#8688A3' sx={{ fontWeight: 500 }}>  Delivery Time  </Typography>
                      <Typography variant='body2' sx={{ fontWeight: 700 }}>  {location.deliveryTime} mins  </Typography>
                    </Stack>
                  </Box>
                </Grid>))
              }




            </Grid>
          </Box>

        </Box>
      }
    </Container >


    <DetailsNavBar
      open={openDetails}
      onClose={handleDrawerCloseCommon('new')}
      title="Add Delivery Zone"
      actions={<Stack alignItems='center' justifyContent='center' spacing="10px">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: '30px', boxShadow: '0px 6px 20px #1BFCB633' }}
        >
          Save
        </Button>
      </Stack>}
    >

      <Divider flexItem />

      <Box width='100%'>
        <Typography mt='5px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
          Select Zone on Map
        </Typography>

        <Box sx={{
          minHeight: '140px',
          borderRadius: '16px',
          backgroundColor: '#FAFAFB'
        }} />



        <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
          Government
        </Typography>

        <FormControl fullWidth>
          <Select
            variant='filled'
            value={dropDown.government}
            onChange={handleChangeDropDown('gov')}
          >
            <MenuItem value='Ahmadi Governorate'>Ahmadi Governorate</MenuItem>
            <MenuItem value='None'>None</MenuItem>
          </Select>
        </FormControl>

        <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
          Zone Name
        </Typography>

        <FormControl fullWidth>
          <Select
            variant='filled'
            value={dropDown.zone}
            onChange={handleChangeDropDown('zone')}
          >
            <MenuItem value='Faiha'>Faiha</MenuItem>
            <MenuItem value='Bnied Al-Gar'>Bnied Al-Gar</MenuItem>
            <MenuItem value='Adailiya'>Adailiya</MenuItem>
          </Select>
        </FormControl>



        <Grid container alignItems='center' justifyContent='space-between' spacing='10px'>
          <Grid xs={12} sm={6}>
            <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
              Delivery Fees
            </Typography>
            <TextField
              variant='filled'
              fullWidth
              defaultValue="5 KWD"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
              Min Order (Optional)
            </Typography>
            <TextField
              variant='filled'
              fullWidth
              defaultValue="20 KWD"
            />
          </Grid>
        </Grid>

        <Typography mt='20px' mb='5px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
          Delivery Time
        </Typography>

        <FormControl fullWidth>
          <Select
            variant='filled'
            value={dropDown.dt}
            onChange={handleChangeDropDown('dt')}
          >
            <MenuItem value='60 mins'>60 mins</MenuItem>
            <MenuItem value='90 mins'>90 mins</MenuItem>
          </Select>
        </FormControl>


      </Box>
    </DetailsNavBar>


    {
      timerDialogOpen && (
        <ShowTimerDialog
          index={timerDialogData.index}
          prevData={timerDialogData.prevData}
          property={timerDialogData.property}
          updateWorkingHours={updateWorkingHours}
          closeDialog={closeTimerDialog}
        />
      )
    }


  </Box >
  );
}
const ShowTimerDialog = ({ index, prevData, property, updateWorkingHours, closeDialog }: any) => {
  const [selectedTime, setSelectedTime] = useState<any>(prevData[property] || "");
  const [openTime, setOpenTime] = useState(true);

  console.log(prevData[property]);
  console.log("selectedTime", selectedTime);


  return (
    <Dialog maxWidth="xs" open={openTime}>
      <DialogTitle>Select Time</DialogTitle>
      <DialogContent>
        <TimePicker
          value={selectedTime}
          onChange={(e) => setSelectedTime(e)}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => setOpenTime(false)} color="primary"> */}
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateWorkingHours(index, { ...prevData, [property]: selectedTime !== "" ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "" });
            closeDialog();
          }}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};