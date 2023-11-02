'use client';

// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
//
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// theme
import { FormControlLabel, Paper, Switch } from '@mui/material';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// ----------------------------------------------------------------------


export default function NewDomainControls() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pt: 2 }}>

      <Box pb={3}>
        <CustomCrumbs heading="Domain Settings"
          description='Control and link your website domain'
          crums={false}
        />
      </Box>

      <Paper sx={{
        boxShadow: '0px 0px 20px #00000014',
        p: '25px',
        borderRadius: '16px'
      }}>
        <Stack
          justifyContent={{ xs: 'center', md: "space-between" }}
          alignItems="center"
          flexDirection={{ xs: 'column', md: 'row' }}
          spacing="10px"
          rowGap='20px'
          sx={{
            height: { md: 1 },
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <Stack
            direction='row'
            component="span"
            justifyContent="center"
            alignItems='center'
            columnGap="7px"
          >
            <Box component="img" src="/raw/shopi.png" alt='' sx={{ width: '100%', maxWidth: '80px', borderRadius: '80px' }} />
            <Stack
              flexGrow={1}
            >
              <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                Shoppi.com
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  maxWidth: 360,
                }}
              >
                http://www.shoppi/overzaki.com
              </Typography>

              {/* <FormControlLabel
                control={<Switch color='primary' defaultChecked />}
                label="Published now"
              /> */}
            </Stack>
          </Stack>





          <Stack
            direction='row'
            spacing="20px"
            justifyContent="center"
          >

            {
              [
                {
                  title: "Copy Link",
                  img: "/raw/link.svg"
                },
                {
                  title: "Delete",
                  img: "/raw/trash-can-solid.svg"
                },
                {
                  title: "Edit",
                  img: "/raw/edit-pen.svg"
                },
              ].map((item, indx) => <Stack
                key={indx}
                component="span"
                justifyContent="center">
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: 'background.neutral',
                    borderRadius: 50
                  }}
                >
                  <Box component="img" src={item.img} sx={{ width: 20 }} />
                </Avatar>
                <Typography variant="caption"
                  sx={{
                    mt: 1,
                    opacity: 0.8,
                    textTransform: 'capitalize',
                    textAlign: 'center'
                  }}>
                  {item.title}
                </Typography>
              </Stack>)
            }

          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{
        boxShadow: '0px 0px 20px #00000014',
        px: '30px',
        py: '25px',
        borderRadius: '16px',
        mt: '20px'
      }}>
        <Stack
          minHeight='76px'
          justifyContent={{ xs: 'center', md: "space-between" }}
          alignItems="center"
          flexDirection={{ xs: 'column', md: 'row' }}
          spacing="10px"
          rowGap='20px'
          sx={{
            height: { md: 1 },
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <Stack
            direction='row'
            component="span"
            justifyContent="center"
            alignItems='center'
          >
            <Stack
              flexGrow={1}
            >
              <Typography variant="h6" sx={{ whiteSpace: 'pre-line', fontWeight: 800 }}>
                Publish Website
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  maxWidth: 360,
                }}
              >
                You can publish your website now
              </Typography>
            </Stack>
          </Stack>

          <Box>
            <FormControlLabel
              control={<Switch color='primary' defaultChecked />}
              label="Published now"
              labelPlacement="start"
              sx={{ fontWeight: 900 }}
            />
          </Box>
        </Stack>
      </Paper>
    </Container >
  );
}
