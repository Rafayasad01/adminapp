import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { excelAllowedTypes } from '../../../utils/constants';
import CustomDropDown from '../../../components/common/CustomDropDown';
import { ProjectPlan } from '../../../interfaces/projectPlan.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function ProjectPlanEditPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [planFile, setPlanFile] = useState<any>(null);
  const [videoPlanFiles, setVideoPlanFiles] = useState<File[]>([]); // State to manage multiple files
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    // watch,
    formState: { errors },
  } = useForm<ProjectPlan>();

  // console.log('Errors', errors, watch('avatar'));

  const onSubmit = (data: any) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    data.avatar = planFile;
    const res = {
      name: data.categoryName,
      description: data.categoryDesc,
      avatar: planFile,
    };
    callback(res);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    console.log('🚀 ~ handleFileChange ~ selectedFile:', selectedFile);
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (excelAllowedTypes.includes(fileType)) {
        setPlanFile(event.target.files[0]);
        setValue('file', event.target.files[0]);
        clearErrors('file');
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: 'Only .xls, .xlsx, .xlsm files are allowed',
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

  const handleVideoFileOnClick = (event: any) => {
    event.target.value = null;
    setVideoPlanFiles([]);
    setValue('videos', '');
  };

  const handleVideoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    console.log('🚀 ~ files:', files);
    const validFiles: any = files.filter((file) => file.type === 'video/mp4');

    if (validFiles.length === files.length) {
      setVideoPlanFiles(validFiles);
      setValue('videos', validFiles);
      setError(null);
    } else {
      setError('Only MP4 video files are allowed');
    }
  };

  const handleVideoFileRemove = (fileName: string) => {
    const updatedFiles: any = videoPlanFiles.filter(
      (file) => file.name !== fileName
    );
    setVideoPlanFiles(updatedFiles);
    setValue('videos', updatedFiles);
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
            <span className="Title">Edit Plan</span>
          </div>
          <div className="FormBody mt-2">
            {/* <div className="FormField">
              <FormControl className="FormControl" variant="standard">
                <label className="FormLabel">Category Name</label>
                <Input
                  className="FormInput"
                  {...register('categoryName', {
                    required: true,
                    pattern: PATTERN.CHAR_SPACE_DASH,
                    validate: (value) => value.length <= 150,
                  })}
                  placeholder="Enter Category Name"
                  type="text"
                  id="categoryName"
                  disableUnderline
                />
                {errors.categoryName?.type === 'required' && (
                  <ErrorSpanBox error="Category name is required" />
                )}
                {errors.categoryName?.type === 'pattern' && (
                  <ErrorSpanBox error={INVALID_CHAR} />
                )}
                {errors.categoryName?.type === 'validate' && (
                  <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                )}
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
                  {...register('categoryDesc', {
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                />
                {errors.categoryDesc && (
                  <ErrorSpanBox error={errors.categoryDesc?.message} />
                )}
              </FormControl>
            </div> */}
            <FormControl className="FormControl" variant="standard">
              <CustomDropDown
                validateRequired
                id="day"
                control={control}
                error={errors}
                register={register}
                options={{
                  roles: [
                    { id: 'day1', name: 'Day 1' },
                    { id: 'day2', name: 'Day 2' },
                  ],
                }}
                customClassInputTitle="font-bold"
                inputTitle="Day Count"
                defaultValue="Select Day"
              />
            </FormControl>
            <div className="FormField">
              <label className="FormLabel mt-2">
                Upload File
                <span className="SubLabel">
                  ( File should be in xlxs format )
                </span>
              </label>
              <div className="ImageBox">
                <input
                  accept=".xls,.xlsx"
                  style={{ display: 'none' }}
                  {...register('file')}
                  id="raised-button-file"
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
                <label htmlFor="raised-button-file" className="ImageLabel">
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
              {planFile === null && <ErrorSpanBox error="file is required" />}
            </div>
            <div className="ImageBox">
              <label className="FormLabel mt-2">
                Upload Videos
                <span className="SubLabel">
                  ( Video should be in mp4 format )
                </span>
              </label>
              <input
                accept="video/mp4" // Only accept MP4 videos
                multiple
                style={{ display: 'none' }}
                {...register('videos')}
                id="raised-button-file-video"
                type="file"
                onChange={handleVideoFileChange}
                onClick={handleVideoFileOnClick}
              />
              <label htmlFor="raised-button-file-video" className="ImageLabel">
                <Button component="span" className="ImageBtn">
                  <FileUploadOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                  Upload MP4 Videos
                </Button>
              </label>

              {videoPlanFiles.length > 0 && (
                <div className="ShowImageBox bg-background">
                  {videoPlanFiles.map((file) => (
                    <div key={file.name} className="FileItem">
                      <label className="ShowImageLabel">{file.name}</label>
                      <IconButton
                        className="btn-dot"
                        onClick={() => handleVideoFileRemove(file.name)}
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
              )}
              {error && <ErrorSpanBox error={error} />}
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
                padding: '0.15rem 1rem !important',
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ProjectPlanEditPopup;
