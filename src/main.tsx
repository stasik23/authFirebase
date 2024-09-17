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

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Layout>
        <LockedRouter>
          <App />
        </LockedRouter>
      </Layout>,
  },
  {
    path: "/login",
    element:
      <Layout>
        <SighInPage />
      </Layout>,
  },
  {
    path: "/register",
    element:
      <Layout>
        <SighUpPage />
      </Layout>,
  },
  {
    path: "/aboutus",
    element:
      <Layout>
        <AboutUs />
      </Layout>,
  },
]);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <LoaderProvider>
      <RouterProvider router={router} />
    </LoaderProvider>

  );
}
