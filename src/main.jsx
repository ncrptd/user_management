import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import RootLayout from './rootLayout/RootLayout.jsx';
import UserDetails from './pages/user-details/UserDetails.jsx';
import EditUserProfile from './pages/edit-user-profile/EditUserProfile.jsx';
import ResetPasswordForm from './pages/reset-password/ResetPasswordForm.jsx';
import Tenants from './pages/Tenants.jsx';
import Users from './pages/Users.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from './app/store.js';
import RequiresAuth from './auth/RequiresAuth.jsx';
import Home from './pages/home/Home.jsx';
import Upload from './pages/upload/Upload.jsx';

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
        path: 'user-details/:id',
        element: <UserDetails />
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
        path: 'tenants',
        element: <Tenants />
      },
      {
        path: 'users',
        element: <Users />

      },
      {
        path: 'upload',
        element: <Upload />
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },



]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="472067935753-epfm6rgqqluit7700dpbubo2fv46grm3.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
