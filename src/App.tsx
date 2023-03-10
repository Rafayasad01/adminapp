import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';

function App() {
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
