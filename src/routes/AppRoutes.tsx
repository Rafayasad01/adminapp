/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import CategoriesPage from '../pages/categories/CategoriesPage';
import ComplainsPage from '../pages/complain/ComplainsPage';
import CustomersDetailPage from '../pages/customers/CustomersDetailPage';
import CustomersPage from '../pages/customers/CustomersPage';
import DriversPage from '../pages/drivers/DriversPage';
import HomePage from '../pages/home/HomePage';
import LocationsPage from '../pages/locations/LocationsPage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import ReportsPage from '../pages/reports/ReportsPage';
import VouchersPage from '../pages/vouchers/VouchersPage';
import SettingsPage from '../pages/settings/SettingsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsApp from '../pages/settings/SettingsApp';
import SettingsShopScheduling from '../pages/settings/SettingsShopScheduling';
import CartsPage from '../pages/carts/CartsPage';
import CartDetailsPage from '../pages/carts/CartDetailsPage';
import CategoriesServicesPage from '../pages/categories/CategoriesServicesPage';
import CategoriesServicesFaqPage from '../pages/categories/CategoriesServicesFaqPage';
import OrdersAssignPage from '../pages/orders/OrdersAssignPage';
import DriversAddressPage from '../pages/drivers/DriversAddressPage';
import DriversSchedulePage from '../pages/drivers/DriversSchedulePage';
import CustomersAddressPage from '../pages/customers/CustomersAddressPage';
import DriversDetailPage from '../pages/drivers/DriversDetailPage';
import NotificationPage from '../pages/notification/NotificationPage';
import LayoutOutlet from '../components/layout/LayoutOutlet';
import AuthLayout from '../components/layout/AuthLayout';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/auth/login/LoginPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OTPVerificationPage';
import NewPasswordPage from '../pages/auth/new-password/NewPasswordPage';
import SuperAdminAppLayout from '../components/layout/SuperAdminAppLayout';
import SuperAdminDashboardPage from '../pages/super-admin/dashboard/SuperAdminDashboardPage';
import SuperAdminShopsListPage from '../pages/super-admin/shops/SuperAdminShopsListPage';
import SuperAdminAddNewShopPage from '../pages/super-admin/shops/SuperAdminAddNewShopPage';
import SuperAdminShopDetailsPage from '../pages/super-admin/shops/SuperAdminShopDetailsPage';
import SuperAdminSupportPage from '../pages/super-admin/support/SuperAdminSupportPage';
import SuperAdminUsersListPage from '../pages/super-admin/users/SuperAdminUsersListPage';

export const routeObjects: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="admin" replace />,
  },
  {
    path: '/admin',
    element: <LayoutOutlet />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'otp-verification',
            element: <OTPVerificationPage />,
          },
          {
            path: 'new-password',
            element: <NewPasswordPage />,
          },
        ],
      },
      {
        path: 'main',
        element: <SuperAdminAppLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
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
        ],
      },
      {
        path: '/admin/dashboard',
        element: <AppLayout />,
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
              {
                path: 'assign/:orderId',
                element: <OrdersAssignPage />,
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
                path: 'detail/:driverId',
                element: <DriversDetailPage />,
              },
              {
                path: 'address/:driverId',
                element: <DriversAddressPage />,
              },
              {
                path: 'schedule/:driverId',
                element: <DriversSchedulePage />,
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
              {
                path: 'address/:customerId',
                element: <CustomersAddressPage />,
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
          {
            path: 'notification',
            children: [
              {
                index: true,
                element: <NotificationPage />,
              },
            ],
          },
        ],
      },

    ],
  },
];
