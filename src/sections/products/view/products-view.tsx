/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useState } from 'react';

import FormProvider, { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';


// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { UploadBox } from 'src/components/upload';
import { useSettingsContext } from 'src/components/settings';
import DetailsNavBar from '../DetailsNavBar';
import { RoleBasedGuard } from 'src/auth/guard';
import Iconify from 'src/components/iconify/iconify';
import { BottomActions } from 'src/components/bottom-actions';
import ProductTableToolbar from '../product-table-toolbar';
import { useCreateProductMutation, useGetAllProductsQuery } from 'src/redux/store/services/api';
import { TabContext, TabPanel } from '@mui/lab';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Product from './product';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


export const activeTab = {
  color: '#0F1349',
  background: 'rgb(209, 255, 240)',
  border: '2px solid #1AF9B3',
};
export const nonActiveTab = {
  color: '#8688A3',
  background: 'rgb(245, 245, 248)',
};

// components


export const preparationTimeUnits = [
  {
    name: 'M',
    value: 'minuits'
  },
  {
    name: 'H',
    value: 'hours'
  },
]

export const selectionTypes = ['multiple' , 'single']


export const ProductSchema = Yup.object().shape({
  name: Yup.object().shape({
    en: Yup.string().required(),
    es: Yup.string().required(),
    fr: Yup.string().required(),
    tr: Yup.string().required(),
    ar: Yup.string().required(),
  }),
  description: Yup.object().shape({
    en: Yup.string().required(),
    es: Yup.string().required(),
    fr: Yup.string().required(),
    tr: Yup.string().required(),
    ar: Yup.string().required(),
  }),
  categoryId: Yup.string(),
  subcategoryId: Yup.string(),
  brandId: Yup.string(),
  sort: Yup.number(),
  preparationTime: Yup.number(),
  preparationTimeUnit: Yup.string(),
  ingredients: Yup.array().of(Yup.string()),
  seasons: Yup.array().of(Yup.string()),
  styles: Yup.array().of(Yup.string()),
  occasions: Yup.array().of(Yup.string()),
  fit: Yup.string(),
  calories: Yup.string(),
  price: Yup.number().required(),
  purcahsePrice: Yup.number(),
  purchaseLimit: Yup.number(),
  quantity: Yup.number(),
  barcode: Yup.string(),
  sku: Yup.string(),
  discountType: Yup.string(),
  discountValue: Yup.number(),
  varients: Yup.array().of(
    Yup.object().shape({
      groupName: Yup.object().shape({
        en: Yup.string().required(),
        ar: Yup.string().required(),
        tr: Yup.string().required(),
        es: Yup.string().required(),
        fr: Yup.string().required(),
        de: Yup.string().required(),
      }),
      selectionType: Yup.string(),
      required: Yup.boolean(),
      minimum: Yup.number(),
      maximum: Yup.number(),
      allowMoreQuantity: Yup.boolean(),
      varientRows: Yup.array().of(
        Yup.object().shape({
          name: Yup.object().shape({
            en: Yup.string().required(),
            ar: Yup.string().required(),
            tr: Yup.string().required(),
            es: Yup.string().required(),
            fr: Yup.string().required(),
            de: Yup.string().required(),
          }),
          price: Yup.number(),
          priceAfterDiscount: Yup.number(),
          sku: Yup.string(),
          barcode: Yup.string(),
          quantity: Yup.number(),
        })
      ).required(),
    })
  ),
  allBranches: Yup.boolean(),
  avalibleForMobile: Yup.boolean(),
  avalibleForWebsite: Yup.boolean(),
});


export default function OrdersListView() {
  const settings = useSettingsContext();
  const selectedDomain = useSelector((state: RootState) => state?.selectedDomain?.data)
  const categoryState = useSelector((state: RootState) => state.category);
  const brandState = useSelector((state: RootState) => state.brands);
  const { enqueueSnackbar } = useSnackbar();
  const getAllProductsRes = useGetAllProductsQuery(selectedDomain?.domain)
  const [addProductReq, addProductRes] = useCreateProductMutation()
  const [createProductSections, setcreateProductSections] = useState(0)
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [productData, setProductData] = useState<any>(null)
  const [ingrediants, setIngrediants] = useState([0])
  const [seasons, setSeason] = useState([0])
  const [styles, setStyles] = useState([0])
  const [occasion, setOccasion] = useState([0])
  const [variants, setVariants] = useState([0])
  const [variantsRows, setVariantsRow] = useState([0])

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      name: {
        en: '',
        es: '',
        fr: '',
        tr: '',
        ar: '',
      },
      description: {
        en: '',
        es: '',
        fr: '',
        tr: '',
        ar: '',
      },
      categoryId: '',
      subcategoryId: '',
      quantity: 0,
      brandId: '',
      sort: 0, // assuming sort starts from 0 or any number you prefer
      preparationTime: 0, // assuming default preparation time as 0
      preparationTimeUnit: '', // specify default unit if there's one
      ingredients: [], // empty array indicating no default ingredients
      seasons: [], // similarly, an empty array for seasons
      styles: [],
      occasions: [],
      fit: '',
      calories: '',
      price: 0, // assuming default price as 0 or any minimum value
      purcahsePrice: 0, // assuming default purchase price as 0 or any minimum value
      purchaseLimit: 0, // assuming no limit by default
      barcode: '',
      sku: '',
      discountType: '',
      discountValue: 0,
      varients: [
        // if you expect a default variant, specify it here following the schema's structure
        // otherwise, leave it as an empty array
      ],
      allBranches: false,
      avalibleForMobile: false,
      avalibleForWebsite: false,
    }
  });


  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    watch,
    setValue
  } = methods;

  const selectedDiscountType = watch('discountType');

  const onSubmit = async () => {
    const data = getValues()
    const formData = new FormData()
    productData?.images?.forEach((el:any , index:number) => {
      formData.append(`images`, el as any)
    })
    selectedDomain?.appLanguage?.forEach((el: string) => {
      formData.append(`title[${el}]`, data.name[el as keyof typeof data.name])
      formData.append(`description[${el}]`, data.description[el as keyof typeof data.description])
    })
    if (data.categoryId) {
      formData.append('categoryId', data.categoryId)
    }
    if (data.subcategoryId) {
      formData.append('subcategoryId', data.subcategoryId)
    }
    if (data.brandId) {
      formData.append('brandId', data.brandId)
    }
    formData.append('sort', `${data.sort}`)
    formData.append('preparationTime', `${data.preparationTime}`)
    formData.append('preparationTimeUnit', `${data.preparationTimeUnit}`)
    data.ingredients?.forEach((el: any, index: any) => {
      formData.append(`ingredients[${index}]`, `${el}`)
    })
    data.seasons?.forEach((el: any, index: any) => {
      formData.append(`season[${index}]`, `${el}`)
    })
    data.styles?.forEach((el: any, index: any) => {
      formData.append(`style[${index}]`, `${el}`)
    })
    data.occasions?.forEach((el: any, index: any) => {
      formData.append(`occasion[${index}]`, `${el}`)
    })
    formData.append(`quantity`, `${data.quantity}`)
    formData.append(`sellPrice`, `${data.price}`)
    formData.append(`purchasePrice`, `${data.purcahsePrice}`)
    formData.append(`purchaseLimit`, `${data.purchaseLimit}`)
    formData.append(`barcode`, `${data.barcode}`)
    formData.append(`sku`, `${data.sku}`)
    formData.append(`discountType`, `${data.discountType}`)
    formData.append(`discountValue`, `${data.discountValue}`)
    formData.append(`isAvailableOnAllBranhces`, `${data.allBranches}`)
    formData.append(`publish_app`, `${data.avalibleForMobile}`)
    formData.append(`publish_website`, `${data.avalibleForWebsite}`)
    data.varients?.forEach((el: any, index: any) => {
      formData.append(`varients[${index}]`, JSON.stringify(el))
    })

    await addProductReq({ domain: selectedDomain?.domain, data: formData }).unwrap().then(() => {
      reset()
      setOpenCreateProduct(false)
      setcreateProductSections(0)
      setProductData(null)
    })
  };


  const handleNextInputs = async () => {
    setcreateProductSections(prev => prev + 1)
  }

  const handleAddImage = (acceptedFiles: any) => {
    // Assuming productData.images is an array of the current images
    const currentImageCount = productData?.images?.length || 0;
    const maxFilesAllowed = 5;
    const availableSlots = maxFilesAllowed - currentImageCount;

    if (acceptedFiles.length > availableSlots) {
      enqueueSnackbar('Cannot Add More Than 5 images !', { variant: 'error' });
      acceptedFiles = acceptedFiles.slice(0, availableSlots);
    }
    setProductData((prevData: any) => ({
      ...prevData,
      images: [...(prevData?.images || []), ...acceptedFiles],
    }));
  };
  const deleteImage = (imageIndex: any) => {
    setProductData((prevData: any) => {
      const filteredImages = prevData.images.filter((_: any, index: any) => index !== imageIndex);
      return {
        ...prevData,
        images: filteredImages,
      };
    });
  };



  const renderDetails = () => {
    switch (createProductSections) {
      case 0:
        return <>
          {selectedDomain?.appLanguage?.map((el: string) =>
            <>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Product Name ({el.toUpperCase()})
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`name.${el}`}
              />
            </>

          )}

          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Upload Product Images
          </Typography>

          <Box mt="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {productData?.images.map((file: any, ind: any) => {
              return (
                <Box key={ind}>
                  <Box
                    sx={{
                      width: '100px',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      flexDirection: 'column',
                      border: '1px dashed rgb(134, 136, 163,.5)',
                      borderRadius: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        typeof file === 'string'
                          ? file
                          : URL.createObjectURL(file as any)
                      }
                      alt=""
                      sx={{ maxHeight: '95px' }}
                    />
                    <Box
                      onClick={() => deleteImage(ind)}
                      sx={{
                        backgroundColor: 'rgb(134, 136, 163,.09)',
                        padding: '10px 11px 7px 11px',
                        borderRadius: '36px',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                    >
                      <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <UploadBox
              sx={{
                width: '100px!important',
                height: '100px!important',
                textAlign: 'center',
                padding: '20px',
              }}
              onDrop={handleAddImage}
              maxFiles={5 - productData?.images?.length}
              maxSize={5242880}
              accept={{
                'image/jpeg': [],
                'image/png': [],
              }}
              disabled={productData?.images?.length === 5}
              placeholder={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    flexDirection: 'column',
                  }}
                >
                  <Iconify icon="system-uicons:picture" style={{ color: '#8688A3' }} />
                  <span style={{ color: '#8688A3', fontSize: '.6rem' }}>
                    Upload Image
                  </span>
                </Box>
              }
            />
          </Box>

          {selectedDomain?.appLanguage?.map((el: string) =>
            <>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Product Description ({el.toUpperCase()})
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`description.${el}`}
                multiline
                rows={5}
              />
            </>
          )}
          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Category
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            name="categoryId"
            id="demo-simple-select2"
          >
            {categoryState.list.map((cat: any, index: any) => (
              <MenuItem key={index} value={cat._id}>
                {cat?.name?.en || cat?.name || ''}
              </MenuItem>
            ))}
          </RHFSelect>

          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Sub-Category
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            id="demo-simple-select"
            name="subcategoryId"
          >
            {categoryState.subCatList.map((item: any, ind: any) => (
              <MenuItem key={ind} value={item._id}>
                {item?.name?.en || item?.name || ''}
              </MenuItem>
            ))}
          </RHFSelect>

          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Brand
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            name="brandId"
            id="demo-simple-brand"
          >
            {brandState?.list && brandState.list?.map((brandObj: any) => (
              <MenuItem key={brandObj._id} value={brandObj._id}>{brandObj.name.localized}</MenuItem>
            ))}
          </RHFSelect>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Sort
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name='sort'
            type='number'
          />
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Preperation Time
          </Typography>
          <Box sx={{ display: 'flex', gap: '3px' }}>
            <RHFTextField
              variant="filled"
              name='preparationTime'
              type='number'
              fullWidth
            />
            <RHFSelect
              variant="filled"
              name="preparationTimeUnit"
              id="demo-simple-brand"
              sx={{ width: '30%' }}
            >
              {preparationTimeUnits?.map((unit: any) => (
                <MenuItem key={unit.value} value={unit.value}>{unit.name}</MenuItem>
              ))}
            </RHFSelect>
          </Box>
          {/* Ingredients */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Ingredients
            </Typography>
            <IconButton onClick={() => setIngrediants(prev => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {ingrediants.map(el =>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <RHFTextField
                variant="filled"
                name={`ingredients[${el}]`}
                fullWidth
              />
              <IconButton onClick={() => setIngrediants(prev => prev.filter(ingrediant => ingrediant !== el))}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {/* Seasons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Seasons
            </Typography>
            <IconButton onClick={() => setSeason(prev => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {seasons.map(el =>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <RHFTextField
                variant="filled"
                name={`seasons[${el}]`}
                fullWidth
              />
              <IconButton onClick={() => setSeason(prev => prev.filter(season => season !== el))}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {/* styles */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Styles
            </Typography>
            <IconButton onClick={() => setStyles(prev => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {styles.map(el =>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <RHFTextField
                variant="filled"
                name={`styles[${el}]`}
                fullWidth
              />
              <IconButton onClick={() => setStyles(prev => prev.filter(style => style !== el))}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {/* occasion */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Occasions
            </Typography>
            <IconButton onClick={() => setOccasion(prev => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {occasion.map(el =>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <RHFTextField
                variant="filled"
                name={`occasions[${el}]`}
                fullWidth
              />
              <IconButton onClick={() => setOccasion(prev => prev.filter(occasion => occasion !== el))}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Fit
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name={`fit`}
          />
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Calories
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name={`calories`}
          />
        </>
      case 1:
        return <>
          <Typography
            mt="20px"
            mb="5px"
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
          />

          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Purcahse Price
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name="purcahsePrice"
            type='number'
          />
          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Purchase limit
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name="purchaseLimit"
            type='number'
          />
          <Typography
            mt="20px"
            mb="5px"
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
            name="barcode"
          />
          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Sku
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name="sku"
          />
          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Discount
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name="discountValue"
            type='number'
          />
          <Grid
            container
            mt="20px"
            columnSpacing="20px"
            pb="5px"
            alignItems="flex-end"
            rowGap="20px"
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '.9rem',
                  borderRadius: '16px',
                  fontWeight: 800,
                  cursor: "pointer",
                  ...(selectedDiscountType === 'fixed_amount' ? activeTab : nonActiveTab),

                }}
                onClick={(e) => setValue('discountType', 'fixed_amount')}
              >
                Fixed Amount
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: '100%',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '.9rem',
                  borderRadius: '16px',
                  fontWeight: 800,
                  cursor: "pointer",
                  ...(selectedDiscountType === 'percentage' ? activeTab : nonActiveTab),

                }}
                onClick={(e) => setValue('discountType', "percentage")}
              >
                Percentage
              </Box>
            </Grid>
          </Grid>
          <Typography
            mt="20px"
            mb="5px"
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            Quantity
          </Typography>
          <RHFTextField
            type="number"
            fullWidth
            variant="filled"
            name="quantity"
          />
        </>
      case 2:
        return <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Variants
            </Typography>
            <IconButton onClick={() => setVariants(prev => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {variants.map(variant => <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Variant {variant + 1}
              </Typography>
              <IconButton onClick={() => setVariants(prev => prev.filter(element => element !== variant))}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {selectedDomain?.appLanguage?.map((el: string) =>
              <>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                >
                  Group Name ({el.toUpperCase()})
                </Typography>
                <RHFTextField
                  fullWidth
                  variant="filled"
                  name={`varients[${variant}].groupName.${el}`}
                />
              </>
            )}
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Selection Type
            </Typography>
            <RHFSelect
              variant="filled"
              name={`varients[${variant}].selectionType`}
              id="demo-simple-brand"
              fullWidth
            >
              {selectionTypes?.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit.toUpperCase()}</MenuItem>
              ))}
            </RHFSelect>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Minimum
            </Typography>
            <RHFTextField
              fullWidth
              variant="filled"
              name={`varients[${variant}].minimum`}
              type='number'
            />
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Maximum
            </Typography>
            <RHFTextField
              fullWidth
              variant="filled"
              name={`varients[${variant}].maximum`}
              type='number'
            />
            <RHFCheckbox
              name={`varients[${variant}].required`}
              label="Required" // Assuming your RHFCheckbox supports a label prop
            />
            <RHFCheckbox
              name={`varients[${variant}].allowMoreQuantity`}
              label="Allow More Quantity" // Assuming your RHFCheckbox supports a label prop
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Variants Rows
              </Typography>
              <IconButton onClick={() => setVariantsRow(prev => [...prev, prev.length])}>
                <AddIcon />
              </IconButton>
            </Box>
            {variantsRows.map(row => <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                >
                  Row {row + 1}
                </Typography>
                <IconButton onClick={() => setVariantsRow(prev => prev.filter(element => element !== row))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              {selectedDomain?.appLanguage?.map((el: string) =>
                <>
                  <Typography
                    component="p"
                    noWrap
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
                  >
                    Variant Name ({el.toUpperCase()})
                  </Typography>
                  <RHFTextField
                    fullWidth
                    variant="filled"
                    name={`varients[${variant}].varientRows[${row}].name.${el}`}
                  />
                </>
              )}
              <Typography
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
                name={`varients[${variant}].varientRows[${row}].price`}
                type='number'
              />
              <Typography
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
                name={`varients[${variant}].varientRows[${row}].priceAfterDiscount`}
                type='number'
              />
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Quantity
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].quantity`}
                type='number'
              />
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                Sku
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].sku`}
              />
              <Typography
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
                name={`varients[${variant}].varientRows[${row}].barcode`}
              />
            </>)}
          </>)}
        </>
      case 3:
        return <>
          <RHFCheckbox
            name={`allBranches`}
            label="Avalible for All Branches" // Assuming your RHFCheckbox supports a label prop
          />
        </>
      case 4:
        return <>
          <RHFCheckbox
            name={`avalibleForMobile`}
            label="Avalible for Mobile"
          />
          <RHFCheckbox
            name={`avalibleForWebsite`}
            label="Avalible for Website"
          />
        </>
      default:
        return null;
    }
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoleBasedGuard hasContent permission="GET_PRODUCTS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Products" crums={false} />
          </Grid>
          <RoleBasedGuard permission="CREATE_PRODUCT">
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
                    onClick={() => setOpenCreateProduct(true)}
                  >
                    Add New Product
                  </Button>
                </Stack>
              </BottomActions>
            </Grid>
          </RoleBasedGuard>

          <Grid item xs={12}>
            <Box mt="20px">
              <ProductTableToolbar
                sort={true}
                setSort={() => { }}
                query={''}
                setQuery={() => { }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TabContext value={'All'}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    variant="scrollable"
                    scrollButtons={false}
                    onChange={handleChangeTab}
                    sx={{
                      px: 2.5,
                      boxShadow: (theme) =>
                        `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    <Tab
                      iconPosition="end"
                      value="All"
                      label="All Products"
                      icon={
                        <Label
                          variant={(value === 'All' && 'filled') || 'outlined'}
                          color="primary"
                        >
                          {productsLength}
                        </Label>
                      }
                    />
                    {categoryState.list.map((categoryObj: any) => (
                      <Tab
                        key={categoryObj._id}
                        iconPosition="end"
                        value={categoryObj._id}
                        label={categoryObj?.name?.en || ''}
                        icon={
                          <Label
                            variant={(categoryObj._id === value && 'filled') || 'outlined'}
                            color="primary"
                          >
                            {
                              list.filter((product: any) => product.categoryId === categoryObj._id)
                                .length
                            }
                          </Label>
                        }
                      />
                    ))}
                  </TabList>
                </Box> */}

                <TabPanel value={'All'} sx={{ px: 0, minHeight: '50vh' }}>
                  <DragDropContext onDragEnd={() => { }}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <Grid
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          container
                          spacing={2}
                        >
                          {/* DND START */}
                          {getAllProductsRes?.data?.data?.data?.map((product: any, indx: any) => (
                            <Product product={product} indx={indx} key={indx} />
                          ))}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                </TabPanel>
                {/* {Math.ceil(productsLength / pageSize) !== 1 && (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <NavigatorBar
                      pageSize={pageSize}
                      itemsLength={productsLength}
                      setPageNumber={setPageNumber}
                    />
                  </Box>
                )} */}
              </TabContext>
            </Box>
          </Grid>

        </Grid>
        {/* products */}
        <DetailsNavBar
          open={openCreateProduct}
          onClose={() => setOpenCreateProduct(false)}
          title={'Add New Product'}
          actions={
            <Stack alignItems="center" justifyContent="center" spacing="10px">
              {createProductSections !== 4 ? (
                // Render only the "Next" button for the first section
                <>
                  <LoadingButton
                    fullWidth
                    variant="soft"
                    color="success"
                    size="large"
                    loading={isSubmitting}
                    onClick={handleNextInputs}
                    sx={{ borderRadius: '30px' }}
                  >
                    Next
                  </LoadingButton>
                  {createProductSections > 0 && <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => setcreateProductSections(prev => prev - 1)} // Adjust this function as needed to go back to the first section
                    sx={{ borderRadius: '30px', marginLeft: '10px' }}
                  >
                    Back
                  </Button>}
                </>
              ) : (
                // Render "Submit/Update" and "Back" buttons for other sections
                <>
                  <LoadingButton
                    fullWidth
                    variant="soft"
                    color="success"
                    size="large"
                    loading={isSubmitting}
                    onClick={onSubmit}
                    sx={{ borderRadius: '30px' }}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => setcreateProductSections(prev => prev - 1)} // Adjust this function as needed to go back to the first section
                    sx={{ borderRadius: '30px', marginLeft: '10px' }}
                  >
                    Back
                  </Button>
                </>
              )}
            </Stack>
          }
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Divider flexItem />
            <Box width="100%">
              {renderDetails()}
            </Box>
          </FormProvider>
        </DetailsNavBar>
        {/* <ConfirmDialog
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
              onClick={removeProductFun}
              sx={{ borderRadius: '30px' }}
            >
              Delete
            </Button>
          }
        /> */}
      </RoleBasedGuard>
    </Container>
  );
}
