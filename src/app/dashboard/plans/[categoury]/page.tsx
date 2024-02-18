'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RoleBasedGuard } from 'src/auth/guard'
import { BottomActions } from 'src/components/bottom-actions'
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs'
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/form-provider'
import { useAddNewFeatureMutation, useGetPlansByCatQuery } from 'src/redux/store/services/api'
import FinancialPlanCard from 'src/sections/plans/FinancialCard'
import DetailsNavBar from 'src/sections/products/DetailsNavBar'
import * as Yup from 'yup';


const page = () => {
  const { categoury } = useParams()
  const response = useGetPlansByCatQuery(categoury.toString().toLowerCase())
  const [openAddFeature, setOpenAddFeature] = useState(false)
  const [addFeatureReq, addFeatureRes] = useAddNewFeatureMutation();


  const AddFeatureSchema = Yup.object().shape({
    content: Yup.object().shape({
      en: Yup.string().required('English content is required'),
      ar: Yup.string().required('Arabic content is required'),
      es: Yup.string().required('Spanish content is required'),
      tr: Yup.string().required('Turkish content is required'),
      fr: Yup.string().required('France content is required'),
    }),
    availableForPro: Yup.boolean().required('Availability for Pro is required'),
    availableForFree: Yup.boolean().required('Availability for Free is required'),
  });
  const addFeatureMethods = useForm({
    resolver: yupResolver(AddFeatureSchema),
    defaultValues: {
      content: {
        en: '', // Default value for English content
        ar: '', // Default value for Arabic content
        es: '', // Default value for Spanish content
        tr: '', // Default value for Spanish content
        fr: '', // Default value for Spanish content
      },
      availableForPro: false, // Default value for availableForPro
      availableForFree: false, // Default value for availableForFree
    }
  });
  const {
    reset: resetAddFeatureForm,
    handleSubmit: handleAddFeatureSubmit,
    formState: { isSubmitting: isSubmittingAddFeature },
    control,
  } = addFeatureMethods

  useEffect(() => {
    if (!openAddFeature) {
      resetAddFeatureForm({
        content: {
          en: '', // Default value for English content
          ar: '', // Default value for Arabic content
          es: '', // Default value for Spanish content
          tr: '', // Default value for Spanish content
          fr: '', // Default value for Spanish content
        },
        availableForPro: false, // Default value for availableForPro
        availableForFree: false, // Default value for availableForFree
      }); // Reset the form when the modal is closed
    }
  }, [openAddFeature, resetAddFeatureForm]);

  useEffect(() => {
    if (addFeatureRes.isSuccess) {
      enqueueSnackbar('Feature added successfully', { variant: "success" });
    }
    if (addFeatureRes.isError) {
      enqueueSnackbar('Cannot add the feature', { variant: "error" });
    }
  }, [addFeatureRes, resetAddFeatureForm]);

  const onAddFeature = handleAddFeatureSubmit(async (data) => {
    await addFeatureReq({
      category: categoury.toString().toLowerCase(),
      features: [data]
    }).unwrap();
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
            <CustomCrumbs heading="Plans" crums={false} />
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                  onClick={() => {
                    setOpenAddFeature(true)
                  }}
                >
                  Add New Feature
                </Button>
              </Stack>
            </BottomActions>
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
        {response?.data?.data.map((el: any) => <FinancialPlanCard plan={el} />)}
      </Grid>
      <DetailsNavBar
        open={openAddFeature}
        onClose={() => setOpenAddFeature(false)}
        title={`Add Feature To Your Plan`}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="soft"
              color="success"
              size="large"
              loading={isSubmittingAddFeature}
              onClick={() => {
                onAddFeature()
                setOpenAddFeature(false)
              }}
              sx={{ borderRadius: '30px' }}
            >
              Add
            </LoadingButton>
          </Stack>
        }
      >
        <FormProvider methods={addFeatureMethods} onSubmit={onAddFeature}>
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
              name="content.en"
              multiline
              rows={5}
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
              name="content.ar"
              multiline
              rows={5}
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
              name="content.es"
              multiline
              rows={5}
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
              name="content.fr"
              multiline
              rows={5}
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
              name="content.tr"
              multiline
              rows={5}
            />
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Avaliblity
            </Typography>
            <RHFCheckbox
              name="availableForPro"
              label="Available for Pro" // Assuming your RHFCheckbox supports a label prop
            />
            <RHFCheckbox
              name="availableForFree"
              label="availableForFree"
            />
          </Box>
        </FormProvider>
      </DetailsNavBar>
    </Container>
  )
}

export default page