import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { sections } from './response';

const OfferNavbar = ({ adAppbar }: any) => {
  const { slider, ...restOfStyles } = adAppbar;
  // console.log(restOfStyles);


  return (
    adAppbar.status && (
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1700 }}
        loop
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: adAppbar?.height && adAppbar?.height > 50 ? `${adAppbar?.height}px` : "50px", background: adAppbar?.bakgroundColor || "white" }}
      // className="w-full flex items-center justify-center"
      >
        {adAppbar?.slider?.map((item: any, i: any) => (
          <SwiperSlide
            style={{
              width: '100%',
              background: "transparent",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // ...restOfStyles,
            }}
            key={i}
          >
            <div
              style={{
                display: 'flex',
                cursor: 'pointer',
                width: '100%',
                justifyContent:
                  adAppbar.textPosition === 'center'
                    ? 'center'
                    : adAppbar.textPosition === 'left'
                      ? 'start'
                      : 'end',
                alignItems: 'center',
              }}
            //   onClick={item?.href ? () => router.push(item?.href) : () => {}}
            //   className="flex cursor-pointer items-center w-full justify-center"
            >
              <img
                style={{ width: '12px', height: '12px' }}
                // className="w-8 h-8"
                src={item?.imageURL}
              />
              <span style={{ color: item.color || 'black' }}>{item?.text}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default OfferNavbar;
