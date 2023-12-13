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
  placeholder?: string;
  requiredType?: boolean;
  maxLetterLimit?: number;
};

function CustomInputBox({
  register,
  id,
  value,
  inputTitle,
  placeholder,
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
  requiredType,
  maxLetterLimit,
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
        placeholder={placeholder}
        id={id}
        autoComplete="new-password"
        type={
          typeImportant ? inputType : showPassVisibility ? inputType : 'text'
        }
        disableUnderline
        {...register(id, {
          maxLength: {
            value: maxLetterLimit,
            message: `${inputTitle} should be ${maxLetterLimit} number long.`,
          },
          required: requiredType
            ? false
            : inputType === 'hidden'
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
                onClick={onclick || (() => {})}
              >
                {showPassVisibility ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && (
        <span className="text-sm" role="alert">{`${
          error.message ? `* ${error.message}` : ''
        }`}</span>
      )}
    </>
  );
}

export default CustomInputBox;
