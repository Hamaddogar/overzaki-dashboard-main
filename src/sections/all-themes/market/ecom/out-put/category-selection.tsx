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
      name: 'Handbag',
      src: 'data:image/jpeg;base64,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',
    },
    {
      name: 'Dresses',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8xHwYLlPbSSj_ZS4UJ7sgGvXgFIHPwpVd7A&usqp=CAU',
    },
    {
      name: 'Shirts',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjNvVucyNP1Ge6Hina1pRd2HuxvcpfdTKWQ&usqp=CAU',
    },
    {
      name: 'Shoes',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOzUcMRXRpIci_C-I9_sr7aez-eRmlF0lyA&usqp=CAU',
    },
    {
      name: 'Hoodies',
      src: 'https://images.meesho.com/images/products/157222813/mtqas_512.webp',
    },
    {
      name: 'Jackets',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7f3bS1mH0UoE6m0V3WExl9Sil3KpCkYYO0g&usqp=CAU',
    },
    {
      name: 'Kids',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjc4C4P226WtOEdcfxInyvT9BqVnhkfBS5QA&usqp=CAU',
    },
    {
      name: 'Sneakers',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1tFnwJTy8kSE4VHFjrGsuTe-GV_SVrBdzrg&usqp=CAU',
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
