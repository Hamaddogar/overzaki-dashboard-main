import React, { useState } from 'react';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Slider,
} from '@mui/material';
import OrderCard from 'src/sections/all-themes/component/OrderCard';
import Iconify from 'src/components/iconify';
import Sketch from '@uiw/react-color-sketch';
const OtpDealer = () => {
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
  const [orderCardNumber, setOrderCardNumber] = useState<any>({ color: 'black', fontSize: '12px' });
  const [orderCardDate, setOrderCardDate] = useState<any>({ color: 'gray', fontSize: '10px' });
  const [orderCardProducts, setOrderCardProducts] = useState<any>({ color: 'gray', fontSize: '10px' });
  const [orderCardTotal, setOrderCardTotal] = useState<any>({ color: 'black', fontSize: '8px' });
  const [orderCardContainer, setOrderCardContainer] = useState<any>({
    backgroundColor: 'transparent',
    padding: '25px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopRightRadius: '20px',
    shadow: 5,
  });
  return (
    <Box>
      <Box mt="20px">
        <OrderCard
          orderCardContainer={orderCardContainer}
          orderCardTotal={orderCardTotal}
          orderCardDate={orderCardDate}
          orderCardProducts={orderCardProducts}
          orderCardNumber={orderCardNumber}
        />
      </Box>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Number</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Text Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(e) => setOrderCardNumber((pv: any) => ({ ...pv, color: e?.hex }))}
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Font Size
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardNumber ? orderCardNumber?.fontSize?.split('px')[0] : 0}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardNumber((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* 2nd Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Date</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Text Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(e) => setOrderCardDate((pv: any) => ({ ...pv, color: e?.hex }))}
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Font Size
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardDate?.fontSize?.split('px')[0] || "0"}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardDate((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* 3rd Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Products</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Text Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(e) => setOrderCardProducts((pv: any) => ({ ...pv, color: e?.hex }))}
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Font Size
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardProducts.fontSize.split('px')[0]}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardProducts((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* 4th Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Total</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Text Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(e) => setOrderCardTotal((pv: any) => ({ ...pv, color: e?.hex }))}
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Font Size
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardTotal.fontSize.split('px')[0]}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardTotal((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* 5th Accordion */}
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
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Background Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(e) =>
                  setOrderCardContainer((pv: any) => ({ ...pv, backgroundColor: e?.hex }))
                }
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Padding
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardContainer.padding.split('px')[0]}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardContainer((pv: any) => ({ ...pv, padding: newValue + 'px' }));
                  }}
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
                <Typography variant="subtitle1">Border Radius</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Border Top Left Radius
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderCardContainer.borderTopLeftRadius.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderCardContainer((pv: any) => ({
                          ...pv,
                          borderTopLeftRadius: newValue + 'px',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Border Bottom Left Radius
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderCardContainer.borderBottomLeftRadius.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderCardContainer((pv: any) => ({
                          ...pv,
                          borderBottomLeftRadius: newValue + 'px',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Border Top Right Radius
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderCardContainer.borderTopRightRadius.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderCardContainer((pv: any) => ({
                          ...pv,
                          borderTopRightRadius: newValue + 'px',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Border Bottom Right Radius
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderCardContainer.borderBottomRightRadius.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderCardContainer((pv: any) => ({
                          ...pv,
                          borderborderBottomRightRadius: newValue + 'px',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                    />
                  </Stack>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Shadow
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Slider
                  value={orderCardContainer.shadow}
                  onChange={(event: any, newValue: number | number[]) => {
                    setOrderCardContainer((pv: any) => ({
                      ...pv,
                      shadow: newValue,
                    }));
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10}
                />
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OtpDealer;
