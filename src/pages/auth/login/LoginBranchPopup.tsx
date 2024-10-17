import Dialog from '@mui/material/Dialog';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';

type BannersCreatePopupProps = {
  branches: any;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

function LoginBranchPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  branches,
}: BannersCreatePopupProps) {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    callback(watch('branch'));
  }, [watch('branch')]);

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      PaperProps={{
        className: 'Dialog',
        style: { minWidth: '345px', width: '350px' },
      }}
    >
      <div className="Content overflow-y-scroll">
        {/* {isLoader ? <Loader /> : */}
        <form>
          <div className="FormHeader">
            <span className="Title">Select Branch</span>
          </div>
          <div className="FormField mt-3">
            <div className="mt-2">
              <CustomDropDown
                validateRequired
                id="branch"
                control={control}
                error={errors}
                register={register}
                options={{ roles: branches, role: watch('branch') }}
                customClassInputTitle="font-bold"
                // inputTitle="Select Branch"
                defaultValue="Select Your Branch"
              />
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default LoginBranchPopup;
