import { lazy } from 'react';

const WritePage = lazy(() => import('src/pages/WriteBlog'));
const MyBlog = lazy(() => import('src/pages/MyBlog'));
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
  
];
