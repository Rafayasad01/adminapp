/* eslint-disable prettier/prettier */

import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import assets from '../../assets';
import { setItemState, setLogo } from '../../redux/features/appSlice';
import { logout } from '../../redux/features/authSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { listingRolePermission } from '../../utils/helper';
import { ALL_PERMISSIONS } from '../../utils/constants';
import permissions from '../../services/permissions/permissions';

function Sidebar() {
  const navigate = useNavigate();
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const authState: any = useAppSelector((state: any) => state?.authState);

  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
    dispatch(setItemState(null));
    dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  };

  const customHeight: any = (allowedPermissions: any) => {
    if (!Array.isArray(allowedPermissions)) {
      return 660; // Default height
    }
    const activePermissions: any = allowedPermissions?.filter(
      ([role, permission]) => listingRolePermission(role, permission)
    );

    const heightPerButton = 60;
    const baseHeight = 100;

    return Math.min(
      baseHeight + activePermissions.length * heightPerButton,
      660
    );
  };

  const dynamicHeight = useMemo(() => customHeight(permissions), [permissions]);

  return (
    <div className="side-bar-menu relative h-full">
      <div className="space-between left-0 top-0 flex h-full w-full max-w-[100px] flex-grow flex-col bg-[#f5f5f5] p-2">
        <div className="mb-4 basis-[10%]">
          <div className="mx-auto max-w-[50px]">
            <img src={assets.images.logo} alt="logo" />
          </div>
        </div>
        <div className="basis-[60%] self-center">
          <div
            className="w-[60px] rounded-[45px] bg-[#C9C9C9] text-center"
            style={{ maxHeight: `${dynamicHeight}px` }}
          >
            <NavLink to="/admin/dashboard/home">
              <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                <img
                  src={assets.images.slIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </NavLink>
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjects
            ) && (
              <NavLink to="/admin/dashboard/projects">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.projectIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(dataRole, ALL_PERMISSIONS.products.view) && (
              <NavLink to="/admin/dashboard/products">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.box}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectAttachments
            ) && (
              <NavLink to="/admin/dashboard/attachments">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.photoIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectUsers
            ) && (
              <NavLink to="/admin/dashboard/ne-users">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.busnessIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectAdminUsers
            ) && (
              <NavLink to="/admin/dashboard/ne-admin-users">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.startegyIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewRole
            ) && (
              <NavLink to="/admin/dashboard/ne-role">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.clipboardIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.vendors.viewVendorTypes
            ) && (
              <NavLink to="/admin/dashboard/vendor-types">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.vendorTypesIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(dataRole, ALL_PERMISSIONS.vendors.view) && (
              <NavLink to="/admin/dashboard/vendors">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.supplyIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.quotations.view
            ) && (
              <NavLink to="/admin/dashboard/quotations">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.quotationIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )}
            {/* {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.quotations.view
            ) && (
              <NavLink to="/admin/dashboard/jobs">
                <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.jobsIcon}
                    alt="job-icon"
                    className="w-[24px]"
                  />
                </Button>
              </NavLink>
            )} */}
          </div>
        </div>
        <div className="basis-[20%]">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button className="my-[8px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent p-0">
              <img
                src={assets.images.avatar1}
                alt="icon"
                className="h-full w-full max-w-full object-contain"
              />
            </Button>
            {authState ? (
              <Button
                onClick={() => {
                  logOut();
                  navigate('/admin');
                }}
                className="btn-flips h-[50px] min-w-[50px] rounded-[28px] bg-[#C9C9C9]"
              >
                <img
                  src={assets.images.logoutIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
