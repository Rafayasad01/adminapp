import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';

function App() {
  // const dataRole = useAppSelector((state: any) => state)
  // console.log("dataRole", dataRole.roleState.role.permissions);

  // useEffect(() => {
  //   if (dataRole && dataRole.roleState.role) {
  //     defineRules(dataRole.roleState.role.permissions)
  //   }
  // }, [dataRole])

  // if (process.env.NODE_ENV === 'development') {
  //   console.log = () => {};
  //   console.error = () => {};
  //   console.warn = () => {};
  // }

  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
