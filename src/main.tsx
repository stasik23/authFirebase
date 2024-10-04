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
    element:
      <ThemeSwitch>
        <Layout>
          <LockedRouter>
            <App />
          </LockedRouter>
        </Layout>
      </ThemeSwitch>
  },
  {
    path: "/login",
    element:
      <ThemeSwitch>
        <Layout>
          <SighInPage />
        </Layout>,
      </ThemeSwitch>

  },
  {
    path: "/register",
    element:
      <ThemeSwitch>
        <Layout>
          <SighUpPage />
        </Layout>,
      </ThemeSwitch>

  },
  {
    path: "/aboutus",
    element:
      <ThemeSwitch>
        <Layout>
          <AboutUs />
        </Layout>,
      </ThemeSwitch>

  },
  {
    path: '*',
    element:
      <NotFound />
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
