import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import { useAppSelector } from '../../../redux/redux-hooks';
import TopBar from '../../../components/common/TopBar';
import Loader from '../../../components/common/Loader';
import Service from '../../../services/superadmin/RolePermissions';
import Notify from '../../../components/common/Notify';
import CustomText from '../../../components/common/CustomText';
import { TEXT_STORE_KEY, setText } from '../../../utils/constants';
import SuperAdminPermissionPagePopup from './SuperAdminPermissionPagePopup';

function SuperAdminPermissionPageDetails() {
  const authState: any = useAppSelector((state) => state.authState);
  const { id } = useParams();
  const { state } = useLocation();

  const [renderingOff, setRenderingOff] = useState<string>('');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [heading, setHeading] = useState<string>('');
  const [childList, setChildList] = useState<any>();

  const handleClickSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const executeQuery = () => {
    Service.getChildSearchPermissionListService(id, page, rowsPerPage, search)
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      })
      .catch((err) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      executeQuery();
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const tempPage = newPage;
    setPage(tempPage);
    // // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === '' || search === null || search === undefined) {
      Service.getPermissionListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getChildSearchPermissionListService(
        id,
        page,
        rowsPerPage,
        search
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    if (search === '' || search === null || search === undefined) {
      Service.getPermissionListService(newPage, rowsPerPage).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.getChildSearchPermissionListService(
        id,
        page,
        rowsPerPage,
        search
      ).then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {
    setIsLoader(true);
    Service.getChildPermissionListService(id, page, rowsPerPage)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'info',
        });
      });
  }, [renderingOff]);

  const handleSwitchChange = (event: any, switchid: string) => {
    const data = {
      isActive: event.target.checked,
      updatedBy: authState.user.id,
    };
    Service.childUpdateStatus(switchid, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === switchid) {
              item.isActive = updateItem.data.data.isActive;
            }
            return { ...item };
          });
        });
      }
    });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Permissions Details" />
      <div className="container m-auto">
        <div className="mt-5 w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                {state && state} Permission Details
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onChange={(event) => handleClickSearch(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton
                          onClick={executeQuery}
                          aria-label="toggle password visibility"
                        >
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <div className="" style={{ overflowY: 'auto' }}>
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                  <th>Sequence</th>
                  <th>Type</th>
                  <th>Show On Menu</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.action}</td>
                        <td>{item.permissionSequence}</td>
                        <td>{item.permissionType}</td>
                        <td>
                          {item.showOnMenu ? (
                            <span className="badge badge-success">ON</span>
                          ) : (
                            <span className="badge badge-danger">OFF</span>
                          )}
                        </td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ENABLED</span>
                          ) : (
                            <span className="badge badge-danger">DISABLED</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {list?.length < 0 ? <CustomText text="No Records Found" /> : null}
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminPermissionPageDetails;
