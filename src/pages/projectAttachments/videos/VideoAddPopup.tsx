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
  ALL_PERMISSIONS,
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
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
};

function VideoAddPopup({
  projectId,
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );
  // const [planFile, setPlanFile] = useState<any>(null);
  const [planFiles, setPlanFiles] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ProjectAttachment>();

  useEffect(() => {
    const fetchProjects = async () => {
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storePlans.viewProjectAttachments
        )
      ) {
        try {
          const projectResponse =
            await storeAttachmentService.getListProjectLovService(
              authState.user.tenant
            );
          const projectList = projectResponse.data.data.list;
          setProjects(projectList);
          if (projectId) setValue('projectId', projectId);
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
          ALL_PERMISSIONS.storePlans.viewProjectAttachments
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
      ...data,
      title: data.name,
      description: data.desc,
    };
    // console.log('🚀 ~ onSubmit ~ obj:', obj);
    callback(obj);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  // const handleFileChange = (onChange: any, event: any | undefined) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     const fileType = selectedFile.type;
  //     if (watch('type') === 'video') {
  //       if (fileType === 'video/mp4') {
  //         // clearErrors('file');
  //         setPlanFile(selectedFile);
  //         onChange(selectedFile);
  //       } else {
  //         setValue('file', null);
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: 'Only .mp4 video files are allowed',
  //           type: 'error',
  //         });
  //       }
  //     } else if (
  //       fileType === 'image/jpeg' ||
  //       fileType === 'image/png' ||
  //       fileType === 'image/jpg'
  //     ) {
  //       setPlanFile(selectedFile);
  //       onChange(selectedFile);
  //     } else {
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: 'Only .jpeg, .jpg, .png image files are allowed',
  //         type: 'error',
  //       });
  //     }
  //   }
  // };

  // const handleFileOnClick = (event: any) => {
  //   event.target.value = null;
  //   setPlanFile(null);
  //   setValue('file', '');
  // };

  const handleFileChange = (onChange: any, event: any) => {
    const selectedFiles = Array.from(event.target.files);
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const allowedVideoType = 'video/mp4';
    const validFiles: any[] = [];

    selectedFiles.forEach((file: any) => {
      const fileType = file.type;
      if (
        allowedImageTypes.includes(fileType) ||
        fileType === allowedVideoType
      ) {
        validFiles.push(file);
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .jpeg, .jpg, .png images and .mp4 videos are allowed',
          type: 'error',
        });
      }
    });

    if (validFiles.length > 0) {
      setPlanFiles((prevFiles: any) => [...prevFiles, ...validFiles]);
      onChange(validFiles);
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setPlanFiles([]);
  };

  const handleRemoveFile = (index: number, onChange: any) => {
    setPlanFiles((prevFiles: any) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
      return updatedFiles;
    });
  };

  // useEffect(() => {
  //   setPlanFile(null);
  //   setValue('file', '');
  // }, [watch('type')]);

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
            <span className="Title">Add Images / Videos</span>
          </div>
          <div className="FormBody mt-2">
            <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Name</label>
                <Input
                  className="FormInput"
                  {...register('name', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Name"
                  type="text"
                  id="name"
                  disableUnderline
                />
                {errors.name?.type === 'required' && (
                  <ErrorSpanBox error="name is required" />
                )}
                {errors.name?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.name?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
              </FormControl>
              {/* <FormControl className="FormControl" variant="standard">
                <CustomDropDown
                  validateRequired
                  id="type"
                  control={control}
                  error={errors}
                  register={register}
                  options={{
                    roles: [
                      {
                        id: 'image',
                        name: 'Image',
                      },
                      {
                        id: 'video',
                        name: 'Video',
                      },
                    ],
                    role: 'video',
                  }}
                  customClassInputTitle="font-bold"
                  inputTitle="Type"
                  defaultValue="Select Attachment Type"
                />
              </FormControl> */}
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
                  options={{ roles: projects, role: projectId }}
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
                  options={{ roles: plans }}
                  customClassInputTitle="font-bold"
                  inputTitle="Day"
                  defaultValue="Select Day"
                />
              </FormControl>
            </div>
            <div className="FormField">
              <label className="FormLabel mt-2">
                Upload
                <span className="SubLabel">
                  ( Image should be in JPG, JPEG, or PNG format & Video should
                  be in MP4 format )
                </span>
              </label>
              <div className="ImageBox">
                <Controller
                  name="files"
                  control={control}
                  rules={{
                    required: 'Required',
                  }}
                  render={({ field: { onChange } }) => (
                    <>
                      <input
                        accept="image/jpeg,image/png,image/jpg,.mp4"
                        style={{ display: 'none' }}
                        id="raised-button-files"
                        type="file"
                        multiple
                        onChange={(event) => handleFileChange(onChange, event)}
                        onClick={handleFileOnClick}
                      />
                      <label
                        htmlFor="raised-button-files"
                        className="ImageLabel"
                      >
                        <Button component="span" className="ImageBtn">
                          <FileUploadOutlinedIcon
                            sx={{ marginRight: '0.5rem' }}
                          />
                          Upload
                        </Button>
                      </label>

                      {planFiles && planFiles.length > 0 ? (
                        <div className="ShowFilesBox mt-2 rounded bg-background">
                          {planFiles.map((file: any, index: number) => (
                            <div key={index} className="ShowFileItem">
                              <label className="ShowFileLabel">
                                {file.name}
                              </label>
                              <IconButton
                                className="btn-dot"
                                onClick={() =>
                                  handleRemoveFile(index, onChange)
                                }
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
                          ))}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                />
                {errors.files && <ErrorSpanBox error={errors.files?.message} />}
              </div>

              {/* <div className="ImageBox">
                <Controller
                  name="file"
                  control={control}
                  rules={{
                    required: 'Required',
                  }}
                  render={({ field: { onChange } }) => (
                    <>
                      <input
                        multiple
                        accept={`${
                          watch('type') === 'image'
                            ? 'image/jpeg,image/png,image/jpg'
                            : '.mp4'
                        }`}
                        style={{ display: 'none' }}
                        id="raised-button-video"
                        type="file"
                        onChange={(event) => handleFileChange(onChange, event)}
                        onClick={handleFileOnClick}
                      />
                      <label
                        htmlFor="raised-button-video"
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
                              onChange(null); // Clear the file from react-hook-form state
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
              </div> */}
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

export default VideoAddPopup;
