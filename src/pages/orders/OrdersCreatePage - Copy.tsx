import { useState } from 'react';
import {
  FormControl,
  Input,
  InputAdornment,
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import TopBar from '../../components/common/TopBar';

function OrdersCreatePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('categories');
  const [service, setService] = useState('services');
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleServiceChange = (event: SelectChangeEvent) => {
    setService(event.target.value as string);
  };

  return (
    <div>
      <TopBar isNestedRoute title="New Order" />
      <div className="container">
        <div className="grid grid-cols-12 gap-3 py-5">
          <div className="col-span-7 rounded-lg bg-white py-5 px-4 shadow-lg">
            <div className="col-span-12">
              <FormControl
                className="w-full rounded-xl border border-solid border-[#E4E4E4] py-1 pl-3"
                variant="filled"
              >
                <Input
                  className="input-with-icon after:border-b-neutral-900"
                  id="search"
                  type="text"
                  placeholder="Select Customer"
                  onKeyDown={(
                    event: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    handleClickSearch(event);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton aria-label="toggle password visibility">
                        <SearchIcon className="text-[#6A6A6A]" />
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
              </FormControl>
              <div className="mt-3 grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <Select
                    className="h-10 w-full rounded-lg font-open-sans text-sm font-normal text-[#6A6A6A]"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="categories">Categories</MenuItem>
                  </Select>
                </div>
                <div className="col-span-5">
                  <Select
                    className="h-10 w-full rounded-lg font-open-sans text-sm font-normal text-[#6A6A6A]"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service}
                    onChange={handleServiceChange}
                  >
                    <MenuItem value="services">Services</MenuItem>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Button
                    variant="contained"
                    className="fill-btn rounded-xl bg-[#1D1D1D] py-2 px-[18px] text-center font-dm-sans text-base font-medium capitalize not-italic text-[#FFFFFF] shadow-none"
                  >
                    <AddOutlinedIcon className="mr-1 text-xl" /> Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12">abc</div>
          </div>
          <div className="col-span-5 rounded-lg bg-white py-5 px-4 shadow-lg">
            Taqi
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersCreatePage;
