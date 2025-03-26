import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import moment from 'moment';
import assets from '../../assets';
import ViewSwitchStaffPopup from './ViewSwitchStaffPopup';
import storeAppointmentService from '../../services/adminapp/adminStoreAppointment';
import Notify from '../../components/common/Notify';

type RatingAccordionsProps = {
  data: Array<object> | any;
  specificEmpAppointmentData?: any;
};

function ViewCardAccordin({
  data,
  specificEmpAppointmentData,
}: RatingAccordionsProps) {
  // console.log('dataaaaa', data);

  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});

  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>(`panel0`);
  const [staffData, setStaffData] = React.useState<any>();

  // popover navigation of wallet button
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClickPop = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    setStaffData(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const onCallbackSubmit = (callbackData: any) => {
    // console.log('callback data', callbackData);
    setIsLoader(true);
    storeAppointmentService
      .AppointmentReassignStaff(staffData?.id, callbackData)
      .then((res) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: res.data.message,
          type: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
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

  const handleEmpSpecific = (employeeid: string) => {
    if (!employeeid) return false;

    if (specificEmpAppointmentData?.priorityId !== employeeid) {
      return true;
    }
    return false;
  };

  return (
    <div className="max-h-[250px]">
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <ViewSwitchStaffPopup
        id={id}
        open={open}
        anchorEl={anchorEl}
        onclose={handleClosePop}
        isLoader={isLoader}
        callback={onCallbackSubmit}
        staffData={staffData}
      />
      {data?.services?.length > 0 ? (
        data?.services?.map((item: any, index: number) => {
          const date = dayjs(item.appointmentTime);
          const formattedDateTime = dayjs(date).format('h:mm:ss A');
          //   const date2 = date.add(item.serviceTime, 'minute');
          //   const formattedDate2 = date2.format('h:mm:ss A');
          return (
            <div key={index}>
              <Accordion
                key={index}
                className="boxShadow bg-transparent"
                // expanded={expanded === `panel${index}`}
                expanded={
                  !handleEmpSpecific(item?.storeEmployee?.id) &&
                  expanded === `panel${index}`
                }
                disabled={handleEmpSpecific(item?.storeEmployee?.id)}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div className="flex w-full items-center justify-between">
                    <Typography
                      className="flex-grow-1 truncate font-semibold"
                      sx={{ width: '50%', flexShrink: 0 }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      className="flex-grow-2 flex items-end justify-end text-[12px]"
                      sx={{ width: '50%', flexShrink: 0 }}
                    >
                      {formattedDateTime}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="m-4 rounded border-[1px] border-[#949EAE]">
                  <div className="flex items-center">
                    <div>
                      <img src={assets.images.appHead} alt="app-head" />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {item.storeServiceCategoryItem?.name}
                      </span>
                      {item.status === 'New' && (
                        <button
                          onClick={(e) => handleClickPop(e, item)}
                          className="cursor-pointer rounded bg-primary px-3 py-[2px] text-xs text-foreground"
                        >
                          Switch Staff
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <div>
                      <img src={assets.images.appCalender} alt="app-head" />
                    </div>
                    <div>
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {moment(item?.appointmentTime)?.format(
                          'MMMM DD, YYYY'
                        ) ?? '--'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <div>
                      <LocalPhoneOutlinedIcon
                        className="ml-[-2px]"
                        fontSize="inherit"
                      />
                      {/* <img src={assets.images.appCalender} alt="app-head" /> */}
                    </div>
                    <div>
                      <span className="mx-1 text-xs text-[#6A6A6A]">
                        {item.phone ?? '--'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-[1px] flex items-center">
                    <div>
                      <img
                        className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                        src={
                          item.appointmentType !== 'AnyProfessional'
                            ? item.storeEmployee?.avatar
                            : assets.images.usersIcon
                        }
                        alt="app-head"
                      />
                    </div>
                    <div>
                      <span className="mx-2 text-xs text-[#6A6A6A]">
                        {item.appointmentType !== 'AnyProfessional'
                          ? item?.storeEmployee?.name
                          : 'Any Professional'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-[1px] flex items-center">
                    <div>
                      <AccessTimeOutlinedIcon
                        className="ml-[-2px]"
                        fontSize="inherit"
                      />
                      {/* <img
                          className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                          src={
                            item.appointmentType !== 'AnyProfessional'
                              ? item.storeEmployee?.avatar
                              : assets.images.avatarUser2
                          }
                          alt="app-head"
                        /> */}
                    </div>
                    <div>
                      <span className="mx-[5px] text-xs text-[#6A6A6A]">
                        {item?.serviceTime} mints
                      </span>
                    </div>
                  </div>
                  <div className="mt-[1px] flex items-center">
                    <div>
                      <img
                        src={assets.images.salaryPayrollImage}
                        alt="salary-payroll"
                        className="mt-1 w-[15px] object-contain"
                      />
                      {/* <AccessTimeOutlinedIcon
                        className="ml-[-2px]"
                        fontSize="inherit"
                      /> */}
                      {/* <img
                          className="ml-[-1px] h-[14px] w-[14px] rounded-full"
                          src={
                            item.appointmentType !== 'AnyProfessional'
                              ? item.storeEmployee?.avatar
                              : assets.images.avatarUser2
                          }
                          alt="app-head"
                        /> */}
                    </div>
                    <div>
                      <span className="mx-[5px] text-xs text-[#6A6A6A]">
                        {Number(
                          item?.storeServiceCategoryItem?.price
                        ).toLocaleString()}{' '}
                        PKR
                      </span>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </div>
          );
        })
      ) : (
        <div className="flex h-[350px] flex-col items-center justify-center">
          <span className="text-xl font-semibold">Services</span>
          <span>No Record Found</span>
        </div>
      )}
    </div>
  );
}

export default ViewCardAccordin;
