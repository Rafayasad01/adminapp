import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import '../../assets/css/PopupStyle.css';
import {
  fetchSchedule,
  setScheduleThunk,
} from '../../redux/features/shopScheduleStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { convertDayJSToString } from '../../utils/helper';
import OffDaysForm from './OffDaysForm';
import WorkDaysForm from './WorkDaysForm';

type SettingsCreateSchedulePopupProps = {
  scheduleAddPopup: boolean;
  setScheduleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsCreateSchedulePopup = ({
  scheduleAddPopup,
  setScheduleAddPopup,
}: SettingsCreateSchedulePopupProps) => {
  const handleFormClose = () => setScheduleAddPopup(false);
  const dispatch = useAppDispatch();
  const {
    workDays,
    offDays,
    date: ScheduledMonthDate,
    postLoading: ScheduledLoading,
  } = useAppSelector((state) => state?.scheduleState);
  const authState = useAppSelector((state) => state?.authState);
  const [tabPanel, setTabPanel] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPanel(newValue);
  };

  const submitSchedule = () => {
    let od = offDays?.map((x) => ({ ...x, event: x.key }));
    od = convertDayJSToString(od, ['startDate', 'endDate'], 'YYYY-MM-DD');
    const wd = convertDayJSToString(workDays, [
      'openTime',
      'breakTime',
      'closeTime',
      'breakOffTime',
    ]);

    dispatch(
      setScheduleThunk({
        tenant: authState.user?.tenant,
        body: {
          workDays: wd,
          eventDays: od,
          date: dayjs(ScheduledMonthDate).format('YYYY-MM-DD'),
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchSchedule({
        tenant: authState.user?.tenant,
        date: dayjs(ScheduledMonthDate).format('YYYY-MM-DD'),
      })
    );
  }, []);

  return (
    <Dialog
      open={scheduleAddPopup}
      onClose={handleFormClose}
      PaperProps={{
        className: `Dialog ${tabPanel ? 'Width-55' : '!w-[500px]'}`,
        style: {
          maxWidth: '100%',
          maxHeight: 'auto',
        },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Set Shop Timings</span>
        </div>
        <div className="FormBody">
          <div className="Row gap-7">
            <div className="col-span-12" style={{ padding: '1rem 0' }}>
              <div className="custom-schedule-tab">
                <Tabs
                  value={tabPanel}
                  aria-label="basic tabs example"
                  onChange={handleChange}
                  TabIndicatorProps={{}}
                >
                  <Tab
                    label="Work Days"
                    value={0}
                    icon={
                      tabPanel === 0 ? (
                        <ExpandMoreOutlinedIcon />
                      ) : (
                        <div className="h-[1em] w-[1em]">&nbsp;</div>
                      )
                    }
                    iconPosition="bottom"
                    disableRipple
                  />
                  <Tab disableRipple className="tab-divider" />
                  <Tab
                    icon={
                      tabPanel === 1 ? (
                        <ExpandMoreOutlinedIcon />
                      ) : (
                        <div className="h-[1.2rem] w-[1.2rem]">&nbsp;</div>
                      )
                    }
                    iconPosition="bottom"
                    label="Event Days"
                    value={1}
                    disableRipple
                  />
                </Tabs>
              </div>
              <div className="">
                {tabPanel === 0 ? <WorkDaysForm /> : <OffDaysForm />}
              </div>
            </div>
          </div>
        </div>
        <div className="FormFooter">
          <Button
            className="btn-black-outline"
            onClick={handleFormClose}
            sx={{
              marginRight: '0.5rem',
              padding: '0.375rem 1.5rem !important',
            }}
          >
            Close
          </Button>
          <Button
            className="btn-black-fill"
            disabled={ScheduledLoading}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
            onClick={submitSchedule}
          >
            {ScheduledLoading && (
              <CircularProgress color="inherit" size={20} className="mr-3" />
            )}
            Submit Schedule
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsCreateSchedulePopup;
