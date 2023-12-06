/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { Navigate, RouteObject } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LayoutOutlet from '../components/layout/LayoutOutlet';
import SuperAdminAppLayout from '../components/layout/SuperAdminAppLayout';
import AppointmentVisitPage from '../pages/appointment/visit/AppointmentVisitPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import NewPasswordPage from '../pages/auth/new-password/NewPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import BranchDetailPage from '../pages/branches/BranchDetailPage';
import BranchPage from '../pages/branches/BranchPage';
import CartDetailsPage from '../pages/carts/CartDetailsPage';
import CartsPage from '../pages/carts/CartsPage';
import CategoriesPage from '../pages/categories/CategoriesPage';
import CategoriesServicesFaqPage from '../pages/categories/CategoriesServicesFaqPage';
import CategoriesServicesPage from '../pages/categories/CategoriesServicesPage';
import ComplainsPage from '../pages/complain/ComplainsPage';
import CustomersAddressPage from '../pages/customers/CustomersAddressPage';
import CustomersDetailPage from '../pages/customers/CustomersDetailPage';
import CustomersPage from '../pages/customers/CustomersPage';
import DriversAddressPage from '../pages/drivers/DriversAddressPage';
import DriversDetailPage from '../pages/drivers/DriversDetailPage';
import DriversPage from '../pages/drivers/DriversPage';
import DriversSchedulePage from '../pages/drivers/DriversSchedulePage';
import EmployeePage from '../pages/employees/EmployeePage';
import HomePage from '../pages/home/HomePage';
import LocationsPage from '../pages/locations/LocationsPage';
import NotAuthorized from '../pages/notAuthorized/notAuthorized';
import NotificationPage from '../pages/notification/NotificationPage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrdersAssignPage from '../pages/orders/OrdersAssignPage';
import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import ProfilePage from '../pages/profile/ProfilePage';
import ReportsPage from '../pages/reports/ReportsPage';
import SettingsApp from '../pages/settings/SettingsApp';
import SettingsPage from '../pages/settings/SettingsPage';
import SettingsShopScheduling from '../pages/settings/SettingsShopScheduling';
import SuperAdminDashboardPage from '../pages/super-admin/dashboard/SuperAdminDashboardPage';
import SuperAdminAppImagePage from '../pages/super-admin/image-upload/SuperAdminAppImagePage';
import SuperAdminAddPermissionsPage from '../pages/super-admin/role-permissions/SuperAdminAddPermissionsPage';
import SuperAdminAddRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminAddRolePermissionsPage';
import SuperAdminEditPermissionsPage from '../pages/super-admin/role-permissions/SuperAdminEditPermissionPage';
import SuperAdminEditRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminEditRolePermissionPage';
import SuperAdminPermissionPage from '../pages/super-admin/role-permissions/SuperAdminPermissionPage';
import SuperAdminPermissionPageDetails from '../pages/super-admin/role-permissions/SuperAdminPermissionPageDetails';
import SuperAdminRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminRolePermissionsPage';
import SuperAdminShopDetailPage from '../pages/super-admin/tenat/shop/SuperAdminShopDetailPage';

