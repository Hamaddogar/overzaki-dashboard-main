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
import { Button, Card, CardActions, CardContent, FormControlLabel, Paper, Switch } from '@mui/material';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import Link from '@mui/material/Link';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDomainCheckerMutation } from 'src/redux/store/services/api';


// ----------------------------------------------------------------------

export default function CustomDomainControls() {
  const selectedDomain = useSelector((state: RootState) => state.selectedDomain.data)
  const settings = useSettingsContext();
  const [checkDomain , response] = useDomainCheckerMutation()
  const handleRefresh = async () => {
    await checkDomain({
      builderId: selectedDomain._id
    }).unwrap()
  }
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
              <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
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
            />
          </Box>
        </Stack>
      </Paper>
      <Card sx={{ borderRadius: '16px', display: 'flex', justifyContent: 'space-between' , my:'16px' , flexWrap:'wrap'}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {selectedDomain?.domain}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <Link href="" underline="hover">
              Production
            </Link>
          </Typography>
          <Typography variant="body2">
            Good news! Your DNS records are set up correctly, but it can take some time for them to propagate globally.
            <Link href="" underline="hover">
              Learn More
            </Link>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="medium" onClick={handleRefresh} startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button size="medium">Edit</Button>
        </CardActions>
      </Card>
    </Container >
  );
}
