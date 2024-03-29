import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';

const CheckoutDealer = () => {
  return (
    <Stack>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Delivery Details</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Full Name
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>

          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Contact</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Phone Number
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Email Address
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Location Type</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  House
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Office
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Apartment
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Location Details</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Area
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Block
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Street
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  House
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Avenue
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Payment</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Enable COD
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Google Pay
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Samsung Pay
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  VISA
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  KNET
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Enter Card
                </Typography>
                <Switch inputProps={{ 'aria-label': 'controlled' }} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Cart</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Enable Cart
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Decrease Product Quantity
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Delete Product
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Total
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Coupon
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default CheckoutDealer;
