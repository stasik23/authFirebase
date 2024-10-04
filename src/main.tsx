import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from './components/Layout';
import { SighInPage } from './pages/SighInPage';
import { SighUpPage } from './pages/SighUpPage';
import { LockedRouter } from './route/LockedRouter.tsx';
import { AboutUs } from './pages/AboutUs/index.tsx';
import { LoaderProvider } from './utils/LoaderProv.tsx';
import { NotFound } from './components/NotFound/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeSwitch } from './components/ThemeSwitch/index.tsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <Layout>
        <LockedRouter>
          <App />
        </LockedRouter>
        {/* <ThemeSwitch /> */}
      </Layout>
    )
  },
  {
    path: "/login",
    element: (
      <Layout>
        <SighInPage />
        {/* <ThemeSwitch /> */}
      </Layout>
    )
  },
  {
    path: "/register",
    element: (
      <Layout>
        <SighUpPage />
        {/* <ThemeSwitch /> */}
      </Layout>
    )
  },
  {
    path: "/aboutus",
    element: (
      <Layout>
        <AboutUs />
        {/* <ThemeSwitch /> */}
      </Layout>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
]);


const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </QueryClientProvider >
  );
}
