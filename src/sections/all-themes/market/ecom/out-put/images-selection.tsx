
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface ImagesProps {
    themeConfig: {
        imagesStyle: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function ImagesStyleDealer({ themeConfig, handleThemeConfig, mobile = false }: ImagesProps) {

    return (
        <div>
            <Box pt='20px'>
                <RadioGroup
                    aria-labelledby="controlled-card-Style-grid-group"
                    value={themeConfig?.imagesStyle}
                    name="card-Style-grid-group"
                    onChange={(event) => handleThemeConfig('imagesStyle', event.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <FormControlLabel value='style-1' control={<Radio checked={themeConfig?.imagesStyle === "style-1"} size='medium' />} label={
                         <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                         <Box component='img' src='/raws/i1.png' />
                         <Typography variant='caption' component='p' color='#0F1349'>View 1</Typography>
                       </Stack>
                    } />

                    <FormControlLabel value='style-2' control={<Radio checked={themeConfig?.imagesStyle === "style-2"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                        <Box component='img' src='/raws/i2.png' />
                        <Typography variant='caption' component='p' color='#0F1349'>View 2</Typography>
                      </Stack>
                    } />

                    <FormControlLabel value='style-3' control={<Radio checked={themeConfig?.imagesStyle === "style-3"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                        <Box component='img' src='/raws/i3.png' />
                        <Typography variant='caption' component='p' color='#0F1349'>View 3</Typography>
                      </Stack>
                    } />

                </RadioGroup>
            </Box>
        </div>
    )
};