
import React, { ChangeEvent, useState } from 'react';
import { TextField, Typography, Box, Stack, Switch, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Iconify from 'src/components/iconify';
import { VisuallyHiddenInput } from './logo-part';
import './style.css'


// ----------------------------------------------------------------------

interface BannerProps {
    themeConfig: {
        bannerShow: boolean;
        bannerImages: Array<string>
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function BannerDealer({ themeConfig, handleThemeConfig, mobile = false }: BannerProps) {
    const [banner, setBanner] = useState<any>({})

    const handleActionsBanner = (action: string, location: number, arrayData: any) => (event: any) => {
        switch (action) {
            case 'delete':
                arrayData.splice(1, location);
                handleThemeConfig('bannerImages', arrayData)
                break;

            default:
                break;
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('bannerShow', event.target.checked);


    const handleNewBanner = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                handleThemeConfig(key, [...themeConfig.bannerImages, reader.result?.toString()])
            };

            reader.readAsDataURL(file); // Read the file as data URL
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleChangeEvent = (key: string, value: any, parent: any) => {

    }
    return (
        <Box pt='20px'>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Banners Section</Typography>
                <Switch
                    checked={themeConfig.bannerShow}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>

            <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />

            <Box sx={{ width: "100%" }} >
                <Typography variant='caption' color='#8688A3'>Banner Type</Typography>
                <RadioGroup row value={banner?.search?.status || "true"} onChange={(event: any) => handleChangeEvent('status', event?.target?.value, 'search')}>
                    <FormControlLabel value="slider" control={<Radio size="medium" />} label="Slider" />
                    <FormControlLabel value="image" control={<Radio size="medium" />} label="Image" />
                    <FormControlLabel value="video" control={<Radio size="medium" />} label="Video" />
                </RadioGroup>
            </Box>



            {/* <Typography variant='caption' component='p' color='#8688A3'>Sort</Typography>
            <TextField variant='filled' defaultValue={2} /> */}

            {themeConfig.bannerImages.map((img, index, self) => <Box key={index} sx={{
                width: "100%",
                height: "120px",
                borderRadius: "12px",
                position: 'relative',
                mt: '20px',
                backgroundImage: `url(${img})`,
                backgroundSize: 'contain 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                '&:hover .actions': {
                    transition: 'all .5s',
                    visibility: 'visible',
                    opacity: 1
                }
            }}>

                <Stack justifyContent='flex-end' px='10px' maxWidth='300px' direction='row' alignItems='center' spacing='15px' className='actions' sx={{ visibility: 'hidden', opacity: 0, background: 'transparent', position: 'absolute', top: '11px', right: 0, height: '35px', }}>
                    <Iconify icon='gg:link' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} />
                    <Iconify icon='mdi:edit' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} />
                    <Iconify onClick={handleActionsBanner('delete', index, self)} icon='ic:round-delete' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} />
                </Stack>
            </Box>)
            }


            <Box sx={{
                width: "100%",
                height: "120px",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "4px dashed #EBEBF0",
                borderRadius: "12px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mt: '20px'
            }} component="label">
                <VisuallyHiddenInput type='file' onChange={handleNewBanner('bannerImages')} />
                <Iconify icon='ic:round-add' style={{ color: '#B2B3C5' }} />
                <Typography variant='caption' component='p' color='#8688A3'>Add New Banner</Typography>

            </Box>

        </Box>
    )
};