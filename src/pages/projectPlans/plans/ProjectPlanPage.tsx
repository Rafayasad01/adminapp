import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import storePlanService from '../../../services/adminapp/adminProjectPlans';
import {
  ALL_PERMISSIONS,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import { listingRolePermission, sortArrayByKey } from '../../../utils/helper';
import ProjectPlanAddPopup from './ProjectPlanAddPopup';
import ProjectPlanEditPopup from './ProjectPlanEditPopup';
import ProjectPlanDayDetailsPopup, { Day } from './ProjectPlanDayDetailsPopup';
import PermissionPopup from '../../../utils/PermissionPopup';

function ProjectPlanPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const { projectId } = useParams();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [planDay, setPlanDay] = useState<Day | null>();
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to update your plan ?'
  );

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

  const handleUpdatePlanClick = () => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.edit || true)
    ) {
      if (list?.length > 0) {
        setCancelDialogOpen(true);
        // setOpenEditFormDialog(true);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Please add a new plan first',
          type: 'info',
        });
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const getProjectPlans = (project_id: string, data = {}) => {
    storePlanService
      .addProjectPlansService(data, authState.user.tenant, project_id)
      .then((res) => {
        setList(sortArrayByKey(res.data.data.list, 'day', 'asc'));
        setTotal(res.data.data.total);
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

  useEffect(() => {
    if (listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewPlans)) {
      getProjectPlans(projectId ?? '');
    }
  }, [null]);

  const showDayDetails = (day: Day) => {
    setPlanDay(day);
    setOpenDetailsDialog(true);
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      getProjectPlans(projectId ?? '', {
        search: searchTxt,
        page: newPage,
        size: rowsPerPage,
      });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getProjectPlans(projectId ?? '', {
      search,
      page: newPage,
      size: rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    getProjectPlans(projectId ?? '', {
      search,
      page: newPage,
      size: newRowperPage,
    });
  };

  const createFormHandler = (data: any) => {
    console.log('data==>', data);
    setIsLoader(true);
    const formData = new FormData();
    formData.append('planFile', data.file);
    formData.append('projectId', projectId || '');
    storePlanService
      .fileUploadService(authState.user.tenant, formData)
      .then((item: any) => {
        if (item.data.success) {
          setOpenFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });

          setList(sortArrayByKey(item.data.data.list, 'day', 'asc'));
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

  const handleUpdatePlan = () => {
    setCancelDialogOpen(false);
    setOpenEditFormDialog(true);
  };

  const updateExcute = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    formData.append('planFile', data.file);
    formData.append('projectId', projectId || '');
    storePlanService
      .updatePlanService(authState.user.tenant, formData)
      .then((item: any) => {
        if (item.data.success) {
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          const dayList = [
            ...item.data.data.list,
            ...list.filter(
              (z: any) =>
                !!item.data.data.list.find((x: any) => x.day !== z.day)
            ),
          ];
          setList(sortArrayByKey(dayList, 'day', 'asc'));
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
      <TopBar title="Plans" />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-4">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Plans
              </span>
            </div>
            <div className="col-span-8">
              <div className="flex flex-row items-center justify-end gap-3">
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
                  className="btn-black-fill btn-icon w-[25%]"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add Project Plan
                </Button>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon w-[20%]"
                  onClick={handleUpdatePlanClick}
                >
                  <AddOutlinedIcon /> Update Plan
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th className="w-[75%]">Day</th>
                  <th className="w-[15%]">Working Days</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    let count = 0;
                    if (item.data && item.data.length > 0) {
                      count = item.data.reduce(
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        (total: number, item: any) =>
                          total + (item?.count ?? 0),
                        0
                      );
                    }
                    return (
                      <tr key={index}>
                        <td>{item.day ? item.day : '--'}</td>
                        <td>
                          <span className="">{count}</span>
                        </td>
                        <td>
                          <div className="flex">
                            <div
                              className="cursor-pointer"
                              onClick={() => showDayDetails(item)}
                            >
                              <VisibilityIcon />
                            </div>
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
          type="thumb"
          open={cancelDialogOpen}
          setOpen={setCancelDialogOpen}
          dialogText={dialogText}
          callback={handleUpdatePlan}
        />
      )}
      {openFormDialog && (
        <ProjectPlanAddPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openDetailsDialog && (
        <ProjectPlanDayDetailsPopup
          openFormDialog={openDetailsDialog}
          setOpenFormDialog={setOpenDetailsDialog}
          day={planDay}
        />
      )}

      {openEditFormDialog && (
        <ProjectPlanEditPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          // formData={editFormData}
          callback={updateExcute}
        />
      )}
    </>
  );
}

export default ProjectPlanPage;
