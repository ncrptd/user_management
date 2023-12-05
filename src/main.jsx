import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import RootLayout from './rootLayout/RootLayout.jsx';
import RootAdmin from './pages/rootAdmin/RootAdmin.jsx';
import RootAdminCreateUser from './pages/rootAdmin-create-user/RootAdminCreateUser.jsx';
import TenantAdminCreateUser from './pages/tenantAdmin-create-user/TenantAdminCreateUser.jsx';
import TenantAdmin from './pages/tenantAdmin/TenantAdmin.jsx';
import UserDetails from './pages/user-details/UserDetails.jsx';
import EditUserProfile from './pages/edit-user-profile/EditUserProfile.jsx';
import ResetPasswordForm from './pages/reset-password/ResetPasswordForm.jsx';
import UserProfile from './pages/user-profile/UserProfile.jsx';
import Tenants from './pages/Tenants.jsx';
import Users from './pages/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequiresAuth>
      <RootLayout />
    </RequiresAuth>,
    children: [
      {
        path: '/',
        element: <Home />
      },

      {
        path: 'root-admin',
        element: <RootAdmin />
      },
      {
        path: 'user-details/:roleParam',
        element: <UserDetails />
      },
      {
        path: 'root-admin-create-user',
        element: <RootAdminCreateUser />
      },
      {
        path: 'tenant-admin',
        element: <TenantAdmin />
      },
      {
        path: 'tenant-admin-create-user',
        element: <TenantAdminCreateUser />
      },
      {
        path: 'edit-user-profile',
        element: <EditUserProfile />
      },
      {
        path: 'reset-password',
        element: <ResetPasswordForm />
      }
      , {
        path: 'user',
        element: <UserProfile />
      }, {
        path: 'tenants',
        element: <Tenants />
      },
      {
        path: 'users',
        element: <Users />

      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },



]);

import { Provider } from 'react-redux'
import store from './app/store.js';
import RequiresAuth from './auth/RequiresAuth.jsx';
import Home from './pages/home/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
