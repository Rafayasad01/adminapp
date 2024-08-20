import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputAdornment from '@mui/material/InputAdornment';
// import Switch from '@mui/material/Switch';
// import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
// import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import LinearProgress, {
//   linearProgressClasses,
// } from '@mui/material/LinearProgress';
// import assets from '../../assets';
import dayjs from 'dayjs';
import Switch from '@mui/material/Switch';
import ActionMenu from '../../../components/common/ActionMenu';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeService from '../../../services/adminapp/adminStoreService';
import storeProjectPlanService from '../../../services/adminapp/adminProjectPlans';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import {
  CheckRolePermission,
  listingRolePermission,
} from '../../../utils/helper';
// import ServiceCatCreatePopup from './ServiceCatCreatePopup';
// import ServiceCatEditPopup from './ServiceCatEditPopup';
import PermissionPopup from '../../../utils/PermissionPopup';
// import ProjectPlanAddPopup from './ProjectAddPopup';
import ProjectPlanEditPopup from './ProjectEditPopup';
import ProjectAddPopup from './ProjectAddPopup';
// import Switch from '@mui/material/Switch';

// import CategoriesCreatePopup from './CategoriesCreatePopup';
// import CategoriesEditPopup from './CategoriesEditPopup';

function ProjectPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([
    {
      stage: 'Demo',
      room: 'Room 1',
      activity: 'floor tiles removal, skirting removal, wall demonstration',
      status: '75',
      remarks: 'completed',
    },
  ]);
  const [
    ,
    // editFormData
    setEditFormData,
  ] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(false);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Plans', 'Edit', 'Delete'];
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Category ?'
  );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.add)) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewPlans)) {
      storeProjectPlanService
        .getListProjectService(authState.user.tenant)
        .then((item: any) => {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        })
        .catch((error) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: error.message,
            type: 'error',
          });
        });
    }
  }, [null]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      storeService
        .StoreCatList(searchTxt, newPage, rowsPerPage)
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    storeService
      .StoreCatList(search, newPage, rowsPerPage)
      .then((item: any) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    storeService.StoreCatList(search, newPage, newRowperPage).then((item) => {
      setList(item.data.data.list);
      setTotal(item.data.data.total);
    });
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    storeService
      .StoreCatDelete(id, data)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: updateItem.data.message,
            type: 'success',
          });
          setList((newArr: any) => {
            return newArr.filter((item: any) => item.id !== id);
          });
          let newtotal = total;
          setTotal((newtotal -= 1));
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  // const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //   height: 10,
  //   borderRadius: 5,
  //   [`&.${linearProgressClasses.colorPrimary}`]: {
  //     backgroundColor:
  //       theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  //   },
  //   [`& .${linearProgressClasses.bar}`]: {
  //     borderRadius: 5,
  //     backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  //   },
  // }));

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.editService
        )
      ) {
        // console.log('actionMenuItemid', actionMenuItemid, list);
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        setActionMenuItemid(editFormDatas.id);
        setEditFormData(editFormDatas);
        setOpenEditFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Services') {
      // navigate(`../item/${actionMenuItemid}`);
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewServices
        )
      ) {
        CheckRolePermission(
          ALL_PERMISSIONS.storeAppointment.viewServices,
          dataRole,
          navigate,
          `services/${actionMenuItemid}`
        );
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Delete') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.deleteService
        )
      ) {
        setCancelDialogOpen(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  };

  const createFormHandler = (data: any) => {
    console.log('data==>', data);
    setIsLoader(true);
    storeProjectPlanService
      .fileUploadService(authState.user.tenant, data)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleUpdatePlan = (data: any) => {
    console.log('🚀 ~ handleUpdatePlan ~ data:', data);
    // setEditFormData(true);
    // setIsLoader(true);
    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('description', data.description);
    // if (data.avatar) formData.append('avatar', data.avatar);
    // storeService
    //   .StoreCatUpdate(actionMenuItemid, formData)
    //   .then((updateItem: any) => {
    //     if (updateItem.data.success) {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'success',
    //       });
    //       for (let i = 0; i < list.length; i += 1) {
    //         if (list[i].id === updateItem.data.data.id) {
    //           list[i].name = updateItem.data.data.name;
    //           list[i].description = updateItem.data.data.description;
    //           if (updateItem.data.data.avatar) {
    //             list[i].avatar = updateItem.data.data.avatar;
    //           }
    //         }
    //       }
    //     } else {
    //       setIsLoader(false);
    //       setIsNotify(true);
    //       setNotifyMessage({
    //         text: updateItem.data.message,
    //         type: 'error',
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoader(false);
    //     setIsNotify(true);
    //     setNotifyMessage({
    //       text: err.message,
    //       type: 'error',
    //     });
    //   });
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.edit)) {
      const data = {
        isActive: event.target.checked,
      };
      storeService.StoreCatUpdateStatus(id, data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === id) {
                item.isActive = updateItem.data.data.isActive;
              }
              return { ...item };
            });
          });
        }
      });
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  // const openModal = (avatar: string) => {
  //   setModalImage(avatar);
  //   setIsModalImage(true);
  // };

  const closeModal = () => {
    setModalImage('');
    setIsModalImage(false);
  };

  // const randomBadgeColor = (colors: string) => {
  //   const randomIndex = Math.floor(Math.random() * colors.length);
  //   return colors[randomIndex];
  // };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Projects" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Projects
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-secondary"
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
                  <th>Name</th>
                  <th className="w-[30%]">Address</th>
                  <th>Budget</th>
                  <th>Start Date</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.name ? item.name : '--'}</td>
                        <td>{item.address ? item.address : '--'}</td>
                        <td>{item.budget ? item.budget : '--'}</td>
                        <td>
                          {dayjs(item.startDate).isValid()
                            ? dayjs(item.startDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.createdDate).isValid()
                            ? dayjs(item.createdDate)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
                            {/* <div
                              className="cursor-pointer"
                              onClick={() => setOpenEditFormDialog(true)}
                            >
                              <EditIcon />
                            </div> */}
                            <IconButton
                              className="btn-dot"
                              aria-label="more"
                              id="long-button"
                              aria-controls={
                                actionMenuOpen ? 'long-menu' : undefined
                              }
                              aria-expanded={
                                actionMenuOpen ? 'true' : undefined
                              }
                              aria-haspopup="true"
                              onClick={(
                                event: React.MouseEvent<HTMLElement>
                              ) => {
                                setActionMenuItemid(item.id);
                                setActionMenuAnchorEl(event.currentTarget);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
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
          {list?.length < 1 ? (
            <CustomText noRoundedBorders text="No Records Found" />
          ) : null}
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
      {cancelDialogOpen && (
        <PermissionPopup
          type="shock"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={statusCancelHandler}
        />
      )}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={manuHandler}
        />
      )}
      {openFormDialog && (
        <ProjectAddPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <ProjectPlanEditPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          // formData={editFormData}
          callback={handleUpdatePlan}
        />
      )}
      {modalImage && (
        <Dialog
          open={isModalImage}
          onClose={closeModal}
          PaperProps={{
            className: 'max-w-[25%] 2xl:min-h-[35%] xl:min-h-[45%]',
            style: {
              // maxWidth: '25%',
              // minHeight: '45%',
              borderRadius: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <div className="flex h-[100%] items-center justify-center">
            <img
              className="max-w-[250px] xl:max-h-[100px] 2xl:max-h-[150px]"
              src={modalImage}
              alt=""
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default ProjectPage;
