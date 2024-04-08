import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import '../../assets/css/PopupStyle.css';
import { CircularProgress } from '@mui/material';
import WorkDaysForm from './WorkDaysForm';
import OffDaysForm from './OffDaysForm';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

type Props = {
  scheduleAddPopup: boolean;
  setScheduleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingsCreateSchedulePopup({
  scheduleAddPopup,
  setScheduleAddPopup,
}: Props) {
  const handleFormClose = () => setScheduleAddPopup(false);
  const dispatch = useAppDispatch();
  const workDays = useAppSelector((state) => state.scheduleState.workDays);
  const offDays = useAppSelector((state) => state?.scheduleState?.offDays);
  const [loading, setLoading] = React.useState(false);
  const [tabPanel, setTabPanel] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPanel(newValue);
  };

  const submitSchedule = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log('Data Submission:', { workDays, eventDays: offDays });
  };

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
            Cancel
          </Button>
          <Button
            className="btn-black-fill"
            disabled={loading}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
            onClick={submitSchedule}
          >
            {loading && (
              <CircularProgress color="inherit" size={20} className="mr-3" />
            )}
            Submit Schedule
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SettingsCreateSchedulePopup;
