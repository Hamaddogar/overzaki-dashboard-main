import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import Iconify from 'src/components/iconify/iconify';
import Link from 'next/link';
import { Draggable } from '@hello-pangea/dnd';


const Product = ({ product, indx }: any) => {
    return (
        <Draggable index={indx} draggableId={indx.toString()}>
            {(provided: any) => (
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
                                        <Iconify
                                            icon="mdi:pen-plus"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Link>
                                    &nbsp; &nbsp;
                                    <Iconify
                                        icon="carbon:delete"
                                        onClick={() => {

                                        }}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    &nbsp; &nbsp;
                                    <Iconify
                                        icon="bx:edit"
                                        onClick={() => { }}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </Draggable>
    )
}

export default Product