'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import '../../../globals.css';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN, PATH_AFTER_REGISTER } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/system';
import Image from 'next/image';
import { setCookie } from 'src/auth/context/jwt/utils';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register, sendOtp } = useAuthContext();
  const [captcha, setCaptcha] = useState<any>();
  const [captchaError, setCaptchaError] = useState<string>();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Code must be at least 8 characters'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    // if (captcha) {
    if (true) {
      try {
        // need to change this
        // await register?.(data.email, data.password, data.firstName, data.lastName);

        const result: any = await sendOtp?.(data.email);
        if (result) {
          const { success } = result;
          // eslint-disable-next-line no-empty
          if (success) {
            setCookie(
              'register_user_data',
              JSON.stringify({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
              }), 7
            );
            router.push(PATH_AFTER_REGISTER);
          }
        }

        // router.push(returnTo || PATH_AFTER_LOGIN);
      } catch (error) {
        console.error(error);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    } else {
      setCaptchaError("Please verify that you're a human");
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Typography sx={{ color: '#0F1546' }} variant="h4">
          Sign Up
        </Typography>
        <Image alt="" width={30} height={30} src="/raw/smile.png" />
      </Box>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
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
              outline: 'none',
            }}
            variant="filled"
            name="firstName"
            placeholder="First name"
          />
          <RHFTextField
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
            name="lastName"
            variant="filled"
            placeholder="Last name"
          />
        </Stack>

        <RHFTextField
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
            outline: 'none',
          }}
          variant="filled"
          name="email"
          placeholder="Email address"
        />

        <RHFTextField
          sx={{
            '& > :not(style)': { color: 'black', backgroundColor: 'transparent' },
            '& input': {
              backgroundColor: 'white',
              borderRadius: '9999px',
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
          variant="filled"
          name="password"
          placeholder="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* ReCaptcha */}
        <Box sx={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }}>
          <ReCAPTCHA
            className="recaptcha"
            style={{ width: '100%', padding: '9px' }}
            onChange={setCaptcha}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          />
        </Box>
        {captchaError && (
          <Typography sx={{ fontSize: '14px', color: 'red' }}>{captchaError}</Typography>
        )}

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
          Sign Up
        </button>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
