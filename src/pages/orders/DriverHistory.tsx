import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useState } from 'react';
// import  { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import TablePagination from '@mui/material/TablePagination';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
// import Switch from '@mui/material/Switch';
import CustomButton from '../../components/common/CustomButton';
import CustomText from '../../components/common/CustomText';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader';
import TopBar from '../../components/common/TopBar';
import { DriverHistoryItem } from '../../interfaces/driver.interface';
import PermissionPopup from '../../utils/PermissionPopup';
import { MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';

function DriverHistory() {
  // const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<any>('');
  const [isLoader] = useState(false);
  const [list] = useState([]);
  // const [isNotify, setIsNotify] = useState(false);
  // const [notifyMessage, setNotifyMessage] = useState({});

  const {
    register,
    formState: { errors },
  } = useForm<DriverHistoryItem>();

  // const onSubmit = (data: DriverHistoryItem) => {
  //   // console.log('data', data);
  // };

  const statusUpdateHandler = () => {
    // console.log('dataA');
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar isNestedRoute title="Driver History" />
      <div className="container m-auto py-3">
        <div className="min-h-[300px] rounded-lg bg-[#fff] p-5 shadow-lg">
          <form
          // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="Content grid grid-cols-6 items-end">
              <div className="FormField col-span-2">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Enter Amount</label>
                  <Input
                    className="FormInput"
                    id="amount"
                    placeholder="Enter remaining amount"
                    type="number"
                    disableUnderline
                    {...register('amount', {
                      pattern: {
                        value: PATTERN.POINT_NUM,
                        message: 'Enter a valid amount',
                      },
                      maxLength: {
                        value: 15,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.amount?.type === 'pattern' && (
                    <ErrorSpanBox error={errors.amount?.message} />
                  )}
                </FormControl>
              </div>
              <div className="col-span-4 flex justify-end">
                <CustomButton
                  type="submit"
                  title="Amount paid"
                  buttonType="button"
                  className="w-60 bg-slate-900"
                  onclick={() => {
                    setDialogText(
                      'Are you sure you want to update this amount'
                    );
                    setDialogOpen(true);
                  }}
                  // onclick={() => navigate('../view-driver')}
                />
                <CustomButton
                  type="submit"
                  title="Amount loan"
                  buttonType="button"
                  className="ml-3 w-60 bg-red-700"
                  onclick={() => {
                    setDialogText(
                      'Are you sure you want to update this amount'
                    );
                    setDialogOpen(true);
                  }}
                  // onclick={() => navigate('../view-driver')}
                />
              </div>
            </div>
          </form>
          <div className="mt-6">
            <span className="text-2xl font-semibold">Driver Details</span>
            <div className="my-4 grid grid-cols-12 gap-8">
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">Name</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">Email</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">Phone</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">License Number</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
              <div className="col-span-6">
                <p className="text-sm text-[#6A6A6A]">Address</p>
                <span className="text-md font-semibold text-secondary">
                  Scelerisque maecenas sodales fusce placerat hac augue
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">Remaining Payment</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-[#6A6A6A]">Total Payment</p>
                <span className="text-md font-semibold text-secondary">
                  Andrew Michael
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] shadow-lg">
          <div className="mt-5 grid grid-cols-none">
            <span className="p-4 text-2xl font-semibold text-[#1D1D1D]">
              Pending Orders
            </span>
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th className="w-[20%]">Item</th>
                  <th className="w-[30%]">Address</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="avatar flex flex-row items-center">
                            {item.avatar ? (
                              <img src={item.avatar} alt="" />
                            ) : (
                              <Avatar
                                className="avatar flex flex-row items-center"
                                sx={{
                                  bgcolor: '#1D1D1D',
                                  width: 35,
                                  height: 35,
                                  textTransform: 'uppercase',
                                  fontSize: '14px',
                                  marginRight: '10px',
                                }}
                              >
                                {item.firstName?.charAt(0)}
                                {item.lastName?.charAt(0)}
                              </Avatar>
                            )}

                            <div className="flex flex-col items-start justify-start">
                              <span className="text-sm font-semibold">
                                {`${item.firstName} ${item.lastName}`}
                              </span>
                              <span className="text-xs font-normal text-[#6A6A6A]">
                                {dayjs(item.createdDate).isValid()
                                  ? dayjs(item.createdDate)?.format(
                                      'MMMM DD, YYYY'
                                    )
                                  : '--'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.postalCode ? item.postalCode : '--'}</td>
                        <td>{item.userType}</td>
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
                              // aria-controls={
                              //     actionMenuOpen ? 'long-menu' : undefined
                              // }
                              // aria-expanded={
                              //     actionMenuOpen ? 'true' : undefined
                              // }
                              aria-haspopup="true"
                              // onClick={(
                              //     event: React.MouseEvent<HTMLElement>
                              // ) => {
                              //     setActionMenuItemid(list[index].id);
                              //     setActionMenuAnchorEl(event.currentTarget);
                              // }}
                            >
                              {/* <MoreVertIcon /> */}
                            </IconButton>
                            {/* <Switch
                                                        checked={item.isActive}
                                                        // onChange={(
                                                        //     event: React.ChangeEvent<HTMLInputElement>
                                                        // ) => handleSwitchChange(event, list[index].id)}
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
            <CustomText noroundedborders text="No Records Found" />
          ) : null}
        </div>
        {/* <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
      </div>

      {dialogOpen && (
        <PermissionPopup
          type="thumb"
          open={dialogOpen}
          setOpen={setDialogOpen}
          dialogText={dialogText}
          callback={statusUpdateHandler}
        />
      )}
    </>
  );
}

export default DriverHistory;
