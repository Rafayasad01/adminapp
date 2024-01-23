import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  onclick?: (item?: any) => void;
  onchange?: (item?: any) => void;
  register?: any;
  className?: string;
  title?: string;
  icon?: any;
  buttonType: string;
  type?: any;
  isMenuOpen?: boolean;
  sx?: any;
  disabled?: boolean;
};

function CustomButton({
  onclick,
  onchange,
  register,
  buttonType,
  type,
  className,
  icon,
  title,
  isMenuOpen,
  sx,
  disabled,
}: Props) {
  if (buttonType === 'button') {
    return (
      <Button
        disabled={disabled}
        type={type && type}
        sx={sx && sx}
        variant="contained"
        className={className}
        onClick={onclick || (() => {})}
      >
        {/* {disabled ? <Loader /> : */}
        <>
          {icon && icon} {title}
        </>
        {/* } */}
      </Button>
    );
  }
  if (buttonType === 'dots') {
    return (
      <IconButton
        disabled={disabled}
        className="btn-dot"
        aria-label="more"
        id="long-button"
        aria-controls={isMenuOpen ? 'long-menu' : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onclick}
      >
        <MoreVertIcon />
      </IconButton>
    );
  }
  if (buttonType === 'upload') {
    return (
      <>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          {...register('avatar')}
          onChange={onchange}
          onClick={onclick}
        />
        <label htmlFor="raised-button-file" className="ImageLabel">
          <Button component="span" className="ImageBtn">
            {icon && icon} {title}
          </Button>
        </label>
      </>
    );
  }

  return null;
}

export default CustomButton;
