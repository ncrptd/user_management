import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import RootLayout from './rootLayout/RootLayout.jsx';
import Tenants from './pages/Tenants.jsx';
import Users from './pages/Users.jsx';
import { Provider } from 'react-redux'
import store from './app/store.js';
import RequiresAuthentication from './auth/RequiresAuthentication.jsx';
import Home from './pages/home/Home.jsx';
import Upload from './pages/upload/Upload.jsx';
import Configuration from './pages/configuration/Configuration.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserDetails from './pages/user-details/UserDetails.jsx';
import UITemplate from './pages/uiTemplate/UITemplate.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <RequiresAuthentication>
      <RootLayout />
    </RequiresAuthentication>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'user-details/:id',
        element: <UserDetails />
      },
      {
        path: 'tenants',
        element: <RequiresAuthentication roles={['ROOT_ADMIN']}>
          <Tenants />
        </RequiresAuthentication>
      },
      {
        path: 'users',
        element: <RequiresAuthentication roles={['ROOT_ADMIN', 'TENANT_ADMIN']}>
          <Users />
        </RequiresAuthentication>
      },
      {
        path: 'upload',
        element: <RequiresAuthentication roles={['USER']}>
          <Upload />
        </RequiresAuthentication>
      },
      {
        path: 'configuration',
        element: <RequiresAuthentication roles={['TENANT_ADMIN']}>
          <Configuration />
        </RequiresAuthentication>
      },
      {
        path: 'ui-template',
        element: <RequiresAuthentication roles={['USER']}>
          <UITemplate />
        </RequiresAuthentication>
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
]);



let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
      brand: '#27306c'
    },
    secondary: {
      main: '#edf2ff',
      brand: '#c29542'
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);