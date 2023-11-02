// utils
import { paths } from 'src/routes/paths';
// @mui
import { useTheme, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Paper, PaperProps } from '@mui/material';
import Linker from '../subscription-plan-checkout/link';
// import Linker from '../subscription-plan/link';
// theme

// ----------------------------------------------------------------------
interface Props extends PaperProps {
  elevation?: number
}

export default function AppEdit({ elevation = 7 }: Props) {
  const theme = useTheme();

  return (
    <Paper sx={{
      boxShadow: '0px 0px 20px #00000014',
      minHeight: { xs: '400px', sm: 'auto' }
    }}>
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='space-between'
        sx={{
          p: theme.spacing(5, 3, 5, 3),
          borderRadius: 2,
          position: 'relative',
        }}
        spacing={4}
      >
        <Stack
          flexGrow={1}
          // alignItems={{ xs: 'center' }}
          sx={{ textAlign: 'left', width: '100%' }}
          spacing="7px"
        >
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line', }}>
            Want Custom Edits?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              maxWidth: 360,
              mb: { xs: 1 },
              color: '#8688A3'
            }}
          >
            You can renew your subscription.
          </Typography>

          <Box display='flex' flexWrap='wrap' gap='5px' alignItems='center' >
            <Button variant='contained' startIcon={<Box component='img' src='/raw/OverZaki.svg' />} sx={{
              background: `transparent linear-gradient(270deg, #1BFCB6 0%, #0DE5FD 100%) 0% 0% no-repeat padding-box`,
              color: '#0F1349', borderRadius: '20px', fontWeight: 900, padding: '6px 23px', fontSize: '13px',
            }} >
              Call Me
            </Button>
            <Linker path={paths.dashboard.tasks.root} >
              <Button endIcon={<Box component='img' src='/raw/arrow-right.svg' />} variant='contained' sx={{ padding: '6px 23px', fontSize: '13px', backgroundColor: '#F5F5F8', opacity: 0.8, color: '#0F1349', borderRadius: '20px', fontWeight: 300, '&:hover': { backgroundColor: '#F5F5F8', } }} >
                You have 2 tasks -p
              </Button>
            </Linker>
          </Box>
        </Stack>
        <Box textAlign='center' component='img' src='/raw/custom.svg' sx={{ maxWidth: '65px', maxHeight: '60px' }} />
      </Stack>
    </Paper>
  );
}
