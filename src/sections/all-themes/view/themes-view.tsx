/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

// @mui
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import Container from '@mui/material/Container';
import { Box, Button, Stack, Typography } from '@mui/material';
// components
import Linker from 'src/sections/overview/subscription-plan-checkout/link';
import { paths } from 'src/routes/paths';
// images
import ECom from 'src/assets/themes-images/theme-ecom.png';
import ECom2 from 'src/assets/themes-images/them-ecom-2.png';
import Cafe from 'src/assets/themes-images/theme-cafe.png';
import rest1 from 'src/assets/themes-images/burgerBoutique.png';
import rest2 from 'src/assets/themes-images/fatayeralaaltayer.png';
import Image from 'next/image';

// ----------------------------------------------------------------------
interface PersonalProps {
  theme_type: string;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 564 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1
  }
};
export default function ThemesViewRoot({ theme_type }: PersonalProps) {
  const data = [
    { name: 'ecom', image: ECom, type: 'market', url: "https://ecom-zaki.vercel.app" },
    { name: 'ecomv2', image: ECom2, type: 'market', url: "https://e-com-v2-bice.vercel.app" },
    { name: 'cafe', image: Cafe, type: 'market', url: "https://resturant-ui-mu.vercel.app" },
    { name: 'cafe', image: Cafe, type: 'home', url: "https://resturant-ui-mu.vercel.app" },
    { name: 'burgerboutique', image: rest1, type: 'restaurant', url: "https://burgerboutique.vercel.app" },
    { name: 'fatayer', image: rest2, type: 'restaurant', url: "https://fatayeralaaltayer.vercel.app" },
  ];


  // const notAvaliableThemes = ((allCategories.join(' ').toLowerCase()).includes(theme_type));
  const notAvaliableThemes = (data.filter(item => item.type === theme_type)).length === 0


  return (
    <Box sx={{ height: '100%' }}>
      {!notAvaliableThemes && <Container sx={{ py: 3 }}>
        <Typography variant='h6'>
          Please Select Theme
        </Typography>

        <Box sx={{ maxWidth: '500px', margin: 'auto' }}>
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={responsive}
            infinite
          // autoPlay
          >
            {(data.filter(item => item.type === theme_type)).map((theme, indx) => (
              <Box key={indx} className="rainbow" sx={{ textAlign: 'center', marginRight: '10px' }}>
                <Image src={theme.image} alt={theme.name} layout='intrinsic' width={220} height={300} />
                {/* <Box className='theme-title'>{theme.name} </Box> */}
                <Box className='theme-title' my={2} >Apply Theme</Box>
                <Linker path={paths.dashboard.design.theme(theme_type, theme.name, theme.url)} sx={{ textAlign: 'center' }}>
                  <Box className='theme-subtitle' my={2}>Edit Theme</Box>
                </Linker>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Container>}


      {notAvaliableThemes && <Stack sx={{ height: '100%' }} alignItems='center' justifyContent='center'>
        <Typography variant='h4'>Comming Soon ...</Typography>
        <Linker path={paths.dashboard.design.root}>
          <Button variant='outlined' size='small'>Back to Selection</Button>
        </Linker>
      </Stack>}

    </Box>
  );
}
