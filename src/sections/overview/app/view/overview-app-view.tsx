'use client';

// @mui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import { FormControlLabel, Switch, Box, Paper } from '@mui/material';
import { paths } from 'src/routes/paths';
import AppHolder from '../app-holder';
import AppPublish from '../app-publish';
import AppAreaInstalled from '../app-area-installed';
import AppSummary from '../app-summary';
import AppOrders from '../app-orders';
import AppProducts from '../app-products';
// import AppPlan from '../app-plan';
// import AppEdit from '../app-edit';
import AppPlanandEdit from '../app-plan-edit';
import { SplashScreen } from 'src/components/loading-screen';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store/store';
import { fetchBestSellingItems } from 'src/redux/store/thunks/analytics';
// ----------------------------------------------------------------------

export default function OverviewAppView() {
  // const { user } = useMockedUser();
  // const theme = useTheme();
  const settings = useSettingsContext();
  const dispatch = useDispatch<AppDispatch>();
  // return (
  //   <SplashScreen />
  // )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <AppPublish
            elevation={7}
            title="Shoppi.com"
            description="http://www.shoppi/overzaki.com"
            img={<SeoIllustration />}
            action={
              <FormControlLabel
                control={<Switch color="primary" defaultChecked />}
                label="Published now"
              />
            }
          />
        </Grid>
        <Grid xs={12}>
          <AppPlanandEdit />
        </Grid>
        {/* <Grid xs={6}>
          <AppPlan elevation={8} />
        </Grid>
        <Grid xs={6}>
          <AppEdit elevation={7} />
        </Grid> */}

        <Grid xs={12}>
          <AppHolder title="Tools" subtitle="All Tools" path={paths.dashboard.general.apptools}>
            {[
              {
                icon: '/raw/orders.svg',
                title: 'Orders',
                color: 'rgb(255, 93, 143,.12)',
              },

              {
                icon: '/raw/Customers0.svg',
                title: 'Customers',
                color: 'rgb(251, 133, 0,.12)',
              },
              {
                icon: '/raw/Categories.svg',
                title: 'Categories',
                color: 'rgb(181, 131, 141,.12)',
              },
              {
                icon: '/raw/Products.svg',
                title: 'Products',
                color: 'rgb(234, 132, 201,.12)',
              },
              {
                icon: '/raw/Analytics.svg',
                title: 'Analytics',
                color: 'rgb(4, 102, 200,.12)',
              },
              {
                icon: '/raw/Delivery-Pickup.svg',
                title: 'Delivery and Pickup',
                color: 'rgb(33, 150, 243,.12)',
              },
              {
                icon: '/raw/Vouchers.svg',
                title: 'Vouchers',
                color: 'rgb(213, 76, 255,.12)',
              },
              {
                icon: '/raw/Payment.svg',
                title: 'Payment Methods',
                color: 'rgb(2, 195, 154,.12)',
              },
              {
                icon: '/raw/Settings.svg',
                title: 'Account Settings',
                color: 'rgb(134, 136, 163,.12)',
              },
              {
                icon: '/raw/Integrations.svg',
                title: 'Integrations',
                color: 'rgb(141, 199, 63,.12)',
              },
              {
                icon: '/raw/domain.svg',
                title: 'Domain Settings',
                color: 'rgb(87, 202, 239,.12)',
              },
              {
                icon: '/raw/design.svg',
                title: 'Website Design',
                color: 'rgb(239, 202, 8,.12)',
              },
            ].map((item, indx) => (
              <Box
                key={indx}
                sx={{
                  width: '100%',
                  maxnWidth: '100px',
                  minWidth: '100px',
                  height: '120px',
                  backgroundColor: item.color,
                  borderRadius: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  flexDirection: 'column',
                }}
              >
                <Box component="img" src={item.icon} sx={{ width: '29px' }} />
                <Typography variant="subtitle2">{item.title} </Typography>
              </Box>
            ))}
          </AppHolder>
        </Grid>

        <Grid xs={12}>
          <AppHolder title="Quick Summary">
            {[
              {
                title: 'Live Visitors',
                icon: '/raw/VisitorsN.svg',
                count: '78',
              },
              {
                title: 'Customers',
                icon: '/raw/CustomersN.svg',
                count: '6.8k',
              },
              {
                title: 'Total Orders',
                icon: '/raw/OrdersN.svg',
                count: '324',
              },
              {
                title: 'Categories',
                icon: '/raw/CategoriesN.svg',
                count: '8',
              },
              {
                title: 'Products',
                icon: '/raw/ProductsN.svg',
                count: '81',
              },
              {
                title: 'Total Earning',
                icon: '/raw/EarningN.svg',
                count: '8,520 KWD',
              },
            ].map((item, indx) => (
              <AppSummary
                elevation={7}
                key={indx}
                title={item.title}
                count={item.count}
                icon={<Box component="img" src={item.icon} />}
              />
            ))}
          </AppHolder>
        </Grid>

        <Grid xs={12}>
          <AppHolder title="Latest Orders" subtitle="All Orders">
            {[
              {
                idNo: '#425453697',
                datetime: '22/03/2022, 3:54 PM',
                name: 'Zain Abdallah',
                status: 'Completed',
                amount: 120,
                itemCount: 2,
                country: 'default',
              },
              {
                idNo: '#425453697',
                datetime: '22/03/2022, 3:54 PM',
                name: 'Zain Abdallah',
                status: 'Pending',
                amount: 120,
                itemCount: 2,
                country: 'default',
              },
              {
                idNo: '#425453697',
                datetime: '22/03/2022, 3:54 PM',
                name: 'Zain Abdallah',
                status: 'Accepted',
                amount: 120,
                itemCount: 2,
                country: 'default',
              },
              {
                idNo: '#425453697',
                datetime: '22/03/2022, 3:54 PM',
                name: 'Zain Abdallah',
                status: 'Rejected',
                amount: 120,
                itemCount: 2,
                country: 'default',
              },
            ].map((item, indx) => (
              <AppOrders
                elevation={7}
                key={indx}
                idNo={item.idNo}
                datetime={item.datetime}
                name={item.name}
                status={item.status}
                amount={item.amount}
                itemCount={item.itemCount}
                country={item.country}
              />
            ))}
          </AppHolder>
        </Grid>

        <Grid xs={12}>
          <AppHolder
            title="Revenue Chart"
            subtitle="View Reports"
            path={paths.dashboard.general.analytics}
          >
            <Paper elevation={7} sx={{ width: '100%' }}>
              <AppAreaInstalled
                title="Total"
                subheader="4.100,500 KWD"
                chart={{
                  categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  series: [
                    {
                      year: '2019',
                      data: [
                        {
                          name: 'Asia',
                          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                        },
                        {
                          name: 'America',
                          data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                        },
                      ],
                    },
                    {
                      year: '2020',
                      data: [
                        {
                          name: 'Asia',
                          data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                        },
                        {
                          name: 'America',
                          data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                        },
                      ],
                    },
                  ],
                }}
              />
            </Paper>
          </AppHolder>
        </Grid>

        <Grid xs={12}>
          <AppHolder
            path={paths.dashboard.general.trending}
            icon="/raw/hot.svg"
            title="Trending"
            subtitle="View All"
            description="Most trending items and products"
          >
            {[
              {
                idNo: '#1',
                name: 'iPhone 13 Pro Max',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/ti1.png',
              },
              {
                idNo: '#2',
                name: 'Smart Watch GXT',
                description: 'Watches - 48 KWD',
                sales: 832,
                img: '/raw/ti2.png',
              },
              {
                idNo: '#3',
                name: 'Apple AirPods Pro White',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/ti3.png',
              },
              {
                idNo: '#1',
                name: 'iPhone 13 Pro Max',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/ti1.png',
              },
              {
                idNo: '#2',
                name: 'Smart Watch GXT',
                description: 'Watches - 48 KWD',
                sales: 832,
                img: '/raw/ti2.png',
              },
            ].map((item, indx) => (
              <AppProducts
                elevation={7}
                key={indx}
                idNo={item.idNo}
                name={item.name}
                description={item.description}
                sales={item.sales}
                img={item.img}
              />
            ))}
          </AppHolder>
        </Grid>

        <Grid xs={12}>
          <AppHolder
            path={paths.dashboard.general.mostselling}
            title="Most Selling"
            subtitle="View All"
            description="Most selling items and products"
          >
            {[
              {
                idNo: '#1',
                name: 'ASUS Laptop - Core i7',
                description: 'Laptops - 489 KWD',
                sales: 832,
                img: '/raw/si1.png',
              },
              {
                idNo: '#2',
                name: 'iPhone 8 Gold',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/si2.png',
              },
              {
                idNo: '#3',
                name: 'Sony Wireless Headphones',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/si3.png',
              },
              {
                idNo: '#1',
                name: 'ASUS Laptop - Core i7',
                description: 'Laptops - 489 KWD',
                sales: 832,
                img: '/raw/si1.png',
              },
              {
                idNo: '#2',
                name: 'iPhone 8 Gold',
                description: 'Mobiles - 142 KWD',
                sales: 254,
                img: '/raw/si2.png',
              },
            ].map((item, indx) => (
              <AppProducts
                elevation={7}
                key={indx}
                idNo={item.idNo}
                name={item.name}
                description={item.description}
                sales={item.sales}
                img={item.img}
              />
            ))}
          </AppHolder>
        </Grid>
      </Grid>
    </Container>
  );
}
