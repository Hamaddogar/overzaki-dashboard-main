
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface StyleCategoriesProps {
    themeConfig: {
        // cart: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function StyleCategoriesDealer({ themeConfig, handleThemeConfig, mobile = false }: StyleCategoriesProps) {

    return (
        <div>
            {mobile ?
                <Box pt='20px'>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="c1"
                        name="radio-buttons-group"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            flexWrap: 'nowrap'
                        }}
                    >
                        <FormControlLabel value="c1" control={<Radio size='medium' />} labelPlacement='bottom' label={
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


                        <FormControlLabel value="c2" control={<Radio size='medium' />} labelPlacement='bottom' label={
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

                        <FormControlLabel value="c3" control={<Radio size='medium' />} labelPlacement='bottom' label={
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
                :
                <Box >
                    <Box pt='20px'>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="c1"
                            name="radio-buttons-group"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            <FormControlLabel value="c1" control={<Radio size='medium' />} label={
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


                            <FormControlLabel value="c2" control={<Radio size='medium' />} label={
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

                            <FormControlLabel value="c3" control={<Radio size='medium' />} label={
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
                </Box>
            }
        </div>
    )
};