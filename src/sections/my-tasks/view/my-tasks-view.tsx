/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ListItemIcon from '@mui/material/ListItemIcon';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import Linker from 'src/sections/overview/subscription-plan/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  tasks: [
    { value: 'All', label: 'All Tasks' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ],
  calls: [
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]
};
const monthsAbbreviated = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
// ----------------------------------------------------------------------

export default function MyTasksViewFile() {

  const settings = useSettingsContext();

  const [value, setValue] = useState({
    tasks: 'All',
    calls: 'Upcoming',
  });

  const [activeCategory, setActiveCategory] = useState('tasks');

  const handleChangeCategory = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setActiveCategory(newValue);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    // setValue(newValue);
    setValue(pv => ({ ...pv, [activeCategory]: newValue }))
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };







  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' rowSpacing="10px" columnSpacing={{ xs: '10px', }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCrumbs heading="My Tasks"
            description='Do you want any help or custom request?'
            crums={false} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Stack
            sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '7px 5px' }}
            direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            <Button onClick={handleChangeCategory('tasks')}
              fullWidth variant='contained'
              sx={
                activeCategory === "tasks" ?
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
            > Tasks </Button>
            <Button onClick={handleChangeCategory('calls')}
              fullWidth variant='contained'
              sx={
                activeCategory === "calls" ? {
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
            > Calls </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TextField
            placeholder='Search...'
            fullWidth
            variant='filled'
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Box component='img' src='/raw/search.svg' sx={{ width: '15px' }} />
              </InputAdornment>,
            }}
            sx={{
              '& .MuiInputAdornment-root': {
                marginTop: '0px !important',
                paddingLeft: '10px'
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <BottomActions>
            <Box sx={{ flexGrow: 1, width: '100%', }} >
              <Box sx={{ maxWidth: { xs: '100%', sm: '160px' } }} >
                <Linker path={paths.dashboard.tasks.book}>
                  <Button fullWidth variant='contained' color='primary' startIcon={<Box component='img' src='/raw/OverZaki.svg' />} sx={{
                    // background: `transparent linear-gradient(270deg, #1BFCB6 0%, #0DE5FD 100%) 0% 0% no-repeat padding-box`,
                    color: '#0F1349', fontWeight: 900, padding: '6px 23px', fontSize: '13px', borderRadius: '30px', maxHeight: '44px',
                    boxShadow: '0px 6px 20px #1BFCB633', justifyContent: 'space-around'
                  }} >
                    Book Me
                  </Button>
                </Linker>
              </Box>
            </Box>
          </BottomActions>

        </Grid>

        <Grid item xs={12}>
          {activeCategory === "tasks" &&
            <Box>
              <TabContext value={value.tasks}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons={false}
                    sx={{
                      px: 2.5,
                      boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    {STATUS_OPTIONS.tasks.map((tab) => (
                      <Tab
                        key={tab.value}
                        iconPosition="end"
                        value={tab.value}
                        label={tab.label}
                      />
                    ))}
                  </TabList>
                </Box>

                <TabPanel value={value.tasks} sx={{ px: 0, pb: 0 }}>
                  <Grid container spacing={2}>
                    {([
                      {
                        hashID: '#425453697',
                        time: "22/03/2022, 3:54 PM",
                        title: 'Add Header Background',
                        des: "It is a long established fact that a read will be distracted by the readable content.",
                        price: 120,
                        status: 'Pending',
                      }, {
                        hashID: '#425453697',
                        time: "22/03/2022, 3:54 PM",
                        title: 'Edit Home Page',
                        des: "It is a long established fact that a read will be distracted by the readable content.",
                        price: 199,
                        status: 'Processing',
                      }, {
                        hashID: '#425453697',
                        time: "22/03/2022, 3:54 PM",
                        title: 'Edit Home Page',
                        des: "It is a long established fact that a read will be distracted by the readable content.",
                        price: 199,
                        status: 'Completed',
                      }, {
                        hashID: '#425453697',
                        time: "22/03/2022, 3:54 PM",
                        title: 'Edit Home Page',
                        des: "It is a long established fact that a read will be distracted by the readable content.",
                        price: 199,
                        status: 'Cancelled',
                      },
                    ].filter(item => item.status === value.tasks ? true : value.tasks === "All")).map((product, indx) =>
                      <Grid item xs={12} sm={6} md={4} key={indx}>
                        <Paper sx={{ borderRadius: '16px', boxShadow: '0px 4px 20px #0F134914' }}>
                          <Grid container item alignItems='center' justifyContent='space-between' rowGap="10px" sx={{ p: "30px 22px", minHeight: '150px', boxShadow: '0px 6px 20px #00000014', borderRadius: '16px' }}>
                            <Grid item xs={12} sx={{ minHeight: '53px' }}>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Box>
                                  <Typography component='p' variant="subtitle2" color="#8688A3">
                                    #425453697
                                  </Typography>
                                  <Typography component='p' variant="subtitle2" color="#8688A3">
                                    22/03/2022, 3:54 PM
                                  </Typography>
                                </Box>
                                <Box>
                                  {product.status === "Pending" && <Box component='span' sx={{
                                    color: "#0F1349",
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    borderRadius: '10px',
                                    padding: '4px 12px',
                                    background: '#F1D169'
                                  }} >Pending</Box>}

                                  {product.status === "Processing" && <Box component='span' sx={{
                                    color: "#0F1349",
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    borderRadius: '10px',
                                    padding: '4px 12px',
                                    background: '#CBC2FF'
                                  }} >Processing</Box>}

                                  {product.status === "Completed" && <Box component='span' sx={{
                                    color: "#0F1349",
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    borderRadius: '10px',
                                    padding: '4px 12px',
                                    background: '#1BFCB6'
                                  }} >Completed</Box>}

                                  {product.status === "Cancelled" && <Box component='span' sx={{
                                    color: "#0F1349",
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    borderRadius: '10px',
                                    padding: '4px 12px',
                                    background: '#FF9FAF'
                                  }} >Cancelled</Box>}
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} > {product.title} </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography component='p' variant="subtitle2" color="#8688A3" sx={{ mb: '20px', fontSize: '.8rem' }} > {product.des} </Typography>
                            </Grid>

                            <Grid item xs='auto'>
                              {product.status === "Pending" ?
                                <Button
                                  endIcon={<Iconify icon="iconamoon:arrow-right-2" />}
                                  sx={{
                                    backgroundColor: 'rgb(15, 19, 73)',
                                    '&:hover': { backgroundColor: 'rgb(15, 19, 73)' },
                                    color: 'white', fontSize: '13px', borderRadius: '20px',
                                    padding: "8px 25px", boxShadow: '0px 6px 20px #00000033'
                                  }}>
                                  Pay To Start
                                </Button>
                                :
                                <Button
                                  disabled
                                  startIcon={<Iconify icon="uim:clock" />}
                                  sx={{
                                    backgroundColor: '#F5F5F8',
                                    '&:hover': { backgroundColor: '#F5F5F8' },
                                    color: 'white', fontSize: '13px', borderRadius: '20px',
                                    padding: "8px 25px", boxShadow: '0px 6px 20px #00000033'
                                  }}>
                                  1 d : 14 hr : 45 min
                                </Button>
                              }
                            </Grid>

                            <Grid item xs="auto">
                              <Typography component='p' variant="subtitle2" color="#8688A3" sx={{ fontSize: '.9rem' }} > {product.price} KWD </Typography>
                            </Grid>

                          </Grid>
                        </Paper>
                      </Grid>
                    )}

                  </Grid>
                </TabPanel>

              </TabContext>
            </Box>}
          {activeCategory === "calls" &&
            <Box>
              <TabContext value={value.calls}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons={false}
                    sx={{
                      px: 2.5,
                      boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    {STATUS_OPTIONS.calls.map((tab) => (
                      <Tab
                        key={tab.value}
                        iconPosition="end"
                        value={tab.value}
                        label={tab.label}
                      />
                    ))}
                  </TabList>
                </Box>

                <TabPanel value={value.calls} sx={{ px: 0, pb: 0 }}>
                  <Grid container spacing={2}>
                    {([
                      {
                        date: "Sun, 11 June, 2023",
                        time: "10:00 AM - 10:30 AM",
                        title: 'Support session (30 mins)',
                        status: 'Upcoming',
                      },
                      {
                        date: "Fri, 24 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Upcoming',
                      },
                      {
                        date: "Fri, 26 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Upcoming',
                      }, {
                        date: "Fri, 24 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Completed',
                      },
                      {
                        date: "Fri, 26 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Completed',
                      }, {
                        date: "Fri, 24 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Cancelled',
                      },
                      {
                        date: "Fri, 26 August, 2023",
                        time: "12:15 PM - 12:30 PM",
                        title: 'Support session (15 mins)',
                        status: 'Cancelled',
                      },
                    ].filter(item => item.status === value.calls)).map((product, indx) => {
                      const date = new Date(product.date);
                      const monthIndex = date.getMonth();
                      return <Grid item xs={12} sm={6} md={4} key={indx}>
                        <Paper sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px #0F134914', padding: '20px 25px' }}>

                          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing='20px'>
                            <Stack alignItems='center' justifyContent='center' spacing='0px'
                              sx={{
                                background: '#1BFCB6',
                                borderRadius: '12px',
                                minHeight: '95px',
                                height: 'inherit',
                                minWidth: '60px'
                              }}
                            >
                              <Typography variant='h3'>
                                {date.getDate()}
                              </Typography>

                              <Typography fontWeight={900} fontSize='14px'>
                                {monthsAbbreviated[monthIndex]}
                              </Typography>
                            </Stack>
                            <Box sx={{ flexGrow: 1 }}>
                              <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ columnSpacing: '20px' }}>
                                <Typography component='p' fontSize='11px' variant="subtitle2" color="#8688A3">
                                  {product.date}
                                </Typography>
                                <Iconify icon="bi:three-dots" onClick={handleClick} style={{ cursor: 'pointer' }} />
                              </Stack>
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '1.1rem', fontWeight: 900 }} >
                                {product.title} </Typography>
                              <Button
                                disabled
                                startIcon={<Iconify icon="uim:clock" />}
                                sx={{
                                  color: 'white', fontSize: '13px', borderRadius: '20px',
                                  padding: "8px 0px", boxShadow: '0px 6px 20px #00000033'
                                }}>
                                1 d : 14 hr : 45 min
                              </Button>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                    })}

                  </Grid>
                </TabPanel>

              </TabContext>
            </Box>}


        </Grid>
      </Grid>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify icon="ic:baseline-edit" />
          </ListItemIcon>
          <Typography variant="button">Edit Call Time</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify icon="iconamoon:close" />
          </ListItemIcon>
          <Typography variant="button">Cancel Call</Typography>
        </MenuItem>

      </Menu>
    </Container >
  );
}
