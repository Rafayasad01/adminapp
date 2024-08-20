import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
import '../../../assets/css/PopupStyle.css';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import { excelAllowedTypes } from '../../../utils/constants';
import { ProjectPlan } from '../../../interfaces/projectPlan.interface';

type Props = {
  openFormDialog: boolean;
  setOpenFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
  setIsNotify: any;
  setNotifyMessage: any;
};

function ProjectPlanAddPopup({
  openFormDialog,
  setOpenFormDialog,
  callback,
  setIsNotify,
  setNotifyMessage,
}: Props) {
  const [planFile, setPlanFile] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    // watch,
  } = useForm<ProjectPlan>();

  // console.log('Errors', errors, watch('file'));

  const onSubmit = (data: any) => {
    // console.log('🚀 ~ onSubmit ~ data:', data);
    data.file = planFile;
    if (planFile) callback(data);
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
            <span className="Title">Add Plan</span>
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

export default ProjectPlanAddPopup;
