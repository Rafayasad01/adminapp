import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import '../../assets/css/PopupStyle.css';
import SettingsDateRangePicker from './SettingsDateRangePicker';
import WorkDaysForm from './WorkDaysForm';
import OffDaysForm from './OffDaysForm';

type Props = {
  schedulePopup: boolean;
  setSchedulePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingsEditSchedulePopup({ schedulePopup, setSchedulePopup }: Props) {
  const handleFormClose = () => setSchedulePopup(false);

  const [tabPanel, setTabPanel] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPanel(newValue);
  };

  return (
    <Dialog
      open={schedulePopup}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-55',
        style: {
          maxWidth: '100%',
          maxHeight: 'auto',
        },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Edit Schedule</span>
        </div>
        <div className="FormBody">
          <div className="Row gap-x3">
            <div className="Column-7" style={{ padding: '1rem 0' }}>
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
                    label="Off Days"
                    value={1}
                    disableRipple
                  />
                </Tabs>
              </div>
              <div className="flex">
                {tabPanel === 0 ? <WorkDaysForm /> : <OffDaysForm />}
              </div>
            </div>
            <div className="Column-5" style={{ padding: '0.2rem 0' }}>
              <SettingsDateRangePicker calendarStyle="settingPopup" />
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
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SettingsEditSchedulePopup;
