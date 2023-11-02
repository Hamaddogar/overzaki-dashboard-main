
import React from 'react';
import { Typography, Box, Stack, Switch, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// ----------------------------------------------------------------------

interface PersonalProps {
    themeConfig: {
        productPageFilterShow: boolean;
        productPageFilterStyle: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function ProductPageFiltersDealer({ themeConfig, handleThemeConfig, mobile = false }: PersonalProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('productPageFilterShow', event.target.checked);

    return (
        <Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
            <Box>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' maxWidth='155px' fontWeight={900}>Show filter categories on the page</Typography>
                    <Switch
                        checked={themeConfig.productPageFilterShow}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Typography variant='caption' color='#8688A3'>Allow customers to Filter for products</Typography>
            </Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
            <Box>
                <RadioGroup
                    aria-labelledby="controlled-list-view-grid-group"
                    value={themeConfig?.productPageFilterStyle}
                    name="list-view-grid-group"
                    onChange={(event) => handleThemeConfig('productPageFilterStyle', event.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <FormControlLabel value='style-1' control={<Radio checked={themeConfig?.productPageFilterStyle === "style-1"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                            <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography>
                            <Box component='img' src='/raws/tabs.png' sx={{ maxWidth: '130px' }} />
                        </Stack>
                    } />

                    <FormControlLabel value='style-2' control={<Radio checked={themeConfig?.productPageFilterStyle === "style-2"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                            <Typography variant='caption' component='p' color='#0F1349'>Tages</Typography>
                            <Box component='img' src='/raws/tags.png' sx={{ maxWidth: '130px' }} />
                        </Stack>
                    } />


                </RadioGroup>
            </Box>
        </Box>
    )
};