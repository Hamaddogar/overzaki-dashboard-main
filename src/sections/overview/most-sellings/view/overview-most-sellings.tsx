"use client"

import Container from '@mui/material/Container';
import { Box, Chip, Grid, Typography, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { useCallback, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
// ----------------------------------------------------------------------

export default function MostSelling() {
  const settings = useSettingsContext();
  const [currency, setCurrency] = useState('Yearly');
  const handleChangeCurrency = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  }, []);

  return <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Grid container justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }}>
      <Grid item xs={12} md="auto">
        <CustomCrumbs
          heading="Most Selling Products"
          description="Track the most selling items and products."
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <Stack direction='row' alignItems='center' spacing='20px'>
          <TextField
            sx={{
              maxWidth: '140px',
              '& .MuiFilledInput-input': {
                borderRadius: '16px',
                padding: '13px !important'
              },
              '& .MuiInputAdornment-root': {
                marginTop: '0px !important'
              },
            }}
            variant='filled'
            fullWidth
            select
            value={currency}
            onChange={handleChangeCurrency}
          >
            {[
              { value: 'Yearly', label: 'Yearly' },
              { value: 'Monthly', label: 'Monthly' },
              { value: '2021', label: '2021' },
              { value: '2020', label: '2020' },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            placeholder='Search ...'
            fullWidth
            variant='filled'
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <Box component='img' src='/raw/search.svg' sx={{ width: '20px' }} />
              </InputAdornment>,
            }}
            sx={{
              // boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.02), 0px 1px 3px 0px rgba(50, 50, 93, 0.15)`,
              borderRadius: '16px',
              '& .MuiFilledInput-root': {
                borderRadius: '16px',
              },
              '& .MuiInputAdornment-root': {
                marginTop: '0px !important'
              },
              '& input': {
                color: '#8898AA',
                paddingLeft: '10px',
                fontSize: '14px',
                padding: '15px 10px 15px 0px !important'
              }
            }}
          />


        </Stack>
      </Grid>
    </Grid>

    <Grid container spacing={2} mt={2}>

      {[
        {
          idNo: "#1",
          img: '/raw/s1.png',
          name: "iPhone 13 Pro Max",
          category: 'Mobiles',
          price: 199.5,
          totalSales: 1.254,
          growth: '+2.5%',
          graph: '/raw/gr.svg'
        },
        {
          idNo: "#2",
          img: '/raw/s2.png',
          name: "Black Smart Watch GXT",
          category: 'Watches',
          price: 38.5,
          totalSales: 846,
          growth: '+3.5%',
          graph: '/raw/gr.svg'
        }, {
          idNo: "#3",
          img: '/raw/s3.png',
          name: "HP ENVY Laptop",
          category: 'Laptops',
          price: 1.540,
          totalSales: 781,
          growth: '+2.8%',
          graph: '/raw/gr.svg'
        }, {
          idNo: "#4",
          img: '/raw/s4.png',
          name: "iPhone 8 Gold",
          category: 'Mobile',
          price: 199.5,
          totalSales: 254,
          growth: '+1.99%',
          graph: '/raw/gr.svg'
        }, {
          idNo: "#5",
          img: '/raw/s5.png',
          name: "Apple AirPods Pro White",
          category: 'Mobile',
          price: 59.5,
          totalSales: 143,
          growth: '+0.5%',
          graph: '/raw/gr.svg'
        },

      ].map((item, indx) =>
        <Grid key={indx} item xs={12}>
          <Paper elevation={4}>
            <Grid container item alignItems='center' justifyContent='center' rowGap={14} sx={{ px: 3, minHeight: '110px' }}>
              <Grid item container xs={12}>
                <Grid item xs={12} md={6} >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <Chip size='small' label={item.idNo} sx={{ backgroundColor: 'rgb(27, 252, 182,.2)', color: '#0F1349' }} />
                    <Box sx={{
                      width: '60px',
                      height: '60px',
                      border: '1px solid #F8F8FA',
                      p: "4px",
                      borderRadius: '3px'
                    }} >
                      <Box component='img' src={item.img} alt={item.name} width='100%' />
                    </Box>
                    <Box display='flex' gap='0px' flexDirection='column' >
                      <Typography component='span' variant="h6" sx={{ fontSize: '.8rem' }} >{item.name}</Typography>
                      <Typography component='span' variant="subtitle2" sx={{ opacity: 0.8, fontSize: '.8rem' }} >{item.category}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} container alignItems='center' justifyContent='space-between' >
                  <Grid item xs='auto'>
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.7.5rem' }} >Price</Typography>
                    <Typography component='p' variant="h6" sx={{ fontSize: '.8rem' }} >{item.price} <span style={{ fontSize: '12px' }}>KWD</span></Typography>
                  </Grid>
                  <Grid item xs='auto'>
                    <Typography component='p' variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.7.5rem' }} >Total Sales</Typography>
                    <Typography component='p' variant="h6" sx={{ fontSize: '.8rem' }} >{item.totalSales} <span style={{ fontSize: '12px' }} >sales</span></Typography>
                  </Grid>
                  <Grid item xs='auto'>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Typography noWrap component='p' variant="subtitle2" sx={{ opacity: 0.8, fontSize: '.8rem', color: '#00DF9A' }} >{item.growth}</Typography>
                      <Box component='img' src='/raw/gr.png' alt={item.name} sx={{ width: '80px' }} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}

    </Grid>


  </Container>;
}
