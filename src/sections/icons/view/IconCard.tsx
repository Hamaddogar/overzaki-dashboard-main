import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useRouter } from 'next/navigation';
import {
  useDeleteIconMutation,
  useDeleteStyleMutation,
  useGetIconByIdQuery,
} from 'src/redux/store/services/api';
import { paths } from 'src/routes/paths';

const IconCard = ({
  title,
  type,
  image,
  id,
  toggleDrawerCommon,
  setIconData,

  handleIconDelete,
}: any) => {
  const router = useRouter();
  const [deleteIcon] = useDeleteIconMutation();
  const delIcon = async () => {
    await deleteIcon(id).unwrap();
  };
  // const handleDelete = async () => {
  //   setToDeleteId(id);
  //   await delIcon();
  // };

  const handleEdit = (id: any) => {
    toggleDrawerCommon(id);
  };
  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 400,
        m: 1,
        alignItems: 'center',
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius: '20px',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 60, height: 60, borderRadius: '10px', margin: '10px' }}
        image={image}
        alt={`${title}`}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          width: '100%',
        }}
      >
        <CardContent>
          <Typography gutterBottom component="div">
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
            paddingRight: '8px',
            paddingBottom: '8px',
            marginLeft: 'auto',
            flexWrap: 'wrap',
          }}
        >
          <Switch checked={true} />
          <IconButton aria-label="edit" size="small" onClick={() => handleEdit(id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleIconDelete(id)}>
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

export default IconCard;
