
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio, TextField, Switch, Divider } from '@mui/material';


// ----------------------------------------------------------------------

interface ProductViewProps {
    themeConfig: {
        productViewShow: boolean,
        productView: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function ProductViewDealer({ themeConfig, handleThemeConfig, mobile = false }: ProductViewProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('productViewShow', event.target.checked);

    return (
        <div>
            <Box pt='20px'>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Products Section</Typography>
                    <Switch
                        checked={themeConfig.productViewShow}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
                <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />
                <Typography variant='caption' component='p' color='#8688A3'>Sort</Typography>
                <TextField variant='filled' defaultValue={4} />

                <Box pt='20px'>
                    <RadioGroup
                        aria-labelledby="layout-CategorieRow-group"
                        defaultValue={themeConfig?.productView}
                        name="layout-CategorieRow-group"
                        onChange={(event) => handleThemeConfig('productView', event.target.value)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <FormControlLabel value='list' control={<Radio checked={themeConfig?.productView === "list"} size='medium' />} label={
                            <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                                <Box component='img' src='/raws/v1.png' />
                                <Box>
                                    <Typography variant='caption' component='p' color='#0F1349' >View 1</Typography>
                                    <Typography variant='caption' component='p' color='#0F1349' >List view scroll</Typography>
                                </Box>
                            </Stack>
                        } />

                        <FormControlLabel value='grid' control={<Radio checked={themeConfig?.productView === "grid"} size='medium' />} label={
                            <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                                <Box component='img' src='/raws/v2.png' />
                                <Box>
                                    <Typography variant='caption' component='p' color='#0F1349' >View 2</Typography>
                                    <Typography variant='caption' component='p' color='#0F1349' >Grid view scroll</Typography>
                                </Box>
                            </Stack>
                        } />

                        <FormControlLabel value='scroll' control={<Radio checked={themeConfig?.productView === "scroll"} size='medium' />} label={
                            <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                                <Box component='img' src='/raws/v3.png' />
                                <Box>
                                    <Typography variant='caption' component='p' color='#0F1349' >View 3</Typography>
                                    <Typography variant='caption' component='p' color='#0F1349' >Vertical view scroll</Typography>
                                </Box>
                            </Stack>
                        } />


                    </RadioGroup>
                </Box>


            </Box>
        </div>
    )
};