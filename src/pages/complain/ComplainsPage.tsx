import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';

import assets from '../../assets';
import ChatIcon from '../../components/icons/ChatIcon';
import ComplainsChatPopup from './ComplainsChatPopup';
import ComplainsCreatePopup from './ComplainsCreatePopup';
import ComplainsEditPopup from './ComplainsEditPopup';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const options = ['View', 'Edit', 'Delete'];
const ITEM_HEIGHT = 48;

function ComplainsPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [openChatPopup, setOpenChatPopup] = useState(false);

  const open = Boolean(anchorEl);

  const handleChatPopupOpen = () => {
    setOpenChatPopup(true);
  };

  const handleFormClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleCheckAllChange = (event: any) => {
    setIsCheckedAll(event.target.checked);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedMenuClose = (option: string) => {
    setAnchorEl(null);
    if (option === 'View') {
      navigate(`view/123`);
    } else if (option === 'Edit') {
      setOpenEditFormDialog(true);
    } else {
      setOpenDialog(true);
    }
  };
  const handleClickSearch = () =>
    // event: any
    {
      // setSearch(event.target.value as string);
    };

  return (
    <>
      <ComplainsCreatePopup
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
      />
      <ComplainsEditPopup
        openEditFormDialog={openEditFormDialog}
        setOpenEditFormDialog={setOpenEditFormDialog}
      />
      <ComplainsChatPopup
        openChatPopup={openChatPopup}
        setOpenChatPopup={setOpenChatPopup}
      />
      <TopBar title="Complain List" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Complains
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
                <FormControl
                  className="search-grey-outline placeholder-grey w-60"
                  variant="filled"
                >
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onKeyDown={() =>
                      // event: React.KeyboardEvent<
                      //   HTMLInputElement | HTMLTextAreaElement
                      // >
                      {
                        handleClickSearch();
                        // event
                      }
                    }
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
                >
                  <AddOutlinedIcon /> Add Complain
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
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        handleCheckAllChange(event);
                      }}
                    />
                  </th>
                  <th>Logo</th>
                  <th>Shop Name</th>
                  <th>Complain ID</th>
                  <th>Date</th>
                  <th>Complain</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox
                      {...label}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <div className="avatar flex flex-row items-center">
                      <img src={assets.images.avatarUser} alt="" />
                    </div>
                  </td>
                  <td>
                    <span className="text-sm font-semibold">UrLaundry</span>
                  </td>
                  <td>UL56981269</td>
                  <td>01 Apr, 2023</td>
                  <td>Lorem Ipsum is simply dummy text</td>
                  <td>
                    <span className="badge badge-success">Complete</span>
                  </td>
                  <td>
                    <IconButton
                      aria-label="toggle visibility"
                      onClick={handleChatPopupOpen}
                    >
                      <ChatIcon />
                    </IconButton>
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
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <div className="avatar flex flex-row items-center">
                      <img src={assets.images.avatarUser} alt="" />
                    </div>
                  </td>
                  <td>
                    <span className="text-sm font-semibold">UrLaundry</span>
                  </td>
                  <td>UL56981269</td>
                  <td>01 Apr, 2023</td>
                  <td>Lorem Ipsum is simply dummy text</td>
                  <td>
                    <span className="badge badge-danger">pending</span>
                  </td>
                  <td>
                    <IconButton aria-label="toggle visibility">
                      <ChatIcon />
                    </IconButton>
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
          Delete Complain?
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
            Do you really want to delete this Complain?
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

export default ComplainsPage;
