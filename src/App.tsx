import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { useAppDispatch } from './redux/redux-hooks';
import { authLogin } from './redux/features/authStateSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authLogin());
  }, []);

  const routes = useRoutes(routeObjects);

  return routes;
}

export default App;
