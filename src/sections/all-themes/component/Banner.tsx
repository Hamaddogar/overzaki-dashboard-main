import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { sections } from './response';
import { Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper/modules';
import { Stack } from '@mui/system';

const BannerSlider = ({ bannerType, data, bannerContainerStyling }: any) => {
  const [swiperKey, setSwiperKey] = useState(Date.now());
  useEffect(() => {
    console.log(bannerType);

    // Update the key whenever bannerType changes
    setSwiperKey(Date.now());
  }, [bannerType]);

  return (
    <Swiper
      key={swiperKey}
      modules={
        bannerType === 'Manual'
          ? [Navigation]
          : bannerType === 'Auto'
            ? [Autoplay]
            : [EffectFade, Autoplay]
      }
      className="relative"
      style={{ position: 'relative', ...bannerContainerStyling }}
      effect={(bannerType === 'Fade' && 'fade') || ''}
      navigation={bannerType === 'Manual'}
      autoplay={{ delay: 1200 }}
      loop
    >
      {data?.map((item: any, i: any) => (
        <SwiperSlide
          key={i}
          style={{ position: 'relative', border: '5px solid #5cb85c' }}
          className="relative"
        >
          <img className="w-full object-center" src={item} />
          {item?.textStatus && (
            <h1 style={{ ...item?.style, position: 'absolute', width: '50%', fontSize: '10px' }}>
              {item?.text}
            </h1>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;