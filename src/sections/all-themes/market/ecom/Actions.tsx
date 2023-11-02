
import './mobile.css';
import React, { ReactNode } from 'react'
import Box from '@mui/material/Box';
import { Container } from '@mui/material';



// ----------------------------------------------------------------------

interface ActionsProps {
    children?: ReactNode,
    condition?: any
    // payment_method: EventTarget & (Element | HTMLElement) | null;
    // order_value: any; // Replace 'any' with the appropriate type
    // payment_value: any; // Replace 'any' with the appropriate type
    // analytics: EventTarget & (Element | HTMLElement) | null;
}








export default function Actions({ children, condition }: ActionsProps) {

    return (
        <div>
            <Box className={`actions ${condition ? 'show' : 'hide'}`}>
                <Container sx={{ py: '20px' }}>
                    {children}
                </Container>
            </Box>
        </div>
    )
}
