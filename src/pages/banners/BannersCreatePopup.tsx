import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import CustomDropDown from '../../components/common/CustomDropDown';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import { CreateBanner } from '../../interfaces/app.banner';
import {
  BANNER_TYPE,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../utils/constants';
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
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBanner>();

  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const onSubmit = (data: CreateBanner) => {
    if (selectedImg || (file && data.bannerType)) {
      const bannerData = {
        name: data.name,
        shortDesc: data.shortDesc,
        pageDetail: data.pageDetail,
        bannerType: data.bannerType,
        link: data.link,
        bannerImg: file,
      };
      // console.log('dataSSSelected==>', bannerData);
      callback(bannerData);
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
      <div className="Content !flex-row overflow-y-scroll">
        {/* {isLoader ? <Loader /> : */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="FormHeader">
            <span className="Title">Add Banner Image</span>
          </div>
          <div className="FormFields mt-3">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Banner Name</label>
              <Input
                className="FormInput"
                type="text"
                id="name"
                placeholder="Enter banner name"
                disableUnderline
                {...register('name', {
                  pattern: PATTERN.CHAR_SPACE_DASH,
                  validate: (value) => value.length <= 150,
                })}
              />
              {errors.name?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.name?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
            <div className="">
              <CustomDropDown
                validateRequired
                id="bannerType"
                control={control}
                error={errors}
                register={register}
                options={{ roles: BANNER_TYPE }}
                customClassInputTitle="font-bold"
                inputTitle="Select Banner Type"
                defaultValue="Select Your Banner Type"
              />
            </div>
          </div>
          <div>
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">Banner Link</label>
              <Input
                className="FormInput"
                type="text"
                id="link"
                placeholder="Enter banner link"
                disableUnderline
                {...register('link', {
                  pattern: PATTERN.CHAR_SPACE_DASH,
                  validate: (value) => value.length <= 150,
                })}
              />
              {/* {errors.link?.type === 'required' && (
                <ErrorSpanBox error="Banner link is required" />
              )} */}
              {errors.link?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.link?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
          </div>
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
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <label className="FormLabel">
                Short Description{' '}
                <span className="SubLabel">Write 01-250 Characters</span>
              </label>
              <TextField
                className="FormTextarea"
                id="shortDesc"
                multiline
                rows={4}
                defaultValue=""
                placeholder="Write Short Description"
                {...register('shortDesc', {
                  minLength: {
                    value: 1,
                    message: 'Minimum One Characters',
                  },
                  maxLength: {
                    value: 250,
                    message: MAX_LENGTH_EXCEEDED,
                  },
                })}
              />
              {errors.shortDesc && (
                <ErrorSpanBox error={errors.shortDesc?.message} />
              )}
            </FormControl>
          </div>
          <div className="FormField">
            <FormControl className="FormControl" variant="standard">
              <Controller
                name="pageDetail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <label htmlFor={field.name} className="FormLabel mb-2">
                      Page Detail Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      className="h-40"
                      id={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.pageDetail && (
                      <ErrorSpanBox error={errors.pageDetail?.message} />
                    )}
                  </>
                )}
              />
            </FormControl>
          </div>
          <div className="FormFooter pb-4 pt-10">
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
      </div>
    </Dialog>
  );
}

export default BannersCreatePopup;
