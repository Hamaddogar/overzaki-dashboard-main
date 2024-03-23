import React, { useState } from 'react';

const ProductCard3 = () => {
  const [thumbnailImages, setThumbnailImages] = useState([
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e93db408-ecf6-4982-b0d0-13a756c9b8c2/pegasus-40-mens-road-running-shoes-zD8H1c.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f38be280-5ab6-4fe7-8c1c-9f1af38a29ff/pegasus-40-premium-mens-road-running-shoes-zD8H1c.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/84cdecfe-c952-432b-9e01-b22126cfe197/pegasus-40-eliud-kipchoge-road-running-shoes-zD8H1c.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/984c9c5e-2641-4e3b-a0ee-5dfa772f4e2c/pegasus-40-mens-road-running-shoes-extra-wide-zD8H1c.png',
  ]);
  const [mainImage, setMainImage] = useState(thumbnailImages[0]);
  const [showThumbnailImages, setShowThumbnailImages] = useState(false);
  return (
    <div
      onMouseLeave={() => setShowThumbnailImages(false)}
      onMouseEnter={() => setShowThumbnailImages(true)}
      className="w-80 rounded"
    >
      <div className="h-3/4 w-full">
        <img className="w-full h-full object-cover rounded-t" src={mainImage} alt="piña" />
      </div>
      {showThumbnailImages && (
        <div className="flex gap-2 mt-2 items-center w-full">
          {thumbnailImages.map((item) => (
            <img
              onMouseEnter={() => setMainImage(item)}
              key={item}
              className="w-12 h-12 rounded"
              src={item}
            />
          ))}
        </div>
      )}

      <div className="w-full h-1/4">
        <a href="#" className="  text-gray-700">
          <span className="text-lg font-semibold uppercase tracking-wide ">Pineapple</span>
        </a>
        <p className="text-gray-600 text-sm leading-5 mt-1">Suit</p>
        <span className="text-lg font-semibold">$22</span>
      </div>
    </div>
  );
};

export default ProductCard3;
