import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import { TextField } from '@mui/material';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { VendorTypes } from '../../interfaces/Vendor';
import { MAX_LENGTH_EXCEEDED } from '../../utils/constants';

type VendorFormProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (data: any) => Promise<boolean>;
  setIsNotify: any;
  setNotifyMessage: any;
  existingVendorData?: VendorTypes; // This is for the edit feature
};

const VendorEditPopup = ({
  openFormDialog,
  setOpenFormDialog,
  callback,
  existingVendorData, // Existing vendor data to be edited
}: VendorFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<VendorTypes>({
    defaultValues: existingVendorData, // Pre-fill with existing data
  });

  const handleFormClose = () => setOpenFormDialog(false);

  // Populate form with existing data when dialog opens
  useEffect(() => {
    if (existingVendorData) {
      Object.keys(existingVendorData).forEach((key) => {
        setValue(
          key as keyof VendorTypes,
          existingVendorData[key as keyof VendorTypes]
        );
      });
    }
  }, [existingVendorData, setValue]);

  const onSubmit = async (data: VendorTypes) => {
    setOpenFormDialog(false);
    const result = await callback(data); // Pass the updated data back to the parent component
    if (result) reset();
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
            <span className="Title">Edit VendorTypes Information</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              {/* VendorTypes Name */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">VendorTypes Name</label>
                <Input
                  className="FormInput"
                  placeholder="Enter vendor name"
                  disableUnderline
                  {...register('name', {
                    required: 'VendorTypes Name is required',
                  })}
                />
                {errors.name && <ErrorSpanBox error={errors.name.message} />}
              </FormControl>
            </div>
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel mt-2">
                  Description{' '}
                  <span className="SubLabel">Write 01-250 Characters</span>
                </label>
                <TextField
                  className="FormTextarea"
                  id="desc"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    maxLength: {
                      value: 250,
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
              sx={{ padding: '0.175rem 2rem !important' }}
              disableUnderline
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default VendorEditPopup;
