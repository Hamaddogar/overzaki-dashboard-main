/* eslint-disable no-nested-ternary */

'use client';

// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';


const data = [
  {
    icon: '/assets/images/design/Market.png',
    title: "Market",
  }, {
    icon: '/assets/images/design/Restaurant.png',
    title: "Restaurant",
  }, {
    icon: '/assets/images/design/Groceries.png',
    title: "Groceries",
  }, {
    icon: '/assets/images/design/Flowers.png',
    title: "Flowers",
  }, {
    icon: '/assets/images/design/Beauty.png',
    title: "Beauty",
  }, {
    icon: '/assets/images/design/Fashion.png',
    title: "Fashion",
  }, {
    icon: '/assets/images/design/Electronics.png',
    title: "Electronics",
  }, {
    icon: '/assets/images/design/Home.png',
    title: "Home",
  }, {
    icon: '/assets/images/design/Health.png',
    title: "Health",
  }, {
    icon: '/assets/images/design/Library.png',
    title: "Library",
  }, {
    icon: '/assets/images/design/Gifts.png',
    title: "Gifts",
  }, {
    icon: '/assets/images/design/Art.png',
    title: "Art",
  }, {
    icon: '/assets/images/design/Sports.png',
    title: "Sports",
  }, {
    icon: '/assets/images/design/Furniture.png',
    title: "Furniture",
  }, {
    icon: '/assets/images/design/Toys.png',
    title: "Toys",
  }, {
    icon: '/assets/images/design/Optics.png',
    title: "Optics",
  }, {
    icon: '/assets/images/design/Cars.png',
    title: "Cars",
  }
]

export default function DesignMain() {


  return (
    <Box sx={{ height: '100%', transition: 'all .5' }}>

      <Typography variant='h6' sx={{ padding: { xs: '5px', sm: '13px' } }}>
        Please Select a Category
      </Typography>

      <Grid container spacing={2} mt={2} px={2}>
        {data.map((item, indx) => <Grid item key={indx} xs={6} sm={4} md={3}>
          <Linker path={paths.dashboard.design.themes((item.title).toLowerCase())} >
            <Box
              sx={{
                width: "100%",
                height: "120px",
                backgroundColor: "rgb(134, 136, 163,.09)",
                borderRadius: "16px",
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                flexDirection: 'column',
                transition: 'all .5s',
                cursor: { xs: 'default', sm: 'pointer' },
                '&:hover': {
                  backgroundColor: "rgb(27, 252, 182)",
                }
              }}
            >
              <Box component='img' src={item.icon} sx={{ width: '34px' }} />
              <Typography component='h5' variant="subtitle2" sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }} >{item.title} </Typography>
            </Box>
          </Linker>
        </Grid>
        )}

      </Grid>

    </Box >
  );
}
