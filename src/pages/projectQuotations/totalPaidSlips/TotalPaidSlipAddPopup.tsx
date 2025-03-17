import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import '../../../assets/css/PopupStyle.css';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  // ALL_PERMISSIONS,
  MAX_LENGTH_EXCEEDED,
  mimiType,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../../utils/constants';
import CustomDropDown from '../../../components/common/CustomDropDown';
// import { listingRolePermission } from '../../../utils/helper';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeAttachmentService from '../../../services/adminapp/adminProjectAttachments';
import { ProjectQuotation } from '../../../interfaces/projectQuotation';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function TotalPaidSlipAddPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  // const dataRole = useAppSelector(
  //   (state) => state?.persistedReducer?.roleState?.role?.permissions
  // );
  const [planFile, setPlanFile] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  // const [plans, setPlans] = useState<any>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // watch,
    formState: { errors },
  } = useForm<ProjectQuotation>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse =
          await storeAttachmentService.getListProjectLovService(
            authState.user.tenant
          );
        const projectList = projectResponse.data.data.list;
        setProjects(projectList);
      } catch (error: Error | any) {
        setIsNotify(true);
        setNotifyMessage({
          text: error.message,
          type: 'error',
        });
      }
    };

    fetchProjects();
  }, []);

  const onSubmit = (data: any) => {
    const obj = {
      ...data,
      type: 'TOTAL_PAID',
    };
    callback(obj);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (onChange: any, event: any | undefined) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (
        fileType === mimiType.pdf ||
        fileType === mimiType.word ||
        fileType === mimiType.wordsheet ||
        fileType === 'image/jpeg' ||
        fileType === 'image/png' ||
        fileType === 'image/jpg'
      ) {
        setPlanFile(selectedFile);
        onChange(selectedFile);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .Pdf .Doc .jpeg, .jpg, .png files are allowed',
          type: 'error',
        });
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setPlanFile(null);
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
            <span className="Title">Add Total Paid Cost</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Total Paid Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Enter Total Paid Amount"
                  {...register('totalPaidCost', {
                    required: 'Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 20,
                      message: 'Length should not be excceed from 20 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.totalPaidCost && (
                  <ErrorSpanBox error={errors.totalPaidCost?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="projectId"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: projects }}
                  customClassInputTitle="font-bold"
                  inputTitle="Project Name"
                  defaultValue="Select Project"
                />
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
                  id="categoryDesc"
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="Write Description"
                  {...register('desc', {
                    maxLength: {
                      value: 1000,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel mt-2">
                Upload Doc / Image
                <span className="SubLabel">
                  ( It should be in PDF, DOC, JPG, JPEG, or PNG format )
                </span>
              </label>
              <div className="ImageBox">
                <Controller
                  name="file"
                  control={control}
                  rules={{ required: 'Required' }}
                  render={({ field: { onChange } }) => (
                    <>
                      <input
                        accept="image/jpeg,image/png,image/jpg"
                        style={{ display: 'none' }}
                        id="raised-button-image"
                        type="file"
                        onChange={(event) => handleFileChange(onChange, event)}
                        onClick={handleFileOnClick}
                      />
                      <label
                        htmlFor="raised-button-image"
                        className="ImageLabel"
                      >
                        <Button component="span" className="ImageBtn">
                          <FileUploadOutlinedIcon
                            sx={{ marginRight: '0.5rem' }}
                          />
                          Upload
                        </Button>
                      </label>

                      {planFile ? (
                        <div className="ShowImageBox bg-background">
                          <label className="ShowImageLabel">
                            {planFile.name}
                          </label>
                          <IconButton
                            className="btn-dot"
                            onClick={() => {
                              setPlanFile(null);
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
                padding: '0.375rem 2rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default TotalPaidSlipAddPopup;
