
import React, { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Box, } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface LogoProps {
    themeConfig: {
        logo: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
}

export default function LogoDealer({ themeConfig, handleThemeConfig,  }: LogoProps) {
    const handleImageChange64 = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = () => {
                const base64 = reader.result?.toString().split(',')[1]; // Get the base64 data
                console.log('Base64:', base64); // Log the base64 data
                // setImagePreview(reader.result?.toString() || null);
                handleThemeConfig(key, reader.result?.toString() || "")
            };
    
            reader.readAsDataURL(file); // Read the file as data URL
        } else {
            alert('Please select a valid image file.');
        }
    };

    return (
        <Box mt='20px'>
            <Stack direction='row' alignItems='center' spacing='20px'>

                <Box sx={{
                    width: "80px",
                    height: "80px",
                    outline: "#EBEBF0 dashed 4px",
                    borderRadius: "20px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${themeConfig.logo})`,
                    backgroundSize: '100% 100%',
                }} component="label" >

                    <VisuallyHiddenInput type='file' onChange={handleImageChange64('logo')} />
                    <Iconify icon='bi:image' style={{ color: '#C2C3D1', display: themeConfig.logo ? 'none' : 'block' }} />
                </Box>

                <Box>
                    <Typography component='p' sx={{ fontSize: '13px !important' }} variant='caption' color='#8688A3'>
                        Maximum size is 5mb
                    </Typography>
                    <Typography variant='caption' sx={{ fontSize: '11px !important' }} color='#8688A3'>
                        You can use these extensions <br /> SVG, PNG or JPG
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});