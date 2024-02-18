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
import React from 'react';
import Iconify from 'src/components/iconify';
import { VisuallyHiddenInput } from './logo-part';

const VideoDealer = () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
        <Typography variant="caption" sx={{ fontWeight: 900 }}>
          Show
        </Typography>
        <Switch
          // checked={appBar?.icon?.shadow}
          // onChange={(event: any, value: any) => handleChangeEvent('shadow', value, 'icon')}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
      <Stack>
        <Typography variant="caption" sx={{ fontWeight: 900 }}>
          Upload Video
        </Typography>
        <Stack direction="row" my={2} alignItems="center" spacing="20px">
          <Box
            sx={{
              width: '80px',
              height: '80px',
              outline: '#EBEBF0 dashed 4px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              backgroundSize: '100% 100%',
            }}
            component="label"
          >
            <VisuallyHiddenInput type="file" />
            <Iconify icon="bi:image" style={{ color: '#C2C3D1' }} />
          </Box>

          <Box>
            <Typography
              component="p"
              sx={{ fontSize: '13px !important' }}
              variant="caption"
              color="#8688A3"
            >
              Maximum size is 5mb
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px !important' }} color="#8688A3">
              You can use these extensions <br /> SVG, PNG or JPG
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Border Radius (%)
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <Slider
              // value={logoObj?.borderRaduis || 0}
              // onChange={(_event: Event, newValue: number | number[]) =>
              //   handleChangeEvent('borderRaduis', newValue, 'logoObj')
              // }
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Stack>
        </Stack>
      </Box>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Heading & Description</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={1}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography variant="caption" color="#8688A3">
                Heading
              </Typography>

              <TextField
                variant="filled"
                type="text"
                placeholder="Get in style"
                // value={appBar?.logoObj?.width}
                // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
              />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography variant="caption" color="#8688A3">
                Description
              </Typography>

              <TextField
                variant="filled"
                type="text"
                placeholder="Change the world"
                // value={appBar?.logoObj?.width}
                // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default VideoDealer;
