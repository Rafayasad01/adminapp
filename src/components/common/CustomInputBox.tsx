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
  inputTitle?: string;
  error?: any;
  subInputTitle?: string;
  length?: string;
  value?: any;
  inputType?: string;
  onclick?: (items?: any) => void;
  showPassVisibility?: boolean;
  typeImportant?: boolean;
  customClass?: string;
  fieldNameSize?: string;
  customFontClass?: string;
  disable?: boolean;
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
  disable,
  showPassVisibility,
  typeImportant,
  fieldNameSize,
  customFontClass,
  customClass,
}: Props) {
  return (
    <>
      <div className="flex">
        <label className={`FormLabel ${customFontClass}`}>{inputTitle}</label>
        {subInputTitle && (
          <span
            style={{
              fontSize: fieldNameSize || '11px',
              paddingLeft: '5px',
            }}
          >
            {subInputTitle}
          </span>
        )}
      </div>
      <Input
        disabled={disable || false}
        sx={{ width: length }}
        className={`FormInput ${customClass}`}
        key={id}
        id={id}
        type={
          typeImportant ? inputType : showPassVisibility ? inputType : 'text'
        }
        disableUnderline
        {...register(id, {
          required:
            inputType === 'hidden'
              ? false
              : `${inputTitle?.toLocaleLowerCase()} is required`,
          value: value || '',
        })}
        endAdornment={
          inputType === 'password' && (
            <InputAdornment position="end">
              <IconButton
                style={{ padding: 0 }}
                aria-label="toggle password visibility"
                onClick={onclick || (() => { })}
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
