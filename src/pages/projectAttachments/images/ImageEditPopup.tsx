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
import '../../../assets/css/PopupStyle.css';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  ALL_PERMISSIONS,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  PROJECT_IMAGE_TYPE,
} from '../../../utils/constants';
import { ProjectAttachment } from '../../../interfaces/projectAttachments.interface';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { listingRolePermission } from '../../../utils/helper';
import { useAppSelector } from '../../../redux/redux-hooks';
import storeAttachmentService from '../../../services/adminapp/adminProjectAttachments';

type Props = {
  projectId: string;
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
  formData: any;
};

function VideoEditPopup({
  projectId,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
  formData,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [planFile, setPlanFile] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);
  const [filePath, setFilePath] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm<ProjectAttachment>();

  useEffect(() => {
    const fetchProjects = async () => {
      setValue('file', formData?.filePath);
      setPlanFile({ name: formData?.filePath });
      setFilePath(formData?.filePath);
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.editImagesPlans
        )
      ) {
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
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.editImagesPlans
        ) &&
        watch('projectId') !== 'none' &&
        watch('projectId') !== undefined
      ) {
        try {
          const plansResponse =
            await storeAttachmentService.getListProjectPlanLovService(
              watch('projectId')
            );
          setPlans(plansResponse.data.data.list);
        } catch (error: Error | any) {
          setIsNotify(true);
          setNotifyMessage({
            text: error.message,
            type: 'error',
          });
        }
      }
    };

    fetchPlans();
  }, [watch('projectId')]);

  const onSubmit = (data: any) => {
    const obj = {
      day: data.day,
      projectId: data.projectId,
      file: data.file,
      title: data.name,
      type: data.type,
      description: data.desc,
    };
    if (filePath !== null) obj.file = null;
    if (planFile || filePath) callback(obj);
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
          text: 'Only .jpeg, .jpg, .png image files are allowed',
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
            <span className="Title">Edit Image</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormFields">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Name</label>
                <Input
                  className="FormInput"
                  {...register('name', {
                    value: formData?.title,
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Image Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <ErrorSpanBox error="Image name is required" />
                )}
                {errors.name?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.name?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: PROJECT_IMAGE_TYPE,
                    role: formData?.category,
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Type"
                  defaultValue="Select Type"
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
                    value: formData?.description,
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.desc && <ErrorSpanBox error={errors.desc?.message} />}
              </FormControl>
            </div>
            <div className="FormFields">
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
                  disabled={!!projectId}
                />
              </FormControl>
              <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="day"
                  control={control}
                  error={errors}
                  register={register}
                  options={{ roles: plans, role: formData?.day }}
                  customClassInputTitle="font-bold"
                  inputTitle="Day"
                  defaultValue="Select Day"
                />
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel mt-2">
                Upload Image
                <span className="SubLabel">
                  ( Image should be in JPG, JPEG, or PNG format )
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
              {planFile === null && <ErrorSpanBox error="Image is required" />}
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

export default VideoEditPopup;
