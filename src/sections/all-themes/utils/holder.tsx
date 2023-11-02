
/* eslint-disable no-nested-ternary */

'use client';

// import React, { ReactNode } from 'react';
// @mui
import Box from '@mui/material/Box';
// ----------------------------------------------------------------------

interface DeviceFrameProps {
    deviceView?: string;
    URL: string;
}
// ----------------------------------------------------------------------


export default function DeviceFrame({ deviceView, URL }: DeviceFrameProps) {
    // const scaleFactor = 0.2472; // Adjust the scale factor as needed
    const scaleFactor = 0.3; // Adjust the scale factor as needed


    const iframeStyle = {
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top left',
        width: `${1 / scaleFactor * 100}%`,  // Adjust the width based on the scale factor
        height: `${1 / scaleFactor * 100}%`, // Adjust the height based on the scale factor
        border: 'none',
        boxShadow: 'none',
        outline: 'none'
    };



    return (
        <Box sx={{ transition: 'all .6s', overflow: 'hidden' }} >
            <Box
                sx={
                    deviceView === "mobile" ? { ...styMobile, ...others } :
                        deviceView === "tablet" ? { ...styTablet, ...others } : { ...styLaptop, ...others }
                } className='cursor-config' >
                <iframe title="shop" src={URL} style={iframeStyle} />
            </Box>
        </Box>
    )
}



const styMobile = {
    maxWidth: "225px",
    height: '457px',
    padding: '40px 15px 30px 15px',
    backgroundImage: 'url(/assets/apple-iphone-14-pro-max.png)',
    backgroundSize: 'contain',

}
const styTablet = {
    maxWidth: "400px",
    height: '300px',
    padding: '25px 40px',
    backgroundImage: 'url(/assets/iPad-mini-tablet.png)',
    backgroundSize: '100% 100%',

}
const styLaptop = {
    // maxWidth: 'calc(100% - 60px)',
    maxWidth: '550px',
    height: '400px',
    padding: { xs: '25px 70px 60px 70px', xl: '25px 75px 60px 75px' },
    backgroundImage: 'url(/assets/macbook-pro.png)',
    backgroundSize: '100% 100%',
}

const others = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'all .6s',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}