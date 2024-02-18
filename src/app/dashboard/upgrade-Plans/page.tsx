'use client'
import { Box, Container, Grid, } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RoleBasedGuard } from 'src/auth/guard'
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs'
import { useGetPlansByCatQuery } from 'src/redux/store/services/api'
import { RootState } from 'src/redux/store/store'
import UpgradePlanCard from 'src/sections/upgrade-plans/upgradePlanCard'


const page = () => {
  const selectedDomain = useSelector((state:RootState)=> state.selectedDomain.data)
  const response = useGetPlansByCatQuery(selectedDomain?.BusinessCategory)
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
            <CustomCrumbs heading="Plans" crums={false} />
          </Grid>
        </Box>
      </RoleBasedGuard>
      <Grid container spacing={4} sx={{
        marginTop: '20px', // Adjust top margin as needed
        height: 'full', // Make the wrapper take the full page height
        width: '100%', // Ensure the wrapper takes the full width
        boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
        justifyContent: 'center'
      }}>
        {response?.data?.data.map((el: any) => <UpgradePlanCard plan={el} />)}
      </Grid>
    </Container>
  )
}

export default page