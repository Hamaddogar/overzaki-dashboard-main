
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface CardStyleProps {
    themeConfig: {
        cardStyle: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function CardStyleDealer({ themeConfig, handleThemeConfig, mobile = false }: CardStyleProps) {

    return (
        <div>
            <Box pt='20px'>
                <RadioGroup
                    aria-labelledby="controlled-card-Style-grid-group"
                    value={themeConfig?.cardStyle}
                    name="card-Style-grid-group"
                    onChange={(event) => handleThemeConfig('cardStyle', event.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <FormControlLabel value='style-1' control={<Radio checked={themeConfig?.cardStyle === "style-1"} size='medium' />} label={
                        <Stack alignItems='center' spacing='5px' ml='15px'>
                            <Stack alignItems='center' justifyContent='center' sx={{
                                width: "100px",
                                height: "100px",
                                background: 'rgb(0, 0, 0,.01)',
                                borderRadius: "12px",
                                backgroundImage: 'url(/raw/cm.jpg)',
                                backgroundSize: ' cover',
                                backdropFilter: 'blur(25px)'
                            }} />
                            <Typography variant='caption' color='#0F1349' >Category Name</Typography>
                        </Stack>
                    } />

                    <FormControlLabel value='style-2' control={<Radio checked={themeConfig?.cardStyle === "style-2"} size='medium' />} label={
                        <Stack alignItems='center' spacing='5px' ml='15px'>
                            <Box sx={{
                                backgroundImage: 'url(/raw/cm.jpg)',
                                backgroundSize: ' cover',
                                borderRadius: "12px",
                            }}>
                                <Stack alignItems='center' justifyContent='center' sx={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "12px",
                                    background: 'rgb(0, 0, 0,.4)',
                                }}>
                                    <Typography variant='caption' color='#FFFFFF' textAlign='center' >Category <br /> Name</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    } />

                    <FormControlLabel value='style-3' control={<Radio checked={themeConfig?.cardStyle === "style-3"} size='medium' />} label={
                        <Stack alignItems='center' spacing='5px' ml='15px'>
                            <Box sx={{
                                backgroundImage: 'url(/raw/cm.jpg)',
                                backgroundSize: ' cover',
                                borderRadius: "12px",
                            }}>
                                <Stack alignItems='center' justifyContent='center' sx={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "12px",
                                    background: 'rgb(255, 255, 255,.75)',
                                }}>
                                    <Typography variant='caption' color='#0F1349' textAlign='center' >Category <br /> Name</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    } />


                </RadioGroup>
            </Box>
        </div>
    )
};