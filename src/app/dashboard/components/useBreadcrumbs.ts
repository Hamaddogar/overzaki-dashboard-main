"use client"

import * as React from 'react';
// eslint-disable-next-line import/no-cycle
import { BreadcrumbItem } from 'src/components/custom-crumbs';

export function useBreadcrumbs() {
    const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

    React.useEffect(() => {
        const currentPath = window.location.pathname;
        const paths = currentPath.split('/').filter(Boolean);
        const breadcrumbItems: BreadcrumbItem[] = paths.map((path, index) => ({
            name: path.replace(/-/g, ' '), // Replace hyphens with spaces
            href: `/${paths.slice(0, index + 1).join('/')}`,
        }));
        setBreadcrumbs(breadcrumbItems);
    }, []);
    return breadcrumbs;
}
