'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// assets
import { EmailInboxIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { clearCookie, getCookie } from 'src/auth/context/jwt/utils';
// ----------------------------------------------------------------------

export default function JwtVerifyView() {
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const { register, verifyOtp } = useAuthContext();


  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(5, 'Code must be at least 5 characters').required('Code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });


  const registerUserDetails: any = getCookie('register_user_data');
  const { email, password, firstName, lastName }: any = registerUserDetails ? JSON.parse(registerUserDetails) : {};

  const defaultValues = {
    code: '',
    email: email || '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const result: any = await verifyOtp?.(data.email, Number(data.code));
      if (result) {
        const { success } = result;
        // eslint-disable-next-line no-empty
        if (success) {

          try {

            const registerRes: any = await register?.(email, password, firstName, lastName);
            if (registerRes && registerRes.success) {
              clearCookie('register_user_data');
              router.push(PATH_AFTER_LOGIN);
            }

          } catch (error) {
            console.error(error);
            setErrorMsg(typeof error === 'string' ? error : error.message);
          }


        }
      }
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <RHFTextField
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        value={defaultValues.email}
        disabled
        InputLabelProps={{ shrink: true }}
      />

      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.register}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign up
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Please check your email!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We have emailed a 5-digit confirmation code to acb@domain, please enter the code in below
          box to verify your email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
