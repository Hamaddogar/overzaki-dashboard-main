'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
import ReduxProvider from "../../redux/reduxProvider";
import { Typography } from '@mui/material';
// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <ReduxProvider>
            <AuthGuard>
                <Typography variant="h3" sx={{ textAlign: 'center', padding: { xs: '5px', sm: '13px' } }}>
                    Hello User 👋
                </Typography>
                <div
                    style={{
                        marginTop: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img alt="" src="/Face.png" />
                    </div>
                    <img alt="" src="/Voice.png" />
                    {children}
                </div>
            </AuthGuard>
        </ReduxProvider>
    );
}
