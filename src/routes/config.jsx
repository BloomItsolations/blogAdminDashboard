import { lazy } from 'react';

const IndexPage = lazy(() => import('src/pages/app'));
const UserPage = lazy(() => import('src/pages/user'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Category = lazy(() => import('src/pages/category'));
const SubCategory = lazy(() => import('src/pages/subcategory'));
const SellerPage = lazy(() => import('src/pages/Seller'));
export const appRoutes = [
  { group: 'Dashboard', title: 'Dashboard', path: '/', element: <IndexPage /> },
  {
    group: 'Dashboard',
    path: 'customers',
    title: 'Customers',
    element: <UserPage />,
  },
  {
    group: 'Dashboard',
    path: 'seller',
    title: 'Seller',
    element: <SellerPage />,
  },
  {
    group: 'Dashboard',
    title: 'Category',
    path: 'Category',
    element: <Category />,
  },
  {
    group: 'Dashboard',
    title: 'SubCategory',
    path: 'sub-category',
    element: <SubCategory />,
  },
  {
    group: 'Dashboard',
    title: 'products',
    path: 'products',
    element: <ProductsPage />,
  },
];
