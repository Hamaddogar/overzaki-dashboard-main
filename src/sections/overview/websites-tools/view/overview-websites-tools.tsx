"use client"

import Container from '@mui/material/Container';
import { Box, Grid, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
// ----------------------------------------------------------------------


export default function Tools() {
    const settings = useSettingsContext();
    return <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomCrumbs
            heading="Website Tools"
            description="Control everything using all the tools."
        />
        <Grid container spacing={2} mt={2}>
            {[
                {
                    icon: '/raw/orders.svg',
                    title: "Orders",
                    color: 'rgb(255, 93, 143,.12)'
                }, {
                    icon: '/raw/Customers0.svg',
                    title: "Customers",
                    color: 'rgb(251, 133, 0,.12)'
                }, {
                    icon: '/raw/Categories.svg',
                    title: "Categories",
                    color: 'rgb(181, 131, 141,.12)'
                }, {
                    icon: '/raw/Products.svg',
                    title: "Products",
                    color: 'rgb(234, 132, 201,.12)'
                }, {
                    icon: '/raw/Analytics.svg',
                    title: "Analytics",
                    color: 'rgb(4, 102, 200,.12)'
                }, {
                    icon: '/raw/Delivery-Pickup.svg',
                    title: "Delivery and Pickup",
                    color: 'rgb(33, 150, 243,.12)'
                }, {
                    icon: '/raw/Vouchers.svg',
                    title: "Vouchers",
                    color: 'rgb(213, 76, 255,.12)'
                }, {
                    icon: '/raw/Payment.svg',
                    title: "Payment Methods",
                    color: 'rgb(2, 195, 154,.12)'
                }, {
                    icon: '/raw/Settings.svg',
                    title: "Account Settings",
                    color: 'rgb(134, 136, 163,.12)'
                }, {
                    icon: '/raw/Integrations.svg',
                    title: "Integrations",
                    color: 'rgb(141, 199, 63,.12)'
                }, {
                    icon: '/raw/domain.svg',
                    title: "Domain Settings",
                    color: 'rgb(87, 202, 239,.12)'
                }, {
                    icon: '/raw/design.svg',
                    title: "Website Design",
                    color: 'rgb(239, 202, 8,.12)'
                },
            ].map((item, indx) => <Grid item key={indx} xs={6} sm={4} md={3}>
                <Box
                    sx={{
                        width: "100%",
                        height: "120px",
                        backgroundColor: item.color,
                        borderRadius: "16px",
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px',
                        flexDirection: 'column'
                    }}
                >
                    <Box component='img' src={item.icon} sx={{ width: '29px' }} />
                    <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }} >{item.title} </Typography>
                </Box>
            </Grid>
            )}

        </Grid>
    </Container>;
}
