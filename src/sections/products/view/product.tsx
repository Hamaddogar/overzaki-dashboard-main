import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import Link from 'next/link';
import { Draggable } from '@hello-pangea/dnd';
import DetailsNavBar from '../DetailsNavBar';
import { LoadingButton } from '@mui/lab';
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import {
  ProductSchema,
  activeTab,
  nonActiveTab,
  preparationTimeUnits,
  selectionTypes,
} from './products-view';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import { UploadBox } from 'src/components/upload';
import FormProvider from 'src/components/hook-form/form-provider';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProductQuery, useUpdateProductMutation } from 'src/redux/store/services/api';
import { useDispatch } from 'react-redux';
import { fetchCategorysList, fetchSubCategorysList } from 'src/redux/store/thunks/category';

const Product = ({ product, indx }: any) => {
  const categoryState = useSelector((state: RootState) => state.category);
  const brandState = useSelector((state: RootState) => state.brands);
  const selectedDomain = useSelector((state: RootState) => state?.selectedDomain?.data);
  const [updateProductReq, updateProductRes] = useUpdateProductMutation();
  const productDetails = useGetProductQuery({ domain: selectedDomain?.domain, id: product?._id })
    .data?.data;
  const [productData, setProductData] = useState<any>(productDetails);
  const [openEditProduct, setopenEditProduct] = useState(false);
  const [updateProductSections, setupdateProductSections] = useState(0);
  const [ingrediants, setIngrediants] = useState<string[]>(product?.ingredients);
  const [seasons, setSeason] = useState<string[]>(product?.season);
  const [styles, setStyles] = useState<string[]>(product?.style);
  const [occasion, setOccasion] = useState<string[]>(product?.occasion);
  const dispatch = useDispatch();
  const [listItems, setListItems] = useState([]);
  const [categoriesLength, setCategoriesLength] = useState<number>(0);
  const pageSize: number = 5;
  const pageNumber: number = 1;
  // const [variants, setVariants] = useState([0])
  // const [variantsRows, setVariantsRow] = useState([0])
  const loadStatus = useSelector((state: any) => state.category.status);
  const { list, subCatList, error, category, subCategory } = useSelector(
    (state: any) => state.category
  );

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
        setCategoriesLength(response.payload.data.count);
        setListItems(response.payload.data.data);
        dispatch(fetchSubCategorysList(error));
      });
    }
  }, [loadStatus, dispatch, pageNumber]);

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      name: productData?.title, // Assuming title matches the name structure
      description: productData?.description,
      sort: productData?.sort,
      preparationTime: productData?.preparationTime,
      preparationTimeUnit: productData?.preparationTimeUnit,
      ingredients: productData?.ingredients,
      seasons: productData?.season,
      styles: productData?.style,
      occasions: productData?.occasion,
      price: productData?.sellPrice,
      purcahsePrice: productData?.purchasePrice,
      purchaseLimit: productData?.purchaseLimit,
      quantity: productData?.quantity,
      barcode: productData?.barcode,
      sku: productData?.sku,
      discountType: productData?.discountType,
      discountValue: productData?.discountValue,
      allBranches: productData?.isAvailableOnAllBranhces,
      avalibleForMobile: productData?.publish_app,
      avalibleForWebsite: productData?.publish_website,
      categoryId: productData?.categoryId?._id,
      brandId: productData?.brandId?._id,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    watch,
    setValue,
    control,
  } = methods;

  useEffect(() => {
    setProductData(productDetails);
    reset({
      name: productDetails?.title, // Assuming title matches the name structure
      description: productDetails?.description,
      // Add other fields from productData as needed, mapping them to the form structure
      sort: productDetails?.sort,
      preparationTime: productDetails?.preparationTime,
      preparationTimeUnit: productDetails?.preparationTimeUnit,
      ingredients: productDetails?.ingredients,
      seasons: productDetails?.season,
      styles: productDetails?.style,
      occasions: productDetails?.occasion,
      // Note: Ensure every field in your form that expects a value has a corresponding default value
      price: productDetails?.sellPrice,
      purcahsePrice: productDetails?.purchasePrice,
      purchaseLimit: productDetails?.purchaseLimit,
      quantity: productDetails?.quantity,
      barcode: productDetails?.barcode,
      sku: productDetails?.sku,
      discountType: productDetails?.discountType,
      discountValue: productDetails?.discountValue,
      allBranches: productDetails?.isAvailableOnAllBranhces,
      avalibleForMobile: productDetails?.publish_app,
      avalibleForWebsite: productDetails?.publish_website,
    });
  }, [productDetails, reset]);
  const selectedDiscountType = watch('discountType');

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
  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    productData?.images?.forEach((el: any, index: number) => {
      formData.append(`images`, el as any);
    });
    selectedDomain?.appLanguage?.forEach((el: string) => {
      formData.append(`title[${el}]`, data.name[el as keyof typeof data.name]);
      formData.append(`description[${el}]`, data.description[el as keyof typeof data.description]);
    });
    if (data.categoryId) {
      formData.append('categoryId', data.categoryId);
    }
    if (data.subcategoryId) {
      formData.append('subcategoryId', data.subcategoryId);
    }
    if (data.brandId) {
      formData.append('brandId', data.brandId);
    }
    formData.append('sort', `${data.sort}`);
    formData.append('preparationTime', `${data.preparationTime}`);
    formData.append('preparationTimeUnit', `${data.preparationTimeUnit}`);
    data.ingredients?.forEach((el: any, index: any) => {
      formData.append(`ingredients[${index}]`, `${el}`);
    });
    data.seasons?.forEach((el: any, index: any) => {
      formData.append(`season[${index}]`, `${el}`);
    });
    data.styles?.forEach((el: any, index: any) => {
      formData.append(`style[${index}]`, `${el}`);
    });
    data.occasions?.forEach((el: any, index: any) => {
      formData.append(`occasion[${index}]`, `${el}`);
    });
    formData.append(`quantity`, `${data.quantity}`);
    formData.append(`sellPrice`, `${data.price}`);
    formData.append(`purchasePrice`, `${data.purcahsePrice}`);
    formData.append(`purchaseLimit`, `${data.purchaseLimit}`);
    formData.append(`barcode`, `${data.barcode}`);
    formData.append(`sku`, `${data.sku}`);
    formData.append(`discountType`, `${data.discountType}`);
    formData.append(`discountValue`, `${data.discountValue}`);
    formData.append(`isAvailableOnAllBranhces`, `${data.allBranches}`);
    formData.append(`publish_app`, `${data.avalibleForMobile}`);
    formData.append(`publish_website`, `${data.avalibleForWebsite}`);
    data.varients?.forEach((el: any, index: any) => {
      formData.append(`varients[${index}]`, JSON.stringify(el));
    });
    await updateProductReq({ id: product?._id, data: formData, domain: selectedDomain?.domain })
      .unwrap()
      .then(() => {
        setopenEditProduct(false);
        setupdateProductSections(0);
        reset();
        setProductData(productDetails);
      });
  };

  const handleNextInputs = async () => {
    setupdateProductSections((prev) => prev + 1);
  };

  const renderDetails = () => {
    switch (updateProductSections) {
      case 0:
        return (
          <>
            {selectedDomain?.appLanguage?.map((el: string) => (
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
                  defaultValue={productData?.name?.[el] || productData?.title?.[el]}
                />
              </>
            ))}

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
                        src={typeof file === 'string' ? file : URL.createObjectURL(file as any)}
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
                    <span style={{ color: '#8688A3', fontSize: '.6rem' }}>Upload Image</span>
                  </Box>
                }
              />
            </Box>

            {selectedDomain?.appLanguage?.map((el: string) => (
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
                  defaultValue={productData?.description[el]}
                />
              </>
            ))}
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
              defaultValue={productData?.categoryId}
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
              defaultValue={productData?.subCategoryId}
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
              defaultValue={productData?.brandId}
            >
              {brandState?.list &&
                brandState.list?.map((brandObj: any) => (
                  <MenuItem key={brandObj._id} value={brandObj._id}>
                    {brandObj.name.localized}
                  </MenuItem>
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
              name="sort"
              type="number"
              defaultValue={productData?.sort}
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
                name="preparationTime"
                type="number"
                fullWidth
                defaultValue={productData?.preparationTime}
              />
              <RHFSelect
                variant="filled"
                name="preparationTimeUnit"
                id="demo-simple-brand"
                sx={{ width: '30%' }}
                defaultValue={productData?.preparationTimeUnit}
              >
                {preparationTimeUnits?.map((unit: any) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.name}
                  </MenuItem>
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
              <IconButton onClick={() => setIngrediants((prev) => [...prev, ''])}>
                <AddIcon />
              </IconButton>
            </Box>
            {ingrediants.map((el, index) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <RHFTextField
                  variant="filled"
                  name={`ingredients[${index}]`}
                  fullWidth
                  defaultValue={el}
                />
                <IconButton
                  onClick={() =>
                    setIngrediants((prev) => prev.filter((ingrediant) => ingrediant !== el))
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
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
              <IconButton onClick={() => setSeason((prev) => [...prev, ''])}>
                <AddIcon />
              </IconButton>
            </Box>
            {seasons.map((el, index) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <RHFTextField
                  variant="filled"
                  name={`seasons[${index}]`}
                  fullWidth
                  defaultValue={el}
                />
                <IconButton
                  onClick={() => setSeason((prev) => prev.filter((season) => season !== el))}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
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
              <IconButton onClick={() => setStyles((prev) => [...prev, ''])}>
                <AddIcon />
              </IconButton>
            </Box>
            {styles.map((el, index) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <RHFTextField
                  variant="filled"
                  name={`styles[${index}]`}
                  fullWidth
                  defaultValue={el}
                />
                <IconButton
                  onClick={() => setStyles((prev) => prev.filter((style) => style !== el))}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
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
              <IconButton onClick={() => setOccasion((prev) => [...prev, ''])}>
                <AddIcon />
              </IconButton>
            </Box>
            {occasion.map((el, index) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <RHFTextField
                  variant="filled"
                  name={`occasions[${index}]`}
                  fullWidth
                  defaultValue={el}
                />
                <IconButton
                  onClick={() => setOccasion((prev) => prev.filter((occasion) => occasion !== el))}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Fit
            </Typography>
            <RHFTextField fullWidth variant="filled" name={`fit`} defaultValue={productData?.fit} />
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
              defaultValue={productData?.calories}
            />
          </>
        );
      case 1:
        return (
          <>
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
              type="number"
              fullWidth
              variant="filled"
              name="price"
              defaultValue={productData?.sellPrice}
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
              type="number"
              defaultValue={productData?.purchasePrice}
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
              type="number"
              defaultValue={productData?.purchaseLimit}
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
              defaultValue={productData?.barcode}
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
            <RHFTextField fullWidth variant="filled" name="sku" defaultValue={productData?.sku} />
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
              type="number"
              defaultValue={productData?.discountValue}
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
                    cursor: 'pointer',
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
                    cursor: 'pointer',
                    ...(selectedDiscountType === 'percentage' ? activeTab : nonActiveTab),
                  }}
                  onClick={(e) => setValue('discountType', 'percentage')}
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
              defaultValue={productData?.quantity}
            />
          </>
        );
      // case 2:
      //     return <>
      //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      //             <Typography
      //                 component="p"
      //                 noWrap
      //                 variant="subtitle2"
      //                 sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //             >
      //                 Variants
      //             </Typography>
      //             <IconButton onClick={() => setVariants(prev => [...prev, prev.length])}>
      //                 <AddIcon />
      //             </IconButton>
      //         </Box>
      //         {variants.map(variant => <>
      //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Variant {variant + 1}
      //                 </Typography>
      //                 <IconButton onClick={() => setVariants(prev => prev.filter(element => element !== variant))}>
      //                     <DeleteIcon />
      //                 </IconButton>
      //             </Box>
      //             {selectedDomain?.appLanguage?.map((el: string) =>
      //                 <>
      //                     <Typography
      //                         component="p"
      //                         noWrap
      //                         variant="subtitle2"
      //                         sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                     >
      //                         Group Name ({el.toUpperCase()})
      //                     </Typography>
      //                     <RHFTextField
      //                         fullWidth
      //                         variant="filled"
      //                         name={`varients[${variant}].groupName.${el}`}
      //                     />
      //                 </>
      //             )}
      //             <Typography
      //                 component="p"
      //                 noWrap
      //                 variant="subtitle2"
      //                 sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //             >
      //                 Selection Type
      //             </Typography>
      //             <RHFSelect
      //                 variant="filled"
      //                 name={`varients[${variant}].selectionType`}
      //                 id="demo-simple-brand"
      //                 fullWidth
      //             >
      //                 {selectionTypes?.map((unit) => (
      //                     <MenuItem key={unit} value={unit}>{unit.toUpperCase()}</MenuItem>
      //                 ))}
      //             </RHFSelect>
      //             <Typography
      //                 component="p"
      //                 noWrap
      //                 variant="subtitle2"
      //                 sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //             >
      //                 Minimum
      //             </Typography>
      //             <RHFTextField
      //                 fullWidth
      //                 variant="filled"
      //                 name={`varients[${variant}].minimum`}
      //                 type='number'
      //             />
      //             <Typography
      //                 component="p"
      //                 noWrap
      //                 variant="subtitle2"
      //                 sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //             >
      //                 Maximum
      //             </Typography>
      //             <RHFTextField
      //                 fullWidth
      //                 variant="filled"
      //                 name={`varients[${variant}].maximum`}
      //                 type='number'
      //             />
      //             <RHFCheckbox
      //                 name={`varients[${variant}].required`}
      //                 label="Required" // Assuming your RHFCheckbox supports a label prop
      //             />
      //             <RHFCheckbox
      //                 name={`varients[${variant}].allowMoreQuantity`}
      //                 label="Allow More Quantity" // Assuming your RHFCheckbox supports a label prop
      //             />
      //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Variants Rows
      //                 </Typography>
      //                 <IconButton onClick={() => setVariantsRow(prev => [...prev, prev.length])}>
      //                     <AddIcon />
      //                 </IconButton>
      //             </Box>
      //             {variantsRows.map(row => <>
      //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      //                     <Typography
      //                         component="p"
      //                         noWrap
      //                         variant="subtitle2"
      //                         sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                     >
      //                         Row {row + 1}
      //                     </Typography>
      //                     <IconButton onClick={() => setVariantsRow(prev => prev.filter(element => element !== row))}>
      //                         <DeleteIcon />
      //                     </IconButton>
      //                 </Box>
      //                 {selectedDomain?.appLanguage?.map((el: string) =>
      //                     <>
      //                         <Typography
      //                             component="p"
      //                             noWrap
      //                             variant="subtitle2"
      //                             sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                         >
      //                             Variant Name ({el.toUpperCase()})
      //                         </Typography>
      //                         <RHFTextField
      //                             fullWidth
      //                             variant="filled"
      //                             name={`varients[${variant}].varientRows[${row}].name.${el}`}
      //                         />
      //                     </>
      //                 )}
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Price
      //                 </Typography>
      //                 <RHFTextField
      //                     fullWidth
      //                     variant="filled"
      //                     name={`varients[${variant}].varientRows[${row}].price`}
      //                     type='number'
      //                 />
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Price After Discount
      //                 </Typography>
      //                 <RHFTextField
      //                     fullWidth
      //                     variant="filled"
      //                     name={`varients[${variant}].varientRows[${row}].priceAfterDiscount`}
      //                     type='number'
      //                 />
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Quantity
      //                 </Typography>
      //                 <RHFTextField
      //                     fullWidth
      //                     variant="filled"
      //                     name={`varients[${variant}].varientRows[${row}].quantity`}
      //                     type='number'
      //                 />
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Sku
      //                 </Typography>
      //                 <RHFTextField
      //                     fullWidth
      //                     variant="filled"
      //                     name={`varients[${variant}].varientRows[${row}].sku`}
      //                 />
      //                 <Typography
      //                     component="p"
      //                     noWrap
      //                     variant="subtitle2"
      //                     sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      //                 >
      //                     Barcode
      //                 </Typography>
      //                 <RHFTextField
      //                     fullWidth
      //                     variant="filled"
      //                     name={`varients[${variant}].varientRows[${row}].barcode`}
      //                 />
      //             </>)}
      //         </>)}
      //     </>
      case 2:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Controller
              name="allBranches"
              control={control}
              defaultValue={productData?.isAvailableOnAllBranhces} // Default state of the switch
              render={({ field }: any) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e: any) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Typography>Avalible For All Branches</Typography>
          </Box>
        );
      case 3:
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Controller
                name="avalibleForMobile"
                control={control}
                defaultValue={productData?.publish_app} // Default state of the switch
                render={({ field }: any) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e: any) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <Typography>Avalible for Mobile</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Controller
                name="avalibleForWebsite"
                control={control}
                defaultValue={productData?.publish_website} // Default state of the switch
                render={({ field }: any) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e: any) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <Typography>Avalible for Website</Typography>
            </Box>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Draggable index={indx} draggableId={indx.toString()}>
        {(provided: any) => (
          <Grid {...provided.draggableProps} ref={provided.innerRef} item xs={12}>
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
                    <Box
                      component="img"
                      src={product?.images[0]}
                      alt=" "
                      width="60px"
                      height="60px"
                    />
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
                        {product?.name?.en || product?.title?.en}
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
                        {product?.category}
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
                      {product?.price || product?.sellPrice} KWD
                    </Typography>
                    <Link href={`/dashboard/products/${product?._id}`}>
                      <Iconify icon="mdi:pen-plus" style={{ cursor: 'pointer' }} />
                    </Link>
                    &nbsp; &nbsp;
                    <Iconify
                      icon="carbon:delete"
                      onClick={() => {}}
                      style={{ cursor: 'pointer' }}
                    />
                    &nbsp; &nbsp;
                    <Iconify
                      icon="bx:edit"
                      onClick={() => setopenEditProduct(true)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Draggable>
      <DetailsNavBar
        open={openEditProduct}
        onClose={() => {
          setopenEditProduct(false);
          setProductData(productDetails);
        }}
        title={'Edit Product'}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            {updateProductSections !== 3 ? (
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
                {updateProductSections > 0 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => setupdateProductSections((prev) => prev - 1)} // Adjust this function as needed to go back to the first section
                    sx={{ borderRadius: '30px', marginLeft: '10px' }}
                  >
                    Back
                  </Button>
                )}
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
                  onClick={() => setupdateProductSections((prev) => prev - 1)} // Adjust this function as needed to go back to the first section
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
          <Box width="100%">{renderDetails()}</Box>
        </FormProvider>
      </DetailsNavBar>
    </>
  );
};

export default Product;
