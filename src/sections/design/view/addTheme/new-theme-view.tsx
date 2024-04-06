
'use client';

import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
// components
import { paths } from 'src/routes/paths';
import Linker from 'src/sections/overview/subscription-plan/link';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { createBuilderFun, fetchBuilderList } from 'src/redux/store/thunks/builder';
import { useRouter } from 'src/routes/hooks';
import AddTheme from './add-theme';
import ThemeBusinessType from './ThemeBusinessType';
import ThemeBusinessDetails from './ThemeBusinessDetails';
import AppDetails from './appDetails';
import AppLang from './AppLang';
import { AppDispatch } from 'src/redux/store/store';
import { useSnackbar } from 'notistack';




const data = [
    {
        icon: 'ant-design:shopping-outlined',
        title: 'Market',
    },
    {
        icon: 'mdi:food-outline',
        title: 'Restaurant',
    },
    {
        icon: 'material-symbols:food-bank-outline',
        title: 'Groceries',
    },
    {
        icon: 'game-icons:flowers',
        title: 'Flowers',
    },
    {
        icon: 'material-symbols:health-and-beauty-outline',
        title: 'Beauty',
    },
    {
        icon: 'fluent-mdl2:shirt',
        title: 'Fashion',
    },
    {
        icon: 'fe:mobile',
        title: 'Electronics',
    },
    {
        icon: 'material-symbols:home-outline',
        title: 'Home',
    },
    {
        icon: 'fluent-mdl2:health',
        title: 'Health',
    },
    {
        icon: 'bi:book',
        title: 'Library',
    },
    {
        icon: 'octicon:gift-24',
        title: 'Gifts',
    },
    {
        icon: 'mdi:art',
        title: 'Art',
    },
    {
        icon: 'ri:football-fill',
        title: 'Sports',
    },
    {
        icon: 'map:furniture-store',
        title: 'Furniture',
    },
    {
        icon: 'material-symbols-light:toys-outline',
        title: 'Toys',
    },
    {
        icon: 'akar-icons:glasses',
        title: 'Optics',
    },
    {
        icon: 'ph:car',
        title: 'Cars',
    },
];
interface DesignMainProps {
    // Add any props if needed
}
const AddNewTheme: React.FC<DesignMainProps> = () => {



    const [addData, setAddData] = useState<any>({});

    const [step, setStep] = useState<number>(1); // Explicitly specify the type as number
    const { enqueueSnackbar } = useSnackbar();



    useEffect(() => {
        if (step === 6) {
            handleCreateBuilder();
        }
    }, [step])

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();


    const handleCreateBuilder = async () => {
        console.log(addData);

        const formData = new FormData();

        formData.append(`appLanguage[0]`, addData.appLanguage.en ? 'en' : '');
        formData.append('appLanguage[1]', addData.appLanguage.ar ? 'ar' : '');
        formData.append('defaultLanguage', 'en');
        formData.append(`appDescription[en]`, "description");
        formData.append('appDescription[ar]', "description");
        formData.append(`appName[en]`, addData.appName.en);
        formData.append('appName[ar]', addData.appName.ar);
        formData.append('primaryColor', addData.primaryColor);
        // formData.append('theme', addData.theme);
        formData.append('theme', 'theme-code');
        formData.append('BusinessType', addData.type);
        formData.append('BusinessCategory', 'Market');
        formData.append('logo', addData.logo);




        // setStep(7)
        // delete formData.type;
        dispatch(createBuilderFun(formData)).then((response: any) => {
            if (response.meta.requestStatus === 'fulfilled') {
                console.log('Successfully Created!', { variant: 'success' });
                enqueueSnackbar('Successfully Created!', { variant: 'success' });
                dispatch(fetchBuilderList({}));
                router.push(paths.dashboard.design.root);

            } else {
                console.log(`Error! ${response.error.message}`, { variant: 'error' });
                enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });

            }
        });



    }

    return (
        <>
            {step === 1 && (
                <AddTheme steps={step} setSteps={setStep} addData={addData} setAddData={setAddData} />
            )}
            {step === 2 && (
                <ThemeBusinessType steps={step} setSteps={setStep} addData={addData} setAddData={setAddData} />
            )}
            {step === 3 && (
                <ThemeBusinessDetails steps={step} setSteps={setStep} addData={addData} setAddData={setAddData} />
            )}
            {step === 4 && (
                <AppDetails steps={step} setSteps={setStep} addData={addData} setAddData={setAddData} />
            )}
            {step === 5 && (
                <AppLang steps={step} setSteps={setStep} addData={addData} setAddData={setAddData} />
            )}

        </>

    );
}

export default AddNewTheme;