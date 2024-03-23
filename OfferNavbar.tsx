/* eslint-disable */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useRouter } from 'next/navigation';
const OfferNavbar = () => {
  const router = useRouter();
  const [adAppbar, setAdAppbar] = useState({
    width: '100%',
    height: '60px',
    backgroundColor: 'white',

    textPosition: '',
    Slider: [
      {
        text: 'Hamad',
        imageURL: 'https://1000logos.net/wp-content/uploads/2020/09/James-Bond-Logo-2012.png',
        href: '/search',
      },
      {
        text: 'Hamad',
        imageURL: 'https://1000logos.net/wp-content/uploads/2020/09/James-Bond-Logo-2012.png',
        href: '/checkout',
      },
      {
        text: 'Hamad',
        imageURL: 'https://1000logos.net/wp-content/uploads/2020/09/James-Bond-Logo-2012.png',
        href: '',
      },
    ],
  });
  const { Slider, ...restOfStyles } = adAppbar;
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 1700 }}
      loop
      className="w-full flex items-center justify-center"
    >
      {adAppbar?.Slider?.map((item, i) => (
        <SwiperSlide
          style={{
            ...restOfStyles,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={i}
        >
          <div
            onClick={item?.href ? () => router.push(item?.href) : () => {}}
            className="flex cursor-pointer items-center w-full justify-center"
          >
            <img className="w-8 h-8" src={item?.imageURL} />
            <span>{item?.text}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OfferNavbar;
