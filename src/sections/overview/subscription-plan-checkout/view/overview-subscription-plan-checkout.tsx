'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

// components
import { useSettingsContext } from 'src/components/settings';
import { Paper, Typography, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { paths } from 'src/routes/paths';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Linker from '../link';

// ----------------------------------------------------------------------

export default function OverviewSubscriptionPlanCheckout() {
  const settings = useSettingsContext();
  const [checked, setchecked] = React.useState('visa-mastercard');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12} md="auto">
          <CustomCrumbs
            heading="Checkout"
            description="Complete the payment process to subcribe."
            crums={false}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack direction='row' alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='20px'>
            <Linker path={paths.dashboard.general.subscriptionplan}>
              <Button fullWidth sx={{ minWidth: '110px !important', borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }} component='h5' variant='contained'> Cancel </Button>
            </Linker>

            <Linker path={paths.dashboard.root}>
              <Button fullWidth sx={{ minWidth: '110px !important', borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary'> Pay </Button>
            </Linker>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ margin: '30px 0px' }}>  <Divider />  </Box>

      <Grid container justifyContent='center' spacing='25px'>




        <Grid item xs={12} md={6}>
          <Typography variant="h5" mb="30px" sx={{ whiteSpace: 'pre-line', fontSize: '1rem' }}>  Select Payment Method  </Typography>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
            width: '100%',
            height: '60px',
            border: checked === "visa-mastercard" ? "2px solid #1BFCB6" : "2px solid #E6E6EC",
            background: checked === "visa-mastercard" ? "rgb(27, 252, 182,.3)" : "rgb(27, 252, 182,0)",
            borderRadius: '16px',
            padding: '0px 24px',
            mb: '15px',
            transition: 'all .4s'
          }}
            onClick={() => setchecked("visa-mastercard")}
          >
            <FormControlLabel value="visa-mastercard" control={<Radio checked={checked === "visa-mastercard"} size="medium" />} label="Payment Card" />
            <Box component='img' src='/raw/visa-mastercard.svg' />
          </Stack>


          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
            width: '100%',
            height: '60px',
            border: checked === "KNET" ? "2px solid #1BFCB6" : "2px solid #E6E6EC",
            background: checked === "KNET" ? "rgb(27, 252, 182,.3)" : "rgb(27, 252, 182,0)",
            borderRadius: '16px',
            padding: '0px 24px',
            transition: 'all .4s'
          }}
            onClick={() => setchecked("KNET")}
          >
            <FormControlLabel value="KNET" control={<Radio checked={checked === "KNET"} size="medium" />} label="Payment Card" />
            <Box component='img' src='/raw/KNET.svg' />
          </Stack>


        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={10} sx={{ padding: '20px', borderRadius: '12px' }} >
            <Typography variant="h5" mb="30px" sx={{ whiteSpace: 'pre-line', fontSize: '1rem' }}>  Summary </Typography>

            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  Plan Name </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  Pro Plan </Typography>
            </Stack>

            <Box sx={{ margin: '20px 0px' }}>  <Divider />  </Box>


            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  Subscription </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  12 months </Typography>
            </Stack>
            <Stack mt='15px' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  From </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  10 June, 2023 </Typography>
            </Stack>
            <Stack mt='15px' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  To </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  9 June, 2024 </Typography>
            </Stack>




            <Box sx={{ margin: '20px 0px' }}>  <Divider />  </Box>


            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  Subscription Fees </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  120 KWD </Typography>
            </Stack>
            <Stack mt='15px' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  Discount </Typography>
              <Typography variant="subtitle1" color='error' sx={{ fontSize: '1rem' }}>  - 20 KWD</Typography>
            </Stack>
            <Box sx={{ margin: '20px 0px' }}>  <Divider />  </Box>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle1" sx={{ opacity: 0.6, fontSize: '1rem' }}>  Total </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>  100 KWD </Typography>
            </Stack>






          </Paper>
        </Grid>
      </Grid>


    </Container >
  );
}
