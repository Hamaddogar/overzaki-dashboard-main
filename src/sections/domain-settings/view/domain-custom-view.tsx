'use client';

import React, { useEffect } from 'react';
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
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSetDomainMutation } from 'src/redux/store/services/api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import { RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from 'src/components/hook-form/form-provider';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';


// ----------------------------------------------------------------------

export default function CustomDomainView() {
  const router = useRouter()
  const [addDomain, response] = useSetDomainMutation()
  const settings = useSettingsContext();
  const [open, setOpen] = React.useState(false);
  const [domain, setDomain] = React.useState('');
  const selectedDomain = useSelector((state: RootState) => state.selectedDomain)
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if(response.isSuccess){
      setOpen(true)
      enqueueSnackbar('successfullay created' , {variant: 'success'})
    }
    if(response.isError){
      enqueueSnackbar('please enter a valid domain' , {variant: 'error'})
    }
  }, [response])

  const domainSchema = Yup.object().shape({
    domain: Yup.string().required("Domain is required"),
  });
  const methods = useForm({
    resolver: yupResolver(domainSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleToggle = handleSubmit(async (data) => {
    await addDomain({
      builderId: selectedDomain?.data?._id as any,
      domain: data.domain
    }).unwrap()
    if (response.isSuccess) {
    }
  })
  const handleSetDomain = (e: any) => {
    const { value } = e.target
    setDomain(value)
  }
  const handleOnClose = () => {
    setOpen(false)
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


      <Box sx={{ maxWidth: '400px', mt: '30px' }}>
        <FormProvider methods={methods} onSubmit={handleToggle}>
          <Typography color="#8688A3" fontSize='14px' mb='5px' pl='5px' >Domain Name</Typography>
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
            <Button onClick={handleToggle} fullWidth variant='contained' color='primary' size='large' sx={{ color: '#0F1349', borderRadius: '30px' }}>Confirm</Button>
          </Box>
        </FormProvider>
      </Box>


      <ConfirmDialog
        open={open}
        onClose={handleOnClose}
        noCancel={false}
        maxWidth='sm'
        content={
          <Box textAlign='center'>
            <Box component='img' src="/raw/Confetti_L.svg" alt="" sx={{ width: '100%' }} />
            <Box component='img' src="/raw/happy.svg" alt="" sx={{ mt: '-8%' }} />

            <Typography component='p' variant="h4"
              sx={{ maxWidth: '218px', marginX: 'auto', mt: '26px' }} >
              Domain is added Successfully
            </Typography>

            <Typography component='p' variant="body1"
              sx={{ mt: '12px', color: '#8688A3', maxWidth: '412px', marginX: 'auto' }} >
              Set these name servers to your domain provider
            </Typography>

            {/* New Paragraphs and Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
              {/* First Paragraph and Button */}

              {/* Second Paragraph and Button */}
              {response.data?.data?.nameservers?.map((el:string) => <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
                <Typography component='p' variant="body1" sx={{ mr: '10px' }}>
                  {el}
                </Typography>
                <Button variant='outlined' size='small' onClick={() => copy(el)}>
                  Copy
                </Button>
              </Box>)}
            </Box>

            <Box mt="20px">
                <Button variant='contained' size='large' color='primary' fullWidth sx={{
                  color: '#0F1349',
                  borderRadius: '30px',
                  boxShadow: '0px 6px 20px #1BFCB633',
                  width: '100%'
                }} onClick={()=> router.push(paths.dashboard.domain.custom_controls)}>
                  Go To Check Your domain
                </Button>
            </Box>
          </Box>
        }
      />

    </Container >
  );
}
