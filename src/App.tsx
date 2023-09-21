import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { routeObjects } from './routes/AppRoutes';
import { defineRules } from './services/permissions/permissions';

function App() {
  // const dataRole = useSelector((state: any) => state)
  // console.log("dataRole", dataRole.roleState.role.permissions);

  // useEffect(() => {
  //   if (dataRole && dataRole.roleState.role) {
  //     defineRules(dataRole.roleState.role.permissions)
  //   }
  // }, [dataRole])

  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
