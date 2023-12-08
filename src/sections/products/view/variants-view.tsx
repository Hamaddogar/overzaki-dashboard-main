/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
// @mui
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Paper, Alert, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MenuItem from '@mui/material/MenuItem';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useSnackbar } from 'notistack';
// _mock
// import { allProducts } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { UploadBox } from 'src/components/upload';
import {
    createVariant,
    editVariant,
    fetchAllVariant,
    deleteVariant,
    editVariantRow,
    deleteVariantRow,
} from 'src/redux/store/thunks/products';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';
import Label from 'src/components/label/label';
import Iconify from 'src/components/iconify/iconify';




// ----------------------------------------------------------------------

export default function OrdersListView() {
    const dispatch = useDispatch<AppDispatch>();
    const { enqueueSnackbar } = useSnackbar();

    const [removeData, setRemoveData] = useState<any>(null);

    const settings = useSettingsContext();

    const confirm = useBoolean();

    const [data, setData] = useState([]);

    const [errorMsg, setErrorMsg] = useState('');

    const dialog = useBoolean();
    const rowDialog = useBoolean();

    // setting product id
    const [pId, setPId] = useState<any>(null);
    const router = usePathname();
    useEffect(() => {
        const parts = router.split('/');
        const newProductId: any = parts[parts.length - 1];
        setPId(newProductId);
        fetchVariants(newProductId);
    }, [router]);

    const fetchVariants = (id: any) => {
        if (id) {
            dispatch(fetchAllVariant(id)).then((response: any) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    console.log("response", response.payload);
                    setData(response.payload);
                }
            });
        }
    }

    // -------------------------------------------------- Variants ---------------------

    const [variantData, setVariantData] = useState<any>(null);
    const [editVariantId, setEditVariantId] = useState(null);

    const VaiantSchema = Yup.object().shape({
        groupName: Yup.object().shape({
            en: Yup.string().required('English Name is required'),
            ar: Yup.string().required('Arabic Name is required'),
        }),
        selectionType: Yup.string().required('Field is required'),
        minimum: Yup.number().test({
            name: 'minimum',
            message: 'Field is required',
            test: (value: any, context: any) => {
                // console.log("value", value);
                if (context.parent?.selectionType === 'multiple' && !value) {
                    return false;
                }
                return true;
            },
        }),
        maximum: Yup.number().test({
            name: 'maximum',
            message: 'Field is required',
            test: (value: any, context: any) => {
                // console.log("selectionType", context.parent?.selectionType);
                if (context.parent?.selectionType === 'multiple' && !value) {
                    return false;
                }
                return true;
            },
        }),
    });

    const variantMethods = useForm({
        resolver: yupResolver(VaiantSchema),
    });

    const onVariantSubmit = variantMethods.handleSubmit(async (data) => {
        try {
            if (editVariantId !== null) {
                await editVariantFun();
            } else {
                await createVariantFun();
            }
        } catch (error) {
            console.error(error);
            variantMethods.reset();
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });


    const toggleVariantModel = (editVariantObj: any = null) => {
        variantMethods.reset();
        dialog.onTrue();
        if (editVariantObj && Object.entries(editVariantObj).length > 0) {
            // setEditVariantId(editVariantObj.productId);
            setEditVariantId(editVariantObj._id);
            handleEditVariantData(editVariantObj)
        } else {

            setVariantData(null);
            setEditVariantId(null);
        }
    }


    const handleEditVariantData = (vobj: any) => {

        console.log("vobj", vobj);


        const newData = {
            groupName: {
                en: vobj.groupName.en,
                ar: vobj.groupName.ar,
            },
            allowMoreQuantity: vobj.allowMoreQuantity,
            maximum: vobj?.maximum || 0,
            minimum: vobj?.minimum || 0,
            selectionType: vobj?.selectionType,
            required: vobj?.required
        };

        Object.entries(newData).forEach(([fieldName, nestedData]: any) => {
            if (fieldName === 'groupName') {
                Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
                    const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
                    variantMethods.setValue(fullFieldName as 'groupName.en' | 'groupName.ar', value);
                });
            } else {
                variantMethods.setValue(fieldName, nestedData);
            }
        });


        const rowsArray: any = [];
        // const imagesArray: any = [];
        vobj.rows.forEach((row: any) => {
            const nameObj = {
                en: row?.name?.en || "",
                ar: row?.name?.ar || "",
            };
            rowsArray.push({
                _id: row?._id || null,
                isNew: false,
                name: nameObj,
                barcode: row?.barcode || "",
                price: row?.price || "",
                priceAfterDiscount: row?.priceAfterDiscount || "",
                sku: row?.sku || "",
                image: row?.image
            });
            // imagesArray.push(row.image)
        });

        const editVariantObj = {
            ...newData,
            rows: rowsArray,
            // images: imagesArray
        }
        setVariantData(editVariantObj);
    }


    const handleNestedVariantData = (e: any) => {
        const { name, value } = e.target;
        const [parentKey, nestedKey] = name.split('.');
        const obj = {
            ...variantData,
            groupName: {
                ...(variantData?.groupName || {}),
                [nestedKey]: value,
            },
        };
        setVariantData(obj);
    };
    const handleVariantData = (e: any) => {
        const { name, value } = e.target;
        setVariantData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleVariantCheckBox = (e: any, value: any) => {
        const { name, checked } = e.target;
        // console.log(name, checked);
        setVariantData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ------------
    const createVariantFun = () => {
        if (variantData && Object.entries(variantData).length > 0) {

            const _nVariantData = { ...variantData, required: 'true' }

            const newFormData = convertStateToFormData(_nVariantData);

            dispatch(createVariant({ productId: pId, data: newFormData })).then(
                (response: any) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        variantMethods.reset();
                        setVariantData(null);
                        setEditVariantId(null);
                        dialog.onFalse();
                        fetchVariants(pId);
                        enqueueSnackbar('Successfully Created!', { variant: 'success' });
                    } else {
                        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
                    }
                }
            );
        }
    };

    const editVariantFun = () => {
        if (variantData && Object.entries(variantData).length > 0) {
            const _nVariantData = { ...variantData, required: 'true' }
            const newFormData = convertStateToFormData(_nVariantData, false);

            dispatch(editVariant({ variantId: editVariantId, data: newFormData })).then(
                (response: any) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        // dispatch(fetchProductsList(error));
                        fetchVariants(pId);
                        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
                    } else {
                        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
                    }
                }
            );
        }
    };

    const removeVariantFun = () => {
        if (removeData) {
            dispatch(deleteVariant(removeData)).then((response: any) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    // dispatch(fetchProductsList(error));
                    fetchVariants(pId);
                    enqueueSnackbar('Successfully Deleted!', { variant: 'success' });
                    confirm.onFalse();
                } else {
                    enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
                }
            });
        }
    }



    const convertStateToFormData = (state: any, isCreate: any = true) => {
        if (isCreate) {
            const formData = new FormData();

            formData.append('groupName[en]', state.groupName.en);
            formData.append('groupName[ar]', state.groupName.ar);
            formData.append('selectionType', state.selectionType);
            formData.append('allowMoreQuantity', state.allowMoreQuantity);
            if (state?.minimum) {
                formData.append('minimum', state?.minimum);
            }
            if (state?.maximum) {
                formData.append('maximum', state?.maximum);
            }


            formData.append('required', state.required);
            if (state?.rows) {
                state.rows.forEach((row: any, index: any) => {
                    if (row?.isNew === true) {
                        const rowKey = `rows[${index}]`;
                        const rowData = JSON.stringify({
                            name: { en: row.name.en, ar: row.name.ar },
                            price: row.price,
                            priceAfterDiscount: row.priceAfterDiscount,
                            barcode: row.barcode,
                            sku: row.sku,
                        });
                        formData.append(rowKey, rowData);
                        formData.append(`images`, row.image);
                    }
                });
            }
            return formData;

        }
        // For Edit API
        const formData = {
            groupName: {
                en: state.groupName.en,
                ar: state.groupName.ar
            },
            selectionType: state.selectionType,
            minimum: state?.minimum || 0,
            maximum: state?.maximum || 0,
            allowMoreQuantity: state.allowMoreQuantity
        };

        return formData;

    };
    const convertRowDataStateToFormData = (state: any) => {
        const formData = new FormData();
        formData.append('name[en]', state.name.en);
        formData.append('name[ar]', state.name.ar);
        formData.append('price', state.price);
        formData.append('priceAfterDiscount', state.priceAfterDiscount);
        formData.append('barcode', state.barcode);
        formData.append('sku', state.sku);
        if (state?.image && typeof (state.image) !== 'string') {
            formData.append('image', state?.image);
        }
        return formData;
    };


    // ------------------------------------------------------ Rows Data ----------------------------

    const [rowData, setRowData] = useState<any>(null);
    const [editRowId, setEditRowId] = useState(null);


    const handleNestedRowData = (e: any) => {
        const { name, value } = e.target;
        const [parentKey, nestedKey] = name.split('.');
        const obj = {
            ...rowData,
            name: {
                ...(rowData?.name || {}),
                [nestedKey]: value,
            },
        };
        setRowData(obj);
    };
    const handleRowData = (e: any) => {
        const { name, value } = e.target;
        setRowData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleAddImage = (files: any) => {
        if (files.length > 0) {
            // setVariantData((prevData: any) => ({
            //     ...prevData,
            //     images: prevData?.images?.length > 0 ? [...prevData.images, files[0]] : [files[0]],
            // }));
            setRowData((prevData: any) => ({
                ...prevData,
                image: files[0],
            }));
            rowMethods.setValue('image.name', files[0].name);
            rowMethods.clearErrors('image.name');
        }
    };
    const handleRemoveImage = (index: any = null) => {
        // setVariantData((current: any) => {
        //     const { images, ...rest } = current;
        //     const updatedImages = (index) ? images.filter((_: any, i: any) => i !== index) : images.slice(0, -1);
        //     return {
        //         ...rest,
        //         images: updatedImages,
        //     };
        // });
        console.log("setRowData", rowData);

        setRowData((current: any) => {
            const { image, ...rest } = current;
            return {
                ...rest,
            };
        });
        rowMethods.setValue('image.name', '');
        rowMethods.clearErrors('image.name');
    };


    const RowSchema = Yup.object().shape({
        image: Yup.object().shape({
            name: Yup.string().required('File Required'),
        }).required(),
        name: Yup.object().shape({
            en: Yup.string().required('English Name is required'),
            ar: Yup.string().required('Arabic Name is required'),
        }),
        price: Yup.number().required('Field is required'),
        priceAfterDiscount: Yup.number().required('Field is required'),
        barcode: Yup.string().required('Field is required'),
        sku: Yup.string().required('Field is required'),
    });
    const rowMethods = useForm({
        resolver: yupResolver(RowSchema),
    });
    const onRowSubmit = rowMethods.handleSubmit(async (data) => {
        try {
            if (editRowId !== null) {

                console.log("rowData", rowData);

                const updatedRows = variantData.rows.map((row: any) => {
                    if (row._id === editRowId) {
                        return rowData;
                    }
                    return row;
                });
                setVariantData({ ...variantData, rows: updatedRows });

                if (rowData.isNew === false) {
                    // edit fun
                    const newFormData = convertRowDataStateToFormData(rowData);
                    dispatch(editVariantRow({ rowId: editRowId, data: newFormData })).then(
                        (response: any) => {
                            if (response.meta.requestStatus === 'fulfilled') {
                                enqueueSnackbar('Successfully Updated!', { variant: 'success' });
                            } else {
                                enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
                            }
                        }
                    );
                }


            } else {
                const newRowData = {
                    ...rowData,
                    _id: Math.random(),
                    isNew: true
                };
                setVariantData({ ...variantData, rows: variantData?.rows ? [...variantData.rows, newRowData] : [newRowData] })
            }
            setRowData(null);
            rowMethods.reset();
            rowDialog.onFalse();
        } catch (error) {
            console.error(error);
            rowMethods.reset();
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });

    const handleEditRow = (row: any) => {

        setEditRowId(row?._id);
        rowMethods.reset();
        const newData = {
            _id: row?._id,
            name: {
                en: row.name.en,
                ar: row.name.ar,
            },
            price: row.price,
            priceAfterDiscount: row?.priceAfterDiscount,
            barcode: row?.barcode,
            sku: row?.sku,
            isNew: row?.isNew,
            image: row?.image,
        };
        setRowData(newData);

        Object.entries(newData).forEach(([fieldName, nestedData]: any) => {
            if (fieldName === 'name') {
                Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
                    const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
                    rowMethods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
                });
            } else if (fieldName === 'image') {
                rowMethods.setValue('image.name', nestedData);
                rowMethods.clearErrors('image.name');
            }
            else {
                rowMethods.setValue(fieldName, nestedData);
            }
        });
        rowDialog.onTrue();
    }
    const handleRemoveRow = (indexToRemove: any, isNew: any) => {
        const updatedRows = variantData.rows.filter((row: any) => row?._id !== indexToRemove);
        setVariantData({ ...variantData, rows: updatedRows });

        if (!isNew) {
            // remove fun
            dispatch(deleteVariantRow(indexToRemove)).then(
                (response: any) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
                    } else {
                        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
                    }
                }
            );

        }


    }


    // -----------------------------------------Drag Divs----------------------------
    const listStuff = data;
    const [listItems, setListItems] = useState([]);
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

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Grid
                container
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
            >
                <Grid item xs={12} md="auto">
                    <CustomCrumbs heading="Variants" crums={false} />
                </Grid>

                <Grid item xs={12} md={5}>
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
                                onClick={() => toggleVariantModel()}
                            >
                                Add New Variant
                            </Button>
                        </Stack>
                    </BottomActions>
                </Grid>

                <Grid item xs={12}>
                    <Box>
                        <TabContext value='All'>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    variant="scrollable"
                                    scrollButtons={false}
                                    sx={{
                                        px: 2.5,
                                        boxShadow: (theme) =>
                                            `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                                    }}
                                >
                                    <Tab
                                        iconPosition="end"
                                        value="All"
                                        label="All Variants"
                                        icon={
                                            <Label variant='filled' color="primary">
                                                {listItems.length}
                                            </Label>
                                        }
                                    />
                                </TabList>
                            </Box>

                            <TabPanel value='All' sx={{ px: 0 }}>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="items">
                                        {(provided) => (
                                            <Grid
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                container
                                                spacing={2}
                                            >
                                                {/* DND START */}
                                                {listItems.map((variant: any, indx: any) => (
                                                    <Draggable key={indx} index={indx} draggableId={indx.toString()}>
                                                        {(provided) => (
                                                            <Grid
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                                item
                                                                xs={12}
                                                            >
                                                                <Paper elevation={4}>
                                                                    <Grid
                                                                        container
                                                                        item
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                        rowGap={3}
                                                                        sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}
                                                                    >
                                                                        <Grid item xs={12} md={6}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px',
                                                                                }}
                                                                            >
                                                                                <div {...provided.dragHandleProps}>
                                                                                    <Iconify icon="ci:drag-vertical" />
                                                                                </div>
                                                                                <Box display="flex" gap="0px" flexDirection="column">
                                                                                    <Typography
                                                                                        component="p"
                                                                                        noWrap
                                                                                        variant="subtitle2"
                                                                                        sx={{
                                                                                            fontSize: '.9rem',
                                                                                            fontWeight: 800,
                                                                                            maxWidth: { xs: '100%', md: '188px' },
                                                                                        }}
                                                                                    >
                                                                                        {' '}
                                                                                        {variant?.groupName?.en}{' '}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        component="p"
                                                                                        noWrap
                                                                                        variant="subtitle2"
                                                                                        sx={{
                                                                                            opacity: 0.7,
                                                                                            fontSize: '.9rem',
                                                                                            maxWidth: { xs: '100%', md: '188px' },
                                                                                        }}
                                                                                    >
                                                                                        {variant.selectionType}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>

                                                                        <Grid item xs={12} md={6}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px',
                                                                                    justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    component="p"
                                                                                    variant="subtitle2"
                                                                                    sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                                                                >
                                                                                    {' '}
                                                                                    {variant.rows.length} Rows{' '}
                                                                                </Typography>
                                                                                &nbsp; &nbsp;
                                                                                <Iconify
                                                                                    icon="carbon:delete"
                                                                                    onClick={() => {
                                                                                        setRemoveData(variant._id);
                                                                                        confirm.onTrue();
                                                                                    }}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                />{' '}
                                                                                &nbsp; &nbsp;
                                                                                <Iconify
                                                                                    icon="bx:edit"
                                                                                    onClick={() => toggleVariantModel(variant)}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                />
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
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </Grid>



            {/* create Variant Model */}
            <Dialog open={dialog.value} onClose={dialog.onFalse} scroll='body' maxWidth='xl' fullWidth >
                <DialogTitle>{editVariantId !== null ? "Edit Variant" : "Add New Variant"}</DialogTitle>
                <DialogContent>
                    <FormProvider methods={variantMethods} onSubmit={onVariantSubmit}>
                        <Divider flexItem />
                        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} >
                                <Typography
                                    mt="20px"
                                    mb="5px"
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Group Name (English)
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleNestedVariantData}
                                    value={variantData?.groupName?.en || ''}
                                    name="groupName.en"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography
                                    mt="20px"
                                    mb="5px"
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Group Name (Arabic)
                                </Typography>

                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleNestedVariantData}
                                    value={variantData?.groupName?.ar || ''}
                                    name="groupName.ar"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography
                                    mt="20px"
                                    mb="5px"
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Selection Type
                                </Typography>

                                <RHFSelect
                                    fullWidth
                                    variant="filled"
                                    name="selectionType"
                                    id="demo-simple-select2"
                                    value={variantData?.selectionType || ''}
                                    settingStateValue={handleVariantData}
                                >
                                    <MenuItem value="multiple">Multiple</MenuItem>
                                    <MenuItem value="single">Single</MenuItem>
                                </RHFSelect>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{
                                        borderRadius: '16px',
                                        padding: '7px 14px',
                                        // backgroundColor: '#F5F6F8',
                                    }}
                                >
                                    <Typography
                                        component="p"
                                        variant="subtitle2"
                                        sx={{ fontWeight: 900, fontSize: '.9rem' }}
                                    >
                                        Allow More Quantity
                                    </Typography>
                                    <Checkbox
                                        size="medium"
                                        name="allowMoreQuantity"
                                        checked={variantData?.allowMoreQuantity || false}
                                        onChange={handleVariantCheckBox}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                {variantData?.selectionType === 'multiple' && (
                                    <>
                                        <Typography
                                            mt="20px"
                                            mb="5px"
                                            component="p"
                                            noWrap
                                            variant="subtitle2"
                                            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                        >
                                            Minimum
                                        </Typography>
                                        <RHFTextField
                                            fullWidth
                                            type="number"
                                            variant="filled"
                                            settingStateValue={handleVariantData}
                                            value={variantData?.minimum || ''}
                                            name="minimum"
                                        />

                                        <Typography
                                            mt="20px"
                                            mb="5px"
                                            component="p"
                                            noWrap
                                            variant="subtitle2"
                                            sx={{ opacity: 0.7, fontSize: '.9rem' }}
                                        >
                                            Maximum
                                        </Typography>
                                        <RHFTextField
                                            type="number"
                                            fullWidth
                                            variant="filled"
                                            settingStateValue={handleVariantData}
                                            value={variantData?.maximum || ''}
                                            name="maximum"
                                        />
                                    </>
                                )}
                            </Grid>
                            {!editVariantId && (
                                <Grid item xs={12}>
                                    <Button
                                        startIcon="+"
                                        sx={{ borderRadius: '30px', color: '#0F1349', float: 'right', px: 3 }}
                                        component="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            rowDialog.onTrue();
                                            setRowData(null);
                                            setEditRowId(null);
                                        }}
                                    >
                                        Add Row
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                {variantData?.rows?.map((row: any, index: any) => (
                                    <Paper elevation={4} key={index} sx={{ mt: 2 }} >
                                        {/* {console.log("row", row?.name?.en)} */}
                                        <Grid
                                            container
                                            item
                                            alignItems="center"
                                            justifyContent="space-between"
                                            rowGap={3}
                                            sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '110px' }}
                                        >
                                            <Grid item xs={12} md={6}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                    }}
                                                >

                                                    <Iconify icon="ci:drag-vertical" />

                                                    {/* {variantData?.images && variantData?.images.length > 0 ? ( */}
                                                    {row?.image ? (
                                                        <Box
                                                            component="img"
                                                            // src={row?.image}
                                                            src={typeof (row.image) === 'string' ? (row.image) : URL.createObjectURL(row?.image)}
                                                            // src={typeof variantData?.images[index] === 'string'
                                                            //     ? variantData?.images[index]
                                                            //     : URL.createObjectURL(variantData?.images[index])}
                                                            alt=" "
                                                            width="60px"
                                                        />
                                                    ) : (
                                                        <Box
                                                            component="div"
                                                        // width="60px"
                                                        />
                                                    )}
                                                    <Box display="flex" gap="0px" flexDirection="column">
                                                        <Typography
                                                            component="p"
                                                            noWrap
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontSize: '.9rem',
                                                                fontWeight: 800,
                                                                maxWidth: { xs: '100%', md: '188px' },
                                                            }}
                                                        >

                                                            {row.name?.en || ""}
                                                        </Typography>
                                                        <Typography
                                                            component="p"
                                                            noWrap
                                                            variant="subtitle2"
                                                            sx={{
                                                                opacity: 0.7,
                                                                fontSize: '.9rem',
                                                                maxWidth: { xs: '100%', md: '188px' },
                                                            }}
                                                        >
                                                            Price: &nbsp; <b><s>{row?.price} KWD</s> </b> &nbsp; &nbsp; {row?.priceAfterDiscount} KWD
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                                    }}
                                                >
                                                    <Typography
                                                        component="p"
                                                        variant="subtitle2"
                                                        sx={{ fontSize: '.8rem', fontWeight: 800 }}
                                                    >
                                                        {/* {`'${row?.isNew} dx'`} */}
                                                        {row?.barcode}
                                                    </Typography>
                                                    &nbsp; &nbsp;
                                                    <Iconify
                                                        icon="carbon:delete"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleRemoveRow(row?._id, row?.isNew)}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Iconify
                                                        icon="bx:edit"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleEditRow(row)}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                ))}
                            </Grid>


                        </Grid>

                    </FormProvider>
                </DialogContent>
                <Divider flexItem sx={{ mt: 2 }} />
                <DialogActions>
                    <Button onClick={() => {
                        dialog.onFalse();
                    }} variant="soft" color="inherit"
                        sx={{ borderRadius: '30px', px: 2 }}>
                        Cancel
                    </Button>

                    <LoadingButton
                        variant="soft"
                        color="success"
                        // size="large"
                        loading={variantMethods.formState.isSubmitting}
                        onClick={() => variantMethods.handleSubmit(onVariantSubmit as any)()}
                        sx={{ borderRadius: '30px', px: 2 }}
                    >
                        {editVariantId !== null ? 'Update' : 'Save'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>



            {/* create Row Model */}
            <Dialog open={rowDialog.value} onClose={rowDialog.onFalse} scroll='body' maxWidth='md' fullWidth >
                <DialogTitle>{editRowId !== null ? "Edit Row" : "Add New Row"}</DialogTitle>
                <DialogContent>
                    <FormProvider methods={rowMethods} onSubmit={onRowSubmit}>
                        <Divider flexItem />
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} mt={2} order={{ xs: 2, sm: 1 }} >
                                <Typography
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Name (English)
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleNestedRowData}
                                    value={rowData?.name?.en || ''}
                                    name="name.en"
                                />
                                <Typography
                                    mt={2}
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Name (Arabic)
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleNestedRowData}
                                    value={rowData?.name?.ar || ''}
                                    name="name.ar"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} mt={2} order={{ xs: 1, sm: 2 }} >
                                <Stack direction="row" spacing="10px">

                                    {/* {variantData?.images && variantData?.images.length > 0 ? ( */}
                                    {rowData?.image ? (
                                        <Box width='100%' display='flex'>
                                            <Box
                                                display='flex'
                                                m={1}
                                                justifyContent='center'
                                                alignItems='center'
                                                width='160px'
                                                height='160px'
                                            >
                                                {/* {editRowId !== null ? (
                                                    <Box
                                                        component="img"
                                                        borderRadius='5px'
                                                        src={
                                                            typeof variantData.images[editRowId] === 'string'
                                                                ? variantData.images[editRowId]
                                                                : URL.createObjectURL(variantData.images[editRowId])
                                                        }
                                                        alt="rowImage"
                                                    />
                                                ) : (
                                                    )} */}
                                                <Box
                                                    component="img"
                                                    borderRadius='5px'
                                                    src={typeof (rowData.image) === 'string' ? (rowData.image) : URL.createObjectURL(rowData.image)}
                                                    alt="rowImage"
                                                />

                                            </Box>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Box
                                                        // onClick={() => handleRemoveImage(editRowId)}
                                                        onClick={() => handleRemoveImage()}
                                                        sx={{
                                                            backgroundColor: 'rgb(134, 136, 163,.09)',
                                                            padding: '10px 11px 7px 11px',
                                                            borderRadius: '36px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                                                    </Box>
                                                </Box>
                                                <Typography
                                                    mt="0px"
                                                    component="p"
                                                    variant="subtitle2"
                                                    sx={{ opacity: 0.7, fontSize: '.9rem' }}
                                                >
                                                    Maximum size is 5mb
                                                </Typography>

                                                <Typography
                                                    mt="0px"
                                                    component="p"
                                                    variant="subtitle2"
                                                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                                                >
                                                    You can use these extensions PNG or JPG
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <UploadBox
                                            onDrop={handleAddImage}
                                            maxFiles={1}
                                            maxSize={5242880}
                                            accept={{
                                                'image/jpeg': [],
                                                'image/png': [],
                                            }}
                                            placeholder={
                                                <Stack spacing={0.5} alignItems="center">
                                                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                                                    <Typography variant="body2">Upload file</Typography>
                                                </Stack>
                                            }
                                            sx={{ flexGrow: 1, height: '100%', py: 2.5 }}
                                        />
                                    )}
                                </Stack>
                                <div
                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1s84udp-MuiFormHelperText-root"
                                    id=":rd:-helper-text">
                                    {rowMethods?.formState?.errors?.image?.name?.message}
                                </div>
                                {/* {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}
                            </Grid>
                            <Grid item xs={12} sm={6} pt={0} order={{ xs: 3, sm: 3 }} >
                                <Typography
                                    mt={2}
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Price
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleRowData}
                                    value={rowData?.price || ''}
                                    name="price"
                                />
                                <Typography
                                    mt={2}
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Price After Discount
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleRowData}
                                    value={rowData?.priceAfterDiscount || ''}
                                    name="priceAfterDiscount"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} pt={0} order={{ xs: 4, sm: 4 }} >
                                <Typography
                                    mt={2}
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    Barcode
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleRowData}
                                    value={rowData?.barcode || ''}
                                    name="barcode"
                                />
                                <Typography
                                    mt={2}
                                    mb={1}
                                    component="p"
                                    noWrap
                                    variant="subtitle2"
                                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                                >
                                    SKU
                                </Typography>
                                <RHFTextField
                                    fullWidth
                                    variant="filled"
                                    settingStateValue={handleRowData}
                                    value={rowData?.sku || ''}
                                    name="sku"
                                />
                            </Grid>
                        </Grid>
                    </FormProvider>
                </DialogContent>

                <DialogActions>
                    <Button sx={{ borderRadius: '30px' }} onClick={rowDialog.onFalse} variant="soft" color="inherit">
                        Cancel
                    </Button>
                    <LoadingButton
                        variant="soft"
                        color="success"
                        loading={rowMethods.formState.isSubmitting}
                        onClick={() => rowMethods.handleSubmit(onRowSubmit as any)()}
                        sx={{ borderRadius: '30px' }}
                    >
                        {editRowId !== null ? "Update" : "Add"}
                    </LoadingButton>
                    {/* <Button onClick={rowDialog.onFalse} variant="contained">
                        Add
                    </Button> */}
                </DialogActions>
            </Dialog>





            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                noCancel={false}
                content={<>Are you sure want to delete items?</>}
                action={
                    <Button
                        fullWidth
                        color="error"
                        variant="soft"
                        size="large"
                        onClick={removeVariantFun}
                        sx={{ borderRadius: '30px' }}
                    >
                        Delete
                    </Button>
                }
            />
        </Container>
    );
}
