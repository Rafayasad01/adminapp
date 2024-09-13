import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { listingRolePermission } from '../../../utils/helper';
import { ALL_PERMISSIONS } from '../../../utils/constants';
import { useAppSelector } from '../../../redux/redux-hooks';

type AppointmentProviderCardsProps = {
  data: any;
  handleSwitchChange?: any;
  actionMenuOpen?: any;
  setActionMenuItemid?: any;
  setActionMenuAnchorEl?: any;
};

const AppointmentProviderCards = ({
  data,
  handleSwitchChange,
  actionMenuOpen,
  setActionMenuItemid,
  setActionMenuAnchorEl,
}: AppointmentProviderCardsProps) => {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [expandedBoxes, setExpandedBoxes] = useState<any>({});
  const handleViewMoreClick = (index: number | any) => {
    setExpandedBoxes((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      {data?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center xl:col-span-4 2xl:col-span-3"
          >
            <Card className="w-[500px] rounded-lg border-[1px] border-primary bg-background shadow-none">
              <CardContent className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="avatar flex w-[100%] flex-row items-center">
                    <div className="flex w-[100%] flex-col items-start justify-start pl-2">
                      <div className="flex items-center">
                        <Avatar
                          className="avatar mr-[8px] flex flex-row items-center"
                          sx={{
                            bgcolor: '#1D1D1D',
                            width: 45,
                            height: 45,
                            textTransform: 'uppercase',
                            fontSize: '16px',
                          }}
                          src={item.avatar}
                        />
                        <span className="text-sm font-semibold capitalize">
                          {`${item.name}`}{' '}
                        </span>
                        {listingRolePermission(
                          dataRole,
                          ALL_PERMISSIONS.storeAppointment.viewEmployeeRating
                        ) && (
                          <div className="flex items-center px-1">
                            <StarIcon className="text-base text-inherit text-yellow-500" />{' '}
                            <span className="px-[1px] font-semibold">{`${item.rating}`}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex w-[100%] items-center justify-between">
                        <div className="">
                          <span className="mt-1 text-xs font-normal text-[#6A6A6A]">
                            {dayjs(item.createdDate).isValid()
                              ? dayjs(item.createdDate)?.format('MMMM DD, YYYY')
                              : '--'}
                          </span>
                          <div>
                            {item.isActive ? (
                              <span className="badge badge-success">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="badge badge-danger">
                                INACTIVE
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div>
                            <Switch
                              checked={item.isActive}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleSwitchChange(event, item.id)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </div>
                          <div className="">
                            <IconButton
                              className="btn-dot-appointment"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="px-2">
                  <div className="flex items-center justify-between">
                    <div className="mr-5">
                      <BadgeOutlinedIcon fontSize="small" />
                    </div>
                    <span className="text-sm font-medium">{item.cnic}</span>
                  </div>
                  <div className="my-1 flex items-center justify-between">
                    <div className="mr-5">
                      <LocalPhoneOutlinedIcon fontSize="small" />
                    </div>
                    <span className="text-sm font-medium">{item.phone}</span>
                  </div>
                  <div className="my-1 flex items-center justify-between">
                    <div className="mr-5">
                      <MailOutlineOutlinedIcon fontSize="small" />
                    </div>
                    <span className="text-sm font-medium">{item.email}</span>
                  </div>
                  <div
                    style={{
                      height: expandedBoxes[index]
                        ? listingRolePermission(
                            dataRole,
                            ALL_PERMISSIONS.storeAppointment
                              .viewSalayAppointmentEmployee
                          )
                          ? '70px'
                          : '30px'
                        : '0px',
                      overflow: 'hidden',
                      transition: 'height 0.3s ease',
                      padding: '0px',
                    }}
                  >
                    <div className="my-1 flex items-center justify-between">
                      <div className="mr-5">
                        <HomeOutlinedIcon fontSize="small" />
                      </div>
                      <span className="truncate text-sm font-medium">
                        {item.address ? item.address : '----'}
                      </span>
                    </div>
                    {listingRolePermission(
                      dataRole,
                      ALL_PERMISSIONS.storeAppointment
                        .viewSalayAppointmentEmployee
                    ) && (
                      <div className="flex items-center justify-between">
                        <div className="mr-5">
                          <PaymentOutlinedIcon fontSize="small" />
                        </div>
                        <span className="text-sm font-medium">
                          {item.payrollType}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      className="text-[10px] font-bold hover:underline"
                      onClick={() => handleViewMoreClick(index)}
                    >
                      {expandedBoxes[index] ? 'View less' : 'View more'}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentProviderCards;
