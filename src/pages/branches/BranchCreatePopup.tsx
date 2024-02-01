import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import { useAppSelector } from '../../redux/redux-hooks';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  VALIDATE_NON_NEGATIVE_NUM,
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
    formState: { errors },
  } = useForm<Tenant>();

  const authState: any = useAppSelector((state: any) => state?.authState);

  const onSubmit = (data: Tenant) => {
    // console.log("dataCREATE", data);
    const details = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      tenantName: data.tenantName,
      address: data.address,
      // domainWebapp: data.domainWebapp,
      domain: data.domain,
      userLimit: data.userLimit,
      userId: authState.user.id,
      // enableLoyaltyProgram: data.enableLoyaltyProgram,
      // loyaltyCoinConversionRate: data.enableLoyaltyProgram ? data.loyaltyCoinConversionRate : 0,
      // requiredCoinsToRedeem: data.enableLoyaltyProgram ? data.requiredCoinsToRedeem : 0,
    };
    // console.log('detailss', details);
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

  // const debouceRequest = debounce((value) => {
  //   setValue('domain', `devadminapp-${kabakCase(value)}`);
  //   // setValue('domainWebapp', `devwebapp-${kabakCase(value)}`);
  // }, 1000);

  // const shopFieldHangler = (val: any) => {
  //   debouceRequest(val);
  // };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      // scroll='paper'
      // disableScrollLock
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', minHeight: '400px', height: '400px' },
      }}
    >
      <div className="Content p-3">
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto px-2">
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
                    pattern: PATTERN.CHAR_NUM_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  type="text"
                  id="tenantName"
                  placeholder="Enter shop name"
                  disableUnderline
                  // onChange={(val: any) => shopFieldHangler(val.target.value)}
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
            <div className="FormFields">
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
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Employees Limits</label>
                <Input
                  className="FormInput"
                  {...register('userLimit', {
                    required: 'User limit is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
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
              title="Add"
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
              value="Add"
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
  );
}

export default BranchCreatePopup;
