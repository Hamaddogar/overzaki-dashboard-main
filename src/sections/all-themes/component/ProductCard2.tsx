import React, { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Stack, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
const ProductCard2 = ({
  img,
  category,
  name,
  styleStyling,
  styleImageStyling,
  styleWishlistStyling,
  layoutContentStyling,
  brand,
  outOfStock,
}: {
  img: string;
  category: string;
  name: string;
  styleStyling: any;
  styleImageStyling: any;
  styleWishlistStyling: any;
  layoutContentStyling: any;
  brand: string;
  outOfStock: string;
}) => {
  const [mainImage, setMainImage] = useState(
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e93db408-ecf6-4982-b0d0-13a756c9b8c2/pegasus-40-mens-road-running-shoes-zD8H1c.png'
  );

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: `${layoutContentStyling.rating.backgroundColorFilled} !important`,
    },
    '& .MuiRating-icon': {
      color: layoutContentStyling.rating.backgroundColorEmpty,
    },
  });
  return (
    <div
      style={{ height: '200px', minWidth: '130px', borderRadius: '8px', ...styleStyling }}
      className="w-80 rounded"
    >
      <div
        style={{
          height: '70%',
          width: '100%',
          display: styleImageStyling.display,
          position: 'relative',
        }}
        className="h-3/4 w-full"
      >
        <img
          className="w-full h-full object-cover rounded-t"
          style={{ height: '100%', width: '100%', objectFit: 'cover', ...styleImageStyling }}
          src={img}
          alt="piña"
        />
        <FavoriteBorderOutlinedIcon
          sx={{
            ...styleWishlistStyling,
            color: 'black',
            padding: '6px',
            width: '25px',
            height: '25px',
          }}
        />
      </div>

      {layoutContentStyling.isContent && (
        <Stack sx={{ minWidth: '130px', padding: layoutContentStyling.padding, maxWidth: '200px' }}>
          <Typography
            style={{
              ...layoutContentStyling.category,
            }}
            variant="caption"
          >
            {category}
          </Typography>
          <Typography
            style={{
              ...layoutContentStyling.brand,
            }}
            variant="caption"
          >
            {brand}
          </Typography>
          <Typography
            style={{
              color: 'black',

              ...layoutContentStyling.title,
            }}
            variant="caption"
          >
            {name}{' '}
          </Typography>
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            <StyledRating
              sx={{ ...layoutContentStyling.rating }}
              value={1.5}
              max={layoutContentStyling.rating.fiveStar}
              readOnly
              size="small"
              name="customized-color"
              defaultValue={1.5}
              precision={0.5}
            />
            <Typography sx={{ ...layoutContentStyling.rating.textValue }} variant="caption">
              (102)
            </Typography>
          </Stack>
          {outOfStock && (
            <Typography
              sx={{ ...layoutContentStyling.outOfStock, borderRadius: '10px' }}
              padding={0.5}
              variant="caption"
            >
              Out Of Stock
            </Typography>
          )}

          {!outOfStock && (
            <Typography
              sx={{ ...layoutContentStyling.stock, borderRadius: '10px' }}
              padding={0.5}
              variant="caption"
            >
              In Stock
            </Typography>
          )}
        </Stack>
      )}
    </div>
  );
};

export default ProductCard2;
