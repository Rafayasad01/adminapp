import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { useAppDispatch } from './redux/redux-hooks';
import { authLogin } from './redux/features/authStateSlice';

function App() {
  const dispatch = useAppDispatch();
  dispatch(authLogin());
  const routes = useRoutes(routeObjects);

  return routes;
}

export default App;
