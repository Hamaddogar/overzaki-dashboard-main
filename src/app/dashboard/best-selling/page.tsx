'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import {
  fetchBestSellingCategories,
  fetchBestSellingItems,
} from 'src/redux/store/thunks/analytics';
import BestSellingView from 'src/sections/overview/best-selling/view/best-selling-view';

const page = () => {
  const dispatch = useDispatch<AppDispatch>();

  return <BestSellingView />;
};

export default page;
