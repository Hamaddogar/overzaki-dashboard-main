// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';

export default function ProductTableToolbar() {


  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
        pl: { xs: 2.5, md: 1 },
      }}
    >

      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          placeholder='Search for a product...'
          fullWidth
          variant='filled'
          // value={filters.name}
          // onChange={handleFilterName}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <Box component='img' src='/raw/search.svg' sx={{ width: '15px' }} />
            </InputAdornment>,
          }}
          sx={{
            borderRadius: '16px',
            '& .MuiFilledInput-root': {
              borderRadius: '16px',
            },
            '& .MuiInputAdornment-root': {
              marginTop: '0px !important',
              paddingLeft: '10px'
            },
            '& input': {
              color: '#8898AA',
              paddingLeft: '10px',
              fontSize: '14px',
              padding: '15px 20px 15px 0px !important'
            }
          }}
        />

        <Button variant='contained' sx={{ backgroundColor: 'rgb(15, 19, 73,.04)', borderRadius: '16px', padding: '15px 15px' }} >
          <Box component='img' src='/raw/sort.svg' />
        </Button>

        <Button variant='contained' sx={{ backgroundColor: 'rgb(15, 19, 73,.04)', borderRadius: '16px', padding: '15px 15px' }} >
          <Box component='img' src='/raw/filter.svg' />
        </Button>
      </Stack>

    </Stack>
  );
}
