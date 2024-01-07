'use client';

import React from 'react';
import ECom from 'src/assets/themes-images/theme-ecom.png';
import ECom2 from 'src/assets/themes-images/them-ecom-2.png';
import Cafe from 'src/assets/themes-images/theme-cafe.png';
import rest1 from 'src/assets/themes-images/burgerBoutique.png';
import rest2 from 'src/assets/themes-images/fatayeralaaltayer.png';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import './styles.css';
import Link from 'next/link';

const page = () => {
  const data = [
    { name: 'ecom', image: ECom, type: 'market', url: 'https://ecom-zaki.vercel.app', num: 1 },
    {
      name: 'ecomv2',
      image: ECom2,
      type: 'market',
      url: 'https://e-com-v2-bice.vercel.app',
      num: 2,
    },
    {
      name: 'cafe',
      image: Cafe,
      type: 'market',
      url: 'https://resturant-ui-mu.vercel.app',
      num: 3,
    },
    {
      name: 'burgerboutique',
      image: rest1,
      type: 'restaurant',
      url: 'https://burgerboutique.vercel.app',
      num: 4,
    },
    {
      name: 'burgerboutique',
      image: rest1,
      type: 'restaurant',
      url: 'https://burgerboutique.vercel.app',
      num: 4,
    },
    {
      name: 'burgerboutique',
      image: rest1,
      type: 'restaurant',
      url: 'https://burgerboutique.vercel.app',
      num: 4,
    },
    {
      name: 'fatayer',
      image: rest2,
      type: 'restaurant',
      url: 'https://fatayeralaaltayer.vercel.app',
      num: 5,
    },
    {
      name: 'fatayer',
      image: rest2,
      type: 'restaurant',
      url: 'https://fatayeralaaltayer.vercel.app',
      num: 5,
    },
  ];
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" sx={{ textAlign: 'start', padding: { xs: '5px', sm: '13px' } }}>
        Create Website
      </Typography>
      <div>
        <Typography variant="h5" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
          Default Theme
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', fontSize: '10px', padding: { xs: '5px', sm: '13px' } }}
        >
          Simple, Modern & easy to use
        </Typography>
      </div>
      <Box
        sx={{
          maxWidth: '100%',
          margin: 'auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Swiper
          effect="coverflow"
          spaceBetween={80}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            1040: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          loop
          dir="rtl"
          grabCursor
          centeredSlides
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {data.map((themeD: any, indx: any) => (
            <SwiperSlide key={indx} className="swiper-slide">
              <Image
                style={{ borderRadius: '20px', maxWidth: '350px' }}
                alt="sc"
                className="swiper-image"
                width={350}
                height={550}
                src={themeD.image}
              />
            </SwiperSlide>
          ))}

          <div style={{ backgroundColor: 'red' }} className="slider-controler">
            <div className="slide-inside">
              <div className="swiper-button-prev slider-arrow">
                <ArrowBackOutlinedIcon
                  sx={{
                    color: '#323232',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    fontSize: '10px',
                  }}
                />
              </div>
              <div className="swiper-button-next slider-arrow">
                <ArrowForwardOutlinedIcon
                  sx={{
                    color: '#323232',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
              gap: '8px',
            }}
          >
            <Link
              href="/test-screen-6"
              style={{
                backgroundColor: '#1bfcb6',
                color: '#10134a',
                textDecoration: 'none',
                border: 'none',
                paddingLeft: '50px',
                paddingRight: '50px',
                paddingTop: '10px',
                borderRadius: '9999px',
                paddingBottom: '10px',
                fontWeight: 700,
              }}
            >
              Apply
            </Link>
            <button
              type="button"
              style={{
                backgroundColor: '#10134a',
                color: 'white',
                border: 'none',
                paddingLeft: '50px',
                paddingTop: '10px',
                borderRadius: '9999px',
                paddingBottom: '10px',
                paddingRight: '50px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Preview
            </button>
          </div>
        </Swiper>
      </Box>
    </div>
  );
};

export default page;
