'use client';

import React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card/Card';
import Divider from '@mui/material/Divider/Divider';
import { Box, Stack, Typography, Button } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function AccountDetails() {

  const settings = useSettingsContext();
  
  const theme = useTheme();
  
  const mdDown = useResponsive('down', 'md');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>

      <Box sx={{ maxWidth: '500px' }}>
        <Box mb='30px'>
          <CustomCrumbs
            heading="Billing & Plans"
            description='Control everything related to your website notifications and settings.'
          />
        </Box>

        <Box>
          <Card sx={{
            borderRadius: 2,
            boxShadow: { xs: 'none', md: '0px 0px 20px #00000014' }
          }}>
            <Stack
              flexDirection={{ xs: 'column', md: 'row' }}
              justifyContent='space-between'
              alignItems='center'
              sx={{
                backgroundColor: "#1BFCB6",
                p: {
                  xs: theme.spacing(3, 3, 3, 3),
                  md: theme.spacing(3, 0, 3, 3),
                },
                color: 'primary.darker',
                borderRadius: mdDown ? theme.spacing(2, 2, 0, 0) : theme.spacing(2, 2, 2, 2),
                position: 'relative',
              }}
              spacing={4}
            >
              <Box component='img' src='/raw/dl.png' sx={{ width: '100%', maxWidth: '140px', maxHeight: '90px' }} />
              <Box component='img' src='/raw/sparkles_icon.png' sx={{ position: 'absolute', right: '18px', top: '22px', display: { xs: 'none', sm: 'block' } }} />
              <Stack
                flexGrow={1}
                justifyContent="center"
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                }}
                spacing="7px"
              >
                <Typography variant="h4" sx={{ whiteSpace: 'pre-line', }}>
                  Pro Plan
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    maxWidth: 360,
                    mb: { xs: 1 },
                    color: ' #282B5C'
                  }}
                >
                  100 KWD/year
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button variant='contained' sx={{ width: { xs: '100%', md: 'auto' }, padding: '6px 23px', fontSize: '13px', backgroundColor: '#0F1349', '&:hover': { backgroundColor: '#0F1349' }, color: '#FFFFFF', borderRadius: '20px', fontWeight: 300 }} >
                    Upgrade Plan
                  </Button>

                  <Button variant='contained' sx={{ width: { xs: '100%', md: 'auto' }, padding: '6px 23px', fontSize: '13px', backgroundColor: '#1AE0AA', '&:hover': { backgroundColor: '#1AE0AA' }, color: '#0F1349', borderRadius: '20px', fontWeight: 300 }} >
                    Renew Plan
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Box>


        <Box mt='20px'>
          <Typography variant='caption' color='#8688A3' >Billing History</Typography>
        </Box>

        <Divider sx={{ borderWidth: '1px', borderColor: 'rgb(178, 179, 197,.3)', my: '20px' }} />


        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 900 }}>
              Pro Plan (1 year)
            </Typography>
            <Typography variant='caption' color='#8688A3'>
              100 KWD
            </Typography>
          </Box>
          <Typography variant='caption' color='#8688A3'>
            12 June, 2023 at 03:51 PM
          </Typography>
        </Stack>


        <Divider sx={{ borderWidth: '1px', borderColor: 'rgb(178, 179, 197,.3)', my: '20px' }} />


        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 900 }}>
              Pro Plan (1 year)
            </Typography>
            <Typography variant='caption' color='#8688A3'>
              100 KWD
            </Typography>
          </Box>
          <Typography variant='caption' color='#8688A3'>
            8 June, 2024 at 10:45 PM
          </Typography>
        </Stack>


        <Divider sx={{ borderWidth: '1px', borderColor: 'rgb(178, 179, 197,.3)', my: '20px' }} />


        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 900 }}>
              Pro Plan (1 year)
            </Typography>
            <Typography variant='caption' color='#8688A3'>
              100 KWD
            </Typography>
          </Box>
          <Typography variant='caption' color='#8688A3'>
            3 June, 2023 at 03:51 PM
          </Typography>
        </Stack>
      </Box>
    </Container >
  );
}
