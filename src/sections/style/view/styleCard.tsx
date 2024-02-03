import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useRouter } from 'next/navigation';
import { useDeleteStyleMutation } from 'src/redux/store/services/api';
import { paths } from 'src/routes/paths';

const StyleCard = ({ title, type, image, id, toggleDrawerCommon }: any) => {
  const router = useRouter();
  const [deleteStyleWithId] = useDeleteStyleMutation();

  const deleteStyle = async () => {
    await deleteStyleWithId(id).unwrap();
  };
  const handleEdit = (id: any) => {
    toggleDrawerCommon(id);
  };
  return (
    <Card
      sx={{
        zIndex: 50,
        display: 'flex',
        maxWidth: 500,
        m: 2,
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius: '20px',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, borderRadius: '10px', margin: '20px' }}
        image={image}
        alt={`${title}`}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '16px',
            paddingBottom: '16px',
            marginLeft: 'auto',
            flexWrap: 'wrap',
          }}
        >
          <Switch checked={true} />
          <IconButton aria-label="edit" size="large" onClick={() => handleEdit(id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large" onClick={deleteStyle}>
            <DeleteIcon />
          </IconButton>
          {/* <IconButton aria-label="delete" size="large">
            <ColorLensIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <InsertEmoticonIcon />
          </IconButton> */}
        </Box>
      </Box>
    </Card>
  );
};

export default StyleCard;
