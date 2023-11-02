
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio, TextField, Switch, Divider } from '@mui/material';


// ----------------------------------------------------------------------

interface LayoutCategoriesProps {
    themeConfig: {
        layoutCategoriesShow: boolean,
        layoutCategoriesRow: string,
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}


export default function LayoutCategoriesDealer({ themeConfig, handleThemeConfig, mobile = false }: LayoutCategoriesProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('layoutCategoriesShow', event.target.checked);

    return (
        <div>
            {
                mobile ?
                    <Box pt='20px'>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Categories Section</Typography>
                            <Switch
                                checked={themeConfig.layoutCategoriesShow}
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
                                defaultValue={themeConfig?.layoutCategoriesRow}
                                name="layout-CategorieRow-group"
                                onChange={(event) => handleThemeConfig('layoutCategoriesRow', event.target.value)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}
                            >
                                <FormControlLabel value="1" control={<Radio checked={themeConfig?.layoutCategoriesRow === "1"} size='medium' />} label={
                                    <Stack direction='row' alignItems='center' spacing='5px' ml='15px'>
                                        <Box component='img' src='/raws/row.svg' />
                                        <Typography variant='caption' color='#0F1349' >One Row</Typography>
                                    </Stack>
                                } />

                                <FormControlLabel value="2" control={<Radio checked={themeConfig?.layoutCategoriesRow === "2"} size='medium' />} label={
                                    <Stack direction='row' alignItems='center' spacing='5px' ml='15px'>
                                        <Box component='img' src='/raws/row2.svg' />
                                        <Typography variant='caption' color='#0F1349' >Two Rows</Typography>
                                    </Stack>
                                } />

                            </RadioGroup>
                        </Box>


                    </Box>
                    :

                    <Box pt='20px'>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Categories Section</Typography>
                            <Switch
                                checked={themeConfig.layoutCategoriesShow}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Stack>
                        <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />
                        <Typography variant='caption' component='p' color='#8688A3'>Sort</Typography>
                        <TextField variant='filled' defaultValue={4} />

                        <Box pt='20px'>
                            <RadioGroup
                                defaultValue={themeConfig?.layoutCategoriesRow}
                                name="layout-CategorieRow-group"
                                onChange={(event) => handleThemeConfig('layoutCategoriesRow', event.target.value)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}
                            >
                                <FormControlLabel value="1" control={<Radio checked={themeConfig?.layoutCategoriesRow === "1"} size='medium' />} label={
                                    <Stack direction='row' alignItems='center' spacing='5px' ml='15px'>
                                        <Box component='img' src='/raws/row.svg' />
                                        <Typography variant='caption' color='#0F1349' >One Row</Typography>
                                    </Stack>
                                } />

                                <FormControlLabel value="2" control={<Radio checked={themeConfig?.layoutCategoriesRow === "2"} size='medium' />} label={
                                    <Stack direction='row' alignItems='center' spacing='5px' ml='15px'>
                                        <Box component='img' src='/raws/row2.svg' />
                                        <Typography variant='caption' color='#0F1349' >Two Rows</Typography>
                                    </Stack>
                                } />

                            </RadioGroup>
                        </Box>


                    </Box>
            }
        </div>
    )
};