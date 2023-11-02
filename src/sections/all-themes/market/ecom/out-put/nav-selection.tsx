
import React, { ChangeEvent } from 'react';
import { TextField, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface NavProps {
    themeConfig: {
        navLogoPosition: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function NavDealer({ themeConfig, handleThemeConfig, mobile = false }: NavProps) {

    const handleNavPosition = (event: ChangeEvent<HTMLInputElement>) => {
        handleThemeConfig('navLogoPosition', event.target.value);
    }
    return (
        <div>
            {
                mobile ?

                    <RadioGroup
                        aria-labelledby="nav-logo-position-group-label"
                        defaultValue="center"
                        name="nav-logo-position-group"
                        onChange={handleNavPosition}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // gap: '20px',
                            mt: '20px'
                        }}
                    >
                        <FormControlLabel value="center" control={<Radio size='medium' checked={themeConfig.navLogoPosition === "center"} />} label={
                            // <Typography variant='caption' color='#0F1349'>Logo Centered</Typography>
                            <Box component='img' src='/raws/nav1.svg' sx={{ p: 0, width: '100%' }} />
                        } />

                        <FormControlLabel value="flex-start" control={<Radio size='medium' checked={themeConfig.navLogoPosition === 'flex-start'} />} label={
                            // <Typography variant='caption' color='#0F1349'>Logo Left</Typography>
                            <Box component='img' src='/raws/nav2.svg' sx={{ p: 0, width: '100%' }} />
                        } />

                    </RadioGroup>



                    :
                    <Box pt='20px'>

                        <Typography variant='caption' component='p' color='#8688A3'>Sort</Typography>
                        <TextField variant='filled' defaultValue={1} />

                        <RadioGroup
                            aria-labelledby="nav-logo-position-group-label"
                            defaultValue="center"
                            name="nav-logo-position-group"
                            onChange={handleNavPosition}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                // gap: '20px',
                                mt: '20px'
                            }}
                        >
                            <FormControlLabel value="center" control={<Radio size='medium' checked={themeConfig.navLogoPosition === "center"} />} label={
                                <Typography variant='caption' color='#0F1349'>Logo Centered</Typography>
                            } />
                            <Box component='img' src='/raws/nav1.svg' sx={{ p: 0, width: '100%' }} />

                            <FormControlLabel value="left" control={<Radio size='medium' checked={themeConfig.navLogoPosition === 'left'} />} label={
                                <Typography variant='caption' color='#0F1349'>Logo Left</Typography>
                            } />
                            <Box component='img' src='/raws/nav2.svg' sx={{ p: 0, width: '100%' }} />

                        </RadioGroup>



                    </Box>

            }

        </div>
    )
};