import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import { debounce } from '@mui/material/utils';
import kabakCase from 'lodash/kebabCase';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../utils/constants';

dayjs.extend(duration);
dayjs.extend(isBetween);

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function BranchUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  item,
  callback,
  setIsNotify,
  setNotifyMessage,
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
    // console.log("onsubmiot", data,item);

    if (data.tenantName) {
      setOpenFormDialog(false);
      callback(item.id, data);
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

  useEffect(() => {
    if (item) {
      setValue('tenantName', item.name);
      setValue('email', item.backofficeUser.email);
      setValue('firstName', item.backofficeUser.firstName);
      setValue('lastName', item.backofficeUser.lastName);
      setValue('developmentDomain', item.tenantConfig.developmentDomain);
      setValue('liveDomain', item.tenantConfig.liveDomain);
    }
  }, [item]);

  const debouceRequest = debounce((value) => {
    setValue('developmentDomain', `dev.${kabakCase(value)}`);
    setValue('liveDomain', `live.${kabakCase(value)}`);
  }, 1000);

  const shopFieldHangler = (val: any) => {
    debouceRequest(val);
  };

  return (
    item && (
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        className=""
        disableScrollLock
        scroll="paper"
        PaperProps={
          {
            // className: 'Dialog',
            // style: { maxWidth: '100%', maxHeight: 'auto' },
          }
        }
      >
        <div className="Content p-5">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span className="Title">Edit Shop</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Shop Name</label>
                  <Input
                    className="FormInput"
                    {...register('tenantName', {
                      required: true,
                      value: item.name,
                    })}
                    type="text"
                    id="tenantName"
                    disableUnderline
                    onChange={(val: any) => shopFieldHangler(val.target.value)}
                  />
                  {errors.tenantName?.type === 'required' && (
                    <span role="alert">Shop name is required</span>
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Email</label>
                  <Input
                    disabled
                    className="FormInput"
                    {...register('email', {
                      required: true,
                      value: item.email,
                    })}
                    type="text"
                    id="email"
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
                    {...register('firstName', {
                      required: true,
                      value: item.firstName,
                    })}
                    type="text"
                    id="firstName"
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
                    {...register('lastName', {
                      required: true,
                      value: item.lastName,
                    })}
                    type="text"
                    id="lastName"
                    disableUnderline
                  />
                  {errors.lastName?.type === 'required' && (
                    <span role="alert">Last name is required</span>
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
                value="Update"
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
    )
  );
}

export default BranchUpdatePopup;
