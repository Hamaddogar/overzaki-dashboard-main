/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import {
  Box,
  Stack,
  Typography,
  Button,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';
import { useDispatch } from 'react-redux';
import { editTaxSettings, fetchTaxSettingssList } from 'src/redux/store/thunks/taxSettings';
import { enqueueSnackbar } from 'notistack';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// ----------------------------------------------------------------------
const countries = [
  {
    flag: '/raw/flagUSD.png',
    country: 'United States',
    value: '0%',
    checked: true,
  },
  {
    flag: '/raw/flagSAR.png',
    country: 'Saudi Arabia',
    value: '15%',
    checked: true,
  },
  {
    flag: '/raw/flagKWD.png',
    country: 'Kuwait',
    value: '5%',
    checked: true,
  },
  {
    flag: '/raw/flagEGP.png',
    country: 'Egypt',
    value: '15%',
    checked: false,
  },
];

export default function TaxSetting() {
  const dispatch = useDispatch<any>();

  const settings = useSettingsContext();
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    dispatch(fetchTaxSettingssList()).then((response: any) => {
      const { merchantVat, VATIncludedShippingFees, countries } = response.payload;

      const merchantV = merchantVat ? 'true' : 'false';

      setData({
        merchantVat: merchantV,
        VATIncludedShippingFees: VATIncludedShippingFees ? 'true' : 'false',
        countries: countries.map(({ name, percentage, active }: any) => ({
          name,
          percentage,
          active,
        })),
      });
    });
  };

  const setCountryObj = (name: any, value: any, index: any) => {
    const countriesList = data.countries || [];
    const updatedList = countriesList.map((country: any, ind: any) => {
      if (ind === index) {
        return {
          ...country,
          [name]: value,
        };
      }
      return country;
    });
    setData({ ...data, countries: updatedList });
  };

  console.log(typeof 12);
  console.log(data);
  const saveChanges = () => {
    const jsonData = {
      ...data,
      merchantVat: data.merchantVat === 'true',
      VATIncludedShippingFees: data.VATIncludedShippingFees === 'true',
    };

    dispatch(editTaxSettings(jsonData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  // Country Dialog
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box>
        <CustomCrumbs
          heading="Tax Settings"
          description="Control tax settings for your branches."
        />
      </Box>

      <Box mt="20px">
        <Typography variant="body1" sx={{ fontWeight: 900 }}>
          Merchant VAT
        </Typography>
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="Merchant-label"
            name="merchantVat"
            value={data?.merchantVat || null}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          >
            <Stack
              direction="row"
              sx={{ maxWidth: '250px' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mt="20px">
        <Typography variant="body1" sx={{ fontWeight: 900 }}>
          Do you want VAT to be included in shipping fees?
        </Typography>
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="shipping-label"
            name="VATIncludedShippingFees"
            value={data?.VATIncludedShippingFees || null}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          >
            <Stack
              direction="row"
              sx={{ maxWidth: '250px' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ borderWidth: '1px', my: '30px' }} />

      <Box sx={{ maxWidth: '400px' }}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 900 }}>
              Countries
            </Typography>
            <Typography component="p" variant="caption" color="#8688A3">
              Enter VAT of each country
            </Typography>
          </Box>
          <Box sx={{ minWidth: '100px' }}>
            <Button
              fullWidth
              startIcon={<Iconify icon="mingcute:add-fill" />}
              sx={{ borderRadius: '30px', color: '#0F1349', boxShadow: '0px 6px 20px #1BFCB633' }}
              component="h5"
              onClick={() => setOpenDialog(true)}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Box>
          {openDialog && <CountryDialog setData={setData} setOpenDialog={setOpenDialog} />}
        </Stack>

        {data &&
          data?.countries
            .filter((item: any) => item?.name && item?.percentage)
            .map((country: any, indx: any) => (
              <Box mt="20px" key={indx}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing="10px">
                    {/* <Box component='img' src={country.flag} /> */}
                    <Typography variant="button" sx={{ fontWeight: 900 }}>
                      {country.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing="3px">
                    <TextField
                      variant="filled"
                      size="small"
                      type="number"
                      disabled={!country.active}
                      value={country.percentage}
                      onChange={(e: any) => setCountryObj('percentage', e.target.value, indx)}
                      sx={styles}
                    />
                    <Switch
                      color="primary"
                      checked={!!country.active}
                      onChange={(e, value) => setCountryObj('active', value, indx)}
                    />
                  </Stack>
                </Stack>
              </Box>
            ))}

        <Box sx={{ mt: '20px' }}>
          <Button
            onClick={saveChanges}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
              boxShadow: '0px 6px 20px #1BFCB633',
              borderRadius: '30px',
              color: '#0F1349',
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
const styles = {
  borderRadius: '5px',
  maxWidth: '80px',
  '& input': { padding: '7px 7px', fontWeight: 900 },
  '& .MuiInputBase-root': { borderRadius: '5px' },
};
const CountryDialog = ({ setOpenDialog, setData }: any) => {
  const CountrySchema = Yup.object().shape({
    name: Yup.string().max(4).min(1).required('Country is required'),
    percentage: Yup.number().max(100).min(0).required('Percentage is required'),
  });
  const [numberError, setNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const methods = useForm<any>({
    resolver: yupResolver(CountrySchema),
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
  });

  const [dataToPush, setDataToPush] = useState<any>();
  const handlePush = () => {
    setDataToPush((prev: any) => ({ ...prev, active: true }));
    setData((prev: any) => ({ ...prev, countries: [...prev.countries, dataToPush] }));
  };
  console.log(dataToPush);
  return (
    <Dialog maxWidth="xs" open>
      <DialogTitle>Add Country</DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={onSubmit} methods={methods}>
          <Box>
            <Typography
              component="p"
              variant="caption"
              color="#8688A3"
              sx={{ ml: '5px', mb: '5px' }}
            >
              Country (Short)
            </Typography>
            <RHFTextField
              onChange={(e) =>
                setDataToPush((prev: any) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                  active: true,
                }))
              }
              fullWidth
              name="name"
              variant="filled"
              value={(dataToPush && dataToPush?.name) || ''}
            />
            {countryError && <Typography>{countryError}</Typography>}
          </Box>
          <Box sx={{ marginTop: '8px' }}>
            <Typography
              component="p"
              variant="caption"
              color="#8688A3"
              sx={{ ml: '5px', mb: '5px' }}
            >
              Percentage
            </Typography>
            <RHFTextField
              onChange={(e) =>
                setDataToPush((prev: any) => ({
                  ...prev,
                  [e.target.name]: parseInt(e.target.value, 10),
                }))
              }
              fullWidth
              value={(dataToPush && dataToPush?.percentage) || ''}
              name="percentage"
              variant="filled"
            />
            {numberError && <Typography>{numberError}</Typography>}
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog((prev: any) => !prev)} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePush} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
