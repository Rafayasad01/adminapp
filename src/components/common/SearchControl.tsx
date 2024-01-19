import { Divider, FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const SearchControl = ({ onKeyUp=(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {} }) => {
  return (
    <FormControl
      className="search-grey-outline placeholder-grey w-60"
      variant="filled"
    >
      <Input
        className="input-with-icon after:border-b-neutral-900"
        id="search"
        type="text"
        placeholder="Search"
        onKeyUp={onKeyUp}
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
};


export default SearchControl;