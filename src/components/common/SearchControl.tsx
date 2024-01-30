import SearchIcon from '@mui/icons-material/Search';
import {
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';

interface SearchControlProps {
  onSearch?: (value: string) => void;
}

const SearchControl: React.FC<SearchControlProps> = ({
  onSearch = () => {},
}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchText(newValue);

    // Check if the input is empty and call onSearch
    if (newValue.trim() === '') {
      onSearch(newValue);
    }
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <FormControl
      className="search-grey-outline placeholder-grey w-60"
      variant="filled"
    >
      <Input
        className="input-with-icon after:border-b-secondary"
        id="search"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={handleSearch}
              aria-label="toggle password visibility"
            >
              <SearchIcon className="text-[#6A6A6A]" />
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
      />
    </FormControl>
  );
};

export default memo(SearchControl);
