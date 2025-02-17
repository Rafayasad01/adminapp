/* eslint-disable prettier/prettier */

import { Button } from '@mui/material';
// import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import Tooltip from '@mui/material/Tooltip';
import assets from '../../assets';
import { setItemState, setLogo } from '../../redux/features/appSlice';
import { logout } from '../../redux/features/authSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import // ALL_PERMISSIONS,
// MODULE_BRANCHES,
// MODULE_EMPLOYEES,
// MODULE_SETTINGS,
'../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import { ALL_PERMISSIONS } from '../../utils/constants';

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
  return (
    <div className="side-bar-menu fixed h-full">
      <div className="space-between left-0 top-0 flex h-full w-full max-w-[100px] flex-grow flex-col overflow-auto  bg-[#f5f5f5] p-2">
        <div className="mb-4 basis-[10%]">
          <div className="mx-auto max-w-[80px]">
            <img
              src={assets.images.logo}
              width={70}
              className="self-center"
              alt="logo"
            />
          </div>
        </div>
        <div className="mx-auto basis-[60%]">
          <div className="max-h-[850px] w-[75px] rounded-[45px] bg-[#C9C9C9] text-center">
            <NavLink to="/admin/dashboard/home">
              {/* <Tooltip title="Dashboard" arrow placement="left"> */}
              <div className="">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.slIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Home
                  </span>
                </button>
              </div>
              {/* </Tooltip> */}
            </NavLink>
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjects
            ) && (
              <NavLink to="/admin/dashboard/projects">
                {/* <Tooltip title="Projects" arrow placement="left"> */}
                <div className="">
                  <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.projectIcon}
                      alt="icon"
                      className="mx-5 w-[24px]"
                    />
                    <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                      Projects
                    </span>
                  </button>
                </div>

                {/* <Button className="btn-flips my-[5px] h-[60px] min-w-[60px] flex-col rounded-[30px] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.projectIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                  <span className="btn-flips mt-[1px] block text-[8px] leading-[14px] text-secondary">
                    Projects
                  </span>
                </Button> */}
                {/* </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(dataRole, ALL_PERMISSIONS.products.view) && (
              <NavLink to="/admin/dashboard/products">
                <div className="">
                  <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.box}
                      alt="icon"
                      className="mx-5 w-[24px]"
                    />
                    <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                      Products
                    </span>
                  </button>
                </div>

                {/* <Button
                  variant="text"
                  className="btn-flips my-[0px] h-[65px] min-w-[65px] flex-col rounded-[32px] bg-transparent hover:bg-[#F27426]"
                >
                  <img
                    src={assets.images.box}
                    alt="icon"
                    className="w-[24px]"
                  />
                  <span className="mt-[1px] block truncate text-[8px] leading-[14px] text-secondary">
                    Products
                  </span>
                </Button> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectAttachments
            ) && (
              <NavLink to="/admin/dashboard/attachments">
                <div className="">
                  <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.photoIcon}
                      alt="icon"
                      className="mx-5 w-[24px]"
                    />
                    <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                      Attachments
                    </span>
                  </button>
                </div>
                {/* <Tooltip title="Attachments" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.photoIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectUsers
            ) && (
              <NavLink to="/admin/dashboard/ne-users">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.busnessIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Users
                  </span>
                </button>
                {/* <Tooltip title="Users" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.busnessIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewProjectAdminUsers
            ) && (
              <NavLink to="/admin/dashboard/ne-admin-users">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.startegyIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Admins
                  </span>
                </button>
                {/* <Tooltip title="Admin-Users" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.startegyIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.storePlans.viewRole
            ) && (
              <NavLink to="/admin/dashboard/ne-role">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.clipboardIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Role
                  </span>
                </button>
                {/* <Tooltip title="Role" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.clipboardIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.vendors.viewVendorTypes
            ) && (
              <NavLink to="/admin/dashboard/vendor-types">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.vendorTypesIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Vendor-Types
                  </span>
                </button>
                {/* <Tooltip title="Vendor-Types" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.vendorTypesIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(dataRole, ALL_PERMISSIONS.vendors.view) && (
              <NavLink to="/admin/dashboard/vendors">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.supplyIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Vendors
                  </span>
                </button>
                {/* <Tooltip title="Vendors" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.supplyIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
            {listingRolePermission(
              dataRole,
              ALL_PERMISSIONS.quotations.view
            ) && (
              <NavLink to="/admin/dashboard/quotations">
                <button className="btn-flips my-[6px] h-[65px] min-w-[55px] rounded-[50%] bg-transparent hover:bg-[#F27426]">
                  <img
                    src={assets.images.quotationIcon}
                    alt="icon"
                    className="mx-5 w-[24px]"
                  />
                  <span className="mt-[1px] block text-[10px] leading-[14px] text-secondary">
                    Quotations
                  </span>
                </button>
                {/* <Tooltip title="Quotations" arrow placement="left">
                  <Button className="btn-flips my-[5px] h-[50px] min-w-[50px] rounded-[28px] bg-transparent hover:bg-[#F27426]">
                    <img
                      src={assets.images.quotationIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </Tooltip> */}
              </NavLink>
            )}
          </div>
        </div>
        <div className="mt-3 basis-[20%]">
          <div className="flex flex-col items-center justify-center gap-2">
            {authState ? (
              <Button
                onClick={() => {
                  logOut();
                  navigate('/admin');
                }}
                className="btn-flips h-[60px] min-w-[60px] rounded-[50%] bg-[#C9C9C9]"
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
