
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

// interface 
type Props = {
    children?: React.ReactNode;
    elevation?: number;
};

export default function BottomActions({ children, elevation = 3 }: Props) {
    const theme = useTheme();

    const smUp = useResponsive('up', 'sm');

    return (smUp ?
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end'
        }}>
            {children}
        </Box>
        :
        <Box>
            <Paper sx={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1,
                background: theme.palette.mode === "dark" ? "#212B36" : "#FFFFFF",

            }} elevation={3}>
                <BottomNavigation sx={{ p: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                    {children}
                </BottomNavigation>
            </Paper>
        </Box >
    )
}
