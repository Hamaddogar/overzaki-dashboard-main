'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/form-provider'
import { useGetIconByIdQuery, useGetThemeByIdQuery, useUpdateIconMutation, useUpdateThemeMutation } from 'src/redux/store/services/api'
import { isValidJSON } from 'src/utils/functions'
import * as Yup from 'yup';
import Button from '@mui/material/Button'
import { types } from 'src/sections/icons/catigories/Icon-types'



const page = () => {
    const { id } = useParams()
    const router = useRouter()
    const { data } = useGetIconByIdQuery(id)
    const [updateTheme, { isSuccess }] = useUpdateIconMutation()
    const [iconData, seticonData] = useState<any>(null)

    useEffect(() => {
        if (data) {
            seticonData(data?.data);
        }
    }, [data]);

    const ProductSchema = Yup.object().shape({
        title: Yup.string().required(),
        type: Yup.string().required(),
        url: Yup.string().required(),
    });

    const handleTheme = (e: any) => {
        const { name, value } = e.target
        seticonData({
            ...iconData,
            [name]: value
        })
    }

    const methods = useForm({
        resolver: yupResolver(ProductSchema),
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            await updateTheme({ id: id, ...data }).unwrap()
        } catch (error) {
            reset()
        }
    });
    return (
        <div>
            {data && <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box width="100%">
                    <Typography
                        component="p"
                        noWrap
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                    >
                        title
                    </Typography>

                    <RHFTextField
                        fullWidth
                        variant="filled"
                        settingStateValue={handleTheme}
                        name="title"
                        value={iconData?.title || ''}
                    />
                    <Typography
                        component="p"
                        noWrap
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                    >
                        type
                    </Typography>

                    <RHFSelect
                        fullWidth
                        variant="filled"
                        name="type"
                        id="demo-simple-select2"
                        value={iconData?.type || types[0]}
                        settingStateValue={handleTheme}
                    >
                        {types.map((type: string, index: any) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                    <Typography
                        component="p"
                        noWrap
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                    >
                        URL
                    </Typography>

                    <RHFTextField
                        variant="filled"
                        fullWidth
                        settingStateValue={handleTheme}
                        name="url"
                        value={iconData?.url || ''}
                        type='url'
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Adjust as needed for layout
                        mt: 2, // Margin top for spacing
                    }}
                >

                    <Button type="submit" variant="contained" sx={{ mt: 2 , mr: 2 }}
                        disabled={isSubmitting}>
                        Update Theme
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                    // Add onClick handler if needed
                    onClick={()=> router.back()}
                    >
                        Back
                    </Button>
                </Box>
            </FormProvider>}
        </div>
    )
}

export default page