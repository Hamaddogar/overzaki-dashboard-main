// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// auth
import { useAuthContext } from 'src/auth/hooks';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
  {
    id: 'firebase',
    label: 'Firebase',
    path: paths.auth.firebase.login,
    icon: '/assets/icons/auth/ic_firebase.svg',
  },
  {
    id: 'amplify',
    label: 'Amplify',
    path: paths.auth.amplify.login,
    icon: '/assets/icons/auth/ic_amplify.svg',
  },
  {
    id: 'auth0',
    label: 'Auth0',
    path: paths.auth.auth0.login,
    icon: '/assets/icons/auth/ic_auth0.svg',
  },
];

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const { method } = useAuthContext();

  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        background: 'url(/login-ellipse.png)',
        backgroundPosition: 'left',
        backgroundSize: '700px',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'center',

        maxWidth: 600,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );
  //   <video
  //   style={{ width: '100%', height: '100%', top: '0px', right: '0px' }}
  //   id="video-background"
  //   autoPlay
  //   muted
  //   loop
  // >
  //   <source
  //     style={{ minWidth: '100%', objectFit: 'cover' }}
  //     src="/bg-video.mp4"
  //     type="video/mp4"
  //   />
  // </video>

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        background: 'url(/new-gif.gif)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        width: upMd ? '70%' : '100%',
      }}
    >
      {/* Stuff To Keep */}
      {/* <Stack width={'70%'} spacing={2}>
        <Box
          sx={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '-6px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack>
              <Typography
                fontSize={30}
                sx={{ maxWidth: 300, fontSize: '20px', textAlign: 'start' }}
              >
                Get access
              </Typography>
              <Typography fontSize={30} sx={{ maxWidth: 300, textAlign: 'start' }}>
                for managing your
              </Typography>
            </Stack>
            <Box component="img" sx={{ width: '60px', cursor: 'pointer' }} src="/logo.png" />
          </Box>
          <Typography
            variant="h1"
            sx={{ maxWidth: 300, color: '#75F7BB', textAlign: 'start', paddingTop: '20px' }}
          >
            {/* {title || 'Hi, Welcome back'} */}
      {/* Websites
          </Typography>
        </Box> */}

      {/* <Box
          sx={{
            minWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        > */}
      {/* <Box
            component="img"
            alt="auth"
            alignItems={'center'}
            justifyContent={'center'}
            src={'/laptop.png'}
            sx={{
              maxWidth: 420,
              display: 'flex',

              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Box> */}

      {/* <Stack alignItems={'center'} justifyContent={'center'} direction="row" spacing={2}>
          {METHODS.map((option) => (
            <Tooltip key={option.label} title={option.label}>
              <Link component={RouterLink} href={option.path}>
                <Box
                  component="img"
                  alt={option.label}
                  src={option.icon}
                  sx={{
                    width: 32,
                    height: 32,
                    ...(method !== option.id && {
                      filter: 'grayscale(100%)',
                    }),
                  }}
                />
              </Link>
            </Tooltip>
          ))}
        </Stack> */}
      {/* </Stack> */}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction={upMd ? 'row-reverse' : 'column-reverse'}
      sx={{
        height: '100vh',
      }}
    >
      {renderLogo}

      {renderSection}

      {renderContent}
    </Stack>
  );
}
