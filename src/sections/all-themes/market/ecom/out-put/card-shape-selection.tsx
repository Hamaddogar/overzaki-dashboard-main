import React, { useState } from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio, Card } from '@mui/material';

// ----------------------------------------------------------------------

interface CardShapeProps {
  themeConfig: {
    cardShape: string;
    // Add other themeConfig properties as needed
  };
  handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
  mobile?: boolean;
}

export default function CardShapeDealer({
  themeConfig,
  handleThemeConfig,
  mobile = false,
}: CardShapeProps) {
  const squareCardImagesArray = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];
  const roundedCardImagesArray = ['/card4.jpg'];
  const [selectedSquareCard, setSelectedSquareCard] = useState('style-1');
  const [selectedRoundedCard, setSelectedRoundedCard] = useState('style-1');
  return (
    <div>
      <Box pt='20px'>
        <RadioGroup
          aria-labelledby="controlled-card-Shape-grid-group"
          value={themeConfig?.cardShape}
          name="card-Shape-grid-group"
          onChange={(event) => handleThemeConfig('cardShape', event.target.value)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <FormControlLabel
            value="square"
            control={<Radio checked={themeConfig?.cardShape === 'square'} size="medium" />}
            label={
              <Stack direction="row" alignItems="center" spacing="12px" ml="15px">
                <Box component="img" src="/raws/Square.png" />
                <Typography variant="caption" component="p" color="#0F1349">
                  Square
                </Typography>
              </Stack>
            }
          />
          {themeConfig?.cardShape === 'square' && (
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
                      <Radio checked={selectedSquareCard === `style-${i + 1}`} size="medium" />
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
            control={<Radio checked={themeConfig?.cardShape === 'circle'} size="medium" />}
            label={
              <Stack direction="row" alignItems="center" spacing="12px" ml="15px">
                <Box component="img" src="/raws/Circle.png" />
                <Typography variant="caption" component="p" color="#0F1349">
                  Circle
                </Typography>
              </Stack>
            }
          />
          {themeConfig?.cardShape === 'circle' && (
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
                      <Radio checked={selectedRoundedCard === `style-${i + 1}`} size="medium" />
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
    </div>
  );
}