import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import { TextField } from '@mui/material';
import CustomButton from '../../components/common/CustomButton';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Tenant } from '../../interfaces/superadmin/tenant.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
} from '../../utils/constants';

dayjs.extend(duration);
dayjs.extend(isBetween);

type BranchUpdatePopupProps = {
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
}: BranchUpdatePopupProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Tenant>();
  const onSubmit = (data: Partial<Tenant>) => {
    // console.log('onsubmiotupdate', data);
    if (data.tenantName) {
      setOpenFormDialog(false);
      callback(item.id, {
        name: data.tenantName,
        description: data.description,
        mobile: data.mobile,
        landline: data.landline,
        address: data.address,
      });
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
      setValue('description', item.description);
      setValue('mobile', item.mobile);
      setValue('landline', item.landline);
      setValue('address', item.address);
    }
  }, [item]);

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
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel mt-2">Branch Name</label>
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
                    // onChange={(val: any) => shopFieldHangler(val.target.value)}
                  />
                  {errors.tenantName?.type === 'required' && (
                    <ErrorSpanBox error="Branch name is required" />
                  )}
                  {errors.tenantName?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.tenantName?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Landline Number</label>
                  <Input
                    className="FormInput"
                    id="landline"
                    placeholder="Enter your landline number"
                    disableUnderline
                    {...register('landline', {
                      pattern: PATTERN.PHONE,
                      maxLength: {
                        value: 15,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    type="text"
                  />
                  {errors.landline?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.landline?.type === 'maxLength' && (
                    <ErrorSpanBox error={PH_MINI_LENGTH} />
                  )}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Mobile Number</label>
                  <Input
                    className="FormInput"
                    id="mobile"
                    placeholder="Enter your mobile number"
                    disableUnderline
                    {...register('mobile', {
                      pattern: PATTERN.PHONE,
                      maxLength: {
                        value: 15,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                    type="text"
                  />
                  {errors.mobile?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.mobile?.type === 'maxLength' && (
                    <ErrorSpanBox error={PH_MINI_LENGTH} />
                  )}
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel mt-2">Address</label>
                  <Input
                    className="FormInput"
                    {...register('address', {
                      // required: true,
                      pattern: PATTERN.CHAR_NUM_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                    })}
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                    disableUnderline
                  />
                  {/* {errors.address?.type === 'required' && (
                  <ErrorSpanBox error="Address is required" />
                )} */}
                  {errors.address?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.address?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel mt-2">
                    Description{' '}
                    <span className="SubLabel">Write 01-370 Characters</span>
                  </label>
                  <TextField
                    className="FormTextarea"
                    id="message"
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder="Write Description"
                    {...register('description', {
                      // required: 'Description is required',
                      // minLength: {
                      //   value: 1,
                      //   message: 'Minimum One Characters',
                      // },
                      maxLength: {
                        value: 370,
                        message: MAX_LENGTH_EXCEEDED,
                      },
                    })}
                  />
                  {errors.description && (
                    <ErrorSpanBox error={errors.description?.message} />
                  )}
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
            </div>
          </form>
        </div>
      </Dialog>
    )
  );
}

export default BranchUpdatePopup;
