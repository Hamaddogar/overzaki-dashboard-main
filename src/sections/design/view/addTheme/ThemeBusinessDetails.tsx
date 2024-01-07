/* eslint-disable no-nested-ternary */

'use client';

import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Link from 'next/link';


const data = [
    {
        icon: 'ant-design:shopping-outlined',
        title: 'Market',
    },
    {
        icon: 'mdi:food-outline',
        title: 'Restaurant',
    },
    {
        icon: 'material-symbols:food-bank-outline',
        title: 'Groceries',
    },
    {
        icon: 'game-icons:flowers',
        title: 'Flowers',
    },
    {
        icon: 'material-symbols:health-and-beauty-outline',
        title: 'Beauty',
    },
    {
        icon: 'fluent-mdl2:shirt',
        title: 'Fashion',
    },
    {
        icon: 'fe:mobile',
        title: 'Electronics',
    },
    {
        icon: 'material-symbols:home-outline',
        title: 'Home',
    },
    {
        icon: 'fluent-mdl2:health',
        title: 'Health',
    },
    {
        icon: 'bi:book',
        title: 'Library',
    },
    {
        icon: 'octicon:gift-24',
        title: 'Gifts',
    },
    {
        icon: 'mdi:art',
        title: 'Art',
    },
    {
        icon: 'ri:football-fill',
        title: 'Sports',
    },
    {
        icon: 'map:furniture-store',
        title: 'Furniture',
    },
    {
        icon: 'material-symbols-light:toys-outline',
        title: 'Toys',
    },
    {
        icon: 'akar-icons:glasses',
        title: 'Optics',
    },
    {
        icon: 'ph:car',
        title: 'Cars',
    },
];

const ThemeBusinessDetails = (props: any) => {

    const [names, setNames] = useState<any>({ engName: '', arName: '' });

    const handleNext = () => {
        const { setSteps, setAddData, addData } = props;
        setAddData({ ...addData, appName: { en: names.engName, ar: names.arName } });
        setSteps(4);
    }
    const handleBack = () => {
        const { steps, setSteps, setAddData, addData } = props;
        setAddData({ ...addData, appName: {} })
        setSteps(steps - 1);
    }
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                What is the name of your business?
            </Typography>
            <div
                style={{
                    width: '50%',
                    margin: "auto",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    component="p"
                    noWrap
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem' }}
                >
                    English Name
                </Typography>

                <TextField
                    name="engName"
                    onChange={(e) => setNames((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={{ width: '100%' }}
                />
            </div>
            <div
                style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'start',
                    justifyContent: 'start',
                }}
            >
                <Typography
                    component="p"
                    noWrap
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem' }}
                >
                    Arabic Name (Optional)
                </Typography>

                <TextField
                    onChange={(e) => setNames((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))}
                    name="arName"
                    sx={{ width: '100%' }}
                />
            </div>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"
            }} >
                <Box
                    onClick={handleBack}
                    style={{
                        color: 'black',
                        width: '100%',
                        display: names?.engName ? 'flex' : 'none',
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
                            bottom: '20px',
                        }}
                    />
                </Box>
                {names?.engName !== '' && (
                    <Box
                        // href="/test-screens/test-screen-4"
                        onClick={handleNext}
                        style={{
                            color: 'black',
                            width: '100%',
                            display: names?.engName ? 'flex' : 'none',
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

export default ThemeBusinessDetails