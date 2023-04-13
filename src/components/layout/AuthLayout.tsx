/* eslint-disable prettier/prettier */
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';

function AuthLayout() {
  const authState = useAppSelector((state) => state.authState);
  return !authState.isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default AuthLayout;
