import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TopBar from '../../components/common/TopBar';
import CustomDialog from '../../components/common/CustomDialog';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import { AppFaq } from '../../interfaces/app-faq.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import Service from '../../services/adminapp/adminAppFaqs';
import PermissionPopup from '../../utils/PermissionPopup';
import { NOT_AUTHORIZED_MESSAGE, PATTERN } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';

function FaqPage() {
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  const [search, setSearch] = useState<any>('');
  const [emptyVariable] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this customer ?'
  );
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AppFaq>();

  const inputFieldsData = [
    {
      fieldName: 'Question',
      id: 'question',
      placeholder: 'Enter Question',
      register,
      error: errors.question,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
    {
      fieldName: 'Answer',
      id: 'answer',
      placeholder: 'Enter Answer',
      register,
      error: errors.answer,
      type: 'textarea',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 100,
    },
  ];

  const handleFormClickOpen = () => {
    if (listingRolePermission(dataRole, 'Employee Create')) {
      setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      Service.FaqList(
        authState.user.tenant,
        searchTxt,
        newPage,
        rowsPerPage
      ).then((item) => {
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
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    Service.FaqList(authState.user.tenant, search, newPage, rowsPerPage).then(
      (item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    Service.FaqList(authState.user.tenant, search, newPage, rowsPerPage).then(
      (item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      }
    );
  };

  // const deleteHandler = (id: string) => {
  //   setIsLoader(true);
  //   // const data = {
  //   //   updatedBy: authState.user.id,
  //   // };
  //   // console.log(actionMenuItemid);

  //   // Service.deleteService(actionMenuItemid, data)
  //   //   .then((item: any) => {
  //   //     if (item.data.success) {
  //   //       setIsLoader(false);
  //   //       setIsNotify(true);
  //   //       setNotifyMessage({
  //   //         text: item.data.message,
  //   //         type: 'success',
  //   //       });
  //   //       setList((newArr: any) => {
  //   //         return newArr.filter(
  //   //           (newItem: any) => newItem.id !== item.data.data.id
  //   //         );
  //   //       });
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     setIsLoader(false);
  //   //     setIsNotify(true);
  //   //     setNotifyMessage({
  //   //       text: err.message,
  //   //       type: 'error',
  //   //     });
  //   //   });
  // };

  const statusCancelHandler = () => {
    // deleteHandler(actionMenuItemid);
  };

  const handleEdit = (id: string) => {
    if (listingRolePermission(dataRole, 'Employee Update')) {
      setIsLoader(true);
      Service.FaqFindById(id).then((item: any) => {
        if (item.data.success) {
          setIsLoader(false);
          setValue('id', item.data.data.id);
          setValue('question', item.data.data.question);
          setValue('answer', item.data.data.answer);
          setOpenEditFormDialog(true);
        }
      });
    }
  };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Employee List')) {
      Service.FaqList(authState.user.tenant, search, page, rowsPerPage)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setList(item.data.data.list);
            setTotal(item.data.data.total);
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
    } else {
      setIsLoader(false);
    }
  }, [emptyVariable]);

  const createFormHandler = (data: any) => {
    setIsLoader(true);
    const faqData = {
      question: data.question,
      answer: data.answer,
      tenant: authState.user.tenant,
      createdBy: authState.user.id,
      updatedBy: authState.user.id,
    };
    Service.FaqCreate(faqData)
      .then((item) => {
        if (item.data.success) {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList([item.data.data, ...list]);
          setOpenFormDialog(false);
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
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
    const faqData = {
      question: data.question,
      answer: data.answer,
      tenant: authState.user.tenant,
      createdBy: authState.user.id,
      updatedBy: authState.user.id,
    };
    Service.FaqUpdate(getValues('id'), faqData)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          setList((prev: any) => {
            return prev.map((el: any) => {
              if (el.id === item.data.data.id) {
                el.question = item.data.data.question;
                el.answer = item.data.data.answer;
              }
              return { ...el };
            });
          });
          setOpenEditFormDialog(false);
          reset();
        } else {
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleSwitchChange = (event: any, id: string) => {
    if (listingRolePermission(dataRole, 'Employee Update Status')) {
      const data = {
        isActive: event.target.checked,
        updatedBy: authState.user.id,
      };
      Service.FaqUpdateStatus(id, data).then((updateItem) => {
        if (updateItem.data.success) {
          setList((newArr: any) => {
            return newArr.map((item: any) => {
              if (item.id === updateItem.data.data.id) {
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

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Faq" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Faqs
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
                  <th className="w-[30%]">Question</th>
                  <th className="w-[40%]">Answer</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.question}`}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.answer}</td>
                        <td>
                          {item.isActive ? (
                            <span className="badge badge-success">ACTIVE</span>
                          ) : (
                            <span className="badge badge-danger">INACTIVE</span>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-row-reverse items-center">
                            <div
                              className="mx-3 cursor-pointer"
                              onClick={() => handleEdit(item.id)}
                            >
                              <ModeEditOutlineOutlinedIcon />
                            </div>
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
            <CustomText noroundedborders text="No Records Found" />
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
      {openFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Add Faq"
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={createFormHandler}
          openFormDialog={openFormDialog}
          setOpenFormDialog={setOpenFormDialog}
        />
      )}
      {openEditFormDialog && (
        <CustomDialog
          singleField
          DialogHeader="Edit Faq"
          type="edit"
          specailCase={false}
          reset={reset}
          inputFieldsData={inputFieldsData}
          handleSubmit={handleSubmit}
          onSubmit={updateFormHandler}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
        />
      )}
    </>
  );
}

export default FaqPage;
