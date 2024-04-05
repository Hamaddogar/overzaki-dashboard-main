import { Stack, Typography } from '@mui/material';
import React from 'react';

const OrderSummary = ({
  orderSummarySubtotal,
  orderSummaryDiscount,
  orderSummaryVAT,
  orderSummaryFee,
  orderSummaryPayment,
  orderSummaryTotal,
}: any) => {
  return (
    <Stack padding={3} boxShadow={5}>
      <Typography variant="subtitle1">Order Summary</Typography>
      <Stack width={'100%'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummarySubtotal }} variant="subtitle1">
            Subtotal
          </Typography>
          <Typography sx={{ ...orderSummarySubtotal.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummaryDiscount }} variant="subtitle1">
            Discount
          </Typography>
          <Typography sx={{ ...orderSummaryDiscount.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummaryVAT }} variant="subtitle1">
            VAT
          </Typography>
          <Typography sx={{ ...orderSummaryVAT.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummaryFee }} variant="subtitle1">
            Delivery Fees
          </Typography>
          <Typography sx={{ ...orderSummaryFee.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummaryTotal }} variant="subtitle1">
            Total
          </Typography>
          <Typography sx={{ ...orderSummaryTotal.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ ...orderSummaryPayment }} variant="subtitle1">
            Payment Method
          </Typography>
          <Typography sx={{ ...orderSummaryPayment.value }} variant="subtitle1">
            100 KWD
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderSummary;
