import React from 'react';
import { Typography, Box, Stack, Switch } from '@mui/material';

const ForgotPassDealer = () => {
  return (
    <Box>
      <Box mt="20px">
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Allow Forgot Password
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userFullName}
            // onChange={handleChange('userFullName')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgotPassDealer;
