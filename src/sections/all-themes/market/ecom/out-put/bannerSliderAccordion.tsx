import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';

const BannerSliderAccordion = ({ img, index, self, handleActionsBanner, customPresets }: any) => {
  const [showTextBlock, setShowTextBlock] = useState(false);
  return (
    <Accordion>
      <AccordionSummary
        sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle1">Image {index + 1}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} gap={3}>
          <Box
            sx={{
              width: '100%',
              height: '120px',
              borderRadius: '12px',
              position: 'relative',
              mt: '20px',
              backgroundImage: `url(${img})`,
              backgroundSize: 'contain 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              '&:hover .actions': {
                transition: 'all .5s',
                visibility: 'visible',
                opacity: 1,
              },
            }}
          >
            <Stack
              justifyContent="flex-end"
              px="10px"
              maxWidth="300px"
              direction="row"
              alignItems="center"
              spacing="15px"
              className="actions"
              sx={{
                visibility: 'hidden',
                opacity: 0,
                background: 'transparent',
                position: 'absolute',
                top: '11px',
                right: 0,
                height: '35px',
              }}
            >
              <Iconify
                icon="gg:link"
                style={{
                  color: '#B2B3C5',
                  boxShadow: '0 0 0 4px #FFFFFF',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  borderRadius: '15px',
                }}
              />
              <Iconify
                icon="mdi:edit"
                style={{
                  color: '#B2B3C5',
                  boxShadow: '0 0 0 4px #FFFFFF',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  borderRadius: '15px',
                }}
              />
              <Iconify
                onClick={handleActionsBanner('delete', index, self)}
                icon="ic:round-delete"
                style={{
                  color: '#B2B3C5',
                  boxShadow: '0 0 0 4px #FFFFFF',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  borderRadius: '15px',
                }}
              />
            </Stack>
          </Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Text on Banner
            </Typography>
            <Switch
              // checked={appBar?.icon?.shadow}
              onChange={() => setShowTextBlock((pv) => !pv)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>

          {showTextBlock && (
            <Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <Typography variant="caption" color="#8688A3">
                  Banner Text
                </Typography>

                <TextField
                  variant="filled"
                  type="text"
                  placeholder="i.e. Shop Now"
                  // value={appBar?.logoObj?.width}
                  // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    //   onChange={(event) =>
                    //     isColorValid(event?.hex)
                    //       ? handleChangeEvent('tintColor', event?.hex, 'icon')
                    //       : null
                    //   }
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Text Bold
                </Typography>
                <Switch
                  // checked={appBar?.icon?.shadow}
                  // onChange={(event: any, value: any) => handleChangeEvent('shadow', value, 'icon')}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Stack>
              {/* <Box sx={{ width: '100%' }}>
        <Typography variant="caption" color="#8688A3">
          Text Color
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          <Sketch presetColors={customPresets} style={{ width: '100%' }} />
        </Stack>
      </Box> */}
              <Accordion>
                <AccordionSummary
                  sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                  expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle1">Text Positioning</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Horizontal Positioning
                    </Typography>
                    {/* <RadioGroup row value={banner?.search?.status || "true"} onChange={(event: any) => handleChangeEvent('status', event?.target?.value, 'search')}>
<FormControlLabel value="slider" control={<Radio size="medium" />} label="Slider" />
<FormControlLabel value="image" control={<Radio size="medium" />} label="Image" />
<FormControlLabel value="video" control={<Radio size="medium" />} label="Video" />
</RadioGroup> */}
                    <RadioGroup
                      row
                      //   value={logoObj?.position || 'center'}
                      // onChange={(event: any) => setBannerType(event.target.value)}
                    >
                      <FormControlLabel
                        value="left"
                        control={<Radio size="medium" />}
                        label="Left"
                      />
                      <FormControlLabel
                        value="right"
                        control={<Radio size="medium" />}
                        label="Right "
                      />
                    </RadioGroup>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Vertical Positioning
                    </Typography>
                    {/* <RadioGroup row value={banner?.search?.status || "true"} onChange={(event: any) => handleChangeEvent('status', event?.target?.value, 'search')}>
<FormControlLabel value="slider" control={<Radio size="medium" />} label="Slider" />
<FormControlLabel value="image" control={<Radio size="medium" />} label="Image" />
<FormControlLabel value="video" control={<Radio size="medium" />} label="Video" />
</RadioGroup> */}
                    <RadioGroup
                      row
                      //   value={logoObj?.position || 'center'}
                      // onChange={(event: any) => setBannerType(event.target.value)}
                    >
                      <FormControlLabel value="top" control={<Radio size="medium" />} label="top" />
                      <FormControlLabel
                        value="bottom"
                        control={<Radio size="medium" />}
                        label="bottom "
                      />
                    </RadioGroup>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default BannerSliderAccordion;
