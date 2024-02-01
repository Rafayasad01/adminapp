import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import kabakCase from 'lodash/kebabCase';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../utils/constants';

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
    setValue,
    formState: { errors },
  } = useForm<Tenant>();
  const onSubmit = (data: Partial<Tenant>) => {
    // console.log('onsubmiotupdate', data, item);
    if (data.enableLoyaltyProgram === false) {
      delete data.loyaltyCoinConversionRate;
      delete data.requiredCoinsToRedeem;
    }
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
      // setValue('domainWebapp', item.systemConfig.domainWebapp);
      setValue('domain', item.systemConfig.domain);
      // setValue('enableLoyaltyProgram', item.tenantExt.enableLoyaltyProgram);
    }
  }, [item]);

  // console.log('ITEM', item.tenantExt.enableLoyaltyProgram);

  const debouceRequest = debounce((value) => {
    setValue('domain', `devadminapp-${kabakCase(value)}`);
    // setValue('domainWebapp', `devwebapp-${kabakCase(value)}`);
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
      >
        <div className="Content p-5">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span className="Title">Edit Branch</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Shop Name</label>
                  <Input
                    className="FormInput"
                    {...register('tenantName', {
                      required: true,
                      pattern: PATTERN.CHAR_NUM_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                      value: item.name,
                    })}
                    type="text"
                    id="tenantName"
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
                  <label className="FormLabel">Employees Limits</label>
                  <Input
                    className="FormInput"
                    {...register('userLimit', {
                      value: item.userLimit,
                      required: 'User limit is required in numbers',
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                      maxLength: {
                        value: 20,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    type="number"
                    id="userLimit"
                    placeholder="Enter user limits"
                    disableUnderline
                  />
                  {errors?.userLimit && (
                    <ErrorSpanBox error={errors?.userLimit?.message} />
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
                      value: item.firstName,
                    })}
                    type="text"
                    id="firstName"
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
                      value: item.lastName,
                    })}
                    type="text"
                    id="lastName"
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
                  <label className="FormLabel">Email</label>
                  <Input
                    disabled
                    className="FormInput"
                    {...register('email', {
                      required: true,
                      pattern: PATTERN.CHAR_NUM_DOT_AT,
                      validate: (value) => value.length <= 100,
                      value: item.email,
                    })}
                    type="text"
                    id="email"
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
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Domain</label>
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
                    {...register('domain', {
                      required: true,
                      pattern: PATTERN?.CHAR_NUM_DASH,
                      validate: (value) => value.length <= 100,
                    })}
                  />
                  {errors.domain?.type === 'required' && (
                    <ErrorSpanBox error="domain is required" />
                  )}
                  {errors.domain?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.domain?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              {/* <div className="FormField mb-4">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Web-App Domain</label>
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
                    {...register('domainWebapp')}
                    disabled
                  />
                </FormControl>
              </div> */}
              {/* <div className="FormField">
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.tenantExt.enableLoyaltyProgram}
                      icon={
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ color: '#1D1D1D' }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleOutlinedIcon style={{ color: '#1D1D1D' }} />
                      }
                      {...register('enableLoyaltyProgram')}
                    />
                  }
                  label="Loyality Program"
                />
              </div>
              {watch('enableLoyaltyProgram') === true && (
                <div className='FormFields'>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Loyality Conversion Rate</label>
                    <Input
                      id="loyaltyCoinConversionRate"
                      placeholder="Enter Conversion Rate"
                      type="number"
                      className="FormInput"
                      {...register('loyaltyCoinConversionRate', {
                        value: item?.tenantExt?.loyaltyCoinConversionRate,
                        required:
                          watch('enableLoyaltyProgram') === true &&
                          'Loyality rate is required in numbers',
                        validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message: MAX_LENGTH_EXCEEDED
                        }
                      })}
                      disableUnderline
                    />
                    {errors?.loyaltyCoinConversionRate && (
                      <ErrorSpanBox error={errors?.loyaltyCoinConversionRate?.message} />
                    )}
                  </FormControl>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">Minimum Loyality Coins</label>
                    <Input
                      id="requiredCoinsToRedeem"
                      placeholder="Enter Minimum Loyality coins"
                      type="number"
                      className="FormInput"
                      {...register('requiredCoinsToRedeem', {
                        value: item?.tenantExt?.requiredCoinsToRedeem,
                        required:
                          watch('enableLoyaltyProgram') === true &&
                          'Loyality coins is required in numbers',
                        validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                        maxLength: {
                          value: 10,
                          message: MAX_LENGTH_EXCEEDED
                        }
                      })}
                      disableUnderline
                    />
                    {errors?.requiredCoinsToRedeem && (
                      <ErrorSpanBox error={errors?.requiredCoinsToRedeem?.message} />
                    )}
                  </FormControl>
                </div>
              )} */}
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
              <CustomButton
                buttonType="button"
                title="Update"
                type="submit"
                className="btn-black-fill"
                sx={{
                  padding: '0.375rem 2rem !important',
                  width: '90%',
                  height: '35px',
                }}
              />
              {/* <Input
                type="submit"
                value="Update"
                className="btn-black-fill"
                disableUnderline
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              /> */}
            </div>
          </form>
        </div>
      </Dialog>
    )
  );
}

export default BranchUpdatePopup;
