import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import { VisuallyHiddenInput } from './logo-part';
import Sketch from '@uiw/react-color-sketch';

const VideoDealer = () => {
  const [activeSection, setActiveSection] = useState('Section');
  const [headerStyling, setHeaderStyling] = useState({
    display: 'none',
    title: {
      display: 'none',
    },
  });
  const [videoStyling, setVideoStyling] = useState({
    boxShadow: 'none',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    borderRadius: '0%',
    borderWidth: '0px',
    border: '',
    width: '100%',
    height: '100%',
  });
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
  return (
    <Stack spacing={3}>
      <Stack bgcolor={'white'} padding={1}>
        <Typography
          sx={{ width: '100%', display: headerStyling.display, justifyContent: 'start' }}
          color={'black'}
          variant="h6"
        >
          Header Video
        </Typography>
        <video style={{ ...videoStyling }} autoPlay muted>
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Stack>
      <Stack
        sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
        direction="row"
        alignItems="center"
        marginTop={3}
        justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
        spacing="20px"
      >
        <Button
          onClick={() => setActiveSection('Section')}
          fullWidth
          variant="contained"
          size="small"
          sx={
            activeSection === 'Section'
              ? {
                  borderRadius: '12px',
                  color: '#0F1349',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 6px 20px #00000033',
                  '&:hover': { backgroundColor: '#FFFFFF' },
                }
              : {
                  borderRadius: '12px',
                  color: '#8688A3',
                  backgroundColor: 'background.neutral',
                  '&:hover': { backgroundColor: 'background.neutral' },
                }
          }
        >
          {' '}
          Section{' '}
        </Button>
        <Button
          onClick={() => setActiveSection('Style')}
          fullWidth
          variant="contained"
          size="small"
          sx={
            activeSection === 'Style'
              ? {
                  borderRadius: '12px',
                  color: '#0F1349',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 6px 20px #00000033',
                  '&:hover': { backgroundColor: '#FFFFFF' },
                }
              : {
                  borderRadius: '12px',
                  color: '#8688A3',
                  backgroundColor: 'background.neutral',
                  '&:hover': { backgroundColor: 'background.neutral' },
                }
          }
        >
          {' '}
          Style{' '}
        </Button>
        <Button
          onClick={() => setActiveSection('Layout')}
          fullWidth
          variant="contained"
          size="small"
          sx={
            activeSection === 'Layout'
              ? {
                  borderRadius: '12px',
                  color: '#0F1349',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 6px 20px #00000033',
                  '&:hover': { backgroundColor: '#FFFFFF' },
                }
              : {
                  borderRadius: '12px',
                  color: '#8688A3',
                  backgroundColor: 'background.neutral',
                  '&:hover': { backgroundColor: '#FFFFFF' },
                }
          }
        >
          {' '}
          Layout{' '}
        </Button>
      </Stack>
      {/* <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
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
      </Accordion> */}
      <Stack>
        {activeSection === 'Section' && (
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Section Header</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
              >
                <Typography variant="caption" sx={{ fontWeight: 900 }}>
                  Show
                </Typography>
                <Switch
                  checked={headerStyling.display === 'block'}
                  onChange={() =>
                    setHeaderStyling((pv) => ({
                      ...pv,

                      display: pv.display === 'block' ? 'none' : 'block',
                    }))
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
        {activeSection === 'Style' && (
          <Stack>
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Shadow</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    Shadow
                  </Typography>
                  <Switch
                    checked={videoStyling.boxShadow !== 'none'}
                    onChange={() =>
                      setVideoStyling((pv) => ({
                        ...pv,
                        boxShadow:
                          pv.boxShadow === 'none'
                            ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                            : 'none',
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Content</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Padding Horizontal
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(event: any, newValue: any) =>
                            setVideoStyling((prev) => ({
                              ...prev,
                              paddingLeft: newValue + 'px',
                              paddingRight: newValue + 'px',
                            }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={20}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Padding Vertical
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(_event: Event, newValue: any) =>
                            setVideoStyling((prev) => ({
                              ...prev,
                              paddingTop: newValue + 'px',
                              paddingBottom: newValue + 'px',
                            }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={20}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Video</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Width
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(_event: Event, newValue: any) =>
                            setVideoStyling((prev) => ({
                              ...prev,
                              width: newValue + '%',
                            }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={100}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Height
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(_event: Event, newValue: any) =>
                            setVideoStyling((prev) => ({
                              ...prev,
                              height: newValue + '%',
                            }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={100}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Border Radius
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(_event: Event, newValue: any) =>
                            setVideoStyling((prev) => ({
                              ...prev,
                              borderRadius: newValue + '%',
                            }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={20}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%', my: 2 }}>
                    <Typography variant="caption" color="#8688A3">
                      Border Width
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          // value={numberOfColumns}
                          onChange={(_event: Event, newValue: any) =>
                            setVideoStyling((prev: any) => ({ ...prev, borderWidth: newValue }))
                          }
                          valueLabelDisplay="auto"
                          min={0}
                          max={5}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Border Color
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Sketch
                        onChange={(event: any) => {
                          setVideoStyling((prev) => ({
                            ...prev,
                            border: `${prev?.borderWidth}px solid ${event?.hex} `,
                          }));
                        }}
                        presetColors={customPresets}
                        style={{ width: '100%' }}
                      />
                    </Stack>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        )}
        {activeSection === 'Layout' && (
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
        )}
      </Stack>
    </Stack>
  );
};

export default VideoDealer;
