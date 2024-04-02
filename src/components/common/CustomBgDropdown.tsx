import React, { useState } from 'react';
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  setAppointmentType: any;
  appointmentType: any;
  options: any;
};

const CustomBgDropdown = ({
  setAppointmentType,
  appointmentType,
  options,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: any) => {
    setAppointmentType({ text: option.name, icon: option.imageIcon });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={appointmentType?.text}
        aria-controls="dropdown"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        className="btn-black-fill btn-icon h-[42%]"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {appointmentType && <appointmentType.icon className="mr-2 text-xl" />}{' '}
        {appointmentType?.text || 'Select an appointment'}
      </Button>
      <Menu
        className="w-full"
        id={appointmentType?.text}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options?.map((item: any, index: number) => (
          <MenuItem
            selected={item.name === appointmentType?.text}
            className="text-sm"
            key={index}
            value={item.name}
            onClick={() => handleMenuItemClick(item)}
          >
            <item.imageIcon className="mr-2 text-xl" />
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomBgDropdown;
