/* eslint-disable react/destructuring-assignment */

'use client';

import { Box, Switch, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Linker from 'src/sections/overview/subscription-plan/link';
import { paths } from 'src/routes/paths';

const AppLang = (props: any) => {
    const [languages, setLanguages] = useState<any>({
        eng: false,
        ar: false,
    });
    // const [arDefault, setArDefault] = useState('set as default');
    const [enDefault, setEnDefault] = useState('eng');

    const handleNext = () => {
        const { setSteps, setAddData, addData } = props;
        setAddData({ ...addData, appLanguage: { en: languages?.eng, ar: languages?.ar } });
        setSteps(6);
    }
    const handleBack = () => {
        const { steps, setSteps, setAddData, addData } = props;
        setAddData({ ...addData, appLanguage: { en: false, ar: false } })
        setSteps(steps - 1);
    }

    return (
        <div style={{ width: '50%', margin: '40px auto' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                Select Website Language
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',

                        alignItems: 'center',
                    }}
                >
                    <Switch
                        color="primary"
                        checked={languages.eng}
                        onChange={() => setLanguages((prev: any) => ({ ...prev, eng: !prev.eng }))}
                    />
                    <Typography variant="button" sx={{ fontWeight: 900 }}>
                        English
                    </Typography>
                </div>
                <Box onClick={() => setEnDefault('eng')} sx={{ cursor: "pointer" }} >
                    {enDefault === 'eng' ? 'Default' : 'Set as Default'}
                </Box>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',

                        alignItems: 'center',
                    }}
                >
                    <Switch
                        onChange={() => setLanguages((prev: any) => ({ ...prev, ar: !prev.ar }))}
                        checked={languages.ar}
                        color="primary"
                    />
                    <Typography variant="button" sx={{ fontWeight: 900 }}>
                        Arabic
                    </Typography>
                </div>
                <Box onClick={() => setEnDefault('ar')} sx={{ cursor: "pointer" }} >
                    {enDefault === 'ar' ? 'Default' : 'Set as Default'}
                </Box>
            </div>
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
                        width: '100%',
                        display: 'flex',
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

                {(languages.en === true || languages.ar === true) && (
                    <Linker
                        // href="/test-screen-5"
                        // onClick={handleNext}
                        path={paths.dashboard.design.themes(props?.addData.BusinessType.toLowerCase())}
                        sx={{
                            color: 'black',
                            width: '100%',
                            display: (languages.en || languages.ar) ? 'flex' : 'none',
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
                    </Linker>
                )}
            </Box>
        </div>
    )
}

export default AppLang