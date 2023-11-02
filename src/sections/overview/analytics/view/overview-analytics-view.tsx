'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { useSettingsContext } from 'src/components/settings';
//

import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { Paper } from '@mui/material';
import AppAreaInstalled from '../../app/app-area-installed';
import AppHolder from '../../app/app-holder';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomCrumbs
        heading="Analytics"
        description="Reports and analytics on your website."
        crums={false}
      />
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

      <CustomCrumbs
        sx={{ mt: "40px" }}
        heading="Summary"
        description="Reports and numbers on your website."
        crums={false}
      />
      <AppHolder>
        {[
          {
            title: "TOTAL SALES",
            growth: "+6%",
            count: '4,129.500',
          }, {
            title: "AVERAGE ORDER VALUE",
            growth: "-32%",
            count: '16.750',
            color: "#FF008B"
          }, {
            title: "TOTAL ORDERS",
            growth: "+2.5%",
            count: '304',
          }, {
            title: "TOTAL CUSTOMERS",
            growth: "+4.1%",
            count: '1.892',
          },
        ].map((item, indx) => <Paper key={indx} elevation={11} >
          <Grid container p="20px" alignItems='center' sx={{
            width: "256px",
            height: "100px",
            borderRadius: "16px",
          }}>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px' }}>
              <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.6rem' }} >{item.title}</Typography>
              <Typography component='p' variant="subtitle2" sx={{ fontSize: '.7.5rem', color: item.color ?? "#00DF9A" }} >{item.growth} </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography component='p' variant="h6" sx={{ fontSize: '.8rem' }} >
                {item.count} <span style={{ fontSize: '12px' }}>KWD</span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        )}
      </AppHolder>



    </Container>
  );
}
