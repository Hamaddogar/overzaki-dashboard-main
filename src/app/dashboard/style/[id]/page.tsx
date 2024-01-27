'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/form-provider'
import { useGetStyleByIdQuery, useUpdateStyleMutation } from 'src/redux/store/services/api'
import { isValidJSON } from 'src/utils/functions'
import * as Yup from 'yup';
import Button from '@mui/material/Button'
import { types } from 'src/sections/style/catigouries/style-types'



const page = () => {
    const { id } = useParams()
    const router = useRouter()
    const { data } = useGetStyleByIdQuery(id)
    const [updateStyle, { isSuccess }] = useUpdateStyleMutation()
    const [styleData, setstyleData] = useState<any>(null)

    useEffect(() => {
        if (data) {
            setstyleData(data?.data);
        }
    }, [data]);

    const ProductSchema = Yup.object().shape({
        title: Yup.string().required(),
        type: Yup.string().required(),
        json: Yup.string().test(
            'is-json',
            'json must be a valid JSON string',
            value => isValidJSON(value)
        ).required(),
    });

    const handleTheme = (e: any) => {
        const { name, value } = e.target
        setstyleData({
            ...styleData,
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
            let newData = new FormData()
            newData.append('title', data.title)
            newData.append('type', data.type)
            newData.append('json', data.json)
            await updateStyle({ id: id, ...data }).unwrap()
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
                        value={styleData?.title || ''}
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
                        value={styleData?.type || types[0]}
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
                        Json
                    </Typography>

                    <RHFTextField
                        variant="filled"
                        multiline
                        fullWidth
                        rows={5}
                        sx={{ fontWeight: 900, fontSize: '26px' }}
                        settingStateValue={handleTheme}
                        name="json"
                        value={styleData?.json || ''}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Adjust as needed for layout
                        mt: 2, // Margin top for spacing
                    }}
                >

                    <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}
                        disabled={isSubmitting}>
                        Update Style
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        // Add onClick handler if needed
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                </Box>
            </FormProvider>}
        </div>
    )
}

export default page