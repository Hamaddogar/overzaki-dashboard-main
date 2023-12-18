/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import 'react-multi-carousel/lib/styles.css';
import './style.css';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
// components
// import Linker from 'src/sections/overview/subscription-plan-checkout/link';
// import { paths } from 'src/routes/paths';
// images
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ECom from 'src/assets/themes-images/theme-ecom.png';
import ECom2 from 'src/assets/themes-images/them-ecom-2.png';
import Cafe from 'src/assets/themes-images/theme-cafe.png';
import rest1 from 'src/assets/themes-images/burgerBoutique.png';
import rest2 from 'src/assets/themes-images/fatayeralaaltayer.png';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// ----------------------------------------------------------------------
interface PersonalProps {
  theme_type: string;
}

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 2,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 564 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 564, min: 0 },
//     items: 1,
//   },
// };

export default function ThemesViewRoot({ theme_type }: PersonalProps) {
  const data = [
    { name: 'ecom', image: ECom, type: 'market', url: 'https://ecom-zaki.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bice.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bic2e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bic2e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bic1342e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bic2e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bi6c2e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bic01w02e.vercel.app' },
    { name: 'ecomv2', image: ECom2, type: 'market', url: 'https://e-com-v2-bico205e.vercel.app' },
    { name: 'cafe', image: Cafe, type: 'market', url: 'https://resturant-ui-mu.vercel.app' },
    { name: 'cafe', image: Cafe, type: 'home', url: 'https://resturant-ui-mu.vercel.app' },
    {
      name: 'burgerboutique',
      image: rest1,
      type: 'restaurant',
      url: 'https://burgerboutique.vercel.app',
    },
    {
      name: 'fatayer',
      image: rest2,
      type: 'restaurant',
      url: 'https://fatayeralaaltayer.vercel.app',
    },
  ];

  // const notAvaliableThemes = ((allCategories.join(' ').toLowerCase()).includes(theme_type));
  const notAvaliableThemes = data.filter((item) => item.type === theme_type).length === 0;

  return (
    <Box sx={{ height: '100%' }}>
      {!notAvaliableThemes && (
        <Container
          sx={{
            pb: 3,
          }}
        >
          <div className="text-block-heading">
            <h3 style={{ fontWeight: 900 }}>Website Theme</h3>
            <p>Please select the theme you love</p>
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
              slidesPerGroup={1}
              loop
              dir="rtl"
              grabCursor
              centeredSlides
              breakpoints={{
                0: {
                  slidesPerView: 1.3,
                },

                768: {
                  // width: 768,
                  slidesPerView: 2,
                },
                820: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
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
              {data
                .filter((item) => item.type === theme_type)
                .map((theme, indx) => (
                  <SwiperSlide key={indx} className="swiper-slide">
                    <Image
                      style={{ borderRadius: '20px' }}
                      alt='sc'
                      className="swiper-image"
                      width={350}
                      height={550}
                      src={theme.image}
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
                <button
                  type="button"
                  style={{
                    backgroundColor: '#1bfcb6',
                    color: '#10134a',
                    border: 'none',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    paddingTop: '10px',
                    borderRadius: '9999px',
                    paddingBottom: '10px',
                    fontWeight: 700,
                  }}
                >
                  Preview
                </button>
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
                  }}
                >
                  Apply
                </button>
              </div>
            </Swiper>
          </Box>
        </Container>
      )}

      {/* {notAvaliableThemes && (
        <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <Typography variant="h4">Comming Soon ...</Typography>
          <Linker path={paths.dashboard.design.root}>
            <Button variant="outlined" size="small">
              Back to Selection
            </Button>
          </Linker>
        </Stack>
      )} */}
    </Box>
  );
}
