import { lazy } from 'react';
import MyBlog from 'src/pages/MyBlog';

import WritePage from 'src/pages/WriteBlog';

const ProductsPage = lazy(() => import('src/pages/products'));
const Category = lazy(() => import('src/pages/category'));
const SubCategory = lazy(() => import('src/pages/subcategory'));
// const SellerPage = lazy(() => import('src/pages/Seller'));
export const appRoutes = [
  {
    group: 'Dashboard',
    path: '/',
    title: 'Dashboard',
    element: <WritePage />,
  },
  {
    group: 'Dashboard',
    title: 'Blog Management',
    path: '/myblog',
    element: <MyBlog />,
  },
  {
    group: 'Dashboard',
    title: 'SubCategory',
    path: '/sub-category',
    element: <SubCategory />,
  },
  {
    group: 'Dashboard',
    title: 'products',
    path: '/products',
    element: <ProductsPage />,
  },
];
