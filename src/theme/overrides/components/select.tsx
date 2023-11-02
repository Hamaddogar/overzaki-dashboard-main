import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '14px',
        },
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)',
        },
      },
    },
    MuiNativeSelect: {
      padding: '14px !important',
      styleOverrides: {
        padding: '14px !important',
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)',
        },
      },
    },

    MuiInputBase: {
      padding: '14px !important',
    },
  }
}
