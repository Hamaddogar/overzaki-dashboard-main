import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import Chip from '@mui/material/Chip';
// utils
import { Paper } from '@mui/material';
// components

// ----------------------------------------------------------------------

interface Props extends CardProps {
  elevation: number;
  idNo: string;
  description: string;
  name: string;
  sales: number;
  img: string;

}

export default function AppProducts({ elevation, idNo, description, name, sales, img, ...rest }: Props) {

  return (
    <Paper elevation={elevation}>
      <Card sx={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '340px',
        maxWidth: '340px',
        width: '100%',
        height: '130px',
        padding: '16px 20px',
        gap:'5px'
      }} {...rest}  >

        <Chip size='small' label={idNo} sx={{ backgroundColor: 'rgb(27, 252, 182,.2)', color: '#0F1349' }} />

        <Box sx={{
          width: '60px',
          height: '60px',
          border: '1px solid #F8F8FA',
          p: "4px",
          borderRadius: '3px'

        }} >
          <Box component='img' src={img} alt={name} width='100%' />
        </Box>

        <Box flexGrow={1} display='flex' gap='0px' flexDirection='column' >
          <Typography maxWidth='163px' noWrap component='span' variant="h6" sx={{ fontSize: '1rem' }} >{name}</Typography>
          <Typography maxWidth='163px' noWrap component='span' variant="subtitle2" sx={{ opacity: 0.8, fontSize: '.9rem' }} >{description}</Typography>
          <Typography maxWidth='163px' noWrap component='span' variant="subtitle2" sx={{ opacity: 0.8, fontSize: '.8rem' }} >{sales} sales</Typography>
        </Box>
      </Card>
    </Paper>
  );
}
