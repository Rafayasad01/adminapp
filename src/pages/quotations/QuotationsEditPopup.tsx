import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Vendor } from '../../interfaces/Vendor';

type VendorFormProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (data: Vendor) => Promise<boolean>;
  setIsNotify: any;
  setNotifyMessage: any;
  existingVendorData?: Vendor; // This is for the edit feature
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
  } = useForm<Vendor>({
    defaultValues: existingVendorData, // Pre-fill with existing data
  });

  const handleFormClose = () => setOpenFormDialog(false);

  // Populate form with existing data when dialog opens
  useEffect(() => {
    if (existingVendorData) {
      Object.keys(existingVendorData).forEach((key) => {
        setValue(key as keyof Vendor, existingVendorData[key as keyof Vendor]);
      });
    }
  }, [existingVendorData, setValue]);

  const onSubmit = async (data: Vendor) => {
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
            <span className="Title">Edit Vendor Information</span>
          </div>
          <div className="FormBody">
            <div className="FormFields">
              {/* Vendor Name */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Vendor Name</label>
                <Input
                  className="FormInput"
                  placeholder="Enter vendor name"
                  disableUnderline
                  {...register('name', { required: 'Vendor Name is required' })}
                />
                {errors.name && <ErrorSpanBox error={errors.name.message} />}
              </FormControl>

              {/* Vendor Email */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Vendor Contact Email</label>
                <Input
                  className="FormInput"
                  placeholder="Enter contact email"
                  disableUnderline
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <ErrorSpanBox error={errors.email.message} />}
              </FormControl>

              {/* Payment Terms */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Payment Terms</label>
                <Input
                  className="FormInput"
                  placeholder="Enter payment terms"
                  disableUnderline
                  {...register('paymentTerms', {
                    required: 'Payment Terms are required',
                  })}
                />
                {errors.paymentTerms && (
                  <ErrorSpanBox error={errors.paymentTerms.message} />
                )}
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
