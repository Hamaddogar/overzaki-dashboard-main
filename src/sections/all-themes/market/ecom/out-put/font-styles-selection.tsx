
import './view/view.css';
import { Stack, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// ----------------------------------------------------------------------

interface FontFamilyProps {
    themeConfig: {
        fontStyle: string;
        // Add other themeConfig properties as needed
    };
    handleThemeConfig: (key: string, value: any, parentClass: any) => void; // Adjust 'value' type as needed
    mobile?: boolean;
}

const dataFamlies = [
    {
        name: 'Cairo',
        familyName: "Cairo"
    }, {
        name: 'Avernir',
        familyName: "Avernir"
    }, {
        name: 'Almarai',
        familyName: "Almarai"
    }, {
        name: 'Times New Roman',
        familyName: "TimesNewRoman"
    }, {
        name: 'Poppins',
        familyName: "Poppins"
    }, {
        name: 'Montserrat',
        familyName: "Montserrat"
    }, {
        name: 'Algerian',
        familyName: "Algerian"
    },
];

export default function FontFamilyDealer({ themeConfig, handleThemeConfig, mobile = false }: FontFamilyProps) {

    return (
        <Box>
            {
                mobile ?
                    <RadioGroup
                        aria-labelledby="radio-buttons-font-family-group-label"
                        value={themeConfig?.fontStyle || null}
                        name="radio-buttons-font-family-group"
                        onChange={(event) => handleThemeConfig('fontStyle', event.target.value, 'css')}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            alignItems: 'center',
                            flexWrap: 'nowrap'
                        }}
                    >
                        {
                            dataFamlies.map((family, indx) => (
                                <FormControlLabel
                                    sx={{ fontFamily: family.familyName }} // Apply custom font here
                                    key={indx}
                                    value={family.familyName}
                                    control={<Radio checked={family.familyName === themeConfig.fontStyle} size='medium' sx={{ display: 'none' }} />}
                                    label={
                                        <Stack alignItems='center' spacing='10px'>
                                            <Stack alignItems='center' justifyContent='center' sx={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "12px",
                                                background: family.familyName === themeConfig.fontStyle ? "#1BFBB6" : '#F5F5F8',
                                            }}>
                                                <Typography sx={{ fontFamily: family.familyName, fontWeight: 900 }} variant='h6'>Aa</Typography>
                                            </Stack>
                                            <Typography variant='button' noWrap color={family.familyName === themeConfig.fontStyle ? '#0F1349' : '#8688A3'} >{family.name}</Typography>
                                        </Stack>
                                    } />
                            ))
                        }


                    </RadioGroup>
                    :

                    <RadioGroup
                        aria-labelledby="radio-buttons-font-family-group-label"
                        value={themeConfig?.fontStyle}
                        name="radio-buttons-font-family-group"
                        onChange={(event) => handleThemeConfig('fontStyle', event.target.value, 'css')}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        {dataFamlies.map((family, indx) => (
                            <FormControlLabel
                                sx={{ fontFamily: family.familyName }} // Apply custom font here
                                key={indx}
                                value={family.familyName}
                                control={<Radio checked={family.familyName === themeConfig.fontStyle} size='medium' />}
                                label={
                                    <Stack direction='row' alignItems='center' spacing='20px' ml='15px'>
                                        <Stack
                                            alignItems='center'
                                            justifyContent='center'
                                            sx={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "12px",
                                                background: family.familyName === themeConfig.fontStyle ? "#1BFBB6" : '#F5F5F8',
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontFamily: family.familyName, fontWeight: 900 }} // Apply custom font here
                                            >
                                                Aa
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            sx={{ fontFamily: family.familyName }} // Apply custom font here
                                            color={family.familyName === themeConfig.fontStyle ? '#0F1349' : '#8688A3'}
                                        >
                                            {family.name}
                                        </Typography>
                                    </Stack>
                                }
                            />
                        ))}
                    </RadioGroup>
            }

        </Box>
    )
};