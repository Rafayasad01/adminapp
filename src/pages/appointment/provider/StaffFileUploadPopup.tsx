import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import '../../../assets/css/PopupStyle.css';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  //   ALL_PERMISSIONS,
  //   INVALID_CHAR,
  //   MAX_LENGTH_EXCEEDED,
  //   PATTERN,
  mimiType,
} from '../../../utils/constants';
import { AppointmentStaffAttachment } from '../../../interfaces/app.appointment';
// import CustomDropDown from '../../../components/common/CustomDropDown';
// import { useAppSelector } from '../../../redux/redux-hooks';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function StaffFileUploadPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  //   const authState: any = useAppSelector((state) => state?.authState);
  //   const dataRole = useAppSelector(
  //     (state) => state?.persistedReducer?.roleState?.role?.permissions
  //   );
  const [staffFile, setStaffFile] = useState<any>(null);
  //   const [projects, setProjects] = useState<any>([]);
  //   const [plans, setPlans] = useState<any>([]);

  const {
    // register,
    handleSubmit,
    setValue,
    control,
    // watch,
    formState: { errors },
  } = useForm<AppointmentStaffAttachment>();

  const onSubmit = () => {
    const data = {
      name: staffFile.name,
      file: staffFile,
    };
    callback(data);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (onChange: any, event: any | undefined) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (
        fileType === mimiType.wordsheet ||
        fileType === mimiType.csv ||
        fileType === mimiType.excel ||
        fileType === mimiType.excelsheet
      ) {
        setStaffFile(selectedFile);
        onChange(selectedFile);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .xls, .csv and .xlsx files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setStaffFile(null);
    setValue('file', '');
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
            <span className="Title">Upload Staffs file</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormField">
              <label className="FormLabel mt-2">
                Upload File
                <span className="SubLabel">
                  ( File should be in XLS, CSV, or XLSX format )
                </span>
              </label>
              <div className="ImageBox">
                <Controller
                  name="file"
                  control={control}
                  rules={{ required: 'File is required' }}
                  render={({ field: { onChange } }) => (
                    <>
                      <input
                        accept=".xls,.xlsx,.csv"
                        style={{ display: 'none' }}
                        id="raised-button-docs"
                        type="file"
                        onChange={(event) => handleFileChange(onChange, event)}
                        onClick={handleFileOnClick}
                      />
                      <label
                        htmlFor="raised-button-docs"
                        className="ImageLabel"
                      >
                        <Button component="span" className="ImageBtn">
                          <FileUploadOutlinedIcon
                            sx={{ marginRight: '0.5rem' }}
                          />
                          Upload
                        </Button>
                      </label>

                      {staffFile ? (
                        <div className="ShowImageBox bg-background">
                          <label className="ShowImageLabel">
                            {staffFile.name}
                          </label>
                          <IconButton
                            className="btn-dot"
                            onClick={() => {
                              setStaffFile(null);
                              onChange(null);
                            }}
                          >
                            <CloseOutlinedIcon
                              sx={{
                                color: '#1D1D1D',
                                fontSize: '1rem',
                                lineHeight: '1.5rem',
                              }}
                            />
                          </IconButton>
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                />
                {errors.file && <ErrorSpanBox error={errors.file?.message} />}
              </div>
            </div>
          </div>
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
            <Input
              type="submit"
              value="Add"
              className="btn-black-fill"
              disableUnderline
              sx={{
                padding: '0.175rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default StaffFileUploadPopup;
