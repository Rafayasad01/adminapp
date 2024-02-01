import { SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePickerButton from './DatePickerButton';

import assets from '../../assets';
import TopBar from '../../components/common/TopBar';
import DeleteIcon from '../../components/icons/DeleteIcon';

function OrdersCreatePage() {
  // const [search, setSearch] = useState('');
  const [category, setCategory] = useState('categories');
  const [service, setService] = useState('services');
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);

  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value);
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  // const handleClickSearch = () =>
  //   // event: any
  //   {
  //     // setSearch(event.target.value as string);
  //   };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleServiceChange = (event: SelectChangeEvent) => {
    setService(event.target.value as string);
  };
  const removeQuantity = () => {
    let qty = quantity;
    if (qty > 0) {
      setQuantity((qty -= 1));
    }
  };
  const addQuantity = () => {
    let qty = quantity;
    setQuantity((qty += 1));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TopBar isNestedRoute title="Edit Order" />
      <div className="container mt-3">
        <div className="grid grid-cols-12 gap-3 py-5">
          <div className="col-span-7 rounded-lg bg-white py-5 px-4 shadow-lg">
            <div className="col-span-12">
              <FormControl
                className="w-full rounded-xl border border-solid border-primary py-1 pl-3"
                variant="filled"
              >
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="search"
                  type="text"
                  placeholder="Select Customer"
                  // onKeyDown={() =>
                  //   // event: React.KeyboardEvent<
                  //   //   HTMLInputElement | HTMLTextAreaElement>
                  //   {
                  //     handleClickSearch();
                  //     // event
                  //   }
                  // }
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
                <div className="col-span-6">
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
                <div className="col-span-6">
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
              </div>
            </div>
            <div className="col-span-12 mt-3">
              <table className="avatar-table no-border-table table-auto">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Products
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Price
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Quantity
                    </th>
                    <th className="font-open-sans text-base font-semibold text-secondary">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <IconButton
                        className="p-0 text-neutral-900"
                        onClick={() => null}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                    <td>
                      <span className="avatar">
                        <img src={assets.tempImages.wash} alt="" /> Wash & Fold
                      </span>
                    </td>
                    <td>$50.00</td>
                    <td>
                      <span className="flex w-full flex-row items-center justify-start">
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={removeQuantity}
                        >
                          <RemoveCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                        <FormControl
                          className="txt-center m-1 w-8"
                          variant="standard"
                        >
                          <Input
                            className="after:border-b-secondary"
                            id="quantity"
                            value={quantity}
                            disableUnderline
                          />
                        </FormControl>
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={addQuantity}
                        >
                          <AddCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                      </span>
                    </td>
                    <td className="text-sm font-semibold text-secondary">
                      $150.00
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <IconButton
                        className="p-0 text-neutral-900"
                        onClick={() => null}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                    <td>
                      <span className="avatar">
                        <img src={assets.tempImages.shirt} alt="" /> Wash & Fold
                      </span>
                    </td>
                    <td>$50.00</td>
                    <td>
                      <span className="flex w-full flex-row items-center justify-start">
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={removeQuantity}
                        >
                          <RemoveCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                        <FormControl
                          className="txt-center m-1 w-8"
                          variant="standard"
                        >
                          <Input
                            className="after:border-b-secondary"
                            id="quantity"
                            value={quantity}
                            disableUnderline
                          />
                        </FormControl>
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={addQuantity}
                        >
                          <AddCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                      </span>
                    </td>
                    <td className="text-sm font-semibold text-secondary">
                      $150.00
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <IconButton
                        className="p-0 text-neutral-900"
                        onClick={() => null}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                    <td>
                      <span className="avatar">
                        <img src={assets.tempImages.pants} alt="" /> Wash & Fold
                      </span>
                    </td>
                    <td>$50.00</td>
                    <td>
                      <span className="flex w-full flex-row items-center justify-start">
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={removeQuantity}
                        >
                          <RemoveCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                        <FormControl
                          className="txt-center m-1 w-8"
                          variant="standard"
                        >
                          <Input
                            className="after:border-b-secondary"
                            id="quantity"
                            value={quantity}
                            disableUnderline
                          />
                        </FormControl>
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={addQuantity}
                        >
                          <AddCircleOutlineOutlinedIcon className="text-lg" />
                        </IconButton>
                      </span>
                    </td>
                    <td className="text-sm font-semibold text-secondary">
                      $150.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-span-12">
              <TextField
                className="mt-4 w-full hover:border-foreground"
                id="outlined-multiline-static"
                multiline
                rows={5}
                defaultValue="Call me whenever you reach nearby."
                placeholder="Driver Instructions..."
              />
            </div>
          </div>
          <div className="col-span-5 rounded-lg bg-white py-5 shadow-lg">
            <div className="flex w-full flex-row items-center justify-center gap-5">
              <div className="flex flex-row items-center justify-center">
                <DatePickerButton
                  onChange={handlePickUpTimeChange}
                  id="pick-up-date-time-picker"
                  icon={<CalendarTodayOutlinedIcon />}
                />
                <span className="font-open-sans text-sm font-semibold text-secondary">
                  {pickUpTime ? (
                    <>
                      <div className="font-open-sans text-sm font-semibold text-secondary">
                        {pickUpTime.format('MMM MM, YYYY')}
                      </div>
                      <div className="font-open-sans text-xs font-normal text-[#6A6A6A]">
                        {pickUpTime.format('HH:mm')} -{' '}
                        {pickUpTime.add(1, 'hours').format('HH:mm')}{' '}
                        {pickUpTime.format('A')}
                      </div>
                    </>
                  ) : (
                    'Pick up time'
                  )}
                </span>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="flex flex-row items-center justify-center">
                <DatePickerButton
                  onChange={handleDropOffTimeChange}
                  id="drop-off-date-time-picker"
                  icon={<CalendarTodayOutlinedIcon />}
                />
                <span className="font-open-sans text-sm font-semibold text-secondary">
                  {dropOffTime ? (
                    <>
                      <div className="font-open-sans text-sm font-semibold text-secondary">
                        {dropOffTime.format('MMM MM, YYYY')}
                      </div>
                      <div className="font-open-sans text-xs font-normal text-[#6A6A6A]">
                        {dropOffTime.format('HH:mm')} -{' '}
                        {dropOffTime.add(1, 'hours').format('HH:mm')}{' '}
                        {dropOffTime.format('A')}
                      </div>
                    </>
                  ) : (
                    'Drop off time'
                  )}
                </span>
              </div>
            </div>
            <Divider flexItem className="my-5" />
            <div className="w-full px-4">
              <FormControl className="w-full" variant="filled">
                <label className="mb-1 ml-1 w-full font-open-sans text-xl font-semibold">
                  Address
                </label>
                <div className="w-full rounded-xl border border-solid border-foreground py-1 pl-3">
                  <Input
                    className="input-with-icon after:border-b-secondary"
                    id="search"
                    type="text"
                    placeholder="Type Addess"
                    // onKeyDown={(
                    //   event: React.KeyboardEvent<
                    //     HTMLInputElement | HTMLTextAreaElement
                    //   >
                    // ) => {
                    //   handleClickSearch(event);
                    // }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <PlaceOutlinedIcon className="text-[#6A6A6A]" />
                        </IconButton>
                      </InputAdornment>
                    }
                    disableUnderline
                  />
                </div>
              </FormControl>
              <FormControl className="mt-4">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="font-open-sans text-xl font-semibold text-secondary"
                >
                  Payment
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                >
                  <FormControlLabel
                    sx={{
                      color: '#6A6A6A',
                      fontFamily: 'Open Sans',
                      fonWeight: 400,
                      fonSize: '14px',
                    }}
                    value="CASH_ON_DELIVERY"
                    control={
                      <Radio
                        className="text-sm text-[#1D1D1D]"
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<CheckCircleOutlinedIcon />}
                      />
                    }
                    label="Cash on delivery"
                  />
                  <FormControlLabel
                    sx={{
                      color: '#6A6A6A',
                      fontFamily: 'Open Sans',
                      fonWeight: 400,
                      fonSize: '14px',
                    }}
                    value="SEND_LINK"
                    control={
                      <Radio
                        className="text-sm text-[#1D1D1D]"
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<CheckCircleOutlinedIcon />}
                      />
                    }
                    label="Send link"
                  />
                </RadioGroup>
              </FormControl>
              <Divider flexItem className="my-5" />
              <div className="my-4">
                <div className="font-open-sans text-lg font-semibold text-neutral-900">
                  Total Amount
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Total Amount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    $400.00
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    Discount
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    $0.00
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-open-sans text-xs font-normal text-neutral-900">
                    HST 13%
                  </div>
                  <div className="font-open-sans text-sm font-bold text-neutral-900">
                    $31.20
                  </div>
                </div>
              </div>
              <hr className="h-[1px] rounded-lg bg-neutral-200" />
              <div className="mb-2 flex items-center justify-between py-2">
                <div className="font-open-sans text-lg font-semibold text-neutral-900">
                  Grand Total
                </div>
                <div className="font-open-sans text-sm font-bold text-neutral-900">
                  $431.20
                </div>
              </div>
              <Button
                type="button"
                onClick={() => null}
                color="inherit"
                className="w-full rounded-lg bg-neutral-900 font-open-sans text-base font-semibold text-gray-50"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default OrdersCreatePage;
