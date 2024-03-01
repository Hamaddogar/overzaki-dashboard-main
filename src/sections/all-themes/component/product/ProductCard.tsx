import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
const ProductCard = ({
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
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: `${layoutContentStyling.rating.backgroundColorFilled} !important`,
    },
    '& .MuiRating-icon': {
      color: layoutContentStyling.rating.backgroundColorEmpty,
    },
  });

  return (
    <div style={{ ...styleStyling }}>
      <Box sx={{ display: styleImageStyling.display, position: 'relative' }}>
        <img style={{ ...styleImageStyling, height: '200px', minWidth: '130px' }} src={img} />
        <FavoriteBorderOutlinedIcon
          sx={{
            ...styleWishlistStyling,
            color: 'black',
            padding: '6px',

            width: '25px',
            height: '25px',
          }}
        />
      </Box>
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

export default ProductCard;
