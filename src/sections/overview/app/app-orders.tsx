import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
// utils
import { Paper } from '@mui/material';
// components

// ----------------------------------------------------------------------

interface Props extends CardProps {
  elevation: number;
  idNo: string;
  datetime: string;
  name: string;
  status: string;
  amount: number;
  itemCount: number;
  country: string;
}

const chipColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return '#22C55E';
    case 'Pending':
      return '#FFAB00';
    case 'Accepted':
      return '#8E33FF';
    case 'Rejected':
      return '#212B36';
    default:
      return '#00B8D9';
  }
};

export default function AppOrders({
  elevation,
  idNo,
  datetime,
  name,
  status,
  amount,
  itemCount,
  country,
  ...rest
}: Props) {
  return (
    <Paper elevation={elevation}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: '340px',
          maxWidth: '340px',
          width: '100%',
          height: '130px',
          padding: '16px 20px',
        }}
        {...rest}
      >
        <Box display="flex" gap="7px" flexDirection="column">
          <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 700 }}>
            {idNo}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {datetime}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '.9rem !important' }}
            display="flex"
            alignItems="center"
          >
            <Box component="img" src="/raw/flag.png" alt="flag" /> &nbsp; &nbsp; <span>{name}</span>
          </Typography>
        </Box>
        <Box display="flex" gap="7px" flexDirection="column" sx={{ textAlign: 'right' }}>
          <Chip size="small" sx={{ backgroundColor: chipColor(status) }} label={status} />
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {itemCount} items
          </Typography>
          <Typography
            component="div"
            variant="h6"
            sx={{ fontSize: '.9rem !important' }}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <span>{amount}</span>
            <span>KWD</span>
          </Typography>
        </Box>
      </Card>
    </Paper>
  );
}
