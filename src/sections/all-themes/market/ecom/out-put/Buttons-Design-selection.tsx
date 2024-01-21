
import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Button, Box, Slider } from '@mui/material';


// ----------------------------------------------------------------------

interface ButtonsProps {
    themeConfig: {
        buttonRadius: number;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any, parentClass?: any) => void; // Adjust 'value' type as needed
}


export default function ButtonsDealer({ themeConfig, handleThemeConfig }: ButtonsProps) {

    return (
        <div>
            <Box mt='50px'>
                <PrettoSlider max={30} step={1} size='medium' value={themeConfig?.buttonRadius} onChange={(event, newValue) => handleThemeConfig('buttonRadius', newValue, 'css')} aria-labelledby="continuous-slider" />
                <Stack mt='-10px' direction='row' justifyContent='space-between'>
                    <Typography color='#8688A3' variant='caption'>Sharp</Typography>
                    <Typography color='#8688A3' variant='caption'>Rounded</Typography>
                </Stack>
            </Box>

            <Box mt='36px'>
                <Button fullWidth variant='contained'
                    size='large'
                    sx={{
                        borderRadius: `${themeConfig.buttonRadius}px`,
                        background: '#8688A3'
                    }}
                >
                    Button Name
                </Button>
            </Box>
        </div>
    )
}

const PrettoSlider = styled(Slider)({
    color: '#F5F5F8',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
        // background:'#F5F5F8'
    },
    '& .MuiSlider-rail': {
        opacity: 1,
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        boxShadow: '0px 6px 20px #0F134933',
        // border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0px 6px 20px #0F134933',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});