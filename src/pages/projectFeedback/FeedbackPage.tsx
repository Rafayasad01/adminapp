import { FormControl, TablePagination } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import CustomText from '../../components/common/CustomText';
import { listingRolePermission } from '../../utils/helper';
import { ALL_PERMISSIONS, NOT_AUTHORIZED_MESSAGE } from '../../utils/constants';
import { useAppSelector } from '../../redux/redux-hooks';
import ActionMenu from '../../components/common/ActionMenu';
import PermissionPopup from '../../utils/PermissionPopup';
import Loader from '../../components/common/Loader';
import adminFeedback from '../../services/adminapp/adminFeedback';
import storeAttachmentService from '../../services/adminapp/adminProjectAttachments';
import Quotation from '../../interfaces/Quotation';
import CustomDropDown from '../../components/common/CustomDropDown';

const FeedbackPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isNotify, setIsNotify] = useState(false);
  const [page, setPage] = useState(0);
  const [actionMenuItemid, setActionMenuItemid] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const [list, setList] = useState<Quotation[]>([]);
  const [projects, setProjects] = useState<any>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [isLoader, setIsLoader] = useState(true);
  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Quotation ?'
  );

  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    const fetchProjects = async () => {
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
    };

    fetchProjects();
  }, []);

  const fetchFeedbacks = useCallback(
    async (data: any) => {
      if (listingRolePermission(dataRole, ALL_PERMISSIONS.feedback.view)) {
        try {
          const res = await adminFeedback.getFeedbackService(data);
          if (res.data.success) {
            setIsLoader(false);
            setList(res.data.data.list);
            setTotal(res.data.data.total);
          } else {
            setIsLoader(false);
          }
        } catch (err: any) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        }
      } else {
        setIsLoader(false);
      }
    },
    [dataRole]
  );

  useEffect(() => {
    fetchFeedbacks({
      projectId: watch('projectId') ? watch('projectId') : 'none',
      page,
      size: rowsPerPage,
    });
  }, [watch('projectId'), fetchFeedbacks]);

  const handlePermissionCheck = (permission: string, callback: () => void) => {
    if (listingRolePermission(dataRole, permission)) {
      callback();
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    fetchFeedbacks({
      projectId: watch('projectId') ? watch('projectId') : 'none',
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
    fetchFeedbacks({
      projectId: watch('projectId') ? watch('projectId') : 'none',
      page: newPage,
      size: newRowperPage,
    });
  };

  const menuHandler = (option: string) => {
    if (option === 'Edit') {
      handlePermissionCheck(ALL_PERMISSIONS.quotations.edit, () => {
        const editFormData = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        if (editFormData) {
          setActionMenuItemid(editFormData.id);
          navigate(`./edit/${editFormData.id}`, {
            state: { data: editFormData },
          });
        }
      });
    } else if (option === 'Delete') {
      handlePermissionCheck(ALL_PERMISSIONS.quotations.delete, () =>
        setCancelDialogOpen(true)
      );
    }
  };

  // const deleteHandler = (id: string) => {
  //   setIsLoader(true);
  //   adminFeedback
  //     .deleteStatusQuotationService({ id })
  //     .then((updateItem) => {
  //       if (updateItem.data.success) {
  //         setIsLoader(false);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: updateItem.data.message,
  //           type: 'success',
  //         });
  //         setList((newArr: any) => {
  //           return newArr.filter((item: any) => item.id !== id);
  //         });
  //         setTotal((t) => t - 1);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoader(false);
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: err.message,
  //         type: 'error',
  //       });
  //     });
  // };

  // const statusCancelHandler = () => {
  //   deleteHandler(actionMenuItemid);
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

      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Feedbacks
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
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>Feedback</th>
                  <th className="">Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.feedback ?? '--'}</td>
                        <td>
                          {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm') ??
                            '--'}
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
          callback={() => {}}
        />
      )}
      {actionMenuAnchorEl && (
        <ActionMenu
          open={actionMenuOpen}
          anchorEl={actionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          options={actionMenuOptions}
          callback={menuHandler}
        />
      )}
    </>
  );
};

export default FeedbackPage;
