import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SummarizeIcon from '@mui/icons-material/Summarize';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import Switch from '@mui/material/Switch';
import { useForm } from 'react-hook-form';
import CustomText from '../../../components/common/CustomText';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { useAppSelector } from '../../../redux/redux-hooks';
import adminProjectQuotation from '../../../services/adminapp/adminProjectQuotation';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import { listingRolePermission } from '../../../utils/helper';
import storeAttachmentService from '../../../services/adminapp/adminProjectAttachments';
import ActionMenu from '../../../components/common/ActionMenu';
import PermissionPopup from '../../../utils/PermissionPopup';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { ProjectQuotation } from '../../../interfaces/projectQuotation';
import MaterailLaborSlipAddPopup from './MaterailLaborSlipAddPopup';
import MaterailLaborSlipEditPopup from './MaterailLaborSlipEditPopup';
// import assets from '../../../assets';

function MaterailLaborSlipPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<ProjectQuotation>();

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [isLoader, setIsLoader] = React.useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [dialogText] = useState<any>('Are you sure you want to delete ?');
  const [projects, setProjects] = useState<any>([]);

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.addImagesPlans)
    ) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const getProjectName = (project: string) =>
    projects.find((p: any) => p.id === project)?.name || '';

  useEffect(() => {
    const fetchProjects = async () => {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.addImagesPlans
        )
      ) {
        try {
          const projectResponse =
            await storeAttachmentService.getListProjectLovService(
              authState.user.tenant
            );
          const projectList = projectResponse.data.data.list;
          const extraField = [{ id: 'ALL', name: 'All' }];
          setProjects([...extraField, ...projectList]);
        } catch (error: Error | any) {
          setIsNotify(true);
          setNotifyMessage({
            text: error.message,
            type: 'error',
          });
        }
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewImagesPlans
      )
    ) {
      adminProjectQuotation
        .getQuotationService({
          type: 'LABOR_PAID',
          projectId: watch('projectId') ? watch('projectId') : '',
          page,
          size: rowsPerPage,
        })
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
    } else {
      setIsLoader(false);
    }
  }, [watch('projectId')]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    adminProjectQuotation
      .getQuotationService({
        type: 'LABOR_PAID',
        projectId: watch('projectId') ? watch('projectId') : '',
        page: newPage,
        size: rowsPerPage,
      })
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
    adminProjectQuotation
      .getQuotationService({
        type: 'LABOR_PAID',
        projectId: watch('projectId') ? watch('projectId') : '',
        page: newPage,
        size: newRowperPage,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    if (data.file !== null) formData.append('file', data.file);
    formData.append('projectId', data.projectId);
    formData.append('type', data.type);
    formData.append('laborCost', data.laborCost);
    formData.append('desc', data.desc);
    adminProjectQuotation
      .createQuotationService(formData)
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
          let newtotal = total;
          setTotal((newtotal += 1));
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

  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    const formData = new FormData();
    if (data.file !== null) formData.append('file', data.file);
    formData.append('projectId', data.projectId);
    formData.append('laborCost', data.laborCost);
    formData.append('desc', data.desc);
    adminProjectQuotation
      .updateQuotationService(actionMenuItemid, formData)
      .then((item: any) => {
        if (item.data.success) {
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === item.data.data.id) {
              list[i].filePath = item.data.data.filePath;
              list[i].projectId = item.data.data.projectId;
              list[i].laborCost = item.data.data.laborCost;
              list[i].desc = item.data.data.desc;
            }
          }
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

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    adminProjectQuotation
      .deleteStatusQuotationService(id)
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

  const statusCancelHandler = () => {
    deleteHandler(actionMenuItemid);
  };

  const manuHandler = (option: string) => {
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.editImagesPlans
        )
      ) {
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
    } else if (option === 'Delete') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.deleteImagesPlans
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Labor Material Slips
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="projectId"
                    control={control}
                    error={errors}
                    register={register}
                    options={{ roles: projects }}
                    customClassInputTitle="font-bold"
                    customHeight="h-[40px]"
                    customWidth="w-[200px]"
                    // inputTitle="Project Name"
                    defaultValue="Select Project"
                  />
                </FormControl>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Total Labor Material Paid</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {' '}
                          <div className="avatar flex flex-row items-center">
                            {item.filePath ? (
                              <a href={item.filePath} rel="noopener noreferrer">
                                <SummarizeIcon />
                              </a>
                            ) : (
                              '--'
                            )}
                            <div className="flex flex-col items-start justify-start">
                              <span className="mx-2 text-sm font-semibold">
                                {getProjectName(item.projectId)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.desc ? item.desc : '--'}</td>
                        <td>
                          {item.laborCost ? item.laborCost : '--'}{' '}
                          {CURRENCY_PREFIX}
                        </td>
                        <td>
                          {dayjs(item.uploadedAt).isValid()
                            ? dayjs(item.uploadedAt)?.format(
                                'ddd, MMM DD, YYYY hh:mm:ssA'
                              )
                            : '--'}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse">
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
                            {/* <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, list[index].id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            /> */}
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
        <MaterailLaborSlipAddPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}

      {openEditFormDialog && (
        <MaterailLaborSlipEditPopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
}

export default MaterailLaborSlipPage;
