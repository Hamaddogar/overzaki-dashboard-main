
import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

interface HeaderSectionProps {
    children?: React.ReactNode,
    name: string,
    description?: string,
    closer?: any,
    cancel: {
        key: string,
        value: string | number
    },
    handleCancelBtn?: any,
    handleThemeConfig: (key: string, value: any, parentClass?: any) => void; // Adjust 'value' type as needed
}


export default function HeaderSection({ children, name, description, cancel, closer, handleThemeConfig, handleCancelBtn }: HeaderSectionProps) {
    const handleNoAction = () => { };
    const handleCancle = () => {
        handleCancelBtn();
        if (cancel.key === 'colors') {
            // handleThemeConfig('primaryColor', '#0D6EFD');
            // handleThemeConfig('secondaryColor', '#8688A3');
            handleThemeConfig('primaryColor', '', 'css');
            handleThemeConfig('secondaryColor', '', 'css');
        } else handleThemeConfig(cancel.key, cancel.value)
    };
    return (
        <Stack direction='row' justifyContent='space-between' mb='20px'>
            <Box>
                <Typography variant='h6'>{name}</Typography>
                {children && children}
                <Typography variant='caption'>{description}</Typography>
            </Box>
            <Stack direction='row' spacing='15px'>
                <Iconify icon='iconamoon:close-bold' style={{ cursor: 'pointer' }} onClick={handleCancle} />
                <Iconify icon='charm:tick' style={{ cursor: 'pointer' }} onClick={closer || handleNoAction} />
            </Stack>
        </Stack>
    )
};