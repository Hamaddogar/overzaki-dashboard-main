import { Stack, Typography } from '@mui/material';
import React from 'react';

const OrderNumber = ({
  orderNumberNumber,
  orderNumberDate,
  orderNumberStatus,
  orderNumberContainer,
}: any) => {
  return (
    <Stack sx={{ ...orderNumberContainer }} boxShadow={orderNumberContainer.shadow ? 5 : 0}>
      <Typography variant="subtitle1">Order Number</Typography>
      <Stack marginTop={2}>
        <Typography sx={{ ...orderNumberNumber }} variant="subtitle1">
          #12345
        </Typography>
        <Typography sx={{ ...orderNumberDate }} variant="subtitle1">
          12/01/2024
        </Typography>
        <Typography sx={{ ...orderNumberStatus }} color={'gray'} fontSize={14} variant="subtitle1">
          Delivered
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderNumber;
