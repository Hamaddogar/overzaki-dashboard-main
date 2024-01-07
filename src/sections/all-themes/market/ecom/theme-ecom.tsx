/* eslint-disable no-nested-ternary */

'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './out-put/view/view.css';
// @mui
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Stack, Divider, Container } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { BottomActions } from 'src/components/bottom-actions';
import OutPutView from './out-put/view/out-put-view';
import Buttons from './out-put/Buttons-Design-selection';
import HeaderSection from './out-put/header-section';
import FontFamilyDealer from './out-put/font-styles-selection';
import LogoDealer from './out-put/logo-part';
import ColorsDealer from './out-put/colors-selection';
import CartsDealer from './out-put/carts-selection';
import StyleCategoriesDealer from './out-put/style-categories-selection';
import NavDealer from './out-put/nav-selection';
import BannerDealer from './out-put/banner-selection';
import HeaderDealer from './out-put/header-selection';
import LayoutCategoriesDealer from './out-put/Layout-categories-selection';
import ProductViewDealer from './out-put/product-selection';
import ListViewDealer from './out-put/list-view-selection';
import CardStyleDealer from './out-put/card-style-selection';
import CardShapeDealer from './out-put/card-shape-selection';
import ImagesStyleDealer from './out-put/images-selection';
import DescriptionDealer from './out-put/description-selection';
import SimilarProductsDealer from './out-put/similar-products-selection';
import WishlistDealer from './out-put/wishlist-selection';
import ProductPageViewDealer from './out-put/products-page-view-selection';
import ProductPageSearchDealer from './out-put/product-page-search-selection';
import ProductPageFiltersDealer from './out-put/product-page-filters-selection';
import ProductPageProductCardDealer from './out-put/product-page-product-card-selection';
import UserViewDealer from './out-put/user-view-selection';
import Actions from './Actions';
import SaveSettings from '../../utils/save-settings';


const dataPages = [
  { title: "Home Page", link: 'https://ecom-zaki.vercel.app/' },
  { title: "Products Page", link: 'https://ecom-zaki.vercel.app/products' },
  { title: "Sign Up Page", link: 'https://ecom-zaki.vercel.app/signUp' },
]
// ----------------------------------------------------------------------

interface ControllsState {
  page: string,
  menu: EventTarget & (Element | HTMLElement) | null,
  addSection: Boolean,
  // order_status: EventTarget & (Element | HTMLElement) | null;
  // payment_method: EventTarget & (Element | HTMLElement) | null;
  // order_value: any; // Replace 'any' with the appropriate type
  // payment_value: any; // Replace 'any' with the appropriate type
  // analytics: EventTarget & (Element | HTMLElement) | null;
}



