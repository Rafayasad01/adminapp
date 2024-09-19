import React from 'react';
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
  callback: (data: VendorTypes) => Promise<boolean>;
  setIsNotify: any;
  setNotifyMessage: any;
};

const VendorAddPopup = ({
  openFormDialog,
  setOpenFormDialog,
  callback,
}: VendorFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorTypes>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    setOpenFormDialog(false);
    const result = await callback(data);
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
            <span className="Title">Add Vendor Type</span>
          </div>
          <div className="FormBody">
            <div className="FormField">
              {/* Vendor Name */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Name</label>
                <Input
                  className="FormInput"
                  placeholder="Enter vendor name"
                  disableUnderline
                  {...register('name', { required: 'Vendor Name is required' })}
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
              value="Add"
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

export default VendorAddPopup;
