'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Switch from '@mui/material/Switch';

// components
import { useSettingsContext } from 'src/components/settings';
import { Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { paths } from 'src/routes/paths';
import Linker from '../link';

// ----------------------------------------------------------------------

export default function OverviewSubscriptionPlan() {
  const settings = useSettingsContext();

  const [checked, setchecked] = React.useState(true)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} alignItems='center' justifyContent='center'>
        <Grid xs={12} textAlign='center'>
          <Typography variant="h3" sx={{ whiteSpace: 'pre-line' }}>  Subscription Plan  </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
            Choose your subscription plan that fit your business.
          </Typography>
        </Grid>

        <Grid xs={12}>
          <Stack direction='row' alignItems='center' justifyContent='center' spacing='10px' sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }} >  Monthly  </Typography>
            <Switch
              name="time"
              checked={checked}
              onChange={() => setchecked(pv => !pv)}
            />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>  Yearly  </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} md='auto'>
          <Paper elevation={12}
            sx={{
              maxWidth: "400px",
              margin: 'auto',
              minWidth: { xs: "300px", md: "400px" },
              width: '100%',
              borderRadius: '20px',
              padding: '30px'
            }} >


            <Stack direction='row' alignItems='center' justifyContent='space-between' mb="20px">
              <Box>
                <Typography variant="h5" sx={{ whiteSpace: 'pre-line' }}>
                  Pro Plan
                </Typography>
                <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                  100 KWD/year
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.8 }}
                  component='del'
                >
                  120 KWD/year
                </Typography>
              </Box>
              <Box component='img' src='/raw/pro.svg' />
            </Stack>

            <Linker path={paths.dashboard.general.subscriptionplancheckout}>
              <Button size='large' fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary'> Upgrade Now </Button>
            </Linker>
            <Box mt='20px'>
              {
                [
                  {
                    title: "Lorem Ipsum is typesetting.",
                    included: true,
                  }, {
                    title: "Simply dummy.",
                    included: true,
                  }, {
                    title: "Add Simply dummy text.",
                    included: true,
                  }, {
                    title: "Dummy text of printing.",
                    included: true,
                  }, {
                    title: "Simply dummy text of printing.",
                    included: true,
                  }, {
                    title: "Text of printing.",
                    included: false,
                  }, {
                    title: "Dummy text of printing.",
                    included: false,
                  }, {
                    title: "Simply dummy text of printing.",
                    included: false,
                  },
                ].map((item, indx) => <Stack key={indx} direction='row' alignItems='center' spacing="14px" mb='16px'>
                  <Box component='img' src={item.included ? '/raw/CheckGreen.svg' : '/raw/Missed.svg'} />
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: item.included ? 0.8 : 0.4 }}
                  >{item.title} </Typography>
                </Stack>)}
            </Box>

            <Stack direction='row' alignItems='center' spacing="14px">
              <Box component='img' src='/raw/see-more.svg' />
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.9 }}
                color='default'
              >
                See More
              </Typography>
            </Stack>

          </Paper>
        </Grid>


        <Grid xs={12} md='auto'>
          <Paper elevation={12}
            sx={{
              maxWidth: "400px",
              margin: 'auto',
              minWidth: { xs: "300px", md: "400px" },
              width: '100%',
              borderRadius: '20px',
              padding: '30px'
            }} >


            <Stack direction='row' alignItems='center' justifyContent='space-between' mb="20px">
              <Box>
                <Typography variant="h5" sx={{ whiteSpace: 'pre-line' }}>
                  Advanced Plan
                </Typography>
                <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                  200 KWD/year
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.8 }}
                  component='del'
                >
                  220 KWD/year
                </Typography>
              </Box>
              <Box component='img' src='/raw/advanced.svg' />
            </Stack>

            <Linker path={paths.dashboard.general.subscriptionplancheckout}>
              <Button size='large' fullWidth sx={{ borderRadius: '30px', color: '#0F1349' }} component='h5' variant='contained' color='primary'> Upgrade Now </Button>
            </Linker>
            <Box mt='20px'>
              {
                [
                  {
                    title: "Lorem Ipsum is typesetting.",
                    included: true,
                  }, {
                    title: "Simply dummy.",
                    included: true,
                  }, {
                    title: "Add Simply dummy text.",
                    included: true,
                  }, {
                    title: "Dummy text of printing.",
                    included: true,
                  }, {
                    title: "Simply dummy text of printing.",
                    included: true,
                  }, {
                    title: "Text of printing.",
                    included: true,
                  }, {
                    title: "Dummy text of printing.",
                    included: true,
                  }, {
                    title: "Simply dummy text of printing.",
                    included: true,
                  },
                ].map((item, indx) => <Stack key={indx} direction='row' alignItems='center' spacing="14px" mb='16px'>
                  <Box component='img' src={item.included ? '/raw/CheckGreen.svg' : '/raw/Missed.svg'} />
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: item.included ? 0.8 : 0.4 }}
                  >{item.title} </Typography>
                </Stack>)}
            </Box>

            <Stack direction='row' alignItems='center' spacing="14px">
              <Box component='img' src='/raw/see-more.svg' />
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.9 }}
                color='default'
              >
                See More
              </Typography>
            </Stack>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
