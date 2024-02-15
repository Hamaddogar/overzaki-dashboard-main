'use client'
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { CheckCircleOutline } from '@mui/icons-material';


const FeatureItem = ({ feature }: any) => {
    return (
        <>
            {/* Display the feature title */}
            <ListItem>
                <ListItemIcon>
                    <CheckCircleOutline color="success" />
                </ListItemIcon>
                <ListItemText primary={feature.content.en} />
            </ListItem>
        </>
    );
};

export default FeatureItem;
