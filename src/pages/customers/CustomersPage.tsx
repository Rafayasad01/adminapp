import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../components/common/TopBar';
import CustomersCreatePopup from './CustomersCreatePopup';
import CustomersEditPopup from './CustomersEditPopup';
import TablePagination from '@mui/material/TablePagination';
import { useAppSelector } from '../../redux/redux-hooks';
import ActionMenu from '../../components/common/ActionMenu';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Service from '../../services/adminapp/adminCustomer';

function CustomersPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState("");
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Detail', 'Address', 'Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      })
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === "" || search === null || search === undefined) {
      Service.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    if (search === "" || search === null || search === undefined) {
      Service.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      Service.getService(actionMenuItemid).then((item: any) => {
        if (item.data.success) {
          setEditFormData(item.data.data);
          setOpenEditFormDialog(true);
        }
      })
    } else if (option === 'Address') {
      navigate(`address/${actionMenuItemid}`);
    } else if (option === 'Delete') {
      const data = {
        is_active: false,
        is_deleted: true,
        updated_by: authState.user.id
      }
      Service.deleteService(actionMenuItemid, data).then((item: any) => {
        if (item.data.success) {
          setList((newArr: any) => {
            console.log('newArr:::::', newArr)
            return newArr.filter((newItem: any) => newItem.id !== item.data.data.id);
          });
        }
      })
    } else if (option === 'Detail') {
      navigate(`detail/${actionMenuItemid}`);
    }
  }

  useEffect(() => {
    Service.getListService(authState.user.tenant, page, rowsPerPage).then((item: any) => {
      if (item.data.success) {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      }
    });
  }, []);

  const createFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("tenant", authState.user.tenant);
    formData.append("created_by", authState.user.id);
    formData.append("updated_by", authState.user.id);
    if (data.avatar !== null) formData.append("avatar", data.avatar);
    Service.create(formData).then((item) => {
      if (item.data.success) {
        list.unshift(item.data.data);
        setList(list);
      }
    })
  }

  const updateFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("postal_code", data.postal_code);
    formData.append("updated_by", authState.user.id);
    if (data.avatar !== null) formData.append("avatar", data.avatar);
    Service.updateService(actionMenuItemid, formData).then((item) => {
      if (item.data.success) {
        setList((newArr: any) => {
          return newArr.map((newItem: any) => {
            if (newItem.id === actionMenuItemid) {
              newItem.firstName = item.data.data.firstName;
              newItem.lastName = item.data.data.lastName;
              newItem.phone = item.data.data.phone;
              newItem.postalCode = item.data.data.postalCode;
              if (data.avatar !== null) newItem.phone = item.data.data.avatar;
              return { ...newItem }
            }
          });
        });
      }
    })
  }

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      is_active: event.target.checked,
      updated_by: authState.user.id
    }
    Service.updateStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === updateItem.data.data.id) {
              item.isActive = updateItem.data.data.isActive;
            }
            return { ...item };
          })
        })
      }
    })
  };

  return (
    <>
      {actionMenuAnchorEl && (
        <ActionMenu open={actionMenuOpen} anchorEl={actionMenuAnchorEl} setAnchorEl={setActionMenuAnchorEl} options={actionMenuOptions} callback={manuHandler} />
      )}
      <CustomersCreatePopup
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      />
      <CustomersEditPopup
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        callback={updateFormHandler}
      />
      <TopBar title="Customers" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Customers
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
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleClickSearch(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton aria-label="toggle password visibility">
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Postal Code</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map((item: any, index: number) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="avatar flex flex-row items-center">
                          {item.avatar ? (
                            <img src={item.avatar} alt="" />
                          ) : (
                            <Avatar className="avatar flex flex-row items-center" sx={{ bgcolor: '#1D1D1D', width: 35, height: 35, textTransform: 'uppercase', fontSize: '14px', marginRight: '10px' }}>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</Avatar>
                          )}

                          <div className="flex flex-col items-start justify-start">
                            <span className="text-sm font-semibold">
                              {`${item.firstName} ${item.lastName}`}
                            </span>
                            <span className="text-xs font-normal text-[#6A6A6A]">
                              {dayjs(item.createdDate).isValid() ? dayjs(item.createdDate)?.format('MMMM DD, YYYY') : '--'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.postalCode}</td>
                      <td>
                        {item.isActive ? (
                          <span className="badge badge-success">ACTIVE</span>
                        ) : (
                          <span className="badge badge-danger">INACTIVE</span>
                        )}

                      </td>
                      <td>
                        <div className="flex flex-row-reverse">
                          <IconButton
                            className="btn-dot"
                            aria-label="more"
                            id="long-button"
                            aria-controls={actionMenuOpen ? 'long-menu' : undefined}
                            aria-expanded={actionMenuOpen ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              setActionMenuItemid(list[index].id)
                              setActionMenuAnchorEl(event.currentTarget);
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Switch
                            checked={item.isActive}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSwitchChange(event, list[index].id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </div>
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
    </>
  );
}

export default CustomersPage;
