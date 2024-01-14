'use client';

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import { Icon } from '@iconify/react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import Link from 'next/link';
import { Button } from '@mui/base';


export default function AddTheme(props: any) {

    console.log("weas");


    const [selectedItem, setSelectedItem] = useState<string>('');
    const data = [
        {
            icon: 'ic:baseline-laptop',
            title: 'Website',
        },
        {
            icon: 'clarity:mobile-solid',
            title: 'Apps',
        },
        {
            icon: 'gridicons:speaker',
            title: 'Marketing',
        },
        {
            icon: 'lets-icons:paper-fill',
            title: 'Invoices',
        },
    ];
    const handleNext = () => {
        const { setSteps, setAddData, addData } = props;

        setAddData({ ...addData, type: selectedItem })
        setSteps(2);
    }
    return (
        <>
            <Box sx={{ height: '100%', transition: 'all .5', paddingBottom: '30px', width: '100%' }}>
                <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                    What do you want me to do?
                </Typography>

                <Grid container spacing={2} mt={2} px={2}>
                    {data.map((item, indx) => (
                        <Grid onClick={() => setSelectedItem(item.title)} item key={indx} xs={6} sm={4} md={3}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '120px',
                                    backgroundColor:
                                        selectedItem === item.title ? 'rgb(27, 252, 182)' : 'rgb(134, 136, 163,.09)',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    flexDirection: 'column',
                                    transition: 'all .5s',
                                    cursor: { xs: 'default', sm: 'pointer' },
                                }}
                            >
                                <Icon width={24} icon={item.icon} />
                                <Typography
                                    component="h5"
                                    variant="subtitle2"
                                    sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }}
                                >
                                    {item.title}{' '}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {selectedItem !== '' && (
                <Box
                    onClick={handleNext}
                    // href="/test-screens/test-screen-2"
                    style={{
                        color: 'black',
                        width: '100%',
                        display: selectedItem !== '' ? 'flex' : 'none',
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
                            position: 'fixed',
                            bottom: '20px',
                        }}
                    />
                </Box>
            )}
        </>
    )
}