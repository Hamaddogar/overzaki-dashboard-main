
import React from 'react';
import { Typography, Box, Stack, Switch, Divider } from '@mui/material';

// ----------------------------------------------------------------------

interface PersonalProps {
    themeConfig: {
        productPageSearch: boolean;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function ProductPageSearchDealer({ themeConfig, handleThemeConfig, mobile = false }: PersonalProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('productPageSearch', event.target.checked);

    return (
        <Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
            <Box>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' maxWidth='125px' fontWeight={900}>Show Search bar on the page</Typography>
                    <Switch
                        checked={themeConfig.productPageSearch}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Typography variant='caption' color='#8688A3'>Allow customers to search for products</Typography>
            </Box>
        </Box>
    )
};