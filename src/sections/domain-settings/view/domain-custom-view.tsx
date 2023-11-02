'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
//
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Iconify from 'src/components/iconify/iconify';
import Linker from 'src/sections/overview/subscription-plan/link';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export default function CustomDomainView() {

  const settings = useSettingsContext();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(pv => !pv)
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Website Domain"
          description="Enter a domain name for your website and we will search for you."
          crums={false}
        />
      </Box>


      <Box sx={{ maxWidth: '400px', mt: '30px' }}>
        <Typography color="#8688A3" fontSize='14px' mb='5px' pl='5px' >Domain Name</Typography>
        <TextField
          variant="filled"
          fullWidth

          placeholder='domain'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography>www.</Typography>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography>.com</Typography>
              </InputAdornment>
            ),
          }}
          sx={{
            '.MuiInputAdornment-root': {
              margin: '0px !important',
              color: "#0F1349",
              fontWeight: 900,
            },
            '& input': {
              paddingX: '0px !important'
            }
          }}
        />
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '12px',
          mt: '10px',
        }} color="#AAABBE" >
          <Iconify icon="ic:sharp-info" />
          <span>
            We will use this domain and update DNS for your website.
          </span>
        </Typography>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'warap',
          fontSize: '12px',
          mt: '10px',
        }}>
          <Linker path={paths.dashboard.domain.root} width='100%'>
            <Button fullWidth variant='contained' size='large' sx={{ bgcolor: '#F0F0F4', color: '#8688A3', borderRadius: '30px' }}>Cancel</Button>
          </Linker>
          <Button onClick={handleToggle} fullWidth variant='contained' color='primary' size='large' sx={{ color: '#0F1349', borderRadius: '30px' }}>Confirm</Button>
        </Box>
      </Box>


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
              Domain is linked Successfully
            </Typography>

            <Typography component='p' variant="body1"
              sx={{ mt: '12px', color: '#8688A3', maxWidth: '412px', marginX: 'auto' }} >
              Your domain is linked Successfully to your website! you can now share and publish your website.
            </Typography>

            <Box mt="20px">
              <Linker path={paths.dashboard.domain.custom_controls} width="100%">
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
