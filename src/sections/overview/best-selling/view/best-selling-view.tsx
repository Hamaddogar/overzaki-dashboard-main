'use client';
import React, { useEffect, useState } from 'react';
import AppOrders from '../../app/app-orders';
import AppHolder from '../../app/app-holder';
import { Box, Card, CardContent, CardMedia, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
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
  const sellingItems = [
    {
      id: '123',
      image: '/raws/banner1.png',
      name: { en: 'Demo Product' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
    {
      id: '323',
      image: '/raws/banner1.png',
      name: { en: 'Demo Product 2' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
  ];
  const sellingCategories = [
    {
      id: '123',
      image: '/raws/banner1.png',
      name: { en: 'Demo Product' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
    {
      id: '323',
      image: '/raws/banner1.png',
      name: { en: 'Demo Product 2' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
  ];

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
        {bestSellingItems.length > 0
          ? bestSellingItems?.map((item: any, index) => (
            <ProductCard category={item} key={index} />
          ))
          : sellingItems.map((item: any, index) => (
            <ProductCard category={item} key={index} />
          ))}
      </AppHolder>
      {/* Best Selling Categories */}
      <AppHolder title="Best Selling Categories">
        {bestSellingCategories?.length > 0
          ? bestSellingCategories.map((category: any, i) => (
            <ProductCard category={category} key={i} />

          ))
          : sellingCategories.map((category, index) => (
            <ProductCard category={category} key={index} />
          ))}
      </AppHolder>
    </Grid>
  );
};

export default BestSellingView;


const SalesInfo = ({ label, value }: any) => (
  <Grid container justifyContent="space-between">
    <Grid item>
      <Typography variant="body1" color="textSecondary">
        {label}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2" fontWeight="fontWeightMedium">
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const ProductCard = ({ category }: any) => (
  <Card
    sx={{
      maxWidth: 345,
      mr: 2,
      transition: 'transform 0.3s ease-in-out, border 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.01)',
        border: '2px solid #1BFBB6', // Use your preferred border color
      },
    }}
  >
    <CardMedia
      component="img"
      height="140"
      image={category?.image}
      alt="product-image"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {category?.name?.en}
      </Typography>
      {category?.offer && (
        <Chip label={`${category?.offer} OFF`} color="primary" size="small" />
      )}
      <Box mt={2}>
        <SalesInfo label="Total Sales" value={`KWD ${category?.totalSales}`} />
        <SalesInfo label="Total Orders" value={category?.totalOrders} />
        <SalesInfo label="Quantity Sold" value={category?.quantitySold} />
      </Box>
    </CardContent>
  </Card>
);
