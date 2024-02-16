import { Box, Card, Divider, FormControlLabel, Radio, RadioGroup, Slider, Stack, TextField, Typography } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import React, { useEffect, useState } from 'react'
import Iconify from 'src/components/iconify'

const AddSectionComponent = ({ onClose, onClick }: any) => {

    const [appBar, setAppBar] = useState<any>({});

    const isColorValid = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(color);


    useEffect(() => {

        console.log(appBar);

    }, [appBar])


    const handleChangeEvent = (target: string, event: any, parent: string) => {
        const nestedAppbar: any = appBar?.[parent] ?? {};
        setAppBar({ ...appBar, [parent]: { ...nestedAppbar, [target]: event } })
    }



    return (
        <div>
            <Card sx={{ borderRadius: '0px', p: '20px', height: '100%', boxShadow: '0px -6px 40px #00000014' }}>

                <Stack direction='row' justifyContent='space-between'>
                    <Box>
                        <Typography variant='h6'>Add New Section</Typography>
                        <Typography variant='caption' color='#8688A3'>
                            Select where you want to add this section.
                        </Typography>
                    </Box>
                    <Iconify width={25} icon='iconamoon:close-bold' style={{ cursor: 'pointer' }}
                        onClick={onClose}
                    />
                </Stack>
                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '10px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                    }} >
                        <Typography variant='button' color='#8688A3'>App Bar</Typography>
                    </Stack>
                </Divider>

                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Top Bar
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '58px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                        cursor: "pointer",
                        overflow: "hidden"

                    }} onClick={() => onClick("Top Bar")} >
                        <Box component='img' src='/raws/topBar.png' sx={{ borderRadius: '8px', width: '80%', m: 'auto' }} />
                    </Stack>
                </Box>
                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        App Bar
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '110px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                        cursor: "pointer"
                    }} onClick={() => onClick("App Bar")} >
                        <Box component='img' src='/raws/nav2.svg' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>
                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Slider</Typography>
                    </Stack>
                </Divider>

                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Slider
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '258px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                        cursor: "pointer",
                        overflow: "hidden"

                    }} onClick={() => onClick("Header")} >
                        <Box component='img' src='/raws/slider.png' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>


                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Categories</Typography>
                    </Stack>
                </Divider>
                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Categories section (2)
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '178px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                    }}
                        onClick={() => onClick("CategoriesLayout")}
                    >

                        <Box component='img' src='/raws/categories.png' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>
                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Video Section</Typography>
                    </Stack>
                </Divider>
                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Video section (2)
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        // height: '178px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                    }}
                        onClick={() => onClick("video")}
                    >

                        <Box component='img' src='/raws/video.png' sx={{ borderRadius: '8px', width: '80%', height: "auto", m: "auto" }} />
                    </Stack>
                </Box>
                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Banners</Typography>
                    </Stack>
                </Divider>
                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Banner
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '150px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                        cursor: "pointer",
                        overflow: "hidden"

                    }} onClick={() => onClick("Banner")} >
                        <Box component='img' src='/raws/banner2.png' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>


                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Products</Typography>
                    </Stack>
                </Divider>

                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Products Section
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        // height: '178px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                    }} onClick={() => onClick("Products")} >
                        <Box component='img' src='/raws/products.png' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>
                <Divider sx={{
                    borderWidth: '2px', borderColor: '#F5F5F8', my: '20px',
                    '& .MuiDivider-wrapper': {
                        padding: 0
                    }
                }}>
                    <Stack direction='row' alignItems='center' spacing='8px' justifyContent='center' sx={{
                        width: "120px",
                        height: "36px",
                        background: "#F5F5F8",
                        borderRadius: "20px",
                        cursor: 'pointer'
                    }} >
                        <Iconify icon='mingcute:add-fill' style={{ color: '#8688A3' }} />
                        <Typography variant='button' color='#8688A3'>Footer</Typography>
                    </Stack>
                </Divider>

                <Box mt='20px'>
                    <Typography variant='caption' color='#8688A3'>
                        Footer Section
                    </Typography>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
                        width: '100%',
                        height: '128px',
                        border: '4px solid #8688A333',
                        borderRadius: '8px',
                    }} onClick={() => onClick("Footer")} >
                        <Box component='img' src='/raws/footer.png' sx={{ borderRadius: '8px', width: '80%', m: "auto" }} />
                    </Stack>
                </Box>


            </Card>
        </div>
    )
}

export default AddSectionComponent