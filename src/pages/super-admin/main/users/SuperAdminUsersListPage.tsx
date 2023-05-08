import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import dayjs from 'dayjs';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
import assets from '../../../../assets';
import SuperAdminAddNewUserDialog from './SuperAdminAddNewUserDialog';
import SuperAdminEditUserDialog from './SuperAdminEditUserDialog';
import SuperAdminChangeUserAccessDialog from './SuperAdminChangeUserAccessDialog';

const ITEM_HEIGHT = 48;
function SuperAdminUsersListPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [addNewUserDialogOpen, setAddNewUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [changeUserAccessDialogOpen, setChangeUserAccessDialogOpen] =
    useState(true);

  const open = Boolean(anchorEl);

  const handleCheckAllChange = (event: any) => {
    setIsCheckedAll(event.target.checked);
  };

  const addRouteHandler = () => {
    navigate('../add-new');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShopView = (id: number) => {
    navigate(['../', id].join(''));
  };
  const handleClickSearch = (event: any) => {
    setSearch(event.target.value as string);
  };

  return (
    <>
      <SuperAdminAddNewUserDialog
        openDialog={addNewUserDialogOpen}
        setOpenDialog={setAddNewUserDialogOpen}
      />
      <SuperAdminEditUserDialog
        openDialog={editUserDialogOpen}
        setOpenDialog={setEditUserDialogOpen}
      />
      <SuperAdminChangeUserAccessDialog
        openDialog={changeUserAccessDialogOpen}
        setOpenDialog={setChangeUserAccessDialogOpen}
      />
      <SuperAdminTopBar title="Users" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="flex gap-3 p-4">
            <div className="font-open-sans text-xl font-semibold text-neutral-900">
              All Users
            </div>
            <div className="flex-grow" />
            <FormControl
              className="search-grey-outline placeholder-grey w-60"
              variant="filled"
            >
              <Input
                className="after:border-b-neutral-900"
                id="search"
                type="text"
                placeholder="Search"
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
                      <SearchIcon className="text-neutral-500" />
                    </IconButton>
                  </InputAdornment>
                }
                disableUnderline
              />
            </FormControl>
            <Button
              variant="contained"
              className="rounded-xl bg-neutral-900 text-gray-50"
              onClick={() => setAddNewUserDialogOpen(true)}
              startIcon={<AddOutlinedIcon />}
            >
              Add New
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-none">
            <table className="table-border table-auto">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        handleCheckAllChange(event);
                      }}
                    />
                  </th>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>User Email</th>
                  <th>Date</th>
                  <th>Access</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td className="flex items-center">
                    <img
                      className="mr-2 aspect-square w-11 rounded-full object-cover"
                      src={assets.tempImages.avatarUser3}
                      alt=""
                    />
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Michael H. Tilley
                    </div>
                  </td>

                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    UL56981269
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    Michael@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    {dayjs().format('DD MMM, YYYY')}
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    Admin
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td className="flex items-center">
                    <img
                      className="mr-2 aspect-square w-11 rounded-full object-cover"
                      src={assets.images.avatarUser}
                      alt=""
                    />
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      John Martin
                    </div>
                  </td>

                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    UL56981269
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    martin.john@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    {dayjs().format('DD MMM, YYYY')}
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    View Only
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox
                      inputProps={{ 'aria-label': 'Checkbox' }}
                      icon={
                        <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                      }
                      checkedIcon={
                        <CheckBoxOutlinedIcon className="text-neutral-900" />
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td className="flex items-center">
                    <img
                      className="mr-2 aspect-square w-11 rounded-full object-cover"
                      src={assets.images.avatarUser2}
                      alt=""
                    />
                    <div className="font-open-sans text-sm font-semibold text-neutral-900">
                      Mark L. Shaffer
                    </div>
                  </td>

                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    UL56981269
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    Shaffer@email.com
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    {dayjs().format('DD MMM, YYYY')}
                  </td>
                  <td className="font-open-sans text-sm font-normal text-neutral-900">
                    Edit
                  </td>
                  <td>
                    <IconButton
                      className="text-neutral-400"
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '11ch',
          },
        }}
      >
        <MenuItem onClick={() => setEditUserDialogOpen(true)}>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default SuperAdminUsersListPage;
