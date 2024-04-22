/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */

import { Navigate, RouteObject } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LayoutOutlet from '../components/layout/LayoutOutlet';
import Page404 from '../pages/404/Page404';
import AppUserDetailPage from '../pages/appUsers/AppUserDetailPage';
import AppUserRewardHistory from '../pages/appUsers/AppUserRewardHistory';
import AppUserLoyaltyDetailPage from '../pages/appUsers/AppUserRewardHistoryTabs/AppUserLoyaltyDetailPage';
import AppUserPromotionDetailPage from '../pages/appUsers/AppUserRewardHistoryTabs/AppUserPromotionDetailPage';
import AppUsersPage from '../pages/appUsers/AppUsersPage';
import AddAppointmentPage from '../pages/appointment/AddAppointmentPage';
import RescheduleAppointmentPage from '../pages/appointment/RescheduleAppointmentPage';
import EmployeeServices from '../pages/appointment/employeeServices/EmployeeServices';
import AppointmentProviderAddSchedulePage from '../pages/appointment/provider/AppointmentProviderAddSchedulePage';
import AppointmentProviderByIdPage from '../pages/appointment/provider/AppointmentProviderByIdPage';
import AppointmentProviderPage from '../pages/appointment/provider/AppointmentProviderPage';
import AppointmentProviderSchedulePage from '../pages/appointment/provider/AppointmentProviderSchedulePage';
import AppointmentProviderServicesList from '../pages/appointment/provider/AppointmentProviderServicesList';
import AppointmentVisitDetailPage from '../pages/appointment/visit/AppointmentVisitDetailPage';
import AppointmentVisitPage from '../pages/appointment/visit/AppointmentVisitPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import NewPasswordPage from '../pages/auth/new-password/NewPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import BannersPage from '../pages/banners/BannersPage';
import BranchDetailPage from '../pages/branches/BranchDetailPage';
import BranchPage from '../pages/branches/BranchPage';
import CartDetailsPage from '../pages/carts/CartDetailsPage';
import CartsPage from '../pages/carts/CartsPage';
import CategoriesPage from '../pages/categories/CategoriesPage';
import CategoriesServicesFaqPage from '../pages/categories/CategoriesServicesFaqPage';
import CategoriesServicesPage from '../pages/categories/CategoriesServicesPage';
import ComplainsPage from '../pages/complain/ComplainsPage';
import EmployeePage from '../pages/employees/EmployeePage';
import FaqPage from '../pages/faq/faqPage';
import HomePage from '../pages/home/HomePage';
import LocationsPage from '../pages/locations/LocationsPage';
import NotAuthorized from '../pages/notAuthorized/notAuthorized';
import NotificationPage from '../pages/notification/NotificationPage';
import DriverHistory from '../pages/orders/DriverHistory';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrdersAssignPage from '../pages/orders/OrdersAssignPage';
import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import ProfilePage from '../pages/profile/ProfilePage';
import RatingPage from '../pages/rating/RatingPage';
import RatingReviewsPage from '../pages/rating/RatingReviewsPage';
import ReportsPage from '../pages/reports/ReportsPage';
import ServiceItemPage from '../pages/services/ServiceItemPage';
import ServicesCatPage from '../pages/services/ServicesCatPage';
import SettingConfig from '../pages/settings/SettingConfig';
import SettingsApp from '../pages/settings/SettingsApp';
import SettingsPage from '../pages/settings/SettingsPage';
import SettingsShopScheduling from '../pages/settings/SettingsShopScheduling';
import VouchersPage from '../pages/vouchers/VouchersPage';
// import UpdateAppointmentPage from '../pages/appointment/UpdateAppointmentPage';

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
          {
            path: '404',
            element: <Page404 />,
          },
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
              {
                path: 'view-driver',
                element: <DriverHistory />,
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
            path: 'product',
            children: [
              {
                index: true,
                element: <CategoriesPage />,
              },
              {
                path: 'item/:productId',
                element: <CategoriesServicesPage />,
              },
              {
                path: 'item/faq/:categoryServiceId',
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
            path: 'app-user',
            children: [
              {
                index: true,
                element: <AppUsersPage />,
                // element: CAN("canView", "Customer List") ? <CustomersPage /> : <p>not authorized</p>,
              },
              {
                path: 'detail/:appuserId',
                element: <AppUserDetailPage />,
              },
              {
                path: 'reward',
                // element: <AppUserRewardHistory />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="history/:userId" replace />,
                  },
                  {
                    path: 'history/:userId',
                    element: <AppUserRewardHistory />,
                  },
                  {
                    path: 'history/voucher/detail/:historyId',
                    element: <AppUserPromotionDetailPage />,
                  },
                  {
                    path: 'history/loyalty/detail/:loyaltyId',
                    element: <AppUserLoyaltyDetailPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'employees',
            children: [
              {
                index: true,
                element: <EmployeePage />,
              },
            ],
          },
          {
            path: 'ratings',
            children: [
              {
                index: true,
                element: <RatingPage />,
              },
              {
                path: 'reviews/:itemId',
                element: <RatingReviewsPage />,
              },
            ],
          },
          {
            path: 'shop-barbers',
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
              },
              {
                path: 'today-appointment/:providerId',
                element: <AppointmentProviderByIdPage />,
              },
              {
                path: 'services/list/:empId',
                element: <EmployeeServices />,
              },
            ],
          },
          {
            path: 'appointments',
            children: [
              { index: true, element: <Navigate to="list" replace /> },
              {
                path: 'list',
                element: <AppointmentVisitPage />,
              },
              {
                path: 'detail/:id',
                element: <AppointmentVisitDetailPage />,
              },
              {
                path: 'add-appointment',
                element: <AddAppointmentPage />,
              },
              // {
              //   path: 'update-appointment/:id',
              //   element: <UpdateAppointmentPage />,
              // },
              {
                path: 'reschedule-appointment/:id',
                element: <RescheduleAppointmentPage />,
              },
            ],
          },
          {
            path: 'branches',
            children: [
              {
                index: true,
                element: <BranchPage />,
              },
              {
                path: 'detail/:branchId',
                element: <BranchDetailPage />,
              },
            ],
          },
          // nested appointment
          {
            path: 'store-appointment',
            children: [
              {
                index: true,
                element: <Navigate to="service" replace />,
              },
              {
                path: 'service',
                children: [
                  {
                    index: true,
                    element: <ServicesCatPage />,
                  },
                  {
                    path: 'services/:CatId',
                    element: <ServiceItemPage />,
                  },
                ],
              },
              {
                path: 'shop-barbers',
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
                  },
                  {
                    path: 'today-appointment/:providerId',
                    element: <AppointmentProviderByIdPage />,
                  },
                  {
                    path: 'services/list/:empId',
                    element: <EmployeeServices />,
                  },
                ],
              },
              {
                path: 'appointments',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <AppointmentVisitPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <AppointmentVisitDetailPage />,
                  },
                  {
                    path: 'add-appointment',
                    element: <AddAppointmentPage />,
                  },
                  // {
                  //   path: 'update-appointment/:id',
                  //   element: <UpdateAppointmentPage />,
                  // },
                  {
                    path: 'reschedule-appointment/:id',
                    element: <RescheduleAppointmentPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'store-product',
            children: [
              {
                index: true,
                element: <Navigate to="product" replace />,
              },
              {
                path: 'product',
                children: [
                  {
                    index: true,
                    element: <CategoriesPage />,
                  },
                  {
                    path: 'item/:productId',
                    element: <CategoriesServicesPage />,
                  },
                  {
                    path: 'item/faq/:categoryServiceId',
                    element: <CategoriesServicesFaqPage />,
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
                  {
                    path: 'view-driver',
                    element: <DriverHistory />,
                  },
                ],
              },
            ],
          },
          {
            path: 'salon',
            children: [
              {
                index: true,
                element: <Navigate to="product/list" replace />,
              },
              {
                path: 'product',
                children: [
                  {
                    path: 'list',
                    index: true,
                    element: <CategoriesPage />,
                    // element: CAN("canView", "Category List") ? <CategoriesPage /> : <p>not authorized</p>,
                  },
                  {
                    path: 'item/:productId',
                    element: <CategoriesServicesPage />,
                  },
                  {
                    path: 'item/faq/:categoryServiceId',
                    element: <CategoriesServicesFaqPage />,
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
                  {
                    path: 'view-driver',
                    element: <DriverHistory />,
                  },
                ],
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                index: true,
                element: <Navigate to="app-user/list" replace />,
              },
              {
                path: 'app-user',
                children: [
                  {
                    path: 'list',
                    index: true,
                    element: <AppUsersPage />,
                    // element: CAN("canView", "Customer List") ? <CustomersPage /> : <p>not authorized</p>,
                  },
                  {
                    path: 'detail/:appuserId',
                    element: <AppUserDetailPage />,
                  },
                  {
                    path: 'reward',
                    // element: <AppUserRewardHistory />,
                    children: [
                      {
                        index: true,
                        element: <Navigate to="history/:userId" replace />,
                      },
                      {
                        path: 'history/:userId',
                        element: <AppUserRewardHistory />,
                      },
                      {
                        path: 'history/voucher/detail/:historyId',
                        element: <AppUserPromotionDetailPage />,
                      },
                      {
                        path: 'history/loyalty/detail/:loyaltyId',
                        element: <AppUserLoyaltyDetailPage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'employees',
                children: [
                  {
                    index: true,
                    element: <EmployeePage />,
                  },
                ],
              },
            ],
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
                  {
                    path: 'config',
                    element: <SettingConfig />,
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
            path: 'faq',
            children: [
              {
                index: true,
                element: <FaqPage />,
              },
            ],
          },
          {
            path: 'notification',
            children: [
              {
                index: true,
                element: <NotificationPage />,
                // element: CAN("canView", "Notification List") ? <NotificationPage /> : <p>not authorized</p>,
              },
            ],
          },
          {
            path: 'service',
            children: [
              {
                index: true,
                element: <ServicesCatPage />,
              },
              {
                path: 'services/:CatId',
                element: <ServiceItemPage />,
              },
            ],
          },
          {
            path: 'no-auth',
            children: [
              {
                index: true,
                element: <NotAuthorized />,
              },
            ],
          },
          {
            path: 'page-not-found',
            children: [
              {
                index: true,
                element: <Page404 />,
              },
            ],
          },
        ],
      },
    ],
  },
];
