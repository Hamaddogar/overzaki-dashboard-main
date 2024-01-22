
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio, TextField, Switch, Divider } from '@mui/material';


// ----------------------------------------------------------------------

interface ProductViewProps {
    themeConfig: any;
    handleThemeConfig: (key: string, value: any, parentClass: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function ProductViewDealer({ themeConfig, handleThemeConfig, mobile = false }: ProductViewProps) {


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleThemeConfig('layout.homePage.product.showInApp', event.target.checked, 'layout')
    };

    return (
        <div>
            <Box pt='20px'>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Products Section</Typography>
                    <Switch
                        checked={themeConfig.layout.homePage.product.showInApp}
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
                        // defaultValue={themeConfig?.productView}
                        defaultValue={themeConfig.layout.homePage.product.rowType}
                        name="layout-CategorieRow-group"
                        onChange={(event) => handleThemeConfig('layout.homePage.product.rowType', event.target.value, 'layout')}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <FormControlLabel value='1' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "1"} size='medium' />} label={
                            <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                                <Box component='img' src='/raws/v1.png' />
                                <Box>
                                    <Typography variant='caption' component='p' color='#0F1349' >View 1</Typography>
                                    <Typography variant='caption' component='p' color='#0F1349' >List view scroll</Typography>
                                </Box>
                            </Stack>
                        } />

                        <FormControlLabel value='2' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "2"} size='medium' />} label={
                            <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                                <Box component='img' src='/raws/v2.png' />
                                <Box>
                                    <Typography variant='caption' component='p' color='#0F1349' >View 2</Typography>
                                    <Typography variant='caption' component='p' color='#0F1349' >Grid view scroll</Typography>
                                </Box>
                            </Stack>
                        } />

                        <FormControlLabel value='3' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "3"} size='medium' />} label={
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