import React, { useEffect } from 'react';
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
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(isBetween);

import '../../../assets/css/PopupStyle.css';
import { Tenant } from '../../../interfaces/superadmin/tenant.interface';
import { DOMAIN_PREFIX, DOMAIN_PROTOCOL } from '../../../utils/constants';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function SuperAdminTenantUpdatePopup({
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

  useEffect(() => {
    if (item) {
      setValue('tenantName', item.name);
      setValue('email', item.backofficeUser.email);
      setValue('firstName', item.backofficeUser.firstName);
      setValue('lastName', item.backofficeUser.lastName);
      setValue('trialMode', item.trialMode);
      setValue('trailStartDate', item.trailStartDate);
      setValue('developmentDomain', item.developmentDomain);
      setValue('liveDomain', item.liveDomain);
    }
  }, [item]);

  const getRemainingTime = (time: any) => {
    const addTime = dayjs(time).add(14, 'days');
    const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
    const diffBetween = dayjs.duration(dayjs().diff(endTime));
    const remainingTime = Math.abs(diffBetween.days());
    let dayTxt = "day";
    if (remainingTime > 1) {
      dayTxt = "days";
    }
    let remainingTxt;
    if (remainingTime <= 0) {
      remainingTxt = "Expired";
    } else {
      remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
    }
    return remainingTxt;
  }



  return item && (
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
            <span className="Title">Add Tenant</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Tenant Name</label>
                <Input
                  className="FormInput"
                  {...register('tenantName', { required: true, value: item.name })}
                  type="text"
                  id="tenantName"
                  disableUnderline
                />
                {errors.tenantName?.type === 'required' && (
                  <span role="alert">Tenant name is required</span>
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Email</label>
                <Input
                  className="FormInput"
                  {...register('email', { required: true, value: item.email })}
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
                  {...register('firstName', { required: true, value: item.firstName })}
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
                  {...register('lastName', { required: true, value: item.lastName })}
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
                {item.developmentDomain ? (
                  <Input
                    className="FormInput"
                    type="text"
                    id="developmentDmain"
                    value={item.developmentDomain}
                    disableUnderline
                    disabled
                  />
                ) : (
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
                )}

              </FormControl>
            </div>
            <div className="FormField mb-4">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Live Domain</label>
                {item.liveDomain ? (
                  <Input
                    className="FormInput"
                    type="text"
                    id="liveDomain"
                    value={item.liveDomain}
                    disableUnderline
                    disabled
                  />
                ) : (
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
                )}

              </FormControl>
            </div>
            <div className="FormFields">
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
                    {...register('trialMode', { value: item.trialMode })}
                    checked={item.trialMode ?? true}
                  />
                }
                label="Trail Mode"
              />
              {item.trialMode && (
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
                      {...register('trialUpdateMode',)}
                    />
                  }
                  label="Re Again Trail"
                />
              )}
            </div>
            {item.trialMode && (
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <TextField
                    className="FormInput"
                    sx={{ padding: 0 }}
                    id="trailStartDate"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {item.trailStartDate && (
                            <span>{getRemainingTime(item.trailStartDate)}</span>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    value={dayjs(item.trailStartDate).format('YYYY-MM-DD HH:mm:ss')}

                  />
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

export default SuperAdminTenantUpdatePopup;
