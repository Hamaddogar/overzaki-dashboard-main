import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Sketch from '@uiw/react-color-sketch';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import Footer from 'src/sections/all-themes/component/Footer';

const FooterDealer = () => {
  const [menuItems, setMenuItems] = useState(['Home']);
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
  const [footerStyling, setFooterStyling] = useState({
    container: {
      backgroundColor: 'black',
    },
    menuItems: {
      color: 'white',
    },
    socialIcons: {
      color: 'black',
      backgroundColor: 'white',
    },
    socials: {
      facebook: true,
      instagram: true,
      twitter: true,
      google: true,
    },
  });

  const [menuItemColor, setMenuItemColor] = useState('white');
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('black');

  return (
    <Stack>
      <Footer
        containerBackgroundColor={containerBackgroundColor}
        menuItemColor={menuItemColor}
        footerStyling={footerStyling}
        menuItems={menuItems}
      />
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Container</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Footer Background Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(event) =>
                  setFooterStyling((prev) => ({
                    ...prev,
                    container: {
                      ...prev.container,
                      backgroundColor: event.hex,
                    },
                  }))
                }
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Menu Items</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Menu</Typography>
              <IconButton onClick={() => setMenuItems((pv) => [...pv, ''])} color="primary">
                <Iconify icon="ic:baseline-plus" />
              </IconButton>
            </Box>
            {menuItems.map((item, ind) => (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="#8688A3">
                  Item Name
                </Typography>
                <Stack width={'100%'} direction="row" alignItems="center" spacing="18px">
                  <Stack width={'100%'} direction="row" alignItems="center" spacing={1}>
                    <TextField
                      variant="filled"
                      type="text"
                      placeholder="i.e. Home"
                      value={item}
                      sx={{ width: '100%' }}
                      onChange={(e) => {
                        setMenuItems((prev) => {
                          return prev.map((item, i) => {
                            if (i === ind) {
                              return e.target.value; // replace `newValue` with the value you want to set
                            } else {
                              return item;
                            }
                          });
                        });
                      }}

                      // onChange={(event) =>
                      //   // setMenus([...menus])
                      // }
                    />
                  </Stack>
                </Stack>
              </Box>
            ))}
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="#8688A3">
                Menu Item Color
              </Typography>
              <Stack direction="row" alignItems="center" spacing="18px">
                <Sketch
                  onChange={(event) =>
                    setFooterStyling((prev) => ({
                      ...prev,
                      menuItems: {
                        ...prev.menuItems,
                        color: event.hex,
                      },
                    }))
                  }
                  presetColors={customPresets}
                  style={{ width: '100%' }}
                />
              </Stack>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Socials</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
            >
              <Typography variant="caption" sx={{ fontWeight: 900 }}>
                Facebook
              </Typography>
              <Switch
                checked={footerStyling.socials.facebook}
                onChange={() =>
                  setFooterStyling((pv) => ({
                    ...pv,
                    socials: { ...pv.socials, facebook: !pv.socials.facebook },
                  }))
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
            >
              <Typography variant="caption" sx={{ fontWeight: 900 }}>
                Facebook
              </Typography>
              <Switch
                checked={footerStyling.socials.instagram}
                onChange={() =>
                  setFooterStyling((pv) => ({
                    ...pv,
                    socials: { ...pv.socials, instagram: !pv.socials.instagram },
                  }))
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
            >
              <Typography variant="caption" sx={{ fontWeight: 900 }}>
                Twitter
              </Typography>
              <Switch
                checked={footerStyling.socials.twitter}
                onChange={() =>
                  setFooterStyling((pv) => ({
                    ...pv,
                    socials: { ...pv.socials, twitter: !pv.socials.twitter },
                  }))
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
            >
              <Typography variant="caption" sx={{ fontWeight: 900 }}>
                Google
              </Typography>
              <Switch
                checked={footerStyling.socials.google}
                onChange={() =>
                  setFooterStyling((pv) => ({
                    ...pv,
                    socials: { ...pv.socials, google: !pv.socials.google },
                  }))
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
          </Stack>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Social Icon Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(event) =>
                  setFooterStyling((prev) => ({
                    ...prev,
                    socialIcons: {
                      ...prev.socialIcons,
                      color: event.hex,
                    },
                  }))
                }
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Social Icon Background Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(event) =>
                  setFooterStyling((prev) => ({
                    ...prev,
                    socialIcons: {
                      ...prev.socialIcons,
                      backgroundColor: event.hex,
                    },
                  }))
                }
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          sx={{ width: '100%', display: 'flex', alignItems: 'baseline' }}
          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">Socials</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Typography variant="caption" color="#8688A3">
              Footer Background Color
            </Typography>
            <Stack direction="row" alignItems="center" spacing="18px">
              <Sketch
                onChange={(event) => setContainerBackgroundColor(event.hex)}
                presetColors={customPresets}
                style={{ width: '100%' }}
              />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion> */}
    </Stack>
  );
};

export default FooterDealer;
