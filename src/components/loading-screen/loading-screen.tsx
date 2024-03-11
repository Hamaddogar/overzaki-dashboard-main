// @mui
import Box, { BoxProps } from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export default function LoadingScreen({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9999,
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#161c24b0',
        // px: 5,
        // width: 1,
        // flexGrow: 1,
        // minHeight: 1,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
}
