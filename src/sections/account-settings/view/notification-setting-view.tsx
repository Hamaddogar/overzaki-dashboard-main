/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// ----------------------------------------------------------------------

export default function NotificationSetting() {

  const settings = useSettingsContext();

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
            control={<Switch color='primary' />}
            label="Push Notifications"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="New Order Notification"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Subscription Notification"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' />}
            label="Notification & Alerts Sound"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>




        <Box mt='20px'>
          <Button fullWidth size='large' variant='contained' color='primary' sx={{
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
