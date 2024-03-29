import { Stack, Typography } from '@mui/material';
import React from 'react';

const OrderCard = ({
  orderCardNumber,
  orderCardDate,
  orderCardProducts,
  orderCardTotal,
  orderCardContainer,
}: any) => {
  return (
    <Stack sx={{ ...orderCardContainer }} boxShadow={orderCardContainer.shadow}>
      <Stack direction="row" width={'100%'} justifyContent={'space-between'}>
        <Typography sx={{ ...orderCardNumber }} variant="subtitle1">
          #11223344
        </Typography>
        <Typography
          bgcolor={'#1BFBB6'}
          paddingX={3}
          paddingY={0.25}
          borderRadius={'20px'}
          variant="subtitle1"
        >
          Cancelled
        </Typography>
      </Stack>
      <Typography sx={{ ...orderCardDate }} variant="subtitle1">
        22/03/2024, 04:45 PM
      </Typography>
      <Typography sx={{ ...orderCardProducts }} textAlign={'end'} variant="subtitle1">
        3 items
      </Typography>
      <Typography sx={{ ...orderCardTotal }} variant="h6">
        Total
      </Typography>
    </Stack>
  );
};

export default OrderCard;
