'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
//
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Iconify from 'src/components/iconify/iconify';
import Linker from 'src/sections/overview/subscription-plan/link';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/form-provider';
import { useCheckDomainValidationMutation } from 'src/redux/store/services/api';
import { RHFTextField } from 'src/components/hook-form';
import { useEffect, useState } from 'react';
import { RootState } from 'src/redux/store/store';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function NewDomain() {
  const settings = useSettingsContext();
  const [domain, setDomain] = useState('');
  const selectedDomain = useSelector((state: RootState) => state.selectedDomain)
  const [checkDomainValidate, response] = useCheckDomainValidationMutation()
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()

  useEffect(() => {
    if(response.isSuccess){
      enqueueSnackbar('successfullay checked' , {variant: 'success'})
      router.push(`${paths.dashboard.domain.avaliable}?domain=${domain}`)
    }
    if(response.isError){
      enqueueSnackbar('please enter a valid domain' , {variant: 'error'})
    }
  }, [response])
  const domainSchema = Yup.object().shape({
    domain: Yup.string().required()
  });
  const methods = useForm({
    resolver: yupResolver(domainSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleSetNewDomain = handleSubmit(async (data) => {
    try {
      const result = await checkDomainValidate({
        domain: data.domain,
        tanant_id: selectedDomain?.data?.domain
      }).unwrap();
      console.log('Domain validation result:', result);
    } catch (error) {
      console.error('Error validating domain:', error);
    }
  })
  const handleSetDomain = (e: any) => {
    const { value } = e.target
    setDomain(value)
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Website Domain"
          description="Enter a domain name for your website and we will search for you."
          crums={false}
        />
      </Box>

      <FormProvider methods={methods} onSubmit={handleSetNewDomain}>
        <Box sx={{ maxWidth: '400px', mt: '30px' }}>
          <Typography color="#8688A3" fontSize='14px' mb='5px' pl='5px'>Domain Name</Typography>
          <RHFTextField
            variant="filled"
            fullWidth
            name='domain'
            settingStateValue={handleSetDomain}
            placeholder='domain'
            sx={{
              '.MuiInputAdornment-root': {
                margin: '0px !important',
                color: "#0F1349",
                fontWeight: 900,
              },
              '& input': {
                paddingX: '0px !important'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>www.</Typography>
                </InputAdornment>
              ),
            }}
            value={domain}
          />
          <Typography sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            mt: '10px',
          }} color="#AAABBE" >
            <Iconify icon="ic:sharp-info" />
            <span>
              We will use this domain and update DNS for your website.
            </span>
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'warap',
            fontSize: '12px',
            mt: '10px',
          }}>
            <Linker path={paths.dashboard.domain.root} width='100%'>
              <Button fullWidth variant='contained' size='large' sx={{ bgcolor: '#F0F0F4', color: '#8688A3', borderRadius: '30px' }}>Cancel</Button>
            </Linker>
            <Button fullWidth variant='contained' color='primary' type='submit' size='large' sx={{ color: '#0F1349', borderRadius: '30px' }}>Check</Button>
          </Box>
        </Box>
      </FormProvider>
    </Container>
  );
}
