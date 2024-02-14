// @mui
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import Linker from 'src/sections/overview/subscription-plan/link';
import { paths } from 'src/routes/paths';

//
import { HEADER, NAV } from '../config-layout';
import {
  Searchbar,
  AccountPopover,
  SettingsButton,
  LanguagePopover,
  ContactsPopover,
  NotificationsPopover,
} from '../_common';
import { AppDispatch } from 'src/redux/store/store';
import { useDispatch } from 'react-redux';
import { fetchBuilderList, setBuilder } from 'src/redux/store/thunks/builder';
import { useSelector } from 'react-redux';
import { getBuilderDomain, setBuilderDomain } from 'src/auth/context/jwt/utils';
import { resetAllReducers } from 'src/redux/store/thunks/resetSlice';
import { addSelectedDomain } from 'src/redux/store/thunks/selectedDomain';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};
type DomainState = {
  service: string;
  open: HTMLElement | null;
};


export default function Header({ onOpenNav }: Props) {

  const dispatch = useDispatch<AppDispatch>();
  const { list, builder, error } = useSelector((state: any) => state.builder);

  const theme = useTheme();

  const [domain, setDomain] = React.useState<DomainState>({
    service: "shopi",
    open: null
  });
  const [selectedDomain, setSelectedDomain] = useState<any>(null);


  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setDomain(pv => ({ ...pv, open: event.currentTarget }));
  }, []);

  const handleClose = React.useCallback((service: any = null) => (event: React.MouseEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    setDomain(pv => ({ ...pv, open: null }));
    if (service !== "all") {
      // setSelectedDomain(service);
      setBuilderObjects(service)
    }

  }, []);

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const smUp = useResponsive('up', 'sm');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  // ----------------------------------------------------
  useEffect(() => {
    dispatch(fetchBuilderList(error));
  }, []);




  useEffect(() => {
    if (list?.length > 0) {
      const tanentDomain = getBuilderDomain()
      if (tanentDomain) {
        const builder = list.find((obj: any) => obj.domain === tanentDomain);
        if (builder) {
          setBuilderObjects(builder);
        } else {
          setBuilderObjects(list[0]);
        }
      } else {
        setBuilderObjects(list[0]);

      }
    }
  }, [list]);

  const setBuilderObjects = (builder: any) => {
    dispatch(setBuilder(builder));
    setSelectedDomain(builder);
    setBuilderDomain(builder?.domain)
    dispatch(resetAllReducers());
    dispatch(addSelectedDomain(builder))
  }


  // ----------------------------------------------------
  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo full={isNavHorizontal} sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}


      {smUp && (
        <Box sx={{ transition: 'all .5s', minWidth: '160px' }} onClick={handleOpen}  >



          {selectedDomain && Object.entries(selectedDomain).length > 0 && (
            <Stack direction='row' alignItems='center' spacing="4px" sx={{cursor:"pointer"}}>
              <Box component='img' src={selectedDomain?.appLogo} sx={{ width: '40px' }} />
              <Box>
                <Typography
                  component='p'
                  variant="subtitle2"
                  sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', fontSize: '0.775rem', fontWeight: 900, gap: '3px' }}
                > <span>{selectedDomain?.appName?.localized || ""}</span>
                  <Box component='img' src='/raw/shopi2.svg' sx={{ color: '#FFFFFF' }} /> </Typography>
                <Typography
                  component='p'
                  variant="subtitle2"
                  sx={{ opacity: 0.6, fontSize: '0.675rem' }}
                > <span>{selectedDomain?.domain}</span>  </Typography>
              </Box>
            </Stack>
          )}






        </Box>
      )}
      <Menu id="domain-menu" anchorEl={domain.open} sx={{}} onClose={handleClose('all')} open={Boolean(domain.open)}>

        {list?.map((builder: any, index: any) => (
          <MenuItem key={index} selected={selectedDomain?._id === builder?._id} sx={{ marginBottom: "20px" }} onClick={handleClose(builder)}>
            <Stack direction='row' alignItems='center' spacing="40px" >
              <Stack direction='row' alignItems='center' spacing="4px" >
                <Box component='img' src={builder?.logo} sx={{ width: '40px' }} />
                <Box>
                  <Typography
                    component='p'
                    variant="subtitle2"
                    sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', cursor:'pointer', fontSize: '0.775rem', fontWeight: 900, gap: '3px' }}
                  > <span style={{ cursor: 'pointer'}}>{builder?.appName?.localized || ""}</span> </Typography>
                  <Typography
                    component='p'
                    variant="subtitle2"
                    sx={{ opacity: 0.6, fontSize: '0.675rem' , cursor:'pointer'}}
                  > <span style={{ cursor: 'pointer'}}>{builder?.domain || ""}</span>  </Typography>
                </Box>
              </Stack>
              {selectedDomain?._id === builder?._id && (
                <Box sx={{
                  color: "#21CE99",
                  backgroundColor: 'rgb(33, 206, 153,.1)',
                  padding: '4px 6px',
                  fontSize: '10px',
                  borderRadius: '10px'
                }} >Active</Box>
              )}

            </Stack>
          </MenuItem>

        ))}



        <MenuItem >
          <Linker path={paths.dashboard.newDesign.root} >
            <Stack direction='row' alignItems='center' spacing="20px" >
              <Box sx={{ fontSize: '34px', color: '#8688A3', width: '40px', height: '40px', borderRadius: '40px', border: '2px dashed #8688A3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                +
              </Box>
              <Typography
                component='p'
                variant="subtitle2"
                sx={{ opacity: 0.6, fontSize: '0.675rem' }}
              > Add new Project </Typography>
            </Stack>
          </Linker>
        </MenuItem>











      </Menu>
      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <SettingsButton />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: '0px 3px 20px #00000014 ',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
