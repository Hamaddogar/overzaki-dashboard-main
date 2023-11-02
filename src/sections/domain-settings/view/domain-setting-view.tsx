'use client';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
// routes
import Linker from 'src/sections/overview/subscription-plan/link';
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// ----------------------------------------------------------------------

export default function DomainSettingsView() {
  const settings = useSettingsContext();

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 3,
        mb: 15,
      }}
    >
      <Box>
        <CustomCrumbs
          heading='Domain Settings'
          description="Control and link your website domain"
          crums={false} />
      </Box>



      <Stack alignItems='center' justifyContent='center' rowGap="17px" sx={{ mt: '100px', width: '100%' }}>

        <Box component='img' src="/raw/Nodomain.svg" alt='' />

        <Typography variant='h5' color="#8688A3" component='h5'>
          No domain yet!
        </Typography>

        <Typography variant='body2' color="#8688A3" component='p' my={1} maxWidth='286px' textAlign='center'>
          You need to Link your website with a domain to publish it.
        </Typography>


        <Linker path={paths.dashboard.domain.new} width='100%' maxWidth="300px">
          <Button variant='contained' fullWidth size='large' color='primary' sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }} >
            Get New Domain
          </Button>
        </Linker>


        <Linker path={paths.dashboard.domain.custom} width='100%' maxWidth="300px">
          <Button variant='contained' fullWidth size='large' sx={{ borderRadius: '30px', backgroundColor: '#0F1349', boxShadow: '0px 6px 20px #0F134933' }} >
            Use My Domain
          </Button>
        </Linker>



      </Stack>

    </Container>
  );
}
