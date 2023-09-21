import React, { Fragment } from 'react';
import Input from '@mui/material/Input';
import '../../assets/css/PopupStyle.css';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

type Props = {
  register: any;
  id: any;
  inputTitle: string;
  error: any;
  subInputTitle?: string;
  length?: string;
  value?: any;
  inputType?: string;
  onclick?: (items?: any) => void;
  showPassVisibility: boolean;
};

function CustomInputBox({
  register,
  id,
  value,
  inputTitle,
  error,
  subInputTitle,
  length,
  inputType,
  onclick,
  showPassVisibility,
}: Props) {
  console.log('VAL', value);

  return (
    <>
      <div className="flex">
        <label className="FormLabel">{inputTitle}</label>
        {subInputTitle && (
          <span style={{ fontSize: '11px', paddingLeft: '5px' }}>
            {subInputTitle}
          </span>
        )}
      </div>
      <Input
        sx={{ width: length }}
        className="FormInput"
        id={id}
        type={showPassVisibility ? inputType : 'text'}
        disableUnderline
        {...register(id, {
          required: `${inputTitle?.toLocaleLowerCase()} is required`,
          value: value || '',
        })}
        endAdornment={
          inputType === 'password' && (
            <InputAdornment position="end">
              <IconButton
                style={{ padding: 0 }}
                aria-label="toggle password visibility"
                onClick={onclick || (() => {})}
              >
                {showPassVisibility ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && <span role="alert">{error.message}</span>}
    </>
  );
}

export default CustomInputBox;
