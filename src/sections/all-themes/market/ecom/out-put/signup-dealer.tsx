import { Box, Divider, Stack, Switch, Typography } from '@mui/material';
import React from 'react';

const SignupDealer = () => {
  return (
    <Box>
      <Box mt="20px">
        <Typography variant="button" component="p" sx={{ fontWeight: 900 }}>
          What do you need of customer data?
        </Typography>
        <Typography variant="caption" color="#8688A3">
          Select the most important information that you need from your customer profile.
        </Typography>
      </Box>

      <Box mt="20px">
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Full Name
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userFullName}
            // onChange={handleChange('userFullName')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Mobile Number
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userMobileNumber}
            // onChange={handleChange('userMobileNumber')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Birth Date
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userBirthDate}
            // onChange={handleChange('userBirthDate')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Gender
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userGender}
            // onChange={handleChange('userGender')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
      </Box>

      <Divider sx={{ borderWidth: '1px', borderColor: '#F4F4F4', my: '20px' }} />
      <Typography variant="button" component="p" sx={{ fontWeight: 900 }}>
        Allow Social Media Login
      </Typography>

      <Box>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Google Account
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userGoogleAccount}
            // onChange={handleChange('userGoogleAccount')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Facebook
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userFacebook}
            // onChange={handleChange('userFacebook')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        <Stack mb="10px" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" fontWeight={900}>
            Twitter
          </Typography>
          <Switch
            size="medium"
            // checked={themeConfig.userTwitter}
            // onChange={handleChange('userTwitter')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupDealer;
