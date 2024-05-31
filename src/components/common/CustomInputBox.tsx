import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import '../../assets/css/PopupStyle.css';
import { INVALID_CHAR } from '../../utils/constants';
import ErrorSpanBox from './ErrorSpanBox';

type CustomInputBoxProps = {
  customClass?: string;
  customFontClass?: string;
  disable?: boolean;
  sx?: any;
  error?: any;
  fieldNameSize?: string;
  id: any;
  inputTitle?: string;
  inputType?: string;
  length?: string;
  maxLetterLimit?: number;
  onclick?: (items?: any) => void;
  pattern?: any;
  placeholder?: string;
  register: any;
  requiredType?: boolean;
  showPassVisibility?: boolean;
  subInputTitle?: string;
  typeImportant?: boolean;
  value?: any;
};

function CustomInputBox({
  customClass,
  customFontClass,
  disable,
  error,
  fieldNameSize,
  id,
  inputTitle,
  inputType,
  length,
  sx,
  maxLetterLimit,
  onclick,
  pattern,
  placeholder,
  register,
  requiredType,
  showPassVisibility,
  subInputTitle,
  typeImportant,
  value,
}: CustomInputBoxProps) {
  // console.log('error', error);
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
        sx={sx ?? { width: length }}
        className={`FormInput ${customClass}`}
        placeholder={placeholder}
        id={id}
        autoComplete="new-password"
        type={
          typeImportant ? inputType : showPassVisibility ? inputType : 'text'
        }
        disableUnderline
        {...register(id, {
          pattern: {
            value: pattern,
            message: INVALID_CHAR,
          },
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
        <ErrorSpanBox error={`${error.message ? `${error.message}` : ''}`} />
      )}
    </>
  );
}

export default CustomInputBox;
