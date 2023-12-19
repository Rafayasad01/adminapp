import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import kabakCase from 'lodash/kebabCase';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
};

function BranchCreatePopup({
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
    setValue,
    formState: { errors },
  } = useForm<Tenant>();

  const onSubmit = (data: Tenant) => {
    // console.log("dataCREATE", data);
    const details = {
      developmentDomain: data.developmentDomain,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      liveDomain: data.liveDomain,
      tenantName: data.tenantName,
      address: data.address,
    };
    if (data.tenantName) {
      setOpenFormDialog(false);
      callback(details);
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
                  {...register('tenantName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  id="tenantName"
                  placeholder="Enter shop name"
                  disableUnderline
                  onChange={(val: any) => shopFieldHangler(val.target.value)}
                />
                {errors.tenantName?.type === 'required' && (
                  <ErrorSpanBox error="Shop name is required" />
                )}
                {errors.tenantName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.tenantName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email</label>
                <Input
                  className="FormInput"
                  {...register('email', {
                    required: true,
                    pattern: PATTERN.CHAR_NUM_DOT_AT,
                    validate: (value) => value.length <= 100,
                  })}
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  disableUnderline
                />
                {errors.email?.type === 'required' && (
                  <ErrorSpanBox error="Email is required" />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.email?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">First Name</label>
                <Input
                  className="FormInput"
                  {...register('firstName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  disableUnderline
                />
                {errors.firstName?.type === 'required' && (
                  <ErrorSpanBox error="First name is required" />
                )}
                {errors.firstName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.firstName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Last Name</label>
                <Input
                  className="FormInput"
                  {...register('lastName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  disableUnderline
                />
                {errors.lastName?.type === 'required' && (
                  <ErrorSpanBox error="Last name is required" />
                )}
                {errors.lastName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.lastName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Shop Address</label>
                <Input
                  className="FormInput"
                  {...register('address', {
                    required: 'Address is required',
                    pattern: PATTERN.ADDRESS_ONLY,
                    validate: (value) => value.length <= 250,
                  })}
                  type="text"
                  id="address"
                  placeholder="Enter shop address"
                  disableUnderline
                />
                {errors.address?.type === 'required' && (
                  <ErrorSpanBox error={errors.address?.message} />
                )}
                {errors.address?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.address?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
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

export default BranchCreatePopup;
