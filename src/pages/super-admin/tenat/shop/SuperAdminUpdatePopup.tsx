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
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import kabakCase from 'lodash/kebabCase';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import ErrorSpanBox from '../../../../components/common/ErrorSpanBox';
import { Tenant } from '../../../../interfaces/superadmin/tenant.interface';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
  VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH,
} from '../../../../utils/constants';
import CustomMultipleSelectBox from '../../../../components/common/CustomMultipleSelect';
import ColorRowWithTooltips from '../../../../components/common/ColorRowWithTooltips';

dayjs.extend(duration);
dayjs.extend(isBetween);

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  roles?: any;
  role?: any;
  type?: any;
  isLoader?: boolean;
  setIsLoader?: any;
  lovList?: any;
  themeList?: any;
};

function SuperAdminUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  item,
  callback,
  setIsNotify,
  setNotifyMessage,
  roles,
  role,
  type,
  lovList,
  isLoader,
  setIsLoader,
  themeList,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<Tenant>();

  const onSubmit = (data: Partial<Tenant>) => {
    console.log('onsubmiot', data);
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

  console.log(lovList, item.systemConfig.theme);

  useEffect(() => {
    if (item) {
      setValue('tenantName', item.name);
      setValue('email', item.backofficeUser.email);
      setValue('firstName', item.backofficeUser.firstName);
      setValue('lastName', item.backofficeUser.lastName);
      setValue('trialMode', item.trialMode);
      setValue('trialStartDate', item.trialStartDate);
      setValue('domainAdminapp', item?.systemConfig?.domainAdminapp ?? '');
      setValue('domainWebapp', item?.systemConfig?.domainWebapp ?? '');
      setValue('theme', item?.systemConfig?.theme ?? '');
    }
  }, [item]);

  const getRemainingTime = (data: any) => {
    const addTime = dayjs(data.trialStartDate).add(
      Number(data.trialModeLimit) - 1,
      'days'
    );
    const endTime: any = dayjs(addTime).format('YYYY-MM-DD HH:mm:ss');
    const diffBetween = dayjs.duration(dayjs().diff(endTime));
    const remainingTime = Math.abs(Math.round(diffBetween.asDays()));
    let dayTxt = 'day';
    if (remainingTime > 1) {
      dayTxt = 'days';
    }
    let remainingTxt;
    // console.log(remainingTime, addTime, endTime, diffBetween);

    if (remainingTime <= 0) {
      remainingTxt = 'Expired';
    } else {
      remainingTxt = `Remaining ${remainingTime} ${dayTxt} left`;
    }
    return remainingTxt;
  };

  const debouceRequest = debounce((value) => {
    setValue('domainAdminapp', `devadminapp-${kabakCase(value)}`);
    setValue('domainWebapp', `devwebapp-${kabakCase(value)}`);
  }, 1000);

  const shopFieldHangler = (val: any) => {
    debouceRequest(val);
  };

  // const filteredArray = themeList?.filter((el: any) => item?.systemConfig?.theme?.includes(el.id));

  let filteredArray = item?.theme?.map((el: any) => {
    return {
      id: el.id,
      name: el.key,
      value: el.value.themeColor.primary,
    };
  });

  // let filteredArrayIds = item?.theme?.map((el: any) => {
  //   return {
  //     id: el.id
  //   }
  // });

  // console.log(filteredArrayIds);

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
                    disabled={type === 'branch' && true}
                    className="FormInput"
                    type="text"
                    id="tenantName"
                    disableUnderline
                    {...register('tenantName', {
                      required: true,
                      value: item.name,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                    })}
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
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">First Name</label>
                  <Input
                    disabled={type === 'branch' && true}
                    className="FormInput"
                    {...register('firstName', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 50,
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
                    disabled={type === 'branch' && true}
                    className="FormInput"
                    {...register('lastName', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 50,
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
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Max branch limits</label>
                  <Input
                    className="FormInput"
                    {...register('maxBranchLimit', {
                      value: item.maxBranchLimit,
                      required: 'Branch limit is required in numbers',
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    type="number"
                    id="maxBranchLimits"
                    placeholder="Enter max branch limits"
                    disableUnderline
                  />
                  {errors?.maxBranchLimit && (
                    <span role="alert" className="error-color">
                      *{errors?.maxBranchLimit?.message}
                    </span>
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Max User Limits</label>
                  <Input
                    className="FormInput"
                    {...register('maxUserLimit', {
                      value: item.maxUserLimit,
                      required: 'User limit is required in numbers',
                      validate: (value: any) =>
                        VALIDATE_NON_NEGATIVE_NUM(value),
                    })}
                    type="number"
                    id="maxUserLimits"
                    placeholder="Enter max user limits"
                    disableUnderline
                  />
                  {errors?.maxUserLimit && (
                    <span role="alert" className="error-color">
                      *{errors?.maxUserLimit?.message}
                    </span>
                  )}
                </FormControl>
              </div>
              <div className="FormFields mb-4">
                <FormControl className="FormControl" variant="standard">
                  <CustomDropDown
                    validateRequired
                    id="role"
                    control={control}
                    error={errors}
                    register={register}
                    options={{ roles, role }}
                    inputTitle="Role"
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <CustomMultipleSelectBox
                    validateRequired
                    id="theme"
                    control={control}
                    error={errors}
                    setValue={setValue}
                    register={register}
                    options={{
                      roles: lovList,
                      role: item?.systemConfig?.theme,
                    }}
                    customClassInputTitle="font-bold"
                    inputTitle="Theme"
                    defaultVal="-- Select Theme --"
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Admin Domain</label>
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
                    {...register('domainAdminapp')}
                    disabled
                  />
                </FormControl>
              </div>
              <div className="FormField mb-4">
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
              </div>
              <div>
                <div className="mb-2">
                  <span className="">Theme</span>
                </div>
                <ColorRowWithTooltips
                  colors={filteredArray?.length > 0 ? filteredArray : []}
                  type="array"
                />
              </div>
              <div className="FormField">
                <div className="MergedField">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={item.trialMode}
                        icon={
                          <RadioButtonUncheckedOutlinedIcon
                            style={{ color: '#1D1D1D' }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleOutlinedIcon
                            style={{ color: '#1D1D1D' }}
                          />
                        }
                        {...register('trialMode')}
                      />
                    }
                    label="Trial Mode"
                  />
                  {/* {item.trialMode ? (
                    <span className="badge badge-success badge-w-100">
                      Enabled
                    </span>
                  ) : (
                    <span className="badge badge-danger badge-w-100">
                      Disabled
                    </span>
                  )} */}
                </div>
              </div>
              {watch('trialMode') === true && (
                <div>
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel">
                      Trial Mode Limit ( Days )
                    </label>
                    <Input
                      className="FormInput"
                      {...register('trialModeLimit', {
                        required:
                          watch('trialMode') === true &&
                          'Trial Mode limit is required in numbers',
                        value: item.trialModeLimit ? item.trialModeLimit : 15,
                        validate: (value: any) =>
                          VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH(value, 10),
                      })}
                      type="number"
                      id="trialModeLimit"
                      placeholder="Enter Trial Mode limit in days"
                      disableUnderline
                    />
                    {errors?.trialModeLimit && (
                      <span role="alert" className="error-color">
                        *{errors?.trialModeLimit?.message}
                      </span>
                    )}
                  </FormControl>
                </div>
              )}
              {dayjs(item.trialStartDate).isValid() && (
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <TextField
                      disabled
                      className="FormInput"
                      sx={{ padding: 0 }}
                      id="trialStartDate"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <span>{getRemainingTime(item)}</span>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={dayjs(item.trialStartDate).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    />
                  </FormControl>
                </div>
              )}
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

export default SuperAdminUpdatePopup;
