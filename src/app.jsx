/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv } from 'uuid';

import { appRoutes } from 'src/routes/config';
import ThemeProvider from 'src/theme';
import DashboardLayout from 'src/layouts/dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

const LoginPage = lazy(() => import('src/pages/login'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={userInfo == null ? <LoginPage /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {userInfo !== null
            ? appRoutes?.map((route) => (
                <Route
                  key={uuidv()}
                  path={route.path}
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                />
              ))
            : null}
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  );
}
