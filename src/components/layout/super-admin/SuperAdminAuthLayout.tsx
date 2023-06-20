import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/redux-hooks';

function SuperAdminAuthLayout() {
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.authState);
  useEffect(() => {
    if (authState.user && authState.user?.isSuperAdmin) {
      navigate("../../../admin/main/dashboard");
    } else if (authState.user && !authState.user?.isSuperAdmin) {
      navigate("../../../dashboard/home");
    }
  }, []);
  return (
    <div className="h-screen bg-super-admin-auth-background bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}

export default SuperAdminAuthLayout;
