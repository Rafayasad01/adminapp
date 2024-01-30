import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '../../components/icons/DeleteIcon';
import SettingsCreateSchedulePopup from './SettingsCreateSchedulePopup';
import SettingsDateRangePicker from './SettingsDateRangePicker';
import SettingsEditSchedulePopup from './SettingsEditSchedulePopup';

function SettingsShopScheduling() {
  const navigate = useNavigate();
  const [scheduleAddPopup, setScheduleAddPopup] = useState(false);
  const [scheduleEditPopup, setScheduleEditPopup] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <SettingsCreateSchedulePopup
        scheduleAddPopup={scheduleAddPopup}
        setScheduleAddPopup={setScheduleAddPopup}
      />
      <SettingsEditSchedulePopup
        schedulePopup={scheduleEditPopup}
        setSchedulePopup={setScheduleEditPopup}
      />
      <div className="grid w-full grid-cols-12 gap-3">
        <div className="col-span-12 min-h-[650px] rounded-lg bg-white py-3 shadow-lg">
          <div className="custom-tab">
            <Tabs value="SHOP_SCHEDULING" aria-label="basic tabs example">
              <Tab
                label="App Settings"
                value="APP_SETTINGS"
                onClick={() => navigate('../app')}
              />
              <Tab
                label="System Configuration"
                value="SYSTEM_CONFIGURATION"
                onClick={() => navigate('../config')}
              />
              {/* <Tab
                label="Shop Scheduling"
                value="SHOP_SCHEDULING"
                onClick={() => navigate('../shop')}
              /> */}
            </Tabs>
          </div>
          <div className="Content w-full py-5 px-4">
            <div className="flex flex-col gap-0">
              <div className="flex justify-end">
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={() => setScheduleAddPopup(true)}
                >
                  <AddOutlinedIcon /> Add Schedule
                </Button>
              </div>
              <div className="grid grid-cols-12 gap-y-0 gap-x-4">
                <div className="col-span-8">
                  <div className="class">
                    <table className="schedule-table table-border table-auto border-separate border-spacing-y-[1.4rem]">
                      <thead>
                        <tr>
                          <th className="w-16">&nbsp;</th>
                          <th>Shop Time</th>
                          <th>Pick & Drop</th>
                          <th>Days Off</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="days-off">
                          <td>Sun</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>Day Off</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => setScheduleEditPopup(true)}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => setOpenDialog(true)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Mon</td>
                          <td>9:30-7:30</td>
                          <td>10:30-6:30</td>
                          <td>&nbsp;</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Tue</td>
                          <td>9:30-7:30</td>
                          <td>10:30-6:30</td>
                          <td>&nbsp;</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr className="days-off">
                          <td>Wed</td>
                          <td>Public Holiday</td>
                          <td>&nbsp;</td>
                          <td>Day Off</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Thu</td>
                          <td>9:30-7:30</td>
                          <td>10:30-6:30</td>
                          <td>&nbsp;</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Fri</td>
                          <td>9:30-7:30</td>
                          <td>10:30-6:30</td>
                          <td>&nbsp;</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                        <tr className="days-off">
                          <td>Sat</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>Day Off</td>
                          <td>
                            <div className="flex justify-end pr-3">
                              <IconButton
                                className="p-0 pr-2 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <CreateOutlinedIcon />
                              </IconButton>
                              <IconButton
                                className="p-0 text-[#1D1D1D]"
                                onClick={() => null}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="mt-6">
                    <SettingsDateRangePicker calendarStyle="settingPage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: '#1A1A1A',
            fontFamily: 'Inter',
            fonWeight: 600,
            fonSize: '20px',
            padding: '10px 15px 0 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Delete Schedule?
        </DialogTitle>
        <DialogContent
          sx={{
            color: '#6A6A6A',
            fontFamily: 'Inter',
            fonWeight: 400,
            fonSize: '14px',
            padding: '10px 15px 0 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this schedule?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between', margin: '15px 5px 10px 5px' }}
        >
          <Button
            sx={{ width: '140px' }}
            variant="contained"
            className="btn-black-outline mr-3"
            onClick={handleDialogClose}
          >
            Yes, Confirm
          </Button>
          <Button
            sx={{ width: '140px' }}
            variant="contained"
            className="btn-black-fill btn-icon"
            onClick={handleDialogClose}
          >
            No, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SettingsShopScheduling;
