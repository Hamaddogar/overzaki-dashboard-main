import React from 'react';
import {
  Typography,
  Box,
  Stack,
  Switch,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';

// ----------------------------------------------------------------------

interface PersonalProps {
  themeConfig: {
    productPageFilterShow: boolean;
    productPageFilterStyle: string;
    // Add other themeConfig properties as needed
  };
  handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
  mobile?: boolean;
}

export default function ProductPageFiltersDealer({
  themeConfig,
  handleThemeConfig,
  mobile = false,
}: PersonalProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleThemeConfig('productPageFilterShow', event.target.checked);
  const filterData = ['Newest', 'High to Low', 'Low to High', 'Best Selling'];
  return (
    <Box>
      <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
      <Box>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" maxWidth="155px" fontWeight={900}>
            Show filter products on the page
          </Typography>
          <Switch
            checked={themeConfig.productPageFilterShow}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Typography variant="caption" color="#8688A3">
          Allow customers to Filter for products
        </Typography>
      </Box>
      <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
      {themeConfig.productPageFilterShow && (
        <FormControl>
          <FormLabel>Filter</FormLabel>
          {filterData.map((item) => (
            <Stack key={item} alignItems={'center'} direction={'row'} spacing={2}>
              <Radio value={item} />
              <Typography variant="caption" maxWidth="155px" fontWeight={900}>
                {item}{' '}
              </Typography>
            </Stack>
          ))}
        </FormControl>
      )}
    </Box>
  );
}
