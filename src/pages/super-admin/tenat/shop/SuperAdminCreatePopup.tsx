import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import kabakCase from 'lodash/kebabCase';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import { Tenant } from '../../../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../../../utils/constants';

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
    setValue,
    formState: { errors },
    control,
  } = useForm<Tenant>();

  const onSubmit = (data: Tenant) => {
    console.log('submmit Tenant==>', data);
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

  const debouceRequest = debounce((value) => {
    setValue('developmentDomain', `dev.${kabakCase(value)}`);
    setValue('liveDomain', `live.${kabakCase(value)}`);
  }, 1000);

  const shopFieldHangler = (val: any) => {
    debouceRequest(val);
  };

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
                  type="text"
                  id="tenantName"
                  placeholder="Enter shop name"
                  disableUnderline
                  {...register('tenantName', { required: true })}
                  onChange={(val: any) => shopFieldHangler(val.target.value)}
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
            <div className="FormFields mb-4">
              <CustomDropDown
                validateRequired
                id="role"
                control={control}
                error={errors}
                register={register}
                options={{ roles }}
                inputTitle="Role"
              />
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Address</label>
                <Input
                  className="FormInput"
                  type="text"
                  id="address"
                  placeholder="Enter shop address"
                  disableUnderline
                  {...register('address', { required: true })}
                />
                {errors.address?.type === 'required' && (
                  <span role="alert">address is required</span>
                )}
              </FormControl>
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
                  disabled
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
                  disabled
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
