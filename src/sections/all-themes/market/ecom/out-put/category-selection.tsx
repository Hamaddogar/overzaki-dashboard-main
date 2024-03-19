import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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

const CategoryViewDealer = () => {
  const [categoryDummyData, setCategoryDummyData] = useState([
    {
      name: 'Easter',
      src: 'https://images.pexels.com/photos/7726464/pexels-photo-7726464.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Spring',
      src: 'https://images.pexels.com/photos/306798/pexels-photo-306798.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'BreakFast',
      src: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Appetizers',
      src: 'https://images.pexels.com/photos/6419698/pexels-photo-6419698.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Air Fryer',
      src: 'https://images.pexels.com/photos/402007/pexels-photo-402007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Chicken',
      src: 'https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: '30-Minute Meals',
      src: 'https://images.pexels.com/photos/17121393/pexels-photo-17121393/free-photo-of-cheeseburgers-on-pink-background.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Slow Cooker',
      src: 'https://images.pexels.com/photos/4057692/pexels-photo-4057692.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Desserts',
      src: 'https://images.pexels.com/photos/6062015/pexels-photo-6062015.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]);
  const [categorySectionStyling, setCategorySectionStyling] = useState({
    header: true,
    title: true,
    viewAll: true,
  });
  const [activeSection, setActiveSection] = useState('Section');
  const [scrollType, setScrollType] = useState('flex');
  const [numberOfColumns, setNumberOfColumns] = useState(2);
  const [typeItem, setTypeItem] = useState('block');
  const [layoutStyling, setLayoutStyling] = useState({
    boxShadow: 'none',
    borderRadius: '0%',
    borderWidth: '0px',
    border: '',
    backgroundColor: 'transparent',
    image: {
      display: 'block',
      minWidth: '70px',
      height: '70px',
      margin: '0px',
    },
    content: {
      display: '',
    },
    contentTitle: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 800,
      color: 'black',
    },
    contentSubtitle: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
    contentItemsNumber: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
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
    <Stack width={'100%'}>
      <Stack padding={'5px'} bgcolor={'white'} width={'100%'}>
        {categorySectionStyling.header && (
          <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
            {categorySectionStyling.title && (
              <Typography
                sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                color={'black'}
                variant="h6"
              >
                Products
              </Typography>
            )}
            {categorySectionStyling.viewAll && (
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
            display: scrollType,
            gap: '8px',
            overflowX: 'auto',
            width: '100%',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' },

            gridTemplateColumns: `repeat(${numberOfColumns}, 0fr)`,
          }}
        >
          {categoryDummyData.map((item) => (
            <Box
              sx={{
                position: 'relative',
                display: typeItem,
                alignItems: 'center',
                textAlign: 'center',
                padding: '3px',
                ...layoutStyling,
              }}
              alignItems={'center'}
            >
              <img
                style={{
                  borderRadius: '50%',
                  ...layoutStyling.image,
                }}
                src={item.src}
              />
              <Stack
                direction={'column'}
                sx={{
                  ...(layoutStyling?.content || {}),
                  position: typeItem || 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: typeItem === 'absolute' ? ' translate(-50%, -50%)' : "none",
                }}
              >
                <Typography sx={{ ...layoutStyling.contentTitle }} variant="caption">
                  {item.name}
                </Typography>
                <Typography style={{ ...layoutStyling.contentSubtitle }} variant="caption">
                  Item for men
                </Typography>
                <Typography style={{ ...layoutStyling.contentItemsNumber }} variant="caption">
                  14 Items
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
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
      {activeSection === 'Section' && (
        <Stack>
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
                    checked={categorySectionStyling.header}
                    onChange={() =>
                      setCategorySectionStyling((pv) => ({ ...pv, header: !pv.header }))
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
                    With Title
                  </Typography>
                  <Switch
                    checked={categorySectionStyling.title}
                    onChange={() =>
                      setCategorySectionStyling((pv) => ({ ...pv, title: !pv.title }))
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
                    With View All
                  </Typography>
                  <Switch
                    checked={categorySectionStyling.viewAll}
                    onChange={() =>
                      setCategorySectionStyling((pv) => ({ ...pv, viewAll: !pv.viewAll }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
      {activeSection === 'Style' && (
        <Stack>
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
                <Typography variant="subtitle1">Type Item</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%', my: 2 }}>
                <RadioGroup
                  row
                  onChange={(e) => setTypeItem(e.target.value)}
                  value={typeItem}
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
                  <FormControlLabel
                    value="absolute"
                    control={<Radio size="medium" />}
                    label="Absolute "
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
                <Typography variant="subtitle1">Row & Column</Typography>
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
                      onChange={(_event: any, newValue: any) => setNumberOfColumns(newValue)}
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
      {activeSection === 'Layout' && (
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
                  checked={layoutStyling.boxShadow !== 'none'}
                  onChange={() =>
                    setLayoutStyling((pv) => ({
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
                <Typography variant="subtitle1">Container</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Border Radius
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        // value={numberOfColumns}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((prev) => ({ ...prev, borderRadius: newValue + '%' }))
                        }
                        valueLabelDisplay="auto"
                        min={0}
                        max={50}
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
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((prev) => ({ ...prev, borderWidth: newValue }))
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
                        setLayoutStyling((prev) => ({
                          ...prev,
                          border: `${prev?.borderWidth}px solid ${event?.hex} `,
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
                      onChange={(event: any) => {
                        setLayoutStyling((prev) => ({
                          ...prev,
                          backgroundColor: event.hex,
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
              <Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    With Image
                  </Typography>
                  <Switch
                    checked={layoutStyling.image.display === 'block'}
                    onChange={() =>
                      setLayoutStyling((pv) => ({
                        ...pv,
                        image: {
                          ...pv.image,
                          display: pv.image.display === 'block' ? 'none' : 'block',
                        },
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                <Box sx={{ width: '100%', my: 2 }}>
                  <Typography variant="caption" color="#8688A3">
                    Image Width
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        value={Number(layoutStyling.image.minWidth.split('px')[0]) || 0}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            image: {
                              ...pv.image,
                              minWidth: newValue + 'px',
                            },
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
                    Image Height
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        value={Number(layoutStyling.image.height.split('px')[0]) || 0}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            image: {
                              ...pv.image,
                              height: newValue + 'px',
                            },
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
                    Margin
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                      <Slider
                        value={Number(layoutStyling.image.margin.split('px')[0]) || 0}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            image: {
                              ...pv.image,
                              margin: newValue + 'px',
                            },
                          }))
                        }
                        valueLabelDisplay="auto"
                        min={0}
                        max={15}
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
                <Typography variant="subtitle1">Content</Typography>
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
                    With Content
                  </Typography>
                  <Switch
                    checked={layoutStyling.content.display === ''}
                    onChange={() =>
                      setLayoutStyling((pv) => ({
                        ...pv,
                        content: {
                          ...pv.content,
                          display: pv.content.display === '' ? 'none' : '',
                        },
                      }))
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
              </Stack>
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
                      <Switch
                        checked={layoutStyling.contentTitle.display === 'block'}
                        onChange={() =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentTitle: {
                              ...pv.contentTitle,
                              display: pv.contentTitle.display === 'block' ? 'none' : 'block',
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
                            value={Number(layoutStyling.contentTitle.fontSize.split('px')[0]) || 0}
                            onChange={(_event: any, newValue: any) =>
                              setLayoutStyling((pv) => ({
                                ...pv,
                                contentTitle: {
                                  ...pv.contentTitle,
                                  fontSize: newValue + 'px',
                                },
                              }))
                            }
                            valueLabelDisplay="auto"
                            min={0}
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
                        checked={layoutStyling.contentTitle.fontWeight === 800}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentTitle: {
                              ...pv.contentTitle,
                              fontWeight: pv.contentTitle.fontWeight === 800 ? 300 : 800,
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
                          onChange={(event: any) =>
                            setLayoutStyling((pv) => ({
                              ...pv,
                              contentTitle: {
                                ...pv.contentTitle,
                                color: event?.hex,
                              },
                            }))
                          }
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                    <Typography variant="subtitle1">Sub Title</Typography>
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
                      <Switch
                        checked={layoutStyling.contentSubtitle.display === 'block'}
                        onChange={() =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentSubtitle: {
                              ...pv.contentSubtitle,
                              display: pv.contentSubtitle.display === 'block' ? 'none' : 'block',
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
                            value={Number(layoutStyling.contentSubtitle.fontSize.split('px')[0]) || 0}
                            onChange={(_event: any, newValue: any) =>
                              setLayoutStyling((pv) => ({
                                ...pv,
                                contentSubtitle: {
                                  ...pv.contentSubtitle,
                                  fontSize: newValue + 'px',
                                },
                              }))
                            }
                            valueLabelDisplay="auto"
                            min={0}
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
                        checked={layoutStyling.contentSubtitle.fontWeight === 800}
                        onChange={(_event: any, newValue: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentSubtitle: {
                              ...pv.contentSubtitle,
                              fontWeight: pv.contentSubtitle.fontWeight === 800 ? 300 : 800,
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
                          onChange={(event: any) =>
                            setLayoutStyling((pv) => ({
                              ...pv,
                              contentSubtitle: {
                                ...pv.contentSubtitle,
                                color: event?.hex,
                              },
                            }))
                          }
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
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
                    <Typography variant="subtitle1">Items Number</Typography>
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
                      <Switch
                        checked={layoutStyling.contentItemsNumber.display === 'block'}
                        onChange={() =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentItemsNumber: {
                              ...pv.contentItemsNumber,
                              display: pv.contentItemsNumber.display === 'block' ? 'none' : 'block',
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
                            value={Number(layoutStyling.contentItemsNumber.fontSize.split('px')[0]) || 0}
                            onChange={(_event: any, newValue: any) =>
                              setLayoutStyling((pv) => ({
                                ...pv,
                                contentItemsNumber: {
                                  ...pv.contentItemsNumber,
                                  fontSize: newValue + 'px',
                                },
                              }))
                            }
                            valueLabelDisplay="auto"
                            min={0}
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
                        checked={layoutStyling.contentItemsNumber.fontWeight === 800}
                        onChange={(_event: any) =>
                          setLayoutStyling((pv) => ({
                            ...pv,
                            contentItemsNumber: {
                              ...pv.contentItemsNumber,
                              fontWeight: pv.contentItemsNumber.fontWeight === 800 ? 300 : 800,
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
                          onChange={(event: any) =>
                            setLayoutStyling((pv) => ({
                              ...pv,
                              contentItemsNumber: {
                                ...pv.contentItemsNumber,
                                color: event?.hex,
                              },
                            }))
                          }
                          presetColors={customPresets}
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </Stack>
  );
};

export default CategoryViewDealer;
