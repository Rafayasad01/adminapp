/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */

import { Navigate, RouteObject } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import OtherAddAppointmentPage from '../pages/otherAppointments/AddAppointmentPage';
import RescheduleAppointmentPage from '../pages/appointment/RescheduleAppointmentPage';
import OtherRescheduleAppointmentPage from '../pages/otherAppointments/RescheduleAppointmentPage';
import EmployeeServices from '../pages/appointment/employeeServices/EmployeeServices';
import AppointmentProviderAddSchedulePage from '../pages/appointment/provider/AppointmentProviderAddSchedulePage';
import AppointmentProviderByIdPage from '../pages/appointment/provider/AppointmentProviderByIdPage';
import AppointmentProviderPage from '../pages/appointment/provider/AppointmentProviderPage';
import AppointmentProviderSchedulePage from '../pages/appointment/provider/AppointmentProviderSchedulePage';
import AppointmentProviderServicesList from '../pages/appointment/provider/AppointmentProviderServicesList';
// import AppointmentVisitDetailPage from '../pages/appointment/visit/AppointmentVisitDetailPage';
import AppointmentVisitPage from '../pages/appointment/visit/AppointmentPage';
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
import AddNewOrder from '../pages/orders/AddNewOrder';
import AddNewOrderService from '../pages/ordersService/AddNewOrder';
import DriverHistory from '../pages/orders/DriverHistory';
// import DriverHistory from '../pages/ordersService/DriverHistory';
import DriverHistoryService from '../pages/drivers/DriverHistoryPage';
import DriverHistoryDetailService from '../pages/drivers/DriverHistoryDetailPage';
import OrderBasket from '../pages/orders/OrderBasket';
import OrderBasketService from '../pages/ordersService/OrderBasket';
import OrderDetailsServicePage from '../pages/ordersService/OrderDetailsPage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
import OrderItemDetailPage from '../pages/orders/OrderItemDetailPage';
import OrdersAssignPage from '../pages/orders/OrdersAssignPage';
import OrdersAssignServicePage from '../pages/ordersService/OrdersAssignPage';
// import OrdersCreatePage from '../pages/orders/OrdersCreatePage';
import OrdersEditPage from '../pages/orders/OrdersEditPage';
import OrdersPage from '../pages/orders/OrdersPage';
import OrderServicePage from '../pages/ordersService/OrdersPage';
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
import StoreAppointmentsList from '../pages/appointment/StoreAppointmentsList';
import OtherStoreAppointmentsList from '../pages/otherAppointments/StoreAppointmentsList';
import AppointmentEmployeesAttendancePage from '../pages/appointment/provider/attendance/AppointmentEmployeesAttendancePage';
import LeaveManagement from '../pages/appointment/leaveManagement/LeaveManagement';
// import EmployeeRatingPage from '../pages/appointment/provider/rating/EmployeeRatingPage';
import EmployeeRatingReviewsPage from '../pages/appointment/provider/rating/EmployeeRatingReviewsPage';
import AppointmentRatingPage from '../pages/appointment/rating/AppointmentRatingPage';
import AppointmentRatingReviewsPage from '../pages/appointment/rating/AppointmentRatingReviewsPage';
import WalletPage from '../pages/appointment/wallet/WalletPage';
import { ALL_PERMISSIONS } from '../utils/constants';
import CAN from '../services/permissions/permissions';
import ExpensePage from '../pages/expense';
import AppUsersCustomerPage from '../pages/customers/AppUsersCustomersPage';
import AppUserCustomerDetailPage from '../pages/customers/AppUserCustomerDetailPage';
import OtherAppointmentPage from '../pages/otherAppointments/visit/AppointmentVisitPage';
import DeductionPage from '../pages/appointment/provider/deduction/DeductionPage';
import CommissionPage from '../pages/appointment/provider/commission/CommissionPage';
import BonusPage from '../pages/appointment/provider/bonus/BonusPage';
import OvertimePage from '../pages/appointment/provider/overtime/OvertimePage';
import { getItem } from '../utils/storage';
import DriverPage from '../pages/drivers/DriverPage';
import DriverHistoryDetailPage from '../pages/drivers/DriverHistoryDetailPage';
import DriverDetailPage from '../pages/drivers/DriverDetailPage';

