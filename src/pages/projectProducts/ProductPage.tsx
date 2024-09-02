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
import ActionMenu from '../../components/common/ActionMenu';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import storeProjectPlanService from '../../services/adminapp/adminProjectPlans';
import storeProjectProductService from '../../services/adminapp/adminProjectProducts';
// import storeAppUsers from '../../services/adminapp/adminAppUser';
import {
  ALL_PERMISSIONS,
  // CONSTRUCTION_TYPE,
  NOT_AUTHORIZED_MESSAGE,
} from '../../utils/constants';
import {
  CheckRolePermission,
  formatCurrency,
  // CheckRolePermission,
  listingRolePermission,
} from '../../utils/helper';
import PermissionPopup from '../../utils/PermissionPopup';
// import ProjectPlanEditPopup from './ProductEditPage';
// import ProjectAddPopup from './ProductAddPage';
import ColorRowWithTooltips from '../../components/common/ColorRowWithTooltips';

function ProductPage() {
  const navigate = useNavigate();
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoader, setIsLoader] = React.useState(true);
  const [actionMenuItemid, setActionMenuItemid] = React.useState('');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Details', 'Edit', 'Delete'];
  // const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this Category ?'
  );
  const [isModalImage, setIsModalImage] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [price, setPrice] = useState();
  const [mIndex, setMIndex] = useState(0);

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.addProjects)
    ) {
      navigate(`./add`);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewProjects)
    ) {
      storeProjectProductService
        .getListProductService(authState.user.tenant, search, page, rowsPerPage)
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
  }, [null]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      storeProjectPlanService
        .getListProjectService(
          authState.user.tenant,
          searchTxt,
          newPage,
          rowsPerPage
        )
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
    storeProjectPlanService
      .getListProjectService(
        authState.user.tenant,
        search,
        newPage,
        rowsPerPage
      )
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
    storeProjectPlanService
      .getListProjectService(
        authState.user.tenant,
        search,
        newPage,
        newRowperPage
      )
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const deleteHandler = (id: string) => {
    setIsLoader(true);
    const data = {
      isDeleted: true,
    };
    storeProjectPlanService
      .deleteStatusProjectService(id, data)
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
    console.log('🚀 ~ manuHandler ~ option:', option);
    if (option === 'Edit') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.editProjectPlan
        )
      ) {
        const editFormDatas = list?.find(
          (el: any) => el.id === actionMenuItemid
        );
        navigate(`./edit/${editFormDatas.id}`, {
          state: { data: editFormDatas },
        });
        // console.log('🚀 ~ manuHandler ~ editFormDatas:', editFormDatas);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    } else if (option === 'Details') {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.viewProjectPlans
        )
      ) {
        CheckRolePermission(
          ALL_PERMISSIONS.storePlans.viewProjectPlans,
          dataRole,
          navigate,
          `./plans/${actionMenuItemid}`
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
          ALL_PERMISSIONS.storePlans.deleteProjects
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

  const handleSwitchChange = (event: any, id: string) => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.editProjects)
    ) {
      const data = {
        isActive: event.target.checked,
      };
      storeProjectPlanService
        .updateStatusProjectService(id, data)
        .then((updateItem) => {
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

  const handleOnColorClick = (data: any) => {
    // console.log('datata', data);
    setMIndex(data.mainIndex);
    const priceTax = data.price;
    setPrice(priceTax);
  };

  const handleColors = (colorsArr: any, mainIndex: number | any) => {
    // console.log('ARR', colorsArr);
    const selectedColor = colorsArr;
    const temp: any =
      Number(parseFloat(selectedColor[0]?.price)) +
      (Number(parseFloat(selectedColor[0]?.price)) *
        Number(parseFloat(selectedColor[0]?.tax))) /
        100;
    return colorsArr?.length > 0 ? (
      <div>
        <div className="">
          {colorsArr?.length > 0 && (
            <ColorRowWithTooltips
              onclick={handleOnColorClick}
              type="array"
              colors={colorsArr}
              mainIndex={mainIndex}
            />
          )}
        </div>
        {mainIndex === mIndex ? (
          <div className="">
            <span className="text-[10px]">
              {formatCurrency(price ?? temp)} (inclusive tax)
            </span>
          </div>
        ) : (
          <div className="">
            <span className="text-[10px]">
              {formatCurrency(temp)} (inclusive tax)
            </span>
          </div>
        )}
      </div>
    ) : (
      '--'
    );
  };

  const closeModal = () => {
    setModalImage('');
    setIsModalImage(false);
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
      <TopBar />
      <div className="cs-dialog container mx-auto mt-5 w-full">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Products
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
                  <th>Prod. group</th>
                  <th className="">Prod. name</th>
                  <th>M. No.</th>
                  <th>Image</th>
                  <th className="w-[15%]">Color & prices</th>
                  <th>item code</th>
                  <th>BR name</th>
                  <th>Dimension</th>
                  <th>Weight</th>
                  <th>Price w/o & w TAX</th>
                  <th>Warranty</th>
                  <th>Stock</th>
                  <th>Created Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.productGroup ? item.productGroup : '--'}</td>
                        <td>{item.productName ? item.productName : '--'}</td>
                        <td>{item.mobileNumber ? item.mobileNumber : '--'}</td>
                        <td>
                          {item.productImages?.length > 0 ? (
                            <img
                              className=""
                              src={item.productImages[0]}
                              alt="img"
                            />
                          ) : (
                            '--'
                          )}
                        </td>
                        <td>
                          {handleColors(item.productCustomization, index)}
                          {/* {item.productCustomization?.length > 0
                            ? item.productCustomization?.map(
                                (el: any, i: number) => {
                                  const colors = [];s
                                  console.log(
                                    '🚀 ~ list?.map ~ colors:',
                                    colors
                                  );
                                  return (
                                    <div key={i}>
                                      <div className="flex items-center justify-center">
                                        <ColorRowWithTooltips
                                          type="object"
                                          productcolor={el.color}
                                        />
                                      </div>
                                      <div className="text-xs">
                                        <span className="text-[10px]">
                                          {formatCurrency(el.tax)}
                                        </span>
                                        <span> ------ </span>
                                        <span className="text-[10px]">
                                          {formatCurrency(el.price)}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            : '--'} */}
                        </td>
                        <td>{item.itemCode ? item.itemCode : '--'}</td>
                        <td>{item.brandName ? item.brandName : '--'}</td>
                        <td>
                          {item.itemDimension ? item.itemDimension : '--'}
                        </td>
                        <td>{item.itemWeight ? item.itemWeight : '--'}</td>
                        <td>{item.costPrice ? item.costPrice : '--'}</td>
                        <td>{item.warranty ? item.warranty : '--'}</td>
                        <td>
                          {item.stockAvailability
                            ? item.stockAvailability
                            : '--'}
                        </td>
                        <td>
                          {dayjs(item.updatedAt).isValid()
                            ? dayjs(item.updatedAt)?.format(
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

export default ProductPage;
