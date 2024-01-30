import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import '../../assets/css/PopupStyle.css';
import { INVALID_CHAR } from '../../utils/constants';
import ErrorSpanBox from './ErrorSpanBox';

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
  pattern?: any;
};

function CustomInputBox({
  pattern,
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
  // console.log('errrrerr', error);
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
