import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { defineRules } from './services/permissions/permissions';

function App() {

  const dataRole = useSelector((state: any) => state)
  console.log("dataRole", dataRole.roleState.role.permissions);

  useEffect(() => {
    dataRole && dataRole.roleState.role &&
      defineRules(dataRole.roleState.role.permissions)
  }, [dataRole])

  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
