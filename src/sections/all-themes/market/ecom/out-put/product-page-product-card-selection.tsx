import React, { useState } from 'react';
import {
  Typography,
  Box,
  Stack,
  Switch,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  TextField,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Sketch from '@uiw/react-color-sketch';
import { VisuallyHiddenInput } from './logo-part';

// ----------------------------------------------------------------------

interface PersonalProps {
  themeConfig: {
    productPageAddWishlist: boolean;
    productPageShowDescription: boolean;
    productPageShowCategoryName: boolean;
    productPageshowAddToCart: boolean;
    productPageFilterCardStyle: string;
    // Add other themeConfig properties as needed
  };
  handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
  mobile?: boolean;
}

export default function ProductPageProductCardDealer({
  themeConfig,
  handleThemeConfig,
  mobile = false,
}: PersonalProps) {
  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    handleThemeConfig(key, event.target.checked);
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
  const [isAddWishlistBackgroundColor, setIsAddWishlistBackgroundColor] = useState(false);
  const [isAddDescriptionBackgroundColor, setIsAddDescriptionBackgroundColor] = useState(false);
  const [isAddDescriptionHoverColor, setIsAddDescriptionHoverColor] = useState(false);
  const [isAddToCartButton, setIsAddToCartButton] = useState(false);
  const [isAddToCartBackground, setIsAddToCartBackground] = useState(false);
  return (
    <Box>
      <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />

      <Box>
        <Accordion>
          <AccordionSummary
            sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1">Wishlist</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="caption" fontWeight={900}>
                Add Wishlist
              </Typography>
              <Switch
                size="medium"
                checked={themeConfig.productPageAddWishlist}
                onChange={handleChange('productPageAddWishlist')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            {themeConfig.productPageAddWishlist && (
              <Box>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Wishlist Icon</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Wishlist Icon (when not selected)
                          </Typography>
                        </Box>
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
                            <Iconify
                              icon="bi:image"
                              style={{ color: '#C2C3D1', display: 'block' }}
                            />
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
                            <Typography
                              variant="caption"
                              sx={{ fontSize: '11px !important' }}
                              color="#8688A3"
                            >
                              You can use these extensions <br /> SVG, PNG or JPG
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                      <Stack sx={{ width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Wishlist Icon (when selected)
                          </Typography>
                        </Box>
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
                            <Iconify
                              icon="bi:image"
                              style={{ color: '#C2C3D1', display: 'block' }}
                            />
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
                            <Typography
                              variant="caption"
                              sx={{ fontSize: '11px !important' }}
                              color="#8688A3"
                            >
                              You can use these extensions <br /> SVG, PNG or JPG
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Box sx={{ width: '100%', display: 'flex', gap: 2, my: 2 }}>
                      <Box>
                        <Typography variant="caption" color="#8688A3">
                          Icon Width
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing="18px">
                          <Stack direction="row" alignItems="center" spacing={1} width={1}>
                            <TextField
                              variant="filled"
                              type="number"
                              //   value={logoObj?.width}
                              //   onChange={(event) =>
                              //     handleChangeEvent('width', event.target.value, 'logoObj')
                              //   }
                            />
                          </Stack>
                        </Stack>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="#8688A3">
                          Icon Height
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing="18px">
                          <Stack direction="row" alignItems="center" spacing={1} width={1}>
                            <TextField
                              variant="filled"
                              type="number"
                              //   value={logoObj?.height}
                              //   onChange={(event) =>
                              //     handleChangeEvent('height', event.target.value, 'logoObj')
                              //   }
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Border</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Background</Typography>
                    </Box>
                  </AccordionSummary>
                  <Stack
                    mb="10px"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="caption" fontWeight={900}>
                      Add Background Color
                    </Typography>
                    <Switch
                      size="medium"
                      checked={isAddWishlistBackgroundColor}
                      onChange={() => setIsAddWishlistBackgroundColor((pv) => !pv)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Stack>
                  <AccordionDetails>
                    {isAddWishlistBackgroundColor && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="caption" color="#8688A3">
                          Background Color
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing="18px">
                          <Sketch presetColors={customPresets} style={{ width: '100%' }} />
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
                      <Typography variant="subtitle1">Padding</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Padding Horizontal
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
                        Padding Vertical
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
                  </AccordionDetails>
                </Accordion>
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
              <Typography variant="subtitle1">Description</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="caption" fontWeight={900}>
                  Show Description
                </Typography>
                <Switch
                  size="medium"
                  checked={themeConfig.productPageShowDescription}
                  onChange={handleChange('productPageShowDescription')}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Stack>
              {themeConfig.productPageShowDescription && (
                <Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Description Text Color
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                    </Stack>
                  </Box>

                  <Stack
                    mb="10px"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="caption" fontWeight={900}>
                      Add Background Color
                    </Typography>
                    <Switch
                      size="medium"
                      checked={isAddDescriptionBackgroundColor}
                      onChange={() => setIsAddDescriptionBackgroundColor((pv) => !pv)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Stack>
                  {isAddDescriptionBackgroundColor && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Description Background Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                      </Stack>
                    </Box>
                  )}
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      No. of Lines
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
                          max={5}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Stack
                    mb="10px"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="caption" fontWeight={900}>
                      Color Change on Hover
                    </Typography>
                    <Switch
                      size="medium"
                      checked={isAddDescriptionHoverColor}
                      onChange={() => setIsAddDescriptionHoverColor((pv) => !pv)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Stack>
                  {isAddDescriptionHoverColor && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Hover Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                      </Stack>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Description</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageShowDescription}
                        onChange={handleChange('productPageShowDescription')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Category Name</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageShowCategoryName}
                        onChange={handleChange('productPageShowCategoryName')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Add To Cart button</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageshowAddToCart}
                        onChange={handleChange('productPageshowAddToCart')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack> */}
        <Accordion>
          <AccordionSummary
            sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1">Add To Cart</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="caption" fontWeight={900}>
                Show Add To Cart Button
              </Typography>
              <Switch
                size="medium"
                checked={isAddToCartButton}
                onChange={() => setIsAddToCartButton((pv) => !pv)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            {isAddToCartButton && (
              <Box>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Add To Cart Logo</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Typography variant="caption" fontWeight={900}>
                        Add To Cart Logo
                      </Typography>
                      <Box>
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
                            <Iconify
                              icon="bi:image"
                              style={{ color: '#C2C3D1', display: 'block' }}
                            />
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
                            <Typography
                              variant="caption"
                              sx={{ fontSize: '11px !important' }}
                              color="#8688A3"
                            >
                              You can use these extensions <br /> SVG, PNG or JPG
                            </Typography>
                          </Box>
                        </Stack>
                        <Box sx={{ width: '100%', display: 'flex', gap: 2, my: 2 }}>
                          <Box>
                            <Typography variant="caption" color="#8688A3">
                              Icon Width
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing="18px">
                              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                <TextField
                                  variant="filled"
                                  type="number"
                                  //   value={logoObj?.width}
                                  //   onChange={(event) =>
                                  //     handleChangeEvent('width', event.target.value, 'logoObj')
                                  //   }
                                />
                              </Stack>
                            </Stack>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="#8688A3">
                              Icon Height
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing="18px">
                              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                <TextField
                                  variant="filled"
                                  type="number"
                                  //   value={logoObj?.height}
                                  //   onChange={(event) =>
                                  //     handleChangeEvent('height', event.target.value, 'logoObj')
                                  //   }
                                />
                              </Stack>
                            </Stack>
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Icon Border Radius (%)
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
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Logo Background</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      mb="10px"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="caption" fontWeight={900}>
                        Add To Cart Background Color
                      </Typography>
                      <Switch
                        size="medium"
                        checked={isAddToCartBackground}
                        onChange={() => setIsAddToCartBackground((pv) => !pv)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    {isAddToCartBackground && (
                      <Stack>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Background Color
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing="18px">
                            <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                          </Stack>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Background Color (Dark Screen)
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing="18px">
                            <Sketch presetColors={customPresets} style={{ width: '100%' }} />
                          </Stack>
                        </Box>
                      </Stack>
                    )}
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Additional Styling</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="caption" color="#8688A3">
                          Padding
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
                          Border Radius
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
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />

      <Box>
        <RadioGroup
          aria-labelledby="controlled-product-view-grid-group"
          value={themeConfig?.productPageFilterCardStyle}
          name="list-view-grid-group"
          onChange={(event) => handleThemeConfig('productPageFilterCardStyle', event.target.value)}
          sx={{
            display: 'flex !important',
            flexDirection: 'row',
            alignItems: 'center',
            rowGap: '20px',
          }}
        >
          <FormControlLabel
            labelPlacement="bottom"
            value="style-1"
            control={
              <Radio
                checked={themeConfig?.productPageFilterCardStyle === 'style-1'}
                size="medium"
              />
            }
            label={
              <Stack
                direction="row"
                alignItems="center"
                spacing="12px"
                ml="15px"
                justifyContent="space-between"
                sx={{ flexGrow: 1 }}
              >
                {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }}>
                  <Box
                    component="img"
                    src="/raws/pc1.png"
                    sx={{ width: '100%', maxWidth: '100px' }}
                  />
                </Card>
              </Stack>
            }
          />

          <FormControlLabel
            labelPlacement="bottom"
            value="style-2"
            control={
              <Radio
                checked={themeConfig?.productPageFilterCardStyle === 'style-2'}
                size="medium"
              />
            }
            label={
              <Stack
                direction="row"
                alignItems="center"
                spacing="12px"
                ml="15px"
                justifyContent="space-between"
                sx={{ flexGrow: 1 }}
              >
                {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }}>
                  <Box
                    component="img"
                    src="/raws/pc2.png"
                    sx={{ width: '100%', maxWidth: '100px' }}
                  />
                </Card>
              </Stack>
            }
          />

          <FormControlLabel
            labelPlacement="bottom"
            value="style-3"
            control={
              <Radio
                checked={themeConfig?.productPageFilterCardStyle === 'style-3'}
                size="medium"
              />
            }
            label={
              <Stack
                direction="row"
                alignItems="center"
                spacing="12px"
                ml="15px"
                justifyContent="space-between"
                sx={{ flexGrow: 1 }}
              >
                {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }}>
                  <Box
                    component="img"
                    src="/raws/pc2.png"
                    sx={{ width: '100%', maxWidth: '100px' }}
                  />
                </Card>
              </Stack>
            }
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}
