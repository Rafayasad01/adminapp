import React, { useState } from 'react';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import deepPurple from '@mui/material/colors/deepPurple';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../../../redux/redux-hooks';
import permission from '../../../../services/superadmin/SuperAdminRole';

function RolePermissions() {
  const authState = useAppSelector((state) => state.authState);
  const [isPrentCheck, setIsPrentCheck] = useState(false);
  const [name, setName] = useState('');
  const [childName, setChildName] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleFormClose = async () => {
    if (authState.user) {
      const id = authState.user.id;
      console.log(authState.user);
      const formData = {
        created_by: id,
        updated_by: id,
        name: name,
        permission_parent: null,
        action: '/create',
        permission_type: 'backend',
        desc: 'Create Permission',
        parentCheck: isPrentCheck,
        permission_sequence: 2,
        childName: childName,
      };
      console.log(formData);
      const create = await permission.createPermission(formData);
      console.log(create);
    }
  };

  return (
    <>
      <SuperAdminTopBar title="Roles" />
      <div className="container mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <FormControlLabel
            control={
              <Checkbox
                inputProps={{ 'aria-label': 'Checkbox' }}
                icon={
                  <CheckBoxOutlineBlankOutlinedIcon className="text-neutral-400" />
                }
                checkedIcon={
                  <CheckBoxOutlinedIcon className="text-neutral-900" />
                }
                checked={isPrentCheck}
                disableRipple={false}
              />
            }
            label="Parent"
          />

          <FormControl variant="standard">
            <label>Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              name="name"
              disableUnderline
              placeholder="Name"
              onChange={(
                name: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setName(name.target.value)}
            />
          </FormControl>

          <FormControl variant="standard">
            <label>Name</label>
            <Input
              id="name"
              type="text"
              value={childName}
              name="name"
              disableUnderline
              placeholder="Child Name"
              onChange={(
                name: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setChildName(name.target.value)}
            />
          </FormControl>

          <Button
            onClick={handleFormClose}
            sx={{
              padding: '0.375rem 2rem !important',
            }}
          >
            Add
          </Button>

          {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>

          <Button onClick={handleOpen}>Show backdrop</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop> */}
        </div>
      </div>
    </>
  );
}

export default RolePermissions;
