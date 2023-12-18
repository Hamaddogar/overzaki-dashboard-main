'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box } from '@mui/material';
import Image from 'next/image';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .min(8, 'Code must be at least 8 characters')
      .required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Typography sx={{ color: '#0F1546' }} variant="h4">
          Login
        </Typography>
        <Image alt="" width={30} height={30} src="/raw/smile.png" />
      </Box>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        variant="filled"
        name="email"
        sx={{
          '& > :not(style)': { color: 'black' },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
            borderRadius: '9999px',
          },
          '& input': {
            backgroundColor: 'white',
            borderRadius: '9999px',
          },
          backgroundColor: 'transparent',
          borderRadius: '9999px',
        }}
        placeholder="Email address"
      />
      <RHFTextField
        sx={{
          '& > :not(style)': { color: 'black', backgroundColor: 'transparent' },
          '& input': {
            backgroundColor: 'white',
            borderRadius: '9999px',
          },
          '& input::hover': {
            backgroundColor: 'white',
          },
          '& input::focused': {
            backgroundColor: 'white',
          },
          '& .MuiInputBase-root': {
            backgroundColor: 'white',
            // Set the background color for the side icons
            borderRadius: '9999px',
          },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
            borderRadius: '9999px',
          },

          borderRadius: '9999px',
        }}
        name="password"
        placeholder="Password"
        variant="filled"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ backgroundColor: 'white' }} position="end">
              <IconButton sx={{ backgroundColor: 'white' }} onClick={password.onToggle} edge="end">
                <Iconify
                  sx={{ backgroundColor: 'white' }}
                  icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={RouterLink}
          href={paths.auth.jwt.forgotPassword}
          variant="body2"
          color="inherit"
          underline="always"
          sx={{ color: '#101746' }}
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          style={{
            cursor: 'pointer',
            border: '2px solid #101746',
            padding: '16px',
            borderRadius: '300px',
            background: 'transparent',
            fontSize: '17px',
            width: '50%',
          }}
          disabled={isSubmitting}
        >
          Login
        </button>
      </Box>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
