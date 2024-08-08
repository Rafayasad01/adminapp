import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader2';
import { UpdateAppointmentForm } from '../../interfaces/app.appointment';
import { GENDER, MAX_LENGTH_EXCEEDED, PATTERN } from '../../utils/constants';

type UpdateAppointmentPopupProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: any;
  callback: (...args: any[]) => any;
  setIsNotify?: any;
  setNotifyMessage?: any;
};

function UpdateAppointmentPopup({
  openFormDialog,
  setOpenFormDialog,
  formData,
  callback,
  setIsNotify: _setIsNotify,
  setNotifyMessage: _setNotifyMessage,
}: UpdateAppointmentPopupProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateAppointmentForm>();
  console.log('datass', formData);

  const onSubmit = (data: any) => {
    data.id = formData?.id;
    setOpenFormDialog(false);
    callback(data);
    reset();
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
            <span className="Title">Edit Appointment</span>
          </div>
          {formData ? (
            <>
              <div className="FormBody">
                <div className="FormFields">
                  <FormControl className="FormControl" variant="standard">
                    <CustomInputBox
                      value={formData?.name}
                      maxLetterLimit={50}
                      pattern={PATTERN.CHAR_SPACE_DASH}
                      inputTitle="Full Name"
                      placeholder="Enter full name"
                      id="name"
                      register={register}
                      error={errors.name}
                      inputType="text"
                    />
                  </FormControl>
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomDropDown
                      validateRequired
                      id="gender"
                      control={control}
                      error={errors}
                      setValue={setValue}
                      register={register}
                      options={{ roles: GENDER, role: formData?.gender }}
                      customClassInputTitle="font-semibold"
                      defaultValue="Select Gender"
                      inputTitle="Gender"
                    />
                  </FormControl>
                </div>
                <div className="FormFields">
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomInputBox
                      pattern={PATTERN.ONLY_NUM}
                      maxLetterLimit={15}
                      inputTitle="Phone"
                      placeholder="Enter phone number"
                      id="phone"
                      value={formData?.phone}
                      register={register}
                      error={errors.phone}
                      inputType="text"
                    />
                  </FormControl>
                  <FormControl
                    className="FormControl w-full"
                    variant="standard"
                  >
                    <CustomInputBox
                      pattern={PATTERN.CHAR_NUM_DOT_AT}
                      inputTitle="Email"
                      placeholder="Enter email address"
                      id="email"
                      register={register}
                      error={errors.email}
                      value={formData?.email}
                      inputType="text"
                    />
                  </FormControl>
                </div>
                <div className="FormField">
                  <FormControl className="FormControl" variant="standard">
                    <label className="FormLabel mt-4">
                      Note{' '}
                      <span className="SubLabel">Write 01-250 Characters</span>
                    </label>
                    <TextField
                      className="FormTextarea"
                      id="Note"
                      multiline
                      rows={4}
                      defaultValue=""
                      placeholder="Write Description"
                      {...register('note', {
                        value: formData?.note,
                        maxLength: {
                          value: 250,
                          message: MAX_LENGTH_EXCEEDED,
                        },
                      })}
                    />
                    {errors.note && (
                      <ErrorSpanBox error={errors.note?.message} />
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
            </>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </Dialog>
  );
}

export default UpdateAppointmentPopup;
