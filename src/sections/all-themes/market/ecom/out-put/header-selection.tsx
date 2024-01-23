
import React, { ChangeEvent } from 'react';
import { TextField, Typography, Box, Stack, Switch, Divider } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useDebounce } from 'src/hooks/use-debounce';
import { VisuallyHiddenInput } from './logo-part';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { saveHeaderImage } from 'src/redux/store/thunks/builder';


// ----------------------------------------------------------------------

interface HeaderProps {
    themeConfig: {
        headerShow: boolean;
        headerImages: string;
        headerTitle: string;
        // Add other themeConfig properties as needed
    };
    builderId: string;
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

export default function HeaderDealer({ themeConfig, handleThemeConfig, mobile = false, builderId }: HeaderProps) {
    // debounce
    const dispatch = useDispatch<AppDispatch>();

    const [inputValue, setInputValue] = React.useState(themeConfig.headerTitle);
    const debouncedInputValue = useDebounce(inputValue, 500); // Debounce the input value with a 500ms delay


    React.useEffect(() => {
        handleThemeConfig('headerTitle', debouncedInputValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInputValue])


    const handleActionsHeader = (action: string) => (event: any) => {
        switch (action) {
            case 'delete':
                handleThemeConfig('headerImages', '');
                saveTempData(null)
                break;

            case 'title':
                setInputValue(event.target.value);
                break;

            default:
                break;
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => handleThemeConfig('headerShow', event.target.checked);


    const handleNewHeader = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                handleThemeConfig(key, reader.result?.toString());

                saveTempData(file);
            };

            reader.readAsDataURL(file); // Read the file as data URL
        } else {
            alert('Please select a valid image file.');
        }
    };

    const saveTempData = (file: any) => {
        const formDataToSend = new FormData();
        formDataToSend.append('image', file);

        dispatch(saveHeaderImage({ builderId: builderId, data: formDataToSend })).then((response: any) => {
            console.log("response", response);
        });
    }

    return (
        <Box pt='20px'>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='caption' sx={{ fontWeight: 900 }}>Show Header Section</Typography>
                <Switch
                    checked={themeConfig.headerShow}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>

            <Divider sx={{ borderWidth: '1px', borderColor: '#EBEBEB', my: '20px' }} />

            <Typography variant='caption' component='p' color='#8688A3'>Sort</Typography>
            <TextField variant='filled' defaultValue={3} />

            {themeConfig.headerImages ?
                <Box>
                    <Box sx={{
                        width: "100%",
                        minHeight: "220px",
                        borderRadius: "12px",
                        position: 'relative',
                        mt: '20px',
                        backgroundImage: `url(${themeConfig.headerImages})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        // backgroundPosition: 'bottom center',
                        '&:hover .actions': {
                            transition: 'all .5s',
                            visibility: 'visible',
                            opacity: 1
                        }
                    }}>

                        <Stack justifyContent='flex-end' px='10px' maxWidth='300px' direction='row' alignItems='center' spacing='15px' className='actions' sx={{ boxShadow: 'none', visibility: 'hidden', opacity: 0, background: 'transparent', position: 'absolute', top: '11px', right: 0, height: '35px', }}>
                            {/* <Iconify icon='gg:link' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} /> */}
                            {/* <Iconify icon='mdi:edit' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} /> */}
                            <Iconify onClick={handleActionsHeader('delete')} icon='ic:round-delete' style={{ color: '#B2B3C5', boxShadow: '0 0 0 4px #FFFFFF', cursor: 'pointer', background: '#FFFFFF', borderRadius: '15px' }} />
                        </Stack>
                    </Box>

                    <Typography mt='30px' mb='10px' variant='caption' component='p' color='#8688A3'>Header Slogan</Typography>
                    <TextField variant='filled' value={inputValue} fullWidth onChange={handleActionsHeader('title')} />
                </Box>
                :
                <Box sx={{
                    width: "100%",
                    height: "220px",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    border: "4px dashed #EBEBF0",
                    borderRadius: "12px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    mt: '20px'
                }} component="label">
                    <VisuallyHiddenInput type='file' onChange={handleNewHeader('headerImages')} />
                    <Iconify icon='ic:round-add' style={{ color: '#B2B3C5' }} />
                    <Typography variant='caption' component='p' color='#8688A3'>Add Header Banner</Typography>
                </Box>
            }
        </Box>
    )
};