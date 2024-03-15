import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewListIcon from '@mui/icons-material/ViewList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
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
}: Props) => {
  const navigate = useNavigate();
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
                  <div className="avatar flex flex-row items-center">
                    <div className="flex flex-col items-start justify-start px-3">
                      <span className="text-sm font-semibold">
                        {`${item.name}`}
                      </span>
                      <span className="mt-1 text-xs font-normal text-[#6A6A6A]">
                        {dayjs(item.createdDate).isValid()
                          ? dayjs(item.createdDate)?.format('MMMM DD, YYYY')
                          : '--'}
                      </span>
                      <div>
                        {item.isActive ? (
                          <span className="badge badge-success">ACTIVE</span>
                        ) : (
                          <span className="badge badge-danger">INACTIVE</span>
                        )}
                      </div>
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
                    {/* <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`../today-appointment/${item.id}`)
                      }
                    >
                      <ViewListIcon />
                    </div> */}
                    <div className="">
                      <IconButton
                        className="btn-dot-appointment"
                        aria-label="more"
                        id="long-button"
                        aria-controls={actionMenuOpen ? 'long-menu' : undefined}
                        aria-expanded={actionMenuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                          setActionMenuItemid(item.id);
                          setActionMenuAnchorEl(event.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
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
                  <div className="my-2 flex items-center justify-between">
                    <div className="mr-5">
                      <LocalPhoneOutlinedIcon fontSize="small" />
                    </div>
                    <span className="text-sm font-medium">{item.phone}</span>
                  </div>
                  <div className="my-2 flex items-center justify-between">
                    <div className="mr-5">
                      <MailOutlineOutlinedIcon fontSize="small" />
                    </div>
                    <span className="text-sm font-medium">{item.email}</span>
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
