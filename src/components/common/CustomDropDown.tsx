import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

type Props = {
  inputTitle: string;
  customWidth?: string;
  options: any;
  register: any;
  id: any;
};

function CustomDropDown({
  inputTitle,
  customWidth,
  options,
  register,
  id,
}: Props) {
  const [val, setVal] = useState<any>();

  const handleChange = (e: any) => {
    setVal(e.target.value);
  };
  console.log('otions', options);

  useEffect(() => {
    setVal(options.role);
  }, []);

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
            value: val || '',
          })}
          value={val || 'none'}
          onChange={handleChange}
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
        {/* <select
                    style={{ paddingLeft: "10px", borderRadius: '5px', padding: 3, width: "100%" }}
                    className={`pr-5`}
                    onChange={handleChange}>
                    <option className="text-base" value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select> */}
      </div>
    </div>
  );
}

export default CustomDropDown;
