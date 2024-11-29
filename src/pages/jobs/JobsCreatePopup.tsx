import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import React from 'react';
import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import '../../assets/css/PopupStyle.css';
import { Divider, InputAdornment } from '@mui/material';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import {
  CURRENCY_PREFIX,
  INVALID_CHAR,
  JOBS_TYPE,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PH_MINI_LENGTH,
  SHIFT_TYPE,
} from '../../utils/constants';
import { Jobs } from '../../interfaces/jobs.interface';
import CustomDropDown from '../../components/common/CustomDropDown';

type CategoriesCreatePopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function JobsCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: CategoriesCreatePopupProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Jobs>();

  const onSubmit = (data: Jobs) => {
    if (data.desc && data.title) {
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
            <span className="Title">Add Job Details</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Title</label>
                <Input
                  className="FormInput"
                  {...register('title', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Web Developer"
                  type="text"
                  id="title"
                  disableUnderline
                />
                {errors.title?.type === 'required' && (
                  <ErrorSpanBox error="Job Title is required" />
                )}
                {errors.title?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.title?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Department</label>
                <Input
                  className="FormInput"
                  {...register('department', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Software"
                  type="text"
                  id="department"
                  disableUnderline
                />
                {errors.department?.type === 'required' && (
                  <ErrorSpanBox error="Department name is required" />
                )}
                {errors.department?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.department?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Minimum Salary Range</label>
                <Input
                  className="FormInput"
                  id="minSalary"
                  placeholder="25000"
                  disableUnderline
                  {...register('minSalary', {
                    pattern: PATTERN.PHONE,
                    maxLength: {
                      value: 15,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      {CURRENCY_PREFIX}
                    </InputAdornment>
                  }
                />
                {errors.minSalary?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.minSalary?.type === 'maxLength' && (
                  <ErrorSpanBox error={PH_MINI_LENGTH} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Maximum Salary Range</label>
                <Input
                  className="FormInput"
                  id="maxSalary"
                  placeholder="60000"
                  disableUnderline
                  {...register('maxSalary', {
                    pattern: PATTERN.PHONE,
                    maxLength: {
                      value: 15,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      {CURRENCY_PREFIX}
                    </InputAdornment>
                  }
                />
                {errors.maxSalary?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.maxSalary?.type === 'maxLength' && (
                  <ErrorSpanBox error={PH_MINI_LENGTH} />
                )}
              </FormControl>
            </div>
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: JOBS_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Job Type"
                  defaultValue="Select Job Type"
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="shift"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: SHIFT_TYPE }}
                  customClassInputTitle="font-bold"
                  inputTitle="Shift Type"
                  defaultValue="Select Shift Type"
                />
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-3">
                  Description{' '}
                  <span className="SubLabel">Write 01-370 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="desc"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    required: 'Description is required',
                    minLength: {
                      value: 1,
                      message: 'Minimum One Characters',
                    },
                    maxLength: {
                      value: 370,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
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
                padding: '0.175rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default JobsCreatePopup;
