import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

type Props = {
  inputTitle: string;
  customWidth?: string;
  options: any;
  register: any;
  id: any;
  value?: string;
};

function CustomDropDown({
  inputTitle,
  customWidth,
  options,
  register,
  id,
}: Props) {
  return (
    <div className="">
      <div className="" style={{ paddingBottom: '3px' }}>
        <span className="FormLabel">{inputTitle}</span>
      </div>
      <div className="">
        <Select
          fullWidth
          disableUnderline
          variant="outlined"
          style={{ border: '1px solid rgb(201 201 201)' }}
          className="select-grey-outline"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register(id, {
            required: `${inputTitle?.toLocaleLowerCase()} is required`,
          })}
          value={options.role || ''}
        >
          <MenuItem value="none">-- Select Role --</MenuItem>
          {options?.roles?.map((item: any, index: number) => {
            return (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}

export default CustomDropDown;
