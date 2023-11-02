
import React from 'react';
import { Typography, Box, Stack, Switch, Divider } from '@mui/material';

// ----------------------------------------------------------------------

interface WishlistProps {
    themeConfig: {
        wishListShow: boolean;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function WishlistDealer({ themeConfig, handleThemeConfig, mobile = false }: WishlistProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('wishListShow', event.target.checked);

    return (
        <Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
            <Box>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' maxWidth='125px' fontWeight={900}>Show Save to favorites option</Typography>
                    <Switch
                        checked={themeConfig.wishListShow}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Typography variant='caption' color='#8688A3'>Allow user to save products to favorites</Typography>
            </Box>
        </Box>
    )
};