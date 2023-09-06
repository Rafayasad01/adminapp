/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
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
import assets from '../../../assets';
import TopBar from '../../../components/common/TopBar';

const ITEM_HEIGHT = 48;
function SuperAdminShopsListPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const open = Boolean(anchorEl);

  const handleCheckAllChange = (event: any) => {
    setIsCheckedAll(event.target.checked);
  };

  const addRouteHandler = () => {
    navigate('../add-new');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShopView = (id: number) => {
    navigate(['../', id].join(''));
  };
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };

  return (
    <>
      <TopBar title="Shops" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="flex gap-3 p-4">
            <div className="font-open-sans text-xl font-semibold text-neutral-900">
              Shop List
            </div>
            <div className="flex-grow" />
            <FormControl
              className="search-grey-outline placeholder-grey w-60"
              variant="filled"
            >
              <Input
                className="after:border-b-neutral-900"
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
                      <SearchIcon className="text-neutral-500" />
                    </IconButton>
                  </InputAdornment>
                }
                disableUnderline
              />
            </FormControl>
            <Button
              variant="contained"
              className="rounded-xl bg-neutral-900 text-gray-50"
              onClick={addRouteHandler}
              startIcon={<AddOutlinedIcon />}
            >
              Add New Shop
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
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
                  <th>Phone</th>
                  <th>Email</th>
                  <th>License Number</th>
                  <th className="text-center">Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <img
                      className="aspect-square w-11 rounded-full object-cover"
                      src={assets.tempImages.sudsLaundry}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Suds Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      SL001
                    </div>
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    +1 1234 5678 900
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    sudslaundry@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    03 141 633
                  </td>
                  <td className="text-center">
                    <div className="rounded-3xl bg-emerald-500 py-2 font-open-sans text-xs font-bold text-gray-50">
                      Active
                    </div>
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
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
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <img
                      className="aspect-square w-11 rounded-full object-cover"
                      src={assets.tempImages.freshCleanLaundry}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Fresh N&apos; Clean Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      FCP002
                    </div>
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    +1 504-202-0297
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    freshnclean@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    82 908 852
                  </td>
                  <td className="text-center">
                    <div className="rounded-3xl bg-emerald-500 py-2 font-open-sans text-xs font-bold text-gray-50">
                      Active
                    </div>
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
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
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <img
                      className="aspect-square w-11 rounded-full object-cover"
                      src={assets.tempImages.spotlessLaundry}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Spotless Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      S0806
                    </div>
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    +1 206-731-9892
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    spotless@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    74 904 479
                  </td>
                  <td className="text-center">
                    <div className="rounded-3xl bg-red-500 py-2 font-open-sans text-xs font-bold text-gray-50">
                      Inactive
                    </div>
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
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
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td>
                    <img
                      className="aspect-square w-11 rounded-full object-cover"
                      src={assets.tempImages.soapyLaundry}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Soapy Suds Laundry
                    </div>
                    <div className="font-open-sans text-xs font-normal text-neutral-500">
                      SS007
                    </div>
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    +1 912-421-4200
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    soapysuds@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    03 043 857
                  </td>
                  <td className="text-center">
                    <div className="rounded-3xl bg-emerald-500 py-2 font-open-sans text-xs font-bold text-gray-50">
                      Active
                    </div>
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
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
        <MenuItem onClick={() => handleShopView(42)}>View</MenuItem>
        <MenuItem>Inactive</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default SuperAdminShopsListPage;
