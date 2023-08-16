import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../components/common/TopBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Map from '../../components/common/Map';
import MapAddress from '../../components/common/MapAddress';
import Service from '../../services/adminapp/adminDriver';
import ActionMenu from '../../components/common/ActionMenu';
import DriversScheduleCreatePopup from './DriversScheduleCreatePopup';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../redux/redux-hooks';
import DriversScheduleEditPopup from './DriversScheduleEditPopup';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import assets from '../../assets';

function DriversSchedulePage() {
  const authState: any = useAppSelector((state) => state.authState);
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [address, setAddress] = useState<string>('');
  const [editFormData, setEditFormData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState("");
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const id: any = params.driverId;

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      getData(actionMenuItemid);
    } else if (option === 'Delete') {
      deleteEntity(actionMenuItemid);
    }
  }

  const deleteEntity = (id: string) => {
    const data = {
      is_active: false,
      is_deleted: true,
      updated_by: authState.user.id
    }
    Service.deleteScheduleService(id, data).then((item: any) => {
      if (item.data.success) {
        setList((newArr: any) => {
          return newArr.filter((newItem: any) => newItem.id !== item.data.data.id);
        });
      }
    })
  }

  const getData = (id: string) => {
    Service.getSchedule(id).then((item: any) => {
      if (item.data.success) {
        setEditFormData(item.data.data);
        setOpenEditFormDialog(true);
      }
    })
  }

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.searchScheduleService(id, searchTxt, newPage, rowsPerPage).then(item => {
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
      Service.getListScheduleService(id, newPage, rowsPerPage).then(item => {
        console.log('item::::::::', item)
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchScheduleService(id, search, newPage, rowsPerPage).then(item => {
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
      Service.getListScheduleService(id, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      Service.searchScheduleService(id, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };


  useEffect(() => {
    Service.getScheduleService(id).then((item: any) => {
      if (item.data.success) {
        setAddress(item.data.data.appUserAddress);
        setDetail(item.data.data);
        if (item.data.data.appDriverWorkingSchedule && item.data.data.appDriverWorkingSchedule.length > 0) {
          setList(item.data.data.appDriverWorkingSchedule.reverse());
          setTotal(Number(item.data.data.total));
        }
      }
    })
  }, []);

  const createFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("app_user", id);
    formData.append("created_by", authState.user.id);
    formData.append("updated_by", authState.user.id);
    Service.createSchedule(actionMenuItemid, formData).then((item) => {
      if (item.data.success) {
        list.unshift(item.data.data);
        setList(list);
      }
    })
  }

  const updateFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("updated_by", authState.user.id);
    Service.updateSchedule(actionMenuItemid, formData).then((item) => {
      if (item.data.success) {
        setList((newArr: any) => {
          return newArr.map((newItem: any) => {
            if (newItem.id === actionMenuItemid) {
              newItem.startTime = item.data.data.startTime;
              newItem.endTime = item.data.data.endTime;
              return { ...newItem }
            }
          });
        });
      }
    })
  }
  const handleSwitchChange = (event: any, id: string) => {
    if (list.length > 1) {
      Service.updateStatusScheduleService(id).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
                item.isActive = true;
              } else {
                item.isActive = false;
              }
              return { ...item };
            })
          })
        }
      })
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TopBar isNestedRoute title="Driver Schedule" />
      {detail && (
        <div className="container mt-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
              <div className="flex w-full items-center">

                {detail.avatar ? (
                  <img
                    src={detail.avatar}
                    alt=""
                    className="mr-4 w-[100px] rounded-full"
                  />
                ) : (
                  <Avatar className="avatar flex flex-row items-center" sx={{ bgcolor: '#1D1D1D', width: 100, height: 100, textTransform: 'uppercase', fontSize: '25px', marginRight: '10px' }}>{detail.firstName.charAt(0)}{detail.lastName.charAt(0)}</Avatar>
                )}
                <div className="flex flex-col justify-start justify-items-center">
                  <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                    {`${detail.firstName} ${detail.lastName}`}
                  </span>
                  <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                    {detail.phone}
                  </span>
                  <span className={`font-sm mt-2 font-open-sans text-sm ${detail.isActive ? 'text-[#29CC97]' : 'text-[#f50057]'}`}>
                    {detail.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <Divider className="mt-4" />
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col">
                  <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Email
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.email}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    License Number
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.licenseNumber}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                    Availibility
                  </span>
                  <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                    {detail.status}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon mt-4"
                    onClick={() => setOpenFormDialog(true)}
                  >
                    <AddOutlinedIcon /> Add New
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-8 min-h-[375px] rounded-lg bg-[#fff] shadow-lg">
              <MapAddress address={address} zoom={15} />
            </div>
          </div>
          {list.length > 0 && (
            <div className="mt-3 grid grid-cols-12">
              <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
                <div className="flex justify-between">
                  <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                    Working Schedule History
                  </span>
                  <div className="flex-grow">&nbsp;</div>
                  {/* <FormControl
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
                  </FormControl> */}
                </div>
                <div className="mt-3 grid grid-cols-none">
                  <table className="table-border table-auto">
                    <thead>
                      <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item: any, index: number) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <div className="flex flex-col">
                                <span className="text-sm font-normal text-[#1A1A1A]">
                                  {`${dayjs(item.startTime).format('HH:mm A')}`}
                                </span>

                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col">
                                <span className="text-sm font-normal text-[#1A1A1A]">
                                  {`${dayjs(item.endTime).format('HH:mm A')}`}
                                </span>
                              </div>
                            </td>
                            <td>
                              {!item.isActive ? (
                                <span className="badge badge-danger">Inactive</span>
                              ) : (
                                <span className="badge badge-success">Active</span>
                              )}
                            </td>
                            <td>
                              <Switch
                                checked={item.isActive}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSwitchChange(event, list[index].id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className='w-[100%] mt-3 flex justify-center py-3'>
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
          )}
        </div>
      )}
      {actionMenuAnchorEl && (
        <ActionMenu open={actionMenuOpen} anchorEl={actionMenuAnchorEl} setAnchorEl={setActionMenuAnchorEl} options={actionMenuOptions} callback={manuHandler} />
      )}
      <DriversScheduleCreatePopup
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        callback={createFormHandler}
      />
      <DriversScheduleEditPopup
        openFormDialog={openEditFormDialog}
        setOpenFormDialog={setOpenEditFormDialog}
        formData={editFormData}
        callback={updateFormHandler}
      />
    </LocalizationProvider>
  );
}

export default DriversSchedulePage;