export default function EcomDesignMain() {
  // const settings = useSettingsContext();
  const [activeSection, setActiveSection] = useState('Style');
  const [deviceView, setDeviceView] = useState('mobile');
  const [controlls, setControlls] = useState<ControllsState>({
    page: 'Home Page',
    menu: null,
    addSection: false,
  });

  const [themeConfig, setThemeConfig] = useState({
    font: 'Avernir',
    btns_Radius: 10,
    primaryColor: '#0D6EFD',
    secondaryColor: '#8688A3',
    logo: '',
    cart: '/raw/cart1.svg',
    navLogoPosition: 'center',

    // 
    bannerShow: false,
    bannerImages: ['/raws/banner1.png', '/raws/bags.jpg'],
    // 
    headerShow: false,
    headerImages: '/raws/bags.jpg',
    headerTitle: 'Find everything you need',
    // LayoutCategories
    layoutCategoriesShow: true,
    layoutCategoriesRow: '1',
    // 
    productViewShow: true,
    productView: 'grid',
    // listViewGrid
    listViewGrid: '6',
    // cardStyle
    cardStyle: 'style-1',
    // cardShape
    cardShape: 'square',
    // product details page
    imagesStyle: 'style-1',
    descriptionShow: true,
    similarProductsShow: false,
    wishListShow: true,

    // product page
    productPageView: '6',
    productPageSearch: true,
    productPageFilterShow: true,
    productPageFilterStyle: 'style-1',
    productPageAddWishlist: true,
    productPageShowDescription: true,
    productPageShowCategoryName: true,
    productPageshowAddToCart: true,
    productPageFilterCardStyle: 'style-1',

    // user info
    userFullName: true,
    userMobileNumber: true,
    userBirthDate: true,
    userGender: true,
    userGoogleAccount: true,
    userFacebook: true,
    userTwitter: true,
  });

  const searchParams = useSearchParams();
  const url = searchParams.get('url')?.toString() || "";


  const handleThemeConfig = (key: string, newValue: string) => {
    setThemeConfig(pv => ({ ...pv, [key]: newValue }));
    console.log(`{"msg" :"ok"}`);
  };

  // using Ressponsive view 
  const smUp = useResponsive('up', 'sm');

  const handleChangeSection = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    if (smUp) {
      if (newValue === 'Layout') {
        setbuttonSection('Nav');
        setActiveSection(newValue);
        setControlls((pv) => ({ ...pv, addSection: false }))
      } else {
        setbuttonSection('Font');
        setActiveSection(newValue);
        setControlls({
          page: 'Home Page',
          menu: null,
          addSection: false,
        })
      }
    } else if (newValue === 'Layout') {
      setActiveSection(newValue);
      setControlls((pv) => ({ ...pv, addSection: false }))
    } else {
      setActiveSection(newValue);
      setControlls({
        page: 'Home Page',
        menu: null,
        addSection: false,
      })
    }
  };

  const handleDeviceView = (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setDeviceView(newValue);
  };

  // controlling buttons and their options
  const [buttonSection, setbuttonSection] = useState(smUp ? 'Font' : '');
  const handleButton = (btnSection: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setbuttonSection(btnSection);
  };

  const handleOpenDropDown = React.useCallback((openTo: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    // console.log('event.currentTarget', event.currentTarget);

    if (openTo === "menu") setControlls(pv => ({ ...pv, menu: event.currentTarget }))
    else if (openTo === "addSection") setControlls((pv) => ({ ...pv, addSection: true }))
    // else if (openTo === "analytics") setDropDown((pv) => ({ ...pv, analytics: event.currentTarget }))
  }, []);

  const handleCloseDropDown = React.useCallback((closeTo: string, value: string | null = null) => (event: React.MouseEvent<HTMLElement> | React.SyntheticEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    };

    if (closeTo === "menu") {
      setControlls(pv => ({ ...pv, menu: null, page: value || pv.page }))
    } else if (closeTo === "addSection") {
      setControlls((pv) => ({ ...pv, addSection: false }))
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <Box sx={{ height: '100%', transition: 'all .5' }}>

      {smUp && <Box>
        <SaveSettings settings={themeConfig} smUp={smUp} />


        <Grid container sx={{ height: '100%' }}>
          <Grid xs={12} sm={7}>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column', pt: '20px' }}>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Button
                  disabled={!(activeSection === 'Layout')}
                  onClick={handleOpenDropDown('menu')}
                  endIcon={<Iconify icon='ep:arrow-down-bold' width={15} />}
                >{controlls.page}</Button>
                <Stack
                  sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
                  direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
                  <Button onClick={handleChangeSection('Style')}
                    fullWidth variant='contained'
                    size='small'
                    sx={
                      activeSection === "Style" ?
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
                  > Style </Button>
                  <Button onClick={handleChangeSection('Layout')}
                    fullWidth variant='contained'
                    size='small'
                    sx={
                      activeSection === "Layout" ? {
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
                  > Layout </Button>
                </Stack>
                <Button startIcon={<Iconify icon='mi:add' />} disabled={!(activeSection === 'Layout')} onClick={handleOpenDropDown('addSection')} >Add Section</Button>
              </Stack>
              <Stack direction='row' alignItems='center' justifyContent='center' spacing='10px'>
                <Iconify icon='entypo:mobile' onClick={handleDeviceView('mobile')} style={{
                  opacity: deviceView === "mobile" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} />
                <Iconify onClick={handleDeviceView('tablet')} icon='tabler:device-ipad-horizontal' width={27} style={{
                  opacity: deviceView === "tablet" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} />
                <Iconify onClick={handleDeviceView('laptop')} icon='bi:laptop' width={30} style={{
                  opacity: deviceView === "laptop" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} />
              </Stack>
              <Menu id="pages" anchorEl={controlls.menu} onClose={handleCloseDropDown("menu")} open={Boolean(controlls.menu)}>
                {dataPages.map((page) => <MenuItem key={page.title} selected={controlls.page === page.title} sx={{ marginBottom: "20px", fontWeight: 600, fontSize: '12px !important' }} onClick={handleCloseDropDown("menu", page.title)}>
                  {page.title}
                </MenuItem>)}
              </Menu>

              {/* View and Dsiplay Section */}
              <Box sx={{ pb: '20px' }}>
                {/* <OutPutView deviceView={deviceView} page={linker(controlls.page)} /> */}
                <OutPutView deviceView={deviceView} page={url} />
              </Box>

            </Box>
          </Grid>


          {/* Options and Options Side bar */}
          <Grid container xs={12} sm={5} sx={{ display: controlls.addSection ? 'none' : '' }}>
            <Grid xs={10} >
              <Card sx={{ borderRadius: '0px', p: '20px', height: '100%', boxShadow: '0px -6px 40px #00000014', transition: 'all .7s !important' }}>

                {buttonSection === 'Font' && <Box>
                  <HeaderSection
                    name='Font Style'
                    description=''
                    cancel={{ key: 'font', value: 'Avernir' }}
                    handleThemeConfig={handleThemeConfig}
                  >
                    <Button sx={{ background: '#F5F5F8', borderRadius: '16px', fontSize: '11px', color: '#8688A3', px: '19px' }} endIcon={<Iconify icon='ep:arrow-down-bold' width={15} />}>
                      English
                    </Button>
                  </HeaderSection>

                  <FontFamilyDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}
                {buttonSection === 'Buttons' && <Box>
                  <HeaderSection
                    name='Button Style'
                    description='Control the border radius of your button'
                    cancel={{ key: 'btns_Radius', value: 10 }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <Buttons themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}
                {buttonSection === 'Logo' && <Box>
                  <HeaderSection
                    name='Branding Logo'
                    description='Upload your website logo'
                    cancel={{ key: 'logo', value: '' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <LogoDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}
                {buttonSection === 'Color' && <Box>
                  <HeaderSection
                    name='Colors'
                    description='Define your brand colors'
                    cancel={{ key: 'colors', value: '' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ColorsDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}
                {buttonSection === 'Cart' && <Box>
                  <HeaderSection
                    name='Cart Icon Style'
                    description='Select the style of cart icon'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <CartsDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}
                {buttonSection === 'Categories' && <Box>
                  <HeaderSection
                    name='Categories Card'
                    description='Select the style of category card'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <StyleCategoriesDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>}


                {/* Layout  HomePage */}

                {buttonSection === 'Nav' && <Box>
                  <HeaderSection
                    name='Top Navigation'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />

                  <NavDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Banners' && <Box>
                  <HeaderSection
                    name='Banners'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <BannerDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Header' && <Box>
                  <HeaderSection
                    name='Header'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <HeaderDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'CategoriesLayout' && <Box>

                  <HeaderSection
                    name='Categories Layout'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <LayoutCategoriesDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />

                </Box>}
                {buttonSection === 'Products' && <Box>
                  <HeaderSection
                    name='Show Products Section'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />

                  <ProductViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />

                </Box>}
                {buttonSection === 'Mobiles' && <Box />}
                {buttonSection === 'Trending' && <Box />}

                {/* Layout  CategoriesPage */}
                {buttonSection === 'List View' && <Box>
                  <HeaderSection
                    name='List View'
                    description='Select the view of the categories list'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ListViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Card Style' && <Box>
                  <HeaderSection
                    name='Categories Card'
                    description='Select the style of category card'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <CardStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Card Shape' && <Box>
                  <HeaderSection
                    name='Card Shape'
                    description='Select the shape of category card'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <CardShapeDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}

                {/* Product Details Page */}
                {buttonSection === 'Images' && <Box>
                  <HeaderSection
                    name='Images'
                    description='Select the design of Images'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ImagesStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Description' && <Box>
                  <HeaderSection
                    name='Description'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />

                  <DescriptionDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Similar Products' && <Box>
                  <HeaderSection
                    name='Similar Products'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <SimilarProductsDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Wishlist' && <Box>
                  <HeaderSection
                    name='Wishlist'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <WishlistDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}

                {/* Products Page */}
                {buttonSection === 'View' && <Box>
                  <HeaderSection
                    name='Product List View'
                    description='Select the view of the product list'
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ProductPageViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Search' && <Box>
                  <HeaderSection
                    name='Search'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ProductPageSearchDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Filter' && <Box>
                  <HeaderSection
                    name='Filter'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ProductPageFiltersDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}
                {buttonSection === 'Product Card' && <Box>
                  <HeaderSection
                    name='Product Card Style'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <ProductPageProductCardDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}

                {/* Sign Up Page */}
                {buttonSection === 'User Info' && <Box>
                  <HeaderSection
                    name='Sign Up Info'
                    description=''
                    cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                    handleThemeConfig={handleThemeConfig}
                  />

                  <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Box>}


              </Card>
            </Grid>


            {/* Buttons Controlls section  */}
            <Grid xs={2}>
              <Card sx={{ borderRadius: '0px', py: '20px', height: '100%', transition: 'all .5s' }}>
                <Scrollbar>

                  {activeSection === 'Style' && <Stack alignItems='center' sx={{ height: '100%', textAlign: 'center' }} spacing='20px' >

                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{
                        padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Font" ? "#1BFBB6" : '#F5F5F8',
                        '&:hover': { background: buttonSection === "Font" ? "#22C55E" : '#DEE1E6' }
                      }}
                        variant='contained'
                        onClick={handleButton('Font')}
                      >
                        <Box component='img' src='/raw/font.svg' sx={{ width: '27px', height: '20px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Font</Typography>
                    </Stack>


                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Buttons" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Buttons" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Buttons')}
                      >
                        <Box component='img' src='/raw/button.svg' sx={{ width: '40px', height: '29px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Buttons</Typography>
                    </Stack>


                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Logo" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Logo" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Logo')}
                      >
                        <Box component='img' src='/raw/logoDe.svg' sx={{ width: '24px', height: '24px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Logo</Typography>
                    </Stack>


                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Color" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Color" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Color')}
                      >
                        <Box component='img' src='/raw/color.svg' sx={{ width: '30px', height: '30px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Color</Typography>
                    </Stack>


                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Cart" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Cart" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Cart')}
                      >
                        <Box component='img' src='/raw/shopping-cart.svg' sx={{ width: '30px', height: '30px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Cart</Typography>
                    </Stack>


                    <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Categories" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Categories" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Categories')}
                      >
                        <Box component='img' src='/raw/Catogories.svg' sx={{ width: '30px', height: '30px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Categories</Typography>
                    </Stack>

                  </Stack>}


                  {activeSection === 'Layout' && <Box>

                    {controlls.page === "Home Page" && <Stack alignItems='center' sx={{ height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Nav" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Nav" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Nav')}
                        >
                          <Box component='img' src='/raws/bars.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Nav</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Banners" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Banners" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Banners')}
                        >
                          <Box component='img' src='/raws/Banners.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Banners</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Header" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Header" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Header')}
                        >
                          <Box component='img' src='/raws/Header.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Header</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "CategoriesLayout" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "CategoriesLayout" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('CategoriesLayout')}
                        >
                          <Box component='img' src='/raws/Categories.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Categories</Typography>
                      </Stack>


                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Products" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Products" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Products')}
                        >
                          <Box component='img' src='/raws/Products.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Products</Typography>
                      </Stack>


                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Mobiles" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Mobiles" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Mobiles')}
                        >
                          <Box component='img' src='/raws/Mobiles.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Mobiles</Typography>
                      </Stack>



                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Trending" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Trending" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Trending')}
                        >
                          <Box component='img' src='/raws/Trending.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Trending</Typography>
                      </Stack>


                    </Stack>}

                    {controlls.page === "Products Page" && <Stack alignItems='center' sx={{ height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "List View" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "List View" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('List View')}
                        >
                          <Box component='img' src='/raws/listing.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>List View</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Card Style" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Card Style" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Card Style')}
                        >
                          <Box component='img' src='/raws/cards.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Card Style</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Card Shape" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Card Shape" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Card Shape')}
                        >
                          <Box component='img' src='/raws/shape.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Card Shape</Typography>
                      </Stack>
                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "View" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "View" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('View')}
                        >
                          <Box component='img' src='/raws/listing.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>View</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Search" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Search" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Search')}
                        >
                          <Box component='img' src='/raws/si.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Search</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Filter" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Filter" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Filter')}
                        >
                          <Box component='img' src='/raws/filters.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Filter</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Product Card" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Product Card" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Product Card')}
                        >
                          <Box component='img' src='/raws/cards.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Product Card</Typography>
                      </Stack>
                    </Stack>}

                    {controlls.page === "Product Details Page" && <Stack alignItems='center' sx={{ height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Images" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Images" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Images')}
                        >
                          <Box component='img' src='/raws/i.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Images</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Description" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Description" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Description')}
                        >
                          <Box component='img' src='/raws/dd.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Description</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Similar Products" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Similar Products" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Similar Products')}
                        >
                          <Box component='img' src='/raws/sp.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Similar Products</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Wishlist" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Wishlist" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Wishlist')}
                        >
                          <Box component='img' src='/raws/w.png' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>Wishlist</Typography>
                      </Stack>





                    </Stack>}

                    {controlls.page === "Sign Up Page" && <Stack alignItems='center' sx={{ height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >
                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "User Info" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "User Info" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('User Info')}
                        >
                          <Box component='img' src='/raws/user-solid.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349'>User Info</Typography>
                      </Stack>

                    </Stack>}

                  </Box>}

                </Scrollbar>
              </Card>
            </Grid>
          </Grid>


          <Grid xs={5} sx={{ display: controlls.addSection ? '' : 'none' }}>
            <Card sx={{ borderRadius: '0px', p: '20px', height: '100%', boxShadow: '0px -6px 40px #00000014' }}>

              <Stack direction='row' justifyContent='space-between'>
                <Box>
                  <Typography variant='h6'>Add New Section</Typography>
                  <Typography variant='caption' color='#8688A3'>
                    Select where you want to add this section.
                  </Typography>
                </Box>
                <Iconify width={25} icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleCloseDropDown('addSection')} />
              </Stack>


              <Box mt='20px'>
                <Typography variant='caption' color='#8688A3'>
                  Top Navigation (1)
                </Typography>

                <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                  width: '100%',
                  minHeight: '61px',
                  border: '4px solid #8688A333',
                  borderRadius: '8px',
                }}>
                  <Box component='img' src='/raws/navAS.png' sx={{ borderRadius: '8px', width: '100%' }} />
                </Stack>
              </Box>


              <Divider sx={{
                borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                '& .MuiDivider-wrapper': {
                  padding: 0
                }
              }}>
                <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                  width: "120px",
                  height: "36px",
                  background: "#F5F5F8",
                  borderRadius: "20px",
                  cursor: 'pointer'
                }} >
                  <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                  <Typography variant='button' color='#8688A3'>Add Here</Typography>
                </Stack>
              </Divider>

              <Box mt='20px'>
                <Typography variant='caption' color='#8688A3'>
                  Categories section (2)
                </Typography>

                <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                  width: '100%',
                  height: '178px',
                  border: '4px solid #8688A333',
                  borderRadius: '8px',
                }}>
                  <Box component='img' src='/raws/catAS.png' sx={{ borderRadius: '8px', width: '100%', height: '100%' }} />
                </Stack>
              </Box>
              <Divider sx={{
                borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                '& .MuiDivider-wrapper': {
                  padding: 0
                }
              }}>
                <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                  width: "120px",
                  height: "36px",
                  background: "#F5F5F8",
                  borderRadius: "20px",
                  cursor: 'pointer'
                }} >
                  <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                  <Typography variant='button' color='#8688A3'>Add Here</Typography>
                </Stack>
              </Divider>

              <Box mt='20px'>
                <Typography variant='caption' color='#8688A3'>
                  Mobiles Section (3)
                </Typography>

                <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                  width: '100%',
                  height: '178px',
                  border: '4px solid #8688A333',
                  borderRadius: '8px',
                }}>
                  <Box component='img' src='/raws/catAS.png' sx={{ borderRadius: '8px', width: '100%', height: '100%' }} />
                </Stack>
              </Box>


            </Card>

          </Grid>

        </Grid>
      </Box>}

      {!smUp && <Box>
        <Container>


          <Grid container rowGap='10px'>
            <Grid xs={12}>
              <SaveSettings settings={themeConfig} smUp={false} />
            </Grid>

            <Grid xs={12}>
              {/* Tab view Styled Buttons */}
              <Stack
                sx={{ bgcolor: 'background.neutral', borderRadius: '12px', p: '5px' }}
                direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
                <Button onClick={handleChangeSection('Style')}
                  fullWidth variant='contained'
                  size='small'
                  sx={
                    activeSection === "Style" ?
                      {
                        borderRadius: '10px',
                        color: '#0F1349',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 6px 20px #00000033',
                        '&:hover': { backgroundColor: '#FFFFFF', }
                      }
                      :
                      {
                        borderRadius: '10px',
                        color: '#8688A3',
                        backgroundColor: 'background.neutral',
                        '&:hover': { backgroundColor: 'background.neutral' }
                      }}
                > Style </Button>
                <Button onClick={handleChangeSection('Layout')}
                  fullWidth variant='contained'
                  size='small'
                  sx={
                    activeSection === "Layout" ? {
                      borderRadius: '10px',
                      color: '#0F1349',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 6px 20px #00000033',
                      '&:hover': { backgroundColor: '#FFFFFF', }
                    }
                      :
                      {
                        borderRadius: '10px',
                        color: '#8688A3',
                        backgroundColor: 'background.neutral',
                        '&:hover': { backgroundColor: '#FFFFFF', }
                      }}
                > Layout </Button>
              </Stack>
            </Grid>


            <Grid xs={12}>
              <Stack direction='row' alignItems='center' justifyContent='center' spacing='10px'>
                <Iconify icon='entypo:mobile' onClick={handleDeviceView('mobile')} style={{
                  opacity: deviceView === "mobile" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} />
                <Iconify onClick={handleDeviceView('tablet')} icon='tabler:device-ipad-horizontal' width={27} style={{
                  opacity: deviceView === "tablet" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} />
                {/* <Iconify onClick={handleDeviceView('laptop')} icon='bi:laptop' width={30} style={{
                  opacity: deviceView === "laptop" ? 1 : .5,
                  cursor: 'pointer',
                  transition: 'all .4s'
                }} /> */}
              </Stack>
            </Grid>


            <Grid xs={12} sx={{ pb: 8 }}>
              {/* View and Dsiplay Section */}
              <Box sx={{ pb: '20px' }}>
                {/* <OutPutView deviceView={deviceView} page={linker(controlls.page)} /> */}
                <OutPutView deviceView={deviceView} page={url} />
              </Box>
            </Grid>

            <Grid xs={12}>

              <Menu id="pages" anchorEl={controlls.menu} onClose={handleCloseDropDown("menu")} open={Boolean(controlls.menu)}>
                {dataPages.map((page) => <MenuItem key={page.title} selected={controlls.page === page.title} sx={{ marginBottom: "20px", fontWeight: 600, fontSize: '12px !important' }} onClick={handleCloseDropDown("menu", page.title)}>
                  {page.title}
                </MenuItem>)}
              </Menu>

              <BottomActions elevation={7}>

                {/* buttons or controller for mobile view  */}
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                  {activeSection === 'Layout' ?
                    <Stack direction='row' justifyContent='space-between' alignItems='center' mb='10px' spacing='10px'>
                      <Button
                        disabled={!(activeSection === 'Layout')}
                        onClick={handleOpenDropDown('menu')}
                        endIcon={<Iconify icon='ep:arrow-down-bold' width={15} />}
                      >{controlls.page}</Button>

                      <Button size='small' startIcon={<Iconify icon='mi:add' />} onClick={handleOpenDropDown('addSection')} >Add Section</Button>
                    </Stack>
                    :
                    <Stack direction='row' alignItems='center' mb='10px' spacing='10px'>
                      <Typography variant='button' sx={{ fontWeight: 900 }}>Tools</Typography>
                      <Tooltip title="Add" placement="right-end" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <Iconify icon='pajamas:information-o' width={15} sx={{ color: '#C2C3D1' }} />
                      </Tooltip>
                    </Stack>}

                  <Scrollbar sx={{ pb: '10px' }}>
                    {activeSection === 'Style' && <Stack sx={{ width: '100%', flexGrow: 1 }} direction='row' alignItems='center' spacing='20px'>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{
                          padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Font" ? "#1BFBB6" : '#F5F5F8',
                          '&:hover': { background: buttonSection === "Font" ? "#22C55E" : '#DEE1E6' }
                        }}
                          variant='contained'
                          onClick={handleButton('Font')}
                        >
                          <Box component='img' src='/raw/font.svg' sx={{ width: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Font</Typography>
                      </Stack>

                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Buttons" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Buttons" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                          onClick={handleButton('Buttons')}
                        >
                          <Box component='img' src='/raw/button.svg' sx={{ width: '27px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Buttons</Typography>
                      </Stack>


                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Logo" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Logo" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                          onClick={handleButton('Logo')}
                        >
                          <Box component='img' src='/raw/logoDe.svg' sx={{ width: '19px', height: '19px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Logo</Typography>
                      </Stack>



                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Color" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Color" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                          onClick={handleButton('Color')}
                        >
                          <Box component='img' src='/raw/color.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Color</Typography>
                      </Stack>


                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Cart" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Cart" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                          onClick={handleButton('Cart')}
                        >
                          <Box component='img' src='/raw/shopping-cart.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Cart</Typography>
                      </Stack>


                      <Stack spacing='3px' alignItems='center' justifyContent='center'>
                        <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Categories" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Categories" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                          onClick={handleButton('Categories')}
                        >
                          <Box component='img' src='/raw/Catogories.svg' sx={{ width: '20px', height: '20px' }} />
                        </Button>
                        <Typography variant='caption' color='#0F1349' fontWeight={900}>Categories</Typography>
                      </Stack>
                    </Stack>}


                    {activeSection === 'Layout' && <Box sx={{ flexGrow: 1, width: '100%' }}>

                      {controlls.page === "Home Page" && <Stack direction='row' alignItems='center' sx={{ width: '100%', flexGrow: 1, height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Nav" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Nav" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Nav')}
                          >
                            <Box component='img' src='/raws/bars.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Nav</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Banners" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Banners" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Banners')}
                          >
                            <Box component='img' src='/raws/Banners.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Banners</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Header" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Header" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Header')}
                          >
                            <Box component='img' src='/raws/Header.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Header</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "CategoriesLayout" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "CategoriesLayout" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('CategoriesLayout')}
                          >
                            <Box component='img' src='/raws/Categories.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Categories</Typography>
                        </Stack>


                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Products" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Products" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Products')}
                          >
                            <Box component='img' src='/raws/Products.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Products</Typography>
                        </Stack>


                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Mobiles" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Mobiles" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Mobiles')}
                          >
                            <Box component='img' src='/raws/Mobiles.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Mobiles</Typography>
                        </Stack>



                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Trending" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Trending" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Trending')}
                          >
                            <Box component='img' src='/raws/Trending.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Trending</Typography>
                        </Stack>


                      </Stack>}

                      {controlls.page === "Products Page" && <Stack direction='row' alignItems='center' sx={{ width: '100%', flexGrow: 1, height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "List View" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "List View" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('List View')}
                          >
                            <Box component='img' src='/raws/listing.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>List View</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Card Style" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Card Style" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Card Style')}
                          >
                            <Box component='img' src='/raws/cards.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Card Style</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Card Shape" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Card Shape" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Card Shape')}
                          >
                            <Box component='img' src='/raws/shape.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Card Shape</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "View" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "View" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('View')}
                          >
                            <Box component='img' src='/raws/listing.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>View</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Search" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Search" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Search')}
                          >
                            <Box component='img' src='/raws/si.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Search</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Filter" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Filter" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Filter')}
                          >
                            <Box component='img' src='/raws/filters.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Filter</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Product Card" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Product Card" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Product Card')}
                          >
                            <Box component='img' src='/raws/cards.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Product Card</Typography>
                        </Stack>

                      </Stack>}

                      {controlls.page === "Product Details Page" && <Stack direction='row' alignItems='center' sx={{ width: '100%', flexGrow: 1, height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Images" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Images" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Images')}
                          >
                            <Box component='img' src='/raws/i.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Images</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Description" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Description" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Description')}
                          >
                            <Box component='img' src='/raws/dd.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Description</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Similar Products" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Similar Products" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Similar Products')}
                          >
                            <Box component='img' src='/raws/sp.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Similar Products</Typography>
                        </Stack>

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Wishlist" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "Wishlist" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('Wishlist')}
                          >
                            <Box component='img' src='/raws/w.png' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>Wishlist</Typography>
                        </Stack>





                      </Stack>}

                      {controlls.page === "Sign Up Page" && <Stack direction='row' alignItems='center' sx={{ width: '100%', flexGrow: 1, height: '100%', textAlign: 'center', transition: 'all .5s' }} spacing='20px' >

                        <Stack spacing='3px' alignItems='center' justifyContent='center'>
                          <Button sx={{
                            padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "User Info" ? "#1BFBB6" : '#F5F5F8',
                            '&:hover': { background: buttonSection === "User Info" ? "#22C55E" : '#DEE1E6' }
                          }}
                            variant='contained'
                            onClick={handleButton('User Info')}
                          >
                            <Box component='img' src='/raws/user-solid.svg' sx={{ width: '20px', height: '20px' }} />
                          </Button>
                          <Typography variant='caption' color='#0F1349'>User Info</Typography>
                        </Stack>

                      </Stack>}

                    </Box>}
                  </Scrollbar>
                </Box>


                <Actions condition={controlls.addSection}>
                  <Card sx={{ borderRadius: '0px', p: '20px', height: '100%', boxShadow: '0px -6px 40px #00000014' }}>

                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography variant='h6'>Add New Section</Typography>
                        <Typography variant='caption' color='#8688A3'>
                          Select where you want to add this section.
                        </Typography>
                      </Box>
                      <Iconify width={25} icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleCloseDropDown('addSection')} />
                    </Stack>


                    <Box mt='20px'>
                      <Typography variant='caption' color='#8688A3'>
                        Top Navigation (1)
                      </Typography>

                      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        minHeight: '61px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                      }}>
                        <Box component='img' src='/raws/navAS.png' sx={{ borderRadius: '8px', width: '100%' }} />
                      </Stack>
                    </Box>


                    <Divider sx={{
                      borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                      '& .MuiDivider-wrapper': {
                        padding: 0
                      }
                    }}>
                      <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                      }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Add Here</Typography>
                      </Stack>
                    </Divider>

                    <Box mt='20px'>
                      <Typography variant='caption' color='#8688A3'>
                        Categories section (2)
                      </Typography>

                      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '178px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                      }}>
                        <Box component='img' src='/raws/catAS.png' sx={{ borderRadius: '8px', width: '100%', height: '100%' }} />
                      </Stack>
                    </Box>
                    <Divider sx={{
                      borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                      '& .MuiDivider-wrapper': {
                        padding: 0
                      }
                    }}>
                      <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                      }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Add Here</Typography>
                      </Stack>
                    </Divider>

                    <Box mt='20px'>
                      <Typography variant='caption' color='#8688A3'>
                        Mobiles Section (3)
                      </Typography>

                      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '178px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                      }}>
                        <Box component='img' src='/raws/catAS.png' sx={{ borderRadius: '8px', width: '100%', height: '100%' }} />
                      </Stack>
                    </Box>


                  </Card>
                </Actions>


                <Actions condition={buttonSection === 'Font'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Font Style</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <Box pt='20px'>
                    <Scrollbar sx={{ pl: '10px' }}>
                      <FontFamilyDealer mobile themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                    </Scrollbar>
                  </Box>
                </Actions>
                <Actions condition={buttonSection === 'Buttons'}>
                  <HeaderSection
                    name='Button Style'
                    description='Control the border radius of your button'
                    cancel={{ key: 'btns_Radius', value: 10 }}
                    handleThemeConfig={handleThemeConfig}
                  // closer={handleButton('')}
                  />
                  <Buttons
                    themeConfig={themeConfig}
                    handleThemeConfig={handleThemeConfig}
                  />
                </Actions>
                <Actions condition={buttonSection === 'Logo'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Branding Logo</Typography>

                      <Typography variant='caption'>Upload your website logo</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <Box mt='40px'>
                    <LogoDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                  </Box>
                </Actions>
                <Actions condition={buttonSection === 'Color'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Colors</Typography>
                      <Typography variant='caption'>Define your brand colors</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <ColorsDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />

                </Actions>
                <Actions condition={buttonSection === 'Cart'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Cart Icon Style</Typography>
                      <Typography variant='caption'>Select the style of cart icon</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <Scrollbar sx={{ pl: '10px' }}>
                    <CartsDealer mobile themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                  </Scrollbar>

                </Actions>
                <Actions condition={buttonSection === 'Categories'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Categories Card</Typography>
                      <Typography variant='caption'>Select the style of category card</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <Scrollbar >
                    <StyleCategoriesDealer mobile themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                  </Scrollbar>
                </Actions>


                {/* Layout  HomePage */}

                <Actions condition={buttonSection === 'Nav'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Top Navigation</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <NavDealer mobile handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Banners'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Banners</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <BannerDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Header'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Header</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <HeaderDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'CategoriesLayout'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Categories Layout</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <LayoutCategoriesDealer mobile handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Products'}>
                  <Stack direction='row' justifyContent='space-between' mb='20px'>
                    <Box>
                      <Typography variant='h6'>Products</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <ProductViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>

                {/* Layout  CategoriesPage */}
                <Actions condition={buttonSection === 'List View'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>List View</Typography>
                      <Typography variant='caption'>Select the view of the categories list</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>

                  <ListViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Card Style'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6'>Categories Card</Typography>
                      <Typography variant='caption'>Select the style of category card</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <CardStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Card Shape'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Card Shape</Typography>
                      <Typography variant='caption'>Select the shape of category card</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <CardShapeDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>

                {/* Product Details Page */}
                <Actions condition={buttonSection === 'Images'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Card Shape</Typography>
                      <Typography variant='caption'>Select the shape of category card</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <ImagesStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Description'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Description</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <DescriptionDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Similar Products'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Similar Products</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <SimilarProductsDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Wishlist'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Wishlist</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <WishlistDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>

                {/* Products Page */}
                <Actions condition={buttonSection === 'View'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Product List View</Typography>
                      <Typography variant='caption'>Select the view of the product list</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <ProductPageViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Search'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Search</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <ProductPageSearchDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Filter'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Filter</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <ProductPageFiltersDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>
                <Actions condition={buttonSection === 'Product Card'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Product Card Style</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <ProductPageProductCardDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>

                {/* Sign Up Page */}
                <Actions condition={buttonSection === 'User Info'}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 900 }}>Sign Up Info</Typography>
                    </Box>
                    <Stack direction='row' spacing='15px'>
                      <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                      <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={handleButton('')} />
                    </Stack>
                  </Stack>
                  <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
                </Actions>

              </BottomActions>
            </Grid>
          </Grid>
        </Container>
      </Box>}

    </Box >
  );
}
