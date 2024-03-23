// // sections

// import { EcomTheme } from "src/sections/all-themes/market/ecom";

// // ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Dashboard: Edit Theme',
// };


// export default function ThemeEcomPage() {

//   return <EcomTheme />;
// }


// sections
import { ThemesView } from 'src/sections/all-themes/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Themes',
};

type Props = {
  params: {
    theme_type: string;
  };
};

export default function ThemeForOneCategoryPage({ params }: Props) {
  const { theme_type } = params;

  return <ThemesView theme_type={theme_type} />;
}