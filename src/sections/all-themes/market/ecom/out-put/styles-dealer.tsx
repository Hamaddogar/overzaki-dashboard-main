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
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';

const StylesDealer = ({ themeConfig, handleThemeConfig }: any) => {
  const customPresets = [
    '#FF5733', // Reddish Orange
    '#33FF57', // Greenish Yellow
    '#3366FF', // Vivid Blue
    '#FF33FF', // Electric Purple
    '#33FFFF', // Cyan
    '#FF3366', // Pink
    '#6633FF', // Blue Purple
    '#FF9900', // Orange
    '#00FF99', // Spring Green
    '#9966FF', // Royal Purple
    '#99FF33', // Lime Green
    '#FF66CC', // Pastel Pink
    '#66FF33', // Bright Lime
    '#FF6600', // Bright Orange
    '#FF99CC', // Light Pink
    '#3399FF', // Sky Blue
    '#FFCC00', // Gold
    '#33CC66', // Jade
    '#33FF57', // Greenish Yellow
    '#3366FF', // Vivid Blue
  ];
  const [hasBackground, setHasBackground] = useState(false);
  const [hasBorder, setHasBorder] = useState(false);
  return (
    <Stack>
      <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="#8688A3">
            Width
          </Typography>
          <Stack direction="row" alignItems="center" spacing="18px">
            <Stack direction="row" alignItems="center" spacing={1} width={1}>
              <TextField
                variant="filled"
                type="number"
                //   value={appBar?.icon?.width}
                //   // onChange={event => setAppBar({ ...appBar, width: event.target.value })}
                //   onChange={(event) =>
                //     handleChangeEvent('width', event.target.value, 'icon')
                //   }
              />
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Typography variant="caption" color="#8688A3">
            Height
          </Typography>
          <Stack direction="row" alignItems="center" spacing="18px">
            <Stack direction="row" alignItems="center" spacing={1} width={1}>
              <TextField
                variant="filled"
                type="number"
                //   value={appBar?.icon?.height}
                //   // onChange={event => setAppBar({ ...appBar, height: event.target.value })}
                //   onChange={(event) =>
                //     handleChangeEvent('height', event.target.value, 'icon')
                //   }
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
        <Typography variant="caption" sx={{ fontWeight: 900 }}>
          Shadow
        </Typography>
        <Switch
          //   checked={showTextBackground}
          //   onChange={() => setShowTextBackground((pv) => !pv)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Background</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Background
            </Typography>
            <Switch
              checked={hasBackground}
              onChange={() => setHasBackground((pv) => !pv)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
          {hasBackground && (
            <Box>
              <Stack>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Background Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
              </Stack>
              <Stack>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Background Color (Dark)
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Icon Border</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Border
            </Typography>
            <Switch
              checked={hasBorder}
              onChange={() => setHasBorder((pv) => !pv)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
          {hasBorder && (
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
                  Border Width (Optional)
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
                  Border Radius (%)
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      // value={appBar?.icon?.borderRaduis || 0}
                      // onChange={(_event: Event, newValue: number | number[]) =>
                      //   handleChangeEvent('borderRaduis', newValue, 'icon')
                      // }
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                    />
                  </Stack>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color (Dark)
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
              </Box>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default StylesDealer;
