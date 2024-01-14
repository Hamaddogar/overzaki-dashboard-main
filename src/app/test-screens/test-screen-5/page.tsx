'use client';

import { Box, Switch, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const page = () => {
  const [languages, setLanguages] = useState<any>({
    eng: false,
    ar: false,
  });
  const [arDefault, setArDefault] = useState<string>('set as default');
  const [enDefault, setEnDefault] = useState<string>('default');
  const handleDefault = () => {
    if (arDefault === 'set as default') {
      setArDefault('default');
      setEnDefault('set as default');
    } else {
      setArDefault('set as default');
      setEnDefault('default');
    }
  };
  return (
    <div style={{ width: '40%' }}>
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
        <Box onClick={handleDefault}>{enDefault}</Box>
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
        <Box onClick={handleDefault}>{arDefault}</Box>
      </div>
      {languages.en == true ||
        (languages.ar == true && (
          <Link
            href="/test-screen-5"
            style={{
              color: 'black',
              width: '100%',
              display: languages.en || languages.ar ? 'flex' : 'none',
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
                position: 'fixed',
                bottom: '20px',
              }}
            />
          </Link>
        ))}
    </div>
  );
};

export default page;
