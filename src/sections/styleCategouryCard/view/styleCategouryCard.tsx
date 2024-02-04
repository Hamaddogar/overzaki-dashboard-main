import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Switch, Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useDeleteStyleCategouryMutation, useUpdateStyleCategouryMutation } from 'src/redux/store/services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DetailsNavBar from 'src/sections/products/DetailsNavBar';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';


const StyleCategouryCard = ({ name, id }: any) => {
    const [deleteStyleCategoury] = useDeleteStyleCategouryMutation()
    const [updateStyelCategoury, response] = useUpdateStyleCategouryMutation()
    const [openStyleCategoury, setOpenStyleCategoury] = useState(false)
    const [styleCategoryData, setStyleCategoryData] = useState<any>({
        name
    })
    useEffect(() => {
        if (response.isSuccess) {
            setOpenStyleCategoury(false)
            setStyleCategoryData({
                name
            })
        }
    }, [response, name])

    const handleCloseStyleCategoury = () => {
        setOpenStyleCategoury(false)
        setStyleCategoryData({
            name
        })
    }
    const handleDeleteStyleCategoury = async () => {
        await deleteStyleCategoury(id).unwrap()
    };
    const styleCategourySchema = Yup.object().shape({
        name: Yup.string().required(),
    });
    const methods = useForm({
        resolver: yupResolver(styleCategourySchema),
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const handleStyleCategoury = (e: any) => {
        const { name, value } = e.target
        setStyleCategoryData({
            ...styleCategoryData,
            [name]: value
        })
    }
    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateStyelCategoury({
                id,
                data: {
                    name: data.name
                }
            }).unwrap()

        } catch (error) {
            throw new Error(error.message)
        }
    });
    return (
        <Card
            sx={{
                display: 'flex',
                maxWidth: 500,
                m: 2,
                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
                borderRadius: '20px',
            }}
        >
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
                        {name}
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
                    <IconButton aria-label="edit" size="large" onClick={() => setOpenStyleCategoury(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={handleDeleteStyleCategoury}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                        <ColorLensIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                        <InsertEmoticonIcon />
                    </IconButton>
                </Box>
            </Box>
            <DetailsNavBar
                open={openStyleCategoury}
                onClose={handleCloseStyleCategoury}
                title={'Update Style Categoury'}
                actions={
                    <Stack alignItems="center" justifyContent="center" spacing="10px">
                        <LoadingButton
                            fullWidth
                            variant="soft"
                            color="success"
                            size="large"
                            // onClick={editProductId ? editProductFun : createProductFun}
                            loading={isSubmitting}
                            onClick={() => {
                                methods.handleSubmit(onSubmit as any)();
                            }}
                            sx={{ borderRadius: '30px' }}
                        >
                            {'Update'}
                        </LoadingButton>
                    </Stack>
                }
            >
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box width="100%">

                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            Name
                        </Typography>

                        <RHFTextField
                            fullWidth
                            variant="filled"
                            settingStateValue={handleStyleCategoury}
                            name="name"
                            value={styleCategoryData?.name || ''}
                        />
                    </Box>
                </FormProvider>
            </DetailsNavBar>
        </Card>
    );
};

export default StyleCategouryCard;
