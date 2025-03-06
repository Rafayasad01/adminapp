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
  min?: number;
  max?: number;
  onclick?: (items?: any) => void;
  pattern?: any;
  placeholder?: string;
  register: any;
  requiredType?: boolean;
  showPassVisibility?: boolean;
  subInputTitle?: string;
  typeImportant?: boolean;
  value?: any;
  setShowPassword?: any;
  setInputFieldsData?: any;
  clickType?: any;
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
  min,
  max,
  onclick,
  pattern,
  placeholder,
  register,
  requiredType,
  showPassVisibility,
  subInputTitle,
  typeImportant,
  value,
  setInputFieldsData,
  clickType,
}: CustomInputBoxProps) {
  const handleShowPasswordClick = () => {
    setInputFieldsData((newArr: any) => {
      return newArr.map((el: any) => {
        if (el.type === 'password') {
          return {
            ...el,
            showPassVisibility: !el.showPassVisibility,
          };
        }
        return el;
      });
    });
  };
  return (
    <>
      <div className="flex">
        {inputTitle && (
          <label className={`FormLabel ${customFontClass}`}>{inputTitle}</label>
        )}
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
        name={id}
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
          min: {
            value: min,
            message: `${inputTitle} should be greater than or equal ${min}.`,
          },
          max: {
            value: max,
            message: `${inputTitle} should be less than or equal ${max}.`,
          },
          maxLength: {
            value: maxLetterLimit,
            message: `${inputTitle} should be ${maxLetterLimit} number long.`,
          },
          required: requiredType
            ? false
            : inputType === 'hidden'
            ? false
            : `${inputTitle?.toLocaleLowerCase() || id} is required`,
          value: value || '',
        })}
        endAdornment={
          inputType === 'password' && (
            <InputAdornment position="end">
              <IconButton
                style={{ padding: 0 }}
                aria-label="toggle password visibility"
                // onClick={() => setShowPassword((show: any) => !show)}
                onClick={
                  inputType === 'password'
                    ? clickType
                      ? onclick
                      : handleShowPasswordClick
                    : () => {}
                }
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
