/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Button, Switch } from '@mui/material';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// ----------------------------------------------------------------------

export default function InvoiceSetting() {

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs heading="Invoice Settings" />
      </Box>

      <Box mt='20px'>
        <Typography variant="body1" sx={{ fontWeight: 900 }} >
          Do you want to send invoices to your customer?
        </Typography>
        <FormControl fullWidth >
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="send-invoices-label"
            defaultValue="send"
            name="send-invoices"
          >
            <Stack direction='row' sx={{ maxWidth: '250px' }} alignItems='center' justifyContent='space-between' >
              <FormControlLabel value="send" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ borderWidth: '1px', my: '30px' }} />

      <Box>
        <Typography variant="body1" sx={{ fontWeight: 900 }} >
          Invoice Template & Order Summary
        </Typography>
        <Typography component='p' variant="caption" color='#8688A3' >
          Edit the invoice details and view for your customers.
        </Typography>

        <Box mt='20px'>
          <FormControlLabel
            control={<Switch color='primary' />}
            label="QR Code"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Barcode"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Order Status"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' />}
            label="ETA"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="SKU"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Product Weights"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Discount Coupon Code"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' />}
            label="Store Address"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>


        <Box>
          <FormControlLabel
            control={<Switch color='primary' defaultChecked />}
            label="Payment Status in Order"
            sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
          />
        </Box>

        <Box sx={{ maxWidth: '400px', mt: '20px' }}>
          <Button fullWidth variant='contained' color='primary' size='large'
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349'
            }}>
            Save
          </Button>
        </Box>

      </Box>

    </Container >
  );
}
