import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { ChangeEvent, useState } from 'react';
import Iconify from 'src/components/iconify';
import BrandAccordion from './brandAccordion';
import { VisuallyHiddenInput } from './logo-part';



interface Props {
  themeConfig: any;
  handleThemeConfig: (key: string, value: any, parentClass: any) => void;
}

const BrandDealer = ({ handleThemeConfig, themeConfig }: Props) => {
  const [brandItems, setBrandItems] = useState([{}, {}]);

  return (
    <Stack>
      <Box
        sx={{
          width: '100%',
          height: '120px',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          border: '4px dashed #EBEBF0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          mt: '20px',
        }}
        component="label"
      >
        <VisuallyHiddenInput
          //   disabled={themeConfig.brandImages.length == 1}
          type="file"
        //   onChange={handleNewBrand('bannerImages')}
        />
        <Iconify icon="ic:round-add" style={{ color: '#B2B3C5' }} />
        <Typography variant="caption" component="p" color="#8688A3">
          Add New Banner (Max 1)
        </Typography>
      </Box>
      {brandItems.map((item, i) => (
        <BrandAccordion key={i} />
      ))}
    </Stack>
  );
};

export default BrandDealer;
