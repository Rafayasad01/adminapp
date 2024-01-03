/* eslint-disable no-console */
import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';

function App() {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
