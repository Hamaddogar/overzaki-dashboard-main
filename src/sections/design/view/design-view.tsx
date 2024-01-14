/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

'use client';

import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Chip, Container, Grid, Paper, Stack } from '@mui/material';
// components
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
// import { createBuilder } from 'src/redux/store/thunks/builder';
import { useRouter } from 'next/navigation';
import AddTheme from './addTheme/add-theme';
import ThemeBusinessType from './addTheme/ThemeBusinessType';
import ThemeBusinessDetails from './addTheme/ThemeBusinessDetails';
import AppDetails from './addTheme/appDetails';
import AppLang from './addTheme/AppLang';
import { AppDispatch } from 'src/redux/store/store';
import { useSelector } from 'react-redux';
import { useSettingsContext } from 'src/components/settings';
import { RoleBasedGuard } from 'src/auth/guard';
import CustomCrumbs from 'src/components/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { fetchBuilderList } from 'src/redux/store/thunks/builder';
import Link from 'next/link';



const data = [
  {
    icon: 'ant-design:shopping-outlined',
    title: 'Market',
  },
  {
    icon: 'mdi:food-outline',
    title: 'Restaurant',
  },
  {
    icon: 'material-symbols:food-bank-outline',
    title: 'Groceries',
  },
  {
    icon: 'game-icons:flowers',
    title: 'Flowers',
  },
  {
    icon: 'material-symbols:health-and-beauty-outline',
    title: 'Beauty',
  },
  {
    icon: 'fluent-mdl2:shirt',
    title: 'Fashion',
  },
  {
    icon: 'fe:mobile',
    title: 'Electronics',
  },
  {
    icon: 'material-symbols:home-outline',
    title: 'Home',
  },
  {
    icon: 'fluent-mdl2:health',
    title: 'Health',
  },
  {
    icon: 'bi:book',
    title: 'Library',
  },
  {
    icon: 'octicon:gift-24',
    title: 'Gifts',
  },
  {
    icon: 'mdi:art',
    title: 'Art',
  },
  {
    icon: 'ri:football-fill',
    title: 'Sports',
  },
  {
    icon: 'map:furniture-store',
    title: 'Furniture',
  },
  {
    icon: 'material-symbols-light:toys-outline',
    title: 'Toys',
  },
  {
    icon: 'akar-icons:glasses',
    title: 'Optics',
  },
  {
    icon: 'ph:car',
    title: 'Cars',
  },
];
interface DesignMainProps {
  // Add any props if needed
}


