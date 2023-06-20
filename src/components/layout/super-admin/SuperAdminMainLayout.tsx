import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../../super-admin/common/SuperAdminSidebar';
import { useAppSelector } from '../../../redux/redux-hooks';

function SuperAdminMainLayout() {
  const navigate = useNavigate();
  const authState = useAppSelector((state: any) => state.authState);
  useEffect(() => {
    if (authState.user && !authState.user?.isSuperAdmin) {
      navigate("../../../admin/auth/login");
    } else if (authState.user == null) {
      navigate("../../../admin/auth/login");
    }
  }, []);

  return (
    <div className="flex">
      <nav className="w-64 flex-shrink-0">
        <SuperAdminSidebar />
      </nav>
      <main className="min-h-screen w-full flex-grow bg-neutral-200 p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default SuperAdminMainLayout;
