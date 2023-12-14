/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useDispatch } from 'react-redux';
import { editNotificationsSettings, fetchNotificationsSettingssList } from 'src/redux/store/thunks/notificationsSettings';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function NotificationSetting() {
  const dispatch = useDispatch<any>();
  const settings = useSettingsContext();

  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    dispatch(fetchNotificationsSettingssList()).then((response: any) => {
      const { pushNotifications, newOrderNotification, subscriptionNotfication, notificationAndAlertsSound } = response.payload;
      setData({
        pushNotifications,
        newOrderNotification,
        subscriptionNotfication,
        notificationAndAlertsSound
      })
    });
  }


  const saveChanges = () => {
    dispatch(editNotificationsSettings(data)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Notifications Settings"
          description='Control everything related to your website notifications and settings.'
        />
      </Box>

      <Box sx={{ maxWidth: '400px', mt: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' name="pushNotifications" checked={!!data?.pushNotifications} onChange={(e, value) => setData({ ...data, [e.target.name]: value })} />}
            label="Push Notifications"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch color='primary' name="newOrderNotification" checked={!!data?.newOrderNotification} onChange={(e, value) => setData({ ...data, [e.target.name]: value })} />}
            label="New Order Notification"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' name="subscriptionNotfication" checked={!!data?.subscriptionNotfication} onChange={(e, value) => setData({ ...data, [e.target.name]: value })} />}
            label="Subscription Notification"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' name="notificationAndAlertsSound" checked={!!data?.notificationAndAlertsSound} onChange={(e, value) => setData({ ...data, [e.target.name]: value })} />}
            label="Notification & Alerts Sound"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>




        <Box mt='20px'>
          <Button
            onClick={saveChanges}
            fullWidth size='large' variant='contained' color='primary' sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px'
            }}>
            Save
          </Button>
        </Box>
      </Box>

    </Container >
  );
}
