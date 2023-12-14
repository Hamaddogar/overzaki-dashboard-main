/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import {
  editInvoiceSettings,
  fetchInvoiceSettingsList,
  setInvoiceSettings,
} from 'src/redux/store/thunks/invoiceSettings';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function InvoiceSetting() {
  const dispatch = useDispatch<any>();
  const [settingDetails, setSettingDetails] = useState<any>();
  useEffect(() => {
    dispatch(fetchInvoiceSettingsList()).then((response: any) =>
      setSettingDetails(response.payload.data)
    );
  }, [dispatch]);

  const settings = useSettingsContext();

  const dataToMap = [
    {
      label: 'ETA',
      name: 'ETA',
    },
    {
      label: 'QR Code',
      name: 'QRCode',
    },
    {
      label: 'SKU',
      name: 'SKU',
    },
    {
      label: 'Barcode',
      name: 'barcode',
    },
    {
      label: 'Order Status',
      name: 'orderStatus',
    },
    {
      label: 'Product Weights',
      name: 'productWeights',
    },
    {
      label: 'Discount Coupon Code',
      name: 'discountCouponCode',
    },
  ];
  const saveChanges = () => {
    const {
      ETA,
      QRCode,
      SKU,
      barcode,
      discountCouponCode,
      orderStatus,
      productWeights,
      sendingToCustomer,
    } = settingDetails;
    const dataToPush = {
      ETA,
      QRCode,
      SKU,
      barcode,
      discountCouponCode,
      orderStatus,
      productWeights,
      sendingToCustomer,
    };

    dispatch(editInvoiceSettings(dataToPush)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
        dispatch(fetchInvoiceSettingsList()).then((data: any) =>
          setSettingDetails(data.payload.data)
        );
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs heading="Invoice Settings" />
      </Box>

      <Box mt="20px">
        <Typography variant="body1" sx={{ fontWeight: 900 }}>
          Do you want to send invoices to your customer?
        </Typography>
        <FormControl fullWidth>
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            aria-labelledby="send-invoices-label"
            // defaultValue="send"
            onChange={(e) =>
              setSettingDetails((prev: any) => ({
                ...prev,
                sendingToCustomer: e.target.value === 'true',
              }))
            }
            name="send-invoices"
          >
            <Stack
              direction="row"
              sx={{ maxWidth: '250px' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <FormControlLabel
                checked={settingDetails && settingDetails.sendingToCustomer}
                value
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                checked={settingDetails && !settingDetails.sendingToCustomer}
                value={false}
                control={<Radio />}
                label="No"
              />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ borderWidth: '1px', my: '30px' }} />

      <Box>
        <Typography variant="body1" sx={{ fontWeight: 900 }}>
          Invoice Template & Order Summary
        </Typography>
        <Typography component="p" variant="caption" color="#8688A3">
          Edit the invoice details and view for your customers.
        </Typography>
        {dataToMap.map((item: any) => (
          <ToggleSwitch
            checked={settingDetails}
            settingDetails={settingDetails}
            setSettingDetails={setSettingDetails}
            name={item.name}
            label={item.label}
            key={item.name}
          />
        ))}

        <Box sx={{ maxWidth: '400px', mt: '20px' }}>
          <Button
            onClick={saveChanges}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349',
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
const ToggleSwitch = ({
  name,
  label,
  setSettingDetails,
  settingDetails,
  checked,
}: {
  name: string;
  label: string;
  setSettingDetails: any;
  settingDetails: any;
  checked: boolean;
}) => (
  <Box>
    <FormControlLabel
      name={name}
      onChange={(e) =>
        setSettingDetails((prev: any) => ({
          ...prev,
          // [e.target?.name]: (prev[e.target?.name] = !prev[e.target?.name]),
          [name]: (prev[name] = !prev[name]),
        }))
      }
      control={
        <Switch checked={settingDetails && settingDetails[name]} name={name} color="primary" />
      }
      label={label}
      sx={{ '& .MuiTypography-root': { fontWeight: 900 } }}
    />
  </Box>
);
