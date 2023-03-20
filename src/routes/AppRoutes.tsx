/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ChangePasswordPage from '../pages/auth/change-password/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import OtpVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import HomePage from '../pages/home/HomePage';
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
      //   element: <Navigate to="" replace />,
      // },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
    ],
  },
];
