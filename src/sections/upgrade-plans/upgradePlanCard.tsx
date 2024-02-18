'use client'
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, List } from '@mui/material';
import { useGetAllFeaturesByCatQuery, useUpgradePlanMutation } from 'src/redux/store/services/api';
import FeatureItem from './featureItem';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';


const UpgradePlanCard = ({ plan }: any) => {
    // get all features
    const selectedDomain = useSelector((state:RootState)=> state.selectedDomain.data)
    const allFeaturesRes = useGetAllFeaturesByCatQuery('market')
    const [upgradePlanReq , upgradePlanres] = useUpgradePlanMutation()

    useEffect(() => {
        if (upgradePlanres.isSuccess) {
            enqueueSnackbar('upgraded successfully', { variant: "success" })
            // console.log(upgradePlanres.data.data)
            window.location.assign(upgradePlanres.data.data.paymentId.epayUrl)
        }
        if (upgradePlanres.isError) {
            enqueueSnackbar('cannot upgrade the plan', { variant: "error" })
        }
    }, [upgradePlanres]);


    const upgradePlan = async ()=> {
        console.log(selectedDomain)
        await upgradePlanReq({
            planId: plan._id,
        }).unwrap()
    }
    return (
        <>
            <Card sx={{
                minWidth: 350, margin: 2, overflow: 'visible',
                transition: 'transform 0.3s ease-in-out, border 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                    border: '1px solid #1BFDB7',
                },
            }}>
                <CardContent>
                    {/* Name and Price */}
                    <Typography variant="h5" component="div" sx={{ mb: 2, color: 'primary.main' }}>
                        {plan?.type.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Price: <Box component="span" fontWeight="fontWeightBold">${plan?.price}</Box>
                    </Typography>

                    {/* Features Header */}
                    <Typography variant="subtitle1" fontWeight="fontWeightMedium" sx={{ mb: 2 }}>
                        Features:
                    </Typography>

                    {/* Features List */}
                    <List dense>
                        {allFeaturesRes?.data?.data?.map((feature:any, index:number) => {
                            if (plan.type === 'pro' && feature.availableForPro) {
                                return <FeatureItem key={index} feature={feature} />;
                            }
                            if (plan.type === 'basic' && feature.availableForFree) {
                                return <FeatureItem key={index} feature={feature} />;
                            }
                            return null;
                        })}
                    </List>

                    {/* Button */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" size="small" onClick={upgradePlan}>
                            Upgrade Plan
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default UpgradePlanCard;