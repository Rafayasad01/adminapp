/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ChangePasswordPage from '../pages/auth/change-password/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import OtpVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import CategoriesPage from '../pages/categories/CategoriesPage';
import ComplainsPage from '../pages/complain/ComplainsPage';
import CustomersDetailPage from '../pages/customers/CustomersDetailPage';
import CustomersPage from '../pages/customers/CustomersPage';
import DriversPage from '../pages/drivers/DriversPage';
import DriversViewPage from '../pages/drivers/DriversViewPage';
import HomePage from '../pages/home/HomePage';
import LocationsPage from '../pages/locations/LocationsPage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import ReportsPage from '../pages/reports/ReportsPage';
import ServicesPage from '../pages/services/ServicesPage';
import VouchersPage from '../pages/vouchers/VouchersPage';
import FAQSPage from '../pages/faqs/FAQSPage';
import SettingsPage from '../pages/settings/SettingsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsApp from '../pages/settings/SettingsApp';
import SettingsShopScheduling from '../pages/settings/SettingsShopScheduling';
import AuthLayout from '../components/layout/AuthLayout';
import SuperAdminLayout from '../components/layout/super-admin/SuperAdminLayout';
import SuperAdminAuthLayout from '../components/layout/super-admin/SuperAdminAuthLayout';
import SuperAdminMainLayout from '../components/layout/super-admin/SuperAdminMainLayout';
import SuperAdminLoginPage from '../pages/super-admin/auth/login/SuperAdminLoginPage';
import SuperAdminForgotPasswordPage from '../pages/super-admin/auth/forgot-password/SuperAdminForgotPasswordPage';
import SuperAdminOTPVerificationPage from '../pages/super-admin/auth/otp-verification/SuperAdminOTPVerificationPage';
import SuperAdminNewPasswordPage from '../pages/super-admin/auth/new-password/SuperAdminNewPasswordPage';
import SuperAdminDashboardPage from '../pages/super-admin/main/dashboard/SuperAdminDashboardPage';
import SuperAdminShopsListPage from '../pages/super-admin/main/shops/SuperAdminShopsListPage';
import SuperAdminAddNewShopPage from '../pages/super-admin/main/shops/SuperAdminAddNewShopPage';
import SuperAdminShopDetailsPage from '../pages/super-admin/main/shops/SuperAdminShopDetailsPage';
import SuperAdminUsersListPage from '../pages/super-admin/main/users/SuperAdminUsersListPage';
import SuperAdminSupportPage from '../pages/super-admin/main/support/SuperAdminSupportPage';
import SuperAdminLogout from '../pages/super-admin/auth/logout/SuperAdminLogout';
import CartsPage from '../pages/carts/CartsPage';
import CartDetailsPage from '../pages/carts/CartDetailsPage';
import CategoriesServicesPage from '../pages/categories/CategoriesServicesPage';
import CategoriesServicesFaqPage from '../pages/categories/CategoriesServicesFaqPage';


export const routeObjects: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="admin" replace />,
  },
  {
    path: '/admin',
    element: <SuperAdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />,
      },
      {
        path: 'auth',
        element: <SuperAdminAuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: <SuperAdminLoginPage />,
          },
          {
            path: 'forgot-password',
            element: <SuperAdminForgotPasswordPage />,
          },
          {
            path: 'otp-verification',
            element: <SuperAdminOTPVerificationPage />,
          },
          {
            path: 'new-password',
            element: <SuperAdminNewPasswordPage />,
          },
        ],
      },
      {
        path: 'main',
        element: <SuperAdminMainLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: 'dashboard',
            element: <SuperAdminDashboardPage />,
          },
          {
            path: 'shop',
            children: [
              { index: true, element: <Navigate to="list" replace /> },
              {
                path: 'list',
                element: <SuperAdminShopsListPage />,
              },
              {
                path: 'add-new',
                element: <SuperAdminAddNewShopPage />,
              },
              {
                path: ':id',
                element: <SuperAdminShopDetailsPage />,
              },
            ],
          },
          {
            path: 'support',
            element: <SuperAdminSupportPage />,
          },
          {
            path: 'user',
            children: [
              { index: true, element: <Navigate to="list" replace /> },
              {
                path: 'list',
                element: <SuperAdminUsersListPage />,
              },
            ],
          },
          // {
          //   path: 'role/permission',
          //   element: <RolePermissions />,
          // },
          {
            path: 'logout',
            element: <SuperAdminLogout />,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/auth',
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="login" replace />,
  //     },
  //     {
  //       path: 'verification',
  //       element: <OtpVerificationPage />,
  //     },
  //     {
  //       path: 'changepassword',
  //       element: <ChangePasswordPage />,
  //     },
  //     {
  //       path: 'forgotpassword',
  //       element: <ForgotPasswordPage />,
  //     },
  //     {
  //       path: 'login',
  //       element: <LoginPage />,
  //     },
  //   ],
  // },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'carts',
        children: [
          {
            index: true,
            element: <CartsPage />,
          },
          {
            path: 'view/:cartId',
            element: <CartDetailsPage />,
          },
        ],
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
      {
        path: 'drivers',
        children: [
          {
            index: true,
            element: <DriversPage />,
          },
          {
            path: 'view/:driverId',
            element: <DriversViewPage />,
          },
        ],
      },
      {
        path: 'complains',
        children: [
          {
            index: true,
            element: <ComplainsPage />,
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            index: true,
            element: <CategoriesPage />,
          },
          {
            path: 'service/:categoryId',
            element: <CategoriesServicesPage />,
          },
          {
            path: 'service/faq/:categoryServiceId',
            element: <CategoriesServicesFaqPage />,
          },
        ],
      },
      {
        path: 'services',
        children: [
          {
            index: true,
            element: <ServicesPage />,
          },
        ],
      },
      {
        path: 'locations',
        children: [
          {
            index: true,
            element: <LocationsPage />,
          },
        ],
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomersPage />,
          },
          {
            path: 'detail/:customerId',
            element: <CustomersDetailPage />,
          },
        ],
      },
      {
        path: 'vouchers',
        children: [
          {
            index: true,
            element: <VouchersPage />,
          },
        ],
      },
      {
        path: 'faqs',
        children: [
          {
            index: true,
            element: <FAQSPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="app" replace />,
              },
              {
                path: 'app',
                element: <SettingsApp />,
              },
              {
                path: 'shop',
                element: <SettingsShopScheduling />,
              },
            ],
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },

];
