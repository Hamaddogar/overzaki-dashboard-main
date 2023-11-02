
import React from 'react';
import { Stack, Typography, Box, TextField } from '@mui/material';


// ----------------------------------------------------------------------

interface ColorsProps {
    themeConfig: {
        primaryColor: string;
        secondaryColor: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
}


const isColorValid = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(color);



export default function ColorsDealer({ themeConfig, handleThemeConfig }: ColorsProps) {

    return (
        <Box mt='20px'>
            <Box>
                <Typography variant='caption' color='#8688A3'>Primary Color</Typography>
                <Stack direction='row' alignItems='center' spacing='18px'>
                    <TextField variant='filled' defaultValue={themeConfig.primaryColor}
                        onChange={event => isColorValid(event.target.value) ? handleThemeConfig("primaryColor", event.target.value) : null}
                    />
                    <Box sx={{
                        width: "48px",
                        height: "48px",
                        background: `${themeConfig.primaryColor} 0% 0% no-repeat padding-box`,
                        boxShadow: "0px 6px 20px #00000033",
                        borderRadius: '16px'
                    }} />
                </Stack>
            </Box>

            <Box mt='10px'>
                <Typography variant='caption' color='#8688A3'>Secondary Color</Typography>
                <Stack direction='row' alignItems='center' spacing='18px'>
                    <TextField variant='filled' defaultValue={themeConfig.secondaryColor}
                        onChange={event => isColorValid(event.target.value) ? handleThemeConfig("secondaryColor", event.target.value) : null}
                    />
                    <Box sx={{
                        width: "48px",
                        height: "48px",
                        background: `${themeConfig.secondaryColor} 0% 0% no-repeat padding-box`,
                        boxShadow: "0px 6px 20px #00000033",
                        borderRadius: '16px'
                    }} />
                </Stack>
            </Box>
        </Box>
    )
}