import SuperAdminUserPage from '../pages/super-admin/tenat/user/SuperAdminUserPage';
import ShopAdminUserDetailPage from '../pages/super-admin/tenat/user/SuperAdminUserDetailPage';
import VouchersPage from '../pages/vouchers/VouchersPage';
import SuperAdminShopPage from '../pages/super-admin/tenat/shop/SuperAdminShopPage';
import AppointmentProviderPage from '../pages/appointment/provider/AppointmentProviderPage';
import AppointmentProviderSchedulePage from '../pages/appointment/provider/AppointmentProviderSchedulePage';
import AppointmentProviderAddSchedulePage from '../pages/appointment/provider/AppointmentProviderAddSchedulePage';
import AppointmentVisitDetailPage from '../pages/appointment/visit/AppointmentVisitDetailPage';
import BannersPage from '../pages/banners/BannersPage';
import AppointmentProviderServicesList from '../pages/appointment/provider/AppointmentProviderServicesList';

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
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: 'dashboard',
            element: <SuperAdminDashboardPage />,
          },
          {
            path: 'tenant',
            children: [
              {
                path: 'shop',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminShopPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <SuperAdminShopDetailPage />,
                  },
                ],
              },
              {
                path: 'user',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminUserPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <ShopAdminUserDetailPage />,
                  }
                ],
              },
            ],
          },
          {
            path: 'app',
            children: [
              {
                path: 'image-upload',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminAppImagePage />,
                  }
                ],
              }
            ],
          },
          // {
          //   path: 'support',
          //   element: <SuperAdminSupportPage />,
          // },
          {
            path: "user-permission",
            children: [
              {
                path: "role",
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminRolePermissionsPage />,
                  },
                  {
                    path: 'add-role',
                    element: <SuperAdminAddRolePermissionsPage />,
                  },
                  {
                    path: 'edit-role/:id',
                    element: <SuperAdminEditRolePermissionsPage />,
                  },
                ]
              },
              {
                path: "permission",
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminPermissionPage />,
                  },
                  {
                    path: 'add-permission',
                    element: <SuperAdminAddPermissionsPage />,
                  },
                  {
                    path: 'edit-permission/:id',
                    element: <SuperAdminEditPermissionsPage />,
                  },
                  {
                    path: 'details/:id',
                    element: <SuperAdminPermissionPageDetails />,
                  }
                ]
              }
            ]
          }
        ],
      },
      {
        path: 'dashboard',
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
                // element: CAN("canView", "Cart List") ? <CartsPage /> : <NotAuthorized />,
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
                // element: CAN("canView", "Order List") ? <OrdersPage /> : <p>not authorized</p>,
              },
              {
                path: 'create',
                element: <OrdersCreatePage />,
              },
              {
                path: 'detail/:orderId',
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
                // element: CAN("canView", "Driver List") ? < DriversPage /> : <p>not authorized</p>,
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
                // element: CAN("canView", "Category List") ? <CategoriesPage /> : <p>not authorized</p>,
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
                // element: CAN("canView", "Customer List") ? <CustomersPage /> : <p>not authorized</p>,
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
            path: 'employees',
            children: [
              {
                index: true,
                element: <EmployeePage />
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
            path: 'branches',
            children: [
              {
                index: true,
                element: <BranchPage />
              },
              {
                path: 'detail/:branchId',
                element: <BranchDetailPage />,
              },
              {
                path: 'address/:customerId',
                element: <CustomersAddressPage />,
              },
            ],
          },
          {
            path: "appointment",
            children: [
              {
                path: "visit",
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <AppointmentVisitPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <AppointmentVisitDetailPage />,
                  }
                ]
              },
              {
                path: "provider",
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <AppointmentProviderPage />,
                  },
                  {
                    path: 'schedule/:id',
                    element: <AppointmentProviderSchedulePage />,
                  },
                  {
                    path: 'add-schedule/:id',
                    element: <AppointmentProviderAddSchedulePage />,
                  },
                  {
                    path: 'services/:providerId',
                    element: <AppointmentProviderServicesList />,
                  }
                ]
              }
            ]
          },
          {
            path: 'banners',
            children: [
              {
                index: true,
                element: <BannersPage />,
              },
            ],
          },
          {
            path: 'vouchers',
            children: [
              {
                index: true,
                element: <VouchersPage />,
                // element: CAN("canView", "Voucher List") ? <VouchersPage /> : <p>not authorized</p>,
              },
            ],
          },
          {
            path: 'settings',
            children: [
              {
                path: '',
                element: <SettingsPage />,
                // element: CAN("canView", "Setting View") ? <SettingsPage /> : <p>not authorized</p>,
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
                element: <NotificationPage />
                // element: CAN("canView", "Notification List") ? <NotificationPage /> : <p>not authorized</p>,
              },
            ],
          },
          {
            path: "no-auth",
            children: [
              {
                index: true,
                element: <NotAuthorized />,
              },
            ],
          }
        ],
      },
    ],
  }
];
