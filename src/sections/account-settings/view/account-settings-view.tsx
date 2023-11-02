/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
// @mui
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Card } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';

// ----------------------------------------------------------------------

export default function AccountSettings() {

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Grid item xs={12}>
          <CustomCrumbs heading="Account Settings"
            crums={false} />
        </Grid>

        <Grid item xs={12} container alignItems='center' sx={{ mt: '20px' }} columnSpacing='20px' rowSpacing='20px' >
          {
            [
              {
                title: "Account Details",
                img: '/raw/AccountSettings.svg',
                description: "Manage your account and password.",
                link: paths.dashboard.accountsettings.AccountDetails
              }, {
                img: '/raw/globe-solid.svg',
                title: "Languages & Countries",
                description: "Manage available languages & currencies.",
                link: paths.dashboard.accountsettings.LanguagesCountries
              }, {
                img: '/raw/staff.svg',
                title: "Staff Management",
                description: "Add staff admins and give them access.",
                link: paths.dashboard.accountsettings.StaffManagement
              }, {
                img: '/raw/webInfo.svg',
                title: "Website Information",
                description: "Manage the information of your website.",
                link: paths.dashboard.accountsettings.WebsiteInformation
              }, {
                img: '/raw/invoicee.svg',
                title: "Invoice Settings",
                description: "Control your invoice settings.",
                link: paths.dashboard.accountsettings.InvoiceSettings
              }, {
                img: '/raw/tax.svg',
                title: "Tax Settings",
                description: "Control VAT, taxes and more.",
                link: paths.dashboard.accountsettings.TaxSettings
              }, {
                img: '/raw/notificationS.svg',
                title: "Notifications Settings",
                description: "Control your website notifications.",
                link: paths.dashboard.accountsettings.NotificationsSettings
              }, {
                img: '/raw/BillingPlans.svg',
                title: "Billing & Plans",
                description: "Control your subscription plan.",
                link: paths.dashboard.accountsettings.BillingPlans
              }
            ].map((card, indx) =>
              <Grid key={indx} item xs={12} sm={6} md={4}>
                <Linker path={card.link}>
                  <Card sx={{ padding: '30px 22px', boxShadow: '0px -6px 40px #00000014', borderRadius: '20px' }}>
                    <Stack direction='row' alignItems='center' spacing='10px'>
                      <Box component='img' src={card.img} alt=" " />
                      <Box sx={{ overflow: 'hidden', height: '100%' }}>
                        <Typography component='p' variant="subtitle2" sx={{ fontSize: '.9rem', fontWeight: 800 }} > {card.title} </Typography>
                        <Typography component='p' noWrap variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.9rem' }} >
                          {card.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Linker>
              </Grid>
            )}
        </Grid >
      </Grid >

    </Container >
  );
}
