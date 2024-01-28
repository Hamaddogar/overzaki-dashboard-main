import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useDeleteIconMutation, useDeleteStyleMutation } from 'src/redux/store/services/api';
import { paths } from 'src/routes/paths';

const IconCard = ({ title, type, image, id }: any) => {
    const router = useRouter()
    const [deleteIconWithId] = useDeleteIconMutation()

    const deleteIcon = async () => {
        await deleteIconWithId(id).unwrap()
    }
    return (
        <Card sx={{
            display: 'flex',
            maxWidth: 345,
            m: 2,
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
            borderRadius: '20px',
        }}>
            <CardMedia
                component="img"
                sx={{ width: 150, height:150 , borderRadius: '10px', margin: '20px' }}
                image={image}
                alt={`${title}`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {type}
                    </Typography>
                </CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: '16px',
                    paddingBottom: '16px',
                    marginLeft: 'auto'
                }}>
                    <Switch checked={true} />
                    <IconButton aria-label="edit" size="large" onClick={() => router.push(`${paths.dashboard.icon}/${id}`)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={deleteIcon}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default IconCard;
