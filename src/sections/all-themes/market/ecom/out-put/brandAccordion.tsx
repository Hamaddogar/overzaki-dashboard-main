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

const BrandAccordion = () => {
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
  const [isHeading, setIsHeading] = useState(true);
  const [isDescription, setIsDescription] = useState(true);

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Text</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Heading</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    Show
                  </Typography>
                  <Switch inputProps={{ 'aria-label': 'controlled' }} />
                </Stack>
                {isHeading && (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Heading
                      </Typography>
                      <Stack
                        sx={{ width: '100%' }}
                        direction="row"
                        alignItems="center"
                        spacing="18px"
                      >
                        <Stack
                          sx={{ width: '100%' }}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          width={1}
                        >
                          <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            type="number"
                            // value={logoObj?.width}
                            // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Heading Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Text Size
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider valueLabelDisplay="auto" min={0} max={50} />
                        </Stack>
                      </Stack>
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width={'100%'}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 900 }}>
                        Bold
                      </Typography>
                      <Switch inputProps={{ 'aria-label': 'controlled' }} />
                    </Stack>
                  </Box>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Description</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    Show
                  </Typography>
                  <Switch inputProps={{ 'aria-label': 'controlled' }} />
                </Stack>
                {isDescription && (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Heading
                      </Typography>
                      <Stack
                        sx={{ width: '100%' }}
                        direction="row"
                        alignItems="center"
                        spacing="18px"
                      >
                        <Stack
                          sx={{ width: '100%' }}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          width={1}
                        >
                          <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            type="number"
                            // value={logoObj?.width}
                            // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Description Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Text Size
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider valueLabelDisplay="auto" min={0} max={20} />
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* Button Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Button</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Show
            </Typography>
            <Switch inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Button Text
            </Typography>
            <Stack sx={{ width: '100%' }} direction="row" alignItems="center" spacing="18px">
              <Stack
                sx={{ width: '100%' }}
                direction="row"
                alignItems="center"
                spacing={1}
                width={1}
              >
                <TextField
                  sx={{ width: '100%' }}
                  variant="filled"
                  type="number"
                  // value={logoObj?.width}
                  // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                />
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Link
            </Typography>
            <Stack sx={{ width: '100%' }} direction="row" alignItems="center" spacing="18px">
              <Stack
                sx={{ width: '100%' }}
                direction="row"
                alignItems="center"
                spacing={1}
                width={1}
              >
                <TextField
                  sx={{ width: '100%' }}
                  variant="filled"
                  type="number"
                  // value={logoObj?.width}
                  // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                />
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="#8688A3">
                Button Background Color
              </Typography>
              <Stack direction="row" alignItems="center" spacing="18px">
                <Sketch presetColors={customPresets} style={{ width: '100%' }} />
              </Stack>
            </Box>
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
                      // onChange={event => setAppBar({ ...appBar, width: event.target.value })}
                      //   onChange={(event) => handleChangeEvent('width', event.target.value, 'icon')}
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
                      //   onChange={(event) => handleChangeEvent('height', event.target.value, 'icon')}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="#8688A3">
                Border Radius (%)
              </Typography>
              <Stack direction="row" alignItems="center" spacing="18px">
                <Stack direction="row" alignItems="center" spacing={1} width={1}>
                  <Slider
                    // value={appBar?.container?.borderBottomWidth || 0}
                    // onChange={(_event: Event, newValue: number | number[]) => {
                    //   handleChangeEvent('borderBottomWidth', newValue, 'container');
                    // }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                  />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BrandAccordion;
