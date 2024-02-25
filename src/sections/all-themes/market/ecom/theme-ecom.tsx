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
import { Stack, Container } from '@mui/material';
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
import { socketClient } from '../../utils/helper-functions';
import { useSnackbar } from 'notistack';
import AddSectionComponent from './AddSectionComponent';
import StyleCategoriesDealer from './out-put/style-categories-selection';
import TopBarDealer from './out-put/topbar-selection';
import VideoDealer from './out-put/video-dealer';
import BrandDealer from './out-put/brand-dealer';
import StylesDealer from './out-put/styles-dealer';

const dataPages = [
  { title: 'Home Page', link: 'https://ecom-zaki.vercel.app/' },
  { title: 'Products Page', link: 'https://ecom-zaki.vercel.app/products' },
  { title: 'Sign Up Page', link: 'https://ecom-zaki.vercel.app/signUp' },
];
// ----------------------------------------------------------------------

interface ControllsState {
  page: string;
  menu: (EventTarget & (Element | HTMLElement)) | null;
  addSection: Boolean;
}

const defaultSections = [
  {
    page: 'Splash Screen',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Home Page',
    sectinos: [
      {
        name: 'Top Bar',
        img: '/raws/bars.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any, builder_Id: any) => (
          <TopBarDealer
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
            builder_Id={builder_Id}
          />
        ),
      },
      {
        name: 'App Bar',
        img: '/raws/bars.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any, builder_Id: any) => (
          <NavDealer
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
            builder_Id={builder_Id}
          />
        ),
      },
      {
        name: 'Header',
        img: '/raws/Header.svg',
        show: false,
        Componenet: (handleThemeConfig: any, themeConfig: any, builder_Id: any) => (
          <HeaderDealer
            builderId={builder_Id}
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
          />
        ),
      },
      {
        name: 'Banner',
        img: '/raws/Banners.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any, builder_Id: any, url: any) => (
          <BannerDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} builderId={builder_Id} url={url} />
        ),
      },
      {
        name: 'CategoriesLayout',
        img: '/raws/Categories.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <LayoutCategoriesDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Nav',
        img: '',
        show: false,
      },
      {
        name: 'Mobiles',
        img: '/raws/Mobiles.svg',
        show: false,
      },
      {
        name: 'Video',
        img: '/raws/Trending.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => <VideoDealer />,
      },
      {
        name: 'Brand Ads',
        img: '/raws/Trending.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <BrandDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Products',
        img: '/raws/Products.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ProductViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
        // onClick: () => {
        //   setControlls({ ...controlls, page: "Products Page" });
        //   setTimeout(() => {
        //     handleButton('List View');
        //   }, 1000);
        // }
      },
      {
        name: 'Footer',
        img: '/raws/Mobiles.svg',
        show: true,
      },
    ],
  },
  {
    page: 'Products Page',
    sectinos: [
      {
        name: 'Search',
        img: '/raws/si.png',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ProductPageSearchDealer
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
          />
        ),
      },
      {
        name: 'Filter',
        img: '/raws/filters.png',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ProductPageFiltersDealer
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
          />
        ),
      },
      {
        name: 'List View',
        img: '/raws/listing.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ListViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Card Style',
        img: '/raws/cards.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <CardStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Card Shape',
        img: '/raws/shape.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <CardShapeDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'View',
        img: '/raws/listing.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ProductPageViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },

      {
        name: 'Product Card',
        img: '/raws/cards.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ProductPageProductCardDealer
            handleThemeConfig={handleThemeConfig}
            themeConfig={themeConfig}
          />
        ),
      },
    ],
  },
  {
    page: 'Product Details Page',
    sectinos: [
      {
        name: 'Images',
        img: '/raws/i.png',
        show: false,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <ImagesStyleDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Description',
        img: '/raws/dd.png',
        show: false,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <DescriptionDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Similar Products',
        img: '/raws/sp.png',
        show: false,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <SimilarProductsDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
      {
        name: 'Wishlist',
        img: '/raws/w.png',
        show: false,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <WishlistDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Categories',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Checkout',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Sign Up Page',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Sign In Page',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },

  {
    page: 'Wishlist',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Contact Us',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Forgot Password',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },

  {
    page: 'OTP',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
  {
    page: 'Thanks',
    sectinos: [
      {
        name: 'User Info',
        img: '/raws/user-solid.svg',
        show: true,
        Componenet: (handleThemeConfig: any, themeConfig: any) => (
          <UserViewDealer handleThemeConfig={handleThemeConfig} themeConfig={themeConfig} />
        ),
      },
    ],
  },
];

export default function EcomDesignMain() {
  const socket = socketClient();

  const [activeSection, setActiveSection] = useState('Style');
  const [deviceView, setDeviceView] = useState('mobile');

  const [sectionsList, setSectionsList] = useState(defaultSections);
  const [controlls, setControlls] = useState<ControllsState>({
    page: 'Home Page',
    menu: null,
    addSection: false,
  });

  const [themeConfig, setThemeConfig] = useState({
    fontStyle: 'Avernir',
    buttonRadius: 10,
    primaryColor: '#0D6EFD',
    secondaryColor: '#8688A3',
    logo: '',
    cart: '1',
    categoryShow: '1',
    navLogoPosition: 'center',

    //
    bannerShow: false,
    bannerImages: [],
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

    layout: {
      homePage: {
        navbar: {
          sort: 1,
          logoPosition: 'empty value',
        },
        banner: {
          sort: 2,
          image: 'empty value',
        },
        header: {
          showInApp: true,
          sort: 3,
          image: '',
          slogan: 'empty value',
        },
        category: {
          showInApp: true,
          sort: 4,
          rowType: 'empty value',
        },
        product: {
          showInApp: true,
          sort: 5,
          rowType: '1',
        },
      },
    },

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
  const builder_Id = searchParams.get('id')?.toString() || '';
  const url = searchParams.get('url')?.toString() || '';
  // const url = "http://localhost:3000";

  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleThemeConfig = debounce(
    (key: string, newValue: any, parentClass: string | null = '') => {
      let _socketKey = '';
      let valueToShare = '';

      if (!parentClass?.startsWith('layout')) {
        setThemeConfig((pv) => ({ ...pv, [key]: newValue }));
        _socketKey = parentClass ? parentClass + '.' + key : key;
        valueToShare = newValue;
        if (typeof newValue === 'number') {
          valueToShare = `${newValue}px`;
        }
      } else {
        // Split the path into an array of keys
        const pathKeys = key.split('.');
        let newState = { ...themeConfig };

        let currentLevel: any = newState;
        for (let i = 0; i < pathKeys.length - 1; i++) {
          const key = pathKeys[i];
          currentLevel[key] = currentLevel[key] ? { ...currentLevel[key] } : {};
          currentLevel = currentLevel[key];
        }
        // Set the final value at the last key in the path
        currentLevel[pathKeys[pathKeys.length - 1]] = newValue;

        console.log('newState', newState);
        setThemeConfig(newState);

        _socketKey = key;
        valueToShare = newValue;
      }

      const data = {
        builderId: builder_Id,
        key: _socketKey,
        value: valueToShare,
      };
      if (socket) {
        socket.emit('website:cmd', data);
      }
    },
    500
  );

  // using Ressponsive view
  const smUp = useResponsive('up', 'sm');

  const handleChangeSection =
    (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      if (smUp) {
        if (newValue === 'Layout') {
          // setbuttonSection('App Bar');
          setbuttonSection('');
          setActiveSection(newValue);
          setControlls((pv) => ({ ...pv, addSection: true }));
        } else {
          setbuttonSection('Font');
          setActiveSection(newValue);
          setControlls({
            page: 'Home Page',
            menu: null,
            addSection: false,
          });
        }
      } else if (newValue === 'Layout') {
        setActiveSection(newValue);
        setControlls((pv) => ({ ...pv, addSection: false }));
      } else {
        setActiveSection(newValue);
        setControlls({
          page: 'Home Page',
          menu: null,
          addSection: false,
        });
      }
    };

  const handleDeviceView =
    (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      setDeviceView(newValue);
    };

  // controlling buttons and their options
  const [buttonSection, setbuttonSection] = useState(smUp ? 'Font' : '');
  const handleButton = (btnSection: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
    setbuttonSection(btnSection);
  };

  const handleOpenDropDown = React.useCallback(
    (openTo: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
      // console.log('event.currentTarget', event.currentTarget);

      if (openTo === 'menu') setControlls((pv) => ({ ...pv, menu: event.currentTarget }));
      else if (openTo === 'addSection') setControlls((pv) => ({ ...pv, addSection: true }));
      // else if (openTo === "analytics") setDropDown((pv) => ({ ...pv, analytics: event.currentTarget }))
    },
    []
  );

  const handleCloseDropDown = React.useCallback(
    (closeTo: string, value: string | null = null) =>
      (event: React.MouseEvent<HTMLElement> | React.SyntheticEvent | React.KeyboardEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        if (closeTo === 'menu') {
          setControlls((pv) => ({ ...pv, menu: null, page: value || pv.page }));
        } else if (closeTo === 'addSection') {
          setControlls((pv) => ({ ...pv, addSection: false }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
    []
  );

  const handleCancelBtn = () => {
    setbuttonSection('');
  };

  return (
    <Box sx={{ height: '100%', transition: 'all .5' }}>
      {smUp && (
        <Box>
          <SaveSettings builderId={builder_Id} smUp={smUp} />

          <Grid container sx={{ height: '100%' }}>
            <Grid xs={12} sm={7}>
              <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column', pt: '20px' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button
                    disabled={!(activeSection === 'Layout')}
                    onClick={handleOpenDropDown('menu')}
                    endIcon={<Iconify icon="ep:arrow-down-bold" width={15} />}
                  >
                    {controlls.page}
                  </Button>
                  <Stack
                    sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
                    direction="row"
                    alignItems="center"
                    justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                    spacing="20px"
                  >
                    <Button
                      onClick={handleChangeSection('Style')}
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={
                        activeSection === 'Style'
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
                      Style{' '}
                    </Button>
                    <Button
                      onClick={handleChangeSection('Layout')}
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={
                        activeSection === 'Layout'
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
                      Layout{' '}
                    </Button>
                  </Stack>
                  <Button
                    startIcon={<Iconify icon="mi:add" />}
                    disabled={!(activeSection === 'Layout')}
                    onClick={handleOpenDropDown('addSection')}
                  >
                    Add Section
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing="10px">
                  <Iconify
                    icon="entypo:mobile"
                    onClick={handleDeviceView('mobile')}
                    style={{
                      opacity: deviceView === 'mobile' ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all .4s',
                    }}
                  />
                  <Iconify
                    onClick={handleDeviceView('tablet')}
                    icon="tabler:device-ipad-horizontal"
                    width={27}
                    style={{
                      opacity: deviceView === 'tablet' ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all .4s',
                    }}
                  />
                  <Iconify
                    onClick={handleDeviceView('laptop')}
                    icon="bi:laptop"
                    width={30}
                    style={{
                      opacity: deviceView === 'laptop' ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all .4s',
                    }}
                  />
                </Stack>
                <Menu
                  id="pages"
                  anchorEl={controlls.menu}
                  onClose={handleCloseDropDown('menu')}
                  open={Boolean(controlls.menu)}
                >
                  {sectionsList.map((sectionObj) => (
                    <MenuItem
                      key={sectionObj.page}
                      selected={controlls.page === sectionObj.page}
                      sx={{ marginBottom: '20px', fontWeight: 600, fontSize: '12px !important' }}
                      onClick={handleCloseDropDown('menu', sectionObj.page)}
                    >
                      {sectionObj.page}
                    </MenuItem>
                  ))}
                </Menu>

                {/* View and Dsiplay Section */}
                <Box sx={{ pb: '20px' }}>
                  <OutPutView deviceView={deviceView} page={`${url}?builder_id=${builder_Id}`} />
                </Box>
              </Box>
            </Grid>

            {/* Options and Options Side bar */}
            <Grid container xs={12} sm={5} sx={{ display: controlls.addSection ? 'none' : '' }}>
              <Grid xs={10}>
                {buttonSection !== '' && (
                  <Card
                    sx={{
                      borderRadius: '0px',
                      p: '20px',
                      height: '100%',
                      boxShadow: '0px -6px 40px #00000014',
                      transition: 'all .7s !important',
                    }}
                  >
                    {buttonSection === 'Font' && (
                      <Box>
                        <HeaderSection
                          name="Font Style"
                          description=""
                          cancel={{ key: 'fontStyle', value: 'Avernir' }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        >
                          <Button
                            sx={{
                              background: '#F5F5F8',
                              borderRadius: '16px',
                              fontSize: '11px',
                              color: '#8688A3',
                              px: '19px',
                            }}
                            endIcon={<Iconify icon="ep:arrow-down-bold" width={15} />}
                          >
                            English
                          </Button>
                        </HeaderSection>

                        <FontFamilyDealer
                          themeConfig={themeConfig}
                          handleThemeConfig={handleThemeConfig}
                        />
                      </Box>
                    )}
                    {buttonSection === 'Buttons' && (
                      <Box>
                        <HeaderSection
                          name="Button Style"
                          description="Control the border radius of your button"
                          cancel={{ key: 'buttonRadius', value: 10 }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        />
                        <Buttons themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                      </Box>
                    )}
                    {buttonSection === 'Logo' && (
                      <Box>
                        <HeaderSection
                          name="Branding Logo"
                          description="Upload your website logo"
                          cancel={{ key: 'logo', value: '' }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        />
                        <LogoDealer
                          themeConfig={themeConfig}
                          builderId={builder_Id}
                          handleThemeConfig={handleThemeConfig}
                        />
                      </Box>
                    )}
                    {buttonSection === 'Color' && (
                      <Box>
                        <HeaderSection
                          name="Colors"
                          description="Define your brand colors"
                          cancel={{ key: 'colors', value: '' }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        />
                        <ColorsDealer
                          themeConfig={themeConfig}
                          handleThemeConfig={handleThemeConfig}
                        />
                      </Box>
                    )}
                    {buttonSection === 'Cart' && (
                      <Box>
                        <HeaderSection
                          name="Cart Icon Style"
                          description="Select the style of cart icon"
                          cancel={{ key: 'cart', value: '1' }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        />
                        <CartsDealer
                          themeConfig={themeConfig}
                          handleThemeConfig={handleThemeConfig}
                        />
                      </Box>
                    )}
                    {buttonSection === 'Styles' && (
                      <Box>
                        <HeaderSection
                          name="General Style"
                          description="Select the style of Icons"
                          cancel={{ key: 'cart', value: '1' }}
                          handleCancelBtn={handleCancelBtn}
                          handleThemeConfig={handleThemeConfig}
                        />
                        <StylesDealer
                          themeConfig={themeConfig}
                          handleThemeConfig={handleThemeConfig}
                        />
                      </Box>
                    )}

                    {/* {buttonSection === 'Categories' && <Box>
                  <HeaderSection
                    name='Categories Card'
                    description='Select the style of category card'
                    cancel={{ key: 'cart', value: '1' }}
                    handleThemeConfig={handleThemeConfig}
                  />
                  <StyleCategoriesDealer themeConfig={themeConfig} handleThemeConfig={handleThemeConfig} />
                </Box>} */}

                    {/* Layout  HomePage */}
                    {activeSection === 'Layout' &&
                      sectionsList.map((Obj, index) => (
                        <Box key={'wrap' + index}>
                          {Obj.sectinos.map((sectionObj, ind) => {
                            if (sectionObj.show) {
                              return (
                                <Box key={'mainPageWrap_' + index + '_' + ind}>
                                  {buttonSection === sectionObj.name && (
                                    <Box key={'main_' + ind}>
                                      <HeaderSection
                                        name={sectionObj?.name ?? ''}
                                        cancel={{ key: 'cart', value: '/raw/cart1.svg' }}
                                        handleCancelBtn={handleCancelBtn}
                                        handleThemeConfig={handleThemeConfig}
                                      />
                                      {sectionObj?.Componenet &&
                                        sectionObj?.Componenet(
                                          handleThemeConfig,
                                          themeConfig,
                                          builder_Id,
                                          url
                                        )}
                                    </Box>
                                  )}
                                </Box>
                              );
                            }
                          })}
                        </Box>
                      ))}
                  </Card>
                )}
              </Grid>

              {/* Buttons Controlls section  */}
              <Grid xs={2}>
                <Card
                  sx={{ borderRadius: '0px', py: '20px', height: '100%', transition: 'all .5s' }}
                >
                  <Scrollbar>
                    {activeSection === 'Style' && (
                      <Stack
                        alignItems="center"
                        sx={{ height: '100%', textAlign: 'center' }}
                        spacing="20px"
                      >
                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Font' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Font' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Font')}
                          >
                            <Box
                              component="img"
                              src="/raw/font.svg"
                              sx={{ width: '27px', height: '20px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            Font
                          </Typography>
                        </Stack>

                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Buttons' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Buttons' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Buttons')}
                          >
                            <Box
                              component="img"
                              src="/raw/button.svg"
                              sx={{ width: '40px', height: '29px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            Buttons
                          </Typography>
                        </Stack>

                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Logo' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Logo' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Logo')}
                          >
                            <Box
                              component="img"
                              src="/raw/logoDe.svg"
                              sx={{ width: '24px', height: '24px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            Logo
                          </Typography>
                        </Stack>

                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Color' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Color' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Color')}
                          >
                            <Box
                              component="img"
                              src="/raw/color.svg"
                              sx={{ width: '30px', height: '30px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            Color
                          </Typography>
                        </Stack>

                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Cart' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Cart' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Cart')}
                          >
                            <Box
                              component="img"
                              src="/raw/shopping-cart.svg"
                              sx={{ width: '30px', height: '30px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            Cart
                          </Typography>
                        </Stack>
                        <Stack spacing="3px" alignItems="center" justifyContent="center">
                          <Button
                            sx={{
                              padding: '0px',
                              width: '50px',
                              height: '50px',
                              minWidth: 'auto',
                              borderRadius: '12px',
                              background: buttonSection === 'Cart' ? '#1BFBB6' : '#F5F5F8',
                              '&:hover': {
                                background: buttonSection === 'Cart' ? '#22C55E' : '#DEE1E6',
                              },
                            }}
                            variant="contained"
                            onClick={handleButton('Styles')}
                          >
                            <Box
                              component="img"
                              src="/raw/shopping-cart.svg"
                              sx={{ width: '30px', height: '30px' }}
                            />
                          </Button>
                          <Typography variant="caption" color="#0F1349">
                            General Styling
                          </Typography>
                        </Stack>

                        {/* <Stack spacing='3px' alignItems='center' justifyContent='center'>
                      <Button sx={{ padding: '0px', width: '50px', height: '50px', minWidth: 'auto', borderRadius: '12px', background: buttonSection === "Categories" ? "#1BFBB6" : '#F5F5F8', '&:hover': { background: buttonSection === "Categories" ? "#22C55E" : '#DEE1E6' } }} variant='contained'
                        onClick={handleButton('Categories')}
                      >
                        <Box component='img' src='/raw/Catogories.svg' sx={{ width: '30px', height: '30px' }} />
                      </Button>
                      <Typography variant='caption' color='#0F1349'>Categories</Typography>
                    </Stack> */}
                      </Stack>
                    )}

                    {activeSection === 'Layout' &&
                      sectionsList.map((Obj, index) => (
                        <Box key={'wrap' + index}>
                          {controlls.page === Obj.page && (
                            <Stack
                              alignItems="center"
                              sx={{ height: '100%', textAlign: 'center', transition: 'all .5s' }}
                              spacing="20px"
                            >
                              {Obj.sectinos.map((sectionObj, ind) => {
                                if (sectionObj.show) {
                                  return (
                                    <Stack
                                      key={'main_' + ind}
                                      spacing="3px"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Button
                                        sx={{
                                          padding: '0px',
                                          width: '50px',
                                          height: '50px',
                                          minWidth: 'auto',
                                          borderRadius: '12px',
                                          background:
                                            buttonSection === sectionObj.name
                                              ? '#1BFBB6'
                                              : '#F5F5F8',
                                          '&:hover': {
                                            background:
                                              buttonSection === sectionObj.name
                                                ? '#22C55E'
                                                : '#DEE1E6',
                                          },
                                        }}
                                        variant="contained"
                                        onClick={handleButton(sectionObj.name)}
                                      >
                                        <Box
                                          component="img"
                                          src={sectionObj.img}
                                          sx={{ width: '20px', height: '20px' }}
                                        />
                                      </Button>
                                      <Typography variant="caption" color="#0F1349">
                                        {sectionObj.name}
                                      </Typography>
                                    </Stack>
                                  );
                                }
                              })}
                            </Stack>
                          )}
                        </Box>
                      ))}
                  </Scrollbar>
                </Card>
              </Grid>
            </Grid>

            <Grid xs={5} sx={{ display: controlls.addSection ? '' : 'none' }}>
              <AddSectionComponent
                onClose={handleCloseDropDown('addSection')}
                onClick={(value = '') => {
                  setbuttonSection(value);
                  setControlls({ ...controlls, addSection: false });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
