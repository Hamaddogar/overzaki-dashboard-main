
import React from 'react';
import { Typography, Box, Stack, Switch, Divider } from '@mui/material';

// ----------------------------------------------------------------------

interface SimilarProductsProps {
    themeConfig: {
        similarProductsShow: boolean;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function SimilarProductsDealer({ themeConfig, handleThemeConfig, mobile = false }: SimilarProductsProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('similarProductsShow', event.target.checked);

    return (
        <Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
            <Box>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' maxWidth='125px' fontWeight={900}>Show similar products section</Typography>
                    <Switch
                        checked={themeConfig.similarProductsShow}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Typography variant='caption' color='#8688A3'>let customers browse more similar products</Typography>
            </Box>
        </Box>
    )
};