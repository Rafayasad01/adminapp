import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, TablePagination } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TopBar from '../../components/common/Md-Alder/TopBar';
import photo from '../../assets/images/Photo.png';
import EyeIcon from '../../components/icons/EyeIcon';
import CustomText from '../../components/common/CustomText';
import service from '../../services/adminapp/adminFormFields';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import Loader from '../../components/common/Loader2';
import CreatePopup from './CreatePopup';
import EditPopup from './EditPopup';
import PermissionPopup from '../../utils/PermissionPopup';

const FormFieldsPage = () => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [isLoader, setIsLoader] = useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<any>();

  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Field ?'
  );

  const handleFormClickOpen = () => {
    // if (listingRolePermission(dataRole, 'Category Create')) {
    setOpenFormDialog(true);
    // } else {
    //   setIsNotify(true);
    //   setNotifyMessage({
    //     text: NOT_AUTHORIZED_MESSAGE,
    //     type: 'warning',
    //   });
    // }
  };

  useEffect(() => {
    service
      .getList({ search, page, size: rowsPerPage })
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        showMessage(err.message, 'error');
      });
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    service
      .getList({ search, page: newPage, size: rowsPerPage })
      .then((item) => {
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
    service
      .getList({ search, page: newPage, size: newRowperPage })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const createFormHandler = (data: any) => {
    // console.log('data', data);
    setIsLoader(true);
    service
      .create(data)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          showMessage(item.data.message, 'success');
          setList([item.data.data, ...list]);
          let newtotal = total;
          setTotal((newtotal += 1));
        } else {
          setIsLoader(false);
          showMessage(item.data.message, 'error');
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  const updateFormHandler = (data: any, id: any) => {
    // console.log('data::::::', data, id);
    setIsLoader(true);
    service
      .update(data, id)
      .then((updateItem: any) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === updateItem.data.data.id) {
              list[i].title = updateItem.data.data.title;
              list[i].type = updateItem.data.data.type;
            }
          }
          showMessage(updateItem.data.message, 'success');
        } else {
          setIsLoader(false);
          showMessage(updateItem.data.message, 'error');
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    service
      .deleteField(id)
      .then((updateItem) => {
        if (updateItem.data.success) {
          setIsLoader(false);
          showMessage(updateItem.data.message, 'success');
          setList((newArr: any) => {
            return newArr.filter((item: any) => item.id !== id);
          });
          let newtotal = total;
          setTotal((newtotal -= 1));
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  const statusCancelHandler = () => {
    deleteHandler(editFormData?.id);
  };

  return (
    <>
      <TopBar title="Form Fields" />
      <div className="mt-10 py-5 pr-5">
        <div className="alder-content">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="alder-content-title font-an-gurmukhi">
                Fields Data
              </h4>
            </div>
            <div>
              <button
                onClick={handleFormClickOpen}
                className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary shadow-md"
              >
                <AddOutlinedIcon fontSize="small" className="mr-0" />
                <span className="mt-[5px] font-an-gurmukhi">Add</span>
              </button>
            </div>
          </div>

          {isLoader ? (
            <Loader />
          ) : (
            <>
              <div className="table-responsive mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-an-gurmukhi text-secondary2">
                        Title
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">Type</th>
                      <th className="w-[30%] font-an-gurmukhi text-secondary2">
                        Created Date
                      </th>
                      <th className="w-[10%]">{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((e: any, i: number) => (
                      <tr key={i}>
                        <td>
                          <div className="flex align-middle">
                            <span className="self-center font-an-gurmukhi font-medium text-secondary2">
                              {e.title}
                            </span>
                          </div>
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.type || '--'}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {dayjs(e.createdAt).format('YYYY-MM-DD, hh:mm A')}
                        </td>
                        <td className="flex items-center justify-end font-an-gurmukhi text-secondary2">
                          <Button
                            onClick={() => {
                              setEditFormData(list[i]);
                              setOpenEditFormDialog(true);
                            }}
                          >
                            <EditIcon
                              className="h-[25px] w-[25px]"
                              color="primary"
                            />
                          </Button>
                          <Button
                            onClick={() => {
                              setEditFormData(list[i]);
                              setCancelDialogOpen(true);
                            }}
                          >
                            <DeleteIcon
                              className="h-[25px] w-[25px]"
                              color="primary"
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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
            </>
          )}
        </div>
        {/* <div className="mt-10">
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <Pagination count={10} page={1} />
          </div>
        </div> */}
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
      {openFormDialog && (
        <CreatePopup
          showMessage={showMessage}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
          callback={createFormHandler}
        />
      )}
      {openEditFormDialog && (
        <EditPopup
          showMessage={showMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          formData={editFormData}
          callback={updateFormHandler}
        />
      )}
    </>
  );
};

export default FormFieldsPage;
