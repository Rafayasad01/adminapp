import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/redux-hooks';
import { logout } from '../../../../redux/features/authStateSlice';

function SuperAdminLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    navigate('../auth/login');
  });
  return <></>;
}

export default SuperAdminLogout;
