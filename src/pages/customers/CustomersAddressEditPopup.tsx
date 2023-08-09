import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import '../../assets/css/PopupStyle.css';
import { useForm } from "react-hook-form";
import { AppUserAddress } from '../../interfaces/app-user.interface';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  callback: Function;
};



function CustomersAddressEditPopup({ openFormDialog, setOpenFormDialog, formData, callback }: Props) {
  const [formType, setFormType] = useState<any>('Home')

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<AppUserAddress>();

  const handleFormClose = () => setOpenFormDialog(false);

  const onSubmit = (data: AppUserAddress) => {
    data.longitude = Number(data.longitude);
    data.latitude = Number(data.latitude);
    setOpenFormDialog(false);
    callback(data);
  };
  useEffect(() => {
    if (formData) {
      setFormType(formData.type);
    }

  }, []);

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
        {formData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="FormHeader">
              <span className="Title">Edit Address</span>
            </div>
            <div className="FormBody">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Name</label>
                  <Input
                    className="FormInput"
                    id="name"
                    disableUnderline
                    {...register("name", { required: "Name is required", value: formData.name })}
                  />
                  {errors.name && <span role="alert">{errors.name?.message}</span>}
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Type</label>
                  <Select
                    className="FormSelect"
                    id="type"
                    labelId="demo-simple-select-label"
                    disableUnderline
                    value={formType}
                    {...register("type", { required: "type is required", value: formData.type })}
                    onChange={(event) => {
                      setFormType(event.target.value);
                    }}

                  >
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Office">Office</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.type && <span role="alert">{errors.type?.message}</span>}
                </FormControl>

              </div>
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Latitude</label>
                  <Input
                    type="number"
                    className="FormInput"
                    id="latitude"
                    disableUnderline
                    {...register("latitude", { value: formData.latitude })}
                  />
                </FormControl>
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Longitude</label>
                  <Input
                    type="number"
                    className="FormInput"
                    id="longitude"
                    disableUnderline
                    {...register("longitude", { value: formData.longitude })}
                  />
                </FormControl>
              </div>
              <div className="FormField">
                <FormControl className="FormControl" variant="standard">
                  <label className="FormLabel">Address</label>
                  <Input
                    className="FormInput"
                    id="address"
                    disableUnderline
                    {...register("address", { required: "Address is required", value: formData.address })}
                  />
                  {errors.address && <span role="alert">{errors.address?.message}</span>}
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
                sx={{
                  padding: '0.375rem 2rem !important',
                }}
              />
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}

export default CustomersAddressEditPopup;