const DesignMain: React.FC<DesignMainProps> = () => {
  const settings = useSettingsContext();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { list, builder, error, status } = useSelector((state: any) => state.builder);

  useEffect(() => {
    console.log(list);

    if (status === 'idle') {
      dispatch(fetchBuilderList(error));
    }
  }, [status]);


  // const listStuff = data;
  const listStuff = list;
  const [listItems, setListItems] = useState<any>([]);
  useEffect(() => {
    setListItems(listStuff);
  }, [listStuff]);
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setListItems(items);
  };

  // ----------------------------
  const { verifyPermission } = useAuthContext();
  const [allowAction, setAllowAction] = useState<{ edit: boolean; remove: boolean }>({
    edit: false,
    remove: false,
  });
  const getPermission = async (moduleName: string, permissionName: string): Promise<void> => {
    try {
      const data = { permission: permissionName };
      const responseData = await verifyPermission?.(data);

      if (moduleName === 'edit') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, edit: responseData }));
      } else if (moduleName === 'remove') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, remove: responseData }));
      }
    } catch (error) {
      console.error(`Error while checking ${moduleName} permission:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPermission('edit', 'EDIT_BUILDER');
      await getPermission('remove', 'Delete_BUILDER');
    };
    fetchData();
  }, []);


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mt: 3 }}>
        <RoleBasedGuard hasContent permission="READ_BUILDER">
          <Grid
            container
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Grid item xs={12} md="auto">
              <CustomCrumbs heading="Builders" crums={false} />
            </Grid>

            <Grid item xs={12} md={3}>
              <RoleBasedGuard permission="CREATE_VOUCHER">
                <BottomActions>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                    spacing="10px"
                    sx={{ width: '100%', maxWidth: { xs: '100%', sm: '200px' } }}
                  >
                    <Linker path={paths.dashboard.newDesign.root} >
                      <Button
                        startIcon="+"
                        fullWidth
                        sx={{ borderRadius: '30px', color: '#0F1349' }}
                        component="h5"
                        variant="contained"
                        color="primary"
                      >
                        {' '}
                        Create New{' '}
                      </Button>
                    </Linker>
                  </Stack>
                </BottomActions>
              </RoleBasedGuard>
            </Grid>



            <Grid item xs={12}>
              <Box>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="items">
                    {(provided) => (
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        container
                        spacing={2}
                      >
                        {listItems.map((builderObj: any, indx: any) => (
                          <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                            {(provided) => (
                              <Grid
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                key={indx}
                                item
                                xs={12}
                              >
                                <Paper elevation={4} >
                                  <Grid
                                    container
                                    item
                                    alignItems="center"
                                    justifyContent="space-between"
                                    rowGap={3}
                                    p={3}
                                    minHeight="80px"
                                  // sx={voucher.status ? stylesActive : stylesDisabled}
                                  >
                                    <Grid
                                      item
                                      sx={{ display: 'flex', alignItems: 'end' }}
                                      xs={6}
                                      md="auto"
                                    >
                                      <div {...provided.dragHandleProps}>
                                        <Iconify icon="ci:drag-vertical" />
                                      </div>
                                      {builderObj?.appLogo ? (
                                        <Box
                                          component="img"
                                          src={builderObj.appLogo}
                                          alt=" "
                                          width="60px"
                                        />
                                      ) : (
                                        <Box
                                          component="div"
                                          width="60px"
                                          height="60px"
                                          display={'flex'}
                                          alignItems={'center'}
                                          justifyContent={'center'}
                                        >
                                          <Iconify
                                            icon="uil:images"
                                            width="40px"
                                            height="40px"
                                          />
                                        </Box>
                                      )}
                                      <Box sx={{ minWidth: { xs: 'auto', md: '140px' } }}>
                                        <Typography
                                          component="p"
                                          color="#8688A3"
                                          variant="subtitle2"
                                          sx={{ fontSize: '.8rem' }}
                                        >
                                          {builderObj?.appName?.localized || builderObj?.appName?.en || ""}
                                        </Typography>
                                        <Typography
                                          component="p"
                                          color="#8688A3"
                                          variant="subtitle2"
                                          sx={{ mt: '5px', fontWeight: 900, fontSize: '.8rem' }}
                                        >
                                          {builderObj?.domain || ""}
                                        </Typography>

                                      </Box>
                                    </Grid>

                                    <Grid item xs={6} md="auto">
                                      <Typography
                                        component="p"
                                        color="#0F1349"
                                        variant="subtitle2"
                                        sx={{ fontSize: '.8rem' }}
                                      >
                                        {builderObj.BusinessCategory}{' '}
                                        {/* <span style={{ fontSize: '.7rem' }}>({builderObj.isPublishWebSite})</span>{' '} */}
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={6} md="auto">
                                      <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: '13px' }}
                                      >
                                        {/* {allowAction.remove && (
                                        <Box
                                          sx={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '20px',
                                            background: 'rgb(134, 136, 163,0.09)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                              background: 'rgb(134, 136, 163,0.2)',
                                            },
                                          }}
                                        >

                                          <Box
                                            component="img"
                                            src="/raw/trash-can-solid.svg"
                                            width="13px"
                                          />
                                        </Box>
                                      )} */}
                                        <Link
                                          target='_blank'
                                          href={`https://${builderObj?.domain}`}
                                        >
                                          <Chip label="Preview Theme" sx={{ cursor: "pointer" }} variant="outlined" />

                                        </Link>
                                        {allowAction.edit && (
                                          <Link
                                            href={paths.dashboard.design.theme(builderObj?.BusinessCategory, builderObj?.websiteTheme, `https://${builderObj?.domain}`, builderObj?._id)}
                                          >
                                            <Box
                                              sx={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '20px',
                                                background: 'rgb(134, 136, 163,0.09)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                  background: 'rgb(134, 136, 163,0.2)',
                                                },
                                              }}
                                            >
                                              <Box
                                                component="img"
                                                src="/raw/edit-pen.svg"
                                                width="13px"
                                              />
                                            </Box>
                                          </Link>
                                        )}
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              </Grid>
                            )}
                          </Draggable>
                        ))}
                      </Grid>
                    )}
                  </Droppable>
                </DragDropContext>


              </Box>
            </Grid>
          </Grid>
        </RoleBasedGuard>
      </Container>
      {/* <Box sx={{ height: '100%', transition: 'all .5', paddingBottom: '30px' }}>
        <Typography variant="h6" sx={{ padding: { xs: '5px', sm: '13px' } }}>
          Please Select a Category
        </Typography>

        <Grid container spacing={2} mt={2} px={2}>
          {data.map((item, indx) => (
            <Grid item key={indx} xs={6} sm={4} md={3}>
              <Linker path={paths.dashboard.design.themes(item.title.toLowerCase())}>
                <Box
                  sx={{
                    width: '100%',
                    height: '120px',
                    backgroundColor: 'rgb(134, 136, 163,.09)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    flexDirection: 'column',
                    transition: 'all .5s',
                    cursor: { xs: 'default', sm: 'pointer' },
                    '&:hover': {
                      backgroundColor: 'rgb(27, 252, 182)',
                    },
                  }}
                >
                  <Icon width={24} icon={item.icon} />
                  <Typography
                    component="h5"
                    variant="subtitle2"
                    sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }}
                  >
                    {item.title}{' '}
                  </Typography>
                </Box>
              </Linker>
            </Grid>
          ))}
        </Grid>
      </Box> */}

    </>

  );
}

export default DesignMain;