import { Stack, Typography } from '@mui/material';
import React from 'react';

const OrderNote = ({ orderNoteContainer, orderNoteHeading, orderNoteText }: any) => {
  return (
    <Stack style={{ ...orderNoteContainer }} boxShadow={orderNoteContainer.shadow ? 5 : 0}>
      <Typography sx={{ ...orderNoteHeading }} variant="subtitle1">
        Note
      </Typography>
      <input
        style={{
          ...orderNoteText,
          border: 'none',
          outline: 'none',
          marginTop: '8px',
          backgroundColor: 'transparent',
          '::placeholder': {
            color: orderNoteText.color,
          },
        }}
        placeholder="Note.."
      />
    </Stack>
  );
};

export default OrderNote;
