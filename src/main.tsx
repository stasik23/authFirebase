import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Layout } from './components/Layout'
import { SighInPage } from './pages/SighInPage'
import { SighUpPage } from './pages/SighUpPage'
import ReactDOM from 'react-dom';
import { LockedRouter } from './route/LockedRouter.tsx';
import { Logout } from './pages/Logout/index.tsx';

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
      </Layout>
  },
  {
    path: "/register",
    element:
      <Layout>
        <SighUpPage />
      </Layout>
  },
  {
    path: "/logout",
    element:
      <Layout>
        <Logout />
      </Layout>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)