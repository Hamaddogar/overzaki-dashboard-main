
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface CardShapeProps {
    themeConfig: {
        cardShape: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function CardShapeDealer({ themeConfig, handleThemeConfig, mobile = false }: CardShapeProps) {

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
                    <FormControlLabel value='square' control={<Radio checked={themeConfig?.cardShape === "square"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                        <Box component='img' src='/raws/Square.png' />
                        <Typography variant='caption' component='p' color='#0F1349'>Square</Typography>
                      </Stack>
                    } />

                    <FormControlLabel value='circle' control={<Radio checked={themeConfig?.cardShape === "circle"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                        <Box component='img' src='/raws/Circle.png' />
                        <Typography variant='caption' component='p' color='#0F1349'>Circle</Typography>
                      </Stack>
                    } />

                </RadioGroup>
            </Box>
        </div>
    )
};