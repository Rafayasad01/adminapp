import React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onkeydown: any;
  placeholder: string;
};

function CustomSearchBar({ onkeydown, placeholder }: Props) {
  return (
    <FormControl
      className="search-grey-outline placeholder-grey w-60"
      variant="filled"
    >
      <Input
        className="input-with-icon after:border-b-secondary"
        id="search"
        type="text"
        placeholder={placeholder}
        onKeyDown={(
          event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          onkeydown(event);
        }}
        endAdornment={
          <InputAdornment position="end">
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton aria-label="toggle password visibility">
              <SearchIcon className="text-[#6A6A6A]" />
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
      />
    </FormControl>
  );
}

export default CustomSearchBar;
