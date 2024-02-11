'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Stack, Box } from '@mui/material';
import { useAddNewFeatureMutation, useUpdatePlanMutation } from 'src/redux/store/services/api';
import DetailsNavBar from '../products/DetailsNavBar';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'next/navigation';


const FinancialPlanCard = ({ plan }: any) => {
    const [openUpdateFeature, setOpenUpdateFeature] = useState(false)
    // update plan
    const [upatePlanReq, updatePlanRes] = useUpdatePlanMutation()
    const [openChangePlan, setOpenChangePlan] = useState(false)
    const UpdatePlaneSchema = Yup.object().shape({
        en: Yup.string().required(),
        ar: Yup.string().required(),
        es: Yup.string().required(),
        tr: Yup.string().required(),
        fr: Yup.string().required(),
        price: Yup.number().required(),
    });
    const methods = useForm({
        resolver: yupResolver(UpdatePlaneSchema),
        defaultValues: {
            en: plan.name.en,
            ar: plan.name.ar,
            tr: plan.name.tr,
            es: plan.name.es,
            fr: plan.name.fr,
            price: plan.price,
        }
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    useEffect(() => {
        if (!openChangePlan) {
            reset({
                en: plan.name.en,
                ar: plan.name.ar,
                tr: plan.name.tr,
                es: plan.name.es,
                fr: plan.name.fr,
                price: plan.price,
            });
        }
    }, [openChangePlan, plan, reset]);
    useEffect(() => {
        if (updatePlanRes.isSuccess) {
            enqueueSnackbar('updated successfully', { variant: "success" })
        }
        if (updatePlanRes.isError) {
            enqueueSnackbar('cannot update the plan', { variant: "error" })
        }
    }, [updatePlanRes]);

    const updatePlan = handleSubmit(async (data) => {
        await upatePlanReq({
            id: plan._id,
            name: {
                "en": data.en,
                "ar": data.ar,
                "tr": data.tr,
                "es": data.es,
                "fr": data.fr
            },
            price: data.price
        }).unwrap()
    })


    // add feature
    

    return (
        <Card sx={{
            minWidth: 275, margin: 2, overflow: 'visible',
            transition: 'transform 0.3s ease-in-out, border 0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.02)', // Scale up the card on hover
                border: '1px solid #1BFDB7', // Add a border on hover
            },
        }}>
            <CardContent>
                {/* Name and Price */}
                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    {plan?.type}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Price: ${plan?.price}
                </Typography>

                {/* Features Header */}
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Features:
                </Typography>

                {/* Features List */}
                {plan?.features.map((feature: any, index: any) => (
                    <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        - {feature}
                    </Typography>
                ))}

                {/* Buttons */}
                <Grid container spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
                    <Grid item>
                        <Button variant="contained" size="small" onClick={() => setOpenChangePlan(true)}>
                            Change Plan
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="small">
                            Change Features
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            {/* update plan */}
            <DetailsNavBar
                open={openChangePlan}
                onClose={() => setOpenChangePlan(false)}
                title={`Update Your Plan`}
                actions={
                    <Stack alignItems="center" justifyContent="center" spacing="10px">
                        <LoadingButton
                            fullWidth
                            variant="soft"
                            color="success"
                            size="large"
                            loading={isSubmitting}
                            onClick={() => {
                                updatePlan()
                                setOpenChangePlan(false)
                            }}
                            sx={{ borderRadius: '30px' }}
                        >
                            Update
                        </LoadingButton>
                    </Stack>
                }
            >
                <FormProvider methods={methods} onSubmit={updatePlan}>
                    <Box width="100%">
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            EN
                        </Typography>
                        <RHFTextField
                            fullWidth
                            variant="filled"
                            name="en"
                            defaultValue={plan.name.en}
                        />
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            AR
                        </Typography>
                        <RHFTextField
                            fullWidth
                            variant="filled"
                            name="ar"
                            defaultValue={plan.name.ar}
                        />
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            TR
                        </Typography>
                        <RHFTextField
                            fullWidth
                            variant="filled"
                            name="tr"
                            defaultValue={plan.name.tr}
                        />
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            ES
                        </Typography>
                        <RHFTextField
                            fullWidth
                            variant="filled"
                            name="es"
                            defaultValue={plan.name.es}
                        />
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            FR
                        </Typography>
                        <RHFTextField
                            fullWidth
                            variant="filled"
                            name="fr"
                            defaultValue={plan.name.fr}
                        />
                        <Typography
                            component="p"
                            noWrap
                            variant="subtitle2"
                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                        >
                            Price
                        </Typography>
                        <RHFTextField
                            type='number'
                            fullWidth
                            variant="filled"
                            name="price"
                            defaultValue={plan.price}
                        />
                    </Box>
                </FormProvider>
            </DetailsNavBar>
        </Card>
    );
};

export default FinancialPlanCard;
