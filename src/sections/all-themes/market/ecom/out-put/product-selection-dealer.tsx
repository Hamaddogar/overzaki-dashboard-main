import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import ProductCard from 'src/sections/all-themes/component/product/ProductCard';
import { productDummyData } from 'src/sections/all-themes/component/product/products-data';

const ProductSelectionDealer = () => {
  const [activeSection, setActiveSection] = useState('Section');
  const [sectionStyling, setSectionStyling] = useState({
    header: true,
    title: true,
    viewAll: true,
  });
  const [styleStyling, setStyleStyling] = useState({
    display: 'block',
    boxShadow: 'none',
    borderRadius: '0%',
    borderWidth: '0px',
    borderColor: 'transparent',
  });
  const [styleImageStyling, setStyleImageStyling] = useState({
    display: 'block',
    borderRadius: '0%',
    borderWidth: '0px',
    borderColor: 'transparent',
    margin: '0px',
  });
  const [styleWishlistStyling, setStyleWishlistStyling] = useState({
    display: 'block',
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'white',
  });
  const [layoutContentStyling, setLayoutContentStyling] = useState({
    isContent: true,
    title: {
      display: 'block',
      fontSize: '15px',
      fontWeight: 800,
      lineClamp: 1,
      color: 'black',
    },
    category: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 800,
      color: 'gray',
    },
    brand: {
      display: 'none',
      fontSize: '12px',
      fontWeight: 800,
      color: 'black',
    },
    stock: {
      display: 'none',
      color: 'white',
      backgroundColor: 'black',
    },
    outOfStock: {
      display: 'none',
      color: 'white',
      backgroundColor: 'black',
    },
    rating: {
      display: 'flex',
      backgroundColorFilled: 'black',
      backgroundColorEmpty: '#a2a2a2',
      fiveStar: true,
      textValue: {
        display: 'block',
        fontSize: '10px',
        fontWeight: 800,
        color: 'black',
      },
    },
    typeItem: {
      display: 'block',
    },
  });
  const squareCardImagesArray = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];
  const roundedCardImagesArray = ['/card4.jpg'];
  const [selectedSquareCard, setSelectedSquareCard] = useState('style-1');
  const [selectedRoundedCard, setSelectedRoundedCard] = useState('style-1');
  const [scrollType, setScrollType] = useState('flex');
  const [numberOfColumns, setNumberOfColumns] = useState(2);
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
  //   boxShadow: '0 0 0 4px #FFFFFF',
  const [cardShape, setCardShape] = useState('square');
  return (
    <Stack width={'100%'}>
      <Stack padding={'5px'} bgcolor={'white'} width={'100%'}>
        {sectionStyling.header && (
          <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
            {sectionStyling.title && (
              <Typography
                sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                color={'black'}
                variant="h6"
              >
                Products
              </Typography>
            )}
            {sectionStyling.viewAll && (
              <Typography
                sx={{
                  textDecoration: 'underline',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                }}
                color={'grey'}
                variant="h6"
              >
                View All
              </Typography>
            )}
          </Stack>
        )}
        <Box
          sx={{
            overflowX: 'auto',
            display: scrollType,
            width: '100%',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' },
            gridTemplateColumns: `repeat(${numberOfColumns}, 0fr)`,
          }}
          gap={1}
          // direction={'row'}
        >
          {productDummyData.map((item) => (
            <ProductCard
              key={item.name}
              outOfStock={item.outOfStock}
              brand={item.brand}
              layoutContentStyling={layoutContentStyling}
              styleWishlistStyling={styleWishlistStyling}
              styleImageStyling={styleImageStyling}
              styleStyling={styleStyling}
              img={item.img}
              category={item.category}
              name={item.name}
            />
          ))}
        </Box>
      </Stack>
      <Stack>
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
              <Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    With Header
                  </Typography>
                  <Switch
                    checked={sectionStyling.header}
                    onChange={() => setSectionStyling((pv) => ({ ...pv, header: !pv.header }))}
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
                    With Title
                  </Typography>
                  <Switch
                    checked={sectionStyling.title}
                    onChange={() => setSectionStyling((pv) => ({ ...pv, title: !pv.title }))}
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
                    With View All
                  </Typography>
                  <Switch
                    checked={sectionStyling.viewAll}
                    onChange={() => setSectionStyling((pv) => ({ ...pv, viewAll: !pv.viewAll }))}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
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
                    // checked={styleStyling.boxShadow === 'none' ? false : true}
                    onChange={() =>
                      setStyleStyling((pv) => ({
                        ...pv,
                        boxShadow: pv.boxShadow !== 'none' ? '0 0 0 4px black' : 'none',
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
                  <Typography variant="subtitle1">Container</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Radius (%)
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleStyling((prev) => ({
                            ...prev,
                            borderRadius: newValue + '%',
                          }));
                        }}
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
                    Border Width
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleStyling((prev) => ({
                            ...prev,
                            border: newValue + 'px solid ' + prev.borderColor,
                            borderWidth: newValue + 'px',
                          }));
                        }}
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
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch
                      onChange={(_event: Event, newValue: number | number[]) => {
                        setStyleStyling((prev) => ({
                          ...prev,
                          border: `${prev?.borderWidth} solid ${_event?.hex} `,
                        }));
                      }}
                      presetColors={customPresets}
                      style={{ width: '100%' }}
                    />
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
                  <Typography variant="subtitle1">Image</Typography>
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
                    Image
                  </Typography>
                  <Switch
                    checked={styleImageStyling.display === 'none' ? false : true}
                    onChange={() =>
                      setStyleImageStyling((pv) => ({
                        ...pv,
                        display: pv.display === 'none' ? 'block' : 'none',
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Radius
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleImageStyling((prev) => ({
                            ...prev,
                            borderRadius: newValue + '% ',
                          }));
                        }}
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
                    Border Width
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleImageStyling((prev) => ({
                            ...prev,
                            border: newValue + 'px solid ' + prev.borderColor,
                            borderWidth: newValue + 'px',
                          }));
                        }}
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
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch
                      onChange={(_event: Event, newValue: number | number[]) => {
                        setStyleImageStyling((prev) => ({
                          ...prev,
                          border: `${prev?.borderWidth} solid ${_event?.hex} `,
                        }));
                      }}
                      presetColors={customPresets}
                      style={{ width: '100%' }}
                    />
                  </Stack>
                </Box>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Margin
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleImageStyling((prev) => ({
                            ...prev,
                            margin: newValue + 'px',
                          }));
                        }}
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
                  <Typography variant="subtitle1">Wishlist</Typography>
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
                    With Wishlist
                  </Typography>
                  <Switch
                    checked={styleWishlistStyling.display === 'block'}
                    onChange={() =>
                      setStyleWishlistStyling((pv) => ({
                        ...pv,
                        display: pv.display === 'none' ? 'block' : 'none',
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Horizontal Position
                  </Typography>
                  <RadioGroup
                    row
                    // value={logoObj?.position}
                    onChange={(event: any) =>
                      setStyleWishlistStyling((prev) => {
                        const { value } = event.target;
                        // If 'top' checkbox is checked, set 'top' style to '5px' and remove 'bottom' style
                        if (value === 'left') {
                          return {
                            ...prev,
                            left: '5px',
                            right: undefined,
                          };
                        }
                        // If 'bottom' checkbox is checked, set 'bottom' style to '5px' and remove 'top' style
                        if (value === 'right') {
                          return {
                            ...prev,
                            right: '5px',
                            left: undefined,
                          };
                        }
                        // Handle other cases or default behavior
                        return prev;
                      })
                    }
                  >
                    <FormControlLabel value="left" control={<Radio size="medium" />} label="Left" />
                    <FormControlLabel
                      value="right"
                      control={<Radio size="medium" />}
                      label="Right "
                    />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Vertical Position
                  </Typography>
                  <RadioGroup
                    row
                    // value={logoObj?.position}
                    onChange={(event: any) =>
                      setStyleWishlistStyling((prev) => {
                        const { value } = event.target;
                        // If 'top' checkbox is checked, set 'top' style to '5px' and remove 'bottom' style
                        if (value === 'top') {
                          return {
                            ...prev,
                            top: '5px',
                            bottom: undefined,
                          };
                        }
                        // If 'bottom' checkbox is checked, set 'bottom' style to '5px' and remove 'top' style
                        if (value === 'bottom') {
                          return {
                            ...prev,
                            bottom: '5px',
                            top: undefined,
                          };
                        }
                        // Handle other cases or default behavior
                        return prev;
                      })
                    }
                  >
                    <FormControlLabel value="top" control={<Radio size="medium" />} label="Top" />
                    <FormControlLabel
                      value="bottom"
                      control={<Radio size="medium" />}
                      label="Bottom "
                    />
                  </RadioGroup>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Background Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch
                      onChange={(_event: Event, newValue: number | number[]) => {
                        setStyleWishlistStyling((prev) => ({
                          ...prev,
                          backgroundColor: _event?.hex,
                        }));
                      }}
                      presetColors={customPresets}
                      style={{ width: '100%' }}
                    />
                  </Stack>
                </Box>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Radius (%)
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleWishlistStyling((prev) => ({
                            ...prev,
                            borderRadius: newValue + '%',
                          }));
                        }}
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
                    Border Width
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setStyleWishlistStyling((prev) => ({
                            ...prev,
                            border: newValue + 'px solid ' + prev.borderColor,
                            borderWidth: newValue + 'px',
                          }));
                        }}
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
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch
                      onChange={(_event: Event, newValue: number | number[]) => {
                        setStyleWishlistStyling((prev) => ({
                          ...prev,
                          border: `${prev?.borderWidth} solid ${_event?.hex} `,
                        }));
                      }}
                      presetColors={customPresets}
                      style={{ width: '100%' }}
                    />
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Stack>
        )}
        {activeSection === 'Layout' && (
          <Stack>
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Card Shape</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box pt="20px">
                  <RadioGroup
                    aria-labelledby="controlled-card-Shape-grid-group"
                    value={cardShape}
                    name="card-Shape-grid-group"
                    onChange={(event) => setCardShape(event.target.value)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                    }}
                  >
                    <FormControlLabel
                      value="square"
                      control={<Radio checked={cardShape === 'square'} size="medium" />}
                      label={
                        <Stack direction="row" alignItems="center" spacing="12px" ml="15px">
                          <Box component="img" src="/raws/Square.png" />
                          <Typography variant="caption" component="p" color="#0F1349">
                            Square
                          </Typography>
                        </Stack>
                      }
                    />
                    {cardShape === 'square' && (
                      <Box>
                        <RadioGroup
                          aria-labelledby="controlled-product-view-grid-group"
                          // value={themeConfig?.productPageFilterCardStyle}
                          name="list-view-grid-group"
                          onChange={(event) => setSelectedSquareCard(event.target.value)}
                          sx={{
                            display: 'flex !important',
                            flexDirection: 'row',
                            alignItems: 'center',
                            rowGap: '20px',
                          }}
                        >
                          {squareCardImagesArray.map((item, i) => (
                            <FormControlLabel
                              labelPlacement="bottom"
                              value={`style-${i + 1}`}
                              control={
                                <Radio
                                  checked={selectedSquareCard === `style-${i + 1}`}
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
                                  <Card
                                    sx={{
                                      boxShadow: '0px 3px 20px #0000001F',
                                      p: '5px',
                                      borderRadius: '5px',
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={item}
                                      sx={{ width: '100%', maxWidth: '130px' }}
                                    />
                                  </Card>
                                </Stack>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </Box>
                    )}

                    <FormControlLabel
                      value="circle"
                      control={<Radio checked={cardShape === 'circle'} size="medium" />}
                      label={
                        <Stack direction="row" alignItems="center" spacing="12px" ml="15px">
                          <Box component="img" src="/raws/Circle.png" />
                          <Typography variant="caption" component="p" color="#0F1349">
                            Circle
                          </Typography>
                        </Stack>
                      }
                    />
                    {cardShape === 'circle' && (
                      <Box>
                        <RadioGroup
                          aria-labelledby="controlled-product-view-grid-group"
                          // value={themeConfig?.productPageFilterCardStyle}
                          name="list-view-grid-group"
                          // onChange={(event) =>
                          //   handleThemeConfig('productPageFilterCardStyle', event.target.value)
                          // }
                          sx={{
                            display: 'flex !important',
                            flexDirection: 'row',
                            alignItems: 'center',
                            rowGap: '20px',
                          }}
                        >
                          {roundedCardImagesArray.map((item, i) => (
                            <FormControlLabel
                              labelPlacement="bottom"
                              value={`style-${i + 1}`}
                              control={
                                <Radio
                                  checked={selectedRoundedCard === `style-${i + 1}`}
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
                                  <Card
                                    sx={{
                                      boxShadow: '0px 3px 20px #0000001F',
                                      p: '5px',
                                      borderRadius: '5px',
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={item}
                                      sx={{ width: '100%', maxWidth: '130px' }}
                                    />
                                  </Card>
                                </Stack>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </Box>
                    )}
                  </RadioGroup>
                </Box>
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    With Content
                  </Typography>
                  <Switch
                    checked={layoutContentStyling.isContent}
                    onChange={() =>
                      setLayoutContentStyling((pv) => ({
                        ...pv,
                        isContent: !pv.isContent,
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Padding
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        onChange={(_event: Event, newValue: number | number[]) => {
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            padding: newValue + 'px',
                          }));
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={20}
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
                      <Typography variant="subtitle1">Title</Typography>
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
                        checked={layoutContentStyling.title.display === 'block'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            title: {
                              ...prev.title,
                              display: prev.title.display === 'none' ? 'block' : 'none',
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Size
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider
                            value={layoutContentStyling.title.fontSize.split('px')[0]}
                            onChange={(_event: Event, newValue: number | number[]) => {
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                title: {
                                  ...prev.title,
                                  fontSize: newValue + 'px',
                                },
                              }));
                            }}
                            valueLabelDisplay="auto"
                            min={8}
                            max={20}
                          />
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
                      <Switch
                        checked={layoutContentStyling.title.fontWeight === 800}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            title: {
                              ...prev.title,
                              fontWeight: prev.title.fontWeight === 800 ? 300 : 800,
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Number Of Lines
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider
                            value={layoutContentStyling.title.lineClamp}
                            onChange={(_event: Event, newValue: number | number[]) => {
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                title: {
                                  ...prev.title,
                                  lineClamp: newValue,
                                },
                              }));
                            }}
                            valueLabelDisplay="auto"
                            min={1}
                            max={3}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              title: {
                                ...prev.title,
                                color: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                      <Typography variant="subtitle1">Category</Typography>
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
                        checked={layoutContentStyling.category.display === 'block'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            category: {
                              ...prev.category,
                              display: prev.category.display === 'none' ? 'block' : 'none',
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Size
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider
                            value={layoutContentStyling.category.fontSize.split('px')[0]}
                            onChange={(_event: Event, newValue: number | number[]) => {
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                category: {
                                  ...prev.category,
                                  fontSize: newValue + 'px',
                                },
                              }));
                            }}
                            valueLabelDisplay="auto"
                            min={8}
                            max={20}
                          />
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
                      <Switch
                        checked={layoutContentStyling.category.fontWeight === 800}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            category: {
                              ...prev.category,
                              fontWeight: prev.category.fontWeight === 800 ? 300 : 800,
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>

                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              category: {
                                ...prev.category,
                                color: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                      <Typography variant="subtitle1">Brand</Typography>
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
                        checked={layoutContentStyling.brand.display === 'block'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            brand: {
                              ...prev.brand,
                              display: prev.brand.display === 'none' ? 'block' : 'none',
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%', my: 2 }}>
                      <Typography variant="caption" color="#8688A3">
                        Size
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                          <Slider
                            value={layoutContentStyling.brand.fontSize.split('px')[0]}
                            onChange={(_event: Event, newValue: number | number[]) => {
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                brand: {
                                  ...prev.brand,
                                  fontSize: newValue + 'px',
                                },
                              }));
                            }}
                            valueLabelDisplay="auto"
                            min={8}
                            max={20}
                          />
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
                      <Switch
                        checked={layoutContentStyling.brand.fontWeight === 800}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            brand: {
                              ...prev.category,
                              fontWeight: prev.brand.fontWeight === 800 ? 300 : 800,
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>

                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              brand: {
                                ...prev.brand,
                                color: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                      <Typography variant="subtitle1">Stock</Typography>
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
                        checked={layoutContentStyling.stock.display === 'block'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            stock: {
                              ...prev.stock,
                              display: prev.stock.display === 'none' ? 'block' : 'none',
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              stock: {
                                ...prev.stock,
                                color: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Background Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              stock: {
                                ...prev.stock,
                                backgroundColor: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                      <Typography variant="subtitle1">Out Of Stock</Typography>
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
                        checked={layoutContentStyling.stock.display === 'block'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            outOfStock: {
                              ...prev.outOfStock,
                              display: prev.outOfStock.display === 'none' ? 'block' : 'none',
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              outOfStock: {
                                ...prev.outOfStock,
                                color: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Background Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              outOfStock: {
                                ...prev.outOfStock,
                                backgroundColor: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                      <Typography variant="subtitle1">Rating</Typography>
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
                        checked={layoutContentStyling.rating.display === 'flex'}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            rating: {
                              ...prev.rating,
                              display: prev.rating.display === 'none' ? 'flex' : 'none',
                            },
                          }))
                        }
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
                        Five Star
                      </Typography>
                      <Switch
                        checked={layoutContentStyling.rating.fiveStar === 5}
                        onChange={() =>
                          setLayoutContentStyling((prev) => ({
                            ...prev,
                            rating: {
                              ...prev.rating,
                              fiveStar: prev.rating.fiveStar === 1 ? 5 : 1,
                            },
                          }))
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              rating: {
                                ...prev.rating,
                                backgroundColorFilled: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Background Color
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="18px">
                        <Sketch
                          onChange={(_event: Event, newValue: number | number[]) => {
                            setLayoutContentStyling((prev) => ({
                              ...prev,
                              rating: {
                                ...prev.rating,
                                backgroundColorEmpty: _event?.hex,
                              },
                            }));
                          }}
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    </Box>
                    <Accordion>
                      <AccordionSummary
                        sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="subtitle1">Text Value</Typography>
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
                            checked={layoutContentStyling.rating.textValue.display === 'block'}
                            onChange={() =>
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                rating: {
                                  ...prev.rating,
                                  textValue: {
                                    ...prev.rating.textValue,
                                    display:
                                      prev.rating.textValue.display === 'none' ? 'flex' : 'none',
                                  },
                                },
                              }))
                            }
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </Stack>
                        <Box sx={{ width: '100%', my: 2 }}>
                          <Typography variant="caption" color="#8688A3">
                            Size
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing="18px">
                            <Stack direction="row" alignItems="center" spacing={1} width={1}>
                              <Slider
                                value={
                                  layoutContentStyling.rating.textValue.fontSize.split('px')[0]
                                }
                                onChange={(_event: Event, newValue: number | number[]) => {
                                  setLayoutContentStyling((prev) => ({
                                    ...prev,
                                    rating: {
                                      ...prev.rating,
                                      textValue: {
                                        ...prev.rating.textValue,
                                        fontSize: newValue + 'px',
                                      },
                                    },
                                  }));
                                }}
                                valueLabelDisplay="auto"
                                min={8}
                                max={20}
                              />
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
                          <Switch
                            checked={layoutContentStyling.rating.textValue.fontWeight === 800}
                            onChange={() =>
                              setLayoutContentStyling((prev) => ({
                                ...prev,
                                rating: {
                                  ...prev.rating,
                                  textValue: {
                                    ...prev.rating.textValue,
                                    fontWeight:
                                      prev.rating.textValue.fontWeight === 800 ? 300 : 800,
                                  },
                                },
                              }))
                            }
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </Stack>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="#8688A3">
                            Color
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing="18px">
                            <Sketch
                              onChange={(_event: Event, newValue: number | number[]) => {
                                setLayoutContentStyling((prev) => ({
                                  ...prev,
                                  rating: {
                                    ...prev.rating,
                                    textValue: {
                                      ...prev.rating.textValue,
                                      color: _event.hex,
                                    },
                                  },
                                }));
                              }}
                              presetColors={customPresets}
                              style={{ width: '100%' }}
                            />
                          </Stack>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
            {/* Content End */}
            {/* Type Item Start */}
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Type Item</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', my: 2 }}>
                  <RadioGroup
                    row
                    onChange={(e) =>
                      setStyleStyling((prev) => ({
                        ...prev,
                        display: e.target.value,
                      }))
                    }
                    value={styleStyling.display}
                    // value={logoObj?.position}
                  >
                    <FormControlLabel
                      value="flex"
                      control={<Radio size="medium" />}
                      label="Horizontal"
                    />
                    <FormControlLabel
                      value="block"
                      control={<Radio size="medium" />}
                      label="Vertical "
                    />
                  </RadioGroup>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Scroll Type</Typography>
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
                    Vertical Scroll
                  </Typography>
                  <Switch
                    checked={scrollType === 'grid'}
                    onChange={() => setScrollType((pv) => (pv === 'flex' ? 'grid' : 'flex'))}
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
                  <Typography variant="subtitle1">Columns</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    No. of Columns
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        value={numberOfColumns}
                        onChange={(_event: Event, newValue: number) => setNumberOfColumns(newValue)}
                        valueLabelDisplay="auto"
                        min={1}
                        max={3}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductSelectionDealer;
