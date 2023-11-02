'use client';

import './view.css';
import React from 'react';
// components
import DeviceFrame from 'src/sections/all-themes/utils/holder';

// ----------------------------------------------------------------------

interface OutPutViewProps {
    page: string;
    deviceView: string;
}
// ----------------------------------------------------------------------




export default function OutPutView({ page, deviceView }: OutPutViewProps) {



    return (
        <DeviceFrame deviceView={deviceView} URL={page} />
    )
};
