import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => (
  <div
    style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#1BFDB7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <img alt="" style={{ width: '40%' }} src="/Confetti.svg" />
    <Image width={120} height={120} alt="" src="/happy.svg" />
    <Typography
      variant="h5"
      sx={{ textAlign: 'center', color: '#0F1349', padding: { xs: '5px', sm: '13px' } }}
    >
      Great Job! You are done now.
    </Typography>
    <p style={{ color: '#0F1349' }}>
      It is a long established fact that reader will be distracted.
    </p>
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8px',
        paddingRight: '8px',
        gap: '8px',
      }}
    >
      <Image alt="" width={30} height={40} src="/sparkle.svg" />
      <p style={{ color: '#0F1349', fontWeight: 700 }}>You have 7 days Free on the Trial Plan</p>
    </Box>
    <Link
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textDecoration: 'none',
      }}
      href="/dashboard"
    >
      <Button sx={{ backgroundColor: '#0F1349', width: '20%', marginTop: '12px' }}>Continue</Button>
    </Link>
  </div>
);

export default page;