const ProtectedRoute = ({ page, condition }: any) => {
  const [canView, setCanView] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      const result = await CAN('canView', condition);
      setCanView(result);
    };
    checkPermission();
  }, [condition]);
  if (canView === null) {
    return <div>Loading...</div>;
  }
  return canView ? page : <Page404 error={{ message: 'Page not found' }} />;
};

// const ProtectedRoute = ({ page, condition }: any) => {
//   const canView = CAN('canView', condition);
//   return canView ? page : <Page404 error={{ message: 'Page not found' }} />;
// };

const GetInitialRoute = ({ routes }: any) => {
  const permittedRoute = routes.find((route: any) =>
    CAN('canView', route.condition)
  );
  if (permittedRoute) {
    return <Navigate to={permittedRoute.path} />;
  }
  return null;
};

// console.log('ssddssdsddsds', APPOINTMENT_TEXT);
const getUserType: any = getItem('USER');
// console.log('🚀 ~ getUserType:', getUserType);

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
          // {
          //   path: '404',
          //   element: <Page404 />,
          // },
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
                element: <AddNewOrder />,
              },
              {
                path: 'item/:itemId',
                element: <OrderItemDetailPage />,
              },
              {
                path: 'basket',
                element: <OrderBasket />,
                // element: CAN("canView", "Order List") ? <OrdersPage /> : <p>not authorized</p>,
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
            path: 'employees',
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
              {
                index: true,
                element: <AppointmentVisitPage />,
              },
              // {
              //   path: 'detail/:id',
              //   element: <AppointmentVisitDetailPage />,
              // },
              {
                path: 'add-appointment',
                element: <AddAppointmentPage />,
              },
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
                element: (
                  <ProtectedRoute
                    page={<BranchPage />}
                    condition={ALL_PERMISSIONS.storeBranch.viewBranches}
                  />
                ),
                // element: <BranchPage />,
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
                // element: <Navigate to="service" replace />,
                element: (
                  <GetInitialRoute
                    routes={[
                      {
                        path: 'service',
                        condition:
                          ALL_PERMISSIONS.storeAppointment.viewServices,
                      },
                      {
                        path: 'employees',
                        condition:
                          ALL_PERMISSIONS.storeAppointment.viewEmployees,
                      },
                      {
                        path: 'appointments',
                        condition:
                          ALL_PERMISSIONS.storeAppointment.viewAppointments,
                      },
                      {
                        path: 'o-appointments',
                        condition:
                          ALL_PERMISSIONS.storeAppointment
                            .viewOtherAppointments,
                      },
                      {
                        path: 'wallet',
                        condition: ALL_PERMISSIONS.storeAppointment.viewWallets,
                      },
                      {
                        path: 'leaves-management',
                        condition:
                          ALL_PERMISSIONS.storeAppointment.viewLeaveManagement,
                      },
                      {
                        path: 'ratings',
                        condition:
                          ALL_PERMISSIONS.storeAppointment.viewEmployeeRating,
                      },
                    ]}
                  />
                ),
              },
              {
                path: 'service',
                children: [
                  {
                    index: true,
                    // element: <ServicesCatPage />,
                    element: (
                      <ProtectedRoute
                        page={<ServicesCatPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewServices
                        }
                      />
                    ),
                  },
                  {
                    path: 'services/:CatId',
                    element: <ServiceItemPage />,
                  },
                ],
              },
              {
                path: 'employees',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: (
                      <ProtectedRoute
                        page={<AppointmentProviderPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewEmployees
                        }
                      />
                    ),
                    // element: <AppointmentProviderPage />,
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
                  {
                    path: 'attendance/:empId',
                    element: <AppointmentEmployeesAttendancePage />,
                  },
                  {
                    path: 'review/:empId',
                    element: <EmployeeRatingReviewsPage />,
                  },
                  {
                    path: 'deduction/:empId',
                    element: <DeductionPage />,
                  },
                  {
                    path: 'commission/:empId',
                    element: <CommissionPage />,
                  },
                  {
                    path: 'bonus/:empId',
                    element: <BonusPage />,
                  },
                  {
                    path: 'overtime/:empId',
                    element: <OvertimePage />,
                  },
                ],
              },
              {
                path: 'appointments',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<AppointmentVisitPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewAppointment
                        }
                      />
                    ),
                    // element: <AppointmentVisitPage />,
                  },
                  {
                    path: 'today/list',
                    element: <StoreAppointmentsList today />,
                  },
                  {
                    path: 'list',
                    element: <StoreAppointmentsList />,
                  },
                  // {
                  //   path: 'detail/:id',
                  //   element: <AppointmentVisitDetailPage />,
                  // },
                  {
                    path: 'add-appointment',
                    element: (
                      <ProtectedRoute
                        page={<AddAppointmentPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.addAppointment
                        }
                      />
                    ),
                    // element: <AddAppointmentPage />,
                  },
                  {
                    path: 'reschedule-appointment/:id',
                    element: (
                      <ProtectedRoute
                        page={<RescheduleAppointmentPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.editAppointment
                        }
                      />
                    ),
                    // element: <RescheduleAppointmentPage />,
                  },
                ],
              },
              {
                path: 'all-appointments',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<OtherAppointmentPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewOtherAppointments
                        }
                      />
                    ),
                    // element: <AppointmentVisitPage />,
                  },
                  {
                    path: 'today/list',
                    element: <OtherStoreAppointmentsList today />,
                  },
                  {
                    path: 'list',
                    element: <OtherStoreAppointmentsList />,
                  },
                  // {
                  //   path: 'detail/:id',
                  //   element: <AppointmentVisitDetailPage />,
                  // },
                  {
                    path: 'add-appointment',
                    element: (
                      <ProtectedRoute
                        page={<OtherAddAppointmentPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.addAppointment
                        }
                      />
                    ),
                    // element: <AddAppointmentPage />,
                  },
                  {
                    path: 'reschedule-appointment/:id',
                    element: (
                      <ProtectedRoute
                        page={<OtherRescheduleAppointmentPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.editAppointment
                        }
                      />
                    ),
                    // element: <RescheduleAppointmentPage />,
                  },
                ],
              },
              {
                path: 'wallet',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<WalletPage />}
                        condition={ALL_PERMISSIONS.storeAppointment.viewWallets}
                      />
                    ),
                    // element: <WalletPage />,
                  },
                ],
              },
              {
                path: 'leaves-management',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<LeaveManagement />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewLeaveManagement
                        }
                      />
                    ),
                    // element: <LeaveManagement />,
                  },
                ],
              },
              {
                path: 'ratings',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<AppointmentRatingPage />}
                        condition={
                          ALL_PERMISSIONS.storeAppointment.viewEmployeeRating
                        }
                      />
                    ),
                    // element: <AppointmentRatingPage />,
                  },
                  {
                    path: 'review/:appId',
                    element: <AppointmentRatingReviewsPage />,
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
                element: (
                  <GetInitialRoute
                    routes={[
                      {
                        path: 'product',
                        condition: ALL_PERMISSIONS.storeProduct.viewProducts,
                      },
                      {
                        path: 'orders',
                        condition: ALL_PERMISSIONS.storeProduct.viewOrders,
                      },
                      // {
                      //   path: 'orders',
                      //   condition:
                      //     ALL_PERMISSIONS.storeProduct.viewServiceOrder,
                      // },
                      {
                        path: 'ratings',
                        condition: ALL_PERMISSIONS.storeProduct.viewRatings,
                      },
                    ]}
                  />
                ),
                // element: <Navigate to="product" replace />,
              },
              {
                path: 'product',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<CategoriesPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesPage />,
                  },
                  {
                    path: 'item/:productId',
                    element: (
                      <ProtectedRoute
                        page={<CategoriesServicesPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesServicesPage />,
                  },
                  {
                    path: 'item/faq/:categoryServiceId',
                    element: (
                      <ProtectedRoute
                        page={<CategoriesServicesFaqPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesServicesFaqPage />,
                  },
                ],
              },
              {
                path: 'orders',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<OrdersPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewOrder}
                      />
                    ),
                    // element: <OrdersPage />,
                  },
                  // {
                  //   index: true,
                  //   element: (
                  //     <ProtectedRoute
                  //       page={<OrderServicePage />}
                  //       condition={
                  //         ALL_PERMISSIONS.storeProduct.viewServiceOrder
                  //       }
                  //     />
                  //   ),
                  //   // element: <OrdersPage />,
                  // },
                  {
                    path: 'create',
                    element: (
                      <ProtectedRoute
                        page={<AddNewOrder />}
                        condition={ALL_PERMISSIONS.storeProduct.addOrder}
                      />
                    ),
                    // element: <AddNewOrder />,
                  },
                  {
                    path: 'detail/:orderId',
                    element: (
                      <ProtectedRoute
                        page={<OrderDetailsPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewOrder}
                      />
                    ),
                    // element: <OrderDetailsPage />,
                  },
                  {
                    path: 'basket',
                    element: (
                      <ProtectedRoute
                        page={<OrderBasket />}
                        condition={ALL_PERMISSIONS.storeProduct.addOrder}
                      />
                    ),
                    // element: <OrderBasket />,
                  },
                ],
              },
              {
                path: 'ratings',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<RatingPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewRating}
                      />
                    ),
                    // element: <RatingPage />,
                  },
                  {
                    path: 'reviews/:itemId',
                    element: (
                      <ProtectedRoute
                        page={<RatingReviewsPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewRating}
                      />
                    ),
                    // element: <RatingReviewsPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'store-service',
            children: [
              {
                index: true,
                element: (
                  <GetInitialRoute
                    routes={[
                      {
                        path: 'product',
                        condition: ALL_PERMISSIONS.storeProduct.view,
                      },
                      {
                        path: 'orders',
                        condition: ALL_PERMISSIONS.storeProduct.viewOrders,
                      },
                      {
                        path: 'drivers',
                        condition:
                          ALL_PERMISSIONS.storeProduct.viewDriverHistory,
                      },
                      {
                        path: 'ratings',
                        condition: ALL_PERMISSIONS.storeProduct.viewRatings,
                      },
                    ]}
                  />
                ),
                // element: <Navigate to="product" replace />,
              },
              {
                path: 'product',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<CategoriesPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesPage />,
                  },
                  {
                    path: 'item/:productId',
                    element: (
                      <ProtectedRoute
                        page={<CategoriesServicesPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesServicesPage />,
                  },
                  {
                    path: 'item/faq/:categoryServiceId',
                    element: (
                      <ProtectedRoute
                        page={<CategoriesServicesFaqPage />}
                        condition={ALL_PERMISSIONS.storeProduct.view}
                      />
                    ),
                    // element: <CategoriesServicesFaqPage />,
                  },
                ],
              },
              {
                path: 'orders',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<OrderServicePage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewOrder}
                      />
                    ),
                    // element: <OrdersPage />,
                  },
                  {
                    path: 'create',
                    element: (
                      <ProtectedRoute
                        page={<AddNewOrderService />}
                        condition={ALL_PERMISSIONS.storeProduct.addOrder}
                      />
                    ),
                    // element: <AddNewOrder />,
                  },
                  {
                    path: 'detail/:orderId',
                    element: (
                      <ProtectedRoute
                        page={<OrderDetailsServicePage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewOrder}
                      />
                    ),
                    // element: <OrderDetailsPage />,
                  },
                  {
                    path: 'basket',
                    element: (
                      <ProtectedRoute
                        page={<OrderBasketService />}
                        condition={ALL_PERMISSIONS.storeProduct.addOrder}
                      />
                    ),
                    // element: <OrderBasket />,
                  },
                  {
                    path: 'assign/:orderId',
                    element: (
                      <ProtectedRoute
                        page={<OrdersAssignServicePage />}
                        condition={ALL_PERMISSIONS.storeProduct.assignDriver}
                      />
                    ),
                    // element: <OrdersAssignServicePage />,
                  },
                  {
                    path: 'view-driver',
                    element: <DriverHistory />,
                  },
                ],
              },
              {
                path: 'ratings',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<RatingPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewRating}
                      />
                    ),
                    // element: <RatingPage />,
                  },
                  {
                    path: 'reviews/:itemId',
                    element: (
                      <ProtectedRoute
                        page={<RatingReviewsPage />}
                        condition={ALL_PERMISSIONS.storeProduct.viewRating}
                      />
                    ),
                    // element: <RatingReviewsPage />,
                  },
                ],
              },
              {
                path: 'drivers',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<DriverHistoryService />}
                        condition={
                          ALL_PERMISSIONS.storeProduct.viewDriverHistory
                        }
                      />
                    ),
                    // element: <RatingPage />,
                  },
                  {
                    path: 'detail/:appUser',
                    element: (
                      <ProtectedRoute
                        page={<DriverHistoryDetailService />}
                        condition={
                          ALL_PERMISSIONS.storeProduct.viewDriverHistory
                        }
                      />
                    ),
                    // element: <RatingReviewsPage />,
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
                element: (
                  <GetInitialRoute
                    routes={
                      getUserType?.userType === 'ShopUser'
                        ? [
                            {
                              path: 'employees',
                              condition:
                                ALL_PERMISSIONS.storeUser.viewUserEmployee,
                            },
                            {
                              path: 'drivers',
                              condition:
                                ALL_PERMISSIONS.storeUser.viewDriverUserApp,
                            },
                            {
                              path: 'app-user/list',
                              condition: ALL_PERMISSIONS.storeUser.viewUserApp,
                            },
                            {
                              path: 'customers/list',
                              condition:
                                ALL_PERMISSIONS.storeUser.viewCustomers,
                            },
                          ]
                        : [
                            {
                              path: 'employees',
                              condition:
                                ALL_PERMISSIONS.storeUser.viewUserEmployee,
                            },
                            {
                              path: 'customers/list',
                              condition:
                                ALL_PERMISSIONS.storeUser.viewCustomers,
                            },
                          ]
                    }
                  />
                ),
                // element: <Navigate to="app-user/list" replace />,
              },
              {
                path: 'employees',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<EmployeePage />}
                        condition={ALL_PERMISSIONS.storeUser.viewUserEmployee}
                      />
                    ),
                    // element: <EmployeePage />,
                  },
                ],
              },
              {
                path: 'drivers',
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<DriverPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewDriverUserApp}
                      />
                    ),
                    // element: <EmployeePage />,
                  },
                  {
                    path: 'detail/:driverId',
                    element: (
                      <ProtectedRoute
                        page={<DriverDetailPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewDriverUserApp}
                      />
                    ),
                    // element: <EmployeePage />,
                  },
                  {
                    path: 'history/:driverId',
                    element: (
                      <ProtectedRoute
                        page={<DriverHistoryDetailPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewDriverUserApp}
                      />
                    ),
                    // element: <EmployeePage />,
                  },
                ],
              },
              {
                path: 'app-user',
                children: [
                  {
                    path: 'list',
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<AppUsersPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewUserApp}
                      />
                    ),
                    // element: <AppUsersPage />,
                  },
                  {
                    path: 'detail/:appuserId',
                    element: (
                      <ProtectedRoute
                        page={<AppUserDetailPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewUserApp}
                      />
                    ),
                    // element: <AppUserDetailPage />,
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
                        element: (
                          <ProtectedRoute
                            page={<AppUserRewardHistory />}
                            condition={
                              ALL_PERMISSIONS.storeUser.viewUserAppRewardHistory
                            }
                          />
                        ),
                        // element: <AppUserRewardHistory />,
                      },
                      {
                        path: 'history/loyalty/detail/:loyaltyId',
                        element: (
                          <ProtectedRoute
                            page={<AppUserLoyaltyDetailPage />}
                            condition={
                              ALL_PERMISSIONS.storeUser.viewUserAppRewardHistory
                            }
                          />
                        ),
                        // element: <AppUserRewardHistory />,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'customers',
                children: [
                  {
                    path: 'list',
                    index: true,
                    element: (
                      <ProtectedRoute
                        page={<AppUsersCustomerPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewCustomers}
                      />
                    ),
                    // element: <AppUsersPage />,
                  },
                  {
                    path: 'detail/:appuserId',
                    element: (
                      <ProtectedRoute
                        page={<AppUserCustomerDetailPage />}
                        condition={ALL_PERMISSIONS.storeUser.viewCustomers}
                      />
                    ),
                    // element: <AppUserDetailPage />,
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
                element: (
                  <ProtectedRoute
                    page={<BannersPage />}
                    condition={ALL_PERMISSIONS.storeBanner.viewBanners}
                  />
                ),
                // element: <BannersPage />,
              },
            ],
          },
          // {
          //   path: 'expense',
          //   children: [
          //     {
          //       index: true,
          //       element: (
          //         <GetInitialRoute
          //           routes={[
          //             {
          //               path: 'summary',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserApp,
          //             },
          //             {
          //               path: 'salary',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserEmployee,
          //             },
          //             {
          //               path: 'utility',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserEmployee,
          //             },
          //             {
          //               path: 'maintenance',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserEmployee,
          //             },
          //             {
          //               path: 'equipment-purchase',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserEmployee,
          //             },
          //             {
          //               path: 'other',
          //               condition: ALL_PERMISSIONS.storeUser.viewUserEmployee,
          //             },
          //           ]}
          //         />
          //       ),
          //       // element: <BannersPage />,
          //     },
          //     {
          //       path: 'summary',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //     {
          //       path: 'salary',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //     {
          //       path: 'utility',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //     {
          //       path: 'maintenance',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //     {
          //       path: 'equipment-purchase',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //     {
          //       path: 'other',
          //       children: [
          //         {
          //           index: true,
          //           element: (
          //             <ProtectedRoute
          //               page={<VouchersPage />}
          //               condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
          //             />
          //           ),
          //           // element: <VouchersPage />,
          //         },
          //       ],
          //     },
          //   ],
          // },
          {
            path: 'expense',
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute
                    page={<ExpensePage />}
                    condition={ALL_PERMISSIONS.storeExpense.viewExpenses}
                  />
                ),
                // element: <VouchersPage />,
              },
            ],
          },
          {
            path: 'vouchers',
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute
                    page={<VouchersPage />}
                    condition={ALL_PERMISSIONS.storeVoucher.viewVouchers}
                  />
                ),
                // element: <VouchersPage />,
              },
            ],
          },
          {
            path: 'settings',
            children: [
              {
                path: '',
                element: (
                  <ProtectedRoute
                    page={<SettingsPage />}
                    condition={ALL_PERMISSIONS.storeSetting.viewSettings}
                  />
                ),
                children: [
                  {
                    index: true,
                    path: 'app',
                    element: (
                      <ProtectedRoute
                        page={<SettingsApp />}
                        condition={ALL_PERMISSIONS.storeSetting.viewSettings}
                      />
                    ),
                    // element: <SettingsApp />,
                  },
                  {
                    path: 'shop',
                    element: (
                      <ProtectedRoute
                        page={<SettingsShopScheduling />}
                        condition={ALL_PERMISSIONS.storeSetting.viewSettings}
                      />
                    ),
                    // element: <SettingsShopScheduling />,
                  },
                  {
                    path: 'config',
                    element: (
                      <ProtectedRoute
                        page={<SettingConfig />}
                        condition={ALL_PERMISSIONS.storeSetting.viewSettings}
                      />
                    ),
                    // element: <SettingConfig />,
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
                element: (
                  <ProtectedRoute
                    page={<FaqPage />}
                    condition={ALL_PERMISSIONS.storeFaq.viewFaqs}
                  />
                ),
                // element: <FaqPage />,
              },
            ],
          },
          {
            path: 'notification',
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute
                    page={<NotificationPage />}
                    condition={
                      ALL_PERMISSIONS.storeNotification.viewNotifications
                    }
                  />
                ),
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
