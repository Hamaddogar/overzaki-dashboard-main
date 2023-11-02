// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';

//
import { ConfirmDialogProps } from './types';
import Iconify from '../iconify/iconify';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  maxWidth = 'xs',
  noCancel = true,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose} {...other} sx={{
      '& .MuiPaper-root': {
        overflowY: 'visible !important'
      }
    }}>
      <Box position='relative'>
        <Box sx={{
          boxShadow: "0px 4px 20px #0F134933",
          height: '40px',
          width: '40px',
          borderRadius: '24px',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: '0px',
          top: '-20px',
          cursor: 'pointer'
        }} onClick={onClose} ><Iconify icon="ic:baseline-clear" /></Box>
      </Box>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        {noCancel && <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>}
      </DialogActions>
    </Dialog>
  );
}
