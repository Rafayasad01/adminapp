/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { Navigate, RouteObject } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LayoutOutlet from '../components/layout/LayoutOutlet';
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

import AppUserDetailPage from '../pages/appUsers/AppUserDetailPage';
import AppUserRewardHistory from '../pages/appUsers/AppUserRewardHistory';
import AppUserLoyaltyDetailPage from '../pages/appUsers/AppUserRewardHistoryTabs/AppUserLoyaltyDetailPage';
import AppUserPromotionDetailPage from '../pages/appUsers/AppUserRewardHistoryTabs/AppUserPromotionDetailPage';
import AppUsersPage from '../pages/appUsers/AppUsersPage';
import AppointmentProviderAddSchedulePage from '../pages/appointment/provider/AppointmentProviderAddSchedulePage';
import AppointmentProviderPage from '../pages/appointment/provider/AppointmentProviderPage';
import AppointmentProviderSchedulePage from '../pages/appointment/provider/AppointmentProviderSchedulePage';
import AppointmentProviderServicesList from '../pages/appointment/provider/AppointmentProviderServicesList';
import AppointmentVisitDetailPage from '../pages/appointment/visit/AppointmentVisitDetailPage';
import BannersPage from '../pages/banners/BannersPage';
import DriverHistory from '../pages/orders/DriverHistory';
import SettingConfig from '../pages/settings/SettingConfig';
import VouchersPage from '../pages/vouchers/VouchersPage';
import RatingPage from '../pages/rating/RatingPage';
import RatingReviewsPage from '../pages/rating/RatingReviewsPage';
import Page404 from '../pages/404/Page404';
import AppointmentProviderByIdPage from '../pages/appointment/provider/AppointmentProviderByIdPage';
import FaqPage from '../pages/faq/faqPage';
import MdDashboard from '../pages/home/MdDashboard';
import ScanDiseasePage from '../pages/scanDisease/ScanDiseasePage';
import PatientsLogPage from '../pages/patientsLog/PatientsLogPage';
import PatientLogCreatePage from '../pages/patientsLog/PatientLogCreatePage';
import PatientLogProfilePage from '../pages/patientsLog/PatientLogProfilePage';
import PatientLogVisitCreatePage from '../pages/patientsLog/PatientLogVisitCreatePage';
import PatientLogVisitDetailsPage from '../pages/patientsLog/PatientLogVisitDetailsPage';
import DoctorsCreatePage from '../pages/doctors/DoctorsCreatePage';
import DoctorsProfilePage from '../pages/doctors/DoctorsProfilePage';
import DoctorsEditPage from '../pages/doctors/DoctorsEditPage';
import FormFieldsPage from '../pages/formFields/FormFieldsPage';

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
            element: <MdDashboard />,
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
          {
            path: 'appointment',
            children: [
              {
                index: true,
                element: <Navigate to="provider/list" replace />,
              },
              {
                path: 'visit',
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
                ],
              },
              {
                path: 'provider',
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
                  // {
                  //   path: 'shop',
                  //   element: <SettingsShopScheduling />,
                  // },
                  // {
                  //   path: 'config',
                  //   element: <SettingConfig />,
                  // },
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
          {
            path: 'scan-disease',
            children: [
              {
                index: true,
                element: <ScanDiseasePage />,
              },
            ],
          },
          {
            path: 'patient',
            children: [
              { index: true, element: <Navigate to="list" replace /> },
              {
                path: 'list',
                element: <PatientsLogPage />,
              },
              {
                path: 'create',
                element: <PatientLogCreatePage />,
              },
              {
                path: 'profile/:id',
                element: <PatientLogProfilePage />,
              },
              {
                path: 'revisit/:id',
                element: <PatientLogVisitCreatePage />,
              },
              {
                path: 'visit-details/:id',
                element: <PatientLogVisitDetailsPage />,
              },
              // {
              //   path: 'services/:providerId',
              //   element: <AppointmentProviderServicesList />,
              // },
              // {
              //   path: 'today-appointment/:providerId',
              //   element: <AppointmentProviderByIdPage />,
              // },
            ],
          },
          {
            path: 'fields',
            children: [
              {
                index: true,
                element: <FormFieldsPage />,
              },
            ],
          },
          {
            path: 'patient-log-create',
            children: [
              {
                index: true,
                element: <PatientLogCreatePage />,
              },
            ],
          },
          {
            path: 'patient-log',
            children: [
              {
                index: true,
                element: <PatientsLogPage />,
              },
              {
                path: 'create',
                element: <PatientLogCreatePage />,
              },
              {
                path: 'profile',
                element: <PatientLogProfilePage />,
              },
              {
                path: 'visit-details',
                element: <PatientLogVisitDetailsPage />,
              },
              {
                path: 'revisit',
                element: <PatientLogVisitCreatePage />,
              },
            ],
          },
          {
            path: 'add-doctor',
            children: [
              {
                index: true,
                element: <DoctorsCreatePage />,
              },
            ],
          },
          {
            path: 'edit-doctor',
            children: [
              {
                index: true,
                element: <DoctorsEditPage />,
              },
            ],
          },
          {
            path: 'doctor-profile',
            children: [
              {
                index: true,
                element: <DoctorsProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
