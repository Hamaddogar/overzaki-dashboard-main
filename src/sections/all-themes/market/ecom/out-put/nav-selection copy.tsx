import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { TextField, Typography, Box, RadioGroup, FormControlLabel, Radio, Stack, Tabs, Tab, Slider } from '@mui/material';
import ComponentBlock from 'src/sections/_examples/component-block';
import Iconify from 'src/components/iconify';
import { MuiColorInput } from 'mui-color-input';
import { socketClient } from 'src/sections/all-themes/utils/helper-functions';

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'Layout',
        label: 'Layout',
    },
    {
        value: 'Style',
        label: 'Style',
    },
];
interface NavProps {
    themeConfig: {
        navLogoPosition: string;
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
    builder_Id: any
}

export default function NavDealer({ themeConfig, handleThemeConfig, mobile = false, builder_Id }: NavProps) {

    const [currentTab, setCurrentTab] = useState('Layout');
    const [appBar, setAppBar] = useState<any>({});
    const socket = socketClient();



    const debounce = (func: any, delay: any) => {
        let timeoutId: any;
        return (...args: any) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };


    const handleChangeEvent = debounce((key: string, newValue: any, parentClass: string, subchild: string = "") => {
        let _socketKey = '';
        let valueToShare = '';


        // const pathKeys = key.split('.');
        // let newState = { ...appBar };

        // let currentLevel: any = newState;
        // for (let i = 0; i < pathKeys.length - 1; i++) {
        //     const key = pathKeys[i];
        //     currentLevel[key] = currentLevel[key] ? { ...currentLevel[key] } : {};
        //     currentLevel = currentLevel[key];
        // }
        // // Set the final value at the last key in the path
        // currentLevel[pathKeys[pathKeys.length - 1]] = newValue;

        // console.log("newState", newState);
        // setAppBar(newState);

        // _socketKey = key;
        // valueToShare = newValue;


        const nestedAppbar = appBar?.[parentClass] ?? {};
        setAppBar({ ...appBar, [parentClass]: { ...nestedAppbar, [key]: newValue } });


        _socketKey = parentClass ? parentClass + '.' + (subchild ? subchild + "." : "") + key : key;
        // valueToShare = typeof newValue === 'number' ? `${newValue}px` : newValue;
        valueToShare = newValue;

        const targetHeader = 'appBar.';
        const data = {
            builderId: builder_Id,
            key: targetHeader + _socketKey,
            value: valueToShare,
        };

        console.log(data);


        if (socket) {
            socket.emit('website:cmd', data);
        }


    }, 500);


    const isColorValid = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(color);
    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);
    return (
        <div>

            <Stack spacing={2} sx={{ width: 1 }}>
                <Tabs value={currentTab} onChange={handleChangeTab}>
                    {TABS.map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label} />
                    ))}
                </Tabs>

                {currentTab == "Layout" && (
                    <Box mt='20px'>
                        <Typography variant='caption' color='#8688A3'>
                            Container
                        </Typography>
                        <Stack direction='column' gap={2} alignItems='center' justifyContent='space-between' sx={{
                            width: '100%',
                            minHeight: '61px',
                            border: '4px solid #8688A333',
                            borderRadius: '8px',
                            px: 2,
                            py: 3,
                        }}>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Show</Typography>
                                <RadioGroup row value={appBar?.container?.show || "true"} onChange={(event: any) => handleChangeEvent('show', event?.target?.value, 'container')}>
                                    <FormControlLabel value="true" control={<Radio size="medium" />} label="true" />
                                    <FormControlLabel value="false" control={<Radio size="medium" />} label="false" />
                                </RadioGroup>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Shadow</Typography>
                                <RadioGroup row value={appBar?.container?.isShadow || "true"} onChange={(event: any) => handleChangeEvent('isShadow', event?.target?.value, 'container')}>
                                    <FormControlLabel value={"true"} control={<Radio size="medium" />} label="Show" />
                                    <FormControlLabel value={"false"} control={<Radio size="medium" />} label="Hide" />
                                </RadioGroup>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Background Color</Typography>
                                <Stack direction='row' alignItems='center' spacing='18px'>
                                    <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                        value={appBar?.container?.backgroundColor ?? "#000001"}
                                        format="hex"
                                        onChange={event => isColorValid(event) ? handleChangeEvent('backgroundColor', event, 'container') : null}
                                    />
                                </Stack>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Background Color(Dark)</Typography>
                                <Stack direction='row' alignItems='center' spacing='18px'>
                                    <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                        value={appBar?.container?.backgroundColorDark ?? "#000001"}
                                        format="hex"
                                        onChange={event => isColorValid(event) ? handleChangeEvent('backgroundColorDark', event, 'container') : null}
                                    />
                                </Stack>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Border Bottom Width</Typography>
                                <Stack direction='row' alignItems='center' spacing='18px'>
                                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                        <Slider
                                            value={appBar?.container?.borderBottomWidth || 0}
                                            onChange={(_event: Event, newValue: number | number[]) => {
                                                console.log(newValue);

                                                handleChangeEvent('borderBottomWidth', newValue, 'container')
                                            }
                                            }
                                            valueLabelDisplay="auto"
                                            marks
                                            step={5}
                                            min={0}
                                            max={20}
                                        />
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Border Bottom Color</Typography>
                                <Stack direction='row' alignItems='center' spacing='18px'>
                                    <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                        value={appBar?.container?.borderBottomColor ?? "#000001"}
                                        format="hex"
                                        // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, borderBottomColor: event }) : null}
                                        onChange={event => isColorValid(event) ? handleChangeEvent('borderBottomColor', event, 'container') : null}
                                    />
                                </Stack>
                            </Box>
                            <Box sx={{ width: "100%" }} >
                                <Typography variant='caption' color='#8688A3'>Margin Bottom</Typography>
                                <Stack direction='row' alignItems='center' spacing='18px'>
                                    <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                        <Slider
                                            value={appBar?.container?.marginBottom || 0}
                                            onChange={(_event: Event, newValue: number | number[]) => handleChangeEvent('marginBottom', newValue, 'container', 'containerViewStyle')}
                                            valueLabelDisplay="auto"
                                            marks
                                            min={0}
                                            max={20}
                                        />
                                    </Stack>
                                </Stack>
                            </Box>

                        </Stack>
                    </Box>
                )}

                {currentTab == "Style" && (
                    <Box>
                        <Box mt='20px'>
                            <Typography variant='caption' color='#8688A3'>
                                Text
                            </Typography>
                            <Stack direction='column' gap={2} alignItems='start' justifyContent='space-between' sx={{
                                width: '100%',
                                minHeight: '61px',
                                border: '4px solid #8688A333',
                                borderRadius: '8px',
                                px: 2,
                                py: 3,
                            }}>

                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Size</Typography>
                                    <Stack direction='row' alignItems='start' spacing='18px'>
                                        <Stack direction="row" alignItems="start" spacing={1} width={1}>
                                            <TextField variant='filled'
                                                type='number'
                                                value={appBar?.text?.size ?? ""}
                                                // onChange={event => setAppBar({ ...appBar, width: event.target.value })}
                                                onChange={event => handleChangeEvent('size', event.target.value, 'text')}
                                            />
                                        </Stack>
                                    </Stack>
                                </Box>

                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Is Bold</Typography>
                                    <RadioGroup row value={appBar?.text?.isBold || "true"} onChange={(event: any) => handleChangeEvent('isBold', event?.target?.value, 'text')}>
                                        <FormControlLabel value="true" control={<Radio size="medium" />} label="Show" />
                                        <FormControlLabel value="false" control={<Radio size="medium" />} label="Hide" />
                                    </RadioGroup>
                                </Box>
                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Color</Typography>
                                    <Stack direction='row' alignItems='center' spacing='18px'>
                                        <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                            value={appBar?.text?.color ?? "#000001"}
                                            format="hex"
                                            // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, color: event }) : null}
                                            onChange={event => isColorValid(event) ? handleChangeEvent('color', event, 'text') : null}
                                        />
                                    </Stack>
                                </Box>

                            </Stack>
                        </Box>
                        <Box mt='20px'>
                            <Typography variant='caption' color='#8688A3'>
                                Icons
                            </Typography>
                            <Stack direction='column' gap={2} alignItems='center' justifyContent='space-between' sx={{
                                width: '100%',
                                minHeight: '61px',
                                border: '4px solid #8688A333',
                                borderRadius: '8px',
                                px: 2,
                                py: 3,
                            }}>

                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Has Background</Typography>
                                    <RadioGroup row value={appBar?.icon?.hasBackground || "true"} onChange={(event: any) => handleChangeEvent('hasBackground', event?.target?.value, 'icon')}>
                                        <FormControlLabel value="true" control={<Radio size="medium" />} label="Show" />
                                        <FormControlLabel value="false" control={<Radio size="medium" />} label="Hide" />
                                    </RadioGroup>
                                </Box>
                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Background Color</Typography>
                                    <Stack direction='row' alignItems='center' spacing='18px'>
                                        <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                            value={appBar?.icon?.backgroundColor ?? "#000001"}
                                            format="hex"
                                            // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, backgroundColor: event }) : null}
                                            onChange={event => isColorValid(event) ? handleChangeEvent('backgroundColor', event, 'icon') : null}
                                        />
                                    </Stack>
                                </Box>
                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Color</Typography>
                                    <Stack direction='row' alignItems='center' spacing='18px'>
                                        <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                            value={appBar?.icon?.tintColor ?? "#000001"}
                                            format="hex"
                                            // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, tintColor: event }) : null}
                                            onChange={event => isColorValid(event) ? handleChangeEvent('tintColor', event, 'icon') : null}
                                        />
                                    </Stack>
                                </Box>

                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Shadow</Typography>
                                    <RadioGroup row value={appBar?.icon?.shadow || "true"} onChange={(event: any) => handleChangeEvent('shadow', event?.target?.value, 'icon')}>
                                        <FormControlLabel value={"true"} control={<Radio size="medium" />} label="Show" />
                                        <FormControlLabel value={"false"} control={<Radio size="medium" />} label="Hide" />
                                    </RadioGroup>
                                </Box>

                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Border Radius (%)</Typography>
                                    <Stack direction='row' alignItems='center' spacing='18px'>
                                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                            <Slider
                                                value={appBar?.icon?.borderRaduis || 0}
                                                onChange={(_event: Event, newValue: number | number[]) => handleChangeEvent('borderRaduis', newValue, 'icon')}
                                                valueLabelDisplay="auto"
                                                marks
                                                step={5}
                                                min={0}
                                                max={100}
                                            />
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Box sx={{ width: "100%" }} >
                                    <Typography variant='caption' color='#8688A3'>Border Color</Typography>
                                    <Stack direction='row' alignItems='center' spacing='18px'>
                                        <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                                            value={appBar?.icon?.borderColor ?? "#000001"}
                                            format="hex"
                                            // onChange={event => isColorValid(event) ? setAppBar({ ...appBar, borderColor: event }) : null}
                                            onChange={event => isColorValid(event) ? handleChangeEvent('borderColor', event, 'icon') : null}
                                        />
                                    </Stack>
                                </Box>
                                <Box sx={{ width: "100%", display: 'flex', gap: 2 }} >
                                    <Box>
                                        <Typography variant='caption' color='#8688A3'>Width</Typography>
                                        <Stack direction='row' alignItems='center' spacing='18px'>
                                            <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                                <TextField variant='filled'
                                                    type='number'
                                                    value={appBar?.icon?.width}
                                                    // onChange={event => setAppBar({ ...appBar, width: event.target.value })}
                                                    onChange={event => handleChangeEvent('width', event.target.value, 'icon')}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <Typography variant='caption' color='#8688A3'>Height</Typography>
                                        <Stack direction='row' alignItems='center' spacing='18px'>
                                            <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                                <TextField variant='filled'
                                                    type='number'
                                                    value={appBar?.icon?.height}
                                                    // onChange={event => setAppBar({ ...appBar, height: event.target.value })}
                                                    onChange={event => handleChangeEvent('height', event.target.value, 'icon')}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Box>

                            </Stack>
                        </Box>
                    </Box>
                )}

            </Stack>



            {/* {mobile ? (
                <RadioGroup
                    aria-labelledby="nav-logo-position-group-label"
                    defaultValue="center"
                    name="nav-logo-position-group"
                    onChange={handleNavPosition}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // gap: '20px',
                        mt: '20px',
                    }}
                >
                    <FormControlLabel
                        value="center"
                        control={<Radio size="medium" checked={themeConfig.navLogoPosition === 'center'} />}
                        label={
                            // <Typography variant='caption' color='#0F1349'>Logo Centered</Typography>
                            <Box component="img" src="/raws/nav1.svg" sx={{ p: 0, width: '100%' }} />
                        }
                    />
                    <FormControlLabel
                        value="flex-start"
                        control={<Radio size="medium" checked={themeConfig.navLogoPosition === 'flex-start'} />}
                        label={
                            // <Typography variant='caption' color='#0F1349'>Logo Left</Typography>
                            <Box component="img" src="/raws/nav2.svg" sx={{ p: 0, width: '100%' }} />
                        }
                    />
                </RadioGroup>
            ) : (
                <Box pt="20px">
                    <Typography variant="caption" component="p" color="#8688A3">
                        Sort
                    </Typography>
                    <TextField variant='filled' defaultValue={1} />

                    <RadioGroup
                        aria-labelledby="nav-logo-position-group-label"
                        defaultValue="center"
                        name="nav-logo-position-group"
                        onChange={handleNavPosition}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // gap: '20px',
                            mt: '20px',
                        }}
                    >
                        <FormControlLabel
                            value="center"
                            control={<Radio size="medium" checked={themeConfig.navLogoPosition === 'center'} />}
                            label={
                                <Typography variant="caption" color="#0F1349">
                                    Logo Centered
                                </Typography>
                            }
                        />
                        <Box component="img" src="/raws/nav1.svg" sx={{ p: 0, width: '100%' }} />

                        <FormControlLabel
                            value="left"
                            control={<Radio size="medium" checked={themeConfig.navLogoPosition === 'left'} />}
                            label={
                                <Typography variant="caption" color="#0F1349">
                                    Logo Left
                                </Typography>
                            }
                        />
                        <Box component="img" src="/raws/nav2.svg" sx={{ p: 0, width: '100%' }} />
                    </RadioGroup>
                </Box>
            )} */}
        </div>
    );
}
