import { Stack, Typography } from '@mui/material';
import React from 'react';

const DeliveryAddress = ({
  deliveryAddressContainer,
  deliveryAddressText,
  deliveryAddressHeading,
}: any) => {
  return (
    <Stack
      style={{ ...deliveryAddressContainer }}
      boxShadow={deliveryAddressContainer.shadow ? 5 : 0}
    >
      <Typography style={{ ...deliveryAddressHeading }} variant="subtitle1">
        Delivery Address
      </Typography>
      <Stack style={{ ...deliveryAddressText }} marginTop={1}>
        <Typography fontSize={deliveryAddressText.fontSize} variant="subtitle1">
          Area: area 1
        </Typography>
        <Typography fontSize={deliveryAddressText.fontSize} variant="subtitle1">
          Block: block 1
        </Typography>
        <Typography fontSize={deliveryAddressText.fontSize} variant="subtitle1">
          Street: street 1
        </Typography>
        <Typography fontSize={deliveryAddressText.fontSize} variant="subtitle1">
          Avenue: avenue 1
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DeliveryAddress;
