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
import CategoriesCreatePopup from './CategoriesCreatePopup';
import assets from '../../assets';
import CategoriesEditPopup from './CategoriesEditPopup';
import category from '../../services/adminapp/adminCategory';
import { useAppSelector } from '../../redux/redux-hooks';
import dayjs from 'dayjs';
import ActionMenu from '../../components/common/ActionMenu';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';

function CategoriesPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState("");
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Service', 'Edit', 'Delete'];

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClickSearch = (event: any) => {
    const searchTxt = event.target.value as string;
    const newPage = 0;
    setSearch(searchTxt);
    setPage(newPage);
    category.searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage).then(item => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    })
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    //offset? ,limit rowsperpage hoga ofset page * rowsperPage
    if (search === "" || search === null || search === undefined) {
      category.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      category.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
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
      category.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    } else {
      category.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
    }
  };

  useEffect(() => {
    category.getListService(authState.user.tenant, page, rowsPerPage).then((item: any) => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    }).catch(error => {
      console.log('error::::::::', error)
    })
  }, []);
  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      category.getCategory(actionMenuItemid).then((item: any) => {
        if (item.data.success) {
          setEditFormData(item.data.data);
          setOpenEditFormDialog(true);
        }
      })
    } else if (option === 'Service') {
      navigate(`service/${actionMenuItemid}`);
    } else if (option === 'Delete') {
      deleteHandler(actionMenuItemid);
    }
  }
  const createFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon);
    formData.append("tenant", authState.user.tenant);
    formData.append("created_by", authState.user.id);
    formData.append("updated_by", authState.user.id);
    category.create(formData).then((item) => {
      if (item.data.success) {
        list.push(item.data.data);
        setList(list);
      }
    })
  }

  const updateFormHandler = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("updated_by", authState.user.id);
    if (data.icon !== null) formData.append("icon", data.icon);
    category.updateCategory(actionMenuItemid, formData).then((updateItem: any) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === updateItem.data.data.id) {
              item.name = updateItem.data.data.name;
              if (updateItem.data.data.hasOwnProperty('icon')) item.icon = updateItem.data.data.icon;
            }
            return { ...item };
          })
        })
      }
    })
  }

  const handleSwitchChange = (event: any, id: string) => {
    const data = {
      is_active: event.target.checked,
      updated_by: authState.user.id
    }
    category.updateStatus(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.map((item: any) => {
            if (item.id === id) {
              item.isActive = updateItem.data.data.isActive;
            }
            return { ...item };
          })
        })
      }
    })
  };

  const deleteHandler = (id: string) => {
    const data = {
      is_active: false,
      is_deleted: true,
      updated_by: authState.user.id
    }
    category.deleteCategory(id, data).then((updateItem) => {
      if (updateItem.data.success) {
        setList((newArr: any) => {
          return newArr.filter((item: any) => item.id !== id);
        })
        let newtotal = total;
        setTotal(newtotal -= 1)
      }
    })
  };

  return (
    <>
      <TopBar title="Categories" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Categories
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
                  <th>Category Name</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list && list.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="avatar flex flex-row items-center">
                          {item.icon ? (
                            <img src={item.icon} alt="" />
                          ) : (<img src={assets.tempImages.avatarDryCLean} alt="" />)}
                          <div className="flex flex-col items-start justify-start">
                            <span className="text-sm font-semibold">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{dayjs(item.createdDate).isValid() ? dayjs(item.createdDate)?.format('ddd, MMM DD, YYYY hh:mm:ssA') : '--'}</td>
                      <td>{item.isActive ? (<span className="badge badge-success">Enabled</span>) : (<span className="badge badge-danger">Disabled</span>)}</td>

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
      {actionMenuAnchorEl && (
        <ActionMenu open={actionMenuOpen} anchorEl={actionMenuAnchorEl} setAnchorEl={setActionMenuAnchorEl} options={actionMenuOptions} callback={manuHandler} />
      )}
      {openFormDialog && (
        <CategoriesCreatePopup
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <CategoriesEditPopup
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default CategoriesPage;
