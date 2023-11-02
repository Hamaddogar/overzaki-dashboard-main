
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio} from '@mui/material';


// ----------------------------------------------------------------------

interface ListViewProps {
    themeConfig: {
        productPageView: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
}


export default function ProductPageViewDealer({ themeConfig, handleThemeConfig }: ListViewProps) {

    return (
        <div>
            <Box pt='20px'>
                <RadioGroup
                    aria-labelledby="controlled-list-view-grid-group"
                    value={themeConfig?.productPageView}
                    name="list-view-grid-group"
                    onChange={(event) => handleThemeConfig('productPageView', event.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <FormControlLabel value='6' control={<Radio checked={themeConfig?.productPageView === "6"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                            <Box component='img' src='/raws/Grid1.png' />
                            <Typography variant='caption' component='p' color='#0F1349' >Grid View 1</Typography>
                        </Stack>
                    } />

                    <FormControlLabel value='12' control={<Radio checked={themeConfig?.productPageView === "12"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                            <Box component='img' src='/raws/Grid3.png' />
                            <Typography variant='caption' component='p' color='#0F1349' >Grid View 3</Typography>
                        </Stack>
                    } />


                </RadioGroup>
            </Box>
        </div>
    )
};