import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import '../../../../assets/css/PopupStyle.css';
import { Tenant } from '../../../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../../../utils/constants';
import CustomDropDown from '../../../../components/common/CustomDropDown';

type Props = {
  roles?: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
};

function SuperAdminTenantCreatePopup({
  roles,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  type,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Tenant>();

  console.log('ROLES', roles);

  const onSubmit = (data: Tenant) => {
    console.log('submmit', data);

    if (data.tenantName) {
      setOpenFormDialog(false);
      callback(data);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  console.log('watch check', watch('trialMode'));

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">{type ? 'Add Branch' : 'Add Shop'}</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Shop Name</label>
                <Input
                  className="FormInput"
                  {...register('tenantName', { required: true })}
                  type="text"
                  id="tenantName"
                  placeholder="Enter shop name"
                  disableUnderline
                />
                {errors.tenantName?.type === 'required' && (
                  <span role="alert">Shop name is required</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email</label>
                <Input
                  className="FormInput"
                  {...register('email', { required: true })}
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  disableUnderline
                />
                {errors.email?.type === 'required' && (
                  <span role="alert">Email is required</span>
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  {...register('firstName', { required: true })}
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  disableUnderline
                />
                {errors.firstName?.type === 'required' && (
                  <span role="alert">First name is required</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Last Name</label>
                <Input
                  className="FormInput"
                  {...register('lastName', { required: true })}
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  disableUnderline
                />
                {errors.lastName?.type === 'required' && (
                  <span role="alert">Last name is required</span>
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Max branch limits</label>
                <Input
                  className="FormInput"
                  {...register('maxBranchLimit', { required: true })}
                  type="number"
                  id="maxBranchLimits"
                  placeholder="Enter max branch limits"
                  disableUnderline
                />
                {errors.maxBranchLimit?.type === 'required' && (
                  <span role="alert">branch limit is required</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Max User Limits</label>
                <Input
                  className="FormInput"
                  {...register('maxUserLimit', { required: true })}
                  type="number"
                  id="maxUserLimits"
                  placeholder="Enter max user limits"
                  disableUnderline
                />
                {errors.maxUserLimit?.type === 'required' && (
                  <span role="alert">User limits is required</span>
                )}
              </FormControl>
            </div>
            <div className="FormField mb-4">
              <CustomDropDown
                validateRequired
                id="role"
                control={control}
                error={errors}
                register={register}
                options={{ roles }}
                inputTitle="Role"
              />
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Development Domain</label>
                <TextField
                  className="FormInput"
                  sx={{ padding: 0 }}
                  id="development_domain"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {DOMAIN_PROTOCOL}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {DOMAIN_PREFIX}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  {...register('developmentDomain')}
                />
              </FormControl>
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Live Domain</label>
                <TextField
                  className="FormInput"
                  sx={{ padding: 0 }}
                  id="live_domain"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {DOMAIN_PROTOCOL}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {DOMAIN_PREFIX}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  {...register('liveDomain')}
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={
                      <RadioButtonUncheckedOutlinedIcon
                        style={{ color: '#1D1D1D' }}
                      />
                    }
                    checkedIcon={
                      <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                    }
                    {...register('trialMode')}
                  />
                }
                label="Trail Mode"
              />
            </div>
            {watch('trialMode') === true && (
              <div>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Trail Mode Limit ( Days )</label>
                  <Input
                    className="FormInput"
                    {...register('trialModeLimit', {
                      required: watch('trialMode') === true && true,
                      value: 15,
                    })}
                    type="number"
                    id="trialModeLimit"
                    placeholder="Enter Trail Mode limit in days"
                    disableUnderline
                  />
                  {errors.trialModeLimit?.type === 'required' && (
                    <span role="alert">Trail Mode limit is required</span>
                  )}
                </FormControl>
              </div>
            )}
          </div>
          <div className="FormFooter">
            <Button
              className="btn-black-outline"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.375rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default SuperAdminTenantCreatePopup;
