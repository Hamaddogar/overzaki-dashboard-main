
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface ListViewProps {
    // themeConfig: {
    //     listViewGrid: string,
    //     // Add other themeConfig properties as needed
    // };
    themeConfig: any;
    handleThemeConfig: (key: string, value: any, parentClass: any) => void; // Adjust 'value' type as needed
}


export default function ListViewDealer({ themeConfig, handleThemeConfig }: ListViewProps) {

    return (
        <div>
            <Box pt='20px'>
                <RadioGroup
                    aria-labelledby="controlled-list-view-grid-group"
                    name="list-view-grid-group"
                    // value={themeConfig?.listViewGrid}
                    // onChange={(event) => handleThemeConfig('listViewGrid', event.target.value)}
                    value={themeConfig.layout.homePage.product.rowType}
                    onChange={(event) => handleThemeConfig('layout.homePage.product.rowType', event.target.value, 'layout')}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <FormControlLabel value='1' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "1"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                            <Box component='img' src='/raws/Grid3.png' />
                            <Typography variant='caption' component='p' color='#0F1349' >Grid View 1</Typography>
                        </Stack>
                    } />

                    <FormControlLabel value='2' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "2"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                            <Box component='img' src='/raws/Grid2.png' />
                            <Typography variant='caption' component='p' color='#0F1349' >Grid View 2</Typography>
                        </Stack>
                    } />

                    <FormControlLabel value='3' control={<Radio checked={themeConfig.layout.homePage.product.rowType === "3"} size='medium' />} label={
                        <Stack direction='row' alignItems='center' spacing='12px' ml='15px'>
                            <Box component='img' src='/raws/Grid1.png' />
                            <Typography variant='caption' component='p' color='#0F1349' >Grid View 3</Typography>
                        </Stack>
                    } />


                </RadioGroup>
            </Box>
        </div>
    )
};