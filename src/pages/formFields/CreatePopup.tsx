// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import '../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { Category } from '../../interfaces/category.interface';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  imageAllowedTypes,
} from '../../utils/constants';
import { FormFields } from '../../interfaces/form-fields.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  showMessage: any;
};

function CreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  showMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    setOpenFormDialog(false);
    callback(data);
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
            <span className="font-an-gurmukhi text-2xl font-semibold text-secondary2">
              Add Form Field
            </span>
          </div>
          <div className="FormBody mt-4">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="font-an-gurmukhi text-secondary2">
                  Title
                </label>
                <Input
                  className="FormInput alder-form-control text-secondary2"
                  {...register('title', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Category Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.title?.type === 'required' && (
                  <ErrorSpanBox error="Category name is required" />
                )}
                {errors.title?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.title?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <label className="font-an-gurmukhi text-secondary2">Type</label>
                <Input
                  className="FormInput alder-form-control"
                  {...register('type', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Category Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.type?.type === 'required' && (
                  <ErrorSpanBox error="Category name is required" />
                )}
                {errors.type?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.type?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
            </div>
          </div>
          <div className="FormFooter">
            <Button
              variant="outlined"
              className="border-background text-sm"
              type="submit"
              onClick={handleFormClose}
              sx={{
                marginRight: '0.5rem',
                padding: '0.295rem 1.5rem !important',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-background text-sm text-primary"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default CreatePopup;
