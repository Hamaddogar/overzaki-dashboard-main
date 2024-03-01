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

const BannerSlider = ({ bannerType, data, bannerContainerStyling }: any) => {
  const [swiperKey, setSwiperKey] = useState(Date.now());
  useEffect(() => {
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
        <SwiperSlide key={i} style={{ position: 'relative' }} className="relative">
          <img className="w-full object-center" src={item?.src} />
          {item?.textStatus && (
            <h1 style={{ ...item?.style, position: 'absolute', width: '50%', fontSize: '10px' }}>
              {item?.text}
            </h1>
          )}
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>
        <img src="https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg" />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default BannerSlider;
