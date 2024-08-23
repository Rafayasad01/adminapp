import Dialog from '@mui/material/Dialog';
import React from 'react';
// import TextField from '@mui/material/TextField';
import '../../../assets/css/PopupStyle.css';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

export type DayActivity = {
  room: string;
  count: number;
  stage: string;
  remarks: string;
  activity: string;
  jobType: string;
  progress: string;
  supervisor: string;
};

export type Day = {
  id: string;
  day: string;
  projectId: string;
  projectName: string;
  projectStartDate: string;
  data: DayActivity[];
};

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  day?: Day | null;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function ProjectPlanDayDetailsPopup({
  openFormDialog,
  setOpenFormDialog,
  day,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog
      open={openFormDialog}
      maxWidth="xl"
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog Width-60',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content px-5">
        <div className="mt-2">
          <h1 className="my-4 text-center text-lg font-bold">
            {' '}
            Day Activities
          </h1>
          <h3>
            <b>Project Name: </b> {day?.projectName ?? ''}
          </h3>
          <h3>
            <b>Working Day: </b> {day?.day ?? ''}
          </h3>
        </div>
        <div className="mt-3 grid grid-cols-none">
          <table className="table-border table-auto">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Room</th>
                <th>Activity</th>
                <th>Completed</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {day &&
                day.data &&
                day.data.map((item: DayActivity, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item.stage ? item.stage : '--'}</td>
                      <td>{item.room ? item.room : '--'}</td>
                      <td>
                        {item.activity
                          ? item.activity
                              .split(',')
                              .map((activity, activityIndex) => {
                                return (
                                  <span
                                    key={activityIndex}
                                    className="me-2 rounded border border-blue-300 bg-primary px-2.5 py-0.5 text-xs font-medium text-foreground dark:bg-gray-700 dark:text-blue-300"
                                  >
                                    {activity}
                                  </span>
                                );
                              })
                          : '--'}
                      </td>
                      <td>
                        <BorderLinearProgress
                          variant="determinate"
                          value={Number(item.progress)}
                          className="text-primary"
                        />
                      </td>
                      <td>{item.remarks ? item.remarks : '--'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>
  );
}

export default ProjectPlanDayDetailsPopup;
