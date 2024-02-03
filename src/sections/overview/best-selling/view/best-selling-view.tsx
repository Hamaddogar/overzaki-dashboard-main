'use client';
import React, { useEffect, useState } from 'react';
import AppOrders from '../../app/app-orders';
import AppHolder from '../../app/app-holder';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import {
  fetchBestSellingCategories,
  fetchBestSellingItems,
} from 'src/redux/store/thunks/analytics';
import Image from 'next/image';

const BestSellingView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bestSellingCategories, setBestSellingCategories] = useState([{}]);
  const [bestSellingItems, setBestSellingItems] = useState([{}]);

  useEffect(() => {
    dispatch(fetchBestSellingItems()).then((resp) => setBestSellingItems(resp?.payload?.data));
    dispatch(fetchBestSellingCategories()).then((resp) =>
      setBestSellingCategories(resp?.payload?.data)
    );
  }, []);
  // console.log(bestSellingItems);
  return (
    <Grid xs={12}>
      <AppHolder title="Best Selling Items">
        {bestSellingItems?.map((item: any) => (
          <Box sx={{ width: '250px' }} key={item.id}>
            <Box component="img" src={item?.productImage?.[0]} alt="product-image" width="100%" />
            <Box sx={{ width: '100%' }}>
              <Typography component="h3">{item?.productName?.en}</Typography>
              <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} component="h3">
                    Total Sales
                  </Typography>
                  <Typography component="h3">KWD {item?.totalSales}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    borderTop: '1px solid lightgray',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} component="h3">
                    Total Orders
                  </Typography>
                  <Typography component="h3">{item?.totalOrders}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    borderTop: '1px solid lightgray',
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                    component="h3"
                  >
                    Quantity Sold
                  </Typography>
                  <Typography component="h3">{item?.quantitySold}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </AppHolder>
      {/* Best Selling Categories */}
      <AppHolder title="Best Selling Categories">
        {bestSellingCategories?.map((category: any, i) => (
          <Box sx={{ width: '250px' }} key={i}>
            <Box component="img" src={category?.categoryImage} alt="product-image" width="100%" />
            <Box sx={{ width: '100%' }}>
              <Typography component="h3">{category?.categoryName?.en}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} component="h3">
                    Total Sales
                  </Typography>
                  <Typography component="h3">KWD {category?.totalSales}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid lightgray',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} component="h3">
                    Total Orders
                  </Typography>
                  <Typography component="h3">{category?.totalOrders}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid lightgray',
                    borderBottom: '1px solid lightgray',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} component="h3">
                    Quantity Sold
                  </Typography>
                  <Typography component="h3">{category?.quantitySold}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </AppHolder>
    </Grid>
  );
};

export default BestSellingView;
