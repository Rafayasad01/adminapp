import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TopBar from '../../components/common/TopBar';

import Map from '../../components/common/Map';
import assets from '../../assets';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const options = ['View', 'Edit', 'Delete'];
const ITEM_HEIGHT = 48;

function DriversViewPage() {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const open = Boolean(anchorEl);

  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };

  const handleCheckAllChange = (event: any) => {
    setIsCheckedAll(event.target.checked);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedMenuClose = (option: string) => {
    setAnchorEl(null);
  };

  return (
    <>
      <TopBar isNestedRoute title="View Driver" />
      <div className="container mt-5">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
            <div className="flex w-full items-center">
              <img
                src={assets.tempImages.avatarUser3}
                alt=""
                className="mr-4 w-[100px] rounded-full"
              />
              <div className="flex flex-col justify-start justify-items-center">
                <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                  John S. Phillips
                </span>
                <span className="font-sm font-open-sans text-sm text-[#6A6A6A]">
                  +1 218 319 7750
                </span>
                <span className="font-sm mt-2 font-open-sans text-sm text-[#29CC97]">
                  Active
                </span>
              </div>
            </div>
            <Divider className="mt-4" />
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-col">
                <span className="mt-2 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Email
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  JohnSPhillips@dayrep.com
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  Address
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  1192 Ashmor DriveWadena, MN 56482
                </span>
              </div>
              <div className="flex w-full flex-col">
                <span className="mt-3 font-open-sans text-base font-semibold text-[#1A1A1A]">
                  License Number
                </span>
                <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                  75 434 867
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-8 rounded-lg bg-[#fff] shadow-lg">
            <div className="flex h-80 w-full">
              <Map center={{ lat: 38.8936708, lng: -77.1546612 }} zoom={17} />
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-12 rounded-lg bg-[#fff] px-4 py-5 shadow-lg">
            <div className="flex justify-between">
              <span className="font-open-sans text-xl font-semibold text-[#1A1A1A]">
                Driver History
              </span>
              <div className="flex-grow">&nbsp;</div>
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
                    <th>Name</th>
                    <th>Pickup Time</th>
                    <th>Drop Time</th>
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
                    <td>John S. Phillips</td>
                    <td>
                      <div className="flex flex-col">
                        <span className="text-sm font-normal text-[#1A1A1A]">
                          Sep 02, 2023
                        </span>
                        <span className="text-xs font-normal text-[#6A6A6A]">
                          10:00 - 11:00 AM
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="text-sm font-normal text-[#1A1A1A]">
                          Sep 03, 2023
                        </span>
                        <span className="text-xs font-normal text-[#6A6A6A]">
                          03:00 - 05:00 PM
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">In Progress</span>
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
                        icon={
                          <CheckBoxOutlineBlankOutlinedIcon className=" text-[#E4E4E4]" />
                        }
                        checkedIcon={
                          <CheckBoxOutlinedIcon className="text-[#1D1D1D]" />
                        }
                        checked={isCheckedAll}
                      />
                    </td>
                    <td>John S. Phillips</td>
                    <td>Sep 02, 2023</td>
                    <td>Sep 03, 2023</td>
                    <td>
                      <span className="badge badge-danger">Cancelled</span>
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
    </>
  );
}

export default DriversViewPage;
