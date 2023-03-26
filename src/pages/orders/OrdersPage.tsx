/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  Input,
  InputAdornment,
  Button,
  Select,
  SelectChangeEvent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import { blueGrey } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../components/common/TopBar';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const options = ['View', 'Edit', 'Download PDF'];
const ITEM_HEIGHT = 48;
function OrdersPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('status');
  const [time, setTime] = useState('time');
  const [openDialog, setOpenDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const addRouteHandler = () => {
    navigate('/dashboard/orders/create');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedMenuClose = (option: string) => {
    console.log(option);
    let doOption = '';
    if (option === 'Edit') {
      doOption = 'edit';
    } else if (option === 'View') {
      doOption = 'view';
    } else {
      doOption = 'download';
    }
    setAnchorEl(null);
    navigate('/dashboard/orders/' + doOption + '/123');
  };
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleTimeChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  const changeStatusHandler = (event: any) => {
    setStatus(event.target.value as string);
  };
  return (
    <div>
      <TopBar title="Orders" />
      <div className="container">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-3">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Orders
              </span>
            </div>
            <div className="col-span-6">
              <div className="flex flex-row gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-neutral-900"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onKeyDown={(
                      event: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleClickSearch(event);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <IconButton aria-label="toggle password visibility">
                          <SearchIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </FormControl>
                <Select
                  className="select-grey-outline h-10 w-36"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="status">Status</MenuItem>
                </Select>
                <Select
                  className=" select-grey-outline mr-3 h-10 w-36"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  onChange={handleTimeChange}
                >
                  <MenuItem value="time">Time</MenuItem>
                </Select>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-row">
                <Button variant="contained" className="btn-black-outline mr-3">
                  Export to CSV
                </Button>
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={addRouteHandler}
                >
                  <AddOutlinedIcon /> Add New
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      {...label}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                          color: blueGrey[50],
                          '&.Mui-checked': {
                            color: blueGrey[100],
                          },
                        },
                      }}
                    />
                  </th>
                  <th>Customers</th>
                  <th>Pickup Time</th>
                  <th>Drop-off Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox
                      {...label}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                          color: blueGrey[50],
                          '&.Mui-checked': {
                            color: blueGrey[100],
                          },
                        },
                      }}
                    />
                  </td>
                  <td>
                    Megan Chang <br />
                    greenwilliam@yahoo. <br />
                    278 Amy View Suite 011 Lawsonshire, MA 50054
                  </td>
                  <td>
                    06:00 PM - 05:00 PM <br />
                    February 02, 2023
                  </td>
                  <td>
                    04:00 AM - 05:00 AM <br />
                    February 02, 2023
                  </td>
                  <td>$14.69</td>
                  <td>
                    <Select
                      className="select-black-outline mr-3 h-7 w-36"
                      labelId="demo-simple-select-label"
                      value="Ready for Pick up"
                      onChange={(event) => {
                        changeStatusHandler(event);
                      }}
                    >
                      <MenuItem value="Ready for Pick up">
                        Ready for Pick up
                      </MenuItem>
                    </Select>
                  </td>
                  <td>
                    <IconButton
                      className="btn-dot"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      {...label}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                          color: blueGrey[50],
                          '&.Mui-checked': {
                            color: blueGrey[500],
                          },
                        },
                      }}
                    />
                  </td>
                  <td>
                    Megan Chang <br />
                    greenwilliam@yahoo. <br />
                    278 Amy View Suite 011 Lawsonshire, MA 50054
                  </td>
                  <td>
                    06:00 PM - 05:00 PM <br />
                    February 02, 2023
                  </td>
                  <td>
                    04:00 AM - 05:00 AM <br />
                    February 02, 2023
                  </td>
                  <td>$14.69</td>
                  <td>
                    <Select
                      className="select-black-outline mr-3 h-7 w-36"
                      labelId="demo-simple-select-label"
                      value="Order Placed"
                      onChange={(event) => {
                        changeStatusHandler(event);
                      }}
                    >
                      <MenuItem value="Order Placed">Order Placed</MenuItem>
                      <MenuItem value="Ready for Pick up">
                        Ready for Pick up
                      </MenuItem>
                    </Select>
                  </td>
                  <td>
                    <IconButton
                      className="btn-dot"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '11ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleSelectedMenuClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
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
          {'Cancel Order?'}
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
            Do you really want to cancel this order?
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
    </div>
  );
}

export default OrdersPage;
