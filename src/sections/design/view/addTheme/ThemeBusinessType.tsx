/* eslint-disable no-nested-ternary */

'use client';

// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useEffect, useState } from 'react';
// components
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import ThemesViewRoot from 'src/sections/all-themes/view/themes-view';


export const data = [
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

const ThemeBusinessType = ({ steps, setSteps, setAddData, addData }: any) => {

    const [selectedItem, setSelectedItem] = useState<string>("");
    const [selectedTheme, setSelectedTheme] = useState<string>("")

    useEffect(() => {
        setSelectedTheme("");
    }, [selectedItem])


    const handleNext = () => {
        setAddData({ ...addData, BusinessType: selectedItem, theme: selectedTheme })
        setSteps(3);
    }
    const handleBack = () => {
        setAddData({ ...addData, BusinessType: "" })
        setSteps(steps - 1);
    }
    const resetTheme = () => {
        setSelectedItem("");
    }

    const handleSelectTheme = (e: any) => {
        setSelectedTheme(e);
        setAddData({ ...addData, theme: e });
        setSteps(3);
    }

    return (
        <>

            {!selectedItem ? (
                <Box sx={{ transition: 'all .5', paddingBottom: '30px' }}>
                    <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                        What is the type of your business?
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                        Select your story type
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
                                display: selectedItem ? 'flex' : 'none',
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
                        {selectedItem !== '' && selectedTheme !== "" && (
                            <Box
                                onClick={handleNext}
                                style={{
                                    color: 'black',
                                    width: '100%',
                                    display: selectedItem ? 'flex' : 'none',
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

                </Box>

            ) : (
                <Box>
                    <ThemesViewRoot theme_type={selectedItem} onSelectTheme={handleSelectTheme} />
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px"
                    }} >


                        <Box
                            onClick={resetTheme}
                            style={{
                                color: 'black',
                                width: '100%',
                                display: selectedItem ? 'flex' : 'none',
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
                        {selectedItem !== '' && selectedTheme !== "" && (
                            <Box
                                onClick={handleNext}
                                style={{
                                    color: 'black',
                                    width: '100%',
                                    display: selectedItem ? 'flex' : 'none',
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
                </Box>
            )}

        </>
    )
}

export default ThemeBusinessType