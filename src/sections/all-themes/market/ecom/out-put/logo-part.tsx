import React, { ChangeEvent, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Typography,
  Box,
  Switch,
  TextField,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { saveLogo } from 'src/redux/store/thunks/builder';
import { MuiColorInput } from 'mui-color-input';
import Sketch from '@uiw/react-color-sketch';
import { socketClient } from 'src/sections/all-themes/utils/helper-functions';

// ----------------------------------------------------------------------

interface LogoProps {
  themeConfig?: {
    logo: string;
    navLogoPosition?: string;
    // Add other themeConfig properties as needed
  };
  builderId: string;
  handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
}

export default function LogoDealer({ themeConfig, handleThemeConfig, builderId }: LogoProps) {
  const [logoObj, setLogoObj] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const socket = socketClient();



  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };



  const handleChangeEvent = debounce((key: any, newValue: any, parentClass: any) => {
    // setLogoObj({ ...logoObj, [key]: value });
    let _socketKey = '';
    let valueToShare = '';
    const nestedAppbar = logoObj?.[parentClass] ?? {};
    setLogoObj({ ...logoObj, [parentClass]: { ...nestedAppbar, [key]: newValue } });

    _socketKey = parentClass ? parentClass + '.' + key : key;
    // valueToShare = typeof newValue === 'number' ? `${newValue}px` : newValue;
    valueToShare = newValue;

    // const targetHeader = 'appBar.websiteLogo.';
    const targetHeader = 'home.sections.general.websiteLogo.';
    const data = {
      builderId: builderId,
      key: targetHeader + _socketKey,
      value: valueToShare,
    };

    console.log("data", data);

    if (socket) {
      socket.emit('website:cmd', data);
    }


  }, 2000);

  const handleImageChange64 = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1]; // Get the base64 data
        console.log('Base64:', base64); // Log the base64 data
        // setImagePreview(reader.result?.toString() || null);
        handleThemeConfig(key, reader.result?.toString() || '');

        saveTempData(file);
      };

      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      alert('Please select a valid image file.');
    }
  };
  const saveTempData = (file: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);

    dispatch(saveLogo({ builderId: builderId, data: formDataToSend })).then((response: any) => {
      console.log('response', response);
    });
  };

  const isColorValid = (color: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(
      color
    );
  const customPresets = [
    '#FF5733', // Reddish Orange
    '#33FF57', // Greenish Yellow
    '#3366FF', // Vivid Blue
    '#FF33FF', // Electric Purple
    '#33FFFF', // Cyan
    '#FF3366', // Pink
    '#6633FF', // Blue Purple
    '#FF9900', // Orange
    '#00FF99', // Spring Green
    '#9966FF', // Royal Purple
    '#99FF33', // Lime Green
    '#FF66CC', // Pastel Pink
    '#66FF33', // Bright Lime
    '#FF6600', // Bright Orange
    '#FF99CC', // Light Pink
    '#3399FF', // Sky Blue
    '#FFCC00', // Gold
    '#33CC66', // Jade
    '#33FF57', // Greenish Yellow
    '#3366FF', // Vivid Blue
  ];

  return (
    <Box mt="20px">
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
        <Typography variant="caption" sx={{ fontWeight: 900 }}>
          Show Logo
        </Typography>
        <Switch
          checked={logoObj?.status}
          onChange={(event: any, value: any) => handleChangeEvent('status', value)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Stack>

      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Position
        </Typography>
        <RadioGroup
          row
          value={logoObj?.position}
          onChange={(event: any) => handleChangeEvent('position', event?.target?.value)}
        >
          <FormControlLabel value="left" control={<Radio size="medium" />} label="Left" />
          <FormControlLabel value="center" control={<Radio size="medium" />} label="Center " />
          <FormControlLabel value="right" control={<Radio size="medium" />} label="Right" />
        </RadioGroup>
      </Box>

      <Stack direction="row" my={2} alignItems="center" spacing="20px">
        <Box
          sx={{
            width: '80px',
            height: '80px',
            outline: '#EBEBF0 dashed 4px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${themeConfig?.logo})`,
            backgroundSize: '100% 100%',
          }}
          component="label"
        >
          <VisuallyHiddenInput type="file" onChange={handleImageChange64('logo')} />
          <Iconify
            icon="bi:image"
            style={{ color: '#C2C3D1', display: themeConfig?.logo ? 'none' : 'block' }}
          />
        </Box>

        <Box>
          <Typography
            component="p"
            sx={{ fontSize: '13px !important' }}
            variant="caption"
            color="#8688A3"
          >
            Maximum size is 5mb
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '11px !important' }} color="#8688A3">
            You can use these extensions <br /> SVG, PNG or JPG
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Border Width (%)
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <Slider
              value={logoObj?.logoObj?.borderWidth || 0}
              onChange={(_event: Event, newValue: number | number[]) =>
                handleChangeEvent('borderWidth', newValue, 'logoObj')
              }
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </Stack>
        </Stack>
      </Box>
      {/* <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Border Radius (%)
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <Slider
              value={logoObj?.borderRaduis || 0}
              onChange={(_event: Event, newValue: number | number[]) =>
                handleChangeEvent('borderRaduis', newValue, 'logoObj')
              }
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Stack>
        </Stack>
      </Box> */}

      <Box sx={{ width: '100%', display: 'flex', gap: 2, my: 2 }}>
        <Box>
          <Typography variant="caption" color="#8688A3">
            Width
          </Typography>
          <Stack direction="row" alignItems="center" spacing="18px">
            <Stack direction="row" alignItems="center" spacing={1} width={1}>
              <TextField
                variant="filled"
                type="text"
                // value={logoObj?.logoObj?.width}
                onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
              />
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Typography variant="caption" color="#8688A3">
            Height
          </Typography>
          <Stack direction="row" alignItems="center" spacing="18px">
            <Stack direction="row" alignItems="center" spacing={1} width={1}>
              <TextField
                variant="filled"
                type="text"
                // value={logoObj?.logoObj?.height}
                onChange={(event) => handleChangeEvent('height', event.target.value, 'logoObj')}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Logo Text
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} width={1}>
          <TextField
            variant="filled"
            type="text"
            fullWidth
            // value={logoObj?.logoObj?.text}
            onChange={(event: any) => handleChangeEvent('text', event.target.value, 'logoObj')}
          />
        </Stack>
      </Box>

      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Text Background
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          {/* <MuiColorInput sx={{ width: "100%", margin: "auto", }} variant="outlined"
                        value={logoObj?.textBg ?? "#000001"}
                        format="hex"
                        onChange={event => isColorValid(event) ? handleChangeEvent('textBg', event, 'logoObj') : null}
                    /> */}
          <Sketch
            onChange={(event: any) =>
              isColorValid(event?.hex) ? handleChangeEvent('backgroundColor', event?.hex, 'text') : null
            }
            presetColors={customPresets}
            style={{ width: '100%' }}
          />
        </Stack>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
        <Typography variant="caption" color="#8688A3">
          Text Color
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          {/* <MuiColorInput
            sx={{ width: '100%', margin: 'auto' }}
            variant="outlined"
            value={logoObj?.color ?? '#000001'}
            format="hex"
            onChange={(event) =>
              isColorValid(event) ? handleChangeEvent('color', event, 'logoObj') : null
            }
          /> */}
          <Sketch
            onChange={(event: any) =>
              isColorValid(event?.hex) ? handleChangeEvent('color', event?.hex, 'text') : null
            }
            presetColors={customPresets}
            style={{ width: '100%' }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
