import 'devextreme/dist/css/dx.light.css';
/* eslint-disable no-console */
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRoutes } from 'react-router-dom';
import Loader from './components/common/Loader';
import { setLogo, setTenantConfig } from './redux/features/appSlice';
import { setSystemConfig, setTheme } from './redux/features/authSlice';
import { useAppDispatch } from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';
import systemConfigService from './services/adminapp/systemConfig';
import monitorIdleTime from './utils/idle';
import { getItem } from './utils/storage';

dayjs.extend(duration);

function App() {
  const dispatch = useAppDispatch();
  const systemConfig = getItem('SYSTEM_CONFIG');
  // const userData = useAppSelector((state: any) => state?.authState?.user);
  const { showBoundary } = useErrorBoundary();
  const [isPageLoader, setIsPageLoader] = useState(false);
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
  ) {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  useEffect(() => {
    const intervalTime = dayjs.duration(5, 'minutes').asMilliseconds();
    const idleTime = dayjs.duration(15, 'minutes').asMilliseconds();
    monitorIdleTime(intervalTime, idleTime, () => {
      localStorage.clear();
      window.location.replace('/');
    });
  }, []);

  useEffect(() => {
    if (systemConfig) return;
    setIsPageLoader(true);
    systemConfigService
      .getSystemConfig(window.location.hostname)
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
            dispatch(setTenantConfig(res.data.data.tenantConfig));
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
