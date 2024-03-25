import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import '../../assets/css/PopupStyle.css';
import DoctorsDateRangePicker from './DoctorsDateRangePicker';
import WorkDaysForm from './WorkDaysForm';

type Props = {
  scheduleAddPopup: boolean;
  setScheduleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function DoctorsCreateSchedulePopup({
  scheduleAddPopup,
  setScheduleAddPopup,
}: Props) {
  const handleFormClose = () => setScheduleAddPopup(false);

  return (
    <Dialog
      open={scheduleAddPopup}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: {
          maxWidth: '100%',
          maxHeight: 'auto',
        },
      }}
    >
      <div className="Content">
        <div className="FormHeader">
          <span className="Title">Add Slots</span>
        </div>
        <div className="FormBody">
          <div className="Row gap-x3">
            <div className="Column-7" style={{ padding: '1rem 0' }}>
              <div className="custom-schedule-tab">
                <h3 className="p-2 font-medium text-black"> Set Timings</h3>
              </div>
              <div className="flex">
                <WorkDaysForm />
              </div>
            </div>
            <div className="Column-5" style={{ padding: '0.2rem 0' }}>
              <DoctorsDateRangePicker calendarStyle="settingPopup" />
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
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DoctorsCreateSchedulePopup;
