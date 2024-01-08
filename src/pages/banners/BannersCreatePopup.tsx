import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { CreateBanner } from '../../interfaces/app.banner';
// import {
//   INVALID_CHAR,
//   MAX_LENGTH_EXCEEDED,
//   PATTERN,
// } from '../../utils/constants';
import DragDropFile from '../settings/DragDropFile';

type Props = {
  roles?: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  type?: boolean;
  formData?: any;
};

function BannersCreatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<CreateBanner>();

  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const onSubmit = () => {
    // console.log('dataSSSelected==>', selectedImg, file, data);
    if (selectedImg || file) {
      callback(file);
    } else {
      setOpenFormDialog(true);
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  // console.log("sssssssssssss", file, selectedImg);

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
        {/* {isLoader ? <Loader /> : */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Banner Image</span>
          </div>
          {/* <div className="mt-3">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Banner Name</label>
              <Input
                className="FormInput"
                type="text"
                id="bannerName"
                placeholder="Enter banner name"
                disableUnderline
                {...register('bannerName', {
                  required: true,
                  pattern: PATTERN.CHAR_SPACE_DASH,
                  validate: (value) => value.length <= 150,
                })}
              />
              {errors.bannerName?.type === 'required' && (
                <ErrorSpanBox error="Banner name is required" />
              )}
              {errors.bannerName?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.bannerName?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
          </div> */}
          <div className="my-3 grid grid-cols-10 gap-6">
            <div className="col-span-4 flex items-center">
              <DragDropFile
                customWidth="w-[px]"
                setFile={setFile}
                setImg={setSelectedImg}
                setIsNotify={setIsNotify}
                setNotifyMessage={setNotifyMessage}
              />
            </div>
            {selectedImg ? (
              <div className="col-span-6 flex items-center justify-center">
                <img
                  className="max-h-[200px] max-w-[200px] rounded-md"
                  src={selectedImg}
                  alt="Shop Logo"
                />
              </div>
            ) : null}
          </div>
          {selectedImg === null && <ErrorSpanBox error="Image is required" />}
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
          </div>
        </form>
        {/* } */}
      </div>
    </Dialog>
  );
}

export default BannersCreatePopup;
