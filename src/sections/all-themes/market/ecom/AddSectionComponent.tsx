import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const AddSectionComponent = ({ onClose, onClick }: any) => {
  // const [appBar, setAppBar] = useState<any>({});
  const [heading, setHeading] = useState<any>();

  const [appBar, setAppBar] = useState<any>({});

  const isColorValid = (color: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$|^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$|^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$|^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(
      color
    );

  const [components, setComponents] = useState([
    {
      heading: 'App Bar',
      comps: [
        { name: 'Top Bar', onClick: 'Top Bar', img: '/topbar-gif.gif', imgheight: '58px', id: 1 },
        { name: 'App Bar', onClick: 'App Bar', img: '/raws/nav2.svg', imgheight: '110px', id: 2 },
      ],
    },
    // {
    //   heading: 'Slider',
    //   comps: [
    //     { name: 'Slider', onClick: 'Header', img: '/raws/slider.png', imgheight: '258px', id: 3 },
    //   ],
    // },
    {
      heading: 'Categories',
      comps: [
        {
          name: 'Categories Section (2)',
          onClick: 'CategoriesLayout',
          img: '/raws/categories.png',
          imgheight: '178px',
          id: 4,
        },
      ],
    },
    {
      heading: 'Video Section',
      comps: [
        {
          name: 'Video Section (2)',
          onClick: 'Video',
          img: '/raws/video.png',
          imgheight: '',
          id: 5,
        },
      ],
    },
    {
      heading: 'Banners',
      comps: [
        { name: 'Banners', onClick: 'Banner', img: '/raws/banner2.png', imgheight: '150px', id: 6 },
      ],
    },
    {
      heading: 'Products',
      comps: [
        { name: 'Products', onClick: 'Products', img: '/raws/products.png', imgheight: '', id: 7 },
      ],
    },
    {
      heading: 'Footer',
      comps: [
        { name: 'Footer', onClick: 'Footer', img: '/raws/footer.png', imgheight: '128px', id: 8 },
      ],
    },
  ]);
  const [sections, setSections] = useState([
    {
      parentHeading: 'App Bar',
      name: 'Top Bar',
      onClick: 'Top Bar',
      img: '/topbar-gif.gif',
      imgheight: '58px',
      id: 1,
    },
    {
      parentHeading: 'App Bar',
      name: 'App Bar',
      onClick: 'App Bar',
      img: '/raws/nav2.svg',
      imgheight: '110px',
      id: 2,
    },
    {
      parentHeading: 'Slider',
      name: 'Slider',
      onClick: 'Header',
      img: '/raws/slider.png',
      imgheight: '258px',
      id: 3,
    },
    {
      parentHeading: 'Video Section',
      name: 'Video Section (2)',
      onClick: 'video',
      img: '/raws/video.png',
      imgheight: '',
      id: 5,
    },
    {
      name: 'Categories Section (2)',
      onClick: 'CategoriesLayout',
      img: '/raws/categories.png',
      imgheight: '178px',
      id: 4,
    },
    {
      parentHeading: 'Banners',
      name: 'Banners',
      onClick: 'Banner',
      img: '/raws/banner2.png',
      imgheight: '150px',
      id: 6,
    },
    {
      parentHeading: 'Products',
      name: 'Products',
      onClick: 'Products',
      img: '/raws/products.png',
      imgheight: '',
      id: 7,
    },
    {
      parentHeading: 'Footer',
      name: 'Footer',
      onClick: 'Footer',
      img: '/raws/footer.png',
      imgheight: '128px',
      id: 8,
    },
  ]);
  const confirm = useBoolean();
  const handleSectionDelete = () => {};
  const [toDeleteId, setToDeleteId] = useState<number>();
  const handleDelete = () => {
    setComponents(
      components.map((item) => ({
        ...item,
        comps: item.comps.filter((comp) => comp.id !== toDeleteId),
      }))
    );
    confirm.onFalse();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddToComponent = (itemChild: any) => {
    // console.log(heading);
    const updatedComponents = components.map((component) => {
      if (heading === component.heading) {
        return {
          ...component,
          comps: [...component.comps, itemChild],
        };
      }

      return component;
    });
    // Update the state with the new components array
    // For example, if you're using setState:
    setComponents(updatedComponents);
    setHeading('');
    handleClose();
  };

  return (
    <div>
      <Card
        sx={{
          borderRadius: '0px',
          p: '20px',
          height: '100%',
          boxShadow: '0px -6px 40px #00000014',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="h6">Add New Section</Typography>
            <Typography variant="caption" color="#8688A3">
              Select where you want to add this section.
            </Typography>
          </Box>
          <Iconify
            width={25}
            icon="iconamoon:close-bold"
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          />
        </Stack>
        {components.map((item) => (
          <Stack width={'100%'}>
            <Divider
              sx={{
                borderWidth: '2px',
                borderColor: '#F5F5F8',
                my: '10px',
                '& .MuiDivider-wrapper': {
                  padding: 0,
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing="4px"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => {
                  handleClick(e);
                  setHeading(item?.heading);
                }}
                justifyContent="center"
                sx={{
                  width: '120px',
                  height: '36px',
                  background: '#F5F5F8',
                  borderRadius: '20px',
                }}
              >
                <Iconify style={{ color: '#8688A3' }} icon="ic:baseline-plus" />
                <Typography variant="button" color="#8688A3">
                  Add Here
                </Typography>
              </Stack>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {sections?.map((itemChild) => (
                  <MenuItem key={itemChild.id} onClick={() => handleAddToComponent(itemChild)}>
                    {itemChild.name}
                  </MenuItem>
                ))}
              </Menu>
            </Divider>

            {item?.comps?.map((item) => (
              <>
                <Box mt="20px">
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="caption" color="#8688A3">
                      {item?.name}
                    </Typography>

                    <Stack direction={'row'}>
                      <Iconify
                        onClick={() => {
                          confirm.onTrue();
                          setToDeleteId(item.id);
                        }}
                        width={30}
                        icon={'material-symbols-light:delete'}
                      />
                      <Iconify width={30} icon={'bitcoin-icons:edit-filled'} />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      width: '100%',
                      height: item?.imgheight,
                      border: '4px solid #8688A333',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                    onClick={() => onClick(item?.onClick)}
                  >
                    <Box width={'100%'}>
                      <img style={{ width: '100%' }} src={item?.img} />
                    </Box>
                  </Stack>
                </Box>
              </>
            ))}
          </Stack>
        ))}
      </Card>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        noCancel={false}
        content={<>Are you sure want to delete this section?</>}
        action={
          <Stack width={'100%'} gap={1} direction={'row'}>
            <Button
              fullWidth
              size="large"
              onClick={confirm.onFalse}
              sx={{
                borderRadius: '30px',
                border: '2px solid red',
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="soft"
              size="large"
              onClick={handleDelete}
              sx={{ borderRadius: '30px', backgroundColor: 'red' }}
            >
              Delete
            </Button>
          </Stack>
        }
      />
    </div>
  );
};

export default AddSectionComponent;
