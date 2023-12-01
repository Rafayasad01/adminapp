import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

type Props = {
  inputTitle: string;
  customWidth?: string;
  options?: any;
  register?: any;
  control?: any;
  id?: any;
  value?: string;
  error?: any;
  validateRequired?: any;
  customClassInputTitle?: string;
  defaultValue?: string;
  setValue?: any;
  alternativeId?: string;
};

function CustomDropDown({
  inputTitle,
  customWidth,
  options,
  register,
  error,
  control,
  id,
  validateRequired,
  defaultValue,
  customClassInputTitle,
  setValue,
  alternativeId,
}: Props) {
  return (
    <div className="">
      <div className="" style={{ paddingBottom: '3px' }}>
        <span className={`FormLabel ${customClassInputTitle}`}>
          {inputTitle}
        </span>
      </div>
      <div className="">
        <Controller
          name={id}
          control={control}
          defaultValue={options?.role || 'none'}
          rules={
            validateRequired
              ? {
                  validate: (value) => {
                    return value !== 'none' || 'Select an option';
                  },
                }
              : {}
          }
          render={({ field, fieldState }) => (
            <>
              <Select
                fullWidth
                variant="outlined"
                style={{ border: '1px solid rgb(201, 201, 201)' }}
                className={`fixed-height ${customWidth || 'w-[100%]'}`}
                labelId="demo-simple-select-label"
                id={id}
                {...field}
                onChange={(event) => {
                  alternativeId && setValue(alternativeId, []);
                  field.onChange(event);
                }}
              >
                <MenuItem value="none">
                  {defaultValue ? `-- ${defaultValue} --` : `-- Select Role --`}
                </MenuItem>
                {options?.roles?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                  *{fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default CustomDropDown;
