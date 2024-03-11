import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const ProductCard4 = ({
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
    <div
      className="relative bg-white py-6 px-6 shadow-xl"
      style={{
        position: 'relative',
        ...styleStyling,
        padding: '6px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="text-white flex items-center absolute rounded-full py-4 px-4 translate-x-[20%] -top-[40%]"
        style={{
          ...styleImageStyling,
          position: 'absolute',

          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',

          paddingTop: '16px',
          transform: 'translateX(60%) translateY(-10%)',
        }}
      >
        <img
          className="w-48 hover:scale-110 transition-all duration-[350ms]"
          src={img}
          style={{
            // objectFit: 'contain',
            width: '4rem',
            height: '4rem',
            transitionDuration: '350ms',
            paddingTop: '',
            borderRadius: '9999px',
          }}
        />
      </div>
      {layoutContentStyling.isContent && (
        <Stack
          sx={{
            minWidth: '130px',
            padding: layoutContentStyling.padding,
            maxWidth: '200px',
            height: '100px',
            marginTop: '4rem',
            textAlign: 'center',
            width: '150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
      {/* <div
        className="mt-12 text-center w-[95%] mx-auto flex flex-col gap-5 items-center justify-center"
        style={{
          marginTop: '3rem',
          textAlign: 'center',
          width: '150px',
          height: '130px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          className="text-2xl font-semibold my-2"
          style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}
        >
          Healthy Berry Fruit Bowl
        </p>
        <div
          className="flex space-x-2 text-gray-400 text-lg"
          style={{ display: 'flex', gap: '0.5rem', color: '#718096', fontSize: '1rem' }}
        >
          <p>Easy Preparation</p>
        </div>

        <div
          className="flex border-t w-full mt-5 border-gray-300 justify-between"
          style={{
            color: 'black',
            display: 'flex',
            width: '100%',
            borderTop: '1px solid #CBD5E0',
            marginTop: '1.25rem',
            justifyContent: 'space-between',
          }}
        >
          <div className="my-2" style={{ marginTop: '0.5rem' }}>
            <p
              className="font-semibold text-base mb-2"
              style={{ fontWeight: '600', marginBottom: '0.5rem' }}
            >
              35 mins
            </p>
          </div>
          <div className="my-2" style={{ marginTop: '0.5rem' }}>
            <p
              className="font-semibold text-base mb-2"
              style={{ fontWeight: '600', marginBottom: '0.5rem' }}
            >
              200 Calories
            </p>
          </div>
        </div>
      </div> */}
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
  );
};

export default ProductCard4;
