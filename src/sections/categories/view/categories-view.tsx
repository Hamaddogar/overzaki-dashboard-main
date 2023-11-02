/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useState } from 'react';
// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { BottomActions } from 'src/components/bottom-actions';

// ----------------------------------------------------------------------

export default function CategoriesView() {

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [activeCategory, setActiveCategory] = useState('main');

  const [mySubCat, setMySubCat] = React.useState('Electronic Devices');

  const [category, setCategory] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  const handleChangeCategory = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setActiveCategory(newValue);
  };


  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setMySubCat(event.target.value as string);
  };

  // common
  const toggleDrawerCommon = (state: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (state === "cat") setCategory(pv => !pv)
    else if (state === "sub") setSubCategory(pv => !pv)
  };

  const handleDrawerCloseCommon = (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    if (state === "cat") setCategory(false)
    else if (state === "sub") setSubCategory(false)
  };


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs heading="Categories"
            description="Do you want any help or custom request?"
            crums={false} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack
            sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
            direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            <Button onClick={handleChangeCategory('main')}
              fullWidth variant='contained'
              sx={
                activeCategory === "main" ?
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
            > Categories </Button>
            <Button onClick={handleChangeCategory('sub')}
              fullWidth variant='contained'
              sx={
                activeCategory === "sub" ? {
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
            > Subcategories </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider flexItem sx={{ my: '20px' }} />
        </Grid>

        {activeCategory === "main" && <>
          <Grid item xs={12} sm={6}>
            <Typography component='h5' variant="h5">
              You have 3 categories
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
            <BottomActions>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}>
                <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='button' variant='contained' color='primary'
                  onClick={toggleDrawerCommon('cat')}
                >
                  Add New Category </Button>
              </Stack>
            </BottomActions>


          </Grid>


          <Grid item xs={12} container sx={{ mt: '20px' }} spacing={2}>
            {
              [
                {
                  name: "Electronic Devices",
                  img: '/raw/c1.png',
                  tproduct: 30,
                  tcategpries: 2
                },
                {
                  name: "Clothes",
                  img: '/raw/c2.png',
                  tproduct: 48,
                  tcategpries: 3
                },
                {
                  name: "Women Perfume",
                  img: '/raw/c3.png',
                  tproduct: 4,
                  tcategpries: 0
                },
              ].map((order, indx) =>
                <Grid key={indx} item xs={12}>
                  <Paper elevation={4} sx={{ border: '2px solid #FFFFFF', '&:hover': { border: '2px solid #1BFCB6' } }}>
                    <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 1.5 } }}>



                      <Grid item xs='auto' >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                          }}
                        >
                          <Iconify icon="ci:drag-vertical" />
                          <Box component='img' src={order.img} alt=" " width='60px' />
                          <Box display='flex' gap='0px' flexDirection='column' >
                            <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800 }} > {order.name} </Typography>
                            <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                              {order.tcategpries} subcategories -   {order.tproduct} products
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs='auto' textAlign='right'>
                        <Iconify icon="carbon:delete" onClick={() => {
                          confirm.onTrue();
                        }} /> &nbsp; &nbsp; &nbsp;
                        <Iconify icon="bx:edit" onClick={toggleDrawerCommon('cat')} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )}
          </Grid >
        </>}

        {activeCategory === "sub" && <>
          <Grid item xs={12} sm={6}>
            <Typography component='h5' variant="h5">You have 10 subcategories </Typography>
          </Grid>

          <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
            <BottomActions>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', sm: 'flex-end' }} spacing='10px' sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}>
                <Button startIcon="+" fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='button' variant='contained' color='primary'
                  onClick={toggleDrawerCommon('sub')}
                >Add New Subcategory </Button>
              </Stack>
            </BottomActions>
          </Grid>


          <Grid item xs={12} container spacing={2}>
            {
              [
                {
                  cat: "Electronic Devices",
                  items: [
                    {
                      name: "Smart Mobiles",
                      img: '/raw/sc1.png',
                      tproduct: 30,
                      tcategpries: 2
                    },
                    {
                      name: "Laptops & Computers",
                      img: '/raw/sc2.png',
                      tproduct: 48,
                      tcategpries: 3
                    },
                  ]
                },
                {
                  cat: "Clothes",
                  items: [
                    {
                      name: "Men",
                      img: '/raw/sc3.png',
                      tproduct: 30,
                      tcategpries: 2
                    }
                  ]
                }
              ].map((subCat, indx) =>
                <React.Fragment key={indx}>
                  <Grid item xs={12} sx={{ mt: '20px' }}>
                    <Typography component='p' variant="subtitle2" sx={{ fontSize: '1rem', fontWeight: 800 }} > {subCat.cat} </Typography>
                    <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                      {subCat.items.length} subcategories
                    </Typography>
                  </Grid>
                  {subCat?.items.map((order, index) => <Grid key={index} item xs={12}>
                    <Paper elevation={4} sx={{ border: '2px solid #FFFFFF', '&:hover': { border: '2px solid #1BFCB6' } }}>
                      <Grid container item alignItems='center' justifyContent='space-between' rowGap={3} sx={{ px: 3, py: { xs: 1.5 } }}>
                        <Grid item xs='auto' >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '15px'
                            }}
                          >
                            <Iconify icon="ci:drag-vertical" />
                            <Box component='img' src={order.img} alt=" " width='60px' />
                            <Box display='flex' gap='0px' flexDirection='column' >
                              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800 }} > {order.name} </Typography>
                              <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
                                {order.tcategpries} subcategories -   {order.tproduct} products
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs='auto' textAlign='right'>
                          <Iconify icon="carbon:delete" onClick={() => {
                            confirm.onTrue();
                          }} /> &nbsp; &nbsp; &nbsp;
                          <Iconify icon="bx:edit" onClick={toggleDrawerCommon('cat')} />
                        </Grid>



                      </Grid>
                    </Paper>
                  </Grid>)}
                </React.Fragment>
              )}
          </Grid >
        </>}
      </Grid >


      {/* add and edit Item */}
      <DetailsNavBar
        open={category}
        onClose={handleDrawerCloseCommon('cat')}
        title="Add New Category"
        actions={<Stack alignItems='center' justifyContent='center' spacing="10px">
          <Button
            fullWidth
            variant="soft"
            color="success"
            size="large"
            sx={{ borderRadius: '30px' }}
          >
            Save
          </Button>
        </Stack>}>
        <Divider flexItem />
        <Box width='100%'>
          <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Name (English)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='Electronic Devices' name='itemname' />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Name (Arabic)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='الأجهزة الإلكترونية' name='itemname' />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Image
          </Typography>

          <Stack direction='row' spacing='10px'>
            <Box>
              <Box component='img' src='/raw/c1.png' alt='' />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box sx={{ backgroundColor: 'rgb(134, 136, 163,.09)', padding: '10px 11px 7px 11px', borderRadius: '36px' }}>
                  <Iconify icon="ic:baseline-edit" style={{ color: '#8688A3' }} />
                </Box>

                <Box sx={{ backgroundColor: 'rgb(134, 136, 163,.09)', padding: '10px 11px 7px 11px', borderRadius: '36px' }}>
                  <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                </Box>

              </Box>
              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                Maximum size is 5mb
              </Typography>

              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                You can use these extensions PNG or JPG
              </Typography>





            </Box>
          </Stack>
        </Box>
      </DetailsNavBar>


      {/* subcategory Item */}
      <DetailsNavBar
        open={subCategory}
        onClose={handleDrawerCloseCommon('sub')}
        title="Add New Subcategory"
        actions={<Stack alignItems='center' justifyContent='center' spacing="10px">
          <Button
            fullWidth
            variant="soft"
            color="success"
            size="large"
            sx={{ borderRadius: '30px' }}
          >
            Save
          </Button>
        </Stack>}
      >

        <Divider flexItem />

        <Box width='100%'>
          <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Subcategory Name (English)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='Smart Mobiles' name='itemname' />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Subcategory Name (Arabic)
          </Typography>
          <TextField fullWidth variant='filled' defaultValue='الهواتف الذكية' name='itemname' />

          <Typography mt='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category
          </Typography>
          <FormControl fullWidth>
            <Select
              variant='filled'
              value={mySubCat}
              onChange={handleChangeMySubCat}
            >
              <MenuItem value='Electronic Devices'>Electronic Devices</MenuItem>
              <MenuItem value='Shirts'>Shirts</MenuItem>
            </Select>
          </FormControl>

          <Typography my='20px' component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }} >
            Category Image
          </Typography>
          <Stack direction='row' spacing='10px' alignItems='center'>
            <Box sx={{
              width: '140px', height: '140px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              flexDirection: 'column', border: '2px dashed rgb(134, 136, 163,.5)', borderRadius: '16px'
            }}>
              <Iconify icon="uil:upload" style={{ color: '#8688A3' }} />

              <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
            </Box>
            <Box>
              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                Maximum size is 5mb
              </Typography>

              <Typography mt='0px' component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }} >
                You can use these extensions PNG or JPG
              </Typography>

            </Box>
          </Stack>

        </Box>
      </DetailsNavBar>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        noCancel={false}
        title="Delete"
        content={
          <>
            Are you sure want to delete items?
          </>
        }
        action={<Button
          fullWidth
          color="error"
          variant='soft'
          size="large"

          onClick={() => confirm.onFalse()}
          sx={{ borderRadius: '30px' }}
        >
          Delete
        </Button>}

      />
    </Container >
  );
}
