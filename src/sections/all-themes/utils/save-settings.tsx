import { useState } from "react";
import { AddLayout } from "src/api/layout";
import { Stack, Card, Typography, Alert, Button, Box } from '@mui/material';
import { paths } from "src/routes/paths";
import { useRouter } from 'src/routes/hooks';
import Iconify from "src/components/iconify";
import CircularProgress from '@mui/material/CircularProgress';




interface PersonalProps {
    settings: any;
    smUp: boolean;
}





export default function SaveSettings({ settings, smUp }: PersonalProps) {
    const router = useRouter();

    const [loading, setloading] = useState(false);


    const [showNotice, setshowNotice] = useState({
        show: false,
        link: '',
    })

    const handleSaveSettings = async () => {
        setloading(true);
        const res = await AddLayout({
            add: true,
            data: settings
        });

        setshowNotice({
            show: true,
            link: res.link
        });
        setloading(false);
    }

    const themeDealer = (themeChoice: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
        router.push(paths.dashboard.design.root);
    };

    const openLinkInNewTab = () => {
        window.open(showNotice?.link, '_blank');
        setshowNotice({
            show: false,
            link: ''
        });
    }



    return (
        <>{smUp ?
            <Card sx={{
                borderRadius: 0,
                padding: '13px 20px',
                boxShadow: '0px 3px 20px #00000014'
            }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h4' >Design</Typography>
                    <Stack direction='row' alignItems='center' minWidth={{ xs: 'auto', sm: '340px' }} spacing='20px' >
                        <Button fullWidth variant='contained' onClick={themeDealer('default')} sx={{ display: { xs: 'none', sm: 'block' }, borderRadius: '30px', backgroundColor: '#F5F5F8', color: '#898BA5', '&:hover': { backgroundColor: '#DEE1E6' } }}>Cancel</Button>
                        {!loading && <Button onClick={handleSaveSettings} fullWidth variant='contained' color='primary' sx={{ borderRadius: '30px', color: '#0F1349' }}>Save</Button>}
                        {loading && <CircularProgress size='small' disableShrink />}
                    </Stack>
                </Stack>
                {showNotice?.show && <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ width: 1, mt: 1.2 }}
                    action={
                        <Button
                            color="info"
                            size="small"
                            variant="contained"
                            sx={{
                                bgcolor: 'info.dark',
                            }}
                            onClick={openLinkInNewTab}
                        >
                            Preview Now
                        </Button>
                    }
                >
                    Check Your Product
                </Alert>}
            </Card>
            :
            <Box>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Button startIcon={<Iconify icon='ic:round-arrow-back-ios' />} onClick={themeDealer('default')} >Back</Button>
                    <Typography variant='h6' sx={{ fontSize: '13px !important' }} >Wesite Design</Typography>
                    {!loading && <Button onClick={handleSaveSettings} size='small' fullWidth variant='contained' color='primary' sx={{ maxWidth: '100px', borderRadius: '30px', color: '#0F1349' }}>Save</Button>}
                    {loading && <CircularProgress size='small' disableShrink />}
                </Stack>
                {showNotice?.show && <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ width: 1, mt: 1.2 }}
                    action={
                        <Button
                            color="info"
                            size="small"
                            variant="contained"
                            sx={{
                                bgcolor: 'info.dark',
                            }}
                            onClick={openLinkInNewTab}
                        >
                            Preview Now
                        </Button>
                    }
                >
                    Check Your Product
                </Alert>}
            </Box >}
        </>
    )
}