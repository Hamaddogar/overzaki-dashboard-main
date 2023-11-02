import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
// utils
import { ReactNode } from 'react';
import { Paper } from '@mui/material';
// components

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  count: string;
  icon: ReactNode;
  elevation: number
}

export default function AppSummary({ title, icon, count, elevation = 7, ...rest }: Props) {

  return (
    <Paper elevation={elevation}>
      <Card sx={{
        display: 'flex', alignItems: 'center',
        minWidth: '164px',
        maxWidth: '164px',
        width: '100%',
        height: '80px',
        PaperProps: {
          elevation: 5
        }
      }} {...rest}

      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent='center' spacing="8px">
            <Avatar
              variant="rounded"
              sx={{
                width: 28,
                height: 28,
                bgcolor: 'background.neutral',
                borderRadius: 28
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, }} >{title}</Typography>
              <Typography component="div" variant="subtitle2">
                {count}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Paper>
  );
}
