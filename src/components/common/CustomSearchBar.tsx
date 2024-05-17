import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';

type CustomSearchBarProps = {
  onkeydown: any;
  placeholder: string;
};

function CustomSearchBar({ onkeydown, placeholder }: CustomSearchBarProps) {
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
