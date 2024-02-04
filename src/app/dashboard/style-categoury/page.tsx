"use client"
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { RoleBasedGuard } from 'src/auth/guard';
import { BottomActions } from 'src/components/bottom-actions';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify/iconify';
import { useAddNewStyleCategouryMutation, useGetAllStyleCategouryQuery } from 'src/redux/store/services/api';
import DetailsNavBar from 'src/sections/products/DetailsNavBar';
import StyleCard from 'src/sections/style/view/styleCard';
import StyleCategouryCard from 'src/sections/styleCategouryCard/view/styleCategouryCard';
import * as Yup from 'yup';


const page = () => {
    const [addStyleCategoury, response] = useAddNewStyleCategouryMutation()
    const allStylesCategouries = useGetAllStyleCategouryQuery('')
    const [openStyleCategoury, setOpenStyleCategoury] = useState(false)
    const [styleCategoryData, setStyleCategoryData] = useState<any>(null)
    useEffect(() => {
        if (response.isSuccess) {
            setOpenStyleCategoury(false)
            setStyleCategoryData(null)
        }
    }, [response])

    const handleCloseStyleCategoury = () => {
        setOpenStyleCategoury(false)
        setStyleCategoryData(null)
    }
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
            await addStyleCategoury({
                name: data.name
            }).unwrap()

        } catch (error) {
            throw new Error(error.message)
        }
    });
    return (
        <Container>
            <RoleBasedGuard permission="CREATE_PRODUCT">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Adjust as needed for layout
                        mt: 2, // Margin top for spacing
                        gap: 5,
                        alignItems: 'center',
                    }}
                >
                    <Grid xs={12} md="auto">
                        <CustomCrumbs heading="Styles Categoury" crums={false} />
                    </Grid>
                    <BottomActions>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems="center"
                            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            spacing="20px"
                            sx={{ width: '100%', maxWidth: { xs: '100%', md: '250px' } }}
                        >
                            <Button
                                startIcon="+"
                                fullWidth
                                sx={{ borderRadius: '30px', color: '#0F1349' }}
                                component="button"
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenStyleCategoury(true)}
                            >
                                Add New Categoury
                            </Button>
                        </Stack>
                    </BottomActions>
                </Box>
            </RoleBasedGuard>
            <Grid container spacing={2} sx={{ padding: '16px' }} gap={2}>
            </Grid>
            <DetailsNavBar
                open={openStyleCategoury}
                onClose={handleCloseStyleCategoury}
                title={'Add New Style Categoury'}
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
                            {'Add'}
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
            <Grid container spacing={2} sx={{ padding: '16px' }}>
                {allStylesCategouries?.data?.data?.data?.map((el: any) => (
                    <StyleCategouryCard
                        name={el.name}
                        id={el.id}
                    />
                ))}
            </Grid>
        </Container>
    )
}

export default page