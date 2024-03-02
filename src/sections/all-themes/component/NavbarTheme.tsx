/* eslint-disable jsx-a11y/alt-text */
'use client';
import React, { Fragment, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Image, Input, Span } from './subcomponents';
import { useMediaQuery } from '@mui/material';
import { sections } from './response';
const NavbarTheme = ({
  navbarState,
  generalIcons,
  appBarSearch,
  appBarLogo,
  appBarContainer,
  centerMenu,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');
  const router = useRouter();
  const configrationState = useSelector((state: any) => state?.configration);
  //   const [generalIcons, setGeneralIcons] = useState(navbarState[0].generalIcons);
  //   const [appBarSearch, setAppBarSearch] = useState(navbarState[0].appBar.search);
  //   // console.log(generalIcons);
  //   const [appBarLogo, setAppBarLogo] = useState(navbarState[0]?.websiteLogo);

  //   const [appBarContainer, setAppBarContainer] = useState(navbarState[0].appBar.container);
  const [appBarRightDetails, setAppBarRightDetails] = useState([
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_search',
      show: true,
      icon: 'https://i.imgur.com/K79NGcT.png',
      type: 'icon',
      screen: 'search',
      // Search is usually on both sides so if we add required here or anything which will decide the position of search
    },
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_cart',
      show: true,
      icon: 'https://i.imgur.com/ZiNDkOU.png',
      type: 'icon',
      hasBadge: true,
      screen: 'Cart',
    },
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_notification',
      show: false,
      icon: 'https://i.imgur.com/21iWy7Y.png',
      type: 'icon',
      screen: 'Notification',
    },
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_wishlist',
      show: false,
      icon: 'https://i.imgur.com/2Xe02qj.png',
      type: 'icon',
      screen: 'Wishlist',
    },
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_lang',
      show: true,
      icon: 'https://i.imgur.com/s9xSNdP.png',
      type: 'icon',
      screen: 'Wishlist',
    },
  ]);
  const [appBarLeftDetails, setAppBarLeftDetails] = useState([
    {
      id: '',
      key: 'mobile_home_app_bar_show_icon_drawer',
      show: true,
      icon: 'https://i.imgur.com/GgleigG.png',
      type: 'icon',
      screen: 'drawer',
    },
  ]);
  //   const globalState = useSelector((state: any) => state?.cartList);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  //   const [showSearchBar, setShowSearchBar] = useState(true);
  //   useEffect(() => {
  //     // console.log(configrationState?.defaultData);
  //     if (configrationState?.defaultData) {
  //       const search = configrationState?.defaultData?.home?.sections?.appBar?.search;
  //       setAppBarSearch(search);
  //       setAppBarLogo(configrationState?.defaultData?.home?.sections?.general?.websiteLogo?.logoObj);
  //       setAppBarContainer(configrationState?.defaultData?.home?.sections?.appBar?.container);
  //     }
  //   }, [configrationState?.defaultData]);
  // console.log(appBarLogo);
  // useEffect(() => {
  //   if (configrationState?.defaultData) {
  //     const searchbarValue =
  //       configrationState?.defaultData?.layout?.productDetailsPage
  //         ?.showSearchBarSection;
  //     setShowSearchBar(searchbarValue);
  //     let logoValue = configrationState?.defaultData?.logo;
  //     logoValue = logoValue !== "empty value" ? logoValue : "";
  //     // setThemeLogo(logoValue || "");
  //     setAppBarLogo(configrationState?.defaultData?.appBar?.logoObj);

  //     // ----------- New AppBar Response Values -----------------
  //     const sections = configrationState?.defaultData?.home?.sections;
  //     // console.log(sections?.appBar);

  //     // container
  //     if (
  //       sections?.appBar?.container &&
  //       typeof sections?.appBar?.container === "object"
  //     ) {
  //       setAppBarContainer({
  //         ...appBarContainer,
  //         ...sections?.appBar?.container,
  //       });
  //     }

  //     // search
  //     if (
  //       sections?.appBar?.search &&
  //       typeof sections?.appBar?.search === "object"
  //     ) {
  //       setAppBarSearch({ ...appBarSearch, ...sections?.appBar?.search });
  //     }

  //     // setGeneralIcons
  //     if (
  //       sections?.general?.generalIcons &&
  //       typeof sections?.general?.generalIcons === "object"
  //     ) {
  //       setGeneralIcons({
  //         ...generalIcons,
  //         ...sections?.general?.generalIcons,
  //       });
  //     }

  //     // Logo
  //     if (
  //       sections?.general?.websiteLogo &&
  //       typeof sections?.general?.websiteLogo === "object"
  //     ) {
  //       let logoValue = configrationState?.defaultData?.logo;
  //       logoValue = logoValue !== "empty value" ? logoValue : "";
  //       let responseLogo = sections?.general?.websiteLogo;

  //       let LogoObj = {
  //         status: responseLogo?.status?.toString() || "false",
  //         position: responseLogo?.position || "left",
  //         text: {
  //           ...appBarLogo,
  //           value: responseLogo?.logoObj?.text,
  //           ...responseLogo?.text,
  //         },
  //         logo: {
  //           ...appBarLogo.logo,
  //           ...responseLogo?.logoObj,
  //           width: `${responseLogo?.logoObj?.width}px`,
  //           height: `${responseLogo?.logoObj?.height}px`,
  //           url: logoValue || "",
  //         },
  //       };
  //       setAppBarLogo(LogoObj);
  //     }

  //     // Menu
  //     if (
  //       sections?.appBar?.menu &&
  //       typeof sections?.appBar?.menu === "object"
  //     ) {
  //       setCenterMenu({ ...centerMenu, ...sections?.appBar?.menu });
  //     }
  //   }
  // }, [configrationState?.defaultData]);

  // Banner

  //   const [centerMenu, setCenterMenu] = useState(navbarState[0]?.appBar?.menu);
  // console.log(appBarLogo);
  return (
    <>
      <div
        style={{
          //   width: '100%',
          paddingLeft: '4px',
          paddingRight: '4px',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...appBarContainer,
          border: `${appBarContainer?.borderBottomWidth}px solid ${appBarContainer?.borderBottomColor} `,
          height: appBarContainer?.height,
          display: appBarContainer?.show ? 'flex' : 'none',
          boxShadow: appBarContainer?.isShadow
            ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            : '',
        }}
      // borderTop:
      //   appBarContainer.borderPosition === "top"
      //     ? `1px solid ${appBarContainer.borderColor}`
      //     : "none",
      // borderLeft:
      //   appBarContainer.borderPosition === "left"
      //     ? `1px solid ${appBarContainer.borderColor}`
      //     : "none",
      // borderRight:
      //   appBarContainer.borderPosition === "right"
      //     ? `1px solid ${appBarContainer.borderColor}`
      //     : "none",
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="flex items-center gap-2"
        >
          {appBarLeftDetails?.find((item) => item?.key == 'mobile_home_app_bar_show_icon_drawer')
            ?.show && (
              <div>
                <Image
                  style={{
                    ...generalIcons,
                  }}
                  src={
                    appBarLeftDetails?.find(
                      (item) => item?.key == 'mobile_home_app_bar_show_icon_drawer'
                    )?.icon || ''
                  }
                />
              </div>
            )}
          {appBarSearch?.position === 'left' && appBarSearch?.status && (
            <Input
              input={!matches && appBarSearch?.input}
              style={
                appBarSearch?.input
                  ? {
                    textBg: 'transparent !important',
                    color: appBarSearch?.textColor,
                    border: `${appBarSearch?.borderWidth?.toString()}px solid ${appBarSearch?.borderColor
                      }`,

                    background: 'transparent',
                    display: appBarSearch?.status ? 'flex' : 'none',
                  }
                  : {
                    ...generalIcons,
                    backgroundColor: generalIcons?.hasBackground
                      ? generalIcons?.backgroundColor
                      : 'transparent',
                    border: `${generalIcons?.border.toString()} ${generalIcons?.borderColor}`,
                    boxShadow: generalIcons?.isShadow
                      ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justfiyContent: 'center',
                  }
              }
              className={`${appBarSearch?.mobileView?.status ? 'max-sm:flex' : 'hidden'}`}
              location="left"
            />
          )}
          <div className="flex items-center">
            {appBarLogo?.status && appBarLogo?.position === 'left' && (
              <div className="flex items-center">
                <Image
                  // Style of left Section
                  style={appBarLogo}
                  // Image link
                  src={appBarLogo?.logo}
                />

                <Span
                  style={{ color: appBarLogo?.textColor, backgroundColor: appBarLogo?.textBg }}
                  text={appBarLogo?.text}
                />
              </div>
            )}
          </div>
        </div>
        {/* Center */}
        <div className="flex items-center">
          {centerMenu?.status && (
            <div className="flex items-center gap-3">
              {centerMenu?.menuItems?.map((item: any, i: any) => (
                <span
                  key={i}
                  onMouseEnter={() => setIsHovered(item?.name)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    ...centerMenu?.style,
                    fontSize: centerMenu?.style?.size,
                    color:
                      isHovered === item?.name && centerMenu?.style?.hoverColor
                        ? centerMenu?.style?.hoverColor
                        : centerMenu?.style?.color,
                  }}
                >
                  {item?.name}
                </span>
              ))}
            </div>
          )}
          {appBarLogo?.status && appBarLogo?.position === 'center' && (
            <div className="flex items-center">
              <Image
                // Style of centered Section
                style={appBarLogo}
                // Image link
                src={appBarLogo?.logo}
              />

              {appBarLogo?.text && (
                <Span
                  style={{ color: appBarLogo?.textColor, backgroundColor: appBarLogo?.textBg }}
                  text={appBarLogo?.text}
                />
              )}
            </div>
          )}
          {appBarSearch?.position === 'center' && appBarSearch?.status && (
            <Input
              input={!matches && appBarSearch?.input}
              style={
                appBarSearch?.input
                  ? {
                    background: 'transparent',
                    color:
                      appBarSearch?.textColor === 'empty value'
                        ? 'black'
                        : appBarSearch?.textColor,
                    display: appBarSearch?.status ? 'flex' : 'none',
                    border:
                      appBarSearch?.borderColor !== 'empty value'
                        ? `${appBarSearch?.borderWidth?.toString()}px solid ${appBarSearch?.borderColor
                        }`
                        : 'none',
                  }
                  : generalIcons
              }
              className={`${appBarSearch?.mobileView?.status ? 'max-sm:flex' : 'hidden'}`}
              placeholder={'Hassaan'}
              location="center"
            />
          )}
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="flex items-center gap-3 text-white"
        >
          {appBarLogo?.status && appBarLogo?.position === 'right' && (
            <div className="flex items-center">
              <Image
                // Style of centered Section
                style={appBarLogo}
                // Image link
                src={appBarLogo?.logo}
              />

              {appBarLogo?.text && (
                <Span
                  style={{ color: appBarLogo?.textColor, backgroundColor: appBarLogo?.textBg }}
                  text={appBarLogo?.text}
                />
              )}
            </div>
          )}
          {appBarSearch?.position === 'right' && appBarSearch?.status && (
            <Input
              className={`${appBarSearch?.mobileView?.status ? 'max-sm:flex' : 'hidden'}`}
              input={!matches && appBarSearch?.input}
              style={
                appBarSearch?.input
                  ? {
                    textBg: 'transparent !important',
                    color: appBarSearch?.textColor,
                    border: `${appBarSearch?.borderWidth?.toString()}px solid ${appBarSearch?.borderColor
                      }`,
                    background: 'transparent',
                    display: appBarSearch?.status ? 'flex' : 'none',
                  }
                  : generalIcons
              }
              location="right"
            />
          )}
          {appBarRightDetails?.find((item) => item?.key == 'mobile_home_app_bar_show_icon_lang')
            ?.show && (
              <Image
                style={{
                  ...generalIcons,
                }}
                src={
                  appBarRightDetails?.find(
                    (item) => item?.key == 'mobile_home_app_bar_show_icon_lang'
                  )?.icon || ''
                }
              />
            )}
          {/* <ShoppingCartOutlinedIcon /> */}
          {appBarRightDetails?.find((item) => item?.key == 'mobile_home_app_bar_show_icon_cart')
            ?.show && (
              <Image
                style={{
                  ...generalIcons,
                }}
                src={
                  appBarRightDetails?.find(
                    (item) => item?.key == 'mobile_home_app_bar_show_icon_cart'
                  )?.icon || ''
                }
              />
            )}
        </div>
      </div>
      {/* if cart is not empty */}
    </>
  );
};

export default NavbarTheme;
