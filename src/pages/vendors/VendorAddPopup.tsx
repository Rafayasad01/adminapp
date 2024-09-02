import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import { MenuItem, Select } from '@mui/material';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Vendor } from '../../interfaces/Vendor';

type VendorFormProps = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (data: Vendor) => Promise<boolean>;
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
  } = useForm<Vendor>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = async (data: Vendor) => {
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
            <span className="Title">Vendor Information</span>
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

              {/* Vendor Contact */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Vendor Contact WhatsApp</label>
                <Input
                  className="FormInput"
                  placeholder="Enter contact WhatsApp"
                  disableUnderline
                  {...register('contact', { required: 'Contact is required' })}
                />
                {errors.contact && (
                  <ErrorSpanBox error={errors.contact.message} />
                )}
              </FormControl>

              {/* Vendor Type Dropdown */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Vendor Type</label>
                <Select
                  className="FormInput"
                  disableUnderline
                  {...register('vendorType', {
                    required: 'Vendor Type is required',
                  })}
                >
                  <MenuItem value="Supplier">Supplier</MenuItem>
                  <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                  <MenuItem value="Distributor">Distributor</MenuItem>
                  {/* Add more options as needed */}
                </Select>
                {errors.vendorType && (
                  <ErrorSpanBox error={errors.vendorType.message} />
                )}
              </FormControl>

              {/* Service Type */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Service Type</label>
                <Input
                  className="FormInput"
                  placeholder="Enter service type"
                  disableUnderline
                  {...register('serviceType', {
                    required: 'Service Type is required',
                  })}
                />
                {errors.serviceType && (
                  <ErrorSpanBox error={errors.serviceType.message} />
                )}
              </FormControl>

              {/* Bank Name */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Bank Name</label>
                <Input
                  className="FormInput"
                  placeholder="Enter bank name"
                  disableUnderline
                  {...register('bankName', {
                    required: 'Bank Name is required',
                  })}
                />
                {errors.bankName && (
                  <ErrorSpanBox error={errors.bankName.message} />
                )}
              </FormControl>

              {/* IBAN */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">IBAN</label>
                <Input
                  className="FormInput"
                  placeholder="Enter IBAN"
                  disableUnderline
                  {...register('iban', { required: 'IBAN is required' })}
                />
                {errors.iban && <ErrorSpanBox error={errors.iban.message} />}
              </FormControl>

              {/* Location */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Location</label>
                <Input
                  className="FormInput"
                  placeholder="Enter location"
                  disableUnderline
                  {...register('location', {
                    required: 'Location is required',
                  })}
                />
                {errors.location && (
                  <ErrorSpanBox error={errors.location.message} />
                )}
              </FormControl>

              {/* City */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">City</label>
                <Input
                  className="FormInput"
                  placeholder="Enter city"
                  disableUnderline
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && <ErrorSpanBox error={errors.city.message} />}
              </FormControl>

              {/* Country */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Country</label>
                <Input
                  className="FormInput"
                  placeholder="Enter country"
                  disableUnderline
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && (
                  <ErrorSpanBox error={errors.country.message} />
                )}
              </FormControl>

              {/* Delivery Time */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Delivery Time</label>
                <Input
                  className="FormInput"
                  placeholder="Enter delivery time"
                  disableUnderline
                  {...register('deliveryTime', {
                    required: 'Delivery Time is required',
                  })}
                />
                {errors.deliveryTime && (
                  <ErrorSpanBox error={errors.deliveryTime.message} />
                )}
              </FormControl>

              {/* Delivery Terms */}
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Delivery Terms</label>
                <Input
                  className="FormInput"
                  placeholder="Enter delivery terms"
                  disableUnderline
                  {...register('deliveryTerms', {
                    required: 'Delivery Terms are required',
                  })}
                />
                {errors.deliveryTerms && (
                  <ErrorSpanBox error={errors.deliveryTerms.message} />
                )}
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
              value="Submit"
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
