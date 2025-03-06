import 'devextreme/dist/css/dx.light.css';
/* eslint-disable no-console */
import { useNavigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routeObjects } from './routes/AppRoutes';
import { useAppDispatch } from './redux/redux-hooks';
import system from './services/adminapp/SystemConfig';
import { setSystemConfig, setTheme } from './redux/features/authStateSlice';
import Loader from './components/common/Loader';
import { getItem } from './utils/storage';

function App() {
  const dispatch = useAppDispatch();
  const systemConfig = getItem('SYSTEM_CONFIG');
  const navigate = useNavigate();
  const [isPageLoader, setIsPageLoader] = useState(false);
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  const getDomain = () => {
    // const regexPattern = /localhost/;
    // let a = 'https://devwebapp.urapptech.com/admin/auth/login';
    // console.log('a::::::', a);
    // const newTxt = a.split('/')[2].split('.')[0];
    // console.log('newTxt::::::', newTxt);
    // let url = currentURL;
    // if (regexPattern.test(currentURL)) {
    //   url = currentURL.split('/')[2].split(':')[0];
    // } else {
    //   url = currentURL.split('/')[2].split('.')[0];
    // }
    // console.log('url', url);

    const domain = window.location.hostname;
    return domain.split('.')[0];
    // return 'asdasdsa';
  };

  // useEffect(() => {
  //   setIsPageLoader(true);
  //   const currentURL = getDomain();
  //   system
  //     .getSystemConfig(currentURL)
  //     .then((res: any) => {
  //       setIsPageLoader(false);
  //       if (res.data.success) {
  //         const systemConfigData = {
  //           createdDate: res.data.data.createdDate,
  //           domain: res.data.data.domain,
  //           id: res.data.data.id,
  //           logoffImage: res.data.data.logoffImage,
  //           tenant: res.data.data.tenant,
  //           shopName: res.data.data.tenantConfig.name,
  //           shopLogo: res.data.data.tenantConfig.logo,
  //         };
  //         dispatch(setTheme(res.data.data.theme.value.themeColor));
  //         dispatch(setSystemConfig(systemConfigData));
  //       } else {
  //         setIsPageLoader(false);
  //         console.log('4041');
  //         navigate('./admin/auth/404', { replace: true });
  //         // showNotification(res.data.message, 'error');
  //         // console.log('404 page');
  //       }
  //     })
  //     .catch(() => {
  //       console.log('4042');
  //       setIsPageLoader(false);
  //       navigate('./admin/auth/404', { replace: true });
  //       // showNotification(err.message, 'error');
  //     });
  // }, []);

  useEffect(() => {
    if (systemConfig) return;
    system
      .getSystemConfig(window.location.hostname)
      .then((res: any) => {
        if (res.data.success) {
          dispatch(setSystemConfig(res.data.data));
          const assignedTheme = res.data.data.assignThemes?.find(
            (x: any) => x.id === res.data.data.theme
          );
          if (assignedTheme) dispatch(setTheme(assignedTheme.value.themeColor));
        } else {
          console.log('4042');
        }
      })
      .catch(() => {
        console.log('4042');
        // ToastHandler('fetching system config failed');
        // setIsPageLoader(false);
        // navigate('./admin/auth/404', { replace: true });
        // showBoundary(new Error('fetching system config failed'));
        // showNotification(err.message, 'error');
      });
  }, []);

  const routes = useRoutes(routeObjects);
  return !isPageLoader ? routes : <Loader />;
}

export default App;
