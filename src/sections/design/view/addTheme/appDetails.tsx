'use client';

import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { MuiColorInput } from 'mui-color-input'


const AppDetails = (props: any) => {
    const [primaryColor, setPrimaryColor] = useState<any>('');
    const [logo, setLogo] = useState<any>(null)

    const handleFile = (files: any) => {
        if (files.length > 0) {
            setLogo(files[0])
        }
    }
    const handleNext = () => {
        const { setSteps, setAddData, addData } = props;
        setAddData({ ...addData, logo, primaryColor });
        setSteps(5);
    }
    const handleBack = () => {
        const { steps, setSteps, setAddData, addData } = props;
        setAddData({ ...addData, appName: {} })
        setSteps(steps - 1);
    }


    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                Add a logo & color of your brand
            </Typography>
            <div style={{ width: "50%", margin: "auto", display: 'flex', alignItems: 'center', gap: '12px' }}>
                {logo ? (
                    <Box
                        sx={{
                            width: '140px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            flexDirection: 'column',
                            position: 'relative',
                            border: '2px dashed rgb(134, 136, 163,.5)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            my: 3
                        }}
                    >
                        <Box
                            component="img"
                            borderRadius="5px"
                            src={
                                typeof logo === 'string'
                                    ? logo
                                    : URL.createObjectURL(logo)
                            }
                            alt="subCategory"
                        />
                        <Box
                            onClick={() => setLogo(null)}
                            sx={{
                                backgroundColor: 'rgb(134, 136, 163,.09)',
                                padding: '10px 11px 7px 11px',
                                borderRadius: '36px',
                                cursor: 'pointer',
                                position: 'absolute',
                                top: '0px',
                                right: '0px',
                            }}
                        >
                            <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                        </Box>
                    </Box>
                ) : (
                    <UploadBox
                        onDrop={handleFile}
                        maxFiles={1}
                        maxSize={5242880}
                        accept={{
                            'image/jpeg': [],
                            'image/png': [],
                        }}
                        // onDrop={(e)}
                        placeholder={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    width: '125px',
                                    flexDirection: 'column',
                                }}
                            >
                                <Iconify icon="uil:upload" style={{ color: '#8688A3' }} />
                                <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
                            </Box>
                        }
                        sx={{ flexGrow: 1, height: '125px', width: '125px', py: 2.5, mb: 3 }}
                    />
                )}
                <div>
                    <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                    >
                        Maximum size is 5mb
                    </Typography>
                    <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                    >
                        You can use these extensions PNG or JPG
                    </Typography>
                </div>
            </div>
            <Box sx={{ width: "100%", textAlign: "center" }} >
                {/* <TextField
                    id="outlined-basic"
                    // type='color'
                    sx={{ width: "50%", margin: "auto", }}
                    label="Primary Color"
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    variant="outlined"
                /> */}
                <MuiColorInput sx={{ width: "50%", margin: "auto", }} variant="outlined" value={primaryColor} onChange={(e) => setPrimaryColor(e)} />
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                mt: 5
            }} >
                <Box
                    onClick={handleBack}
                    style={{
                        color: 'black',
                        // width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ArrowForwardIosOutlinedIcon
                        sx={{
                            rotate: "180deg",
                            fontSize: 40,
                            backgroundColor: '#1BFDB7',
                            borderRadius: '50%',
                            padding: '7px',
                            // position: 'fixed',
                            bottom: '20px',
                        }}
                    />
                </Box>

                {primaryColor !== '' && (
                    <Box
                        // href="/test-screens/test-screen-5"
                        onClick={handleNext}
                        style={{
                            color: 'black',
                            // width: '100%',
                            display: primaryColor ? 'flex' : 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ArrowForwardIosOutlinedIcon
                            sx={{
                                fontSize: 40,
                                backgroundColor: '#1BFDB7',
                                borderRadius: '50%',
                                padding: '7px',
                                // position: 'fixed',
                                bottom: '20px',
                            }}
                        />
                    </Box>
                )}
            </Box>
        </div>
    )
}

export default AppDetails