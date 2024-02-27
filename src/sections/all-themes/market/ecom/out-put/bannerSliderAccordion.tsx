import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Iconify from 'src/components/iconify';
import { AppDispatch } from 'src/redux/store/store';
import { builderSetObjectInDesign } from 'src/redux/store/thunks/builder';

const BannerSliderAccordion = ({ img, index, self, handleActionsBanner, customPresets, dataObj, url, builderId }: any) => {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [data, setData] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setData(dataObj)
  }, [dataObj]);


  useEffect(() => {
    // console.log("data", data);
    if (Object.entries(data).length > 0) {
      handleSaveSettings()
    }
  }, [data]);


  const handleSaveSettings = () => {
    const formData = new FormData();
    const filePath = `home.sections.banner.slider.${index}`;
    formData.append('image', data?.file || "");
    formData.append('data', JSON.stringify(data?.data));
    formData.append('path', filePath);

    if (url.startsWith("https://")) {
      url = url.replace(/^https?:\/\//, "");
    }

    dispatch(builderSetObjectInDesign({ url: url, builderId: builderId, data: formData })).then((response: any) => {
      console.log("response", response);
    })

  }


  let timeoutId: any;
  const debounce = (func: any, delay: any) => {
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };





  const handleUpdateData = debounce((name: any, value: any, parentClass: any = null) => {
    // console.log();
    if (parentClass) {

      const newData = {
        ...data?.data,
        [parentClass]: {
          ...data?.data?.[parentClass],
          [name]: value
        }
      }
      setData({ ...data, data: newData });
    } else {

      setData({ ...data, data: { ...data?.data, [name]: value } })
    }

  }, 1500)

  const isColorValid = (color: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(
      color
    );

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Image {index + 1}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }} gap={3}>
            <Box
              sx={{
                width: '100%',
                height: '120px',
                borderRadius: '12px',
                position: 'relative',
                mt: '20px',
                backgroundImage: `url(${img})`,
                backgroundSize: 'contain 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                '&:hover .actions': {
                  transition: 'all .5s',
                  visibility: 'visible',
                  opacity: 1,
                },
              }}
            >
              <Stack
                justifyContent="flex-end"
                px="10px"
                maxWidth="300px"
                direction="row"
                alignItems="center"
                spacing="15px"
                className="actions"
                sx={{
                  visibility: 'hidden',
                  opacity: 0,
                  background: 'transparent',
                  position: 'absolute',
                  top: '11px',
                  right: 0,
                  height: '35px',
                }}
              >
                <Iconify
                  icon="gg:link"
                  style={{
                    color: '#B2B3C5',
                    boxShadow: '0 0 0 4px #FFFFFF',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '15px',
                  }}
                />
                <Iconify
                  icon="mdi:edit"
                  style={{
                    color: '#B2B3C5',
                    boxShadow: '0 0 0 4px #FFFFFF',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '15px',
                  }}
                />
                <Iconify
                  onClick={handleActionsBanner('delete', index, self)}
                  icon="ic:round-delete"
                  style={{
                    color: '#B2B3C5',
                    boxShadow: '0 0 0 4px #FFFFFF',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '15px',
                  }}
                />
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'}>
              <Typography variant="caption" sx={{ fontWeight: 900 }}>
                Text on Banner
              </Typography>
              <Switch
                // checked={appBar?.icon?.shadow}
                // onChange={() => setShowTextBlock((pv) => !pv)}
                onChange={(e) => {
                  handleUpdateData('textStatus', e.target.checked);
                  setShowTextBlock((pv) => !pv);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>

            {showTextBlock && (
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <Typography variant="caption" color="#8688A3">
                    Banner Text
                  </Typography>

                  <TextField
                    variant="filled"
                    type="text"
                    placeholder="i.e. Shop Now"
                    // value={appBar?.logoObj?.width}
                    // onChange={(event) => handleChangeEvent('width', event.target.value, 'logoObj')}
                    onChange={(event) => handleUpdateData('text', event.target.value)}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="#8688A3">
                    Text Color
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="18px">
                    <Sketch
                      // onChange={(event) => handleUpdateData('text', event.target.value)}
                      onChange={(event) =>
                        isColorValid(event?.hex)
                          ? handleUpdateData('color', event?.hex, 'style')
                          : null
                      }
                      presetColors={customPresets}
                      style={{ width: '100%' }}
                    />
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width={'100%'}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900 }}>
                    Text Bold
                  </Typography>
                  <Switch
                    // checked={appBar?.icon?.shadow}
                    onChange={(event: any, value: any) => handleUpdateData('fontWeight', value ? '12' : '0', 'style')}
                    // onChange={(event: any, value: any) => handleChangeEvent('shadow', value, 'icon')}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
                {/* <Box sx={{ width: '100%' }}>
        <Typography variant="caption" color="#8688A3">
          Text Color
        </Typography>
        <Stack direction="row" alignItems="center" spacing="18px">
          <Sketch presetColors={customPresets} style={{ width: '100%' }} />
        </Stack>
      </Box> */}
                <Accordion>
                  <AccordionSummary
                    sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">Text Positioning</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Horizontal Positioning
                      </Typography>
                      {/* <RadioGroup row value={banner?.search?.status || "true"} onChange={(event: any) => handleChangeEvent('status', event?.target?.value, 'search')}>
<FormControlLabel value="slider" control={<Radio size="medium" />} label="Slider" />
<FormControlLabel value="image" control={<Radio size="medium" />} label="Image" />
<FormControlLabel value="video" control={<Radio size="medium" />} label="Video" />
</RadioGroup> */}
                      <RadioGroup
                        row
                      //   value={logoObj?.position || 'center'}
                      // onChange={(event: any) => setBannerType(event.target.value)}
                      >
                        <FormControlLabel
                          value="left"
                          control={<Radio size="medium" />}
                          label="Left"
                        />
                        <FormControlLabel
                          value="right"
                          control={<Radio size="medium" />}
                          label="Right "
                        />
                      </RadioGroup>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="caption" color="#8688A3">
                        Vertical Positioning
                      </Typography>
                      {/* <RadioGroup row value={banner?.search?.status || "true"} onChange={(event: any) => handleChangeEvent('status', event?.target?.value, 'search')}>
<FormControlLabel value="slider" control={<Radio size="medium" />} label="Slider" />
<FormControlLabel value="image" control={<Radio size="medium" />} label="Image" />
<FormControlLabel value="video" control={<Radio size="medium" />} label="Video" />
</RadioGroup> */}
                      <RadioGroup
                        row
                      //   value={logoObj?.position || 'center'}
                      // onChange={(event: any) => setBannerType(event.target.value)}
                      >
                        <FormControlLabel value="top" control={<Radio size="medium" />} label="top" />
                        <FormControlLabel
                          value="bottom"
                          control={<Radio size="medium" />}
                          label="bottom "
                        />
                      </RadioGroup>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BannerSliderAccordion;
