import 'devextreme/dist/css/dx.light.css';
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  // useLocation,
  useRoutes,
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
// import ReactGA from 'react-ga4';
import Loader from './components/common/Loader';
import { setSystemConfig, setTheme } from './redux/features/authSlice';
import {
  useAppDispatch,
  // useAppSelector
} from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';
import systemConfigService from './services/adminapp/systemConfig';
// import { routeConfig } from './utils/constants';

function App() {
  const dispatch = useAppDispatch();
  // const authState: any = useAppSelector((state) => state?.authState);
  const { showBoundary } = useErrorBoundary();
  const [isPageLoader, setIsPageLoader] = useState(true);
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
  ) {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  const getDomain = () => {
    const domain = window.location.hostname;
    return domain.split('.')[0];
    // return 'asdasdsa';
  };

  useEffect(() => {
    setIsPageLoader(true);
    const currentURL = getDomain();
    systemConfigService
      .getSystemConfig(currentURL)
      .then((res: any) => {
        setIsPageLoader(false);
        if (res.data.success) {
          // navigate('./admin/auth/', { replace: true });
          // console.log('res.data.data::::::', res.data.data);
          const systemConfigData = {
            createdDate: res.data.data.createdDate,
            domain: res.data.data.domain,
            id: res.data.data.id,
            logoffImage: res.data.data.logoffImage,
            tenant: res.data.data.tenant,
            shopName: res.data.data.tenantConfig.name,
            shopLogo: res.data.data.tenantConfig.logo,
          };
          dispatch(setTheme(res.data.data.theme.value.themeColor));
          dispatch(setSystemConfig(systemConfigData));
        } else {
          setIsPageLoader(false);
          console.log('4041');
          showBoundary(new Error('fetching system config failed'));
          // navigate('./admin/auth/404', { replace: true });
          // showNotification(res.data.message, 'error');
          // console.log('404 page');
        }
      })
      .catch(() => {
        console.log('4042');
        setIsPageLoader(false);
        // navigate('./admin/auth/404', { replace: true });
        showBoundary(new Error('fetching system config failed'));
        // showNotification(err.message, 'error');
      });
  }, []);

  // const location = useLocation();

  // useEffect(() => {
  //   // Send pageview with the current path
  //   const pageName: any = routeConfig[location.pathname] || 'Unknown Page';
  //   const pageActivity = 'Page View';
  //   ReactGA.send({
  //     hitType: 'pageview',
  //     page: location.pathname + location.search,
  //     title: pageName,
  //     customDimensions: {
  //       1: authState?.user?.name, // User Name (Assuming '1' is the index for User Name in GA custom dimensions)
  //       2: pageName, // Page Name (Assuming '2' is the index for Page Name in GA custom dimensions)
  //       3: pageActivity, // Page Activity (Assuming '3' is the index for Page Activity in GA custom dimensions)
  //     },
  //   });
  //   ReactGA.event({
  //     category: 'Page Activity',
  //     action: pageActivity,
  //     label: pageName,
  //   });
  // }, [location, authState?.user?.name]);

  const routes = useRoutes(routeObjects);
  return !isPageLoader ? routes : <Loader />;
}

export default App;
