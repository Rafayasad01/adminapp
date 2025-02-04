import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import '../../../assets/css/PopupStyle.css';
import CustomDropDown from '../../../components/common/CustomDropDown';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { ProjectQuotation } from '../../../interfaces/projectQuotation';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeAttachmentService from '../../../services/adminapp/adminProjectAttachments';
import {
  // ALL_PERMISSIONS,
  MAX_LENGTH_EXCEEDED,
  mimiType,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../../utils/constants';
// import { listingRolePermission } from '../../../utils/helper';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  formData: any;
};

function MaterailLaborSlipEditPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  formData,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  // const dataRole = useAppSelector(
  //   (state) => state?.persistedReducer?.roleState?.role?.permissions
  // );
  const [planFile, setPlanFile] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  // const [plans, setPlans] = useState<any>([]);
  const [filePath, setFilePath] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    // watch,
    formState: { errors },
  } = useForm<ProjectQuotation>();

  useEffect(() => {
    const fetchProjects = async () => {
      setValue('file', formData?.filePath);
      setPlanFile({ name: formData?.filePath });
      setFilePath(formData?.filePath);
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
    };
    if (filePath !== null) obj.file = null;
    if (planFile || filePath) callback(obj);
    // console.log('🚀 ~ onSubmit ~ obj:', obj);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (event: any) => {
    setFilePath(null);
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
        setValue('file', selectedFile);
        clearErrors('file');
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
    setFilePath(null);
  };

  // console.log('formData?.category', formData);

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
            <span className="Title">Edit Total Labor Material Cost</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Total Labor Material Amount</label>
                <Input
                  className="FormInput"
                  id="name"
                  type="number"
                  placeholder="Update Amount"
                  {...register('laborCost', {
                    value: Number(formData?.laborCost),
                    required: 'Amount is required in numbers',
                    validate: (value: any) => VALIDATE_NON_NEGATIVE_NUM(value),
                    maxLength: {
                      value: 20,
                      message: 'Length should not be excceed from 20 numbers.',
                    },
                  })}
                  disableUnderline
                />
                {errors.laborCost && (
                  <ErrorSpanBox error={errors.laborCost?.message} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="projectId"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: projects, role: formData?.projectId }}
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
                    value: formData?.desc,
                    maxLength: {
                      value: 250,
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
                <input
                  accept="image/jpeg,image/png,image/jpg"
                  style={{ display: 'none' }}
                  {...register('file', {
                    value: formData?.filePath,
                  })}
                  id="raised-button-image"
                  type="file"
                  onChange={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileChange(event);
                  }}
                  onClick={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileOnClick(event);
                  }}
                />
                <label htmlFor="raised-button-image" className="ImageLabel">
                  <Button component="span" className="ImageBtn">
                    <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    Upload
                  </Button>
                </label>

                {planFile ? (
                  <div className="ShowImageBox bg-background">
                    <label className="ShowImageLabel">{planFile.name}</label>
                    <IconButton
                      className="btn-dot"
                      onClick={() => {
                        setPlanFile(null);
                        setFilePath(null);
                        setValue('file', '');
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
              </div>
              {planFile === null && <ErrorSpanBox error="Required" />}
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
              value="Update"
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

export default MaterailLaborSlipEditPopup;
