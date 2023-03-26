/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ChangePasswordPage from '../pages/auth/change-password/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import OtpVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import HomePage from '../pages/home/HomePage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import ReportsPage from '../pages/reports/ReportsPage';

export const routeObjects: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="auth" replace />,
  },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'verification',
        element: <OtpVerificationPage />,
      },
      {
        path: 'changepassword',
        element: <ChangePasswordPage />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="home" replace />,
      // },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrdersPage />,
          },
          {
            path: 'create',
            element: <OrdersCreatePage />,
          },
          {
            path: 'view/:orderId',
            element: <OrderDetailsPage />,
          },
          {
            path: 'edit/:orderId',
            element: <OrdersEditPage />,
          },
        ],
      },
    ],
  },
];
