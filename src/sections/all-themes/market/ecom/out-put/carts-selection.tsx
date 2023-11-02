
import React from 'react';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';


// ----------------------------------------------------------------------

interface CartsProps {
    themeConfig: {
        cart: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

const dataCart = [
    {
        name: 'Cart 1',
        checked: false,
        icon: '/raw/cart3.svg'
    }, {
        name: 'Cart 2',
        checked: true,
        icon: '/raw/cart1.svg'
    }, {
        name: 'Cart 3',
        checked: false,
        icon: '/raw/cart2.svg'
    }, {
        name: 'Cart 4',
        checked: false,
        icon: '/raw/cart4.svg'
    },
];

export default function CartsDealer({ themeConfig, handleThemeConfig, mobile = false }: CartsProps) {

    return (
        <div>
            {mobile ?
                <Box pt='20px'>
                    <RadioGroup
                        aria-labelledby="cart-buttons-group-label"
                        defaultValue={themeConfig.cart}
                        onChange={event => handleThemeConfig('cart', event.target.value)}
                        name="cart-buttons-group"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            flexWrap: 'nowrap'
                        }}
                    >
                        {
                            dataCart.map((cart, indx) => (
                                <FormControlLabel key={indx} value={cart.icon} control={<Radio checked={cart.icon === themeConfig.cart} sx={{ display: 'none' }} size='medium' />} label={
                                    <Stack alignItems='center' spacing='10px'>
                                        <Stack alignItems='center' justifyContent='center' sx={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "12px",
                                            background: cart.icon === themeConfig.cart ? "#1BFBB6" : '#F5F5F8',
                                            fontFamily: 'cursive'
                                        }}>
                                            <Box component='img' src={cart.icon} />
                                        </Stack>
                                        <Typography variant='button' noWrap color={cart.icon === themeConfig.cart ? '#0F1349' : '#8688A3'} >{cart.name}</Typography>
                                    </Stack>
                                } />
                            ))
                        }


                    </RadioGroup>
                </Box>
                :
                <Box pt='20px'>
                    <RadioGroup
                        aria-labelledby="cart-buttons-group-label"
                        defaultValue={themeConfig.cart}
                        onChange={event => handleThemeConfig('cart', event.target.value)}
                        name="cart-buttons-group"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        {
                            dataCart.map((cart, indx) => (
                                <FormControlLabel key={indx} value={cart.icon} control={<Radio checked={cart.icon === themeConfig.cart} size='medium' />} label={
                                    <Stack direction='row' alignItems='center' spacing='20px' ml='15px'>
                                        <Stack alignItems='center' justifyContent='center' sx={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "12px",
                                            background: cart.icon === themeConfig.cart ? "#1BFBB6" : '#F5F5F8',
                                        }}>
                                            <Box component='img' src={cart.icon} />
                                        </Stack>
                                        <Typography variant='button' color={cart.icon === themeConfig.cart ? '#0F1349' : '#8688A3'} >{cart.name}</Typography>
                                    </Stack>
                                } />
                            ))
                        }


                    </RadioGroup>
                </Box>
            }
        </div>
    )
};