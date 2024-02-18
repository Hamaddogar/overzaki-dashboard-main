import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Switch,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Sketch from '@uiw/react-color-sketch';

// ----------------------------------------------------------------------

interface LayoutCategoriesProps {
  themeConfig: {
    layoutCategoriesShow: boolean;
    layoutCategoriesRow: string;
    // Add other themeConfig properties as needed
  };
  handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
  mobile?: boolean;
}

export default function LayoutCategoriesDealer({
  themeConfig,
  handleThemeConfig,
  mobile = false,
}: LayoutCategoriesProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleThemeConfig('layoutCategoriesShow', event.target.checked);
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
  const [showImageStyling, setShowImageStyling] = useState(false);
  const [showTextBackground, setShowTextBackground] = useState(false);
  return (
    <div>
      {mobile ? (
        <Box pt="20px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Show Categories Section
            </Typography>
            <Switch
              checked={themeConfig.layoutCategoriesShow}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
          <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />
          <Typography variant="caption" component="p" color="#8688A3">
            Sort
          </Typography>
          <TextField variant="filled" defaultValue={4} />

          <Box pt="20px">
            <RadioGroup
              aria-labelledby="layout-CategorieRow-group"
              defaultValue={themeConfig?.layoutCategoriesRow}
              name="layout-CategorieRow-group"
              onChange={(event) => handleThemeConfig('layoutCategoriesRow', event.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio checked={themeConfig?.layoutCategoriesRow === '1'} size="medium" />}
                label={
                  <Stack direction="row" alignItems="center" spacing="5px" ml="15px">
                    <Box component="img" src="/raws/row.svg" />
                    <Typography variant="caption" color="#0F1349">
                      One Row
                    </Typography>
                  </Stack>
                }
              />

              <FormControlLabel
                value="2"
                control={<Radio checked={themeConfig?.layoutCategoriesRow === '2'} size="medium" />}
                label={
                  <Stack direction="row" alignItems="center" spacing="5px" ml="15px">
                    <Box component="img" src="/raws/row2.svg" />
                    <Typography variant="caption" color="#0F1349">
                      Two Rows
                    </Typography>
                  </Stack>
                }
              />
            </RadioGroup>
          </Box>
        </Box>
      ) : (
        <Box pt="20px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              Show Categories Section
            </Typography>
            <Switch
              checked={themeConfig.layoutCategoriesShow}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
          <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />
          <Typography variant="caption" component="p" color="#8688A3">
            Sort
          </Typography>
          <TextField variant="filled" defaultValue={4} />

          <Box pt="20px">
            <RadioGroup
              defaultValue={themeConfig?.layoutCategoriesRow}
              name="layout-CategorieRow-group"
              onChange={(event) => handleThemeConfig('layoutCategoriesRow', event.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio checked={themeConfig?.layoutCategoriesRow === '1'} size="medium" />}
                label={
                  <Stack direction="row" alignItems="center" spacing="5px" ml="15px">
                    <Box component="img" src="/raws/row.svg" />
                    <Typography variant="caption" color="#0F1349">
                      One Row
                    </Typography>
                  </Stack>
                }
              />

              <FormControlLabel
                value="2"
                control={<Radio checked={themeConfig?.layoutCategoriesRow === '2'} size="medium" />}
                label={
                  <Stack direction="row" alignItems="center" spacing="5px" ml="15px">
                    <Box component="img" src="/raws/row2.svg" />
                    <Typography variant="caption" color="#0F1349">
                      Two Rows
                    </Typography>
                  </Stack>
                }
              />
            </RadioGroup>
          </Box>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Category Bar</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
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
                    // checked={appBar?.icon?.shadow}
                    // onChange={(event: any, value: any) => handleChangeEvent('shadow', value, 'icon')}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
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
                    // checked={appBar?.icon?.shadow}
                    // onChange={(event: any, value: any) => handleChangeEvent('shadow', value, 'icon')}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Background Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Padding</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Padding Horizontal
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
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Padding Vertical
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
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Margin</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Margin Horizontal
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
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Margin Vertical
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
                  </AccordionDetails>
                </Accordion>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Category List & Items</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    Show Image
                  </Typography>
                  <Switch
                    checked={showImageStyling}
                    onChange={() => setShowImageStyling((pv) => !pv)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                {showImageStyling && (
                  <Stack gap={3}>
                    <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
                      <Box>
                        <Typography variant="caption" color="#8688A3">
                          Image Width
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
                          Image Height
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
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <Typography variant="caption" color="#8688A3">
                        Image Border Width (Optional)
                      </Typography>

                      <TextField
                        variant="filled"
                        type="text"
                        placeholder="i.e. Shop Now"
                        // value={appBar?.logoObj?.width}
                        // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                      />
                    </Box>
                  </Stack>
                )}

                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Image Border Radius (%)
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
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                  </Stack>
                </Box>
                <Stack gap={3}>
                  <Typography variant="h6" color="#fff">
                    Category Item
                  </Typography>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Text Color
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Text Hover Color (optional)
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width={'100%'}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 900 }}>
                      Text Background
                    </Typography>
                    <Switch
                      checked={showTextBackground}
                      onChange={() => setShowTextBackground((pv) => !pv)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Stack>
                  {showTextBackground && (
                    <Stack>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="caption" color="#8688A3">
                          Text Background Color
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing="18px">
                          <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                        </Stack>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </div>
  );
}
