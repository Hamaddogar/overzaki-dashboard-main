import { ReactNode } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
// components
import Scrollbar from 'src/components/scrollbar';
//

// ----------------------------------------------------------------------

type Props = DrawerProps & {
    title?: string;
    children: ReactNode;
    onClose?: (event: React.SyntheticEvent | React.KeyboardEvent) => void;
    actions?: ReactNode;
    details?: any;
};

export default function PaymentsNavBar({ details, open, onClose, title, children, actions, ...other }: Props) {


    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            slotProps={{ backdrop: { invisible: true } }}
            PaperProps={{ sx: { width: { xs: '100%', md: "380px" } } }}
            {...other}
        >
            <Scrollbar sx={{ height: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
                    <Typography variant="h6"> {title} </Typography>
                    <Box component='img' src='/raw/X-white.svg' sx={{ opacity: .7, '&:hover': { opacity: 1 }, cursor: 'pointer' }} onClick={onClose} />
                </Stack>
                <Stack sx={{ p: 2.5 }} spacing='20px' alignItems='center' justifyContent='space-between'>
                    {children}
                </Stack>
            </Scrollbar>
            <Box sx={{ p: 2.5 }}>
                {actions}
            </Box>
        </Drawer>
    );
}
