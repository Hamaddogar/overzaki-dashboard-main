'use client';
import { useEffect, useMemo, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name: string, dimentions: number = 1) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: dimentions, height: dimentions }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  dashboard: icon('home', 0.75),
  order: icon('orders', 0.75),
  categorie: icon('categories', 0.75),
  product: icon('products', 0.75),
  analytics: icon('analytics', 0.75),
  customers: icon('customers', 0.75),
  payments: icon('ic_payment', 0.75),
  vouchers: icon('ic_vouchers', 0.75),
  integrations: icon('ic_integrations', 0.75),
  domain: icon('domain', 0.75),
  deliverypickup: icon('ic_deliverypickup', 0.75),
  accountSettings: icon('ic_settings', 0.75),
  design: icon('ic_design', 0.75),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();
  const { user } = useAuthContext();
  const isSuperMember = user?.permissions?.includes('CREATE_APP_THEME');

  // Initialize state with the initial value for navData
  const [navData, setNavData] = useState([
    // OVERVIEW
    // ----------------------------------------------------------------------
    {
      subheader: t('overview'),
      items: [
        {
          title: t('app'),
          path: paths.dashboard.root,
          icon: ICONS.dashboard,
        },
        {
          title: t('orders'),
          path: paths.dashboard.orders.root,
          icon: ICONS.order,
          permissions: ['GET_ORDERS'],
        },
        {
          title: t('Categories'),
          path: paths.dashboard.categories.root,
          icon: ICONS.categorie,
          permissions: ['GET_CATEGORYS'],
        },
        {
          title: t('Products'),
          path: paths.dashboard.products.root,
          icon: ICONS.product,
          permissions: ['GET_PRODUCTS'],
        },
        {
          title: t('Brand'),
          path: paths.dashboard.brand,
          icon: ICONS.job,
        },
        {
          title: t('Customers'),
          path: paths.dashboard.customers.root,
          icon: ICONS.customers,
          permissions: ['GET_CUSTOMERS'],
        },
        {
          title: t('analytics'),

          icon: ICONS.analytics,
          path: '',
          children: [
            { title: t('Sales Analytics'), path: paths.dashboard.general.analytics },
            { title: t('Best Selling'), path: paths.dashboard.general.bestSelling },
            { title: t('Branch'), path: paths.dashboard.user.list },
          ],
          permissions: ['GET_ORDERS'],
        },
        {
          title: t('Payment Methods'),
          path: paths.dashboard.payments.root,
          icon: ICONS.payments,
          permissions: ['GET_PAYMENTS'],
        },
        {
          title: t('Vouchers'),
          path: paths.dashboard.vouchers.root,
          icon: ICONS.vouchers,
          permissions: ['GET_VOUCHERS'],
        },
        {
          title: t('Account Settings'),
          path: paths.dashboard.accountsettings.root,
          icon: ICONS.accountSettings,
        },
        {
          title: t('Delivery & Pickup'),
          path: paths.dashboard.deliveryPickup.root,
          icon: ICONS.deliverypickup,
        },

        {
          title: t('Integrations'),
          path: paths.dashboard.integrations.root,
          icon: ICONS.integrations,
        },
        {
          title: t('Design'),
          path: paths.dashboard.design.root,
          icon: ICONS.design,
        },
        {
          title: t('Domain Settings'),
          path: paths.dashboard.domain.root,
          icon: ICONS.domain,
        },
        {
          title: t('Roles'),
          path: paths.dashboard.roles.root,
          icon: ICONS.job,
        },
      ],
    },
  ]);

  useEffect(() => {
    let updatedItems = [...navData[0].items];

    const additionalItems = [
      {
        title: t('Web Theme'),
        icon: ICONS.analytics,
        path: '',
        children: [
          {
            title: t('theme'),
            path: paths.dashboard.theme,
            icon: ICONS.blog,
          },
          {
            title: t('style'),
            path: paths.dashboard.style,
            icon: ICONS.blog,
          },
          {
            title: t('icons'),
            path: paths.dashboard.icon,
            icon: ICONS.blog,
          },
        ],
        permissions: ['GET_ORDERS'],
      },
      {
        title: t('Mobile Theme'),

        icon: ICONS.analytics,
        path: '',
        children: [
          {
            title: t('theme'),
            path: paths.dashboard.theme,
            icon: ICONS.blog,
          },
          {
            title: t('style'),
            path: paths.dashboard.style,
            icon: ICONS.blog,
          },
          {
            title: t('icons'),
            path: paths.dashboard.icon,
            icon: ICONS.blog,
          },
        ],
        permissions: ['GET_ORDERS'],
      },
      {
        title: t('Plans'),
        path: paths.dashboard.plans,
        icon: ICONS.blog
      }
    ];

    if (isSuperMember) {
      additionalItems.forEach((item) => {
        // Check if the item already exists based on the title
        if (!updatedItems.some((navItem) => item.title === navItem.title)) {
          updatedItems.push(item as any);
        }
      });
    }

    // Create a new navData array with the updated items
    const newNavData = [{ ...navData[0], items: updatedItems }];

    // Update the navData state
    setNavData(newNavData);
  }, [t, user, isSuperMember]); // Add any other dependencies as needed

  return navData;
}
