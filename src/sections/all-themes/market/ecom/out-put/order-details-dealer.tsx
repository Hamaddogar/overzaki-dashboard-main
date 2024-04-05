import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import DeliveryAddress from 'src/sections/all-themes/component/order-details/DeliveryAddress';
import OrderNote from 'src/sections/all-themes/component/order-details/OrderNote';
import OrderNumber from 'src/sections/all-themes/component/order-details/OrderNumber';
import OrderSummary from 'src/sections/all-themes/component/order-details/OrderSummary';

const OrderDetailsDealer = () => {
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
  const [orderNumberNumber, setOrderNumberNumber] = useState<any>({
    fontSize: '14px',
    color: 'gray',
  });
  const [orderNumberDate, setOrderNumberDate] = useState<any>({
    fontSize: '14px',
    color: 'gray',
  });
  const [orderNumberStatus, setOrderNumberStatus] = useState<any>({
    fontSize: '14px',
    color: 'gray',
  });
  const [orderNumberContainer, setOrderNumberContainer] = useState<any>({
    padding: '18px',
    borderRadius: '5%',
    shadow: true,
    backgroundColor: 'white',
  });
  const [orderNoteContainer, setOrderNoteContainer] = useState<any>({
    padding: '18px',
    borderRadius: '5%',
    shadow: true,
    backgroundColor: 'white',
  });
  const [orderNoteHeading, setOrderNoteHeading] = useState<any>({
    fontSize: '14px',
    color: 'gray',
  });
  const [orderNoteText, setOrderNoteText] = useState<any>({
    fontSize: '14px',
    color: 'gray',
  });
  const [deliveryAddressContainer, setDeliveryAddressContainer] = useState<any>({
    padding: '18px',
    borderRadius: '5%',
    shadow: true,
    backgroundColor: 'white',
  });
  const [deliveryAddressText, setDeliveryAddressText] = useState<any>({
    fontSize: '12px',
    color: 'gray',
  });
  const [deliveryAddressHeading, setDeliveryAddressHeading] = useState<any>({
    fontSize: '16px',
    color: 'black',
  });

  const [orderSummarySubtotal, setOrderSummarySubtotal] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  const [orderSummaryDiscount, setOrderSummaryDiscount] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  const [orderSummaryVAT, setOrderSummaryVAT] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  const [orderSummaryFee, setOrderSummaryFee] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  const [orderSummaryTotal, setOrderSummaryTotal] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  const [orderSummaryPayment, setOrderSummaryPayment] = useState<any>({
    fontSize: '12px',
    color: 'gray',
    value: {
      fontSize: '12px',
      color: 'gray',
    },
  });
  return (
    <Stack>
      {/* Order Number Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Order Number</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {/* Order Number Component */}
          <OrderNumber
            orderNumberContainer={orderNumberContainer}
            orderNumberStatus={orderNumberStatus}
            orderNumberDate={orderNumberDate}
            orderNumberNumber={orderNumberNumber}
          />
          {/* Styling */}
          {/* Element */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Element</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
                      checked={orderNumberContainer.shadow}
                      onChange={(event: any, value: any) =>
                        setOrderNumberContainer((pv: any) => ({
                          ...pv,
                          shadow: !pv.shadow,
                        }))
                      }
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Stack>

                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Padding
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Stack direction="row" alignItems="center" spacing={1} width={1}>
                        <Slider
                          value={orderNumberContainer?.padding?.split('px')[0]}
                          onChange={(event: any, newValue: number | number[]) => {
                            setOrderNumberContainer((pv: any) => ({ ...pv, padding: newValue + 'px' }));
                          }}
                          valueLabelDisplay="auto"
                          min={0}
                          max={30}
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
                          value={orderNumberContainer.borderRadius.split('%')[0]}
                          onChange={(event: any, newValue: number | number[]) => {
                            setOrderNumberContainer((pv: any) => ({
                              ...pv,
                              borderRadius: newValue + '%',
                            }));
                          }}
                          valueLabelDisplay="auto"
                          min={0}
                          max={30}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="#8688A3">
                      Background Color
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="18px">
                      <Sketch
                        onChange={(event: any) =>
                          setOrderNumberContainer((prev: any) => ({
                            ...prev,
                            backgroundColor: event.hex,
                          }))
                        }
                        presetColors={customPresets}
                        style={{ width: '100%' }}
                      />
                    </Stack>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          {/* Number */}
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
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNumberNumber.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNumberNumber((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderNumberNumber((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Date */}
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
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNumberDate.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNumberDate((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderNumberDate((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Status */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Status</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNumberStatus.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNumberStatus((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderNumberStatus((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* Order Note Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Order Note</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <OrderNote
            orderNoteText={orderNoteText}
            orderNoteHeading={orderNoteHeading}
            orderNoteContainer={orderNoteContainer}
          />
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
                  checked={orderNoteContainer.shadow}
                  onChange={(event: any, value: any) =>
                    setOrderNoteContainer((pv: any) => ({
                      ...pv,
                      shadow: !pv.shadow,
                    }))
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Stack>

              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Padding
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNoteContainer.padding.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNoteContainer((pv: any) => ({ ...pv, padding: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
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
                      value={orderNoteContainer.borderRadius.split('%')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNoteContainer((pv: any) => ({
                          ...pv,
                          borderRadius: newValue + '%',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Background Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) =>
                      setOrderNoteContainer((prev: any) => ({
                        ...prev,
                        backgroundColor: event.hex,
                      }))
                    }
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
                <Typography variant="subtitle1">Heading</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNoteHeading.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNoteHeading((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderNoteHeading((pv: any) => ({ ...pv, color: e?.hex }))}
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
                <Typography variant="subtitle1">Text</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderNoteText.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderNoteText((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderNoteText((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* Delivery Address Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Delivery Address</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DeliveryAddress
            deliveryAddressHeading={deliveryAddressHeading}
            deliveryAddressText={deliveryAddressText}
            deliveryAddressContainer={deliveryAddressContainer}
          />
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
                  checked={deliveryAddressContainer.shadow}
                  onChange={(event: any, value: any) =>
                    setDeliveryAddressContainer((pv: any) => ({
                      ...pv,
                      shadow: !pv.shadow,
                    }))
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Stack>

              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Padding
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={deliveryAddressContainer.padding.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setDeliveryAddressContainer((pv: any) => ({ ...pv, padding: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
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
                      value={deliveryAddressContainer.borderRadius.split('%')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setDeliveryAddressContainer((pv: any) => ({
                          ...pv,
                          borderRadius: newValue + '%',
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Background Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) =>
                      setDeliveryAddressContainer((prev: any) => ({
                        ...prev,
                        backgroundColor: event.hex,
                      }))
                    }
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Text Accordion */}
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
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={deliveryAddressText.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setDeliveryAddressText((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setDeliveryAddressText((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Heading */}
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
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={deliveryAddressHeading.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setDeliveryAddressHeading((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setDeliveryAddressHeading((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* Order Summary Accordion */}
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Order Summary</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <OrderSummary
            orderSummaryFee={orderSummaryFee}
            orderSummaryDiscount={orderSummaryDiscount}
            orderSummarySubtotal={orderSummarySubtotal}
            orderSummaryVAT={orderSummaryVAT}
            orderSummaryPayment={orderSummaryPayment}
            orderSummaryTotal={orderSummaryTotal}
          />
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Subtotal</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummarySubtotal.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummarySubtotal((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummarySubtotal((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Subtotal value accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Subtotal Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummarySubtotal.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummarySubtotal((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummarySubtotal((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
          {/* Discount Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Discount</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryDiscount.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryDiscount((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummaryDiscount((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Discount Value */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Discount Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryDiscount.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryDiscount((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummaryDiscount((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
          {/* VAT Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">VAT</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryVAT.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryVAT((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummaryVAT((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* VAT Value Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">VAT Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryVAT.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryVAT((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummaryVAT((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
          {/* Delivery Fee Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Delivery Fees</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryFee.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryFee((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummaryFee((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Delivery Fee Value */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Delivery Fee Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryFee.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryFee((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummaryFee((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
          {/* Total Accordion */}
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
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryTotal.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryTotal((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummaryTotal((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Total Value Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Total Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryTotal.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryTotal((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummaryTotal((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
          {/* Payment Method Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Payment Method</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryPayment.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryPayment((pv: any) => ({ ...pv, fontSize: newValue + 'px' }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(e) => setOrderSummaryPayment((pv: any) => ({ ...pv, color: e?.hex }))}
                    presetColors={customPresets}
                    style={{ width: '100%' }}
                  />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Payment Value Accordion */}
          <Accordion>
            <AccordionSummary
              sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">Payment Method Value</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Font Size
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Stack direction="row" alignItems="center" spacing={1} width={1}>
                    <Slider
                      value={orderSummaryPayment.value.fontSize.split('px')[0]}
                      onChange={(event: any, newValue: number | number[]) => {
                        setOrderSummaryPayment((pv: any) => ({
                          ...pv,
                          value: {
                            ...pv.value,
                            fontSize: newValue + 'px',
                          },
                        }));
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Text Color
                </Typography>
                <Stack direction="row" alignItems="center" spacing="18px">
                  <Sketch
                    onChange={(event: any) => {
                      return setOrderSummaryPayment((pv: any) => ({
                        ...pv,
                        value: {
                          ...pv.value,
                          color: event.hex,
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
    </Stack>
  );
};

export default OrderDetailsDealer;
