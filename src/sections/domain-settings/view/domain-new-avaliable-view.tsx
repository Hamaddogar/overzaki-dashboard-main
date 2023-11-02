'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
//
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import Linker from 'src/sections/overview/subscription-plan/link';
import { Stack } from '@mui/system';
import React from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
// import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------
const avaliableDomains = [
  "shoppiii.com",
  "shoppi4me.net",
  "shoppishoppi.net",
  "onlineshoppi.com"
]
// const handleSelect = (domain: string) => (event: any) => ;
const selectedStyle = {
  width: "400px",
  height: "56px",
  borderRadius: "16px",
  px: '20px',
  cursor: 'pointer',
  mt: '12px',
  transition: "all .4s",

  border: "2px solid #1BFCB6",
  color: "#0F1349",
  fontWeight: 900,
  background: 'rgb(27, 252, 182,.1)'
}
const normalStyle = {
  width: "400px",
  height: "56px",
  borderRadius: "16px",
  px: '20px',
  cursor: 'pointer',
  mt: '12px',
  transition: "all .4s",

  border: "2px solid #F0F0F4",
  color: "#8688A3",
}

export default function NewDomainAvaliable() {
  const settings = useSettingsContext();

  const [selected, setSelected] = React.useState("");
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
        {
          avaliableDomains.map((domain, indx) => (
            <Stack direction='row' alignItems='center' justifyContent='space-between'
              key={indx}
              sx={domain === selected ?
                selectedStyle
                :
                normalStyle
              }
              onClick={() => setSelected(domain)}
            >
              <Typography>{domain}</Typography>
              {domain === selected && <Iconify style={{ transition: "all .4s" }} icon="subway:tick" color="#1BFCB6" />}
            </Stack>
          ))
        }

        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '12px',
          mt: '10px',
        }} color="#0F1349" >
          <Checkbox
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
          <span>
            I agree on
          </span>
          <span style={{ fontWeight: 800, textDecoration: 'underline', color: '#0F1349' }}>
            Terms & conditions
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
              <Linker path={paths.dashboard.domain.new_controls} width="100%">
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
