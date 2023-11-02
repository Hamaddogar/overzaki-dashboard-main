
import React from 'react';
import { Typography, Box, Stack, Switch, Divider, RadioGroup, FormControlLabel, Radio, Card } from '@mui/material';

// ----------------------------------------------------------------------

interface PersonalProps {
    themeConfig: {
        productPageAddWishlist: boolean;
        productPageShowDescription: boolean;
        productPageShowCategoryName: boolean;
        productPageshowAddToCart: boolean;
        productPageFilterCardStyle: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function ProductPageProductCardDealer({ themeConfig, handleThemeConfig, mobile = false }: PersonalProps) {

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig(key, event.target.checked);

    return (
        <Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />

            <Box>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Add Wishlist</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageAddWishlist}
                        onChange={handleChange('productPageAddWishlist')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Description</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageShowDescription}
                        onChange={handleChange('productPageShowDescription')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Category Name</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageShowCategoryName}
                        onChange={handleChange('productPageShowCategoryName')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Stack mb='10px' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='caption' fontWeight={900}>Show Add To Cart button</Typography>
                    <Switch
                        size='medium'
                        checked={themeConfig.productPageshowAddToCart}
                        onChange={handleChange('productPageshowAddToCart')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
            </Box>
            <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />

            <Box>
                <RadioGroup
                    aria-labelledby="controlled-product-view-grid-group"
                    value={themeConfig?.productPageFilterCardStyle}
                    name="list-view-grid-group"
                    onChange={(event) => handleThemeConfig('productPageFilterCardStyle', event.target.value)}
                    sx={{
                        display: 'flex !important',
                            flexDirection: 'row',
                            alignItems: 'center',
                            rowGap:'20px'
                    }}>

                    <FormControlLabel labelPlacement='bottom' value='style-1' control={<Radio checked={themeConfig?.productPageFilterCardStyle === "style-1"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                            {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                            <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }} >
                                <Box component='img' src='/raws/pc1.png' sx={{ width: '100%', maxWidth: '100px' }} />
                            </Card>
                        </Stack>
                    } />

                    <FormControlLabel labelPlacement='bottom' value='style-2' control={<Radio checked={themeConfig?.productPageFilterCardStyle === "style-2"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                            {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                            <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }} >
                                <Box component='img' src='/raws/pc2.png' sx={{ width: '100%', maxWidth: '100px' }} />
                            </Card>
                        </Stack>
                    } />

                    <FormControlLabel labelPlacement='bottom' value='style-3' control={<Radio checked={themeConfig?.productPageFilterCardStyle === "style-3"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                            {/* <Typography variant='caption' component='p' color='#0F1349'>Tabs</Typography> */}
                            <Card sx={{ boxShadow: '0px 3px 20px #0000001F', p: '5px' }} >
                                <Box component='img' src='/raws/pc2.png' sx={{ width: '100%', maxWidth: '100px' }} />
                            </Card>
                        </Stack>
                    } />

                </RadioGroup>
            </Box>
        </Box>
    )
};