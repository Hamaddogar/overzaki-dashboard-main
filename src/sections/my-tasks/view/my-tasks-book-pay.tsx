'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

// components
import { useSettingsContext } from 'src/components/settings';
import { Paper, Typography, Grid, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { paths } from 'src/routes/paths';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Linker from 'src/sections/overview/subscription-plan/link';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { BottomActions } from 'src/components/bottom-actions';
// import Linker from '../link';

// ----------------------------------------------------------------------

export default function OverviewSubscriptionPlanCheckout() {
  const settings = useSettingsContext();
  const [checked, setchecked] = React.useState('visa-mastercard');

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(pv => !pv)
  }

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
          <BottomActions>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing='10px' width='100%'>
              <Linker path={paths.dashboard.tasks.root} width='100%'>
                <Button fullWidth sx={{ minWidth: '110px !important', borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }} component='h5' variant='contained'> Cancel </Button>
              </Linker>
              <Button fullWidth sx={{ minWidth: '110px !important', borderRadius: '30px', color: '#8688A3', backgroundColor: '#F0F0F4' }} component='h5' variant='contained'> Edit Time </Button>
              <Button onClick={handleToggle} fullWidth sx={{ minWidth: '110px !important', borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary'> Pay </Button>
            </Stack>
          </BottomActions>
        </Grid>
      </Grid>

      <Box sx={{ margin: '30px 0px' }}>  <Divider />  </Box>

      <Grid container justifyContent='center' spacing='25px' pb={{ xs: 20, sm: 0 }}>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb="30px">  Select Payment Method  </Typography>
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


          <Typography variant="h6" my="30px">
            Do you have any note for the call?
          </Typography>
          <Typography variant="caption" mb="5px" component='p' sx={{ opacity: .7 }}>
            Note (Optional)
          </Typography>

          <TextField
            multiline
            minRows={5}
            fullWidth
            variant='filled'
            name='des'
            placeholder="Write your note here..."
          />

        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={10} sx={{ padding: '20px', borderRadius: '12px' }} >
            <Typography variant="h5" mb="30px" sx={{ whiteSpace: 'pre-line', fontSize: '1rem' }}>  Summary </Typography>

            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Service </Typography>
              <Typography variant="subtitle2" >  Call With Support </Typography>
            </Stack>
            <Stack mt='10px' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Call Peroid </Typography>
              <Typography variant="subtitle2" >  30 mins </Typography>
            </Stack>

            <Box sx={{ margin: '20px 0px' }}>  <Divider />  </Box>


            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Session Date </Typography>
              <Typography variant="subtitle2" >  10 June, 2023 </Typography>
            </Stack>

            <Stack my="10px" direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Time </Typography>
              <Typography variant="subtitle2" >  10:00 AM - 10:30 AM </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Price </Typography>
              <Typography variant="subtitle2" >  20 KWD </Typography>
            </Stack>




            <Box sx={{ margin: '20px 0px' }}>  <Divider />  </Box>


            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant="subtitle2" color="#8688A3">  Total </Typography>
              <Typography variant="subtitle2" >  20 KWD </Typography>
            </Stack>






          </Paper>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={open}
        onClose={handleToggle}
        noCancel={false}
        maxWidth='sm'
        content={
          <Box textAlign='center'>
            <Box component='img' src="/raw/Confetti_L.svg" alt="" sx={{ width: '100%' }} />
            <Box component='img' src="/raw/happy.svg" alt="" sx={{ mt: '-8%' }} />

            <Typography component='p' variant="h4"
              sx={{ maxWidth: '218px', marginX: 'auto', mt: '26px' }} >
              Session is booked Successfully
            </Typography>

            <Typography component='p' variant="body1"
              sx={{ mt: '12px', color: '#8688A3', maxWidth: '412px', marginX: 'auto' }} >
              You will be notified before the session time. Be ready for it.
            </Typography>

            <Box mt="20px">
              <Linker path={paths.dashboard.tasks.root} width="100%">
                <Button variant='contained' size='large' color='primary' fullWidth sx={{
                  color: '#0F1349',
                  borderRadius: '30px',
                  boxShadow: '0px 6px 20px #1BFCB633'
                }} onClick={handleToggle}>
                  Go Back
                </Button>
              </Linker>
            </Box>
          </Box>
        }
      />

    </Container >
  );
}
