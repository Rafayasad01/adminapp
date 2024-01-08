import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import { CreateBanner } from '../../interfaces/app.banner';
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

function BannerUpdatePopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  formData,
}: Props) {
  const {
    handleSubmit,
    // formState: {},
  } = useForm<CreateBanner>();

  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const onSubmit = () => {
    if (file !== null || selectedImg !== null) {
      const details = {
        id: formData.id,
        banner: file !== null ? file : formData.banner,
      };
      if (selectedImg || file !== null || formData.banner) {
        callback(details);
      } else {
        setIsNotify(true);
        setNotifyMessage('Banner image is required');
      }
    } else {
      setOpenFormDialog(true);
    }
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };
  // console.log('sssssssssssssFORMDATA', file, selectedImg);

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
            <span className="Title">Update Banner Image</span>
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
                  value: formData?.name,
                })}
              />
              {errors.bannerName?.type === 'required' && (
                <span role="alert" style={{ color: 'red', fontSize: '12px' }}>
                  * Banner name is required
                </span>
              )}
            </FormControl>
          </div> */}
          <div className="my-3 grid grid-cols-10 gap-6">
            <div className="col-span-4 flex items-center">
              <DragDropFile
                // setError={setError}
                // error={errors}
                customWidth="w-[px]"
                setFile={setFile}
                setImg={setSelectedImg}
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
            ) : formData && formData.banner ? (
              <div className="col-span-6 flex items-center justify-center">
                <img
                  className="max-h-[200px] max-w-[200px] rounded-md"
                  src={formData.banner}
                  alt={formData.name}
                />
              </div>
            ) : null}
          </div>
          {file === null && selectedImg === null && (
            <div>
              <span role="alert" className="error-color">
                *Edit requires upload new image
              </span>
            </div>
          )}
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
              title="Update"
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

export default BannerUpdatePopup;
