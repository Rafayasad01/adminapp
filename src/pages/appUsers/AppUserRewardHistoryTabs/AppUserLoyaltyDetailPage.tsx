import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionMenu from '../../../components/common/ActionMenu';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/adminapp/adminAppUser';
import PermissionPopup from '../../../utils/PermissionPopup';
import { listingRolePermission } from '../../../utils/helper';

function AppUserLoyaltyDetailPage() {
  const dataRole = useAppSelector(
    (state: any) => state?.persisitReducer?.roleState?.role?.permissions
  );
  // const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  // const [filteredWeekDays, setFilteredWeekDays] = useState<any>(null);
  // const [total, setTotal] = useState(0);
  // const [list, setList] = useState<any>([]);
  // const [address, setAddress] = useState<string>('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [dialogText] = useState<any>(
    'Are you sure you want to delete this driver address ?'
  );
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const actionMenuOptions = ['Edit', 'Delete'];
  const [emptyVariable] = useState(null);

  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  // const [selectedTab, setSelectedTab] = useState('ADDRESS');

  const { loyaltyId } = useParams();

  // const handleTabChange = (event: any, newValue: any) => {
  //   setSelectedTab(newValue);
  // };

  useEffect(() => {
    if (listingRolePermission(dataRole, 'Driver Address Detail')) {
      Service.appUserLoyaltyHistoryDetails(loyaltyId)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setDetail(item.data.data);
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
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
    }
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Loyalty History Details" />
      {detail && (
        <>
          <div className="container m-auto mt-5">
            <div className="grid grid-cols-12 gap-3">
              <div className="rounded-lg bg-[#fff] px-4 py-5 shadow-lg xl:col-span-6 2xl:col-span-4">
                <div className="">
                  <p className="font-open-sans text-2xl font-semibold text-secondary">
                    App Order
                  </p>
                  <Divider className="mb-4 mt-1 w-36" />
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex w-full flex-col">
                    <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                      Order Number
                    </span>
                    <span className="font-open-sans text-sm font-medium text-[#6A6A6A]">
                      {detail.appOrder[0].orderNumber ?? '--'}
                    </span>
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="mt-2 font-open-sans text-base font-semibold text-secondary">
                      Total Loyalty Coins
                    </span>
                    <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                      {detail.coins ?? '--'}
                    </span>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Status
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail.appOrder[0].status ?? '--'}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Payment Status
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail.appOrder[0].paymentStatus ?? '--'}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Payment Type
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail.appOrder[0].paymentType ?? '--'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Total Amount
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        ${detail.appOrder[0].totalAmount ?? '0'}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Discount
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        ${detail.appOrder[0].discount ?? '0'}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        GST Percentage
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        {detail.appOrder[0].gstPercentage ?? '0'}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        GST Amount
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        ${detail.appOrder[0].gstAmount ?? '0'}
                      </span>
                    </div>
                    <div className="col-span-4 flex w-full flex-col">
                      <span className="mt-3 font-open-sans text-base font-semibold text-secondary">
                        Grand Total
                      </span>
                      <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                        ${detail.appOrder[0].grandTotal ?? '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container m-auto mt-5">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
                <div className="mt-3 grid grid-cols-none">
                  <table className="table-border table-auto">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th className="w-[50%]">Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Loyalty Coins</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.items &&
                        detail.items.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="avatar flex flex-row items-center">
                                  {item.homeCatItem.icon ? (
                                    <img src={item.homeCatItem.icon} alt="" />
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
                                      {item.homeCatItem.name?.charAt(0)}
                                    </Avatar>
                                  )}

                                  <div className="flex flex-col items-start justify-start">
                                    <span className="text-sm font-semibold">
                                      {item.homeCatItem.name}
                                    </span>
                                    <span className="text-xs font-normal text-[#6A6A6A]">
                                      {dayjs(
                                        item.homeCatItem.createdDate
                                      ).isValid()
                                        ? dayjs(
                                            item.homeCatItem.createdDate
                                          )?.format('MMMM DD, YYYY')
                                        : '--'}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>{item.homeCatItem.desc}</td>
                              <td>{item.quantity}</td>
                              <td>{item.unitPrice}</td>
                              <td>{item.homeCatItem.loyaltyCoins}</td>
                              {/* <td>
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
                                                                            setActionMenuItemid(list[index]);
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
                                                            </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
          callback={() => {}}
        />
      )}
    </>
  );
}

export default AppUserLoyaltyDetailPage;
