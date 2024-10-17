import 'devextreme/dist/css/dx.light.css';
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRoutes } from 'react-router-dom';
import Loader from './components/common/Loader';
import { setSystemConfig, setTheme } from './redux/features/authSlice';
import { useAppDispatch } from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';
import systemConfigService from './services/adminapp/systemConfig';
import { setLogo, setTenantConfig } from './redux/features/appSlice';

function App() {
  const dispatch = useAppDispatch();
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
          if (res.data.data?.tenantConfig) {
            dispatch(setLogo(res.data.data?.tenantConfig?.logo));
            dispatch(setTenantConfig(res.data.data?.tenant));
          }
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

  const routes = useRoutes(routeObjects);
  return !isPageLoader ? routes : <Loader />;
}

export default App;
