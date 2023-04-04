import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopBar from '../../components/common/TopBar';
import VouchersPromoCreatePopup from './VouchersPromoCreatePopup';
import VouchersReferralCreatePopup from './VouchersReferralCreatePopup';
import VouchersPromoEditPopup from './VouchersPromoEditPopup';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;
function VouchersPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const [vouchersPromoDialog, setVouchersPromoDialog] = useState(false);
  const [vouchersPromoEditDialog, setVouchersPromoEditDialog] = useState(false);
  const [vouchersReferralDialog, setVouchersReferralDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleFormClickOpen = () => {
    setVouchersReferralDialog(true);
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
    if (option === 'Edit') {
      setVouchersPromoEditDialog(true);
    } else {
      setOpenDialog(true);
    }
  };
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };
  return (
    <>
      <VouchersPromoCreatePopup
        vouchersPromoDialog={vouchersPromoDialog}
        setVouchersPromoDialog={setVouchersPromoDialog}
      />
      <VouchersPromoEditPopup
        vouchersPromoEditDialog={vouchersPromoEditDialog}
        setVouchersPromoEditDialog={setVouchersPromoEditDialog}
      />
      <VouchersReferralCreatePopup
        vouchersReferralDialog={vouchersReferralDialog}
        setVouchersReferralDialog={setVouchersReferralDialog}
      />
      <TopBar title="Vouchers" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                All Vouchers
              </span>
            </div>
            <div className="col-span-5">
              <div className="flex flex-row justify-end gap-3">
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
                <Button
                  variant="contained"
                  className="btn-black-fill btn-icon"
                  onClick={handleFormClickOpen}
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
                  <th className="w-5">
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
                  <th>Vouchers</th>
                  <th>Valid From</th>
                  <th>Valid Till</th>
                  <th>Value</th>
                  <th>
                    Min
                    <br />
                    Products
                  </th>
                  <th>
                    Min
                    <br />
                    Amount
                  </th>
                  <th>Type</th>
                  <th>Redeem</th>
                  <th>
                    Max
                    <br />
                    Redeem
                  </th>
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
                      <div className="flex flex-col items-start justify-start">
                        <span className="text-sm font-semibold">WEEK18</span>
                        <span className="text-xs font-normal text-[#6A6A6A]">
                          Referral
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>02 Mar, 2023</td>
                  <td>02 Apr, 2023</td>
                  <td>$18</td>
                  <td>08</td>
                  <td>$50</td>
                  <td>Amount</td>
                  <td>05</td>
                  <td>30</td>
                  <td>
                    <span className="badge badge-success">ACTIVE</span>
                  </td>
                  <td>
                    <div className="flex flex-row-reverse">
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
                    </div>
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
                      <div className="flex flex-col items-start justify-start">
                        <span className="text-sm font-semibold">HAPPY10</span>
                        <span className="text-xs font-normal text-[#6A6A6A]">
                          Promo
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>02 Mar, 2023</td>
                  <td>02 Apr, 2023</td>
                  <td>$10</td>
                  <td>10</td>
                  <td>$30</td>
                  <td>Amount</td>
                  <td>01</td>
                  <td>01</td>
                  <td>
                    <span className="badge badge-danger">Inactive</span>
                  </td>
                  <td>
                    <div className="flex flex-row-reverse">
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
                    </div>
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
          Delete Voucher?
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
            Do you really want to delete this voucher?
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
      ;
    </>
  );
}

export default VouchersPage;
