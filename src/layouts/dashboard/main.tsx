// @mui
import Box, { BoxProps } from '@mui/material/Box';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useDetectRoute } from 'src/hooks/use-detect-route';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { HEADER, HEADER_DESIGN, NAV } from '../config-layout';
// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const isDesign = useDetectRoute('/design');

  console.log("isDesign", isDesign);


  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: `${HEADER.H_MOBILE + 24}px`,
          pb: 10,
          ...(lgUp && {
            pt: isDesign ? `${HEADER.H_MOBILE * 2}px` : `${HEADER.H_MOBILE * 2 + 40}px`,
            pb: isDesign ? 0 : 15,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: isDesign ? 0 : 2,
          pt: isDesign ? `${HEADER_DESIGN.H_DESKTOP + SPACING}px` : `${HEADER.H_DESKTOP + SPACING}px`,
          pb: isDesign ? 0 : `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
