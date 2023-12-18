/* eslint-disable no-nested-ternary */

'use client';

// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';
import { Icon } from '@iconify/react';

const data = [
  {
    icon: 'ant-design:shopping-outlined',
    title: 'Market',
  },
  {
    icon: 'mdi:food-outline',
    title: 'Restaurant',
  },
  {
    icon: 'material-symbols:food-bank-outline',
    title: 'Groceries',
  },
  {
    icon: 'game-icons:flowers',
    title: 'Flowers',
  },
  {
    icon: 'material-symbols:health-and-beauty-outline',
    title: 'Beauty',
  },
  {
    icon: 'fluent-mdl2:shirt',
    title: 'Fashion',
  },
  {
    icon: 'fe:mobile',
    title: 'Electronics',
  },
  {
    icon: 'material-symbols:home-outline',
    title: 'Home',
  },
  {
    icon: 'fluent-mdl2:health',
    title: 'Health',
  },
  {
    icon: 'bi:book',
    title: 'Library',
  },
  {
    icon: 'octicon:gift-24',
    title: 'Gifts',
  },
  {
    icon: 'mdi:art',
    title: 'Art',
  },
  {
    icon: 'ri:football-fill',
    title: 'Sports',
  },
  {
    icon: 'map:furniture-store',
    title: 'Furniture',
  },
  {
    icon: 'material-symbols-light:toys-outline',
    title: 'Toys',
  },
  {
    icon: 'akar-icons:glasses',
    title: 'Optics',
  },
  {
    icon: 'ph:car',
    title: 'Cars',
  },
];

export default function DesignMain() {
  return (
    <Box sx={{ height: '100%', transition: 'all .5', paddingBottom: '30px' }}>
      <Typography variant="h6" sx={{ padding: { xs: '5px', sm: '13px' } }}>
        Please Select a Category
      </Typography>

      <Grid container spacing={2} mt={2} px={2}>
        {data.map((item, indx) => (
          <Grid item key={indx} xs={6} sm={4} md={3}>
            <Linker path={paths.dashboard.design.themes(item.title.toLowerCase())}>
              <Box
                sx={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: 'rgb(134, 136, 163,.09)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  flexDirection: 'column',
                  transition: 'all .5s',
                  cursor: { xs: 'default', sm: 'pointer' },
                  '&:hover': {
                    backgroundColor: 'rgb(27, 252, 182)',
                  },
                }}
              >
                <Icon width={24} icon={item.icon} />
                <Typography
                  component="h5"
                  variant="subtitle2"
                  sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }}
                >
                  {item.title}{' '}
                </Typography>
              </Box>
            </Linker>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
