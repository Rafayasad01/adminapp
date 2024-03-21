import 'devextreme/dist/css/dx.light.css';
/* eslint-disable no-console */
import { useNavigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routeObjects } from './routes/AppRoutes';
import { useAppDispatch } from './redux/redux-hooks';
import system from './services/adminapp/SystemConfig';
import { setSystemConfig, setTheme } from './redux/features/authStateSlice';
import Loader from './components/common/Loader';

function App() {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setIsPageLoader(true);
    const currentURL = getDomain();
    system
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
          navigate('./admin/auth/404', { replace: true });
          // showNotification(res.data.message, 'error');
          // console.log('404 page');
        }
      })
      .catch(() => {
        console.log('4042');
        setIsPageLoader(false);
        navigate('./admin/auth/404', { replace: true });
        // showNotification(err.message, 'error');
      });
  }, []);

  const routes = useRoutes(routeObjects);
  return !isPageLoader ? routes : <Loader />;
}

export default App;
